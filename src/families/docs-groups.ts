import type { ComponentFamilyName } from "@/families/catalog"

export type ComponentDocsGroupName =
  | "Input"
  | "Select"
  | "Card"
  | "Badge"
  | "Overlay"
  | "FormField"
  | "DataTable"

export type ComponentDocsSection = {
  id: string
  label: string
  description: string
  components: string[]
}

export type ComponentDocsGroupEntry = {
  group: ComponentDocsGroupName
  family: ComponentFamilyName
  slug: string
  label: string
  primaryComponent: string
  description: string
  sections: ComponentDocsSection[]
}

export const componentDocsGroups: ComponentDocsGroupEntry[] = [
  {
    group: "Input",
    family: "InputFamily",
    slug: "input",
    label: "Input",
    primaryComponent: "Input",
    description: "Single-field text entry with searchable, masked, numeric, date, and formatted presets.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "Start from the base field and add formatting only when the product surface needs it.",
        components: ["Input"],
      },
      {
        id: "presets",
        label: "Presets",
        description: "Common input variants that keep a shared text-field mental model.",
        components: [
          "ClearableInput",
          "SearchInput",
          "PasswordInput",
          "NumberInput",
          "MaskedInput",
          "PhoneInput",
          "MoneyInput",
          "QuantityInput",
          "OtpInput",
          "ColorInput",
          "DateInput",
          "DateRangeInput",
        ],
      },
      {
        id: "form-wrappers",
        label: "Form wrappers",
        description: "Start from the universal RHF wrapper and add unique range behavior only when the field actually needs it.",
        components: ["FormInput", "FormDateRangeInput"],
      },
      {
        id: "transitional",
        label: "Compatibility aliases",
        description: "Older wrapper names that still work, but new docs and new product work should prefer FormInput with a matching kind.",
        components: [
          "AppInput",
          "UniversalInput",
          "FormAppInput",
          "FormSearchInput",
          "FormPasswordInput",
          "FormNumberInput",
          "FormPhoneInput",
          "FormDateInput",
        ],
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Higher-composition entry patterns that should not replace the default input mental model.",
        components: ["TagInput", "QuantityStepper"],
      },
    ],
  },
  {
    group: "Select",
    family: "SelectFamily",
    slug: "select",
    label: "Select",
    primaryComponent: "Select",
    description: "Choice picking with synchronous, async, multi-select, and combobox presets.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "The base select surface for single-choice flows.",
        components: ["Select"],
      },
      {
        id: "presets",
        label: "Presets",
        description: "Composed select patterns for remote data, searchable lists, and richer triggers.",
        components: ["SimpleSelect", "AsyncSelect", "AsyncMultiSelect", "Combobox"],
      },
      {
        id: "form-wrappers",
        label: "Form wrappers",
        description: "Use the universal RHF select wrapper first, then switch modes only when remote loading is required.",
        components: ["FormSelect"],
      },
      {
        id: "transitional",
        label: "Compatibility aliases",
        description: "Older wrapper names that still work, but new docs should point teams to FormSelect as the primary entry.",
        components: ["FormAsyncSelect"],
      },
    ],
  },
  {
    group: "Card",
    family: "CardFamily",
    slug: "card",
    label: "Card",
    primaryComponent: "Card",
    description: "General-purpose container plus reusable display presets for stats, files, and entities.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "The base card surface and the most reusable composed card variant.",
        components: ["Card", "InfoCard"],
      },
      {
        id: "presets",
        label: "Presets",
        description: "Purpose-built card shapes for dashboards and data-heavy product screens.",
        components: ["MetricCard", "StatCard", "StatisticCard", "EntityCard", "FileCard"],
      },
      {
        id: "transitional",
        label: "Transitional",
        description: "Older names that still work but should not lead new docs or examples.",
        components: ["SmartCard"],
      },
    ],
  },
  {
    group: "Badge",
    family: "BadgeFamily",
    slug: "badge",
    label: "Badge",
    primaryComponent: "Badge",
    description: "Inline metadata and status labels through one Badge component with tone, dot, size, and variant props.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "The canonical badge component. Use props for status, metadata, and subtle labels.",
        components: ["Badge"],
      },
      {
        id: "transitional",
        label: "Compatibility aliases",
        description: "Old status-specific wrapper names that now delegate to Badge.",
        components: ["StatusBadge"],
      },
    ],
  },
  {
    group: "Overlay",
    family: "OverlayFamily",
    slug: "overlay",
    label: "Overlay",
    primaryComponent: "Dialog",
    description: "Floating interaction surfaces grouped by behavior, not by card-like visual appearance.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "Start with the primitive that matches the interaction model.",
        components: ["Dialog", "Popover", "DropdownMenu"],
      },
      {
        id: "presets",
        label: "Presets",
        description: "Composed overlay patterns for confirmations, sheets, drawers, tooltips, and context menus.",
        components: ["Tooltip", "RightClickMenu", "AlertDialog", "ConfirmDialog", "ModalShell", "SheetShell", "Drawer", "DialogActions"],
      },
      {
        id: "transitional",
        label: "Compatibility aliases",
        description: "HoverCard is an overlay preview surface, not a data card. Prefer Popover or Tooltip for new work.",
        components: ["HoverCard"],
      },
    ],
  },
  {
    group: "FormField",
    family: "FormFamily",
    slug: "form-field",
    label: "Form Field",
    primaryComponent: "FormFieldShell",
    description: "Field-shell composition and RHF wrappers for consistent validation, copy, and layout.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "The base field shell for labels, descriptions, and errors.",
        components: ["FormFieldShell"],
      },
      {
        id: "wrappers",
        label: "Wrappers",
        description: "Prewired wrappers for common field families and calendar-driven flows.",
        components: ["FormTextarea", "FormSwitch", "FormDatePicker", "FormDateRangePicker"],
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Higher-level builders and shells for teams that need abstraction over raw fields.",
        components: ["FormBuilder"],
      },
    ],
  },
  {
    group: "DataTable",
    family: "DataTableFamily",
    slug: "data-table",
    label: "Data Table",
    primaryComponent: "DataTable",
    description: "Tabular data surface with toolbar, pagination, bulk actions, and column helpers.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "The canonical table surface teams should adopt first.",
        components: ["DataTable"],
      },
      {
        id: "extensions",
        label: "Extensions",
        description: "Composable table helpers for view controls, actions, and pagination.",
        components: [
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
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Import-export helpers that should be introduced only when the core grid is already clear.",
        components: ["TableExportMenu", "TableImportButton"],
      },
    ],
  },
] as const
