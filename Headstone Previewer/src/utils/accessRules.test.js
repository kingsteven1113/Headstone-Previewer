import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canSaveProjects,
  canGenerateQuotes,
  canUseAdvancedPreviewer,
  getAdvancedPreviewerMessage,
  getQuoteAccessMessage,
  getSaveProjectMessage,
  getUsageSummary,
} from './accessRules.js';

test('canSaveProjects requires an authenticated user', () => {
  assert.equal(canSaveProjects({ isAuthenticated: false }), false);
  assert.equal(canSaveProjects({ isAuthenticated: true }), true);
});

test('canSaveProjects enforces trial project limits for new saves', () => {
  assert.equal(canSaveProjects({ isAuthenticated: true, plan: 'trial', projectCount: 2 }), true);
  assert.equal(canSaveProjects({ isAuthenticated: true, plan: 'trial', projectCount: 3 }), false);
  assert.equal(canSaveProjects({ isAuthenticated: true, plan: 'professional', projectCount: 999 }), true);
});

test('canSaveProjects allows updating an existing project even at trial limit', () => {
  assert.equal(
    canSaveProjects({ isAuthenticated: true, plan: 'trial', projectCount: 3, currentProjectId: 'abc123' }),
    true
  );
});

test('getSaveProjectMessage explains the account requirement for guests', () => {
  assert.equal(
    getSaveProjectMessage({ isAuthenticated: false }),
    'Create an account to save and share your memorial designs.'
  );

  assert.equal(
    getSaveProjectMessage({ isAuthenticated: true }),
    'Design saved to your project list.'
  );
});

test('getSaveProjectMessage returns limit guidance for trial users', () => {
  assert.equal(
    getSaveProjectMessage({ isAuthenticated: true, plan: 'trial', projectCount: 3 }),
    'Your trial plan includes up to 3 saved designs. Upgrade to Professional to save more.'
  );
});

test('canGenerateQuotes gates by authentication and plan', () => {
  assert.equal(canGenerateQuotes({ isAuthenticated: false, plan: 'enterprise' }), false);
  assert.equal(canGenerateQuotes({ isAuthenticated: true, plan: 'trial' }), false);
  assert.equal(canGenerateQuotes({ isAuthenticated: true, plan: 'professional' }), true);
});

test('canUseAdvancedPreviewer is available on studio and enterprise', () => {
  assert.equal(canUseAdvancedPreviewer({ isAuthenticated: true, plan: 'professional' }), false);
  assert.equal(canUseAdvancedPreviewer({ isAuthenticated: true, plan: 'studio' }), true);
  assert.equal(canUseAdvancedPreviewer({ isAuthenticated: true, plan: 'enterprise' }), true);
});

test('quote and advanced preview messages explain access state', () => {
  assert.equal(
    getQuoteAccessMessage({ isAuthenticated: false, plan: 'enterprise' }),
    'Create an account to unlock quote generation and proposal tools.'
  );
  assert.equal(
    getQuoteAccessMessage({ isAuthenticated: true, plan: 'trial' }),
    'Quote generation is available on Professional plans and above.'
  );
  assert.equal(
    getAdvancedPreviewerMessage({ isAuthenticated: true, plan: 'trial' }),
    'Upgrade to Studio to unlock advanced design-style controls in the previewer.'
  );
});

test('getUsageSummary returns expected limits and unlimited state', () => {
  assert.deepEqual(getUsageSummary({ plan: 'trial', projectCount: 1 }), {
    usageLabel: '1/3 saved projects',
    isUnlimited: false,
    projectLimit: 3,
    remainingProjects: 2,
  });

  assert.deepEqual(getUsageSummary({ plan: 'professional', projectCount: 4 }), {
    usageLabel: '4 saved projects',
    isUnlimited: true,
    projectLimit: null,
    remainingProjects: null,
  });
});
