import nodemailer from 'nodemailer';

const EMAIL_NOTIFICATIONS_ENABLED = String(process.env.EMAIL_NOTIFICATIONS_ENABLED || 'false').toLowerCase() === 'true';
const SMTP_HOST = String(process.env.SMTP_HOST || '').trim();
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
const SMTP_USER = String(process.env.SMTP_USER || '').trim();
const SMTP_PASS = String(process.env.SMTP_PASS || '').trim();
const SMTP_FROM = String(process.env.SMTP_FROM || '').trim() || SMTP_USER;
const APP_BASE_URL = String(process.env.APP_BASE_URL || process.env.CLIENT_URL || '').trim();

let transporter = null;
let loggedEmailDisabled = false;

function isEmailConfigured() {
  return EMAIL_NOTIFICATIONS_ENABLED && Boolean(SMTP_HOST) && Number.isInteger(SMTP_PORT) && SMTP_PORT > 0 && Boolean(SMTP_FROM);
}

function getTransporter() {
  if (!isEmailConfigured()) {
    return null;
  }

  if (!transporter) {
    const auth = SMTP_USER && SMTP_PASS
      ? {
          user: SMTP_USER,
          pass: SMTP_PASS,
        }
      : undefined;

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth,
    });
  }

  return transporter;
}

function quoteRequestUrl(quoteRequestId) {
  if (!APP_BASE_URL) {
    return null;
  }

  return `${APP_BASE_URL.replace(/\/$/, '')}/dealer-quotes?request=${encodeURIComponent(quoteRequestId)}`;
}

function formatEmailName(name, fallback) {
  const normalized = String(name || '').trim();
  if (normalized) {
    return normalized;
  }

  return String(fallback || '').trim() || 'there';
}

async function sendEmail({ to, subject, text, html }) {
  const normalizedTo = String(to || '').trim();
  if (!normalizedTo) {
    return;
  }

  const client = getTransporter();
  if (!client) {
    if (!loggedEmailDisabled) {
      loggedEmailDisabled = true;
      console.info('Email notifications are disabled or not configured. Skipping email sends.');
    }
    return;
  }

  await client.sendMail({
    from: SMTP_FROM,
    to: normalizedTo,
    subject,
    text,
    html,
  });
}

export async function sendQuoteRequestMessageNotification({
  recipientEmail,
  recipientName,
  senderName,
  quoteRequestId,
  quoteTitle,
  messageBody,
}) {
  const safeRecipientName = formatEmailName(recipientName, recipientEmail);
  const safeSenderName = formatEmailName(senderName, 'A participant');
  const safeQuoteTitle = String(quoteTitle || 'Memorial quote request').trim();
  const safeMessageBody = String(messageBody || '').trim();
  const detailsUrl = quoteRequestUrl(quoteRequestId);

  const subject = `New message on quote request: ${safeQuoteTitle}`;
  const textLines = [
    `Hello ${safeRecipientName},`,
    '',
    `${safeSenderName} sent a new message on your quote request "${safeQuoteTitle}".`,
    '',
    safeMessageBody ? `Message:\n${safeMessageBody}` : 'Open the quote request to read the latest message.',
  ];

  if (detailsUrl) {
    textLines.push('', `Open request: ${detailsUrl}`);
  }

  const htmlBody = [
    `<p>Hello ${safeRecipientName},</p>`,
    `<p><strong>${safeSenderName}</strong> sent a new message on your quote request <strong>${safeQuoteTitle}</strong>.</p>`,
    safeMessageBody
      ? `<p><strong>Message:</strong><br/>${safeMessageBody.replace(/\n/g, '<br/>')}</p>`
      : '<p>Open the quote request to read the latest message.</p>',
    detailsUrl ? `<p><a href="${detailsUrl}">Open quote request</a></p>` : '',
  ].join('');

  await sendEmail({
    to: recipientEmail,
    subject,
    text: textLines.join('\n'),
    html: htmlBody,
  });
}

export async function sendOfficialQuoteIssuedNotification({
  recipientEmail,
  recipientName,
  dealerName,
  quoteRequestId,
  quoteTitle,
  amountLabel,
}) {
  const safeRecipientName = formatEmailName(recipientName, recipientEmail);
  const safeDealerName = formatEmailName(dealerName, 'Your dealer');
  const safeQuoteTitle = String(quoteTitle || 'Official memorial quote').trim();
  const detailsUrl = quoteRequestUrl(quoteRequestId);

  const subject = `Official quote issued: ${safeQuoteTitle}`;
  const textLines = [
    `Hello ${safeRecipientName},`,
    '',
    `${safeDealerName} issued an official quote on your request "${safeQuoteTitle}".`,
    amountLabel ? `Amount: ${amountLabel}` : '',
    '',
    'Review the quote details and revision history in your Dealer Quotes workspace.',
  ].filter(Boolean);

  if (detailsUrl) {
    textLines.push('', `Open request: ${detailsUrl}`);
  }

  const htmlBody = [
    `<p>Hello ${safeRecipientName},</p>`,
    `<p><strong>${safeDealerName}</strong> issued an official quote on your request <strong>${safeQuoteTitle}</strong>.</p>`,
    amountLabel ? `<p><strong>Amount:</strong> ${amountLabel}</p>` : '',
    '<p>Review the quote details and revision history in your Dealer Quotes workspace.</p>',
    detailsUrl ? `<p><a href="${detailsUrl}">Open quote request</a></p>` : '',
  ].join('');

  await sendEmail({
    to: recipientEmail,
    subject,
    text: textLines.join('\n'),
    html: htmlBody,
  });
}
