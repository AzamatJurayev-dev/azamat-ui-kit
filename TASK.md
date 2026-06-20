# Azamat UI Kit Library Readiness Tasks

Status: library-first export cleanup is in progress on `master`. Build and current test gate pass locally, but release smoke and consumer-fixture verification are still open.

See also:

- `COMPONENT_MATURITY.md` for current public maturity rubric
- `SURFACE_AUDIT_AND_FIX_ORDER.md` for the expanded surface audit and next fix order
- `PUBLIC_API_INVENTORY.md` for the current canonical-vs-internal export map

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
- [x] Added base UI primitives: `Skeleton`, `SkeletonText`, `SkeletonCard`, `Divider`, `SegmentedControl`, `Spinner`, `LoadingOverlay`, `Tooltip`.
- [x] Added interactive `Rating` input.
- [x] Added Ant-like data display components: `List`, `ListRow`, `Descriptions`.
- [x] Added reusable dashboard layout components: `Section`, `Toolbar`, `SplitLayout`.
- [x] Exported charts and collapse from package root.
- [x] Exported `Alert` from feedback index.
- [x] Exported statistics, list, and descriptions from display index.
- [x] Exported rating from inputs index.
- [x] Exported new layout components from layout index.

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

## Still open test backlog

- [ ] Replace string-based `scripts/a11y-smoke.mjs` with render-based tests.
- [x] Add Vitest + Testing Library or other render-test infrastructure.
- [x] Add `test:render` script.
- [ ] Add `test:cli` script.
- [x] Add `test:fixtures` script.
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

- [x] Remove duplicate direct root exports that already come via grouped indexes, starting with `form-date-picker` and `form-date-range-picker`.
- [x] Decide final root-export policy for `SmartCard` vs `InfoCard`; keep only one canonical public name.
- [x] Move `SmartFormShell` and `WorkspaceShell` off the root public surface; keep them on subpath/advanced usage only.
- [x] Split docs-facing pattern surface from internal system helpers: `ActionSystem`, `StatusSystem`, `FilterBuilder`, `DataView`, `EntityDetails`, `ResourceSystem`, `CrudSystem`, `SettingsSection`.
- [x] Split charts into core public charts and dashboard extras: `KpiCard`, `KpiGrid`, `ProgressRing`, `HorizontalBarChart`.
- [x] Add docs-group metadata so one public route can represent many related member components.
- [x] Move `FloatingActionButton`, `ActionBar`, `TableExportMenu`, and `TableImportButton` to advanced/internal subpath surface instead of root.
- [x] Sync README public component list with `PUBLIC_API_INVENTORY.md`.
- [x] Consolidate text-like RHF wrappers behind a universal `FormInput kind=...` entry while keeping old wrapper names as compatibility aliases.
- [x] Add a package tarball smoke script that runs `npm pack`, installs the tarball into a temp app, imports at least one primitive and one complex component, and runs TypeScript.
- [x] Publish a patch release candidate after local release gate passes.
- [x] Install the patch candidate into the separate `azamat-ui` docs app without the `next.config.ts` CJS alias workaround.
- [x] Add a tiny Next.js fixture or script that imports `azamat-ui-kit` from `dist/index.js` in a browser bundle and fails on runtime console errors.
- [x] Add a Vite fixture or script that imports `Button`, `Dialog`, `AsyncSelect`, `DataTable`, `ToastProvider` and `FormBuilder` from built `dist`.
- [x] Extend `scripts/check-build-output.mjs` to catch indirect Rolldown/CJS fallback code that can call external `require` in ESM browser bundles.
- [ ] Confirm whether `@fontsource-variable/geist` should remain a runtime dependency; if not needed by components, move it out of package dependencies.

### P0. Test infrastructure upgrade

- [ ] Replace the current string-based `scripts/a11y-smoke.mjs` with render-based tests using a real DOM test environment.
- [x] Add a test runner decision: Vitest + Testing Library is the likely fit for React component render tests.
- [x] Add `test:render` script for component render/interaction tests.
- [ ] Add `test:cli` script for CLI temp-project tests.
- [x] Add `test:fixtures` script for built-package consumer tests.
- [ ] Update `test:run` to include render tests once the first stable set exists.
- [ ] Keep the old string smoke temporarily under a different name only if it still catches useful regressions.
- [ ] Add CI-friendly temp directory cleanup for CLI and fixture tests.

### P0. Stable primitive render tests

