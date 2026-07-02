# Public Component API

Generated from `scripts/public-api-docs-data.mjs` for package version `0.3.24`.

This file tracks the canonical public docs entries that should lead the product mental model.
Related helpers can stay public, but they should be introduced from the canonical surface detail page instead of being taught as separate first-level names.

## Input

- Canonical route: `/components/input`
- Summary: Primary typed-value surface. Start here first, then move into search, password, numeric, phone, money, date, quantity, or masked presets only when behavior truly changes.

### Use When

- You need one clear text-entry surface first.
- Multi-line copy can stay beside Input through the same family via Textarea.
- The screen needs typed values before it needs dedicated preset chrome.
- You want clearable behavior, trailing actions, and text callbacks without teaching many component names too early.
- React Hook Form flows should still teach FormInput as the matching wrapper instead of per-variant wrappers.

### Related Helpers

`Textarea`, `NumberInput`, `MoneyInput`, `PhoneInput`, `DateInput`, `DateRangeInput`, `FormInput`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `value` | `string | number` | Controlled input value. |
| `defaultValue` | `string | number` | Uncontrolled initial value. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | Native change handler. |
| `onValueChange` | `(value: string) => void` | Direct text callback for controlled string flows. |
| `type` | `HTMLInputTypeAttribute` | Prefer text/search/email/password before moving to presets. |
| `placeholder` | `string` | Short empty-state hint. |
| `clearable` | `boolean` | Shows the built-in clear action when the field has a value. |
| `onClear` | `() => void` | Called after the field is cleared through the built-in clear action. |
| `trailingAction` | `ReactNode` | Interactive trailing slot for counters, shortcuts, toggles, or actions. |
| `replaceTrailingWhenClear` | `boolean` | Controls whether the clear button replaces trailing content or sits beside it. |
| `clearOnEscape` | `boolean` | Lets Escape clear the value when clearable mode is active. |
| `disabled` | `boolean` | Locks editing and interaction. |

## Select

- Canonical route: `/components/select`
- Summary: Primary selection surface. Start here first, then expand into static, async, multi-select, or combobox members only when the data shape or interaction model requires it.

### Use When

- The user is choosing from a finite option set.
- The screen needs one canonical selection mental model before specialized loading behavior is introduced.
- Local filtering can stay on the primary surface before you promote a separate member.
- You want FormSelect to stay the RHF entry point instead of teaching async wrappers as separate first-class APIs.

### Related Helpers

`SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox`, `FormSelect`, `FormAsyncSelect`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `value` | `string | string[]` | Controlled selected value. |
| `defaultValue` | `string | string[]` | Uncontrolled initial value. |
| `onValueChange` | `(value) => void` | Selection change callback. |
| `options` | `Array<{ label; value; disabled? }>` | Visible option list. |
| `searchable` | `boolean` | Enables local filtering on the main select surface when supported. |
| `multiple` | `boolean` | Allows multi-value selection when the active member supports it. |
| `placeholder` | `string` | Shown before a value is selected. |
| `disabled` | `boolean` | Disables trigger and selection. |

## FormFieldShell

- Canonical route: `/components/form-field`
- Summary: Canonical field wrapper for labels, descriptions, validation copy, and richer form control composition.

### Use When

- The product needs one reusable field frame before adding control-specific wrappers.
- Teams want labels, descriptions, and validation copy to stay visually consistent.
- FormInput, FormSelect, and picker wrappers should read as members around one shell.

### Related Helpers

`FormInput`, `FormSelect`, `FormTextarea`, `FormSwitch`, `FormDatePicker`, `FormDateRangePicker`, `FormDateRangeInput`, `FormAsyncSelect`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `label` | `ReactNode` | Primary field label content. |
| `description` | `ReactNode` | Supporting helper copy under the label. |
| `error` | `ReactNode` | Validation message or field-level error. |
| `required` | `boolean` | Marks the field as required in the shell UI. |
| `optional` | `boolean` | Shows optional-state affordance when relevant. |
| `layout` | `'stacked' | 'inline'` | Controls shell arrangement when supported. |

## Card

- Canonical route: `/components/card`
- Summary: General-purpose container plus the first reusable display-card entry for dashboard and data-heavy screens.

### Use When

- You need one neutral container before committing to a specialized card preset.
- The screen needs a reusable display card with consistent spacing and hierarchy.
- InfoCard should stay the public display-card name, while SmartCard remains migration-only.

### Related Helpers

