import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePreviewCombination } from './previewCombinationResolver.js';

test('resolvePreviewCombination prefers type-color-shape matches', () => {
  const imageAssetMap = {
    Logo: 'logo-src',
    Impala_Black_Die_And_Base_Heart_Shape: 'triple-src',
    Impala_Black_Die_And_Base: 'pair-src',
    Die_And_Base: 'type-src',
  };

  const resolved = resolvePreviewCombination(
    {
      type: 'Die_And_Base',
      color: 'Impala_Black',
      shape: 'Heart_Shape',
    },
    imageAssetMap
  );

  assert.equal(resolved.matched, true);
  assert.equal(resolved.matchedBy, 'type-color-shape');
  assert.equal(resolved.imageKey, 'Impala_Black_Die_And_Base_Heart_Shape');
  assert.equal(resolved.image, 'triple-src');
  assert.equal(resolved.name, 'Martinez');
});

test('resolvePreviewCombination falls back in precedence order', () => {
  const imageAssetMap = {
    Logo: 'logo-src',
    Impala_Black_Die_And_Base: 'pair-src',
    Die_And_Base: 'type-src',
    Impala_Black: 'color-src',
    Flat_Top: 'shape-src',
  };

  const resolvedPair = resolvePreviewCombination(
    {
      type: 'Die_And_Base',
      color: 'Impala_Black',
      shape: 'Unknown',
    },
    imageAssetMap
  );

  assert.equal(resolvedPair.matchedBy, 'type-color');
  assert.equal(resolvedPair.image, 'pair-src');

  const resolvedType = resolvePreviewCombination(
    {
      type: 'Die_And_Base',
      color: null,
      shape: null,
    },
    imageAssetMap
  );

  assert.equal(resolvedType.matchedBy, 'type');
  assert.equal(resolvedType.image, 'type-src');

  const resolvedColor = resolvePreviewCombination(
    {
      type: null,
      color: 'Impala_Black',
      shape: null,
    },
    imageAssetMap
  );

  assert.equal(resolvedColor.matchedBy, 'color');
  assert.equal(resolvedColor.image, 'color-src');

  const resolvedShape = resolvePreviewCombination(
    {
      type: null,
      color: null,
      shape: 'Flat_Top',
    },
    imageAssetMap
  );

  assert.equal(resolvedShape.matchedBy, 'shape');
  assert.equal(resolvedShape.image, 'shape-src');
});

test('resolvePreviewCombination returns default when no rules match', () => {
  const imageAssetMap = { Logo: 'logo-src' };
  const resolved = resolvePreviewCombination({ type: 'Unknown' }, imageAssetMap);

  assert.equal(resolved.matched, false);
  assert.equal(resolved.matchedBy, 'default');
  assert.equal(resolved.imageKey, 'Logo');
  assert.equal(resolved.image, 'logo-src');
  assert.equal(resolved.name, null);
});
