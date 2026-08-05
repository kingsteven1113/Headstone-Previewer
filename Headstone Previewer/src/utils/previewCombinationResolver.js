import {
  COMBINATION_RULES,
  COLOR_RULES,
  TYPE_RULES,
  STANDALONE_COLOR_RULES,
  STANDALONE_SHAPE_RULES,
} from './previewCombinationCatalog.js';

const buildKey = (...parts) => parts.join('|');

const combinationRuleMap = new Map(
  COMBINATION_RULES.map((rule) => [buildKey(rule.type, rule.color, rule.shape), rule])
);

const colorRuleMap = new Map(
  COLOR_RULES.map((rule) => [buildKey(rule.type, rule.color), rule])
);

const typeRuleMap = new Map(
  TYPE_RULES.map((rule) => [rule.type, rule])
);

const standaloneColorRuleMap = new Map(
  STANDALONE_COLOR_RULES.map((rule) => [rule.color, rule])
);

const standaloneShapeRuleMap = new Map(
  STANDALONE_SHAPE_RULES.map((rule) => [rule.shape, rule])
);

function resolveRule(selection) {
  const type = selection?.type || null;
  const color = selection?.color || null;
  const shape = selection?.shape || null;

  if (type && color && shape) {
    const combinationRule = combinationRuleMap.get(buildKey(type, color, shape));
    if (combinationRule) {
      return { rule: combinationRule, matchedBy: 'type-color-shape' };
    }
  }

  if (type && color) {
    const colorRule = colorRuleMap.get(buildKey(type, color));
    if (colorRule) {
      return { rule: colorRule, matchedBy: 'type-color' };
    }
  }

  if (type) {
    const typeRule = typeRuleMap.get(type);
    if (typeRule) {
      return { rule: typeRule, matchedBy: 'type' };
    }
  }

  if (color) {
    const standaloneColorRule = standaloneColorRuleMap.get(color);
    if (standaloneColorRule) {
      return { rule: standaloneColorRule, matchedBy: 'color' };
    }
  }

  if (shape) {
    const standaloneShapeRule = standaloneShapeRuleMap.get(shape);
    if (standaloneShapeRule) {
      return { rule: standaloneShapeRule, matchedBy: 'shape' };
    }
  }

  return null;
}

export function resolvePreviewCombination(selection, imageAssetMap, options = {}) {
  const defaultImageKey = options.defaultImageKey || 'Logo';
  const resolved = resolveRule(selection);

  if (!resolved) {
    return {
      matched: false,
      matchedBy: 'default',
      imageKey: defaultImageKey,
      image: imageAssetMap?.[defaultImageKey] || null,
      name: null,
    };
  }

  const { rule, matchedBy } = resolved;

  return {
    matched: true,
    matchedBy,
    imageKey: rule.imageKey,
    image: imageAssetMap?.[rule.imageKey] || null,
    name: rule.name ?? null,
  };
}
