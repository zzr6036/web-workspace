# Moment Booth Web Workspace

Monorepo for the Moment Booth website and shared UI library.

- `apps/moment-booth-fe` — Moment Booth website
- `packages/elij-ui-library` — shared React components, linked with `workspace:*`

## Setup

Use the Node version in `.nvmrc` and the pinned Yarn 4 version through Corepack:

```bash
nvm use
corepack enable
yarn install
```

Run these commands from the repository root or `apps/moment-booth-fe`:

```bash
yarn dev
# Or, equivalently:
yarn start
```

Both commands build the shared UI library first and start the local Vite development
server with hot reload. Open the Local URL printed in the terminal. `start` is a
local development alias, not a production server. The local configuration avoids
the Cloudflare runtime requirement on older macOS versions.

After editing the shared library, restart the command to rebuild its exports.

## Validation and production

```bash
yarn test
yarn lint
yarn test:startup # from the repository root; opens temporary local ports
yarn build
```

The build explicitly builds the shared library before the website; Yarn Modern
does not automatically execute arbitrary `prebuild` hooks.

The existing deployment build configuration is retained. For Cloudflare development
on a supported operating system, use `yarn workspace moment-booth-fe dev:cloudflare`.
The original `vinext start` command is available as
`yarn workspace moment-booth-fe start:production`; it requires compatible production
build output and is separate from local development.

Use the root `yarn.lock` for dependency installation; this workspace no longer uses pnpm.
