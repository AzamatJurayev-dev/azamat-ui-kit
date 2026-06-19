# Release Checklist

## Before publish

Run the same gate locally from a clean working tree:

```bash
npm run release:gate
```

The gate expands to:

```bash
npm run lint
npm run test:run
npm run build
npm pack --dry-run
```

Confirm:

- package name is correct: `azamat-ui-kit`
- version is correct in `package.json`, `registry.json`, and `CHANGELOG.md`
- `dist/index.js` does not contain runtime `require("react")`
- `dist/index.cjs` exists for Node/CommonJS consumers
- `dist/index.d.ts` is not empty and matches the package export map
- tarball only contains runtime package files, registry manifest, README, changelog, release docs, maturity docs, and license
- peer dependencies remain external: `react`, `react-dom`, `react/jsx-runtime`, `react-hook-form`

## NPM account and 2FA/token

Use a publish token only from the owner npm account. If the account has 2FA enabled, publish with an OTP from the authenticator app. Do not store the npm token in the repo.

```bash
npm login
npm whoami
npm publish --access public
```

When publishing from CI later, store the npm token in GitHub Actions secrets and keep package provenance/2FA policy documented in the workflow handoff.

## Manual consumer smoke

After `npm pack --dry-run`, test one clean consumer app before publishing:

```bash
npm create vite@latest aui-smoke -- --template react-ts
cd aui-smoke
npm install ../azamat-ui-kit-0.2.0.tgz
npx azamat-ui-kit init --template vite
npx azamat-ui-kit add button input data-table --dry-run
```

For Next.js:

```bash
npx create-next-app@latest aui-next-smoke --ts --app
cd aui-next-smoke
npm install ../azamat-ui-kit-0.2.0.tgz
npx azamat-ui-kit init --template next
```

## After publish

```bash
npm view azamat-ui-kit version
```

Recommended follow-up:

- create a GitHub release for the same version
- copy the matching version notes from `CHANGELOG.md`
- update the separate docs/showcase app `azamat-ui` to install the published npm version
- remove any local tarball or workspace workaround from the docs app

## GitHub release notes template

```md
## Fixes
- ...

## Changed
- ...

## Docs
- ...

## Tests
- ...

## Known limitations
- ...
```
