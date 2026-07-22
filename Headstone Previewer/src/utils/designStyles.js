export const DEFAULT_DESIGN_STYLE = 'Standard';

export const DESIGN_STYLE_OPTIONS = [
  {
    value: 'Standard',
    label: 'Standard Layout',
    description: 'A clean memorial composition with balanced spacing and classic proportions.',
    surcharge: 0,
    previewClassName: 'preview-style-standard',
  },
  {
    value: 'Portrait_Remembrance',
    label: 'Portrait Remembrance',
    description: 'A more dramatic composition built around porcelain portraits and etched storytelling.',
    surcharge: 225,
    previewClassName: 'preview-style-portrait',
  },
  {
    value: 'Garden_Tribute',
    label: 'Garden Tribute',
    description: 'Adds a softer presentation with floral framing cues and family-garden positioning.',
    surcharge: 275,
    previewClassName: 'preview-style-garden',
  },
  {
    value: 'Legacy_Sculpted',
    label: 'Legacy Sculpted',
    description: 'A premium direction for higher-detail memorials with a stronger sculpted presentation.',
    surcharge: 425,
    previewClassName: 'preview-style-legacy',
  },
];

export function getDesignStyleDetails(styleValue) {
  return DESIGN_STYLE_OPTIONS.find((style) => style.value === styleValue) || DESIGN_STYLE_OPTIONS[0];
}

export function formatDesignStyleLabel(styleValue) {
  return getDesignStyleDetails(styleValue).label;
}

export function getDesignStyleSurcharge(styleValue) {
  return getDesignStyleDetails(styleValue).surcharge;
}