- [ ] `Button`: renders variants/sizes, forwards native button props, respects disabled, preserves `type`, supports icon-only accessible labels.
- [ ] `Input`: renders invalid, disabled, readOnly, placeholder, file input classes and forwards refs/props.
- [ ] `Textarea`: renders invalid, disabled, readOnly, rows and className merge.
- [ ] `Checkbox`: renders checked/unchecked/disabled and exposes accessible label usage.
- [ ] `Switch`: renders checked/unchecked/disabled and keyboard toggling.
- [ ] `Badge`: renders variants and icon children without layout breakage.
- [ ] `Card`: renders header/title/description/content/footer/action composition.
- [ ] `Tabs`: renders default tab, controlled tab, keyboard navigation and disabled trigger behavior.

### P0. DataTable hardening

- [ ] Remove the `search as Record<string, unknown>` workaround and type `DataTableSearchConfig` directly through `SearchInput` props.
- [ ] Remove `onValueChange as any` from `DataTable`.
- [ ] Add tests for search rendering and `onValueChange`.
- [ ] Add tests for loading skeleton, loading state variant, empty state and error state.
- [ ] Add tests for row click, row double click and disabled row behavior.
- [ ] Add tests for row selection and bulk action clear behavior.
- [ ] Add tests for manual pagination callback behavior.
- [ ] Add tests for column visibility menu rendering when hideable columns exist.
- [ ] Document 1-based vs 0-based pagination behavior in the DataTable README/docs handoff.
- [ ] Audit whether `features` defaults are intuitive; decide if search/visibility/actions should be opt-in or inferred from supplied props.

### P1. AsyncSelect and AsyncMultiSelect hardening

These tasks are intentionally split into smaller chunks so separate chats can work without rewriting the same large component payload.

#### AsyncSelect core behavior

- [x] Add a stale response guard so slower `loadOptions` calls cannot overwrite newer search results.
- [x] Add optional abort/cancellation support for `loadOptions` so in-flight requests can be ignored or canceled.
- [x] Add tests for debounce behavior and stale result protection.
- [ ] Add tests for loading, empty, error and min-search states.
- [x] Add tests for `cacheOptions` and `cacheTtl`.
- [x] Add tests for `loadSelectedOption` and selected option hydration.

#### AsyncSelect option semantics

- [x] Add tests for disabled option behavior.
- [x] Decide whether `disabledReason` belongs in core API or in a renderer-only pattern.
- [x] If `disabledReason` stays, render it consistently in option and trigger states.
- [ ] Add tests for option grouping, labels and selected value rendering.
- [ ] Decide if `onCreateOption` belongs in stable API or should remain preview.

#### AsyncMultiSelect interaction

- [x] Add keyboard removal support for selected tags.
- [x] Add tests for tag removal by keyboard and mouse.
- [ ] Add tests for max selected state.
- [ ] Add tests for `closeOnSelect` and `showSelectAll`.
- [x] Add tests for `loadSelectedOptions` hydration and tag rehydration.

#### Async select documentation

- [ ] Add a focused README/example block for `AsyncSelect` covering search, load, cache and selected option hydration.
- [ ] Add a focused README/example block for `AsyncMultiSelect` covering max selected, tags and keyboard removal.
- [ ] Add a troubleshooting note for stale request race conditions and slow network ordering.
- [ ] Add a troubleshooting note for disabled options and create-option UX.

### P1. Calendar and date picker hardening

- [x] Add keyboard navigation for date grid: arrow keys, Home/End and PageUp/PageDown.
- [x] Add roving tab index or equivalent focus management for date buttons.
- [x] Add disabled date reason API or remove the task if it is intentionally out of scope.
- [x] Prevent invalid range selection when min/max/disabled dates conflict with a range.
- [ ] Add tests for single date selection.
- [ ] Add tests for range start/end/reset behavior.
- [ ] Add tests for min/max disabled dates.
- [ ] Add tests for `weekStartsOn` and `locale` output.
- [x] Document date value format as `YYYY-MM-DD` and state timezone limitations clearly.

### P1. Upload hardening

- [ ] Add tests for max files rejection.
- [ ] Add tests for max size rejection.
- [ ] Add tests for accept/type rejection.
- [ ] Add tests for append vs replace behavior.
- [ ] Add tests for drag enter/leave/drop behavior.
- [x] Add keyboard accessible fallback for opening the file dialog from the dropzone.
- [x] Ensure disabled/loading prevents drag/drop and file dialog interactions.
- [x] Verify `ImageUpload` revokes object URLs when files change, preview is disabled and component unmounts.
- [x] Allow custom rejection messages or labels for localization.

