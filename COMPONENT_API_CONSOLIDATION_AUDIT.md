# Azamat UI Kit Component API Consolidation Audit

Date: 2026-06-25

Goal: reduce duplicated component names, make the public API easier to learn, and keep source-copy/CLI usage predictable.

## Core Problem

The library currently exposes too many separate names for components that solve the same product problem. This makes the kit harder to document, harder to browse, and harder to use through `npx azamat-ui-kit add ...`.

The biggest issue is not only implementation duplication. The real issue is that public exports, registry entries, family metadata, and documentation strategy are not aligned.

Current example:

- `Input` exists as the primitive.
- `AppInput` exists as a universal input wrapper.
- `SearchInput`, `PasswordInput`, `NumberInput`, `PhoneInput`, `MoneyInput`, `DateInput`, `ClearableInput` are all separate public components.
- `FormInput` exists as the preferred form wrapper.
- `FormAppInput`, `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput` also exist.

This creates the exact confusion we want to remove.

## Final API Rule

Public documentation should show one component per product concept.

Aliases and specialized components can remain temporarily for compatibility, but they should not lead the public API, docs, recommended registry list, or showcase.

Recommended rule:

- `Input` is the canonical public component.
- `FormInput` is the canonical React Hook Form wrapper.
- `Select` is the canonical public selection component.
- `FormSelect` is the canonical form wrapper.
- `Card` is the canonical container and preset entry point.
- `Dialog` is the canonical overlay primitive.
- `DataTable` is the canonical table entry point.

## High-Priority Findings

### 1. Input API Is Split Between `Input` and `AppInput`

Current state:

- `src/components/ui/input.tsx` exports `Input`.
- `src/components/inputs/app-input.tsx` exports `AppInput` and `UniversalInput`.
- `src/components/inputs/index.ts` exports `app-input`.
- `src/components/form/public.ts` exports `form-app-input`.
- `cli/registry.ts` contains `app-input` and `form-app-input`.
- `registry.json` lists `app-input` and `form-app-input` in groups.

Problem:

`AppInput` should not exist as a public mental model. Users should not have to choose between `Input` and `AppInput`.

Decision:

Make `Input` the universal component and move the low-level primitive role to an internal `InputPrimitive` or `BaseInput`.

Target public usage:

```tsx
<Input placeholder="Name" />
<Input kind="search" placeholder="Search..." />
<Input kind="password" />
<Input kind="number" onNumberChange={setAmount} />
<Input kind="phone" />
<Input kind="money" currency="USD" />
<Input kind="date" />
<Input kind="date-range" />
```

Migration:

- Keep `AppInput` as a deprecated alias for one minor version.
- Keep `UniversalInput` only as deprecated alias or remove it from public docs immediately.
- Do not include `AppInput` in docs navigation, recommended registry, or examples.
- Update `app-input` registry entry to either become an alias package or remove from recommended groups.

### 2. `FormInput` and `FormAppInput` Duplicate the Same Role

Current state:

- `FormInput` is already universal-ish.
- `FormAppInput` wraps `AppInput`.
- Several wrappers are transitional aliases.

Problem:

Two universal form inputs create duplicated implementation paths and inconsistent props:

- `FormInput` uses `kind`.
- `FormAppInput` uses `kind`.
- Their supported kinds do not fully match.
- `FormAppInputPhoneValueMode` and `FormInputPhoneInputValueMode` describe similar ideas with different names.

Decision:

Only `FormInput` should be canonical.

Target public usage:

```tsx
<FormInput control={form.control} name="email" label="Email" />
<FormInput control={form.control} name="query" kind="search" />
<FormInput control={form.control} name="password" kind="password" />
<FormInput control={form.control} name="price" kind="money" />
<FormInput control={form.control} name="phone" kind="phone" valueMode="raw" />
```

Migration:

- `FormAppInput` becomes deprecated alias.
- `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput` become deprecated aliases.
- Form wrappers should be hidden from public component list except `FormInput`, `FormTextarea`, `FormSelect`, `FormSwitch`, `FormDatePicker`, `FormDateRangePicker`.

