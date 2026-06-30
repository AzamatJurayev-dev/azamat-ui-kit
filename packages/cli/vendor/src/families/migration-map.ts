import type { ComponentFamilyName } from "@/families/catalog"

export type FamilyMigrationStatus =
  | "canonical"
  | "family-member"
  | "family-member helper"
  | "canonical composed member"
  | "transitional"
  | "advanced"

export type FamilyMigrationEntry = {
  component: string
  family: ComponentFamilyName
  member?: string
  status: FamilyMigrationStatus
  notes?: string
}

export const componentFamilyMigrationMap: FamilyMigrationEntry[] = [
  { component: "Input", family: "InputFamily", member: "Root", status: "canonical" },
  { component: "ClearableInput", family: "InputFamily", member: "Clearable", status: "family-member" },
  { component: "SearchInput", family: "InputFamily", member: "Search", status: "family-member" },
  { component: "PasswordInput", family: "InputFamily", member: "Password", status: "family-member" },
  { component: "NumberInput", family: "InputFamily", member: "Number", status: "family-member" },
  { component: "DateInput", family: "InputFamily", member: "Date", status: "family-member" },
  { component: "DateRangeInput", family: "InputFamily", member: "DateRange", status: "family-member" },
  { component: "MoneyInput", family: "InputFamily", member: "Money", status: "family-member" },
  { component: "QuantityInput", family: "InputFamily", member: "Quantity", status: "family-member" },
  { component: "MaskedInput", family: "InputFamily", member: "Masked", status: "family-member" },
  { component: "PhoneInput", family: "InputFamily", member: "Phone", status: "family-member" },
  { component: "OtpInput", family: "InputFamily", member: "Otp", status: "family-member" },
  { component: "ColorInput", family: "InputFamily", member: "Color", status: "family-member" },
  { component: "TagInput", family: "InputFamily", member: "Tag", status: "advanced" },
  { component: "QuantityStepper", family: "InputFamily", member: "QuantityStepper", status: "advanced" },

  { component: "Select", family: "SelectFamily", member: "Root", status: "canonical" },
  { component: "SimpleSelect", family: "SelectFamily", member: "Simple", status: "family-member" },
  { component: "AsyncSelect", family: "SelectFamily", member: "Async", status: "family-member" },
  { component: "AsyncMultiSelect", family: "SelectFamily", member: "AsyncMulti", status: "family-member" },
  { component: "Combobox", family: "SelectFamily", member: "Combobox", status: "family-member" },
  { component: "FormSelect", family: "SelectFamily", member: "Form.Select", status: "family-member" },
  { component: "FormAsyncSelect", family: "SelectFamily", member: "Form.Async", status: "family-member" },

  { component: "Card", family: "CardFamily", member: "Root", status: "canonical" },
  { component: "InfoCard", family: "CardFamily", member: "Info", status: "canonical composed member" },
  { component: "SmartCard", family: "CardFamily", member: "Info", status: "transitional", notes: "Prefer InfoCard or CardFamily.Info in docs and new usage." },
  { component: "MetricCard", family: "CardFamily", member: "Stat", status: "family-member", notes: "Display-facing alias implemented through the StatCard surface." },
  { component: "StatCard", family: "CardFamily", member: "Stat", status: "family-member" },
  { component: "StatisticCard", family: "CardFamily", member: "Statistic", status: "family-member" },
  { component: "EntityCard", family: "CardFamily", member: "Entity", status: "family-member" },
  { component: "FileCard", family: "CardFamily", member: "File", status: "family-member" },

  { component: "Badge", family: "BadgeFamily", member: "Root", status: "canonical" },

  { component: "Dialog", family: "OverlayFamily", member: "Dialog", status: "canonical" },
  { component: "Popover", family: "OverlayFamily", member: "Popover", status: "canonical" },
  { component: "DropdownMenu", family: "OverlayFamily", member: "DropdownMenu", status: "canonical" },
  { component: "Tooltip", family: "OverlayFamily", member: "Tooltip", status: "family-member" },
  { component: "RightClickMenu", family: "OverlayFamily", member: "RightClickMenu", status: "family-member" },
  { component: "AlertDialog", family: "OverlayFamily", member: "AlertDialog", status: "family-member" },
  { component: "ConfirmDialog", family: "OverlayFamily", member: "ConfirmDialog", status: "family-member" },
  { component: "ModalShell", family: "OverlayFamily", member: "ModalShell", status: "family-member" },
  { component: "SheetShell", family: "OverlayFamily", member: "SheetShell", status: "family-member" },
  { component: "Drawer", family: "OverlayFamily", member: "Drawer", status: "family-member" },
  { component: "DialogActions", family: "OverlayFamily", member: "DialogActions", status: "family-member" },

  { component: "FormFieldShell", family: "FormFamily", member: "Field", status: "canonical" },
  { component: "FormInput", family: "FormFamily", member: "Input", status: "family-member" },
  { component: "FormTextarea", family: "FormFamily", member: "Textarea", status: "family-member" },
  { component: "FormSelect", family: "FormFamily", member: "Select", status: "family-member" },
  { component: "FormAsyncSelect", family: "FormFamily", member: "AsyncSelect", status: "family-member" },
  { component: "FormSwitch", family: "FormFamily", member: "Switch", status: "family-member" },
  { component: "FormSearchInput", family: "FormFamily", member: "Search", status: "family-member" },
  { component: "FormPasswordInput", family: "FormFamily", member: "Password", status: "family-member" },
  { component: "FormNumberInput", family: "FormFamily", member: "Number", status: "family-member" },
  { component: "FormPhoneInput", family: "FormFamily", member: "Phone", status: "family-member" },
  { component: "FormDateInput", family: "FormFamily", member: "Date", status: "family-member" },
  { component: "FormDateRangeInput", family: "FormFamily", member: "DateRange", status: "family-member" },
  { component: "FormDatePicker", family: "FormFamily", member: "DatePicker", status: "family-member" },
  { component: "FormDateRangePicker", family: "FormFamily", member: "DateRangePicker", status: "family-member" },
  { component: "FormBuilder", family: "FormFamily", member: "Builder", status: "advanced" },

  { component: "DataTable", family: "DataTableFamily", member: "Root", status: "canonical" },
  { component: "DataTableToolbar", family: "DataTableFamily", member: "Toolbar", status: "family-member" },
  { component: "DataTablePagination", family: "DataTableFamily", member: "Pagination", status: "family-member" },
  { component: "DataTableColumnVisibilityMenu", family: "DataTableFamily", member: "ColumnVisibilityMenu", status: "family-member" },
  { component: "DataTableSortableHeader", family: "DataTableFamily", member: "SortableHeader", status: "family-member" },
  { component: "DataTableRowActions", family: "DataTableFamily", member: "RowActions", status: "family-member" },
  { component: "DataTableBulkActions", family: "DataTableFamily", member: "BulkActions", status: "family-member" },
  { component: "DataTableViewPresets", family: "DataTableFamily", member: "ViewPresets", status: "family-member" },
  { component: "createDataTableSelectColumn", family: "DataTableFamily", member: "createSelectColumn", status: "family-member helper" },
  { component: "createDataTableActionsColumn", family: "DataTableFamily", member: "createActionsColumn", status: "family-member helper" },
  { component: "TableExportMenu", family: "DataTableFamily", member: "ExportMenu", status: "advanced" },
  { component: "TableImportButton", family: "DataTableFamily", member: "ImportButton", status: "advanced" },
] as const
