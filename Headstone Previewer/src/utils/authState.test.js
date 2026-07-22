import test from 'node:test';
import assert from 'node:assert/strict';
import { getStoredAuthState, saveAuthState, clearStoredAuthState } from './authState.js';

test('returns a default unauthenticated state when no stored state exists', () => {
  clearStoredAuthState();
  assert.deepEqual(getStoredAuthState(), {
    isAuthenticated: false,
    user: null,
    plan: 'trial',
    subscriptionStatus: 'free',
  });
});

test('persists and retrieves an authenticated state', () => {
  saveAuthState({
    isAuthenticated: true,
    user: { email: 'team@example.com', role: 'manager' },
    plan: 'professional',
    subscriptionStatus: 'active',
  });
  assert.deepEqual(getStoredAuthState(), {
    isAuthenticated: true,
    user: { email: 'team@example.com', role: 'manager' },
    plan: 'professional',
    subscriptionStatus: 'active',
  });
  clearStoredAuthState();
});
