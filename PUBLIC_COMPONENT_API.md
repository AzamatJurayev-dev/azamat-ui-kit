# Public Component API

Generated from `scripts/public-api-docs-data.mjs` for package version `0.3.16`.

This file tracks the canonical public docs entries that should lead the product mental model.
Related helpers can stay public, but they should be introduced from the canonical surface detail page instead of being taught as separate first-level names.

## Input

- Canonical route: `/components/input`
- Summary: Primary typed-value surface. Start here before moving into search, password, numeric, phone, date, or masked presets.

### Use When

- You need one clear text-entry surface first.
- The screen needs typed values before it needs formatting helpers.
- React Hook Form flows should still teach FormInput as the matching wrapper.

### Related Helpers

`ClearableInput`, `SearchInput`, `PasswordInput`, `NumberInput`, `MoneyInput`, `PhoneInput`, `MaskedInput`, `DateInput`, `DateRangeInput`, `FormInput`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `value` | `string | number` | Controlled input value. |
| `defaultValue` | `string | number` | Uncontrolled initial value. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | Native change handler. |
| `type` | `HTMLInputTypeAttribute` | Prefer text/search/email/password before moving to presets. |
| `placeholder` | `string` | Short empty-state hint. |
| `disabled` | `boolean` | Locks editing and interaction. |

## Select

- Canonical route: `/components/select`
- Summary: Primary selection surface. Start here for known options, then expand into async, multi-select, or combobox only when the data shape requires it.

### Use When

- The user is choosing from a finite option set.
- The screen needs one canonical selection mental model.
- You want FormSelect to stay the RHF entry point in docs and product code.

### Related Helpers

`SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox`, `FormSelect`, `FormAsyncSelect`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `value` | `string | string[]` | Controlled selected value. |
| `defaultValue` | `string | string[]` | Uncontrolled initial value. |
| `onValueChange` | `(value) => void` | Selection change callback. |
| `options` | `Array<{ label; value; disabled? }>` | Visible option list. |
| `placeholder` | `string` | Shown before a value is selected. |
| `disabled` | `boolean` | Disables trigger and selection. |

## FormFieldShell

- Canonical route: `/components/form-field`
- Summary: Canonical field wrapper for labels, descriptions, validation copy, and richer form control composition.

### Use When

- The product needs one reusable field frame before adding control-specific wrappers.
- Teams want labels, descriptions, and validation copy to stay visually consistent.
- FormInput, FormSelect, FormDatePicker, and FormDateRangePicker should read as wrappers around one shell.

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
- InfoCard should stay the public display-card name, not internal implementation names.

### Related Helpers

`InfoCard`, `MetricCard`, `StatCard`, `StatisticCard`, `EntityCard`, `FileCard`

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
- Use `tone` and `dot` props instead of separate status label wrappers.

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
- Popover, menu, tooltip, sheet, drawer, and confirmation presets should stay related to one overlay mental model.

### Related Helpers

`Popover`, `DropdownMenu`, `Tooltip`, `RightClickMenu`, `AlertDialog`, `ConfirmDialog`, `ModalShell`, `SheetShell`, `Drawer`, `DialogActions`

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
- Summary: Operational table surface for sorting, search, row selection, pagination, toolbar actions, and row-level workflows.

### Use When

- The screen needs more than a simple read-only table.
- Search, sorting, selection, and pagination must work together.
- The team wants one canonical admin-table surface before introducing advanced helpers.

### Related Helpers

`DataTableToolbar`, `DataTablePagination`, `DataTableColumnVisibilityMenu`, `DataTableRowActions`, `DataTableBulkActions`, `DataTableViewPresets`, `createDataTableSelectColumn`, `createDataTableActionsColumn`

### Prop Highlights

| Prop | Type | Notes |
| --- | --- | --- |
| `columns` | `ColumnDef<RowData>[]` | Visible table structure. |
| `data` | `RowData[]` | Current rows to render. |
| `getRowId` | `(row) => string` | Stable row identity. |
| `sorting` | `SortingState` | Controlled sort state. |
| `rowSelection` | `RowSelectionState` | Controlled selection state. |
| `pagination` | `PaginationStateProps` | Current page, size, total count, and handlers. |

