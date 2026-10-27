import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../app/page/PhotoFramePackages.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../app/page/photo-frame-packages.css', import.meta.url), 'utf8');

test('presents photo frame packages in the approved purchase flow', async () => {
  for (const section of ['Package options', 'Choose your frame material', 'Package preview', 'Product details', 'How to order', 'Ready to create yours?']) assert.match(page, new RegExp(section));
  for (const material of ['Frameless Rounded Corner', 'White Rounded Border', 'Silver Rounded Border', 'Black Rounded Border', 'Gold Square Corner', 'Solid Wood - Warm Walnut', 'Fresh Light Wheat', 'Roasted Tea', 'Black Walnut']) assert.match(page, new RegExp(material));
  for (const asset of ['1-Frameless Rounded Corner/combine.png', '2-White Rounded Border/combine.png', '3-Silver Rounded Border/combine.png', '4-Black Rounded Border/combine.png', '5-Gold Square Corner/combine.png', '6-Solid Wood-Warm Walnut/combine.png', '7-Fresh Light Wheat/combine.png', '8-Roasted Tea/combine.png', '9-Black Walnut/combine.png']) await access(new URL(`../public/frame-products/${asset}`, import.meta.url));
  assert.match(page, /Most Popular/);
  assert.match(page, /frame-material-selection__package/);
  assert.match(page, /activePackage\.name/);
  assert.match(page, /The package includes:/);
  assert.match(page, /pieces of \{size\} frame/);
  assert.match(page, /20\.3cm x 25\.4cm/);
  assert.match(page, /25\.4cm x 30\.5cm/);
  assert.match(page, /30\.5cm x 40\.6cm/);
  assert.match(page, /aria-pressed/);
  assert.match(page, /whatsappHref/);
  assert.match(page, /frames-gallery-title/);
  assert.match(page, /https:\/\/www\.momentframesg\.com\/shop/);
  assert.match(page, /Explore more custom frames on MomentFrame/);
  assert.ok(page.indexOf('id="materials"') < page.indexOf('id="frames-gallery-title"'), 'material selector should appear before curated gallery');
  assert.match(styles, /\.frame-package-tabs[\s\S]*grid-template-columns/);
  assert.match(styles, /\.frame-material-showcase[\s\S]*grid-template-columns/);
  assert.match(styles, /\.frame-material-rail[\s\S]*overflow-y/);
  assert.match(styles, /@media \(max-width: 560px\)/);
});
