import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const require = createRequire(import.meta.url);
const port = 3101;
const origin = `http://127.0.0.1:${port}`;
let server;
let html;
before(async () => {
  server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { stdio: 'pipe', env: { ...process.env, NEXT_IGNORE_INCORRECT_LOCKFILE: '1' } });
  let output = '';
  server.stderr.on('data', data => { output += data; });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Preview server exited: ${output}`);
    try {
      const response = await fetch(origin);
      assert.equal(response.status, 200);
      html = await response.text();
      return;
    } catch { await delay(200); }
  }
  throw new Error(`Preview server did not start: ${output}`);
});
after(() => { server?.kill('SIGTERM'); });

test('homepage renders the new brand and accessible page landmarks', () => {
  assert.match(html, /<title>MomentFrame/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  for (const landmark of ['header', 'main', 'footer']) assert.match(html, new RegExp(`<${landmark}[ >]`));
  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /aria-label="Footer navigation"/);
  assert.doesNotMatch(html, /momentboothsg|wa\.me|Moment Booth/);
});

test('every in-page navigation link resolves to an existing section', () => {
  const links = [...html.matchAll(/href="#([^" ]+)"/g)].map(match => match[1]);
  assert.ok(links.length >= 7);
  for (const id of links) assert.ok(html.includes(`id="${id}"`), `Missing target: ${id}`);
});

test('logo is served unchanged and shown in both header and footer', async () => {
  const response = await fetch(`${origin}/logo_circle.png`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /image\/png/);
  const actual = Buffer.from(await response.arrayBuffer());
  const expected = await readFile(new URL('../public/logo_circle.png', import.meta.url));
  assert.deepEqual(actual, expected);
  assert.equal((html.match(/alt="MomentFrame logo"/g) || []).length, 2);
});

test('draft collection distinguishes illustrations from available products', () => {
  assert.equal((html.match(/<article[ >]/g) || []).length, 3);
  assert.match(html, /Illustrative previews/);
  assert.match(html, /Product details coming soon/);
});
