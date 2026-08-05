import { PREVIEW_CATALOG } from './previewCatalog.js';

export function getStepRequirements(typeValue, catalog = PREVIEW_CATALOG) {
  if (!typeValue) {
    return {
      requiresColorStep: false,
      requiresShapeStep: false,
    };
  }

  if (typeValue === 'Natural_Stone') {
    return {
      requiresColorStep: false,
      requiresShapeStep: false,
    };
  }

  const colorRequiredTypes = catalog.rules.colorRequiredTypes || [];
  const isColorRequiredType = colorRequiredTypes.includes(typeValue);

  return {
    requiresColorStep: true,
    requiresShapeStep: !isColorRequiredType,
  };
}

export function getSelectionProgress(selection, catalog = PREVIEW_CATALOG) {
  const typeValue = selection?.type || null;
  const colorValue = selection?.color || null;
  const shapeValue = selection?.shape || null;

  const { requiresColorStep, requiresShapeStep } = getStepRequirements(typeValue, catalog);
  const hasType = Boolean(typeValue);
  const hasColor = !requiresColorStep || Boolean(colorValue);
  const hasShape = !requiresShapeStep || Boolean(shapeValue);

  return {
    hasType,
    hasColor,
    hasShape,
    requiresColorStep,
    requiresShapeStep,
    hasBaseSelection: hasType && hasColor && hasShape,
  };
}

export function isShapeDisabledForType({ shapeValue, typeValue, catalog = PREVIEW_CATALOG }) {
  if (!typeValue || !shapeValue) {
    return true;
  }

  const disabledByType = catalog.rules.shapeDisabledByType || {};
  const blockedTypes = disabledByType[shapeValue] || [];
  return blockedTypes.includes(typeValue);
}

export function isAccessoryDisabledForSelection({ accessoryValue, selection, catalog = PREVIEW_CATALOG }) {
  const rules = catalog.rules.accessoryRules?.[accessoryValue];

  if (!rules) {
    return false;
  }

  const typeValue = selection?.type || null;
  const colorValue = selection?.color || null;

  if (typeValue && (rules.blockedTypes || []).includes(typeValue)) {
    return true;
  }

  if (colorValue && (rules.blockedColors || []).includes(colorValue)) {
    return true;
  }

  return false;
}
