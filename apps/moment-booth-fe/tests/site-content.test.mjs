import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const readAppFile = (path) => readFile(new URL(`../app/${path}`, import.meta.url), 'utf8');
const pageEntry = await readAppFile('page.tsx');
const homePage = await readAppFile('page/HomePage.tsx');
const layoutEntry = await readAppFile('layout.tsx');
const styles = await readAppFile('globals.css');
const packagesSection = await readAppFile('component/PackagesSection.tsx');
const heroSection = await readAppFile('component/HeroSection.tsx');
const gallerySection = await readAppFile('component/GallerySection.tsx');
const contactSection = await readAppFile('component/ContactSection.tsx');
const librarySection = await readAppFile('component/LibrarySection.tsx');
const contactSource = await readAppFile('lib/contact.ts');
const componentEntries = await readdir(new URL('../app/component/', import.meta.url), { withFileTypes: true });
const componentFiles = componentEntries.filter((entry) => entry.isFile()).map((entry) => entry.name);
const commonEntries = await readdir(new URL('../app/component/common/', import.meta.url), { withFileTypes: true });
const commonFiles = commonEntries.filter((entry) => entry.isFile()).map((entry) => entry.name);
const layoutFiles = await readdir(new URL('../app/layout/', import.meta.url));
const propAssetFiles = await readdir(new URL('../public/library/props/', import.meta.url));
const commonSource = (await Promise.all(commonFiles.map((file) => readAppFile(`component/common/${file}`)))).join('\n');
const componentSource = (await Promise.all([
  ...componentFiles.map((file) => readAppFile(`component/${file}`)),
  commonSource,
])).join('\n');
const layoutSource = (await Promise.all(layoutFiles.map((file) => readAppFile(`layout/${file}`)))).join('\n');
const siteSource = [homePage, componentSource, layoutSource].join('\n');

test('keeps the framework route entries small', () => {
  assert.match(pageEntry, /HomePage/);
  assert.ok(pageEntry.length < 200);
  assert.match(layoutEntry, /export default function RootLayout/);
});

test('organises the home page into page, layout, and component folders', () => {
  assert.match(homePage, /SiteHeader/);
  assert.match(homePage, /HeroSection/);
  assert.deepEqual(layoutFiles.sort(), ['SiteFooter.tsx', 'SiteHeader.tsx']);
  for (const file of ['BookingStepsSection.tsx', 'ContactSection.tsx', 'EventTypesSection.tsx', 'FAQSection.tsx', 'GallerySection.tsx', 'HeroSection.tsx', 'LibrarySection.tsx', 'PackagesSection.tsx', 'WhyChooseUsSection.tsx']) {
    assert.ok(componentFiles.includes(file), `missing ${file}`);
  }
});

