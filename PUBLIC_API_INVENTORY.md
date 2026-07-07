# Public API Inventory

This file defines what should feel public, canonical, and teachable for `azix`.

## Contract

- Root exports should read like a usable component library, not like an internal app dump.
- Canonical names should lead docs, registry recommendations, and examples.
- Migration aliases may stay exported for compatibility, but they must not compete with canonical names.
- Pattern/layout systems can stay available, but they should not dominate first-level docs.
- Any root export change must update this file and `CHANGELOG.md`.

## Canonical Root Surface

### Base UI

`Button`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Badge`, `Card`, `Tabs`, `Dialog`, `DropdownMenu`, `Popover`, `Select`, `Table`, `Collapse`, `Accordion`, `Skeleton`, `Divider`, `SegmentedControl`, `Spinner`, `LoadingOverlay`, `Tooltip`, `RadioGroup`, `Kbd`, `ScrollBox`, `RightClickMenu`

### Actions

`ActionMenu`, `CopyButton`, `CopyField`, `ButtonGroup`, `QuickActionGrid`

### Layout And Navigation

`Sidebar`, `SidebarNav`, `Breadcrumbs`, `PageContainer`, `Section`, `SectionHeader`, `Stack`, `StickyFooterBar`, `Pagination`, `PageTabs`, `StepperTabs`, `AnchorNav`, `NavTabs`, `CommandBar`

### Inputs And Forms

Canonical docs entries:

- `Input`
- `FormInput`
- `FormFieldShell`
- `Select`
- `FormSelect`
- `DatePicker`
- `DateRangePicker`

Related helpers and members:

- `ClearableInput`, `SearchInput`, `PasswordInput`, `NumberInput`, `MoneyInput`, `PhoneInput`, `QuantityInput`, `QuantityStepper`, `MaskedInput`, `DateInput`, `DateRangeInput`, `OtpInput`, `ColorInput`
- `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox`
- `TagInput`, `Rating`, `Slider`, `RangeSlider`, `InlineEditable`
- `FormAsyncSelect`, `FormTextarea`, `FormSwitch`, `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput`, `FormDateRangeInput`, `FormDatePicker`, `FormDateRangePicker`

### Feedback And Display

`EmptyState`, `EmptySearchState`, `LoadingState`, `Alert`, `PageState`, `InlineState`, `DescriptionList`, `Descriptions`, `Progress`, `ProgressCard`, `Result`, `Timeline`, `ActivityFeed`, `MetricGrid`, `Avatar`, `AvatarGroup`, `DataState`, `Statistic`, `StatisticCard`, `StatisticGrid`, `List`, `ListRow`, `DataList`, `DataListRow`, `TagList`, `TreeView`, `KeyboardShortcut`, `CodeBlock`, `PropertyGrid`, `KeyValueCard`, `EntityHeader`, `EntityCard`, `FileCard`, `UserCard`, `StatusDot`, `StatusLegend`, `ProgressCircle`, `InfoCard`, `TrendCard`, `ComparisonCard`, `DeltaBadge`, `SkeletonTable`, `SkeletonForm`, `KanbanBoard`

### Data, Overlay, Command And Upload

`DataTable`, `DataTablePagination`, `DataTableToolbar`, `DataTableColumnVisibilityMenu`, `createDataTableSelectColumn`, `DataTableSortableHeader`, `DataTableRowActions`, `createDataTableActionsColumn`, `DataTableBulkActions`, `DataTableViewPresets`, `DataTableSavedFilters`, `DialogActions`, `AlertDialog`, `ConfirmDialog`, `Drawer`, `ModalShell`, `SheetShell`, `ToastProvider`, `useToast`, `NotificationCenter`, `CommandPalette`, `Calendar`, `FileUpload`, `ImageUpload`, `FileDropzone`, `Stepper`, `Wizard`

### Charts And Hooks

`ChartFrame`, `BarChart`, `LineChart`, `Sparkline`, `DonutChart`, `ChartLegend`, `MetricTrend`, `KpiCard`, `ProgressRing`, `HorizontalBarChart`, `useSessionStorageState`, `useBeforeUnloadWhenDirty`, `useIsMobile`, `useDisclosure`, `useDebouncedCallback`, `useDebouncedValue`, `useDataTableViewState`

## Hidden From First-Level Docs

These can exist as root exports, subpath exports, source-copy files, or advanced detail sections, but they should not be the first component names users see:

- `SmartCard`
- `AppHeader`
- `StatCard`
- `AppSidebar`
- `TableExportMenu`
- `TableImportButton`
- `ResourcePage`
- `ResourceDetailPage`
- `FormBuilder`
- form-builder preset helpers from `form-builder-presets`
- `theme-provider`
- family metadata exports from `families/*`
- low-level input helpers such as `input-value`, `numeric-value`, `input-chrome`, `input-decorator`, `input-primitive`, `input-group`

## Family Display Rule

The public site should show one clean component name first, then related variants inside the detail page:

- `Input`: text entry, search, password, numeric, money, phone, quantity, masked, date, and date-range members plus `FormInput`.
- `Select`: simple select, async select, async multi select, combobox, and `FormSelect`.
- `FormFieldShell`: field shell plus form wrappers around canonical input and select families.
- `Card`: card primitive first, then `InfoCard`, `StatCard`, `StatisticCard`, `EntityCard`, `FileCard`, `TrendCard`, and `ComparisonCard` as members.
- `Badge`: badge tones, sizes, icon slots, and dot usage; do not teach extra status-badge naming.
- `Dialog`: dialog, popover, dropdown, tooltip, right-click menu, alert/confirm, drawer, and sheet behaviors under one overlay mental model.
- `DataTable`: core table plus pagination, toolbar, saved filters, bulk actions, column visibility, and row actions.
- `Button`: direct actions first, then menu, copy, and grouped-action helpers.
- `Alert`: status, empty, loading, progress, and toast feedback surfaces grouped together.
- `Progress`: linear progress first, then circular variant as a compact completion alternative.
- `BarChart`: chart-led route with line, donut, metric, legend, and statistic helpers attached.
- `Sidebar`: navigation-led route with page container, tabs, pagination, breadcrumbs, and wizard companions.
- `FileUpload`: generic upload route with image-specific upload behavior as a related member.
- `Checkbox`: primitive route for selection, tables, disclosure, and supporting low-level helpers.

## Required Maintenance

- Update this file when `src/index.ts`, registry names, or docs catalog names change.
- Keep migration aliases exported only as compatibility surfaces.
- Keep registry alias metadata aligned with `registry.json` and CLI registry output.
- Use `npm run test:root-exports`, `npm run test:registry`, and `npm run check:public-api-inventory` after export changes.
