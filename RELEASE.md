# Release Checklist

## Before publish

```bash
npm run build
npm run test:run
npm pack --dry-run
```

Confirm:

- package name is correct: `azamat-ui-kit`
- version is correct in `package.json`
- `dist/index.d.ts` is not empty
- tarball only contains runtime package files
- npm account is logged in with the correct publisher account

## Publish

```bash
npm login
npm whoami
npm publish
```

## After publish

```bash
npm view azamat-ui-kit version
```

Recommended follow-up:

- create a GitHub release for the same version
- copy the `0.1.0` notes from `CHANGELOG.md`
- update the docs/showcase app to install from npm instead of local tarball
