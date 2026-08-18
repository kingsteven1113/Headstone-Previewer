import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/prisma.js';
import {
  sendOfficialQuoteIssuedNotification,
  sendQuoteRequestMessageNotification,
} from '../utils/emailNotifications.js';

const router = express.Router();

function normalizeText(value) {
  const normalized = String(value || '').trim();
  return normalized || null;
}

function normalizeAccessories(accessories) {
  if (!Array.isArray(accessories)) {
    return [];
  }

  return accessories
    .map((entry) => String(entry || '').trim())
    .filter(Boolean);
}

function normalizeAdditionalSelections(selections) {
  if (!selections || typeof selections !== 'object') {
    return {};
  }

  const entries = Object.entries(selections).map(([key, value]) => [
    String(key).trim(),
    normalizeText(value),
  ]);

  return Object.fromEntries(entries.filter(([key]) => Boolean(key)));
}

function mapQuoteRequestResponse(record) {
  const lastMessage = Array.isArray(record.messages) && record.messages.length > 0
    ? record.messages[record.messages.length - 1]
    : null;

  return {
    id: record.id,
    status: record.status.toLowerCase(),
    submittedAt: record.submittedAt,
    updatedAt: record.updatedAt,
    customer: {
      familyName: record.familyName,
      email: record.customerEmail,
      phone: record.customerPhone,
      appointmentWindow: record.appointmentWindow,
      notes: record.notes,
      cemeteryName: record.cemeteryName,
    },
    design: {
      title: record.designTitle,
      type: record.designType,
      color: record.designColor,
      shape: record.designShape,
      designStyle: record.designStyle,
      wording: record.designWording,
      accessories: Array.isArray(record.accessories) ? record.accessories : [],
      additionalCategorySelections: record.additionalSelections || {},
    },
    referralAttribution: {
      preferredDealer: record.preferredDealerName,
      referralCode: record.referralCode,
      commissionEligible: Boolean(record.preferredDealerName || record.referralCode),
    },
    requester: record.requesterUser
      ? {
          id: record.requesterUser.id,
          email: record.requesterUser.email,
          name: record.requesterUser.displayName || record.requesterUser.email,
        }
      : null,
    dealer: record.dealerUser
      ? {
          id: record.dealerUser.id,
          email: record.dealerUser.email,
          name: record.dealerUser.displayName || record.dealerUser.email,
          businessName: record.dealerUser.dealerProfile?.businessName || null,
        }
      : null,
    messageCount: Array.isArray(record.messages) ? record.messages.length : 0,
    lastMessage: lastMessage
      ? {
          id: lastMessage.id,
          body: lastMessage.body,
          createdAt: lastMessage.createdAt,
          sender: {
            id: lastMessage.senderUser?.id,
            email: lastMessage.senderUser?.email,
            name: lastMessage.senderUser?.displayName || lastMessage.senderUser?.email,
          },
        }
      : null,
    offerCount: Array.isArray(record.offers) ? record.offers.length : 0,
    currentOffer: Array.isArray(record.offers)
      ? mapQuoteRequestOffer(record.offers.find((offer) => offer.isCurrent) || record.offers[0] || null)
      : null,
  };
}

function mapQuoteRequestMessage(record) {
  return {
    id: record.id,
    body: record.body,
    createdAt: record.createdAt,
    sender: record.senderUser
      ? {
          id: record.senderUser.id,
          email: record.senderUser.email,
          name: record.senderUser.displayName || record.senderUser.email,
          role: record.senderUser.role,
        }
      : null,
  };
}

function mapQuoteRequestOffer(record) {
  if (!record) {
    return null;
  }

  return {
    id: record.id,
    title: record.title,
    amountCents: record.amountCents,
    currency: record.currency,
    leadTimeDays: record.leadTimeDays,
    validUntil: record.validUntil,
    scopeSummary: record.scopeSummary,
    terms: record.terms,
    status: record.status.toLowerCase(),
    isCurrent: Boolean(record.isCurrent),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    dealer: record.dealerUser
      ? {
          id: record.dealerUser.id,
          email: record.dealerUser.email,
          name: record.dealerUser.displayName || record.dealerUser.email,
          businessName: record.dealerUser.dealerProfile?.businessName || null,
        }
      : null,
  };
}

function formatMoney(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase(),
  }).format((Number(cents) || 0) / 100);
}

