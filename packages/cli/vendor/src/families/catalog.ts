import { additionalPublicFamilies } from "@/families/public-surface-rationalization"

export type ComponentFamilyName =
  | "InputFamily"
  | "SelectFamily"
  | "CardFamily"
  | "BadgeFamily"
  | "OverlayFamily"
  | "FormFamily"
  | "DataTableFamily"
  | "ActionFamily"
  | "FeedbackFamily"
  | "ChartFamily"
  | "NavigationFamily"
  | "UploadFamily"
  | "PrimitiveFamily"

export type ComponentFamilyCatalogEntry = {
  family: ComponentFamilyName
  label: string
  description: string
  canonical: readonly string[]
  members: readonly string[]
  transitional?: readonly string[]
  advanced?: readonly string[]
}

export const componentFamilyCatalog: ComponentFamilyCatalogEntry[] = [
  {
    family: "InputFamily",
    label: "Input",
    description: "Small core input surface for the input types used most often in dashboard screens.",
    canonical: ["Input", "Textarea"],
    members: [
      "NumberInput",
      "DateInput",
      "DateRangeInput",
      "MoneyInput",
      "PhoneInput",
      "FormInput",
    ],
    transitional: ["ClearableInput", "SearchInput", "MaskedInput", "QuantityInput"],
    advanced: ["Slider", "RangeSlider", "Rating", "OtpInput", "ColorInput", "InlineEditable", "TagInput", "QuantityStepper"],
  },
  {
    family: "SelectFamily",
    label: "Select",
    description: "Primitive select plus async, multi, combobox, and form integration presets.",
    canonical: ["Select"],
    members: ["AsyncSelect", "AsyncMultiSelect", "Combobox", "FormSelect"],
    transitional: ["SimpleSelect", "FormAsyncSelect"],
  },
  {
    family: "CardFamily",
    label: "Card",
    description: "Primitive card plus dashboard and entity-oriented composed card presets.",
    canonical: ["Card", "InfoCard"],
    members: ["StatisticCard", "EntityCard", "FileCard", "TrendCard", "ComparisonCard"],
    transitional: ["SmartCard", "StatCard"],
  },
  {
    family: "BadgeFamily",
    label: "Badge",
    description: "Status, metadata, and inline labels expressed through one Badge API with tone, dot, size, and variant props.",
    canonical: ["Badge"],
    members: ["DeltaBadge"],
  },
  {
    family: "OverlayFamily",
    label: "Overlay",
    description: "Dialog, popover, menu, tooltip, drawer, and hover-preview interaction surfaces grouped by behavior.",
    canonical: ["Dialog", "Popover", "DropdownMenu"],
    members: ["Tooltip", "HoverCard", "ConfirmDialog", "SheetShell"],
    transitional: ["RightClickMenu", "AlertDialog", "ModalShell", "Drawer", "DialogActions"],
  },
  {
    family: "FormFamily",
    label: "Form",
    description: "Field shell, wrappers, and builder presets.",
    canonical: ["FormFieldShell"],
    members: [
      "FormInput",
      "FormTextarea",
      "FormSelect",
      "FormAsyncSelect",
      "FormSwitch",
      "FormDatePicker",
      "FormDateRangePicker",
      "RepeaterField",
    ],
    transitional: [
      "FormSearchInput",
      "FormPasswordInput",
      "FormNumberInput",
      "FormPhoneInput",
      "FormDateInput",
      "FormDateRangeInput",
    ],
    advanced: ["FormBuilder"],
  },
  {
    family: "DataTableFamily",
    label: "Data Table",
    description: "Table shell, toolbar, pagination, actions, presets, and import-export helpers.",
    canonical: ["DataTable"],
    members: [
      "DataTableToolbar",
      "DataTablePagination",
      "DataTableColumnVisibilityMenu",
      "DataTableSortableHeader",
      "DataTableRowActions",
      "DataTableBulkActions",
      "DataTableViewPresets",
      "createDataTableSelectColumn",
      "createDataTableActionsColumn",
    ],
    advanced: ["TableExportMenu", "TableImportButton"],
  },
  ...additionalPublicFamilies,
] as const
