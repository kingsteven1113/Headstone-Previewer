import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/prisma.js';
import {
  getBillingRedirectUrls,
  getPlanCatalog,
  getPlanFromPriceId,
  getPriceIdForPlan,
  getStripeClient,
  isStripeConfigured,
  isStripeFullyConfigured,
  isStripeSecretConfigured,
  isStripeWebhookConfigured,
  mapStripeSubscriptionStatus,
} from '../utils/stripe.js';

const router = express.Router();

function parseStripeTimestamp(epochSeconds) {
  if (!epochSeconds || Number.isNaN(Number(epochSeconds))) {
    return null;
  }

  return new Date(Number(epochSeconds) * 1000);
}

function withCheckoutSessionId(successUrl) {
  if (!successUrl) {
    return successUrl;
  }

  if (successUrl.includes('{CHECKOUT_SESSION_ID}')) {
    return successUrl;
  }

  // Keep the placeholder raw in the URL string so Stripe can substitute it.
  const withBilling = successUrl.includes('billing=success')
    ? successUrl
    : `${successUrl}${successUrl.includes('?') ? '&' : '?'}billing=success`;

  const separator = withBilling.includes('?') ? '&' : '?';
  return `${withBilling}${separator}session_id={CHECKOUT_SESSION_ID}`;
}

function assertStripeEnabled(next) {
  if (!isStripeSecretConfigured()) {
    next(new ApiError(503, 'Stripe is not configured yet. Set STRIPE_SECRET_KEY in backend/.env.'));
    return false;
  }

  return true;
}

async function findUserIdByStripeCustomerId(stripeCustomerId) {
  if (!stripeCustomerId) {
    return null;
  }

  const subscription = await prisma.subscription.findFirst({
    where: { stripeCustomerId },
    select: { userId: true },
  });

  return subscription?.userId || null;
}

async function upsertSubscriptionFromStripe(userId, stripeSubscription) {
  const priceId = stripeSubscription.items?.data?.[0]?.price?.id || null;
  const planName = getPlanFromPriceId(priceId);

  return prisma.subscription.upsert({
    where: { userId },
    update: {
      planName,
      status: mapStripeSubscriptionStatus(stripeSubscription.status),
      stripeCustomerId: String(stripeSubscription.customer),
      stripeSubscriptionId: stripeSubscription.id,
      stripePriceId: priceId,
      currentPeriodStart: parseStripeTimestamp(stripeSubscription.current_period_start),
      currentPeriodEnd: parseStripeTimestamp(stripeSubscription.current_period_end),
      trialEndsAt: parseStripeTimestamp(stripeSubscription.trial_end),
    },
    create: {
      userId,
      planName,
      status: mapStripeSubscriptionStatus(stripeSubscription.status),
      stripeCustomerId: String(stripeSubscription.customer),
      stripeSubscriptionId: stripeSubscription.id,
      stripePriceId: priceId,
      currentPeriodStart: parseStripeTimestamp(stripeSubscription.current_period_start),
      currentPeriodEnd: parseStripeTimestamp(stripeSubscription.current_period_end),
      trialEndsAt: parseStripeTimestamp(stripeSubscription.trial_end),
    },
  });
}

function canUpdateExistingSubscription(status) {
  const normalized = String(status || '').toLowerCase();
  return normalized === 'active' || normalized === 'trialing' || normalized === 'past_due' || normalized === 'unpaid';
}

router.get('/plans', verifyToken, (req, res) => {
  res.json({
    configured: isStripeConfigured(),
    checkoutConfigured: isStripeSecretConfigured(),
    webhookConfigured: isStripeWebhookConfigured(),
    fullyConfigured: isStripeFullyConfigured(),
    plans: getPlanCatalog(),
  });
});

