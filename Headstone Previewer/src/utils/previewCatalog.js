export const COLOR_REQUIRED_TYPES = ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque'];

export const ADVANCED_TYPE_OPTIONS = [
  { value: 'Die_And_Base', label: 'Die and Base' },
  { value: 'Monolith', label: 'Monolith' },
  { value: 'Slant_Marker', label: 'Slant Marker' },
  { value: 'Flush_Marker', label: 'Flush Marker' },
  { value: 'Hickey_Marker', label: 'Hickey Marker' },
  { value: 'Natural_Stone', label: 'Natural Stone' },
  { value: 'Bench', label: 'Bench' },
  { value: 'Bronze_Plaque', label: 'Bronze Plaque' },
];

export const ADVANCED_COLOR_OPTIONS = [
  { value: 'Impala_Black', label: 'Impala Black' },
  { value: 'Barre_Grey', label: 'Barre Grey' },
  { value: 'North_American_Pink', label: 'North American Pink' },
  { value: 'Mahogany', label: 'Mahogany' },
  { value: 'Cats_Eye', label: 'Cats Eye Brown' },
  { value: 'Evergreen', label: 'Evergreen' },
  { value: 'Jet_Black', label: 'Jet Black' },
  { value: 'Blue_Pearl', label: 'Blue Pearl' },
  { value: 'Tropical_Green', label: 'Tropical Green' },
  { value: 'Paradiso', label: 'Paradiso' },
  { value: 'Bahama_Blue', label: 'Bahama Blue' },
];

export const ADVANCED_SHAPE_OPTIONS = [
  { value: 'Heart_Shape', label: 'Heart Shape' },
  { value: 'Angel_Carved', label: 'Angel Carved' },
  { value: 'Flat_Top', label: 'Flat Top' },
  { value: 'Serpentine_Top', label: 'Serpentine Top' },
  { value: 'Oval_Top', label: 'Oval Top' },
  { value: 'Half_Serpentine_Top', label: 'Half Serpentine Top' },
  { value: 'Half_Oval_Top', label: 'Half Oval Top' },
  { value: 'Apex_Top', label: 'Apex Top' },
  { value: 'Roof_Top', label: 'Roof Top' },
];

export const ADVANCED_ACCESSORY_OPTIONS = [
  { value: 'Vase', label: 'Vase' },
  { value: 'Etching', label: 'Etching' },
  { value: 'Bronze Emblem', label: 'Bronze Emblem' },
  { value: 'Porcelain Photo', label: 'Porcelain Photo' },
];

export const ADVANCED_ADDITIONAL_CATEGORY_OPTIONS = {
  letteringStyle: [
    { value: 'Skinfrosted_Lettering', label: 'Skinfrosted Lettering' },
    { value: 'Deep_Cut_Lettering', label: 'Deep Cut Lettering' },
    { value: 'Raised_Lettering', label: 'Raised Lettering' },
    { value: 'Frosted_Outlined_Lettering', label: 'Frosted Outlined Lettering' },
    { value: 'Shallow_Blown_Lettering', label: 'Shallow Blown Lettering' },
  ],
  dieSidesFinish: [
    { value: 'Rock_Pitch', label: 'Rock Pitch' },
    { value: 'Sawed', label: 'Sawed' },
    { value: 'Polished', label: 'Polished' },
    { value: 'Steeled', label: 'Steeled' },
  ],
  dieTopFinish: [
    { value: 'Rock_Pitch', label: 'Rock Pitch' },
    { value: 'Sawed', label: 'Sawed' },
    { value: 'Polished', label: 'Polished' },
    { value: 'Steeled', label: 'Steeled' },
  ],
  designTypes: [
    { value: 'Floral', label: 'Floral' },
    { value: 'Faith', label: 'Faith' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Angel', label: 'Angel' },
    { value: 'Border', label: 'Border' },
    { value: 'Building', label: 'Building' },
    { value: 'Children', label: 'Children' },
    { value: 'Emblems', label: 'Emblems' },
    { value: 'Hand', label: 'Hand' },
    { value: 'Hobbies', label: 'Hobbies' },
    { value: 'Music', label: 'Music' },
    { value: 'Miscellaneous', label: 'Miscellaneous' },
    { value: 'Panel', label: 'Panel' },
    { value: 'People', label: 'People' },
    { value: 'Scene', label: 'Scene' },
    { value: 'Shape', label: 'Shape' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Western', label: 'Western' },
  ],
  panels: [],
  fonts: [],
  baseTopFinish: [],
  baseSidesFinish: [],
};

export const ADVANCED_ADDITIONAL_CATEGORIES = [
  {
    key: 'letteringStyle',
    label: 'Lettering Style',
    description: 'Choose how lettering should be presented for the memorial design.',
  },
  {
    key: 'dieSidesFinish',
    label: 'Die Sides Finish',
    description: 'Select the finish treatment for die side surfaces.',
  },
  {
    key: 'dieTopFinish',
    label: 'Die Top Finish',
    description: 'Select the finish treatment for the top of the die.',
  },
  {
    key: 'designTypes',
    label: 'Design Types',
    description: 'Choose the design treatment category for this concept.',
  },
  {
    key: 'panels',
    label: 'Panels',
    description: 'Choose panel layout and panel format options.',
  },
  {
    key: 'fonts',
    label: 'Fonts',
    description: 'Select font categories used for lettering previews.',
  },
  {
    key: 'baseTopFinish',
    label: 'Base Top Finish',
    description: 'Choose the finish treatment for base top surfaces.',
  },
  {
    key: 'baseSidesFinish',
    label: 'Base Sides Finish',
    description: 'Choose the finish treatment for base side surfaces.',
  },
];

export const SHAPE_DISABLED_BY_TYPE = {
  Heart_Shape: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Angel_Carved: ['Slant_Marker', 'Monolith', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Flat_Top: ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Serpentine_Top: ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Oval_Top: ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Half_Serpentine_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Half_Oval_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Apex_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
  Roof_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
};

export const ACCESSORY_RULES = {
  Vase: {
    blockedTypes: ['Natural_Stone', 'Monolith', 'Hickey_Marker'],
    blockedColors: [],
  },
  Etching: {
    blockedTypes: ['Natural_Stone'],
    blockedColors: ['Mahogany', 'Barre_Grey', 'North_American_Pink', 'Cats_Eye', 'Paradiso'],
  },
  'Bronze Emblem': {
    blockedTypes: [],
    blockedColors: [],
  },
  'Porcelain Photo': {
    blockedTypes: [],
    blockedColors: [],
  },
};

export const PREVIEW_CATALOG = {
  options: {
    types: ADVANCED_TYPE_OPTIONS,
    colors: ADVANCED_COLOR_OPTIONS,
    shapes: ADVANCED_SHAPE_OPTIONS,
    accessories: ADVANCED_ACCESSORY_OPTIONS,
    additionalCategories: ADVANCED_ADDITIONAL_CATEGORIES,
    additionalCategoryOptions: ADVANCED_ADDITIONAL_CATEGORY_OPTIONS,
  },
  rules: {
    colorRequiredTypes: COLOR_REQUIRED_TYPES,
    shapeDisabledByType: SHAPE_DISABLED_BY_TYPE,
    accessoryRules: ACCESSORY_RULES,
  },
};
