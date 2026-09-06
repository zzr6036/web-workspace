import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const app = new URL('../apps/moment-booth-fe/', import.meta.url);

test('Vercel build produces a working server and compiled CSS', { timeout: 180_000 }, async () => {
  const config = JSON.parse(await readFile(new URL('vercel.json', app), 'utf8'));
  execFileSync('/bin/sh', ['-c', config.buildCommand], {
    cwd: app, env: { ...process.env, VERCEL: '1' }, stdio: 'pipe', timeout: 150_000,
  });
  const output = new URL('.vercel/output/', app);
  const manifest = JSON.parse(await readFile(new URL('config.json', output), 'utf8'));
  assert.equal(manifest.version, 3);
  assert.ok(manifest.routes.some((route) => route.dest === '/__server'));
  const fn = new URL('functions/__server.func/', output);
  const runtime = JSON.parse(await readFile(new URL('.vc-config.json', fn), 'utf8'));
  assert.equal(runtime.runtime, 'nodejs22.x');
  const { default: server } = await import(new URL(runtime.handler, fn));
  const response = await server.fetch(new Request('https://moment-booth.test/'));
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Moment Booth/);
  const cssDir = new URL('static/_next/static/css/', output);
  const cssFiles = (await readdir(cssDir)).filter((name) => name.endsWith('.css'));
  assert.ok(cssFiles.length > 0);
  const css = (await Promise.all(cssFiles.map((name) => readFile(new URL(name, cssDir), 'utf8')))).join('\n');
  assert.match(css, /\.ui-button/);
  assert.match(css, /\.gallery-section/);
  assert.doesNotMatch(css, /@import\s+["'](?:tailwindcss|elij-ui-library)/);
});
