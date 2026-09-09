# Elij UI

A reusable React + TypeScript component library with Storybook documentation.

The package is the runtime layer of Elij UI. Component metadata is also published
in registry/components.json for future CLI and MCP tooling.

## Development

```bash
npm install
npm run dev
```

Storybook will be available at `http://localhost:6006`.

## Build

```bash
npm run build
npm run build-storybook
```

## Components

- Actions: `Button`
- Data visualization: `LineChart`, `BarChart`, `AreaChart`, `PieChart`, `DonutChart`, `StackedBarChart`, `StackedBarLineChart`, `VerticalBarChart`, `HorizontalBarChart`, `GroupedBarChart`, `DualAxisChart`
- General: `Title`, `Text`, `Paragraph`, `Link`
- Forms: `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Select`
- Navigation: `Menu`, `Dropdown`, `Tabs`, `Breadcrumb`, `Pagination`, `Steps`
- Feedback: `Alert`, `Spinner`, `Skeleton`, `Progress`, `Result`
- Data display: `Badge`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Avatar`, `Tag`, `Tooltip`, `Table`, `Empty`
- Overlay: `Dialog`, `Drawer`
- Layout: `Divider`, `Space`, `Flex`, `Row`, `Col`, `Layout`, `Header`, `Sider`, `Content`, `Footer`

Every component includes TypeScript types and Storybook examples. Form controls expose native HTML attributes, and interactive components include keyboard and accessibility semantics.

The Storybook Registry/Catalog story provides a searchable starting point for
the public component inventory. Every public component has a dedicated Storybook
story with controls or an interaction example where appropriate.

## Versioning and future tooling

Use the changelog for each published version and keep the registry version in
sync with the package version. The next packages can be added separately:

~~~text
elij-ui-library       React runtime, styles, and registry
elij-ui-cli           init, list, add, and doctor commands
elij-ui-mcp-server    read-only component discovery for AI hosts
~~~

The CLI and MCP server should consume the registry rather than parsing source
files or Storybook internals.

## Test

```bash
npm run test
npm run typecheck
npm run lint
```

## Use from another local project

Build this library first, then install it from the consuming project:

```bash
npm install ../ui-library
```

Import the shared stylesheet once in your application's entry file, then use components normally:

```tsx
import 'elij-ui-library/styles.css';
import { Button } from 'elij-ui-library';

export function Example() {
  return <Button variant="primary">Continue</Button>;
}
```

## Install from npm

~~~bash
npm install elij-ui-library
~~~

Import the stylesheet once, then use the typed component exports:

~~~tsx
import 'elij-ui-library/styles.css';
import { Button, SectionHeading } from 'elij-ui-library';

export function Example() {
  return (
    <>
      <SectionHeading eyebrow="Example" title="A typed component" />
      <Button>Continue</Button>
    </>
  );
}
~~~

The published registry can be consumed by tooling:

~~~ts
import registry from 'elij-ui-library/registry';
~~~

registry/components.json is intended for component search, documentation,
CLI scaffolding, and MCP resources. It is not required at runtime by the
React components.

## Locale and color themes

Wrap your application, or one section of it, with `UIProvider`. English and light theme are used by default.

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

Built-in locales are `en` and `zh-CN`. Built-in themes are `light`, `dark`, and `ocean`. Add another locale by passing `messages`, and add another theme by defining CSS variables under your own `[data-ui-theme="..."]` selector.

Elij UI automatically translates built-in control text and accessible labels such as close, loading, pagination, menus, tabs, steps, and progress. Product-specific content—titles, field labels, table data, and messages—remains owned by the consuming application and should be passed through props. In Storybook, use the globe toolbar to switch both component semantics and demo content between English and Simplified Chinese.

```tsx
<UIProvider
  locale="en-SG"
  messages={{ next: 'Carry on' }}
  theme="my-theme"
>
  <App />
</UIProvider>
```

For active development across projects, use `npm link` or a workspace monorepo. Before publishing to npm, remove `private: true` from `package.json`, choose an available package name, and run `npm publish --access public`.

Charts are responsive and theme-aware, with loading, empty, tooltip, legend, formatter, custom palette, and accessible-label support. Cartesian charts accept `data`, `series`, and `xKey`; pie charts accept `nameKey` and `valueKey`.
