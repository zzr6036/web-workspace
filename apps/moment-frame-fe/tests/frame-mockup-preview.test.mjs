import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(
  new URL('../app/components/shop/productDetail/FrameMockupPreview.tsx', import.meta.url),
  'utf8',
);
const developmentEnv = await readFile(new URL('../.env.development', import.meta.url), 'utf8');
const productionEnv = await readFile(new URL('../.env.production', import.meta.url), 'utf8');

test('shows the calibrator only when explicitly enabled for the public client build', () => {
  assert.match(source, /const showCalibrator = process\.env\.NEXT_PUBLIC_SHOW_CALIBRATOR === "true"/);
  assert.match(source, /\{showCalibrator && \(/);
  assert.match(source, /\{showCalibrator && isCalibrating && \(/);
  assert.match(source, /\{showCalibrator &&\s+isCalibrating &&\s+corners\.map/);
  assert.match(developmentEnv, /^NEXT_PUBLIC_SHOW_CALIBRATOR=true$/m);
  assert.match(productionEnv, /^NEXT_PUBLIC_SHOW_CALIBRATOR=false$/m);
});
