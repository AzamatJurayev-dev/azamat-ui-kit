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
    description: "Primary text-entry surface with a smaller public set of dashboard-ready input presets.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "Start from the base field and long-form text area before adding specialized behavior.",
        components: ["Input", "Textarea"],
      },
      {
        id: "core-presets",
        label: "Core presets",
        description: "Keep only the input variants that are common in real admin and dashboard screens.",
        components: ["NumberInput", "PhoneInput", "MoneyInput", "DateInput", "DateRangeInput"],
      },
      {
        id: "form-wrapper",
        label: "Form wrapper",
        description: "Use one universal form input wrapper instead of listing every compatibility alias as a public component.",
        components: ["FormInput"],
      },
    ],
  },
  {
    group: "Select",
    family: "SelectFamily",
    slug: "select",
    label: "Select",
    primaryComponent: "Select",
    description: "Primary choice-picking surface with static, async, multi-select, and search-first members built around it.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "Start with the base select surface before reaching for remote, multi-value, or command-style members.",
        components: ["Select"],
      },
      {
        id: "presets",
        label: "Presets",
        description: "Shared select modes that keep one selection mental model instead of splitting docs into unrelated pickers.",
        components: ["SimpleSelect", "AsyncSelect", "AsyncMultiSelect", "Combobox"],
      },
      {
        id: "form-wrappers",
        label: "Form wrappers",
        description: "Use the universal RHF select wrapper first, then switch modes only when the field truly needs remote loading.",
        components: ["FormSelect"],
      },
      {
        id: "transitional",
        label: "Compatibility aliases",
        description: "Older wrapper names that still work, but new docs and new product work should point teams to FormSelect as the primary entry.",
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
        components: ["StatisticCard", "EntityCard", "FileCard", "TrendCard", "ComparisonCard"],
      },
      {
        id: "transitional",
        label: "Transitional",
        description: "Older names that still work but should not lead new docs or examples.",
        components: ["SmartCard", "StatCard"],
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
        components: ["Badge", "DeltaBadge"],
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
        components: ["Tooltip", "HoverCard", "RightClickMenu", "AlertDialog", "ConfirmDialog", "ModalShell", "SheetShell", "Drawer", "DialogActions"],
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
        components: ["FormTextarea", "FormSwitch", "FormDatePicker", "FormDateRangePicker", "RepeaterField"],
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
