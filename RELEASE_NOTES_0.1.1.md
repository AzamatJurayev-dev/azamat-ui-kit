# azamat-ui-kit 0.1.1

Patch release focused on library-only cleanup after the first public npm publish.

## Highlights

- published as `azamat-ui-kit@0.1.1`
- removed the docs-only `ComponentPreview` export from the runtime package
- removed unused `prism-react-renderer` from package dependencies
- kept `DataTable` React Compiler lint output intentionally quiet around TanStack Table
- tightened the package boundary so the repo stays focused on reusable library code

## Consumer impact

- no breaking API changes for normal library consumers
- slightly smaller install surface because one unused dependency was removed
- docs/showcase preview code stays in the separate `azamat-ui` app, not in the package

## Verification

- `npm run build`
- `npm run lint`
- `npm run test:run`
- `npm pack --dry-run`
- `npm publish`
