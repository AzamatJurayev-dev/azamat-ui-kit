# Azamat UI Kit Master Roadmap

Bu fayl `azamat-ui-kit` uchun yagona aktiv roadmap. Asosiy qoida:

- avval `azamat-ui-kit` componentlarning o'zi production darajaga olib chiqiladi
- keyin `azamat-ui` docs/public site polish qilinadi
- docs hech qachon library core sifatidan oldinga o'tmaydi

Current status:

- Package version: `0.3.19`
- CLI package version: `0.3.19`
- Main adoption model: `source-copy first`
- Latest published packages:
  - `azamat-ui-kit@0.3.19`
  - `azamat-ui-kit-cli@0.3.19`
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
- [x] Investigate and remove flaky render tests from release publish flow, especially `form-builder` path.
- [ ] Decide whether `prepublishOnly` should stay full-gate or use a lighter stable gate.
- [ ] Add a dedicated publish checklist for package + CLI + docs app version sync.

## Component Catalog Rationalization (Master Component Inventory)

### Status legend

- [x] **KEEP** — active, stable, should stay public
- [ ] **KEEP** but needs API cleanup
- [ ] **MERGE** — redundant with another canonical component
- [ ] **DEPRECATE** — legacy alias/component; keep temporarily with `@deprecated`
- [ ] **REVIEW** — not clearly component-like, decide scope

### Foundation (src/components/ui)

- [ ] **KEEP** `button`
- [ ] **KEEP** `input`
- [ ] **KEEP** `textarea`
- [ ] **KEEP** `checkbox`
- [ ] **KEEP** `switch`
- [ ] **KEEP** `card`
- [ ] **KEEP** `badge`
- [ ] **KEEP** `tabs`
- [ ] **KEEP** `dialog`
- [ ] **KEEP** `dropdown-menu`
- [ ] **KEEP** `popover`
- [ ] **KEEP** `select`
- [ ] **KEEP** `table`
- [ ] **KEEP** `collapse`
- [ ] **KEEP** `skeleton`
- [ ] **KEEP** `divider`
- [ ] **KEEP** `segmented-control`
- [ ] **KEEP** `spinner`
- [ ] **KEEP** `tooltip`
- [ ] **KEEP** `kbd`
- [ ] **KEEP** `radio-group`
- [ ] **KEEP** `scroll-box`
- [ ] **KEEP** `right-click-menu`
- [ ] **KEEP** `tooltip` already shipped, keep token consistency

### Input and form wrappers

- [ ] **KEEP** `app-input` (candidate for **MERGE** into `Input` with `kind` + deprecation plan)
- [ ] **KEEP** `async-select`
- [ ] **KEEP** `simple-select`
- [ ] **KEEP** `combobox`
- [ ] **KEEP** `color-input`
- [ ] **KEEP** `date-input`
- [ ] **KEEP** `date-range-input`
- [ ] **KEEP** `masked-input`
- [ ] **KEEP** `money-input`
- [ ] **KEEP** `number-input`
- [ ] **KEEP** `otp-input`
- [ ] **KEEP** `password-input`
- [ ] **KEEP** `phone-input`
- [ ] **KEEP** `quantity-input`
- [ ] **KEEP** `quantity-stepper`
- [ ] **KEEP** `rating`
- [ ] **KEEP** `search-input`
- [ ] **KEEP** `slider`
- [ ] **KEEP** `tag-input`

- [ ] **KEEP** `form-input`
- [ ] **KEEP** `form-field-shell`
- [ ] **KEEP** `form-select`
- [ ] **KEEP** `form-textarea`
- [ ] **KEEP** `form-switch`
- [ ] **KEEP** `form-search-input`
- [ ] **KEEP** `form-password-input`
- [ ] **KEEP** `form-number-input`
- [ ] **KEEP** `form-phone-input`
- [ ] **KEEP** `form-app-input` (**MERGE** candidate into `FormInput` via `kind`)
- [ ] **KEEP** `form-date-input`
- [ ] **KEEP** `form-date-picker`
- [ ] **KEEP** `form-date-range-input`
- [ ] **KEEP** `form-date-range-picker`
- [ ] **KEEP** `form-async-select`
- [ ] **REVIEW** `form-field-utils` (utility, not component)
- [ ] **REVIEW** `form-actions` (internal helper)
- [ ] **REVIEW** `form-section` (layout pattern)
- [ ] **REVIEW** `smart-form-shell` (helper shell)

### Layout / navigation

