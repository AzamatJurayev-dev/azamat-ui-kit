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

## Supervisor checklist

- [x] Build/runtime tasks handled first.
- [x] Registry, CLI, theme, documentation and release handoff updated after build work.
- [x] Package version and changelog impact recorded.
- [ ] Final release smoke still requires a real local or CI environment with dependencies installed.
