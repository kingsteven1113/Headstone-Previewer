import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuoteRequestIntake } from './quoteRequestIntake.js';

test('buildQuoteRequestIntake captures referral attribution metadata', () => {
  const payload = buildQuoteRequestIntake({
    draft: {
      title: 'River View Memorial',
      type: 'Die_And_Base',
      accessories: ['Vase', ' Etching '],
    },
    formData: {
      familyName: 'Perez Family',
      email: 'perez@example.com',
      phone: '555-0100',
      cemeteryName: 'Oak Hill Memorial',
      preferredDealer: 'Legacy Monument Co',
      referralCode: 'LEGACY-2026',
    },
  });

  assert.equal(payload.customer.cemeteryName, 'Oak Hill Memorial');
  assert.equal(payload.referralAttribution.preferredDealer, 'Legacy Monument Co');
  assert.equal(payload.referralAttribution.referralCode, 'LEGACY-2026');
  assert.equal(payload.referralAttribution.commissionEligible, true);
  assert.deepEqual(payload.design.accessories, ['Vase', 'Etching']);
});

test('buildQuoteRequestIntake marks commissionEligible false without dealer attribution', () => {
  const payload = buildQuoteRequestIntake({
    draft: {
      title: 'Simple Memorial',
    },
    formData: {
      familyName: 'Lee Family',
      email: 'lee@example.com',
      phone: '555-0199',
    },
  });

  assert.equal(payload.referralAttribution.commissionEligible, false);
  assert.equal(payload.referralAttribution.preferredDealer, null);
  assert.equal(payload.referralAttribution.referralCode, null);
});
