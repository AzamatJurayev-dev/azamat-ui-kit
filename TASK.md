# Azamat UI Kit Master Roadmap

Bu fayl `azamat-ui-kit` uchun yagona aktiv roadmap. Asosiy qoida:

- avval `azamat-ui-kit` componentlarning o'zi production darajaga olib chiqiladi
- keyin `azamat-ui` docs/public site polish qilinadi
- docs hech qachon library core sifatidan oldinga o'tmaydi

Current status:

- Package version: `0.3.13`
- CLI package version: `0.3.13`
- Main adoption model: `source-copy first`
- Latest published packages:
  - `azamat-ui-kit@0.3.13`
  - `azamat-ui-kit-cli@0.3.13`
- Current product direction:
  - dashboard/admin reusable system
  - forms + data table + filters + sidebar
  - internal tools / SaaS backoffice UI

## P0 - Release Safety And Publish Discipline

- [x] Keep root package, CLI package, registry and CLI runtime versions synced.
- [x] Keep `PUBLIC_COMPONENT_API.md` in sync before publish.
- [x] Keep `PUBLIC_API_INVENTORY.md` aligned with root exports.
- [x] Run `npm run release:gate` before publish.
- [x] Publish `azamat-ui-kit` and `azamat-ui-kit-cli` only after build/test gate passes.
- [ ] Investigate and remove flaky render tests from release publish flow, especially `form-builder` path.
- [ ] Decide whether `prepublishOnly` should stay full-gate or use a lighter stable gate.
- [ ] Add a dedicated publish checklist for package + CLI + docs app version sync.

## P0 - Core Primitive Polish

### Button

- [x] Refine `Button` visual contract for all variants.
- [x] Improve loading state placement and spinner alignment.
- [x] Improve icon spacing for left/right/icon-only cases.
- [x] Add stronger disabled/read-only visual consistency.
- [ ] Decide whether split button belongs in core or actions family.
- [ ] Review destructive, warning and link variants for shipped default contrast.
- [ ] Add button interaction regression tests for hover/focus/loading/disabled combinations where meaningful.

### Input

- [ ] Keep `Input` as the one canonical text-entry surface.
- [ ] Refine prefix/suffix/decorator contract.
- [ ] Refine clear button behavior and spacing.
- [ ] Add character count / helper / validation message strategy.
- [x] Improve read-only and disabled defaults.
- [ ] Review formatter boundaries between `Input` and specialized fields.
- [ ] Keep search, money, phone, masked and quantity variants subordinate to `Input`.

### Select

- [ ] Keep `Select` as canonical choice surface.
- [ ] Refine `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox` boundaries.
- [x] Improve grouped, loading, empty and error states.
- [ ] Improve keyboard flow and focus clarity.
- [ ] Decide whether creatable mode belongs in `Combobox` or `Select`.
- [ ] Review remote-data and cache behavior for async variants.

### Dialog

- [x] Refine `Dialog` size presets and content spacing.
- [ ] Improve footer actions and async-confirm state patterns.
- [ ] Add dirty-form close guard guidance/preset.
- [ ] Review `ConfirmDialog`, `ModalShell`, `SheetShell`, `Drawer` layering and boundaries.

### Tabs

- [x] Refine active state clarity and spacing rhythm.
- [ ] Separate local-content tabs vs route-level tabs more clearly.
- [ ] Review `Tabs`, `PageTabs`, `StepperTabs`, segmented/tab-like overlaps.
- [ ] Add overflow and dense-layout guidance.

## P0 - Supporting Primitive Polish

- [ ] Refine `Textarea` autosize, count and resize behavior.
- [ ] Refine `Checkbox` card-style and label-alignment patterns.
- [ ] Refine `RadioGroup` option-card and dense form patterns.
- [ ] Refine `Tooltip` delay, contrast and interactive helper usage.
- [ ] Refine `Badge` visual hierarchy and intended metadata usage.
- [ ] Refine `Card` shipped default density, contrast and nested-card avoidance patterns.
- [ ] Refine `Popover`, `DropdownMenu`, `HoverCard`, `RightClickMenu` so overlay family feels consistent.
- [ ] Review `Kbd`, `ScrollBox`, `Collapse` defaults and docs positioning.

