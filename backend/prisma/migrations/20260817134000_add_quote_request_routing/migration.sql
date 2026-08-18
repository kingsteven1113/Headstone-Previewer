CREATE TYPE "QuoteRequestStatus" AS ENUM ('SUBMITTED', 'IN_REVIEW', 'RESPONDED', 'DECLINED');

CREATE TABLE "QuoteRequest" (
  "id" TEXT NOT NULL,
  "status" "QuoteRequestStatus" NOT NULL DEFAULT 'SUBMITTED',
  "familyName" TEXT NOT NULL,
  "customerEmail" TEXT NOT NULL,
  "customerPhone" TEXT NOT NULL,
  "appointmentWindow" TEXT,
  "notes" TEXT,
  "cemeteryName" TEXT,
  "designTitle" TEXT NOT NULL,
  "designType" TEXT,
  "designColor" TEXT,
  "designShape" TEXT,
  "designStyle" TEXT,
  "designWording" TEXT,
  "accessories" JSONB NOT NULL,
  "additionalSelections" JSONB NOT NULL,
  "preferredDealerName" TEXT,
  "referralCode" TEXT,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "requesterUserId" TEXT NOT NULL,
  "dealerUserId" TEXT NOT NULL,

  CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "QuoteRequest_dealerUserId_submittedAt_idx" ON "QuoteRequest"("dealerUserId", "submittedAt" DESC);
CREATE INDEX "QuoteRequest_requesterUserId_submittedAt_idx" ON "QuoteRequest"("requesterUserId", "submittedAt" DESC);

ALTER TABLE "QuoteRequest"
ADD CONSTRAINT "QuoteRequest_requesterUserId_fkey"
FOREIGN KEY ("requesterUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "QuoteRequest"
ADD CONSTRAINT "QuoteRequest_dealerUserId_fkey"
FOREIGN KEY ("dealerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
