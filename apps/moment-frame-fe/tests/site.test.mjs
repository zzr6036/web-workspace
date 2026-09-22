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
const wallGallerySetsSection = await readFile(new URL('../app/components/home/WallGallerySetsSection.tsx', import.meta.url), 'utf8');
const homePage = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const appLayoutSeo = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const robotsRoute = await readFile(new URL('../app/robots.ts', import.meta.url), 'utf8');
const sitemapRoute = await readFile(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
const shopPageSeo = await readFile(new URL('../app/shop/page.tsx', import.meta.url), 'utf8');
const slideManifest = await readFile(new URL('../app/lib/productSlideLists.ts', import.meta.url), 'utf8');
const globalStyles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
const quotePdf = await readFile(new URL('../app/lib/createQuotePdf.ts', import.meta.url), 'utf8');
const appLayout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const shopProductDetailView = await readFile(new URL('../app/components/shop/productDetail/ShopProductDetailView.tsx', import.meta.url), 'utf8');
const cartStore = await readFile(new URL('../app/lib/cartStore.ts', import.meta.url), 'utf8');
const productInformation = await readFile(new URL('../app/components/shop/productInformation/ProductInformation.tsx', import.meta.url), 'utf8');
const productSizeGuide = await readFile(new URL('../app/components/shop/productInformation/ProductSizeGuide.tsx', import.meta.url), 'utf8');
const highDefinitionQualitySection = await readFile(new URL('../app/components/shop/productInformation/HighDefinitionQualitySection.tsx', import.meta.url), 'utf8');
const productStatus = await readFile(new URL('../app/lib/productStatus.ts', import.meta.url), 'utf8');
const catalogSync = await readFile(new URL('../scripts/sync-product-catalog.mjs', import.meta.url), 'utf8');
const shopProductData = await readFile(new URL('../app/lib/shopProductData.ts', import.meta.url), 'utf8');
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

test('site provides searchable MomentFrame metadata and crawl routes', () => {
  assert.match(appLayoutSeo, /Custom Photo Frames & Photo Frame Printing in Singapore/);
  assert.match(appLayoutSeo, /photo frame printing Singapore/);
  assert.match(appLayoutSeo, /application\/ld\+json/);
  assert.match(appLayoutSeo, /Organization/);
  assert.match(appLayoutSeo, /@vercel\/analytics\/next/);
  assert.match(appLayoutSeo, /<Analytics\s*\/?>/);
  assert.match(robotsRoute, /https:\/\/www\.momentframesg\.com\/sitemap\.xml/);
  assert.match(sitemapRoute, /getSubcategories/);
  assert.match(sitemapRoute, /\/shop\/\$\{category\.key\}/);
  assert.match(shopPageSeo, /Personalised Photo Frames & Photo Frame Prints/);
});

test('homepage renders the new brand and accessible page landmarks', () => {
  assert.match(html, /<title>Custom Photo Frames &amp; Photo Frame Printing in Singapore \| MomentFrame<\/title>/);
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

test('home features English curated wall gallery layouts above Why MomentFrame', () => {
  assert.match(html, /CURATED WALL GALLERY SETS/);
  assert.match(html, /Bring your favourite moments together/);
  assert.match(wallGallerySetsSection, /set-a\.png/);
  assert.match(wallGallerySetsSection, /set-b\.png/);
  assert.match(wallGallerySetsSection, /set-c\.png/);
  assert.match(wallGallerySetsSection, /set-d\.png/);
  assert.match(wallGallerySetsSection, /size-guide\.png/);
  assert.match(globalStyles, /\.wall-gallery-sets-track/);
  assert.match(globalStyles, /grid-auto-columns: minmax\(270px, 330px\)/);
  assert.ok(homePage.indexOf('<WallGallerySetsSection />') < homePage.indexOf('<InspirationSection />'));
});

test('FAQ answers cover the quote process, photo preparation, display, and delivery', () => {
  for (const heading of ['Ordering & Quotes', 'Photos & Printing', 'Frames & Display', 'Delivery']) assert.match(faqPage, new RegExp(heading));
  assert.match(faqPage, /Classic Frameless Photo Panels and Classic Bordered Frames are printed directly/);
  assert.match(faqPage, /Delivery is free for orders over SGD 160/);
});

test('quote request language explains that confirmation happens on WhatsApp', () => {
  assert.match(deliveryDetailsForm, /REQUEST A QUOTE/);
  assert.match(deliveryDetailsForm, /confirm your order and payment details before production begins/);
  assert.match(deliveryDetailsForm, /const isReady = Boolean\(userName\.trim\(\) && contact\.trim\(\)\)/);
  assert.match(deliveryDetailsForm, /required-marker/);
  assert.match(deliveryDetailsForm, /disabled=\{!isReady\}/);
  assert.doesNotMatch(deliveryDetailsForm, /email\.trim\(\) && fullAddress\.trim\(\)/);
});

test('quote PDF uses a structured invoice-style summary with a SKU per frame', () => {
  for (const label of ['BILL TO', 'QUOTE DATE', 'PAYMENT TERMS', 'FRAME SUMMARY', 'DESCRIPTION', 'SKU', 'QTY', 'TOTAL QUOTE (SGD)', 'NOTES']) assert.ok(quotePdf.includes(label));
  assert.match(quotePdf, /const skuLines = document\.splitTextToSize\(valueOrDash\(item\.sku\)/);
  assert.match(quotePdf, /document\.addPage\(\)/);
  assert.doesNotMatch(quotePdf, /ORDER SUMMARY/);
});

test('shop category cards use a compact centered name and full-width size action', async () => {
  const shopContent = await readFile(new URL('../app/components/shop/ShopContent.tsx', import.meta.url), 'utf8');

  assert.match(shopContent, /View sizes/);
  assert.doesNotMatch(shopContent, /Tabletop & Wall-mounted/);
  assert.doesNotMatch(shopContent, /shop-subcategory-display/);
  assert.match(shopContent, /shop-subcategory-action/);
  assert.match(globalStyles, /\.shop-subcategory-copy h3 \{[^}]*text-align: center/);
  assert.match(globalStyles, /\.shop-subcategory-action \{[^}]*justify-content: center/);
  assert.match(globalStyles, /\.shop-subcategory-grid \{[^}]*align-items: start/);
  assert.match(globalStyles, /\.shop-subcategory-card \{[^}]*align-self: start/);
  assert.match(globalStyles, /\.shop-subcategory-copy \{[^}]*flex: 0 0 112px/);
});

test('quote PDF presents original and print-preview photos above the frame summary', () => {
  assert.match(quotePdf, /const nameLines = document\.splitTextToSize/);
  assert.match(quotePdf, /const detailLines = document\.splitTextToSize/);
  assert.match(quotePdf, /const originalImageDataUrl = design\?\.originalImageDataUrl \?\? design\?\.imageDataUrl/);
  assert.match(quotePdf, /document\.text\("ORIGINAL PHOTO"/);
  assert.match(quotePdf, /document\.text\("PRINT PREVIEW"/);
  assert.match(quotePdf, /document\.addImage\(originalImageDataUrl, margin/);
  assert.match(quotePdf, /document\.addImage\(design\.imageDataUrl, previewMiddle/);
  assert.match(quotePdf, /function formatCropDetails/);
  assert.match(quotePdf, /Trim: L \$\{toPercent\(crop\.x \/ sourceWidth\)\}/);
  assert.match(quotePdf, /document\.text\(trimLines, descriptionStart \+ 3/);
  assert.match(quotePdf, /document\.text\(nameLines, descriptionStart \+ 3, y \+ 8\)/);
  assert.match(quotePdf, /document\.text\(detailLines, descriptionStart \+ 3, y \+ detailStart\)/);
});

test('quote PDF enlarges item images and uses dashes for missing customer values', () => {
  assert.match(quotePdf, /function valueOrDash/);
  assert.match(quotePdf, /fitImage\(design\.imageWidth \|\| 1, design\.imageHeight \|\| 1, 76, 42\)/);
  assert.match(quotePdf, /document\.text\("-", margin \+ contentWidth \/ 4, previewStart \+ 35/);
  assert.match(quotePdf, /valueOrDash\(options\.recipientName\)/);
  assert.match(quotePdf, /valueOrDash\(options\.deliveryAddress\)/);
});

test('cart retains originals while displaying each final cropped and zoomed image', () => {
  assert.match(cartStore, /originalImageDataUrl\?: string/);
  assert.match(shopProductDetailView, /getCroppedImg\(\s*originalImageDataUrl,\s*draft\.croppedAreaPixels,\s*draft\.orientation/);
  assert.match(shopProductDetailView, /originalImageDataUrl,/);
  assert.match(shopProductDetailView, /imageDataUrl,/);
});

test('quote PDF places the selected frame thumbnail in the SKU column', () => {
  assert.match(cartStore, /frameImageSku\?: string/);
  assert.match(shopProductDetailView, /frameImageSku: product\.imageSku/);
  assert.match(quotePdf, /loadFrameImage\(item\.frameImageSku \?\? item\.sku\.replace/);
  assert.match(quotePdf, /document\.addImage\(frameImage\.dataUrl, skuStart \+ 3/);
});

test('product information stacks high-definition quality above the protective-film guide beside sizes', () => {
  assert.match(productInformation, /product-information-side-guides/);
  assert.ok(productInformation.indexOf('<HighDefinitionQualitySection />') < productInformation.indexOf('<ProtectiveFilmGuideSection />'));
  assert.match(highDefinitionQualitySection, /high-definition-quality\.png/);
  assert.match(highDefinitionQualitySection, /High-Definition Quality/);
  assert.match(globalStyles, /\.product-information-side-guides \{ display: grid; gap: 28px;/);
});

test('product size guide lists every available format without display-type categories', () => {
  assert.match(productSizeGuide, /const compactSizes/);
  assert.match(productSizeGuide, /const largeSizes/);
  assert.match(productSizeGuide, /["A4", "21 × 29\.7 cm"]/);
  assert.match(productSizeGuide, /["A3", "29\.7 × 42 cm"]/);
  assert.match(productSizeGuide, /const compactSizes = \[[\s\S]*?\['16"', "30 × 40 cm"\]/);
  assert.match(productSizeGuide, /const largeSizes = \[\s*\['18"', "35 × 45 cm"\]/);
  assert.doesNotMatch(productSizeGuide, /Tabletop panels|Wall-mount panels/);
});

test('a floating WhatsApp button is available across the site', () => {
  assert.match(appLayout, /FloatingWhatsAppButton/);
  assert.match(globalStyles, /\.floating-whatsapp \{[^}]*position: fixed/);
  assert.match(globalStyles, /\.floating-whatsapp \{[^}]*bottom: 24px/);
});

test('product statuses use stable localization keys with their English labels', () => {
  for (const [key, label] of [
    ['ready-stock', 'Ready Stock'],
    ['made-to-order', 'Made to Order'],
    ['pre-order', 'Pre-Order'],
    ['out-of-stock', 'Out of Stock'],
    ['sold-out', 'Sold Out'],
    ['coming-soon', 'Coming Soon'],
    ['unavailable', 'Unavailable'],
  ]) {
    assert.ok(productStatus.includes(`key: ProductStatusKey.`));
    assert.ok(productStatus.includes(`"${key}"`));
    assert.ok(productStatus.includes(`label: "${label}"`));
  }
  assert.match(productStatus, /export const productStatusByKey/);
  assert.match(catalogSync, /workbook\.Sheets\["Product Status"\]/);
  assert.match(catalogSync, /workbook\.Sheets\["Product Sizes"\]/);
  assert.match(catalogSync, /getStatusKey\(row\[column\("Status"\)\]\)/);
  assert.match(catalogSync, /getSize\(sizeKey\)/);
  assert.match(shopProductData, /status: ProductStatusValue/);
  assert.match(shopProductData, /"status": "ready-stock"/);
});

test('available size choices use workbook-backed inch and centimetre labels', async () => {
  const productConfigurator = await readFile(new URL('../app/components/shop/productDetail/ProductConfigurator.tsx', import.meta.url), 'utf8');

  assert.match(productConfigurator, /product\.sizeLabel/);
  assert.match(shopProductData, /sizeKey: string; sizeCm: string; sizeLabel: string/);
  assert.match(shopProductData, /"sizeLabel": "7\\\" \(12\.7 × 17\.8 cm\)"/);
  assert.match(shopProductData, /"sizeKey": "24-small"/);
});

test('delivery details fields use dedicated full-width form styles', () => {
  assert.match(deliveryDetailsForm, /className="delivery-input"/);
  assert.match(deliveryDetailsForm, /className="address-feedback"/);
  assert.match(deliveryDetailsForm, /className="delivery-notes"/);
  assert.match(globalStyles, /\.delivery-input \{ display: grid;/);
  assert.match(globalStyles, /\.delivery-input input \{[^}]*width: 100%/);
  assert.match(globalStyles, /\.delivery-notes \{[^}]*background:/);
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