## P0 - Sidebar And Navigation System

- [x] Promote `AppSidebar` as a primary reusable surface.
- [x] Keep `Breadcrumbs` as its own component surface.
- [ ] Keep `AppShell`, `PageHeader`, `PageContainer`, `FormBuilder` secondary to reusable component catalog.
- [ ] Strengthen `AppSidebar` for production:
  - [ ] nested groups
  - [ ] section labels
  - [ ] collapse rail behavior
  - [ ] footer account area
  - [ ] secondary actions
  - [ ] tooltip-on-collapsed behavior
- [ ] Strengthen `SidebarNav`:
  - [ ] nested items
  - [ ] section grouping
  - [ ] active/expanded state contract
  - [ ] better router integration patterns
- [ ] Strengthen `Breadcrumbs`:
  - [ ] collapsed overflow
  - [ ] max items
  - [ ] icon support
  - [ ] clearer current item contract
- [ ] Decide whether `EntityHeader` should replace many current `PageHeader` use-cases.
- [ ] Review navigation family boundaries:
  - [ ] `Pagination`
  - [ ] `PageTabs`
  - [ ] `StepperTabs`
  - [ ] `AnchorNav`

## P0 - Data Table System

- [ ] Promote `DataTable` to enterprise-ready reusable surface.
- [ ] Improve column visibility, toolbar, bulk actions and row actions consistency.
- [ ] Add density modes.
- [ ] Add row expansion strategy.
- [ ] Add pinned/sticky column strategy if kept in scope.
- [ ] Add inline filters or saved-filter story if product direction requires it.
- [ ] Improve mobile fallback guidance and reusable fallback pattern.
- [ ] Review whether export/import helpers belong in core public API or secondary system layer.

## P0 - Form System

- [ ] Keep `FormFieldShell` as the canonical field wrapper surface.
- [ ] Refine label / description / error / required marker contract.
- [ ] Refine validation summary and error-state consistency.
- [ ] Keep `FormInput` as canonical RHF input wrapper.
- [ ] Keep `FormSelect` as canonical RHF select wrapper.
- [ ] Review wrapper duplication and continue collapsing alias-heavy surfaces where practical.
- [ ] Review `FormBuilder` scope:
  - [ ] experimental helper only
  - [ ] or stable public product
- [ ] Improve real-world reusable form presets for dense admin forms.

## P0 - Calendar, Date And Upload

- [ ] Refine `DatePicker` shipped defaults.
- [ ] Refine `DateRangePicker` presets, compare mode and 2-month presentation.
- [ ] Review whether time support should be part of current family or separate.
- [ ] Improve `DateInput` / `DateRangeInput` relation to picker surfaces.
- [ ] Refine `FileUpload` and `ImageUpload` progress, retry and rejection states.
- [ ] Add clearer file constraints and validation feedback.
- [ ] Decide whether crop/avatar flow belongs in upload family.

## P0 - API Governance And Cleanup

- [x] Keep `Input` as the canonical input entry.
- [x] Keep `FormInput` as the canonical RHF input wrapper.
- [x] Keep `Select` / `FormSelect` as the canonical select entries.
- [ ] Keep `InfoCard` as the public display-card name; do not leak implementation-first names.
- [ ] Keep route-level patterns out of first-line public API recommendations unless reviewed.
- [ ] Continue reducing alias-heavy public names when one canonical surface is enough.
- [ ] Review all current exports and classify each one:
  - [ ] canonical public component
  - [ ] related variant/helper
  - [ ] layout pattern
  - [ ] advanced system helper
  - [ ] migration alias

## P0 - Styling And Visual Consistency

- [x] Convert remaining hardcoded neutral palette usage to token-driven styles where practical.
- [x] Keep neutral-palette audit script in place.
- [ ] Limit non-token palettes to semantic success/warning/danger/info use.
- [ ] Make shipped defaults look production-worthy immediately after install.
- [ ] Remove surfaces that feel unstyled, flat or visually broken out-of-the-box.
- [ ] Review dark-mode parity across all core components.
- [ ] Review spacing rhythm, border strength, shadow strength and focus ring consistency across the library.