`InfoCard`, `StatisticCard`, `EntityCard`, `FileCard`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `children` | `ReactNode` | Card body content. |
| `className` | `string` | Optional layout override. |
| `variant` | `string` | Visual surface treatment when supported. |
| `tone` | `string` | Semantic emphasis when supported. |
| `interactive` | `boolean` | Marks click-like card states when supported. |
| `selected` | `boolean` | Highlights chosen card state when supported. |

## Badge

- Canonical route: `/components/badge`
- Summary: Canonical inline metadata and status label. Use tone, dot, size, and variant props instead of separate status-specific components.

### Use When

- The interface needs compact metadata, status, counts, or category labels.
- Status indicators should share one visual vocabulary.
- Use `tone` and `dot` props instead of inventing extra badge-like wrappers.

### Related Helpers



### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `variant` | `'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'` | Controls surface treatment. |
| `tone` | `'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'muted'` | Controls semantic color. |
| `size` | `'sm' | 'default' | 'lg'` | Controls badge height and text size. |
| `dot` | `boolean` | Adds a leading status dot. |
| `leftIcon` | `ReactNode` | Optional leading icon. |
| `rightIcon` | `ReactNode` | Optional trailing icon. |

## Dialog

- Canonical route: `/components/dialog`
- Summary: Canonical blocking overlay primitive. Related overlay presets are grouped around behavior, not card-like appearance.

### Use When

- The user must complete or dismiss a focused task.
- The surface needs proper modal focus management.
- Popover, menu, tooltip, sheet, drawer, and confirmation presets should stay related to one overlay mental model instead of reading like separate component families.

### Related Helpers

`Popover`, `DropdownMenu`, `Tooltip`, `HoverCard`, `RightClickMenu`, `AlertDialog`, `ConfirmDialog`, `ModalShell`, `SheetShell`, `Drawer`, `DialogActions`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `open` | `boolean` | Controlled open state. |
| `defaultOpen` | `boolean` | Uncontrolled initial open state. |
| `onOpenChange` | `(open: boolean) => void` | Open-state change callback. |
| `modal` | `boolean` | Controls modal interaction behavior when supported. |
| `children` | `ReactNode` | Dialog trigger and content composition. |
| `className` | `string` | Optional surface styling override. |

## DataTable

- Canonical route: `/components/data-table`
- Summary: Operational table surface for sorting, search, row selection, pagination, saved filters, toolbar actions, and row-level workflows.

### Use When

- The screen needs more than a simple read-only table.
- Search, sorting, selection, and pagination must work together.
- The team wants one canonical admin-table surface before introducing advanced helpers.

### Related Helpers

`DataTableToolbar`, `DataTablePagination`, `DataTableColumnVisibilityMenu`, `DataTableRowActions`, `DataTableBulkActions`, `DataTableViewPresets`, `createDataTableSelectColumn`, `createDataTableActionsColumn`, `TableExportMenu`, `TableImportButton`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `columns` | `ColumnDef<RowData>[]` | Visible table structure. |
| `data` | `RowData[]` | Current rows to render. |
| `getRowId` | `(row) => string` | Stable row identity. |
| `sorting` | `SortingState` | Controlled sort state. |
| `rowSelection` | `RowSelectionState` | Controlled selection state. |
| `pagination` | `PaginationStateProps` | Current page, size, total count, and handlers. |

## Button

- Canonical route: `/components/button`
- Summary: Canonical action trigger. Start here first, then expand into menus, copy patterns, or grouped action helpers only when the interaction needs them.

### Use When

- The user needs one clear primary or secondary action.
- A flow should start from a direct trigger before hiding work behind menus.
- Grouped or embedded action patterns should stay secondary to the main button mental model.

### Related Helpers

`ActionMenu`, `CopyButton`, `ButtonGroup`, `CopyField`, `QuickActionGrid`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `variant` | `'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'warning'` | Controls the visual action treatment. |
| `size` | `'xs' | 'sm' | 'default' | 'lg' | 'icon'` | Controls action density. |
| `loading` | `boolean` | Shows a pending state when the action is busy. |
| `leftIcon` | `ReactNode` | Adds a leading icon slot. |
| `rightIcon` | `ReactNode` | Adds a trailing icon slot. |
| `fullWidth` | `boolean` | Lets the action stretch to fill its container. |

## Alert

- Canonical route: `/components/alert`
- Summary: Canonical feedback route for status, empty, loading, progress, and toast surfaces.

### Use When

- The screen needs clear inline product feedback.
- Loading, empty, and notification states should share one mental model instead of reading like unrelated exports.
- Teams want a structured feedback vocabulary before reaching for low-level spinners or skeletons.