### 3. Input Presets Should Become `Input` Variants

Current public names that should stop leading docs:

- `ClearableInput`
- `SearchInput`
- `PasswordInput`
- `NumberInput`
- `MaskedInput`
- `PhoneInput`
- `MoneyInput`
- `QuantityInput`
- `DateInput`
- `DateRangeInput`

Problem:

These names are useful internally, but public users see too many “components” for one concept: entering data into a field.

Decision:

Move these into `Input` detail docs as variants, not separate top-level docs pages.

Recommended canonical mapping:

| Old public name | New public usage |
| --- | --- |
| `SearchInput` | `<Input kind="search" />` |
| `PasswordInput` | `<Input kind="password" />` |
| `NumberInput` | `<Input kind="number" />` |
| `PhoneInput` | `<Input kind="phone" />` |
| `MoneyInput` | `<Input kind="money" />` |
| `QuantityInput` | `<Input kind="quantity" />` |
| `DateInput` | `<Input kind="date" />` |
| `DateRangeInput` | `<Input kind="date-range" />` |
| `ClearableInput` | `<Input clearable />` or `<Input kind="clearable" />` |
| `MaskedInput` | `<Input kind="masked" mask={...} />` |

Special case:

- `OtpInput`, `TagInput`, `Rating`, `Slider`, `RangeSlider`, `ColorInput` are not simple text-field variants. They can remain separate components because their interaction model is different.

### 4. Select Family Has the Same Problem

Current names:

- `Select`
- `SimpleSelect`
- `AsyncSelect`
- `AsyncMultiSelect`
- `Combobox`
- `FormSelect`
- `FormAsyncSelect`

Problem:

`SimpleSelect` and `Select` overlap. `FormAsyncSelect` overlaps with `FormSelect`.

Decision:

Use `Select` as the public component and support modes through props.

Target public usage:

```tsx
<Select options={options} />
<Select searchable options={options} />
<Select mode="async" loadOptions={loadUsers} />
<Select mode="multiple" options={options} />
<Select mode="combobox" options={options} />
```

Form usage:

```tsx
<FormSelect control={form.control} name="status" options={options} />
<FormSelect control={form.control} name="userId" mode="async" loadOptions={loadUsers} />
```

Migration:

- `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox`, `FormAsyncSelect` remain as compatibility exports.
- Public docs show only `Select` and `FormSelect`.
- Registry can still install internal files as dependencies, but command docs should promote `npx azamat-ui-kit add select`.

### 5. Card Family Has Too Many Product-Specific Names

Current names:

- `Card`
- `InfoCard`
- `StatCard`
- `StatisticCard`
- `MetricCard`
- `UserCard`
- `EntityCard`
- `FileCard`
- `SmartCard`

Problem:

Several of these are presets of a card. Public docs currently risk presenting each as a separate major component, which makes the kit look noisy.

Decision:

Use `Card` as the public entry point and show presets inside the Card detail page.

Recommended mapping:

| Current name | Target |
| --- | --- |
| `Card` | canonical |
| `InfoCard` | card preset |
| `MetricCard` / `StatCard` / `StatisticCard` | consolidate into one metric/stat preset API |
| `UserCard` / `EntityCard` | consolidate into one entity preset API |
| `FileCard` | card preset |
| `SmartCard` | deprecated alias |

Needed work:

- Decide one metric card API. Keeping `MetricCard`, `StatCard`, and `StatisticCard` together is unnecessary.
- Decide one entity card API. `UserCard` should likely become a preset over `EntityCard`.
- Keep exports temporarily, but docs should show one Card page.

### 6. Overlay Components Need a Single Mental Model

Current names:

- `Dialog`
- `ModalShell`
- `ConfirmDialog`
- `AlertDialog`
- `SheetShell`
- `Drawer`
- `DialogActions`

Problem:

These are not all equal-level components. Some are primitives, some are presets, some are layout helpers.

