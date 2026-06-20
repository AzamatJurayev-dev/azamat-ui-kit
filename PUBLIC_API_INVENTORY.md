# Azamat UI Kit Public API Inventory

Bu fayl `src/index.ts` va uning ichidan chiqayotgan group exportlar asosida tuzildi. Maqsad: package root'dan chiqayotgan surface'ni aniq ko'rish, canonical nomlarni belgilash va keyingi docs/catalog ishlarini tartibli qilish.

## 1. Current Root Export Shape

Hozir package root quyidagi qatlamlarni chiqaradi:

- base UI primitives
- actions
- layout
- filters
- overlay
- navigation
- inputs
- form wrappers
- feedback
- display
- data-table system
- notifications
- command
- calendar
- upload
- wizard
- patterns
- charts
- hooks
- utils

Bu kuchli surface, lekin `public API` va `internal implementation` orasidagi chegara hali aniq emas.

## 2. Strong Canonical Surface

Quyidagilar canonical public surface bo'lib turishi kerak.

### Base UI

- `Button`
- `Input`
- `Textarea`
- `Checkbox`
- `Switch`
- `Badge`
- `Card`
- `Tabs`
- `Dialog`
- `DropdownMenu`
- `Popover`
- `Select`
- `Table`
- `Collapse`
- `CollapseTrigger`
- `CollapseContent`
- `Skeleton`
- `SkeletonText`
- `SkeletonCard`
- `Divider`
- `SegmentedControl`
- `Spinner`
- `LoadingOverlay`
- `Tooltip`

### Actions

- `ActionMenu`
- `CopyButton`
- `CopyField`
- `ButtonGroup`
- `QuickActionGrid`

### Layout

- `AppShell`
- `AppHeader`
- `AppSidebar`
- `PageHeader`
- `StatCard`
- `SidebarNav`
- `Breadcrumbs`
- `PageContainer`
- `Section`
- `Toolbar`
- `SplitLayout`
- `StickyFooterBar`

### Navigation

- `Pagination`
- `PageTabs`
- `StepperTabs`
- `AnchorNav`

### Inputs

- `SimpleSelect`
- `AsyncSelect`
- `AsyncMultiSelect`
- `ClearableInput`
- `SearchInput`
- `PasswordInput`
- `NumberInput`
- `DateInput`
- `DateRangeInput`
- `MoneyInput`
- `QuantityInput`
- `MaskedInput`
- `PhoneInput`
- `TagInput`
- `Combobox`
- `Rating`
- `Slider`
- `RangeSlider`
- `OtpInput`
- `ColorInput`
- `QuantityStepper`

### Form Wrappers

- `FormFieldShell`
- `FormInput`
- `FormSelect`
- `FormAsyncSelect`
- `FormTextarea`
- `FormSwitch`
- `FormSearchInput`
- `FormPasswordInput`
- `FormNumberInput`
- `FormPhoneInput`
- `FormDateInput`
- `FormDateRangeInput`
- `FormDatePicker`
- `FormDateRangePicker`

### Feedback

- `EmptyState`
- `LoadingState`
- `StatusBadge`
- `Alert`
- `PageState`
- `InlineState`

### Display

- `DescriptionList`
- `Progress`
- `ProgressCard`
- `Result`
- `Timeline`
- `MetricGrid`
- `InfoCard`
- `ActivityFeed`
- `StatusLegend`
- `Avatar`
- `AvatarGroup`
- `DataState`
- `Statistic`
- `StatisticCard`
- `StatisticGrid`
- `List`
- `ListRow`
- `Descriptions`
- `KanbanBoard`
- `TagList`
- `TreeView`
- `KeyboardShortcut`
- `CodeBlock`
- `FileCard`
- `PropertyGrid`
- `EntityCard`

### Data Table

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

### Overlay / Notifications / Command / Calendar / Upload / Wizard

- `DialogActions`
- `ModalShell`
- `ConfirmDialog`
- `SheetShell`
- `ToastProvider`
- `useToast`
- `CommandPalette`
- `Calendar`
- `DatePicker`
- `DateRangePicker`
- `FileUpload`
- `ImageUpload`
- `Stepper`
- `Wizard`

### Patterns

- `ResourcePage`
- `ResourceDetailPage`
- `FormBuilder`
- `FormBuilderPresets`

### Charts

- `ChartFrame`
- `BarChart`
- `LineChart`
- `Sparkline`
- `DonutChart`
- `ChartLegend`
- `MetricTrend`

### Hooks

- `useSessionStorageState`
- `useBeforeUnloadWhenDirty`
- `useIsMobile`
- `useDisclosure`
- `useDebouncedCallback`
- `useDebouncedValue`
- `useDataTableViewState`

