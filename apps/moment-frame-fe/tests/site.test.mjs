import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const require = createRequire(import.meta.url);
const productMediaGallery = await readFile(new URL('../app/components/shop/productDetail/ProductMediaGallery.tsx', import.meta.url), 'utf8');
const deliveryDetailsForm = await readFile(new URL('../app/components/cart/DeliveryDetailsForm.tsx', import.meta.url), 'utf8');
const faqPage = await readFile(new URL('../app/faq/page.tsx', import.meta.url), 'utf8');
const heroSection = await readFile(new URL('../app/components/home/HeroSection.tsx', import.meta.url), 'utf8');
const siteHeader = await readFile(new URL('../app/layout/SiteHeader.tsx', import.meta.url), 'utf8');
const siteFooter = await readFile(new URL('../app/layout/SiteFooter.tsx', import.meta.url), 'utf8');
const bestSellerCarousel = await readFile(new URL('../app/components/home/BestSellerCarousel.tsx', import.meta.url), 'utf8');
const bestSellerContent = await readFile(new URL('../app/components/home/homeContent.ts', import.meta.url), 'utf8');
const shopContent = await readFile(new URL('../app/components/shop/ShopContent.tsx', import.meta.url), 'utf8');
const inspirationSection = await readFile(new URL('../app/components/home/InspirationSection.tsx', import.meta.url), 'utf8');
const slideManifest = await readFile(new URL('../app/lib/productSlideLists.ts', import.meta.url), 'utf8');
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
  assert.doesNotMatch(html, /momentboothsg|Moment Booth/);
});

