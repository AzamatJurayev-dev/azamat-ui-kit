# Component Rationalization Audit

Date: 2026-06-30

Goal: keep `azamat-ui-kit` as a strong, clean component library by reducing duplicate public concepts and moving variant-only components into canonical components with props.

## Principle

- Canonical component first: expose one main component for one job.
- Variants through props: if the difference is visual tone, density, layout, icon, status, or preset content, prefer props over a new component.
- Compatibility aliases stay temporarily: do not break existing users in a patch/minor release. Mark old names deprecated and route them to the canonical component.
- Registry should teach canonical usage: CLI/docs should recommend `Badge`, `Card`, `Input`, `Select`, `Dialog`, `DataTable`, not every old wrapper name as equal.

## Done In This Pass

- [x] `StatusBadge` is no longer a separate visual implementation.
- [x] `StatusBadge` now delegates to `Badge` and should be treated as a deprecated compatibility alias.
- [x] `Badge` supports `tone="muted"` so status-like badges can be expressed through Badge props.
- [x] CLI theme CSS and vendored template CSS support `[data-slot="badge"][data-tone="muted"]`.
- [x] CLI vendored `Badge` and `StatusBadge` source copies were synced.
- [x] Added `BadgeFamily` metadata so docs can group `StatusBadge` under `Badge`.
- [x] Added `OverlayFamily` metadata so `HoverCard` is classified as overlay behavior, not a data card.
- [x] `MetricCard` now delegates to the `StatCard` implementation instead of maintaining a separate card implementation.
- [x] Registry recommendations no longer promote `StatusBadge`; migration aliases now point `status-badge -> badge`, `hover-card -> popover`, and `smart-card -> info-card`.

## P0 Consolidations

- [x] Badge family: make `Badge` the only canonical badge component in docs, registry recommendations, and examples.
- [x] Badge family: keep `StatusBadge` exported only as deprecated compatibility alias until the next major cleanup.
- [ ] Badge family: update docs snippets from `<StatusBadge tone="success" />` to `<Badge tone="success" dot />`.
- [ ] Card family: make `Card` + props/subcomponents the canonical primitive.
- [ ] Card family: keep `InfoCard` as the canonical composed card preset.
- [ ] Card family: mark `SmartCard` as implementation/deprecated only and remove docs-first exposure.
- [ ] Card family: audit `MetricCard`, `StatCard`, `StatisticCard`, `EntityCard`, `FileCard` and decide which remain as presets vs props-driven `InfoCard` examples.
- [x] Hover surface family: do not present `HoverCard` as “another card”; classify it under overlay/interaction or merge its behavior into `Popover`-style primitives.
- [x] Registry: remove duplicated equal-weight entries where aliases are shown beside canonical components.
- [x] Public docs metadata: show families as one component page with variants/members inside, not as many unrelated components.

## P1 Consolidations

- [x] Overlay family: unify `Dialog`, `AlertDialog`, `ConfirmDialog`, `ModalShell`, `SheetShell`, and `Drawer` under one overlay policy.
- [ ] Overlay family: keep only genuinely different interaction primitives as public top-level docs pages.
- [ ] Input family: keep `Input` canonical and treat `AppInput`, `UniversalInput`, `FormAppInput` as migration aliases.
- [ ] Input family: decide whether `SearchInput`, `PasswordInput`, `ClearableInput`, `NumberInput`, `MoneyInput`, `PhoneInput` remain separate source-copy components or become documented `Input` presets.
- [ ] Select family: make `Select` canonical and document `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox` as members, not unrelated components.
- [ ] Layout family: audit `AppShell`, `AppHeader`, `PageHeader`, `SectionHeader`, `PageContainer`, `WorkspaceShell`; keep product-layout components out of primitive component recommendations.
- [ ] DataTable family: keep subcomponents public for source-copy power users, but docs should teach them from the `DataTable` page.

## P2 Component Quality

- [ ] Add consistent `tone`, `variant`, `size`, `density`, `interactive`, `selected`, `disabled`, and `loading` vocabulary across visual components.
- [ ] Add tests that prevent a new “same job, new component name” export without family metadata.
- [ ] Add registry validation that aliases are not promoted in `recommended.foundation`.
- [ ] Add migration notes for deprecated aliases in `PUBLIC_COMPONENT_API.md`.
- [ ] Add examples showing canonical component + props for badge, card, input, select, and overlay families.

## Current Duplicate Groups

### Badge

Canonical: `Badge`

Compatibility alias: `StatusBadge`

Reason: `StatusBadge` is only Badge + tone + dot. This should be props, not a separate visual component.

### Card

Canonical primitive: `Card`

Canonical composed preset: `InfoCard`

Current overlap: `SmartCard`, `MetricCard`, `StatCard`, `StatisticCard`, `EntityCard`, `FileCard`, `HoverCard`

Decision:

- `SmartCard` should stay deprecated and hidden from docs-first usage.
- `MetricCard` / `StatCard` / `StatisticCard` should be reviewed together. They may become one metric/stat preset API or stay as one canonical `MetricCard`.
- `HoverCard` is not a data card; it is an overlay preview surface. It should not be grouped as a Card component.

### Inputs

Canonical: `Input`

Members: `SearchInput`, `PasswordInput`, `ClearableInput`, `NumberInput`, `MoneyInput`, `PhoneInput`, `DateInput`, `DateRangeInput`, `MaskedInput`, `OtpInput`, `ColorInput`

Migration aliases: `AppInput`, `UniversalInput`, `FormAppInput`

Decision: keep source-copy components if they add behavior, but docs and naming should make them `Input` members.

### Forms

Canonical: `FormFieldShell`

Members: form wrappers around canonical inputs/selects.

Decision: wrappers should be convenience adapters, not separate design components.

### Overlays

Canonical primitives: `Dialog`, `Popover`, `DropdownMenu`

Members/presets: `AlertDialog`, `ConfirmDialog`, `ModalShell`, `SheetShell`, `Drawer`, `Tooltip`, `HoverCard`, `RightClickMenu`

Decision: classify by interaction behavior, not by visual shell name.

## Next Safe Refactor Order

1. Badge docs/registry cleanup.
2. Card family metadata cleanup and `SmartCard` docs removal.
3. Metric/stat card API decision.
4. HoverCard reclassification under overlay family.
5. Input alias registry cleanup.
6. Overlay family governance.
