# MomentFrame

Initial responsive layout with the supplied logo, navigation, illustrated collection placeholders, and footer. No live product catalogue or contact integration is configured.

From the workspace root (Node 22.13.0, Yarn 4.9.2):

```sh
yarn dev:frame
# http://localhost:3001
yarn build:frame
yarn workspace moment-frame-fe start
yarn workspace moment-frame-fe lint
yarn workspace moment-frame-fe typecheck
yarn workspace moment-frame-fe test
```

Uses Next.js App Router, React and TypeScript. Unlike the existing Booth app's Vinext adapter, this app uses Next.js directly and has no dependency on Booth-specific build settings.

For a future independent Vercel project, select `apps/moment-frame-fe` as Root Directory and Next.js as the framework. Configure that project's domain and environment variables separately. Deployment has not been performed.

The images in the collection are CSS illustrations, not product photographs. `public/logo_circle.png` is an unchanged copy of the supplied original.

The start/build scripts skip Next.js npm-lockfile patching because this repository uses Yarn. Run `yarn build:frame` before the HTTP regression tests.
