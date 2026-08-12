export const QUOTE_REQUEST_INTAKE_KEY = 'headstone-previewer-quote-intake-draft';

function normalizeText(value) {
  return String(value || '').trim();
}

function normalizeAccessories(accessories) {
  if (!Array.isArray(accessories)) {
    return [];
  }

  return accessories
    .map((entry) => normalizeText(entry))
    .filter(Boolean);
}

function normalizeAdditionalCategorySelections(selections) {
  if (!selections || typeof selections !== 'object') {
    return {};
  }

  return Object.entries(selections).reduce((accumulator, [key, value]) => {
    const normalizedValue = normalizeText(value);
    accumulator[key] = normalizedValue || null;
    return accumulator;
  }, {});
}

export function buildQuoteRequestIntake({ draft, formData }) {
  const normalizedForm = {
    familyName: normalizeText(formData?.familyName),
    email: normalizeText(formData?.email),
    phone: normalizeText(formData?.phone),
    appointmentWindow: normalizeText(formData?.appointmentWindow),
    notes: normalizeText(formData?.notes),
    cemeteryName: normalizeText(formData?.cemeteryName),
    preferredDealer: normalizeText(formData?.preferredDealer),
    referralCode: normalizeText(formData?.referralCode),
  };

  const referralAttribution = {
    hasPreferredDealer: Boolean(normalizedForm.preferredDealer),
    preferredDealer: normalizedForm.preferredDealer || null,
    referralCode: normalizedForm.referralCode || null,
    commissionEligible: Boolean(normalizedForm.preferredDealer || normalizedForm.referralCode),
  };

  return {
    submittedAt: new Date().toISOString(),
    status: 'draft_pending_backend',
    customer: {
      familyName: normalizedForm.familyName,
      email: normalizedForm.email,
      phone: normalizedForm.phone,
      appointmentWindow: normalizedForm.appointmentWindow || null,
      notes: normalizedForm.notes || null,
      cemeteryName: normalizedForm.cemeteryName || null,
    },
    design: {
      title: normalizeText(draft?.title) || 'Untitled memorial design',
      type: normalizeText(draft?.type) || null,
      color: normalizeText(draft?.color) || null,
      shape: normalizeText(draft?.shape) || null,
      designStyle: normalizeText(draft?.designStyle) || 'Standard',
      wording: normalizeText(draft?.wording) || null,
      accessories: normalizeAccessories(draft?.accessories),
      additionalCategorySelections: normalizeAdditionalCategorySelections(draft?.additionalCategorySelections),
    },
    referralAttribution,
  };
}

export function saveQuoteRequestIntake(payload) {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return;
  }

  window.sessionStorage.setItem(QUOTE_REQUEST_INTAKE_KEY, JSON.stringify(payload));
}
