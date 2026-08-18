CREATE TABLE "QuoteRequestMessage" (
  "id" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "quoteRequestId" TEXT NOT NULL,
  "senderUserId" TEXT NOT NULL,

  CONSTRAINT "QuoteRequestMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "QuoteRequestMessage_quoteRequestId_createdAt_idx" ON "QuoteRequestMessage"("quoteRequestId", "createdAt" ASC);
CREATE INDEX "QuoteRequestMessage_senderUserId_createdAt_idx" ON "QuoteRequestMessage"("senderUserId", "createdAt" DESC);

ALTER TABLE "QuoteRequestMessage"
ADD CONSTRAINT "QuoteRequestMessage_quoteRequestId_fkey"
FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "QuoteRequestMessage"
ADD CONSTRAINT "QuoteRequestMessage_senderUserId_fkey"
FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