- [ ] **KEEP** `app-shell`
- [ ] **KEEP** `app-header`
- [ ] **KEEP** `app-sidebar`
- [ ] **KEEP** `breadcrumbs`
- [ ] **KEEP** `page-header`
- [ ] **KEEP** `page-container`
- [ ] **KEEP** `sidebar-nav`
- [ ] **KEEP** `section`
- [ ] **KEEP** `section-header`
- [ ] **KEEP** `stack`
- [ ] **KEEP** `stat-card`
- [ ] **KEEP** `sticky-footer-bar`
- [ ] **KEEP** `workspace-shell` (REVIEW if still needed as public surface)
- [ ] **KEEP** `anchor-nav`
- [ ] **KEEP** `nav-tabs`
- [ ] **KEEP** `page-tabs`
- [ ] **KEEP** `pagination`
- [ ] **KEEP** `stepper-tabs`

### Overlay and dialogs

- [ ] **KEEP** `alert-dialog`
- [ ] **KEEP** `confirm-dialog`
- [ ] **KEEP** `dialog-actions`
- [ ] **KEEP** `drawer`
- [ ] **KEEP** `sheet-shell`
- [ ] **KEEP** `modal-shell`
- [ ] **KEEP** `hover-card`

### Data, feedback, status

- [ ] **KEEP** `data-table`
- [ ] **KEEP** `data-table-pagination`
- [ ] **KEEP** `data-table-toolbar`
- [ ] **KEEP** `data-table-column-visibility-menu`
- [ ] **KEEP** `data-table-select-column`
- [ ] **KEEP** `data-table-sortable-header`
- [ ] **KEEP** `data-table-row-actions`
- [ ] **KEEP** `data-table-actions-column`
- [ ] **KEEP** `data-table-bulk-actions`
- [ ] **KEEP** `data-table-view-presets`
- [ ] **KEEP** `table-export-menu` (decide if public; currently **REVIEW** utility)
- [ ] **KEEP** `table-import-button` (decide if public; currently **REVIEW** utility)
- [ ] **KEEP** `filter-chips` (currently in filters)
- [ ] **KEEP** `filter-bar` (currently in filters)
- [ ] **KEEP** `quick-action-grid`

### Feedback / state

- [ ] **KEEP** `alert`
- [ ] **KEEP** `empty-state`
- [ ] **KEEP** `loading-state`
- [ ] **KEEP** `page-state`
- [ ] **KEEP** `status-badge` (**MERGE** into `badge`)

### Display and cards

- [ ] **KEEP** `activity-feed`
- [ ] **KEEP** `avatar`
- [ ] **KEEP** `description-list`
- [ ] **KEEP** `descriptions`
- [ ] **KEEP** `property-grid`
- [ ] **KEEP** `kanban`
- [ ] **KEEP** `code-block`
- [ ] **KEEP** `data-state`
- [ ] **KEEP** `entity-card`
- [ ] **KEEP** `file-card`
- [ ] **KEEP** `list`
- [ ] **KEEP** `metric-card`
- [ ] **KEEP** `metric-grid`
- [ ] **KEEP** `progress`
- [ ] **KEEP** `progress-circle`
- [ ] **KEEP** `result`
- [ ] **KEEP** `statistic`
- [ ] **KEEP** `status-dot`
- [ ] **KEEP** `status-legend`
- [ ] **KEEP** `tag-list`
- [ ] **KEEP** `timeline`
- [ ] **KEEP** `tree-view`
- [ ] **KEEP** `user-card`
- [ ] **KEEP** `info-card` (**REVIEW** as public alias to `SmartCard`)
- [ ] **REVIEW** `smart-card` internals
- [ ] **REVIEW** `keyboard-shortcut` (decide token usage if truly reusable)

### Calendar / date

- [ ] **KEEP** `calendar`
- [ ] **KEEP** `date-picker`
- [ ] **KEEP** `date-range-picker`
- [ ] **KEEP** `form-date-picker`
- [ ] **KEEP** `form-date-range-picker`
- [ ] **KEEP** `date-utils`

### Upload / media

- [ ] **KEEP** `file-upload`
- [ ] **KEEP** `image-upload`
- [ ] **KEEP** `file-dropzone`

### Notifications / command

- [ ] **KEEP** `toast`
- [ ] **KEEP** `command-palette`

### Charts / wizard

- [ ] **KEEP** `charts`
- [ ] **KEEP** `kpi`
- [ ] **KEEP** `progress-ring`
- [ ] **KEEP** `horizontal-bar-chart`
- [ ] **KEEP** `stepper`
- [ ] **KEEP** `wizard`

### Patterns (high-level reusable)

