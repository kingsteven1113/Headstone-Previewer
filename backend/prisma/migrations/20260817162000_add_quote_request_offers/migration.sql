CREATE TYPE "QuoteOfferStatus" AS ENUM ('SENT', 'REVISED', 'WITHDRAWN');

CREATE TABLE "QuoteRequestOffer" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "amountCents" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'usd',
  "leadTimeDays" INTEGER,
  "validUntil" TIMESTAMP(3),
  "scopeSummary" TEXT,
  "terms" TEXT,
  "status" "QuoteOfferStatus" NOT NULL DEFAULT 'SENT',
  "isCurrent" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "quoteRequestId" TEXT NOT NULL,
  "dealerUserId" TEXT NOT NULL,

  CONSTRAINT "QuoteRequestOffer_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "QuoteRequestOffer_quoteRequestId_createdAt_idx" ON "QuoteRequestOffer"("quoteRequestId", "createdAt" DESC);
CREATE INDEX "QuoteRequestOffer_dealerUserId_createdAt_idx" ON "QuoteRequestOffer"("dealerUserId", "createdAt" DESC);

ALTER TABLE "QuoteRequestOffer"
ADD CONSTRAINT "QuoteRequestOffer_quoteRequestId_fkey"
FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "QuoteRequestOffer"
ADD CONSTRAINT "QuoteRequestOffer_dealerUserId_fkey"
FOREIGN KEY ("dealerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
