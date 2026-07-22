import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuote } from './quoteGenerator.js';

test('buildQuote returns a proposal with pricing breakdown', () => {
  const quote = buildQuote({
    id: 'abc123',
    title: 'Family Tribute',
    type: 'Die_And_Base',
    color: 'Impala_Black',
    shape: 'Heart_Shape',
    name: 'Martinez',
    wording: 'Forever in our hearts',
    accessories: ['Vase', 'Etching'],
  });

  assert.equal(quote.title, 'Family Tribute');
  assert.equal(quote.total, 2200 + 350 + 350);
  assert.equal(quote.name, 'Martinez');
  assert.deepEqual(quote.accessories, ['Vase', 'Etching']);
});
