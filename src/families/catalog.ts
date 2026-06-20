export type ComponentFamilyName =
  | "InputFamily"
  | "SelectFamily"
  | "CardFamily"
  | "FormFamily"
  | "DataTableFamily"

export type ComponentFamilyCatalogEntry = {
  family: ComponentFamilyName
  label: string
  description: string
  canonical: string[]
  members: string[]
  transitional?: string[]
  advanced?: string[]
}

export const componentFamilyCatalog: ComponentFamilyCatalogEntry[] = [
  {
    family: "InputFamily",
    label: "Input",
    description: "Text entry, formatted entry, search, password, numeric, date, and supporting input presets.",
    canonical: ["Input"],
    members: [
      "ClearableInput",
      "SearchInput",
      "PasswordInput",
      "NumberInput",
      "DateInput",
      "DateRangeInput",
      "MoneyInput",
      "QuantityInput",
      "MaskedInput",
      "PhoneInput",
      "OtpInput",
      "ColorInput",
    ],
    advanced: ["TagInput", "QuantityStepper"],
  },
  {
    family: "SelectFamily",
    label: "Select",
    description: "Primitive select plus async, multi, combobox, and form integration presets.",
    canonical: ["Select"],
    members: ["SimpleSelect", "AsyncSelect", "AsyncMultiSelect", "Combobox", "FormSelect", "FormAsyncSelect"],
  },
  {
    family: "CardFamily",
    label: "Card",
    description: "Primitive card plus dashboard and entity-oriented composed card presets.",
    canonical: ["Card", "InfoCard"],
    members: ["StatCard", "StatisticCard", "EntityCard", "FileCard"],
    transitional: ["SmartCard"],
  },
  {
    family: "FormFamily",
    label: "Form",
    description: "Field shell, wrappers, sections, actions, shell composition, and builder presets.",
    canonical: ["FormFieldShell"],
    members: [
      "FormInput",
      "FormTextarea",
      "FormSelect",
      "FormAsyncSelect",
      "FormSwitch",
      "FormSearchInput",
      "FormPasswordInput",
      "FormNumberInput",
      "FormPhoneInput",
      "FormDateInput",
      "FormDateRangeInput",
      "FormDatePicker",
      "FormDateRangePicker",
    ],
    transitional: ["SmartFormShell"],
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
] as const