test('organises reusable non-Elij components in the common layer', () => {
  assert.deepEqual(commonFiles.sort(), []);
  assert.equal(commonSource, '');
  assert.match(librarySection, /FilterTabs.*from ["']elij-ui-library["']/s);
  assert.match(librarySection, /SectionHeading.*from ["']elij-ui-library["']/s);
  assert.match(librarySection, /<FilterTabs/g);
  assert.match(gallerySection, /EventCarousel/);
  assert.match(heroSection, /<WhatsAppButton/);
  assert.match(heroSection, /WhatsAppButton.*from ["']elij-ui-library["']/s);
  assert.match(contactSection, /WhatsAppButton.*from ["']elij-ui-library["']/s);
  assert.match(contactSource, /wa\.me/);
  assert.match(componentSource, /<WhatsAppButton/);
  assert.match(siteSource, /<SectionHeading/);
});

test('showcases the real props and template library', () => {
  assert.match(homePage, /<LibrarySection \/>/);
  assert.match(layoutSource, /href="#library">Collection/);
  assert.match(librarySection, /100\+/);
  assert.match(librarySection, /\["Many", "Popular event styles"\]/);
  assert.match(librarySection, /200\+/);
  assert.match(librarySection, /Props for every personality/);
  for (const image of ['wedding-signs.png', 'wedding-fans.png']) assert.ok(propAssetFiles.includes(image));
  const catalogRanges = [
    ...Array.from({ length: 15 }, (_, index) => index + 3),
    ...Array.from({ length: 9 }, (_, index) => index + 23),
    ...Array.from({ length: 17 }, (_, index) => index + 37),
  ];
  for (const number of catalogRanges) assert.ok(propAssetFiles.includes(`catalog-prop-${String(number).padStart(2, '0')}.jpg`));
  assert.equal(propAssetFiles.length, 43);
  assert.match(librarySection, /100\+ styles currently available/);
  assert.match(librarySection, /Pick a prop\. Strike a pose\./);
  assert.match(librarySection, /Wedding signs, birthday favourites/);
  for (const category of ['Wedding', 'Birthday', 'Animals', 'Fruits']) {
    assert.match(librarySection, new RegExp(category));
  }
  const birthdayNumbersSource = librarySection.match(/birthdayPropNumbers = \[([\s\S]*?)\];/);
  assert.ok(birthdayNumbersSource);
  assert.deepEqual([...birthdayNumbersSource[1].matchAll(/\d+/g)].map(([number]) => Number(number)), [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
  assert.match(librarySection, /prop\.categories\.includes\(activePropCategory\)/);
  assert.match(librarySection, /useState<PropCategory>\("all"\)/);
  assert.match(librarySection, /activeKey=\{activePropCategory\}/);
  assert.match(librarySection, /visibleProps\.map/);
  assert.doesNotMatch(librarySection, /props-collection\.png/);
  assert.ok((librarySection.match(/src: "\/library\/templates\//g) ?? []).length >= 20);
  for (const category of ['Wedding & ROM', 'Birthday', 'Corporate & Events', 'Baby & Kids', 'Festive & Cultural', 'Minimal']) {
    assert.match(librarySection, new RegExp(category));
  }
  assert.match(librarySection, /useState<Category>\("all"\)/);
  assert.match(librarySection, /activeKey=\{activeCategory\}/);
  assert.match(styles, /\.props-preview-grid[\s\S]*grid-template-columns:\s*repeat\(4/);
});

test('shows real Moment Booth event cases in the gallery', () => {
  assert.match(gallerySection, /EventCarousel/);
  assert.match(gallerySection, /media:/);
  assert.match(gallerySection, /type: "video"/);
  assert.doesNotMatch(gallerySection, /event\.day|padStart/);
  for (const day of ['day5', 'day6', 'day7', 'day8', 'day9', 'day11']) assert.match(gallerySection, new RegExp(day));
  assert.match(gallerySection, /video3\.mp4/);
  for (const title of ['Wedding keepsakes', 'Celebration details', 'Instant memories', 'Wedding day moments', 'Personalised guestbook', 'Family Day Celebration']) assert.match(gallerySection, new RegExp(title));
  assert.doesNotMatch(gallerySection, /cover|modern-scene|scene-one|scene-two|scene-three/);
  assert.equal((gallerySection.match(/day\d+/g) ?? []).filter((day, index, all) => all.indexOf(day) === index).length, 6);
  assert.match(styles, /\.gallery-section[\s\S]*width:\s*100%/);
  assert.match(styles, /\.gallery-cases[\s\S]*grid-template-columns:\s*repeat\(3/);
  assert.match(styles, /\.event-carousel-track[\s\S]*transition:\s*transform/);
  assert.match(styles, /\.event-carousel-slide img[\s\S]*\.event-carousel-slide video/);
  assert.match(styles, /\.event-carousel-slide[\s\S]*aspect-ratio:\s*3\/4/);
  assert.match(styles, /\.event-carousel-slide img[\s\S]*object-fit:\s*contain/);
});

test('preserves the Moment Booth brand and page sections', () => {
  assert.match(siteSource, /Moment Booth/);
  assert.match(siteSource, /Capture Every Smile/);
  assert.match(siteSource, /Print Every Memory/);
  assert.match(siteSource, /Enquire/);
  assert.match(siteSource, /price:\s*["']\$368["']/);
  assert.match(siteSource, /price:\s*["']\$538["']/);
  assert.match(siteSource, /price:\s*["']\$698["']/);
  assert.match(siteSource, /SGD 100 deposit/);
  assert.match(siteSource, /SGD 20[\s\S]*administration fee/);
  assert.match(siteSource, /approximately 6–8 seconds/);
  assert.match(siteSource, /Fun Props Collection/);
  assert.match(siteSource, /Professional Studio Lighting/);
  assert.match(siteSource, /Serving all across Singapore/);
  for (const section of ['packages', 'gallery', 'faq', 'contact']) assert.match(siteSource, new RegExp(`id="${section}"`));
  assert.doesNotMatch(homePage, /StatementSection|ComplimentaryUpgradesSection/);
});

test('places every included feature inside both package cards', () => {
  assert.equal((packagesSection.match(/features: includedFeatures/g) ?? []).length, 3);
  assert.doesNotMatch(packagesSection, /className="package-includes"/);
  for (const feature of ['Unlimited Instant Prints', 'Professional DSLR Camera', 'Professional Studio Lighting', 'Fast Instant Printing', 'Live Preview Monitor', 'Fun Props Collection', 'Friendly On-Site Booth Crew', 'Full Digital Gallery']) {
    assert.match(packagesSection, new RegExp(feature));
  }
});

test('shows each package as price per duration', () => {
  assert.match(packagesSection, /package-offer/);
  assert.match(packagesSection, /<strong>\{item\.price\}<\/strong>/);
  assert.match(packagesSection, /<span>\/ \{item\.name\}<\/span>/);
  assert.doesNotMatch(packagesSection, />From </);
  assert.doesNotMatch(packagesSection, /\$288|\$428|SGD 368|SGD 538|SGD 698/);
  assert.match(packagesSection, /name:\s*["']4 Hours["']/);
  assert.match(styles, /\.packages-grid[\s\S]*grid-template-columns:\s*repeat\(4/);
});

test('offers custom multi-day and long-term rentals', () => {
  assert.doesNotMatch(homePage, /RentalSection/);
  for (const detail of ['Long-term rental', 'Multi-day & long-term rental', 'activations, exhibitions, and', 'days, weeks, or months', 'duration, venue, and scope', 'within\\s+24 hours', 'Longer bookings receive better-value rates', 'Request a custom quote']) {
    assert.match(packagesSection, new RegExp(detail, 'i'));
  }
  assert.match(packagesSection, /item\.rental/);
  assert.match(packagesSection, /rentalFeatures/);
  assert.match(packagesSection, /rental-highlight/);
  assert.match(packagesSection, /Flexible project pricing/);
  assert.match(packagesSection, /feature\.title !== "Friendly On-Site Booth Crew"/);
  assert.match(packagesSection, /item\.features\?\.map/);
  assert.match(packagesSection, /href="#contact"/);
  assert.doesNotMatch(styles, /rental-shell|rental-section/);
});

test('presents six guest-focused photo booth benefits', () => {
  assert.match(heroSection, /More than photos\. A better guest experience\./);
  assert.equal((heroSection.match(/title:\s*["']/g) ?? []).length, 6);
  for (const benefit of ['Break the Ice', 'Instant Keepsakes', 'Entertainment for Everyone', 'Capture Candid Moments', 'Made for Your Event', 'Easy, Hassle-Free Experience']) {
    assert.match(heroSection, new RegExp(benefit));
  }
  assert.doesNotMatch(heroSection, /From SGD 288/);
  assert.match(styles, /\.hero-benefits-grid[\s\S]*grid-template-columns:\s*repeat\(3/);
});

test('keeps booking steps detailed but compact', () => {
  for (const detail of ['guest count', 'SGD 100 deposit', 'names, colours, logo', 'remaining balance one week']) {
    assert.match(siteSource, new RegExp(detail));
  }
  assert.match(styles, /\.booking-section[\s\S]*padding-block:\s*76px/);
  assert.match(styles, /\.booking-grid article[\s\S]*padding:\s*22px 20px/);
});

test('uses a matching Lucide icon for each photo booth benefit', () => {
  assert.match(heroSection, /from ["']lucide-react["']/);
  for (const icon of ['MessageCircle', 'Images', 'PartyPopper', 'Camera', 'Palette', 'HandHeart']) {
    assert.match(heroSection, new RegExp(`icon: ${icon}`));
  }
  assert.match(heroSection, /<Icon size=\{22\} strokeWidth=\{1\.8\} \/>/);
});

test('summarises concrete Moment Booth differentiators in the hero', () => {
  for (const detail of ['Studio quality', 'Canon DSLR', 'professional lighting', 'Fast & easy', 'Live preview', '6–8 second prints', 'Every format', 'QR downloads', 'full gallery', 'Professional prints', 'DNP DS620', 'water-resistant']) {
    assert.match(heroSection, new RegExp(detail));
  }
});

test('keeps the four hero equipment highlights in one row on desktop', () => {
  for (const detail of ['Studio quality', 'Fast & easy', 'Every format', 'Professional prints']) {
    assert.match(heroSection, new RegExp(detail));
  }
  assert.match(styles, /\.hero-summary[\s\S]*grid-template-columns:\s*repeat\(4/);
});

test('continues to use Elij UI and the supplied logo', () => {
  assert.match(componentSource, /from 'elij-ui-library'/);
  assert.match(styles, /@import ["']elij-ui-library\/styles\.css["']/);
  assert.match(layoutSource, /\/moment-booth-logo\.png/);
  assert.match(layoutSource, /className="header-logo"/);
  assert.match(styles, /\.site-header[\s\S]*background:\s*linear-gradient\(135deg,\s*#18243a,\s*#111a2b\)/);
  assert.match(styles, /\.header-cta[\s\S]*background:\s*var\(--purple\)[\s\S]*color:\s*#fff/);
  assert.match(styles, /\.packages-grid[\s\S]*align-items:\s*stretch/);
  assert.doesNotMatch(styles, /translateY\(-8px\)/);
});

test('provides site-specific metadata', () => {
  assert.match(layoutEntry, /Moment Booth \| Capture Every Smile\. Print Every Memory/);
  assert.match(layoutEntry, /photobooth experiences/i);
  assert.match(layoutEntry, /icons:[\s\S]*\/moment-booth-logo\.png/);
  assert.match(layoutEntry, /\/og\.png/);
});

test('routes enquiries to WhatsApp with consistent icons', () => {
  assert.match(layoutSource, /whatsappHref/);
  assert.match(layoutSource, /MessageCircle size=\{15\}/);
  assert.match(layoutSource, /footer-logo/);
  assert.match(contactSource, /wa\.me\/6588467972/);
  assert.match(siteSource, /\/icons\/whatsapp\.png/);
  assert.doesNotMatch(contactSource, /MessageCircle/);
  assert.match(siteSource, /target="_blank"/);
  assert.match(siteSource, /className="whatsapp-icon"/);
  assert.match(siteSource, /className="floating-contact-image"[\s\S]*\/icons\/whatsapp\.png/);
  assert.match(siteSource, /width=\{72\} height=\{72\}/);
  assert.doesNotMatch(siteSource, /className="floating-contact"/);
  assert.match(styles, /\.floating-contact-image[\s\S]*width:\s*72px[\s\S]*height:\s*72px/);
  assert.doesNotMatch(siteSource, /mailto:hello@momentbooth\.sg/);
  assert.match(heroSection, /WhatsAppButton/);
  assert.match(styles, /\.whatsapp-enquire-button\.ui-button--primary[\s\S]*background:\s*var\(--purple\)/);
  assert.match(styles, /\.contact-section \.ui-button--primary:hover:not\(:disabled\)[\s\S]*background:\s*#d9dee7/);
});
