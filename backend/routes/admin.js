import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/prisma.js';

const router = express.Router();

router.use(verifyToken, requireAdmin);

router.get('/overview', async (req, res, next) => {
  try {
    const [
      totalAccounts,
      totalAdmins,
      activeSubscriptions,
      trialSubscriptions,
      totalPayments,
      revenueAggregate,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.subscription.count({ where: { status: 'TRIAL' } }),
      prisma.payment.count(),
      prisma.payment.aggregate({
        _sum: { amountCents: true },
        where: { status: 'SUCCEEDED' },
      }),
    ]);

    res.json({
      totalAccounts,
      totalAdmins,
      activeSubscriptions,
      trialSubscriptions,
      totalPayments,
      totalRevenueCents: revenueAggregate._sum.amountCents || 0,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/accounts', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        subscription: true,
        _count: {
          select: {
            projects: true,
            payments: true,
          },
        },
      },
    });

    const successfulPayments = await prisma.payment.groupBy({
      by: ['userId'],
      where: { status: 'SUCCEEDED' },
      _sum: { amountCents: true },
    });

    const totalsByUserId = new Map(
      successfulPayments.map((paymentSummary) => [
        paymentSummary.userId,
        paymentSummary._sum.amountCents || 0,
      ])
    );

    const accounts = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.displayName || user.email,
      role: user.role,
      createdAt: user.createdAt,
      projectCount: user._count.projects,
      paymentCount: user._count.payments,
      totalPaidCents: totalsByUserId.get(user.id) || 0,
      subscription: {
        plan: user.subscription?.planName || 'trial',
        status: (user.subscription?.status || 'TRIAL').toLowerCase(),
        currentPeriodEnd: user.subscription?.currentPeriodEnd || null,
      },
    }));

    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/payments', async (req, res, next) => {
  try {
    const limit = Number.parseInt(req.query.limit, 10);
    const take = Number.isNaN(limit) ? 100 : Math.max(1, Math.min(limit, 500));

    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take,
      include: {
        user: {
          select: {
            email: true,
            displayName: true,
          },
        },
      },
    });

    const response = payments.map((payment) => ({
      id: payment.id,
      userId: payment.userId,
      userEmail: payment.user.email,
      userName: payment.user.displayName || payment.user.email,
      provider: payment.provider,
      providerPaymentId: payment.providerPaymentId,
      amountCents: payment.amountCents,
      currency: payment.currency,
      status: payment.status.toLowerCase(),
      paidAt: payment.paidAt,
      createdAt: payment.createdAt,
    }));

    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/subscriptions', async (req, res, next) => {
  try {
    const { userId, planName, status, trialEndsAt, currentPeriodStart, currentPeriodEnd } = req.body;

    if (!userId || !planName || !status) {
      return next(new ApiError(400, 'userId, planName, and status are required'));
    }

    const normalizedStatus = String(status).trim().toUpperCase();
    const validStatuses = new Set(['TRIAL', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'FREE']);
    if (!validStatuses.has(normalizedStatus)) {
      return next(new ApiError(400, 'Invalid subscription status'));
    }

    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        planName: String(planName).trim(),
        status: normalizedStatus,
        trialEndsAt: trialEndsAt ? new Date(trialEndsAt) : null,
        currentPeriodStart: currentPeriodStart ? new Date(currentPeriodStart) : null,
        currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : null,
      },
      create: {
        userId,
        planName: String(planName).trim(),
        status: normalizedStatus,
        trialEndsAt: trialEndsAt ? new Date(trialEndsAt) : null,
        currentPeriodStart: currentPeriodStart ? new Date(currentPeriodStart) : null,
        currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : null,
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
});

router.post('/payments', async (req, res, next) => {
  try {
    const { userId, amountCents, currency = 'usd', status = 'PENDING', provider = 'manual', providerPaymentId, paidAt } = req.body;

    if (!userId || !Number.isInteger(amountCents) || amountCents < 0) {
      return next(new ApiError(400, 'userId and a non-negative integer amountCents are required'));
    }

    const normalizedStatus = String(status).trim().toUpperCase();
    const validStatuses = new Set(['PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED']);
    if (!validStatuses.has(normalizedStatus)) {
      return next(new ApiError(400, 'Invalid payment status'));
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        amountCents,
        currency: String(currency).toLowerCase(),
        status: normalizedStatus,
        provider: String(provider).trim() || 'manual',
        providerPaymentId: providerPaymentId ? String(providerPaymentId).trim() : null,
        paidAt: paidAt ? new Date(paidAt) : null,
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
});

export default router;
