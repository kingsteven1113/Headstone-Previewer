import test from 'node:test';
import assert from 'node:assert/strict';
import { canSaveProjects, getSaveProjectMessage } from './accessRules.js';

test('canSaveProjects requires an authenticated user', () => {
  assert.equal(canSaveProjects({ isAuthenticated: false }), false);
  assert.equal(canSaveProjects({ isAuthenticated: true }), true);
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
