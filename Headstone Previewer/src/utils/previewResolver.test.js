import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getStepRequirements,
  getSelectionProgress,
  isShapeDisabledForType,
  isAccessoryDisabledForSelection,
} from './previewResolver.js';

test('getStepRequirements supports Natural Stone and color-required categories', () => {
  assert.deepEqual(getStepRequirements('Natural_Stone'), {
    requiresColorStep: false,
    requiresShapeStep: false,
  });

  assert.deepEqual(getStepRequirements('Flush_Marker'), {
    requiresColorStep: true,
    requiresShapeStep: false,
  });

  assert.deepEqual(getStepRequirements('Monolith'), {
    requiresColorStep: true,
    requiresShapeStep: true,
  });
});

test('getSelectionProgress computes base completion correctly', () => {
  assert.equal(getSelectionProgress({ type: 'Natural_Stone' }).hasBaseSelection, true);
  assert.equal(getSelectionProgress({ type: 'Flush_Marker', color: 'Jet_Black' }).hasBaseSelection, true);
  assert.equal(getSelectionProgress({ type: 'Monolith', color: 'Jet_Black' }).hasBaseSelection, false);
  assert.equal(getSelectionProgress({ type: 'Monolith', color: 'Jet_Black', shape: 'Flat_Top' }).hasBaseSelection, true);
});

test('isShapeDisabledForType enforces catalog shape rules', () => {
  assert.equal(isShapeDisabledForType({ shapeValue: 'Heart_Shape', typeValue: 'Slant_Marker' }), true);
  assert.equal(isShapeDisabledForType({ shapeValue: 'Flat_Top', typeValue: 'Monolith' }), false);
});

test('isAccessoryDisabledForSelection enforces accessory restrictions', () => {
  assert.equal(
    isAccessoryDisabledForSelection({
      accessoryValue: 'Vase',
      selection: { type: 'Natural_Stone', color: null },
    }),
    true
  );

  assert.equal(
    isAccessoryDisabledForSelection({
      accessoryValue: 'Etching',
      selection: { type: 'Die_And_Base', color: 'Mahogany' },
    }),
    true
  );

  assert.equal(
    isAccessoryDisabledForSelection({
      accessoryValue: 'Porcelain Photo',
      selection: { type: 'Die_And_Base', color: 'Mahogany' },
    }),
    false
  );
});