Decision:

Docs should show `Dialog` as the main component, with variants:

- `Dialog` primitive
- `Dialog variant="confirm"` or `ConfirmDialog` preset
- `Dialog variant="alert"` or `AlertDialog` preset
- `Sheet` / `Drawer` as side-panel overlays

Recommended cleanup:

- Prefer one side-panel concept: either `Drawer` or `Sheet`, not both as top-level docs.
- `ModalShell` should be treated as internal/preset, not a headline component.
- `DialogActions` should be an internal helper or subcomponent.

### 7. DataTable Helpers Should Not Be Top-Level Components in Docs

Current names:

- `DataTable`
- `DataTablePagination`
- `DataTableToolbar`
- `DataTableColumnVisibilityMenu`
- `DataTableSelectColumn`
- `DataTableSortableHeader`
- `DataTableRowActions`
- `DataTableActionsColumn`
- `DataTableBulkActions`
- `DataTableViewPresets`
- `createDataTableSelectColumn`
- `createDataTableActionsColumn`
- `TableExportMenu`
- `TableImportButton`

Problem:

Helpers are being treated like public components. This makes docs harder to scan.

Decision:

Only `DataTable` should be a top-level component page. Helpers should be documented inside the DataTable API section.

Target public usage:

```tsx
<DataTable
  columns={columns}
  data={rows}
  search={{ placeholder: "Search..." }}
  pagination
  columnVisibility
  rowActions={...}
  bulkActions={...}
/>
```

Migration:

- Keep factory helpers exported for advanced users.
- Remove helper names from public component list.
- Keep registry install command as `npx azamat-ui-kit add data-table`.

### 8. Layout Components Need Clear Boundary

Current names:

- `AppShell`
- `WorkspaceShell`
- `AppHeader`
- `AppSidebar`
- `SidebarNav`
- `Breadcrumbs`
- `PageContainer`
- `PageHeader`
- `Section`
- `SectionHeader`
- `Stack`
- `StickyFooterBar`
- `StatCard`

Problem:

Some are app templates, some are primitives, some overlap with display/card.

Decision:

Split public docs mentally:

- `AppShell`: layout system.
- `Page`: page composition system, covering `PageHeader`, `PageContainer`, `Section`, `SectionHeader`.
- `Stack`: layout primitive.
- `StatCard` should move under Card/Metric, not layout.
- `WorkspaceShell` should be transitional or template-level.

### 9. Display Components Are Too Broad and Need Consolidation

Current names include:

- `DescriptionList`
- `Descriptions`
- `PropertyGrid`
- `MetricGrid`
- `MetricCard`
- `Statistic`
- `StatisticCard`
- `DataState`
- `ActivityFeed`
- `Timeline`
- `StatusLegend`
- `StatusDot`
- `List`
- `TreeView`
- `TagList`
- `KanbanBoard`
- `CodeBlock`
- `FileCard`
- `UserCard`
- `EntityCard`

Problem:

Several names describe similar information-display patterns.

Consolidation targets:

- `DescriptionList`, `Descriptions`, `PropertyGrid` should become one `DescriptionList` concept with layout variants.
- `MetricGrid`, `MetricCard`, `Statistic`, `StatisticCard`, `StatCard` should become one metric system.
- `UserCard`, `EntityCard`, `FileCard` should live under Card presets.
- `StatusLegend`, `StatusDot`, `StatusBadge` should have one status system.
- `DataState`, `EmptyState`, `LoadingState`, `PageState` should be aligned as state-display variants.

### 10. Feedback Components Overlap With Display State

Current names:

- `EmptyState`
- `LoadingState`
- `StatusBadge`
- `Alert`
- `PageState`
- `InlineState`
- `DataState`

Problem:

State components are split across feedback and display with inconsistent names.

Decision:

Create a single state-display model:

- `State` or `EmptyState` as canonical state surface.
- `Alert` for message banners.
- `StatusBadge` for compact status.
- `DataState`, `PageState`, `InlineState`, `LoadingState` should become variants/presets or deprecated aliases.

