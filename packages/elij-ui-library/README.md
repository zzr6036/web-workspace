# Elij UI Library

A reusable React + TypeScript component library with accessible primitives, layout components, charts, themes, and Storybook documentation.

## Installation

Install the published package in a React application:

```bash
npm install elij-ui-library
```

`react` and `react-dom` are peer dependencies, so your application should provide React 18 or 19.

## Basic usage

Import the stylesheet once in your application entry point, then import the components you need:

```tsx
import 'elij-ui-library/styles.css';
import { Button, SectionHeading } from 'elij-ui-library';

export function Example() {
  return (
    <section>
      <SectionHeading
        eyebrow="Example"
        title="Build a clear interface"
        description="Typed components with consistent visual treatment."
      />
      <Button variant="primary">Continue</Button>
    </section>
  );
}
```

Import `elij-ui-library/styles.css` only once, from the application entry point. In Next.js App Router projects, import it from `app/layout.tsx`; in Vite projects, import it from `main.tsx`.

## Component examples

### Card and actions

```tsx
import { Button, Card, CardBody, SectionHeading } from 'elij-ui-library';

export function PricingCard() {
  return (
    <Card>
      <CardBody>
        <SectionHeading
          eyebrow="Popular"
          title="3 Hours"
          description="A complete photo booth experience for larger celebrations."
        />
        <Button variant="primary">Request details</Button>
      </CardBody>
    </Card>
  );
}
```

### Tabs and filters

```tsx
import { FilterTabs } from 'elij-ui-library';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'birthday', label: 'Birthday' },
];

export function CategoryFilters() {
  return <FilterTabs items={tabs} value="all" onChange={(value) => console.log(value)} />;
}
```

### Event carousel

```tsx
import { EventCarousel } from 'elij-ui-library';

const media = [
  { src: '/events/wedding-01.jpg', alt: 'Wedding celebration' },
  { src: '/events/setup-01.jpg', alt: 'On-site booth setup' },
  { src: '/events/prints-01.mp4', type: 'video', alt: 'Instant print demo' },
];

export function EventExample() {
  return (
    <EventCarousel
      title="Real celebrations"
      description="Photos from recent events."
      media={media}
    />
  );
}
```

`EventCarousel` supports image and video media. Each item should include a stable `src`; add `alt` text for accessible image descriptions.

### WhatsApp button

```tsx
import { WhatsAppButton } from 'elij-ui-library';

export function ContactExample() {
  return (
    <WhatsAppButton href="https://wa.me/659xxxxxxx">
      WhatsApp enquire
    </WhatsAppButton>
  );
}
```

Pass your own WhatsApp URL through `href`. The component opens external links in a new tab by default and supports `size`, `variant`, `icon`, `target`, and `rel` props.

### Forms

```tsx
import { Button, Input, Select, Textarea } from 'elij-ui-library';

export function EnquiryForm() {
  return (
    <form>
      <Input label="Name" name="name" placeholder="Your name" required />
      <Select
        label="Event type"
        name="eventType"
        options={[
          { value: 'wedding', label: 'Wedding' },
          { value: 'birthday', label: 'Birthday' },
        ]}
      />
      <Textarea label="Message" name="message" rows={4} />
      <Button type="submit" variant="primary">Send enquiry</Button>
    </form>
  );
}
```

Form components expose native HTML attributes where appropriate. Validation and submission state remain owned by the consuming application.

### Charts

```tsx
import { BarChart, UIProvider } from 'elij-ui-library';

const data = [
  { month: 'Jan', bookings: 12 },
  { month: 'Feb', bookings: 18 },
];

export function BookingChart() {
  return (
    <UIProvider>
      <BarChart
        data={data}
        xKey="month"
        series={[{ dataKey: 'bookings', name: 'Bookings' }]}
        ariaLabel="Monthly bookings"
      />
    </UIProvider>
  );
}
```

Cartesian charts accept `data`, `series`, and `xKey`. Pie and donut charts accept `data`, `nameKey`, and `valueKey`. Charts support loading and empty states, legends, tooltips, formatters, custom colors, and accessible labels.

## Themes and localization

Wrap your application, or one section of it, with `UIProvider`:

```tsx
import 'elij-ui-library/styles.css';
import { Button, UIProvider, useUI } from 'elij-ui-library';

function Actions() {
  const { t } = useUI();
  return <Button>{t('next')}</Button>;
}

export function App() {
  return (
    <UIProvider locale="zh-CN" theme="dark">
      <Actions />
    </UIProvider>
  );
}
```

Built-in locales are `en` and `zh-CN`. Built-in themes are `light`, `dark`, and `ocean`. Custom locale strings can be provided through `messages`, and custom themes can define CSS variables under a matching `[data-ui-theme="..."]` selector.

```tsx
<UIProvider locale="en-SG" messages={{ next: 'Carry on' }} theme="ocean">
  <App />
</UIProvider>
```

Elij UI translates built-in control labels and accessibility text. Product-specific copy, field labels, table data, and event content should be supplied by the consuming application.

## Component catalogue

The package currently includes 54 public components:

- Actions: `Button`, `ActionLinkButton`, `WhatsAppButton`
- Data visualization: `LineChart`, `BarChart`, `AreaChart`, `PieChart`, `DonutChart`, `StackedBarChart`, `StackedBarLineChart`, `VerticalBarChart`, `HorizontalBarChart`, `GroupedBarChart`, `DualAxisChart`
- General: `Title`, `Text`, `Paragraph`, `Link`
- Forms: `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Select`
- Navigation: `Menu`, `Dropdown`, `Tabs`, `FilterTabs`, `Breadcrumb`, `Pagination`, `Steps`
- Feedback: `Alert`, `Spinner`, `Skeleton`, `Progress`, `Result`, `Empty`
- Data display: `Badge`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Avatar`, `Tag`, `Tooltip`, `Table`
- Overlay: `Dialog`, `Drawer`
- Layout: `Divider`, `Space`, `Flex`, `Row`, `Col`, `Layout`, `Header`, `Sider`, `Content`, `Footer`
- Content: `SectionHeading`, `EventCarousel`

Every public component has TypeScript declarations and a Storybook story. The Storybook Registry/Catalog provides a searchable inventory with component descriptions, props, and story names.

## Registry metadata

The published registry is intended for CLI, MCP, documentation, and scaffolding tools. It is not required for normal React component rendering.

In Node.js, import the JSON registry with an import attribute:

```ts
import registry from 'elij-ui-library/registry' with { type: 'json' };

console.log(registry.version);
console.log(registry.components.length);
```

The registry schema is also available at `elij-ui-library/registry/schema`.

## Storybook

Run Storybook locally from this package:

```bash
npm run dev
```

Open `http://localhost:6006` to browse components, change controls, inspect accessibility, and view interaction examples. Build the static Storybook output with:

```bash
npm run build-storybook
```

## TypeScript, accessibility, and browser support

The package exports component prop types from the main entry point. Interactive components use semantic HTML, keyboard interaction, focusable controls, and accessible labels where applicable. Always provide meaningful `alt` text and `ariaLabel` values for content whose meaning is not obvious from surrounding text.

## Local development and monorepo usage

From the monorepo root:

```bash
corepack yarn workspace elij-ui-library dev
corepack yarn workspace elij-ui-library build
corepack yarn workspace elij-ui-library test
corepack yarn workspace elij-ui-library typecheck
corepack yarn workspace elij-ui-library lint
```

For active development across separate projects, use a workspace monorepo or a local package link. In the current monorepo, depend on the workspace package and run `corepack yarn install` from the root.

## Versioning and publishing

The registry version should stay synchronized with the package version. Before publishing:

```bash
npm pack --dry-run
npm publish --access public
```

Use the published package in another application with:

```bash
npm install elij-ui-library
```

## Troubleshooting

- **Styles are missing:** import `elij-ui-library/styles.css` once from the application entry point.
- **A component is not found:** check the exported component names or search the Storybook Registry/Catalog.
- **Charts do not render:** ensure the chart is mounted in a browser environment and has a non-empty `data` array.
- **Theme changes do not apply:** use `UIProvider` or define CSS variables under the matching `data-ui-theme` selector.
- **Registry import fails in Node.js:** use `with { type: 'json' }` as shown in the Registry metadata section.
