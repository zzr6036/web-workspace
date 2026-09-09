# Moment Booth — Product & Technical Design

**Status:** Production baseline and next-phase plan  
**Last updated:** 2026-09-09  
**Owner:** Moment Booth

## 1. Purpose

Moment Booth is a Singapore photo-booth service website. Its primary job is to turn event interest into a WhatsApp enquiry while making the service feel premium, clear, and easy to book.

This document combines the product direction and the technical decisions needed to operate the site reliably after the successful Vercel deployment.

## 2. Product goals

### Primary goals

1. Explain the experience quickly: what Moment Booth offers, who it is for, and what is included.
2. Build confidence with real event examples, print quality, equipment, templates, props, and transparent package pricing.
3. Convert visitors through one consistent action: WhatsApp enquiry.
4. Make the site easy to maintain as new photos, templates, props, and packages are added.

### Success signals

- WhatsApp enquiry clicks and completed conversations increase.
- Visitors reach the Packages, Collection, Gallery, and FAQ sections.
- Mobile visitors can browse the site without layout shift or broken media.
- New content can be added by editing data and assets rather than rewriting layout components.

### Non-goals for the current phase

- Online payment or real-time booking availability.
- A customer account system.
- A CMS or database-backed gallery.
- Publishing \`elij-ui-library\` CLI/MCP functionality before the website workflow is stable.

## 3. Core user journeys

### Visitor → enquiry

1. Visitor lands on the hero section.
2. Visitor understands the offer and sees a clear WhatsApp CTA.
3. Visitor scans benefits, event types, gallery, packages, and inclusions.
4. Visitor selects a package or asks about a custom/long-term rental.
5. Visitor clicks WhatsApp and sends an enquiry with the prefilled message.

### Visitor → trust

1. Visitor sees real event examples and print quality.
2. Visitor reviews the Canon DSLR, studio lighting, DNP DS620 printer, props, templates, and digital gallery.
3. Visitor checks the FAQ for setup, cancellation, customisation, and Singapore coverage.

### Returning visitor → direct contact

The floating WhatsApp icon stays available on mobile and desktop without covering important content or carousel controls.

## 4. Product information architecture

The current single-page structure should remain simple:

\`\`\`text
Header
└── Hero + primary WhatsApp CTA
    ├── Why choose a photo booth?
    ├── Event types
    ├── Real connection / event gallery
    ├── Props & template collection
    ├── Packages
    │   └── Custom rental package
    ├── Booking steps
    ├── FAQ
    └── Contact CTA + footer
\`\`\`

Each section should have one clear purpose. Avoid adding a section unless it answers a customer question, demonstrates proof, or improves conversion.

## 5. Technical architecture

### Repository

\`\`\`text
web-workspace/
├── apps/
│   └── moment-booth-fe/       # Moment Booth website
├── packages/
│   └── elij-ui-library/       # Published reusable React UI package
├── tests/                     # Workspace and deployment checks
├── package.json               # Yarn workspace scripts
├── yarn.lock                  # Single lockfile
└── .yarnrc.yml                # Yarn 4 workspace behavior
\`\`\`

### Runtime and deployment

- Node.js: \`22.x\` (repository requires \`>=22.13.0 <23\`).
- Package manager: Yarn 4 through Corepack.
- Website runtime: Vinext/Nitro production output for Vercel.
- Vercel root directory: \`apps/moment-booth-fe\`.
- Vercel install: \`corepack enable && corepack yarn install --immutable\`.
- Vercel build: \`corepack yarn build\`.
- Vercel output: \`.vercel/output\`.
- Static media: \`apps/moment-booth-fe/public\`.

### UI dependency boundary

\`moment-booth-fe\` consumes the published package:

\`\`\`json
"elij-ui-library": "^0.1.0"
\`\`\`

The Yarn configuration disables transparent workspace linking, so this semver dependency resolves to the npm package rather than silently linking the local workspace. Keep content, event data, image paths, and WhatsApp details inside the website app; keep reusable presentation components inside \`elij-ui-library\`.

Recommended boundary:

\`\`\`text
elij-ui-library
├── Button, Badge, Card, SectionHeading
├── FilterTabs, EventCarousel
└── WhatsAppButton (props: href, label, icon, size)

moment-booth-fe
├── package/event/template/prop data
├── public images and video
├── WhatsApp number and prefilled messages
└── page-specific composition
\`\`\`

For production reproducibility, consider changing the app dependency from \`^0.1.0\` to the exact tested version \`0.1.0\` after the next library release process is established.

## 6. Content and asset model

Keep content data-oriented so the visual components remain reusable:

\`\`\`ts
type Package = {
  name: string;
  priceLabel: string;
  description: string;
  features: { title: string; description: string }[];
  popular?: boolean;
};

type EventMedia = {
  title: string;
  category: "wedding" | "birthday" | "corporate" | "celebration";
  items: { type: "image" | "video"; src: string; alt: string }[];
};
\`\`\`

Rules:

- Use absolute public paths such as \`/gallery/day11/video3.mp4\`.
- Preserve the original image aspect ratio in carousels.
- Add descriptive \`alt\` text for images; use an accessible label for video.
- Do not reference local filesystem paths in production content.
- Optimise large photos before committing them, but keep source originals outside the deployed public folder when they are not required by the website.

## 7. SEO and discoverability plan

### Immediate fixes

1. Point \`og:image\` and \`twitter:image\` to the production domain, for example \`https://momentboothsg.com/og.png\`.
2. Add \`/robots.txt\` with the production sitemap URL.
3. Add \`/sitemap.xml\` for the homepage and any future public routes.
4. Register the domain in Google Search Console and submit the sitemap.
5. Verify the favicon and social preview on WhatsApp, LinkedIn, and Facebook sharing tools.

### Content recommendations

- Keep the title focused on service + location: “Moment Booth Singapore | Capture Every Smile”.
- Keep the description factual and conversion-oriented.
- Use headings that describe customer intent, not internal component names.
- Add location language naturally: Singapore, weddings, ROMs, birthdays, corporate events, schools, hotels, and private celebrations.

## 8. Analytics and conversion measurement

Track these events with privacy-conscious analytics:

\`\`\`text
whatsapp_click       { location: header | hero | package | contact | floating }
section_view         { section: gallery | library | packages | faq }
package_interest     { package: 2-hours | 3-hours | 4-hours | custom }
gallery_interaction  { category, direction }
\`\`\`

Do not send phone numbers, names, or message contents to analytics. First establish baseline events, then review weekly:

- CTA click-through rate
- Mobile vs desktop conversion
- Most-viewed package
- Most-used gallery/category tab
- Exit points before enquiry

## 9. Quality, accessibility, and performance

### Release checks

Run from the repository root:

\`\`\`bash
yarn install --immutable
yarn test
yarn lint
yarn build
yarn test:vercel
\`\`\`

### Manual smoke test

- Test at 375px, 768px, and desktop widths.
- Verify keyboard focus for navigation, tabs, carousel controls, FAQ, and WhatsApp links.
- Confirm carousel images do not crop important faces or printed content.
- Confirm video is muted, has controls/fallback behavior, and does not create a layout jump.
- Test WhatsApp links on iOS, Android, and desktop.
- Check that every production asset returns \`200\`.

### Performance priorities

1. Keep the hero logo and first visible gallery image prioritised.
2. Lazy-load below-the-fold images and video.
3. Avoid preloading every carousel image.
4. Use responsive image sizing and stable aspect-ratio containers.
5. Recheck Core Web Vitals after analytics and new media are added.

## 10. Delivery roadmap

### Phase 1 — Production hygiene

- Fix social preview domain.
- Add robots and sitemap.
- Add analytics events.
- Complete mobile/accessibility smoke test.

### Phase 2 — Conversion improvements

- Add a short enquiry form or structured WhatsApp prefill options.
- Add package comparison and custom-rental emphasis.
- Add testimonials only when real, approved customer feedback is available.

### Phase 3 — Content operations

- Move packages, props, templates, and event media into typed data files.
- Add a small content checklist for image dimensions, alt text, and naming.
- Add an automated asset-link checker to CI.

### Phase 4 — Elij UI distribution

- Lock a tested library version for production.
- Add Storybook examples and API documentation for shared components.
- Add CLI scaffolding only after the component APIs and release cadence are stable.
- Consider MCP tools later for component discovery and generation, not as a prerequisite for the website.

## 11. Definition of done for the next release

- Production homepage returns HTTP 200.
- All visible media and CSS/JS assets return HTTP 200.
- No broken internal links or missing public assets.
- \`og:image\`, \`robots.txt\`, and \`sitemap.xml\` use the production domain.
- WhatsApp clicks are measurable without collecting message content.
- Tests, lint, normal build, and Vercel build checks pass.
- The deployed commit and \`elij-ui-library\` version are recorded in the release notes.