router.get('/subscription', verifyToken, async (req, res, next) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.userId },
    });

    res.json({
      subscription,
      plans: getPlanCatalog(),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/checkout-session', verifyToken, async (req, res, next) => {
  try {
    if (!assertStripeEnabled(next)) {
      return;
    }

    const planName = String(req.body.planName || '').trim().toLowerCase();
    const priceId = getPriceIdForPlan(planName);

    if (!priceId) {
      return next(new ApiError(400, `No Stripe price is configured for plan ${planName}.`));
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { subscription: true },
    });

    if (!user) {
      return next(new ApiError(404, 'User account not found'));
    }

    const stripe = getStripeClient();

    let stripeCustomerId = user.subscription?.stripeCustomerId || null;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.displayName || undefined,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;
    }

    if (user.subscription?.stripeSubscriptionId) {
      try {
        const currentStripeSubscription = await stripe.subscriptions.retrieve(user.subscription.stripeSubscriptionId);

        const currentPriceId = currentStripeSubscription.items?.data?.[0]?.price?.id || null;
        if (currentPriceId === priceId) {
          const syncedSubscription = await upsertSubscriptionFromStripe(user.id, currentStripeSubscription);
          return res.json({
            mode: 'noop',
            message: 'Account is already on this paid plan.',
            subscription: syncedSubscription,
          });
        }

        if (canUpdateExistingSubscription(currentStripeSubscription.status)) {
          const existingItemId = currentStripeSubscription.items?.data?.[0]?.id;

          if (!existingItemId) {
            return next(new ApiError(409, 'Existing Stripe subscription has no line item to update. Use Manage billing.'));
          }

          const updatedStripeSubscription = await stripe.subscriptions.update(currentStripeSubscription.id, {
            items: [
              {
                id: existingItemId,
                price: priceId,
              },
            ],
            proration_behavior: 'create_prorations',
            metadata: {
              ...(currentStripeSubscription.metadata || {}),
              userId: user.id,
              planName,
            },
          });

          const syncedSubscription = await upsertSubscriptionFromStripe(user.id, updatedStripeSubscription);
          return res.json({
            mode: 'updated',
            message: 'Subscription updated successfully.',
            subscription: syncedSubscription,
          });
        }
      } catch (error) {
        if (error?.code !== 'resource_missing') {
          throw error;
        }
      }
    }

    const { successUrl, cancelUrl } = getBillingRedirectUrls();
    const successUrlWithSessionId = withCheckoutSessionId(successUrl);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: successUrlWithSessionId,
      cancel_url: cancelUrl,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        planName,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          planName,
        },
      },
    });

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        stripeCustomerId,
      },
      create: {
        userId: user.id,
        planName: user.subscription?.planName || 'trial',
        status: user.subscription?.status || 'TRIAL',
        stripeCustomerId,
      },
    });

    res.json({
      mode: 'checkout',
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/checkout-complete', verifyToken, async (req, res, next) => {
  try {
    if (!assertStripeEnabled(next)) {
      return;
    }

    const sessionId = String(req.body.sessionId || '').trim();
    if (!sessionId) {
      return next(new ApiError(400, 'sessionId is required'));
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    });

    const sessionUserId = session.metadata?.userId || session.client_reference_id;
    if (!sessionUserId || sessionUserId !== req.userId) {
      return next(new ApiError(403, 'Checkout session does not belong to the authenticated account'));
    }

    if (!session.subscription) {
      return next(new ApiError(400, 'Checkout session does not have a subscription yet'));
    }

    const stripeSubscription = typeof session.subscription === 'string'
      ? await stripe.subscriptions.retrieve(session.subscription)
      : session.subscription;

    const updatedSubscription = await upsertSubscriptionFromStripe(req.userId, stripeSubscription);

    res.json({
      subscription: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/portal-session', verifyToken, async (req, res, next) => {
  try {
    if (!assertStripeEnabled(next)) {
      return;
    }

    const userSubscription = await prisma.subscription.findUnique({
      where: { userId: req.userId },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!userSubscription?.stripeCustomerId) {
      return next(new ApiError(404, 'No Stripe customer found for this account yet.'));
    }

    const stripe = getStripeClient();
    const returnUrl = (process.env.STRIPE_PORTAL_RETURN_URL || process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim();

    const session = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
});

export async function stripeWebhookHandler(req, res) {
  if (!isStripeSecretConfigured() || !isStripeWebhookConfigured()) {
    const missing = [
      !isStripeSecretConfigured() ? 'STRIPE_SECRET_KEY' : null,
      !isStripeWebhookConfigured() ? 'STRIPE_WEBHOOK_SECRET' : null,
    ].filter(Boolean).join(', ');

    res.status(503).json({
      error: {
        status: 503,
        message: `Stripe webhook is not configured. Missing: ${missing}.`,
      },
    });
    return;
  }

  const stripe = getStripeClient();
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    res.status(400).json({
      error: {
        status: 400,
        message: `Stripe webhook signature verification failed: ${error.message}`,
      },
    });
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId || session.client_reference_id;

        if (userId && session.subscription) {
          const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);
          await upsertSubscriptionFromStripe(userId, stripeSubscription);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const stripeSubscription = event.data.object;
        const metadataUserId = stripeSubscription.metadata?.userId;
        const customerId = String(stripeSubscription.customer || '');

        const userId = metadataUserId || await findUserIdByStripeCustomerId(customerId);
        if (userId) {
          await upsertSubscriptionFromStripe(userId, stripeSubscription);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = String(invoice.customer || '');
        const userId = await findUserIdByStripeCustomerId(customerId);

        if (userId) {
          const providerPaymentId = invoice.payment_intent || invoice.id;
          const existing = await prisma.payment.findFirst({
            where: { providerPaymentId: String(providerPaymentId) },
            select: { id: true },
          });

          if (!existing) {
            await prisma.payment.create({
              data: {
                userId,
                amountCents: Number(invoice.amount_paid || 0),
                currency: String(invoice.currency || 'usd').toLowerCase(),
                status: 'SUCCEEDED',
                provider: 'stripe',
                providerPaymentId: String(providerPaymentId),
                paidAt: parseStripeTimestamp(invoice.status_transitions?.paid_at),
              },
            });
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = String(invoice.customer || '');
        const userId = await findUserIdByStripeCustomerId(customerId);

        if (userId) {
          await prisma.payment.create({
            data: {
              userId,
              amountCents: Number(invoice.amount_due || 0),
              currency: String(invoice.currency || 'usd').toLowerCase(),
              status: 'FAILED',
              provider: 'stripe',
              providerPaymentId: String(invoice.id),
            },
          });
        }
        break;
      }

      default:
        break;
    }

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message || 'Failed to process Stripe webhook.',
      },
    });
  }
}

export default router;
