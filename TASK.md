# Azamat UI Kit Library Readiness Tasks

Status: first readiness implementation pass completed on `master`.

This file is now compressed into completed work and remaining backlog. Detailed audit guidance lives in `COMPONENT_MATURITY.md`, release flow in `RELEASE.md`, and user-facing changes in `CHANGELOG.md`.

## Completed in this pass

### Package build and runtime

- [x] React peer runtime issue guarded with `scripts/check-build-output.mjs`.
- [x] `react`, `react-dom`, `react/jsx-runtime`, and `react-hook-form` are configured as external package build inputs.
- [x] Vite library build config is runtime-safe for ESM and CJS outputs.
- [x] ESM build smoke check rejects forbidden `require("react")` usage.
- [x] Package export map remains explicit for ESM, CJS, TypeScript and package metadata.
- [x] Declaration output remains tied to `dist/index.d.ts`.
- [x] `prepack` starts from a clean `dist` through `scripts/clean-dist.mjs`.
- [x] Release gate includes `npm pack --dry-run`.

### Theme and tokens

- [x] Styling ownership decision documented: consumer apps own global CSS tokens.
- [x] Theme output now includes `:root`, `.light`, and `.dark` token blocks.
- [x] Required token groups are present: background, foreground, card, popover, border, ring, muted, accent, destructive.
- [x] Theme command keeps an idempotent marked block through `upsertThemeCss`.
- [x] Minimal consumer setup is covered in README and release docs.

### Registry and CLI

- [x] `registry.json` version is aligned with `package.json`.
- [x] Registry manifest now includes the missing `navigation` group for `pagination`.
- [x] CLI version is aligned with package version.
- [x] `init` supports Vite and Next defaults with `--template vite|next`.
- [x] `init` supports `--skip-install`.
- [x] CLI messages were moved toward Uzbek/English paired text for init errors/prompts.
- [x] Registry validation checks package/registry version mismatch and duplicate registry dependencies.
- [x] Add command already resolves transitive registry dependencies before writing files.

### Component API audit documentation

- [x] Public maturity rubric created in `COMPONENT_MATURITY.md`.
- [x] Public export status model defined: `stable`, `preview`, `experimental`, `internal`.
- [x] Stable primitive status documented for Button, Input, Textarea, Checkbox, Switch, Badge, Card and Tabs.
- [x] Base UI wrapper status documented for Dialog, Popover, DropdownMenu, Select and CommandPalette.
- [x] Complex family boundaries documented for actions, layout, filters, feedback, display, overlay and navigation.
- [x] Forms, inputs, calendar, upload, data-table and pattern family contracts documented.
- [x] Variant helper policy documented for helpers like `buttonVariants` and `badgeVariants`.
- [x] Component audit checklist documented: displayName, data-slot, className merge, ref, controlled state, aria, dark mode, SSR and tree-shaking.

### Tests and quality

- [x] Added clean dist helper.
- [x] Added build output smoke check.
- [x] Added registry version/dependency validation.
- [x] `test:run` includes types, a11y, registry and build-output checks.
- [x] `release:gate` includes lint, tests, build and pack dry-run.

### Documentation and release

- [x] `CHANGELOG.md` has an Unreleased section with Fixes, Changed and Docs sections.
- [x] `RELEASE.md` documents release gate, npm 2FA/token handling, manual consumer smoke, GitHub release notes and docs-app handoff.
- [x] Package files list includes README, changelog, release docs, maturity docs, registry and license.
- [x] Docs app handoff is documented for the separate `azamat-ui` repo.

## Remaining backlog

These tasks still need real code-level or render-level verification before they should be checked off.

- [ ] Full hardcoded color audit across every component file.
- [ ] Full visual dark-mode audit for primitives and complex components.
- [ ] Button `asChild` or render-prop behavior verification.
- [ ] DropdownMenu submenu behavior verification.
- [ ] Async input request race cancellation or stale response guard.
- [ ] Disabled-reason support for async options.
- [ ] Multi-select selected chip keyboard remove support.
- [ ] Calendar arrow/home/end/page keyboard navigation audit.
- [ ] Calendar disabled date reason and invalid date-range prevention.
- [ ] Upload object URL cleanup, validation errors, drag/drop keyboard fallback and preview revoke verification.
- [ ] FormBuilder custom field docs/tests and custom render type-safety work.
- [ ] DataTable `as any` workaround removal or isolation.
- [ ] Row selection, disabled rows, bulk actions and row actions render tests.
- [ ] Stable primitive render, keyboard and aria tests.
- [ ] Stable complex component render tests.
- [ ] Hook behavior tests.
- [ ] CLI temp-project tests for `init`, `theme`, `add` and `list`.
- [ ] Browser/Next consumer fixture for package ESM runtime import.
- [ ] Render-based accessibility smoke checks.
- [ ] Bundle or pack-size snapshot.
- [ ] Fresh install manual smoke before final release.

## Second pass backlog: real component hardening

The first pass made the package safer to build and easier to release. The next pass must move beyond documentation and smoke checks into actual component behavior, render tests and consumer app confidence.

### P0. Package/runtime confidence

