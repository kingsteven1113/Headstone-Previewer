import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('includes a Netlify SPA fallback redirect rule', () => {
  const redirectFile = path.join(process.cwd(), 'public', '_redirects');
  const content = fs.readFileSync(redirectFile, 'utf8');

  assert.match(content, /\/\*\s\/index\.html 200/);
});