async function findAccessibleQuoteRequest(quoteRequestId, userId) {
  return prisma.quoteRequest.findFirst({
    where: {
      id: quoteRequestId,
      OR: [
        { requesterUserId: userId },
        { dealerUserId: userId },
      ],
    },
  });
}

router.use(verifyToken);

router.get('/dealers', async (req, res, next) => {
  try {
    const dealers = await prisma.user.findMany({
      where: {
        role: 'DEALER',
        dealerProfile: {
          verificationStatus: 'VERIFIED',
        },
      },
      include: {
        dealerProfile: true,
      },
      orderBy: {
        dealerProfile: {
          businessName: 'asc',
        },
      },
    });

    const response = dealers.map((dealer) => ({
      id: dealer.id,
      email: dealer.email,
      name: dealer.displayName || dealer.email,
      businessName: dealer.dealerProfile?.businessName || dealer.displayName || dealer.email,
      businessPhone: dealer.dealerProfile?.businessPhone || null,
      website: dealer.dealerProfile?.website || null,
      verificationStatus: dealer.dealerProfile?.verificationStatus?.toLowerCase() || 'pending',
    }));

    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.userRole === 'DEALER' || req.userRole === 'DEALER_PENDING') {
      return next(new ApiError(403, 'Dealer accounts cannot submit funeral-home quote requests.'));
    }

    const { dealerUserId, customer = {}, design = {}, referralAttribution = {} } = req.body;

    const normalizedDealerUserId = String(dealerUserId || '').trim();
    if (!normalizedDealerUserId) {
      return next(new ApiError(400, 'dealerUserId is required'));
    }

    const familyName = normalizeText(customer.familyName);
    const customerEmail = normalizeText(customer.email);
    const customerPhone = normalizeText(customer.phone);
    const designTitle = normalizeText(design.title);

    if (!familyName || !customerEmail || !customerPhone || !designTitle) {
      return next(new ApiError(400, 'Family name, customer email, customer phone, and design title are required.'));
    }

    const dealer = await prisma.user.findFirst({
      where: {
        id: normalizedDealerUserId,
        role: 'DEALER',
        dealerProfile: {
          verificationStatus: 'VERIFIED',
        },
      },
    });

    if (!dealer) {
      return next(new ApiError(404, 'Selected dealer is not available for quote routing.'));
    }

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        requesterUserId: req.userId,
        dealerUserId: normalizedDealerUserId,
        familyName,
        customerEmail,
        customerPhone,
        appointmentWindow: normalizeText(customer.appointmentWindow),
        notes: normalizeText(customer.notes),
        cemeteryName: normalizeText(customer.cemeteryName),
        designTitle,
        designType: normalizeText(design.type),
        designColor: normalizeText(design.color),
        designShape: normalizeText(design.shape),
        designStyle: normalizeText(design.designStyle),
        designWording: normalizeText(design.wording),
        accessories: normalizeAccessories(design.accessories),
        additionalSelections: normalizeAdditionalSelections(design.additionalCategorySelections),
        preferredDealerName: normalizeText(referralAttribution.preferredDealer),
        referralCode: normalizeText(referralAttribution.referralCode),
      },
      include: {
        requesterUser: {
          select: { id: true, email: true, displayName: true },
        },
        dealerUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            dealerProfile: {
              select: { businessName: true },
            },
          },
        },
        messages: {
          include: {
            senderUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        offers: {
          include: {
            dealerUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
                dealerProfile: {
                  select: {
                    businessName: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    res.status(201).json(mapQuoteRequestResponse(quoteRequest));
  } catch (error) {
    next(error);
  }
});

router.get('/mine', async (req, res, next) => {
  try {
    const quoteRequests = await prisma.quoteRequest.findMany({
      where: {
        requesterUserId: req.userId,
      },
      include: {
        dealerUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            dealerProfile: {
              select: { businessName: true },
            },
          },
        },
        messages: {
          include: {
            senderUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        offers: {
          include: {
            dealerUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
                dealerProfile: {
                  select: {
                    businessName: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: 50,
    });

    res.json(quoteRequests.map((record) => mapQuoteRequestResponse(record)));
  } catch (error) {
    next(error);
  }
});

router.get('/inbox', async (req, res, next) => {
  try {
    if (req.userRole !== 'DEALER') {
      return next(new ApiError(403, 'Dealer access required for quote inbox.'));
    }

    const quoteRequests = await prisma.quoteRequest.findMany({
      where: {
        dealerUserId: req.userId,
      },
      include: {
        requesterUser: {
          select: { id: true, email: true, displayName: true },
        },
        dealerUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            dealerProfile: {
              select: { businessName: true },
            },
          },
        },
        messages: {
          include: {
            senderUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        offers: {
          include: {
            dealerUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
                dealerProfile: {
                  select: {
                    businessName: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: 100,
    });

    res.json(quoteRequests.map((record) => mapQuoteRequestResponse(record)));
  } catch (error) {
    next(error);
  }
});

router.patch('/:quoteRequestId/status', async (req, res, next) => {
  try {
    if (req.userRole !== 'DEALER') {
      return next(new ApiError(403, 'Dealer access required to update quote request status.'));
    }

    const normalizedStatus = String(req.body.status || '').trim().toUpperCase();
    const validStatuses = new Set(['IN_REVIEW', 'RESPONDED', 'DECLINED']);

    if (!validStatuses.has(normalizedStatus)) {
      return next(new ApiError(400, 'Invalid status. Use in_review, responded, or declined.'));
    }

    const existingQuoteRequest = await prisma.quoteRequest.findFirst({
      where: {
        id: req.params.quoteRequestId,
        dealerUserId: req.userId,
      },
    });

    if (!existingQuoteRequest) {
      return next(new ApiError(404, 'Quote request not found'));
    }

    const updatedQuoteRequest = await prisma.quoteRequest.update({
      where: {
        id: existingQuoteRequest.id,
      },
      data: {
        status: normalizedStatus,
      },
      include: {
        requesterUser: {
          select: { id: true, email: true, displayName: true },
        },
        dealerUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            dealerProfile: {
              select: { businessName: true },
            },
          },
        },
        messages: {
          include: {
            senderUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        offers: {
          include: {
            dealerUser: {
              select: {
                id: true,
                email: true,
                displayName: true,
                dealerProfile: {
                  select: {
                    businessName: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    res.json(mapQuoteRequestResponse(updatedQuoteRequest));
  } catch (error) {
    next(error);
  }
});

router.get('/:quoteRequestId/messages', async (req, res, next) => {
  try {
    const quoteRequest = await findAccessibleQuoteRequest(req.params.quoteRequestId, req.userId);
    if (!quoteRequest) {
      return next(new ApiError(404, 'Quote request not found'));
    }

    const messages = await prisma.quoteRequestMessage.findMany({
      where: {
        quoteRequestId: quoteRequest.id,
      },
      include: {
        senderUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 200,
    });

    res.json(messages.map((message) => mapQuoteRequestMessage(message)));
  } catch (error) {
    next(error);
  }
});

router.post('/:quoteRequestId/messages', async (req, res, next) => {
  try {
    const quoteRequest = await findAccessibleQuoteRequest(req.params.quoteRequestId, req.userId);
    if (!quoteRequest) {
      return next(new ApiError(404, 'Quote request not found'));
    }

    const body = normalizeText(req.body.body);
    if (!body) {
      return next(new ApiError(400, 'Message body is required'));
    }

    const message = await prisma.quoteRequestMessage.create({
      data: {
        quoteRequestId: quoteRequest.id,
        senderUserId: req.userId,
        body,
      },
      include: {
        senderUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            role: true,
          },
        },
      },
    });

    await prisma.quoteRequest.update({
      where: { id: quoteRequest.id },
      data: { updatedAt: new Date() },
    });

    const notificationContext = await prisma.quoteRequest.findUnique({
      where: { id: quoteRequest.id },
      select: {
        id: true,
        designTitle: true,
        requesterUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
          },
        },
        dealerUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            dealerProfile: {
              select: {
                businessName: true,
              },
            },
          },
        },
      },
    });

    if (notificationContext) {
      const senderName = message.senderUser?.displayName || message.senderUser?.email || 'A participant';
      const recipient = notificationContext.requesterUser?.id === req.userId
        ? notificationContext.dealerUser
        : notificationContext.requesterUser;

      if (recipient?.email) {
        try {
          await sendQuoteRequestMessageNotification({
            recipientEmail: recipient.email,
            recipientName: recipient.displayName || recipient.dealerProfile?.businessName || recipient.email,
            senderName,
            quoteRequestId: notificationContext.id,
            quoteTitle: notificationContext.designTitle,
            messageBody: body,
          });
        } catch (emailError) {
          console.error('Failed to send quote message notification email:', emailError);
        }
      }
    }

    res.status(201).json(mapQuoteRequestMessage(message));
  } catch (error) {
    next(error);
  }
});

router.get('/:quoteRequestId/offers', async (req, res, next) => {
  try {
    const quoteRequest = await findAccessibleQuoteRequest(req.params.quoteRequestId, req.userId);
    if (!quoteRequest) {
      return next(new ApiError(404, 'Quote request not found'));
    }

    const offers = await prisma.quoteRequestOffer.findMany({
      where: {
        quoteRequestId: quoteRequest.id,
      },
      include: {
        dealerUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            dealerProfile: {
              select: {
                businessName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(offers.map((offer) => mapQuoteRequestOffer(offer)));
  } catch (error) {
    next(error);
  }
});

router.post('/:quoteRequestId/offers', async (req, res, next) => {
  try {
    if (req.userRole !== 'DEALER') {
      return next(new ApiError(403, 'Dealer access required to send official quotes.'));
    }

    const quoteRequest = await prisma.quoteRequest.findFirst({
      where: {
        id: req.params.quoteRequestId,
        dealerUserId: req.userId,
      },
      include: {
        requesterUser: {
          select: {
            email: true,
            displayName: true,
          },
        },
        dealerUser: {
          select: {
            email: true,
            displayName: true,
            dealerProfile: {
              select: {
                businessName: true,
              },
            },
          },
        },
      },
    });

    if (!quoteRequest) {
      return next(new ApiError(404, 'Quote request not found'));
    }

    const title = normalizeText(req.body.title);
    const amountCents = Number.parseInt(req.body.amountCents, 10);
    const currency = String(req.body.currency || 'usd').trim().toLowerCase();
    const leadTimeDays = req.body.leadTimeDays === undefined || req.body.leadTimeDays === null || req.body.leadTimeDays === ''
      ? null
      : Number.parseInt(req.body.leadTimeDays, 10);
    const validUntil = normalizeText(req.body.validUntil);
    const scopeSummary = normalizeText(req.body.scopeSummary);
    const terms = normalizeText(req.body.terms);

    if (!title) {
      return next(new ApiError(400, 'Offer title is required'));
    }

    if (!Number.isInteger(amountCents) || amountCents < 0) {
      return next(new ApiError(400, 'amountCents must be a non-negative integer'));
    }

    if (leadTimeDays !== null && (!Number.isInteger(leadTimeDays) || leadTimeDays < 0)) {
      return next(new ApiError(400, 'leadTimeDays must be a non-negative integer when provided'));
    }

    const offer = await prisma.$transaction(async (tx) => {
      await tx.quoteRequestOffer.updateMany({
        where: {
          quoteRequestId: quoteRequest.id,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
          status: 'REVISED',
        },
      });

      const createdOffer = await tx.quoteRequestOffer.create({
        data: {
          quoteRequestId: quoteRequest.id,
          dealerUserId: req.userId,
          title,
          amountCents,
          currency,
          leadTimeDays,
          validUntil: validUntil ? new Date(validUntil) : null,
          scopeSummary,
          terms,
          status: 'SENT',
          isCurrent: true,
        },
        include: {
          dealerUser: {
            select: {
              id: true,
              email: true,
              displayName: true,
              dealerProfile: {
                select: {
                  businessName: true,
                },
              },
            },
          },
        },
      });

      await tx.quoteRequest.update({
        where: { id: quoteRequest.id },
        data: {
          status: 'RESPONDED',
          updatedAt: new Date(),
        },
      });

      return createdOffer;
    });

    if (quoteRequest.requesterUser?.email) {
      try {
        await sendOfficialQuoteIssuedNotification({
          recipientEmail: quoteRequest.requesterUser.email,
          recipientName: quoteRequest.requesterUser.displayName || quoteRequest.requesterUser.email,
          dealerName:
            quoteRequest.dealerUser?.dealerProfile?.businessName
            || quoteRequest.dealerUser?.displayName
            || quoteRequest.dealerUser?.email
            || 'Your dealer',
          quoteRequestId: quoteRequest.id,
          quoteTitle: quoteRequest.designTitle,
          amountLabel: formatMoney(offer.amountCents, offer.currency),
        });
      } catch (emailError) {
        console.error('Failed to send official quote issued email:', emailError);
      }
    }

    res.status(201).json(mapQuoteRequestOffer(offer));
  } catch (error) {
    next(error);
  }
});

export default router;