### 11. Actions Components Can Be Simplified

Current names:

- `ActionMenu`
- `ActionBar`
- `FloatingActionButton`
- `CopyButton`
- `CopyField`
- `ButtonGroup`
- `QuickActionGrid`

Problem:

This group mixes primitives, behavior helpers, and layout presets.

Decision:

- `Button` remains the primitive.
- `ActionMenu` remains a top-level action component.
- `CopyButton` and `CopyField` can stay as utility components but should be under Button/Actions docs, not headline components.
- `ActionBar`, `FloatingActionButton`, `QuickActionGrid` are product patterns and should not be in foundation docs.

### 12. Registry Is Not Aligned With Canonical API

Current state:

- `registry.json` still lists many aliases as grouped components.
- `cli/registry.ts` includes duplicated entries such as `app-input`, `form-app-input`, `form-search-input`, etc.
- `recommendedByMode.sourceCopy` includes better canonical entries, but groups still expose the old model.

Problem:

CLI users will install by old component names and learn the wrong API.

Decision:

Registry should have two layers:

- Installable units: can include internal files and compatibility aliases.
- Public docs units: only canonical component names.

Needed changes:

- Add metadata field such as `public: true | false`, `deprecated: true`, or `docs: "hidden"`.
- Hide alias entries from component list.
- Keep deprecated aliases installable for migration.
- `npx azamat-ui-kit add input` should install the full canonical input family needed for `Input kind=...`.

### 13. Family Metadata Exists But Is Not Strict Enough

Current state:

- `src/families/*` defines family catalog and docs groups.
- It still lists many member components as visible docs components.

Problem:

The family system documents duplicated names instead of hiding them behind canonical pages.

Decision:

Family metadata should be stricter:

- `canonical`: shown in component list.
- `variant`: shown inside canonical detail page.
- `deprecated`: hidden from list, shown only in migration notes.
- `internal`: not shown in public docs.

Recommended metadata shape:

```ts
type ComponentVisibility = "canonical" | "variant" | "deprecated" | "internal"
```

### 14. Root Export Is Too Broad

Current state:

`src/index.ts` exports every barrel, including all aliases.

Problem:

This makes the npm package look like 100+ first-class components even when many should be implementation details.

Decision:

Keep compatibility exports for now, but document a canonical export policy:

- Canonical exports are stable.
- Variant exports are supported but secondary.
- Deprecated exports have removal timeline.
- Internal implementation should not be exported from root.

Eventually:

- Add subpath exports such as `azamat-ui-kit/input`, `azamat-ui-kit/data-table`, `azamat-ui-kit/form`.
- Keep root export for canonical components only in a future major version.

## Recommended Consolidation Groups

### Canonical Top-Level Public Components

These should be the primary component list:

- `Button`
- `Input`
- `Textarea`
- `Checkbox`
- `Switch`
- `RadioGroup`
- `Select`
- `Dialog`
- `Popover`
- `DropdownMenu`
- `Tooltip`
- `Card`
- `Badge`
- `Tabs`
- `Table`
- `FormInput`
- `FormSelect`
- `FormTextarea`
- `FormSwitch`
- `FormDatePicker`
- `FormDateRangePicker`
- `DataTable`
- `Calendar`
- `DatePicker`
- `DateRangePicker`
- `FileUpload`
- `ToastProvider`
- `CommandPalette`
- `AppShell`
- `PageHeader`
- `PageContainer`
- `Section`
- `Breadcrumbs`
- `EmptyState`
- `Alert`
- `StatusBadge`
- `Avatar`
- `DescriptionList`
- `MetricCard`
- `List`
- `Timeline`
- `CodeBlock`

### Hide From Main Component List

These can remain installable/exported temporarily, but should not appear as top-level docs cards:

