import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { generateToken } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/prisma.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const DEALER_VERIFICATION_CODE_LENGTH = 6;
const DEALER_VERIFICATION_WINDOW_MINUTES = 15;
const DEALER_MAX_VERIFICATION_ATTEMPTS = 5;

function shouldExposeDealerVerificationCode() {
  return String(process.env.DEALER_VERIFICATION_DEV_MODE || 'true').trim().toLowerCase() === 'true';
}

function normalizeOptionalString(value) {
  if (!value || !String(value).trim()) {
    return null;
  }

  return String(value).trim();
}

function hashVerificationCode(code) {
  return crypto.createHash('sha256').update(code).digest('hex');
}

function generateDealerVerificationCode() {
  const max = 10 ** DEALER_VERIFICATION_CODE_LENGTH;
  const code = crypto.randomInt(0, max).toString().padStart(DEALER_VERIFICATION_CODE_LENGTH, '0');
  return code;
}

function formatAuthUser(user) {
  return {
    email: user.email,
    name: user.displayName || user.email,
    role: user.role,
    accountType: user.role === 'DEALER' || user.role === 'DEALER_PENDING' ? 'dealer' : 'funeral_home',
    dealerVerificationStatus: user.dealerProfile?.verificationStatus?.toLowerCase() || null,
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
      include: {
        subscription: true,
        dealerProfile: true,
      },
    });

    if (user.role === 'DEALER_PENDING') {
      return next(new ApiError(403, 'Dealer account verification is still pending. Complete dealer verification before logging in.'));
    }

    const token = generateToken(user.id, user.email, user.role);

    res.json({
      token,
      user: formatAuthUser(user),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/dealer/register', async (req, res, next) => {
  try {
    const { email, name, businessName, businessPhone, website, taxIdLast4 } = req.body;

    if (!email || !String(email).trim()) {
      return next(new ApiError(400, 'Email is required'));
    }

    if (!name || !String(name).trim()) {
      return next(new ApiError(400, 'Contact name is required'));
    }

    if (!businessName || !String(businessName).trim()) {
      return next(new ApiError(400, 'Business name is required'));
    }

    if (!businessPhone || !String(businessPhone).trim()) {
      return next(new ApiError(400, 'Business phone is required'));
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();
    const normalizedBusinessName = String(businessName).trim();
    const normalizedBusinessPhone = String(businessPhone).trim();
    const normalizedWebsite = normalizeOptionalString(website);
    const normalizedTaxIdLast4 = normalizeOptionalString(taxIdLast4);

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { dealerProfile: true },
    });

    if (existingUser?.role === 'DEALER') {
      return next(new ApiError(409, 'This email is already a verified dealer account. Please sign in instead.'));
    }

    if (existingUser && existingUser.role !== 'DEALER_PENDING' && existingUser.role !== 'DEALER') {
      return next(new ApiError(409, 'This email is already registered as a funeral-home account. Use a different email for dealer onboarding.'));
    }

    const user = await prisma.user.upsert({
      where: { email: normalizedEmail },
      update: {
        displayName: normalizedName,
        role: 'DEALER_PENDING',
      },
      create: {
        email: normalizedEmail,
        displayName: normalizedName,
        role: 'DEALER_PENDING',
      },
    });

    await prisma.dealerProfile.upsert({
      where: { userId: user.id },
      update: {
        businessName: normalizedBusinessName,
        businessPhone: normalizedBusinessPhone,
        website: normalizedWebsite,
        taxIdLast4: normalizedTaxIdLast4,
        verificationStatus: 'PENDING',
      },
      create: {
        userId: user.id,
        businessName: normalizedBusinessName,
        businessPhone: normalizedBusinessPhone,
        website: normalizedWebsite,
        taxIdLast4: normalizedTaxIdLast4,
        verificationStatus: 'PENDING',
      },
    });

    await prisma.dealerVerification.updateMany({
      where: {
        userId: user.id,
        consumedAt: null,
      },
      data: {
        consumedAt: new Date(),
      },
    });

    const verificationCode = generateDealerVerificationCode();
    const expiresAt = new Date(Date.now() + DEALER_VERIFICATION_WINDOW_MINUTES * 60 * 1000);

    await prisma.dealerVerification.create({
      data: {
        userId: user.id,
        codeHash: hashVerificationCode(verificationCode),
        expiresAt,
      },
    });

    // In production this should be delivered by email/SMS; dev mode can expose code directly.
    if (shouldExposeDealerVerificationCode()) {
      console.warn(`Dealer verification code for ${normalizedEmail}: ${verificationCode}`);
    }

    res.status(201).json({
      message: 'Dealer registration started. Enter the verification code to activate dealer access.',
      email: normalizedEmail,
      expiresAt,
      verificationCode: shouldExposeDealerVerificationCode() ? verificationCode : undefined,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/dealer/verify', async (req, res, next) => {
  try {
    const { email, code } = req.body;

    if (!email || !String(email).trim()) {
      return next(new ApiError(400, 'Email is required'));
    }

    if (!code || !String(code).trim()) {
      return next(new ApiError(400, 'Verification code is required'));
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedCode = String(code).trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { dealerProfile: true, subscription: true },
    });

    if (!user || (user.role !== 'DEALER_PENDING' && user.role !== 'DEALER')) {
      return next(new ApiError(404, 'Dealer registration not found for this email'));
    }

    const challenge = await prisma.dealerVerification.findFirst({
      where: {
        userId: user.id,
        consumedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!challenge) {
      return next(new ApiError(400, 'No active verification challenge found. Start dealer registration again.'));
    }

    if (challenge.expiresAt.getTime() < Date.now()) {
      await prisma.dealerVerification.update({
        where: { id: challenge.id },
        data: { consumedAt: new Date() },
      });
      return next(new ApiError(400, 'Verification code expired. Register again to receive a new code.'));
    }

    if (challenge.attempts >= DEALER_MAX_VERIFICATION_ATTEMPTS) {
      await prisma.dealerVerification.update({
        where: { id: challenge.id },
        data: { consumedAt: new Date() },
      });
      return next(new ApiError(400, 'Too many failed attempts. Register again to receive a new code.'));
    }

    const submittedHash = hashVerificationCode(normalizedCode);
    if (submittedHash !== challenge.codeHash) {
      await prisma.dealerVerification.update({
        where: { id: challenge.id },
        data: { attempts: challenge.attempts + 1 },
      });
      return next(new ApiError(400, 'Invalid verification code'));
    }

    await prisma.dealerVerification.update({
      where: { id: challenge.id },
      data: { consumedAt: new Date() },
    });

    const verifiedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        role: 'DEALER',
        dealerProfile: {
          update: {
            verificationStatus: 'VERIFIED',
            verifiedAt: new Date(),
          },
        },
      },
      include: {
        subscription: true,
        dealerProfile: true,
      },
    });

    await prisma.subscription.upsert({
      where: { userId: verifiedUser.id },
      update: {},
      create: {
        userId: verifiedUser.id,
        planName: 'trial',
        status: 'TRIAL',
      },
    });

    const authedUser = await prisma.user.findUnique({
      where: { id: verifiedUser.id },
      include: {
        subscription: true,
        dealerProfile: true,
      },
    });

    const token = generateToken(authedUser.id, authedUser.email, authedUser.role);

    res.json({
      token,
      user: formatAuthUser(authedUser),
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
      include: {
        subscription: true,
        dealerProfile: true,
      },
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