test('every in-page navigation link resolves to an existing section', () => {
  const links = [...html.matchAll(/href="#([^" ]+)"/g)].map(match => match[1]);
  assert.ok(links.length >= 3);
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

test('home presents three frame collections without placeholder art', () => {
  assert.ok((html.match(/class="collection-card"/g) || []).length >= 3);
  assert.match(html, /FIND YOUR FRAME/);
  assert.doesNotMatch(html, /Explore the collection/);
  assert.doesNotMatch(html, /Illustrative previews|CONCEPT|Add to cart|Checkout|type="file"/);
  assert.doesNotMatch(html, /[\u3400-\u9fff]/);
});

test('home explains the MomentFrame difference, ordering flow, and new collection preview', async () => {
  assert.match(html, /WHY MOMENTFRAME/);
  assert.match(html, /Printed as one finished piece/);
  assert.match(html, /HOW ORDERING WORKS/);
  assert.match(html, /Request your quote/);
  assert.match(html, /COMING SOON/);
  for (const video of ['gallery-wooden-detail.mp4', 'solid-wood-quality.mp4', 'new-collection-preview.mp4']) {
    const response = await fetch(`${origin}/frames/home/${video}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /video\/mp4/);
  }
});

test('FAQ answers cover the quote process, photo preparation, display, and delivery', () => {
  for (const heading of ['Ordering & Quotes', 'Photos & Printing', 'Frames & Display', 'Delivery']) assert.match(faqPage, new RegExp(heading));
  assert.match(faqPage, /Classic Frameless Photo Panels and Classic Bordered Frames are printed directly/);
  assert.match(faqPage, /Delivery is free for orders over SGD 160/);
});

test('quote request language explains that confirmation happens on WhatsApp', () => {
  assert.match(deliveryDetailsForm, /REQUEST A QUOTE/);
  assert.match(deliveryDetailsForm, /confirm your order and payment details before production begins/);
});

test('start creating leads to the shop and shared navigation exposes WhatsApp', () => {
  assert.match(heroSection, /href="\/shop"/);
  assert.match(heroSection, /Start Shopping/);
  for (const component of [siteHeader, siteFooter]) assert.match(component, /https:\/\/wa\.me\/6588467972/);
  assert.match(siteHeader, /className="header-whatsapp"/);
  assert.match(siteHeader, /<svg viewBox="0 0 24 24" aria-hidden="true">/);
  assert.match(siteFooter, /Message us on WhatsApp/);
  assert.doesNotMatch(siteHeader.match(/<nav[\s\S]*?<\/nav>/)?.[0] ?? '', /Message us/);
});

test('popular frame cards link to individual product pages', () => {
  assert.match(bestSellerCarousel, /<Link href=\{print\.href\}/);
  assert.match(bestSellerCarousel, /tabIndex=\{copy === 2 \? -1 : undefined\}/);
  assert.equal((bestSellerContent.match(/href: "\/shop\//g) || []).length, 8);
});

test('Gallery Wooden Frame video appears on the homepage rather than the Gallery shop category', () => {
  assert.match(inspirationSection, /gallery-wooden-detail\.mp4/);
  assert.match(inspirationSection, /solid-wood-quality\.mp4/);
  assert.match(inspirationSection, /Solid wood, naturally refined\./);
  assert.equal((inspirationSection.match(/<article className="why-momentframe-card/g) || []).length, 3);
  assert.match(inspirationSection, /why-momentframe-summary-card/);
  assert.doesNotMatch(shopContent, /gallery-wooden-detail\.mp4/);
  assert.doesNotMatch(inspirationSection, /Explore the collection/);
});

test('product slide manifest includes every valid numbered media file', async () => {
  const root = new URL('../public/frames/product-slides/', import.meta.url);
  const directories = await readdir(root, { withFileTypes: true });
  const escaped = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  for (const directory of directories.filter((entry) => entry.isDirectory())) {
    const files = await readdir(new URL(`../public/frames/product-slides/${directory.name}/`, import.meta.url));
    const expectedPaths = files
      .filter((file) => /^slide-\d+\.(avif|jpeg|jpg|png|webm|mp4)$/i.test(file))
      .map((file) => `/frames/product-slides/${directory.name}/${file}`);

    assert.ok(expectedPaths.length > 0, `${directory.name} should have valid slides`);
    for (const slidePath of expectedPaths) assert.match(slideManifest, new RegExp(escaped(slidePath)));
    const configuredPaths = slideManifest.match(new RegExp(`"/frames/product-slides/${escaped(directory.name)}/slide-`, 'g')) ?? [];
    assert.equal(configuredPaths.length, expectedPaths.length, `${directory.name} slide count should match its media folder`);
  }
});


test('production page serves its purple theme stylesheet', async () => {
  const styles = [...html.matchAll(/<link[^>]+href="([^" ]+\.css(?:\?[^" ]*)?)"[^>]*>/g)].map(match => match[1]);
  assert.ok(styles.length > 0, 'Page must link a stylesheet');
  const contents = await Promise.all(styles.map(async path => {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 200, `Stylesheet failed: ${path}`);
    return response.text();
  }));
  const css = contents.join('');
  assert.match(css, /--accent:\s*#7c5cff/i);
  assert.match(css, /--paper:\s*#f7f8fb/i);
  assert.doesNotMatch(css, /#bb481f|#23625c|#203d39/i);
});


test('collection imagery is rendered from local image assets', () => {
  assert.match(html, /_next\/image\?url=%2Fframes%2F/);
  assert.ok((html.match(/class="collection-card"/g) || []).length >= 3);
});


test('hero uses premium photo panels while the wooden frame collection remains available', () => {
  const hero = html.match(/<section[^>]*id="top"[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero);
  assert.match(hero, /new-hero-panels\.png/);
  assert.match(hero, /Premium photo panels across a purple gallery wall/);
  assert.doesNotMatch(hero, /(?:%2F|\/)wood\.png/);
  assert.match(html, /WHY MOMENTFRAME/);
});

test('product gallery keeps variant and slide selection as one source of truth', () => {
  assert.match(productMediaGallery, /const variantSlide = useMemo/);
  assert.match(productMediaGallery, /setSelectedSrc\(variantSlide\?\.src \?\? slides\[0\]\?\.src\)/);
  assert.match(productMediaGallery, /onClick=\{\(\) => setSelectedSrc\(slide\.src\)\}/);
  assert.doesNotMatch(productMediaGallery, /allSlides = imageSku/);
});
