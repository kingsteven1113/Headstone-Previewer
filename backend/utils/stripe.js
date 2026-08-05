import Stripe from 'stripe';
import { normalizePlanName } from './subscriptionRules.js';

let stripeClient;

const PLAN_PRICE_ENV_KEYS = {
  professional: 'STRIPE_PRICE_PROFESSIONAL_MONTHLY',
  studio: 'STRIPE_PRICE_STUDIO_MONTHLY',
  enterprise: 'STRIPE_PRICE_ENTERPRISE_MONTHLY',
};

const STATUS_MAP = {
  trialing: 'TRIAL',
  active: 'ACTIVE',
  past_due: 'PAST_DUE',
  unpaid: 'PAST_DUE',
  incomplete: 'PAST_DUE',
  incomplete_expired: 'CANCELED',
  canceled: 'CANCELED',
};

export function isStripeConfigured() {
  return isStripeSecretConfigured();
}

export function isStripeSecretConfigured() {
  return Boolean((process.env.STRIPE_SECRET_KEY || '').trim());
}

export function isStripeWebhookConfigured() {
  return Boolean((process.env.STRIPE_WEBHOOK_SECRET || '').trim());
}

export function isStripeFullyConfigured() {
  return isStripeSecretConfigured() && isStripeWebhookConfigured();
}

export function getStripeClient() {
  if (stripeClient) {
    return stripeClient;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  stripeClient = new Stripe(secretKey, {
    apiVersion: '2025-07-30.basil',
  });

  return stripeClient;
}

export function getPriceIdForPlan(planName) {
  const normalizedPlan = normalizePlanName(planName);
  const envKey = PLAN_PRICE_ENV_KEYS[normalizedPlan];
  if (!envKey) {
    return null;
  }

  const priceId = (process.env[envKey] || '').trim();
  return priceId || null;
}

export function getPlanCatalog() {
  return [
    {
      planName: 'trial',
      label: 'Trial',
      billing: 'none',
      stripePriceId: null,
      checkoutEnabled: false,
    },
    {
      planName: 'free',
      label: 'Free',
      billing: 'none',
      stripePriceId: null,
      checkoutEnabled: false,
    },
    {
      planName: 'professional',
      label: 'Professional',
      billing: 'subscription',
      stripePriceId: getPriceIdForPlan('professional'),
      checkoutEnabled: Boolean(getPriceIdForPlan('professional')),
    },
    {
      planName: 'studio',
      label: 'Studio',
      billing: 'subscription',
      stripePriceId: getPriceIdForPlan('studio'),
      checkoutEnabled: Boolean(getPriceIdForPlan('studio')),
    },
    {
      planName: 'enterprise',
      label: 'Enterprise',
      billing: 'subscription',
      stripePriceId: getPriceIdForPlan('enterprise'),
      checkoutEnabled: Boolean(getPriceIdForPlan('enterprise')),
    },
  ];
}

export function getPlanFromPriceId(priceId) {
  if (!priceId) {
    return 'trial';
  }

  const entry = Object.entries(PLAN_PRICE_ENV_KEYS).find(([, envKey]) => (process.env[envKey] || '').trim() === priceId);
  if (!entry) {
    return 'trial';
  }

  return entry[0];
}

export function mapStripeSubscriptionStatus(status) {
  const normalized = String(status || '').trim().toLowerCase();
  return STATUS_MAP[normalized] || 'FREE';
}

export function getBillingRedirectUrls() {
  const fallbackClientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim();

  const successUrl = (process.env.STRIPE_CHECKOUT_SUCCESS_URL || `${fallbackClientUrl}/dashboard?billing=success`).trim();
  const cancelUrl = (process.env.STRIPE_CHECKOUT_CANCEL_URL || `${fallbackClientUrl}/dashboard?billing=cancelled`).trim();

  return {
    successUrl,
    cancelUrl,
  };
}
