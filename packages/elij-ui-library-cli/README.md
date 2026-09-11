# Elij UI Library CLI

Discover components, registry metadata, props, and Storybook stories from the published `elij-ui-library` package.

## Install

Run commands without a global install:

```bash
npx -y elij-ui-library-cli list
```

Or install it in a project:

```bash
npm install -D elij-ui-library-cli
```

The package provides three equivalent command names:

```bash
elij-ui
elij-ui-library
elij-ui-library-cli
```

The short `elij-ui` command is recommended.

## Commands

### List all components

```bash
npx -y elij-ui-library-cli list
```

Example output:

```text
Button — actions
Card — layout
EventCarousel — content
```

### Search components

Search component names, categories, and descriptions:

```bash
npx -y elij-ui-library-cli search button
npx -y elij-ui-library-cli search carousel
npx -y elij-ui-library-cli search whatsapp
```

### Inspect one component

```bash
npx -y elij-ui-library-cli info Button
npx -y elij-ui-library-cli info EventCarousel
npx -y elij-ui-library-cli info WhatsAppButton
```

Example output:

```text
Name: EventCarousel
Category: content
Description: A responsive carousel for event images.
Import: EventCarousel
Story: EventCarousel/Default
Props: items, autoplay, interval, showArrows
```

Component names are case-insensitive, so `info button` and `info Button` are equivalent.

### Check the registry

```bash
npx -y elij-ui-library-cli doctor
```

Example output:

```text
Registry package: elij-ui-library
Registry version: 1.0.0
Components: 54
Status: ready
```

## Typical workflow

```text
search → info → copy the import and props → open the Storybook story
```

For example:

```bash
npx -y elij-ui-library-cli search pricing
npx -y elij-ui-library-cli info Card
```

Then import the component from your application:

```tsx
import { Card } from "elij-ui-library";
```

## Troubleshooting

### Command not found

Use `npx -y elij-ui-library-cli <command>`, or install the package globally:

```bash
npm install -g elij-ui-library-cli
```

### Component not found

Check the spelling with `list` or `search`. Component names are case-insensitive, but partial names only work with `search`.

### Registry is not ready

Run `doctor` first and check that npm can download `elij-ui-library`. If you are using a private registry, verify your npm registry and login settings.

## Development

From the monorepo root:

```bash
corepack yarn workspace elij-ui-library-cli build
corepack yarn workspace elij-ui-library-cli test
```
