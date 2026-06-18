# Azamat UI Kit Library Readiness Tasks

Status: component expansion and non-test hardening pass is in progress on `master`.

Test files were intentionally not changed in this pass.

## Completed first pass

- [x] Build/runtime externals and ESM `require("react")` smoke guard.
- [x] Clean `dist` before build/prepack.
- [x] Explicit package exports for ESM, CJS, TypeScript and package metadata.
- [x] `registry.json` version aligned with `package.json`.
- [x] CLI version aligned with package version.
- [x] `init --template vite|next` and `--skip-install` support.
- [x] Theme output includes `:root`, `.light`, and `.dark` token blocks.
- [x] Component maturity rubric and release handoff docs.
- [x] DataTable `search as Record<string, unknown>` workaround removed.
- [x] DataTable `onValueChange as any` workaround removed.
- [x] Build-output smoke check now catches indirect ESM `require` fallbacks.

## Completed component expansion pass

### New reusable components

- [x] Added dependency-free reusable chart pack: `ChartFrame`, `BarChart`, `LineChart`, `Sparkline`, `DonutChart`, `ChartLegend`, `MetricTrend`.
- [x] Added base collapse primitive: `Collapse`, `CollapseTrigger`, `CollapseContent`.
- [x] Added Ant-like composed collapse: `CollapseGroup` with single/multiple modes.
- [x] Added feedback `Alert` component with `info`, `success`, `warning`, `destructive`, and `muted` tones.
- [x] Added reusable statistics components: `Statistic`, `StatisticCard`, `StatisticGrid`.
- [x] Exported charts and collapse from package root.
- [x] Exported `Alert` from feedback index.
- [x] Exported statistics from display index.

### Calendar and date picker hardening

- [x] Add keyboard navigation for date grid: arrow keys, Home/End and PageUp/PageDown.
- [x] Add roving tab index or equivalent focus management for date buttons.
- [x] Add disabled date reason API.
- [x] Prevent invalid range selection when min/max/disabled dates conflict with a range.
- [x] Document date value format as `YYYY-MM-DD` and state timezone limitations clearly.

### Upload hardening

- [x] Add keyboard accessible fallback for opening the file dialog from the dropzone.
- [x] Ensure disabled/loading prevents drag/drop and file dialog interactions.
- [x] Verify `ImageUpload` revokes object URLs when files change, preview is disabled and component unmounts.
- [x] Allow custom rejection messages or labels for localization.

### Registry, API and docs

- [x] Add registry status metadata so CLI/docs can show `stable`, `preview`, `experimental`, `internal`.
- [x] Update CLI `list` command to show component status.
- [x] Compare public export strategy with `COMPONENT_MATURITY.md` and document current decisions.
- [x] Decide `ThemeProvider` remains internal/source-only for now.
- [x] Decide `input-group` and low-level command primitives remain internal/preview until stable API is designed.
- [x] Document changelog rule for every public API addition/removal.
- [x] Add component status section to README.
- [x] Add troubleshooting for missing theme tokens, ESM import issues, peer dependency mismatch and React Hook Form setup.
- [x] Add Upload example showing accepted/rejected files and image preview cleanup behavior.
- [x] Document DataTable pagination behavior: public `pageIndex` is 0-based.
- [x] Confirm `@fontsource-variable/geist` remains runtime dependency while CLI theme imports it.
- [x] Produce explicit allowed semantic hardcoded color policy: emerald, amber, red, blue.

## Still open because user said not to touch tests

- [ ] Replace string-based `scripts/a11y-smoke.mjs` with render-based tests.
- [ ] Add Vitest + Testing Library or other render-test infrastructure.
- [ ] Add `test:render` script.
- [ ] Add `test:cli` script.
- [ ] Add `test:fixtures` script.
- [ ] Add stable primitive render, keyboard and aria tests.
- [ ] Add DataTable search/loading/empty/error/row/pagination/visibility tests.
- [ ] Add AsyncSelect debounce/cache/loading/error/min-search tests.
- [ ] Add Calendar selection/min/max/locale tests.
- [ ] Add Upload rejection/drag/drop tests.
- [ ] Add FormBuilder render/type tests.
- [ ] Add Overlay/Command/Navigation tests.
- [ ] Add Browser/Next/Vite built-package fixture tests.
- [ ] Add public API snapshot test.

## Still open non-test backlog

- [ ] Add a package tarball smoke script that runs `npm pack`, installs the tarball into a temp app, imports at least one primitive and one complex component, and runs TypeScript.
- [ ] Publish a patch release candidate after local release gate passes.
- [ ] Install the patch candidate into the separate `azamat-ui` docs app without the `next.config.ts` CJS alias workaround.
- [ ] Add a tiny Next.js fixture or script that imports `azamat-ui-kit` from `dist/index.js` in a browser bundle and fails on runtime console errors.
- [ ] Add a Vite fixture or script that imports `Button`, `Dialog`, `AsyncSelect`, `DataTable`, `ToastProvider` and `FormBuilder` from built `dist`.
- [ ] Add stale response guard so slower `loadOptions` calls cannot overwrite newer AsyncSelect search results.
- [ ] Add optional AsyncSelect abort/cancellation support.
- [ ] Add disabled option reason rendering for AsyncSelect.
- [ ] Add keyboard removal support for AsyncMultiSelect selected tags.
- [ ] Decide if `onCreateOption` belongs in stable AsyncSelect API or should remain preview.
- [ ] Convert non-semantic `zinc`, `slate`, `neutral`, `stone`, `white`, `black` component classes to token-based classes where they appear in package components.
- [ ] Add a lint-like script that reports hardcoded neutral palette usage in `src/components`.
- [ ] Validate `registry.json` recommended list does not include preview or experimental components unless intentionally marked.
- [ ] Add `exports` subpaths only if root exports become too large for docs/tree-shaking.
- [ ] Update AsyncSelect example after stale request handling is implemented.
- [ ] Add FormBuilder example after custom field and `FieldPath` type tests pass.
- [ ] Decide next version number after this pass: likely `0.1.2`.
- [ ] Run `npm run release:gate` from a clean working tree.
- [ ] Run manual Vite tarball smoke from `RELEASE.md`.
- [ ] Run manual Next tarball smoke from `RELEASE.md`.
- [ ] Publish only after the separate `azamat-ui` docs app works without CJS alias workaround.

## Supervisor checklist

- [x] Build/runtime tasks handled first.
- [x] Registry, CLI, theme, documentation and release handoff updated after build work.
- [x] Package version and changelog impact recorded.
- [x] Non-test component hardening and expansion started.
- [ ] Final release smoke still requires a real local or CI environment with dependencies installed.
