# Testing and accessibility smoke checks

This UI kit uses a lightweight test layer that does not add extra runtime dependencies.

## Commands

```bash
npm run test:types
npm run test:a11y
npm run test:registry
npm run test:run
```

## Type smoke tests

`tests/smoke/component-imports.test.tsx` imports the public package surface and creates JSX smoke examples for the main reusable components.

The goal is to catch:

- broken root exports
- incompatible component props
- accidental removal of core patterns
- TypeScript regressions in public APIs

## Accessibility smoke checks

`scripts/a11y-smoke.mjs` performs static checks on key interactive components.

The goal is to catch missing baseline accessibility signals such as:

- `aria-label` for icon-only controls
- `aria-expanded` for popover triggers
- disabled state handling
- stable `data-slot` selectors
- dialog title/description wiring
- hidden skeleton rows marked with `aria-hidden`

This is not a full automated accessibility audit. It is a fast guardrail that runs in CI before build.

## Registry validation

`scripts/validate-registry.mjs` checks the CLI registry and public `registry.json` manifest.

The goal is to catch:

- components listed in `registry.json` but missing from the CLI registry
- CLI registry entries missing from the `ComponentName` union
- broken `registryDependencies`
- missing source files referenced by copy-mode registry entries
- duplicate component names in the registry union

This keeps `npx azamat-ui-kit add ...` safer as the library grows.

## CI

GitHub Actions runs:

```bash
npm ci
npm run test:run
npm run build
```

No business API, routes, auth, tenant, permission or real project data should be used in tests.
