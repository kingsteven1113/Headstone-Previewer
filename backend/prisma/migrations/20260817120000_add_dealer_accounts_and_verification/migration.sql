-- Expand user roles for dealer onboarding and verified dealer access.
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'DEALER_PENDING';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'DEALER';

-- Dealer verification lifecycle states.
CREATE TYPE "DealerVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

CREATE TABLE "DealerProfile" (
  "id" TEXT NOT NULL,
  "businessName" TEXT NOT NULL,
  "businessPhone" TEXT NOT NULL,
  "website" TEXT,
  "taxIdLast4" TEXT,
  "verificationStatus" "DealerVerificationStatus" NOT NULL DEFAULT 'PENDING',
  "verifiedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "userId" TEXT NOT NULL,

  CONSTRAINT "DealerProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DealerVerification" (
  "id" TEXT NOT NULL,
  "codeHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "consumedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" TEXT NOT NULL,

  CONSTRAINT "DealerVerification_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "DealerProfile_userId_key" ON "DealerProfile"("userId");
CREATE INDEX "DealerVerification_userId_createdAt_idx" ON "DealerVerification"("userId", "createdAt" DESC);

ALTER TABLE "DealerProfile"
ADD CONSTRAINT "DealerProfile_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "DealerVerification"
ADD CONSTRAINT "DealerVerification_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
