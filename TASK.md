# Azamat UI Kit Tasks

This file is the active work queue. Older audits were removed to keep one clear source of truth.

Current status:

- Package version: `0.3.2`
- CLI package version: `0.3.2`
- Main adoption model: install package, copy source through `azamat-ui-kit-cli`
- Last verified gate: `npm run release:gate`

## P0 - Release Safety

- [x] Keep root package, CLI package, registry and CLI runtime versions synced.
- [x] Add CLI temp-project smoke tests for Vite and Next-style apps.
- [x] Add built-package consumer fixture smoke tests.
- [x] Add build-output guard for accidental browser ESM `require(...)` fallbacks.
- [ ] Run `npm run release:gate` from a clean tree before every publish.
- [ ] Publish only after the docs app consumes the package without local aliases.

## P0 - Test Coverage

- [ ] Replace string-based `scripts/a11y-smoke.mjs` with render-based a11y tests.
- [ ] Add primitive render tests for `Button`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Badge`, `Card`, `Tabs`.
- [ ] Add DataTable tests for search, loading, empty, error, row actions, pagination and column visibility.
- [ ] Add AsyncSelect tests for loading, empty, error, min-search, grouped options and selected labels.
- [ ] Add AsyncMultiSelect tests for max selected, close-on-select and select-all behavior.
- [ ] Add Calendar and DatePicker tests for single selection, range selection, min/max and locale.
- [ ] Add Upload tests for max files, max size, accept/type rejection and drag/drop.
- [ ] Add FormBuilder type/render tests before promoting it from experimental.
- [ ] Add Overlay, Command and Navigation interaction tests.
- [ ] Add public API snapshot test.

## P1 - API Cleanup

- [ ] Keep `Input` as the canonical input entry; treat preset inputs as variants/helpers in docs.
- [ ] Keep `FormInput` as the canonical React Hook Form input wrapper.
- [ ] Keep `Select` / `FormSelect` as the canonical select entries; show async/multi/combobox as related modes.
- [ ] Keep `InfoCard` as the public display-card name; avoid promoting implementation names.
- [ ] Keep large system helpers on subpath/source-copy surfaces unless they pass API review.
- [ ] Mark migration aliases separately in registry metadata.
- [ ] Align `PUBLIC_API_INVENTORY.md` whenever root exports change.

## P1 - CLI And Source Copy

- [ ] Add `doctor` command for stale copied files, missing dependencies and config issues.
- [ ] Add `diff` command to compare copied local files with package source.
- [ ] Add `upgrade` command for safe re-copy of selected components.
- [ ] Add cleanup for temp directories in CLI and fixture smoke scripts.

## P1 - Documentation

- [ ] Keep README short and focused on install, CLI, Tailwind setup and common imports.
- [ ] Add generated props/API docs for public components.
- [ ] Add focused examples for `AsyncSelect` and `AsyncMultiSelect`.
- [ ] Add troubleshooting notes for async request ordering and disabled-option UX.
- [ ] Keep public docs catalog component names aligned with registry canonical names.

## P2 - Styling

- [ ] Convert non-semantic `zinc`, `slate`, `neutral`, `stone`, `white`, `black` classes in package components to token-based classes where practical.
- [ ] Add a lint-like script that reports hardcoded neutral palette usage in `src/components`.
- [ ] Keep allowed semantic palettes limited to success/warning/danger/info status use.

## Commands

Use these before release:

```bash
npm run lint
npm run test:run
npm run test:cli
npm run test:fixtures
npm run release:gate
```