- [ ] Publish a patch release candidate after the build-output fix and install it into the separate `azamat-ui` docs app without the `next.config.ts` CJS alias workaround.
- [ ] Add a tiny Next.js fixture or script that imports `azamat-ui-kit` from `dist/index.js` in a browser bundle and fails on runtime console errors.
- [ ] Add a Vite fixture or script that imports `Button`, `Dialog`, `AsyncSelect`, `DataTable`, `ToastProvider` and `FormBuilder` from built `dist`.
- [ ] Add a package tarball smoke script that runs `npm pack`, installs the tarball into a temp app, imports at least one primitive and one complex component, and runs TypeScript.
- [ ] Extend `scripts/check-build-output.mjs` to catch indirect Rolldown/CJS fallback code that can call external `require` in ESM browser bundles.
- [ ] Confirm whether `@fontsource-variable/geist` should remain a runtime dependency; if not needed by components, move it out of package dependencies.

### P0. Test infrastructure upgrade

- [ ] Replace the current string-based `scripts/a11y-smoke.mjs` with render-based tests using a real DOM test environment.
- [ ] Add a test runner decision: Vitest + Testing Library is the likely fit for React component render tests.
- [ ] Add `test:render` script for component render/interaction tests.
- [ ] Add `test:cli` script for CLI temp-project tests.
- [ ] Add `test:fixtures` script for built-package consumer tests.
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

- [ ] Add keyboard navigation for date grid: arrow keys, Home/End and PageUp/PageDown.
- [ ] Add roving tab index or equivalent focus management for date buttons.
- [ ] Add disabled date reason API or remove the task if it is intentionally out of scope.
- [ ] Prevent invalid range selection when min/max/disabled dates conflict with a range.
- [ ] Add tests for single date selection.
- [ ] Add tests for range start/end/reset behavior.
- [ ] Add tests for min/max disabled dates.
- [ ] Add tests for `weekStartsOn` and `locale` output.
- [ ] Document date value format as `YYYY-MM-DD` and state timezone limitations clearly.

### P1. Upload hardening

- [ ] Add tests for max files rejection.
- [ ] Add tests for max size rejection.
- [ ] Add tests for accept/type rejection.
- [ ] Add tests for append vs replace behavior.
- [ ] Add tests for drag enter/leave/drop behavior.
- [ ] Add keyboard accessible fallback for opening the file dialog from the dropzone.
- [ ] Ensure disabled/loading prevents drag/drop and file dialog interactions.
- [ ] Verify `ImageUpload` revokes object URLs when files change, preview is disabled and component unmounts.
- [ ] Allow custom rejection messages or labels for localization.

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

- [ ] Produce an explicit list of allowed semantic hardcoded colors for status/tone components: emerald, amber, red, blue.
- [ ] Convert non-semantic `zinc`, `slate`, `white`, `black` component classes to token-based classes where they appear in package components.
- [ ] Add a lint-like script that reports hardcoded neutral palette usage in `src/components`.
- [ ] Verify all stable primitives render correctly with only package theme tokens installed.
- [ ] Verify dark mode for primitives, overlays, inputs, data table, upload and notifications in a real rendered fixture.

### P2. Registry and CLI behavior tests

- [ ] Add temp-project test for `npx azamat-ui-kit init --template vite --skip-install`.
- [ ] Add temp-project test for `npx azamat-ui-kit init --template next --skip-install`.
- [ ] Add temp-project test for `theme` idempotency by running it twice and comparing output.
- [ ] Add temp-project test for `add button input --dry-run`.
- [ ] Add temp-project test for `add data-table --skip-install` and verify transitive registry files are listed/written.
- [ ] Add temp-project test for invalid component name output and exit behavior.
- [ ] Validate `registry.json` recommended list does not include `preview` or `experimental` components unless intentionally marked.
- [ ] Add registry metadata for component status so docs/CLI can show `stable`, `preview`, `experimental`.

### P2. Public API and export cleanup

- [ ] Compare `src/index.ts` exports with `COMPONENT_MATURITY.md` and mark mismatches.
- [ ] Decide whether `ThemeProvider` should be exported from package root; it currently exists in source but is not exported.
- [ ] Decide whether `input-group` and low-level command primitives should be public or internal.
- [ ] Add `exports` subpaths only if root exports become too large for docs/tree-shaking.
- [ ] Add a public API snapshot test for exported names.
- [ ] Add a changelog rule for every public API addition/removal.

### P2. Documentation after behavior tests

- [ ] Update README examples after render tests confirm real APIs.
- [ ] Add a “Component status” section linking stable/preview/experimental exports.
- [ ] Add troubleshooting for missing theme tokens, ESM import issues, peer dependency mismatch and React Hook Form setup.
- [ ] Add DataTable server-side example only after manual pagination/sorting behavior is tested.
- [ ] Add AsyncSelect example only after stale request handling is implemented.
- [ ] Add FormBuilder example only after custom field and `FieldPath` type tests pass.
- [ ] Add Upload example showing accepted/rejected files and image preview cleanup behavior.

### P3. Release readiness

- [ ] Decide next version number after second pass: likely `0.1.2` for runtime/test hardening without breaking API.
- [ ] Run `npm run release:gate` from clean working tree.
- [ ] Run manual Vite tarball smoke from `RELEASE.md`.
- [ ] Run manual Next tarball smoke from `RELEASE.md`.
- [ ] Publish only after the separate `azamat-ui` docs app works without CJS alias workaround.
- [ ] After publish, update `CHANGELOG.md` from `Unreleased` to the real version/date.
- [ ] After publish, update docs app package version and remove local workaround.

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
- [ ] Final release smoke still requires a real local or CI environment with dependencies installed.
- [ ] Second pass should start with test infrastructure and DataTable/AsyncSelect hardening before broad component polish.