- [ ] **KEEP** `resource-page`
- [ ] **KEEP** `resource-detail-page`
- [ ] **KEEP** `form-builder`
- [ ] **REVIEW** `settings-section`
- [ ] **REVIEW** `action-system`
- [ ] **REVIEW** `status-system`
- [ ] **REVIEW** `filter-builder`
- [ ] **REVIEW** `data-view`
- [ ] **REVIEW** `entity-details`
- [ ] **REVIEW** `resource-system`
- [ ] **REVIEW** `crud-system`

### Non-component / secondary exports (must classify)

- [ ] **REVIEW** `theme-provider` (provider, not base component)
- [ ] **REVIEW** `use-session-storage-state` (hook)
- [ ] **REVIEW** `use-before-unload-when-dirty` (hook)
- [ ] **REVIEW** `use-is-mobile` (hook)
- [ ] **REVIEW** `use-disclosure` (hook)
- [ ] **REVIEW** `use-debounce` (hook)
- [ ] **REVIEW** `use-data-table-view-state` (hook)
- [ ] **REVIEW** `families/*` metadata exports (docs tooling / registry governance)

### Merge / deprecation execution tasks

- [ ] 1) Merge `app-input` -> `input` with `kind` + update docs + migration warning + alias keep one minor cycle.
- [ ] 2) Merge `form-app-input` + typed variants into `form-input` with a single canonical typed `kind` prop and `FormInput` story.
- [ ] 3) Merge `status-badge` -> `badge` and remove duplicate public pattern.
- [ ] 4) Normalize `info-card`/`smart-card` public naming (single exported canonical name, one alias only).
- [ ] 5) Move `table-export-menu` and `table-import-button` behind `DataTable` helper section if not needed as top-level primitives.
- [ ] 6) Move reviewed `patterns/*` helpers from top priority public API if not genuinely reusable for install-time copy users.
- [ ] 7) Add one-page classification matrix to `PUBLIC_COMPONENT_API.md` for public vs pattern vs helper boundaries.

## P0 - Core Primitive Polish

### Button

- [x] Refine `Button` visual contract for all variants.
- [x] Improve loading state placement and spinner alignment.
- [x] Improve icon spacing for left/right/icon-only cases.
- [x] Add stronger disabled/read-only visual consistency.
- [ ] Decide whether split button belongs in core or actions family.
- [x] Review destructive, warning and link variants for shipped default contrast.
- [x] Add button interaction regression tests for hover/focus/loading/disabled combinations where meaningful.

### Input

- [x] Keep `Input` as the one canonical text-entry surface.
- [x] Refine prefix/suffix/decorator contract.
- [x] Refine clear button behavior and spacing.
- [x] Add character count / helper / validation message strategy.
- [x] Improve read-only and disabled defaults.
- [ ] Review formatter boundaries between `Input` and specialized fields.
- [x] Keep search, money, phone, masked and quantity variants subordinate to `Input`.

### Select

- [x] Keep `Select` as canonical choice surface.
- [x] Refine `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox` boundaries.
- [x] Improve grouped, loading, empty and error states.
- [x] Improve keyboard flow and focus clarity.
- [x] Decide whether creatable mode belongs in `Combobox` or `Select`.
- [x] Review remote-data and cache behavior for async variants.

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
- [x] Refine `Badge` visual hierarchy and intended metadata usage.
- [x] Refine `Card` shipped default density, contrast and nested-card avoidance patterns.
- [ ] Refine `Popover`, `DropdownMenu`, `HoverCard`, `RightClickMenu` so overlay family feels consistent.
- [ ] Review `Kbd`, `ScrollBox`, `Collapse` defaults and docs positioning.

## P0 - Sidebar And Navigation System

- [x] Promote `AppSidebar` as a primary reusable surface.
- [x] Keep `Breadcrumbs` as its own component surface.
- [ ] Keep `AppShell`, `PageHeader`, `PageContainer`, `FormBuilder` secondary to reusable component catalog.
- [ ] Strengthen `AppSidebar` for production:
  - [x] nested groups
  - [x] section labels
  - [x] collapse rail behavior
  - [x] footer account area
  - [x] secondary actions
  - [x] tooltip-on-collapsed behavior
- [ ] Strengthen `SidebarNav`:
  - [x] nested items
  - [x] section grouping
  - [x] active/expanded state contract
  - [x] better router integration patterns
- [ ] Strengthen `Breadcrumbs`:
  - [x] collapsed overflow
  - [x] max items
  - [x] icon support
  - [x] clearer current item contract
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
- [x] Keep `FormInput` as canonical RHF input wrapper.
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
  - [x] `AppSidebar`
  - [x] `Breadcrumbs`
  - [x] strengthened `Button`
  - [x] strengthened `Input`
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