- `AppInput`
- `UniversalInput`
- `FormAppInput`
- `ClearableInput`
- `SearchInput`
- `PasswordInput`
- `NumberInput`
- `MaskedInput`
- `PhoneInput`
- `MoneyInput`
- `QuantityInput`
- `DateInput`
- `DateRangeInput`
- `FormSearchInput`
- `FormPasswordInput`
- `FormNumberInput`
- `FormPhoneInput`
- `FormDateInput`
- `SimpleSelect`
- `AsyncSelect`
- `AsyncMultiSelect`
- `Combobox`
- `FormAsyncSelect`
- `SmartCard`
- `StatCard`
- `StatisticCard`
- `UserCard`
- `EntityCard`
- `FileCard`
- `ModalShell`
- `SheetShell`
- `DialogActions`
- `DataTableToolbar`
- `DataTablePagination`
- `DataTableColumnVisibilityMenu`
- `DataTableSortableHeader`
- `DataTableRowActions`
- `DataTableBulkActions`
- `DataTableViewPresets`
- `TableExportMenu`
- `TableImportButton`

## Fix Order

### Phase 1: Lock The Public API Contract

- Add visibility metadata: `canonical`, `variant`, `deprecated`, `internal`.
- Update `componentDocsGroups` to show only canonical pages.
- Update docs route resolver so old names route to canonical pages.
- Update public inventory docs to state canonical names.

### Phase 2: Unify Input

- Move current primitive input to `InputPrimitive` or `BaseInput`.
- Make `Input` support `kind`.
- Add missing `kind` support: `money`, `quantity`, `masked`, `date-range`, maybe `clearable`.
- Make `AppInput` a deprecated alias to `Input`.
- Update `FormInput` to use the same `Input` implementation and kind list.
- Make `FormAppInput` a deprecated alias to `FormInput`.

### Phase 3: Unify Select

- Make canonical `Select` support simple/options mode or create a source-copy wrapper while preserving primitive subcomponents.
- Make `SimpleSelect` an alias/preset.
- Make `AsyncSelect`, `AsyncMultiSelect`, `Combobox` variants under Select docs.
- Make `FormSelect` support all modes.
- Deprecate `FormAsyncSelect`.

### Phase 4: Clean Card And Display

- Choose one metric component API.
- Choose one entity/card preset API.
- Move card presets under Card docs.
- Deprecate `SmartCard`.
- Align `DescriptionList`, `Descriptions`, and `PropertyGrid`.

### Phase 5: Clean Overlay

- Decide `Drawer` vs `Sheet` as canonical side-panel naming.
- Treat `ModalShell` and `DialogActions` as helpers.
- Keep `ConfirmDialog` and `AlertDialog` as Dialog presets, not headline docs.

### Phase 6: Clean Registry And CLI

- Make canonical commands install complete families:
  - `npx azamat-ui-kit add input`
  - `npx azamat-ui-kit add select`
  - `npx azamat-ui-kit add card`
  - `npx azamat-ui-kit add data-table`
- Hide deprecated aliases from list output.
- Keep old names installable with migration warnings.
- Sync `packages/cli/vendor` after each source change.

### Phase 7: Tests

- Add tests for canonical `Input` kinds.
- Add compatibility tests for deprecated aliases.
- Add docs metadata tests that ensure deprecated names do not appear as main docs cards.
- Add registry tests that canonical commands install required dependency files.

## Publish Strategy

Do not remove old exports in the next patch release.

Recommended release path:

- `0.3.x`: add canonical APIs, keep aliases, hide aliases from docs.
- `0.4.x`: mark deprecated aliases clearly in TypeScript JSDoc and registry metadata.
- `1.0.0`: remove deprecated public aliases only if docs and migration guide are complete.

## Immediate Next Coding Target

Start with Input because it is the biggest source of confusion and affects docs, forms, registry, and CLI.

Concrete first implementation target:

- `Input` becomes universal.
- `AppInput` becomes deprecated alias.
- `FormInput` becomes the only form input wrapper.
- `FormAppInput` becomes deprecated alias.
- Docs and registry stop presenting `AppInput` as a public component.