### P1. FormBuilder and form wrappers

- [ ] Add type tests that `FormBuilder` fields enforce valid `FieldPath<TFieldValues>` names.
- [ ] Add render tests for input, textarea, select, async-select, switch, number, phone, date and date-range field types.
- [ ] Add tests for hidden sections and hidden fields.
- [ ] Add tests for submit/reset footer behavior.
- [ ] Add tests for disabled/readOnly propagation.
- [ ] Add custom field render tests and docs examples.
- [ ] Decide whether `FormBuilder` should remain `experimental` until render/type tests are complete.
- [ ] Audit form wrappers for consistent description/error/aria-describedby linking.

### P1. Overlay and command hardening

- [ ] Add Dialog tests for title, description, close button, controlled open and focus return.
- [ ] Add Popover tests for trigger/content, controlled open and disabled trigger.
- [ ] Add DropdownMenu tests for disabled item, destructive item, checkbox/radio item and submenu.
- [ ] Add Select tests for placeholder, controlled value, disabled options and groups.
- [ ] Add CommandPalette tests for open/close, keyboard shortcut, search filtering, disabled item reason and empty state.
- [ ] Decide whether low-level command primitives should be exported or only `CommandPalette`.

### P1. Router-agnostic navigation and layout

- [ ] Add tests for `Breadcrumbs`, `SidebarNav`, `AppSidebar` and `QuickActionGrid` custom `renderLink`.
- [ ] Add tests that external links use `window.open` only in click handlers, never during render.
- [ ] Add tests for mobile sidebar open/close labels in `AppShell`.
- [ ] Add tests for pagination edge cases: `pageCount=0`, `pageCount=1`, first page, last page and disabled controls.
- [ ] Add tests for `PageTabs` and `StepperTabs` aria/current state.

### P2. Theme and hardcoded color audit

- [x] Produce an explicit list of allowed semantic hardcoded colors for status/tone components: emerald, amber, red, blue.
- [x] AsyncSelect stale guard / abort / disabled reason / multi-tag keyboard remove: intentionally left for manual implementation.
- [ ] Convert non-semantic `zinc`, `slate`, `neutral`, `stone`, `white`, `black` component classes to token-based classes where they appear in package components.
- [ ] Add a lint-like script that reports hardcoded neutral palette usage in `src/components`.
- [x] Validate `registry.json` recommended list does not include preview or experimental components unless intentionally marked.
- [x] Add `exports` subpaths only if root exports become too large for docs/tree-shaking.
- [ ] Add FormBuilder example after custom field and `FieldPath` type tests pass.
- [ ] Decide next version number after this pass: likely `0.1.2`.
- [ ] Run `npm run release:gate` from a clean working tree.
- [x] Run Vite tarball smoke via automated `test:fixtures`.
- [x] Run Next tarball smoke via automated `test:fixtures`.
- [ ] Publish only after the separate `azamat-ui` docs app works without CJS alias workaround.

### P2. Public API governance

- [x] Keep `PUBLIC_API_INVENTORY.md` in sync whenever root exports change.
- [x] Mark every root export as `canonical`, `transitional`, or `advanced/internal`.
- [x] Prevent registry naming from drifting away from root export naming.
- [x] Add a root-export smoke or snapshot check so accidental public API growth is caught early.
- [x] Define which surfaces are docs-catalog entries versus package-only advanced exports.

## AsyncSelect work-pack split guide

Use this when assigning work to another chat:

- [x] Chat A: `AsyncSelect` stale guard, abort support and debounce tests.
- [ ] Chat B: `AsyncSelect` disabled reason, grouped options and create-option policy.
- [x] Chat C: `AsyncMultiSelect` keyboard tag removal and max-selected behavior.
- [ ] Chat D: `AsyncSelect` and `AsyncMultiSelect` docs/examples.
- [x] Chat E: `AsyncSelect`/`AsyncMultiSelect` render tests and consumer fixture coverage.

## Supervisor checklist

- [x] Build/runtime tasks handled first.
- [x] Registry, CLI, theme, documentation and release handoff updated after build work.
- [x] Package version and changelog impact recorded.
- [x] Non-test component hardening and expansion started.
- [x] Root public surface reduced to canonical/docs-facing exports; advanced helpers moved to subpaths.
- [ ] Final release smoke still requires a real local or CI environment with dependencies installed.