## 3. Surface Problems Found

### Duplicate export paths

Quyidagi surface'lar bir necha joydan chiqyapti:

- `FormDatePicker`
- `FormDateRangePicker`

Sabab:

- `src/index.ts` ichida ham direct export bor
- `./components/form` orqali ham chiqadi

Natija:

- docs generator yoki API inventory uchun chalkashlik
- root contract keragidan ortiq shovqinli bo'ladi

### Canonical name vs implementation name drift

Hozir:

- public nom sifatida `InfoCard` kerak
- implementation file esa `smart-card.tsx`
- root export ichida ikkalasi ham chiqib ketgan

Natija:

- consumer `InfoCard` ishlatadimi yoki `SmartCard`mi aniq emas

### Internal-looking surfaces leaking to root

Quyidagilar hozir export chain orqali chiqyapti, lekin public layer sifatida hali aniq pishmagan:

- `SmartCard`
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
- `KpiCard`
- `KpiGrid`
- `ProgressRing`
- `HorizontalBarChart`
- `FloatingActionButton`
- `ActionBar`
- `TableExportMenu`
- `TableImportButton`

Bu surface'lar yomon degani emas. Muammo:

- docs/catalog'ga to'g'ridan-to'g'ri chiqarilsa foydalanuvchi chalg'iydi
- canonical adoption surface bilan experimentation surface aralashib ketadi

### Registry drift risk

Registry allaqachon `info-card` kabi canonical nomga o'tyapti, source esa ba'zi joylarda hali implementation naming bilan yashayapti.

Bu yana shunday joylarda paydo bo'lishi mumkin:

- display cards
- chart helperlari
- pattern system componentlari
- data-table extension surface'lari

## 4. Recommended Public Boundary

Quyidagi qarorlar tavsiya qilinadi.

### Root exportda qoladi

- primitives
- adoptionga tayyor composed components
- RHF wrappers
- stable feedback/display pieces
- core data-table surface
- calendar/upload/wizard/public hooks
- canonical pattern entry components

### Group export ichida qoladi, lekin docs catalog'da alohida ko'rsatilmaydi

- `ActionSystem`
- `StatusSystem`
- `FilterBuilder`
- `DataView`
- `EntityDetails`
- `ResourceSystem`
- `CrudSystem`
- `SmartFormShell`
- `WorkspaceShell`
- `SettingsSection`
- `SettingsRow`
- `KpiCard`
- `KpiGrid`
- `ProgressRing`
- `HorizontalBarChart`
- `TableExportMenu`
- `TableImportButton`

### Alias orqali transitional support, lekin canonical nom bitta bo'ladi

- `InfoCard` is canonical
- `SmartCard` transitional/internal bo'lishi kerak

## 5. Immediate Cleanup Order

1. `src/index.ts` duplicate direct exportlarni kamaytirish
2. `InfoCard` / `SmartCard` bo'yicha canonical contractni yakunlash
3. `patterns` exportini docs-facing va internal-facing surface'ga ajratish
4. `data-table` extension componentlarini `advanced` yoki `internal` sifatida belgilash
5. `charts` ichida `core charts` va `dashboard extras`ni ajratish
6. `README` va keyingi docs app component inventory shu fayldagi canonical list bilan sync qilinishi

## 6. Docs Catalog Rule

Docs/catalog tizimida bitta nom bilan ko'rsatish kerak:

- `Input` family ichida `Input`, `SearchInput`, `PasswordInput`, `PhoneInput`, `MoneyInput`, `QuantityInput`, `MaskedInput`
- `Select` family ichida `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox`, `FormSelect`, `FormAsyncSelect`
- `Date` family ichida `DateInput`, `DateRangeInput`, `DatePicker`, `DateRangePicker`, `FormDateInput`, `FormDateRangeInput`, `FormDatePicker`, `FormDateRangePicker`
- `Card` family ichida `Card`, `InfoCard`, `StatCard`, `StatisticCard`, `EntityCard`, `FileCard`

Library package esa alohida exportlarni saqlab qoladi, lekin docs/catalog foydalanuvchini family-first tushuntiradi.

## 7. Next Supervisor Tasks

- [ ] `src/index.ts` duplicate direct exports audit va cleanup
- [ ] `InfoCard` canonical, `SmartCard` transitional/internal sifatida qaror yozish
- [ ] `patterns` ichidan docs-facing minimal public setni ajratish
- [ ] `charts` core vs extras boundary taskini ochish
- [ ] `data-table` advanced helpers uchun public status qarorini yozish
- [ ] `README` public component listini shu inventory bilan sync qilish