## P0 - Testing And Coverage

- [x] Primitive render coverage exists.
- [x] DataTable render coverage exists.
- [x] Async select coverage exists.
- [x] Calendar/upload coverage exists.
- [x] Overlay/navigation interaction coverage exists.
- [x] Public API snapshot coverage exists.
- [ ] Add stronger visual-behavior tests for newly promoted core surfaces:
  - [ ] `AppSidebar`
  - [ ] `Breadcrumbs`
  - [ ] strengthened `Button`
  - [ ] strengthened `Input`
  - [ ] strengthened `Select`
- [ ] Add flaky-test audit and stabilization pass.

## P1 - New Reusable Components To Add

### High-value additions

- [ ] `Accordion` or stronger `Disclosure`
- [ ] `InlineEditable`
- [ ] `EntityHeader`
- [ ] `RepeaterField` / `FieldArrayBuilder`
- [ ] `EmptySearchState`
- [ ] `DataList` / `KeyValueCard`
- [ ] `NotificationCenter`
- [ ] `MultiStepForm` preset on top of `Wizard`

### Display additions

- [ ] `TrendCard`
- [ ] `ComparisonCard`
- [ ] `DeltaBadge`
- [ ] `ActivityTimelineItem`

### Skeleton additions

- [ ] `SkeletonTable`
- [ ] `SkeletonForm`
- [ ] `SkeletonSidebar`

### Command / search additions

- [ ] `CommandBar`
- [ ] `GlobalSearchResults`
- [ ] `SavedFilterSelect`
- [ ] `DateFilterPreset`
- [ ] `FilterChipGroup`

## P1 - Existing Families To Enrich

- [ ] `Upload` family still needs deeper retry/progress/constraint support.
- [ ] `Display` family still needs tighter KPI/comparison building blocks.
- [ ] `Overlay` family still needs stronger mobile-first drawer/sheet patterns.
- [ ] `Actions` family still needs split/confirm/secondary action patterns.
- [ ] `Command` family still needs richer command/search surfaces.

## P1 - CLI And Source Copy

- [ ] Add `doctor` command for stale copied files, missing dependencies and config issues.
- [ ] Add `diff` command to compare copied local files with package source.
- [ ] Add `upgrade` command for safe re-copy of selected components.
- [ ] Add cleanup for temp directories in CLI and fixture smoke scripts.
- [ ] Make copied source metadata clearer when components become stale against published package source.

## P1 - Documentation Inside Library Repo

- [ ] Keep README short and current with source-copy-first model.
- [ ] Keep installation guidance aligned with current CLI behavior.
- [ ] Keep canonical API docs generated and synced.
- [ ] Document which exports are canonical vs secondary vs migration alias.
- [ ] Add maintainers-only notes for component maturity and public API boundaries.

## P2 - Advanced / Later Additions

- [ ] `RichTextEditor`
- [ ] richer advanced filter-builder ecosystem
- [ ] better address/location autocomplete story
- [ ] stronger notification inbox/center patterns
- [ ] more domain skeletons and high-level admin presets
- [ ] evaluate whether additional chart/table/admin system presets belong in the package

## Working Order

Do not skip the order below unless there is a release blocker.

1. [ ] `Button`
2. [ ] `Input`
3. [ ] `Select`
4. [ ] `Dialog`
5. [ ] `Tabs`
6. [ ] `Sidebar` ecosystem
7. [ ] `DataTable`
8. [ ] `Form system`
9. [ ] `Date/Upload`
10. [ ] new high-value reusable components
11. [ ] advanced additions
12. [ ] after library quality is strong enough, continue `azamat-ui`

## Reminder For Every Future Session

- `azamat-ui-kit` first
- `azamat-ui` second
- first fix component quality
- then fix docs/public presentation
- do not let route-level patterns dominate the reusable component catalog
- keep `Breadcrumbs` as a component
- keep `Sidebar` as a primary reusable surface
