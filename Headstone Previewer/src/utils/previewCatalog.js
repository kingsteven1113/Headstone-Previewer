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
  },
  rules: {
    colorRequiredTypes: COLOR_REQUIRED_TYPES,
    shapeDisabledByType: SHAPE_DISABLED_BY_TYPE,
    accessoryRules: ACCESSORY_RULES,
  },
};
