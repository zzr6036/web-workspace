import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../app/components/shop/productDetail/ProductMediaGallery.tsx', import.meta.url), 'utf8');

test('keeps variant and slide selection as one source of truth', () => {
  assert.match(source, /const variantSlide = useMemo/);
  assert.match(source, /setSelectedSrc\(variantSlide\?\.src \?\? slides\[0\]\?\.src\)/);
  assert.match(source, /onClick=\{\(\) => setSelectedSrc\(slide\.src\)\}/);
  assert.doesNotMatch(source, /allSlides = imageSku/);
});
