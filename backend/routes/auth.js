import express from 'express';
import jwt from 'jsonwebtoken';
import { generateToken } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/prisma.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();

function formatAuthUser(user) {
  return {
    email: user.email,
    name: user.displayName || user.email,
    role: user.role,
    plan: user.subscription?.planName || 'trial',
    subscriptionStatus: (user.subscription?.status || 'TRIAL').toLowerCase(),
  };
}

// Mock authentication - In production, this would check against a database
// For now, we'll accept any email and generate a token
router.post('/login', async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email || !email.trim()) {
      return next(new ApiError(400, 'Email is required'));
    }

    const normalizedEmail = email.trim().toLowerCase();
    const shouldBeAdmin = ADMIN_EMAIL && normalizedEmail === ADMIN_EMAIL;

    // Upsert the user so auth remains passwordless for this phase while data persists.
    const upsertedUser = await prisma.user.upsert({
      where: { email: normalizedEmail },
      update: {
        displayName: name?.trim() || undefined,
      },
      create: {
        email: normalizedEmail,
        displayName: name?.trim() || null,
        role: shouldBeAdmin ? 'ADMIN' : 'MEMBER',
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (shouldBeAdmin && upsertedUser.role !== 'ADMIN') {
      await prisma.user.update({
        where: { id: upsertedUser.id },
        data: { role: 'ADMIN' },
      });
    }

    await prisma.subscription.upsert({
      where: { userId: upsertedUser.id },
      update: {},
      create: {
        userId: upsertedUser.id,
        planName: 'trial',
        status: 'TRIAL',
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: upsertedUser.id },
      include: { subscription: true },
    });

    const token = generateToken(user.id, user.email, user.role);

    res.json({
      token,
      user: formatAuthUser(user),
    });
  } catch (error) {
    next(error);
  }
});

// Verify token endpoint
router.post('/verify', async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return next(new ApiError(400, 'Token is required'));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { subscription: true },
    });

    if (!user) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      user: formatAuthUser(user),
    });
  } catch (error) {
    res.json({ valid: false });
  }
});

export default router;
