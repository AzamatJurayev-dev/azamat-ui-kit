# azamat-ui-kit 0.1.0

First public npm release of `azamat-ui-kit`.

## Highlights

- published as `azamat-ui-kit@0.1.0`
- cleaned npm package contents for public distribution
- fixed type declaration output so `dist/index.d.ts` is generated correctly
- reduced tarball size significantly
- removed unused package dependencies
- made exported navigation components router-agnostic
- added `renderLink` support for:
  - `Breadcrumbs`
  - `SidebarNav`
  - `AppSidebar`
  - `QuickActionGrid`

## Consumer impact

- package can now be installed directly from npm:

```bash
npm install azamat-ui-kit
```

- Next.js and other router-based apps can adapt links with `renderLink`
- runtime dependency on `react-router-dom` is no longer required for library consumers

## Verification

- `npm run build`
- `npm run test:run`
- `npm pack --dry-run`
- `npm publish`
