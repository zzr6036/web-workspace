# Elij UI

A reusable React + TypeScript component library with Storybook documentation.

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
