import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProposalText } from './proposalExport.js';

test('buildProposalText returns a copyable proposal document', () => {
  const proposalText = buildProposalText({
    title: 'Family Tribute',
    preparedFor: 'The Martinez Family',
    type: 'Die and Base',
    color: 'Impala Black',
    shape: 'Heart Shape',
    name: 'Martinez',
    accessories: ['Vase', 'Etching'],
    basePrice: 2200,
    accessorySurcharge: 350,
    premiumSurcharge: 175,
    total: 2725,
  });

  assert.match(proposalText, /Proposal: Family Tribute/);
  assert.match(proposalText, /Prepared for: The Martinez Family/);
  assert.match(proposalText, /Name: Martinez/);
  assert.match(proposalText, /Total: \$2725/);
});
