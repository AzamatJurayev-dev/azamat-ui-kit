# Public API Inventory

This file defines what should feel public, canonical and documented. It is not a full component manual.

## Contract

- Root exports should be understandable as the main product API.
- Large systems and implementation helpers may stay available through subpaths or source-copy CLI, but they should not be shown as first-level docs components.
- Compatibility aliases may remain for migration, but docs should teach one canonical name.
- Any root export change must update this file and `CHANGELOG.md`.

## Canonical Root Surface

### Base UI

`Button`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Badge`, `Card`, `Tabs`, `Dialog`, `DropdownMenu`, `Popover`, `Select`, `Table`, `Collapse`, `Skeleton`, `Divider`, `SegmentedControl`, `Spinner`, `LoadingOverlay`, `Tooltip`, `RadioGroup`, `Kbd`, `ScrollBox`, `RightClickMenu`

### Actions

`ActionMenu`, `CopyButton`, `CopyField`, `ButtonGroup`, `QuickActionGrid`

### Layout And Navigation

`AppShell`, `AppHeader`, `AppSidebar`, `PageHeader`, `StatCard`, `SidebarNav`, `Breadcrumbs`, `PageContainer`, `Section`, `Toolbar`, `SplitLayout`, `StickyFooterBar`, `Pagination`, `PageTabs`, `StepperTabs`, `AnchorNav`

### Inputs And Forms

Canonical docs entries:

- `Input`
- `FormInput`
- `FormFieldShell`
- `Select`
- `FormSelect`
- `DatePicker`
- `DateRangePicker`

Related helpers and modes:

- `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox`
- `ClearableInput`, `SearchInput`, `PasswordInput`, `NumberInput`, `DateInput`, `DateRangeInput`
- `MoneyInput`, `QuantityInput`, `QuantityStepper`, `MaskedInput`, `PhoneInput`
- `TagInput`, `Rating`, `Slider`, `RangeSlider`, `OtpInput`, `ColorInput`
- `FormAsyncSelect`, `FormTextarea`, `FormSwitch`, `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput`, `FormDateRangeInput`, `FormDatePicker`, `FormDateRangePicker`

### Feedback And Display

`EmptyState`, `LoadingState`, `Alert`, `PageState`, `InlineState`, `DescriptionList`, `Progress`, `ProgressCard`, `Result`, `Timeline`, `MetricGrid`, `InfoCard`, `ActivityFeed`, `StatusLegend`, `Avatar`, `AvatarGroup`, `DataState`, `Statistic`, `StatisticCard`, `StatisticGrid`, `List`, `ListRow`, `Descriptions`, `KanbanBoard`, `TagList`, `TreeView`, `KeyboardShortcut`, `CodeBlock`, `FileCard`, `PropertyGrid`, `EntityCard`

### Data And Overlay

`DataTable`, `DataTablePagination`, `DataTableToolbar`, `DataTableColumnVisibilityMenu`, `createDataTableSelectColumn`, `DataTableSortableHeader`, `DataTableRowActions`, `createDataTableActionsColumn`, `DataTableBulkActions`, `DataTableViewPresets`, `DialogActions`, `ModalShell`, `ConfirmDialog`, `SheetShell`, `ToastProvider`, `useToast`, `CommandPalette`, `Calendar`, `FileUpload`, `ImageUpload`, `Stepper`, `Wizard`

### Charts And Hooks

`ChartFrame`, `BarChart`, `LineChart`, `Sparkline`, `DonutChart`, `ChartLegend`, `MetricTrend`, `useSessionStorageState`, `useBeforeUnloadWhenDirty`, `useIsMobile`, `useDisclosure`, `useDebouncedCallback`, `useDebouncedValue`, `useDataTableViewState`

## Hidden From First-Level Docs

These can exist as subpath exports, source-copy files, or advanced detail sections, but should not be primary docs cards:

- `SmartCard`
- `StatusBadge`
- `HoverCard`
- `SmartFormShell`
- `WorkspaceShell`
- `ActionSystem`
- `StatusSystem`
- `FilterBuilder`
- `DataView`
- `EntityDetails`
- `ResourceSystem`
- `CrudSystem`
- `SettingsSection`
- `SettingsRow`
- `ResourcePage`
- `ResourceDetailPage`
- `FormBuilder`
- form-builder preset helpers from `form-builder-presets`
- `KpiCard`
- `KpiGrid`
- `ProgressRing`
- `HorizontalBarChart`
- `FloatingActionButton`
- `ActionBar`
- `TableExportMenu`
- `TableImportButton`

## Family Display Rule

The public site should show one clean component name first, then related variants inside the detail page:

- `Input`: input presets, numeric inputs, phone, money, quantity, masked, date input and form input wrappers.
- `Select`: native select wrapper, simple select, async select, async multi select, combobox and form select wrappers.
- `Select`: `AsyncSelect` and `AsyncMultiSelect` own remote and creatable flows; `Combobox` stays the local search-first branch.
- `FormFieldShell`: field shell, textarea/switch wrappers, date-picker wrappers and related form helpers.
- `Card`: card, info card, stat card, statistic card, entity card and file card.
- `Badge`: badge tones, dots, sizes and compatibility status badge aliases.
- `Dialog`: dialog, popover, dropdown menu, tooltip, confirmation, sheet, drawer and hover-preview overlays.
- `DataTable`: core table plus pagination, toolbar, visibility, row actions, bulk actions and presets.

## Required Maintenance

- Update this file when `src/index.ts`, registry names or docs catalog names change.
- Keep migration aliases visible in metadata, but avoid teaching them as the main API.
- Keep registry alias metadata aligned with `registry.json` and `cli/registry.ts`.
- Use `npm run test:root-exports` and `npm run test:registry` after export changes.