### Related Helpers

`EmptyState`, `LoadingState`, `Progress`, `ToastProvider`, `InlineState`, `LoadingOverlay`, `Spinner`, `Skeleton`, `useToast`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `tone` | `'info' | 'success' | 'warning' | 'destructive' | 'muted'` | Controls feedback emphasis. |
| `title` | `ReactNode` | Primary feedback heading. |
| `description` | `ReactNode` | Supporting detail under the title. |
| `action` | `ReactNode` | Optional inline action area. |
| `icon` | `ReactNode` | Overrides the default tone-based icon. |
| `children` | `ReactNode` | Additional alert content. |

## BarChart

- Canonical route: `/components/bar-chart`
- Summary: Canonical chart route for dashboard visuals and metric surfaces.

### Use When

- Category comparison should be obvious at a glance.
- The product needs one chart-led entry point before exposing legends, frames, or micro-trend helpers.
- Metric companions should stay related to the chart mental model instead of feeling like duplicate first-level exports.

### Related Helpers

`LineChart`, `DonutChart`, `MetricGrid`, `ChartFrame`, `ChartLegend`, `Sparkline`, `MetricTrend`, `Statistic`, `StatisticGrid`, `StatisticCard`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `data` | `Array<{ label: string; value: number }>` | Visible chart values. |
| `size` | `'sm' | 'md' | 'lg'` | Controls chart density. |
| `max` | `number` | Optional explicit upper bound for bar scaling. |
| `showLabels` | `boolean` | Shows category labels under bars. |
| `showValues` | `boolean` | Shows numeric values beside or above bars. |
| `barClassName` | `string` | Optional class override for bar items. |

## Sidebar

- Canonical route: `/components/sidebar`
- Summary: Canonical navigation and page-shell route for workspace apps.

### Use When

- The app needs persistent primary navigation.
- Page framing, tabs, pagination, breadcrumbs, and guided flows should read as related navigation surfaces.
- Teams want one layout-led route before exploring smaller structural helpers.

### Related Helpers

`PageContainer`, `Tabs`, `Pagination`, `Breadcrumbs`, `Wizard`, `Section`, `AnchorNav`, `Stepper`, `StepperTabs`, `SegmentedControl`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `items` | `SidebarItem[]` | Primary navigation items. |
| `collapsed` | `boolean` | Controls the compact rail state when supported. |
| `footerAccount` | `SidebarFooterAccount` | Optional user or workspace account block. |
| `secondaryActions` | `SidebarItem[]` | Optional low-priority actions under the main nav tree. |
| `renderLink` | `(props) => ReactNode` | Lets routing libraries own the anchor element. |
| `onItemSelect` | `(item) => void` | Observes navigation selection events. |

## FileUpload

- Canonical route: `/components/file-upload`
- Summary: Canonical upload route for generic files first, then image-specific behavior when previews matter.

### Use When

- Users should add, review, and remove files without leaving the current flow.
- Validation, rejected files, and progress belong to the same product surface.
- ImageUpload should stay related to the generic upload mental model instead of being taught as a disconnected first-level concept.

### Related Helpers

`ImageUpload`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `accept` | `string` | Native file accept pattern. |
| `multiple` | `boolean` | Allows selecting more than one file. |
| `maxFiles` | `number` | Caps how many files can be added. |
| `maxSize` | `number` | Caps file size in bytes when validation is enabled. |
| `files` | `File[]` | Controlled uploaded files list. |
| `onFilesChange` | `(files: File[]) => void` | Observes uploaded file changes. |

## Checkbox

- Canonical route: `/components/checkbox`
- Summary: Canonical primitive route for checked selection, toggles, tables, and supporting building blocks.

### Use When

- A screen needs explicit checked, unchecked, or indeterminate selection.
- Single-choice, boolean toggle, table, and disclosure primitives should stay related instead of crowding the main catalog independently.
- Teams need one primitive-led route before reaching for supporting layout helpers like Divider or ScrollBox.

### Related Helpers

`RadioGroup`, `Switch`, `Table`, `Accordion`, `Collapse`, `Calendar`, `Divider`, `Kbd`, `ScrollBox`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `checked` | `boolean | 'indeterminate'` | Controlled checked state. |
| `defaultChecked` | `boolean | 'indeterminate'` | Uncontrolled initial checked state. |
| `onCheckedChange` | `(checked) => void` | Checked-state change callback. |
| `disabled` | `boolean` | Disables interaction. |
| `required` | `boolean` | Marks the control as required in forms. |
| `label` | `ReactNode` | Optional visible label content when supported. |

