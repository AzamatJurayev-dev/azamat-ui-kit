import type { ComponentFamilyName } from "@/families/catalog"
import { additionalDocsGroups } from "@/families/public-surface-rationalization"

export type ComponentDocsGroupName =
  | "Input"
  | "Select"
  | "Card"
  | "Badge"
  | "Overlay"
  | "FormField"
  | "DataTable"
  | "Button"
  | "Alert"
  | "BarChart"
  | "Sidebar"
  | "FileUpload"
  | "Checkbox"

export type ComponentDocsSection = {
  id: string
  label: string
  description: string
  components: readonly string[]
}

export type ComponentDocsGroupEntry = {
  group: ComponentDocsGroupName
  family: ComponentFamilyName
  slug: string
  label: string
  primaryComponent: string
  description: string
  sections: readonly ComponentDocsSection[]
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
        description: "Input and its text-first presets can still connect to forms through the universal wrapper family.",
        components: [],
      },
      {
        id: "compatibility-aliases",
        label: "Compatibility aliases",
        description: "Older focused input wrappers that still work, but should not lead new adoption.",
        components: ["ClearableInput", "SearchInput", "MaskedInput", "QuantityInput", "FormInput", "FormSearchInput", "FormPasswordInput", "FormNumberInput", "FormPhoneInput", "FormDateInput", "FormDateRangeInput"],
      },
      {
        id: "advanced",
        label: "Advanced presets",
        description: "Specialized controls that belong to the input family, but should not lead the main catalog.",
        components: ["Slider", "RangeSlider", "Rating", "OtpInput", "ColorInput", "InlineEditable", "TagInput", "QuantityStepper"],
      },
    ],
  },
  {
    group: "Select",
    family: "SelectFamily",
    slug: "select",
    label: "Select",
    primaryComponent: "Select",
    description: "Primary choice-picking surface with async, combobox, and form members introduced only when the interaction actually changes.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "Start with the base select surface before reaching for remote, multi-value, or command-style members.",
        components: ["Select"],
      },
      {
        id: "complex-presets",
        label: "Complex presets",
        description: "Promote only members that add real behavior beyond the base select.",
        components: ["AsyncSelect", "Combobox"],
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Remote multi-value selection is powerful, but it should stay behind the simpler select path.",
        components: ["AsyncMultiSelect"],
      },
      {
        id: "form-wrapper",
        label: "Form wrapper",
        description: "Use one form select wrapper instead of teaching separate wrapper names for each select flavor.",
        components: ["FormSelect"],
      },
      {
        id: "compatibility-aliases",
        label: "Compatibility aliases",
        description: "Older select wrappers can stay available, but they should not lead the first-level route.",
        components: ["SimpleSelect", "FormAsyncSelect"],
      },
    ],
  },
  {
    group: "Card",
    family: "CardFamily",
    slug: "card",
    label: "Card",
    primaryComponent: "Card",
    description: "General-purpose container plus only the card presets that provide reusable product value.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "The base card surface and reusable information card variant.",
        components: ["Card", "InfoCard"],
      },
      {
        id: "product-cards",
        label: "Product cards",
        description: "Card presets that are harder to recreate as a one-off variant.",
        components: ["EntityCard", "FileCard", "TrendCard", "ComparisonCard", "SmartCard", "StatCard"],
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
        components: ["Dialog", "Popover", "DropdownMenu", "Tooltip"],
      },
      {
        id: "focused-flows",
        label: "Focused flows",
        description: "Keep only overlay presets with real flow-level behavior in the public catalog.",
        components: ["ConfirmDialog", "SheetShell", "HoverCard", "RightClickMenu", "AlertDialog", "ModalShell", "Drawer", "DialogActions"],
      },
    ],
  },
  {
    group: "FormField",
    family: "FormFamily",
    slug: "form-field",
    label: "Form Field",
    primaryComponent: "FormFieldShell",
    description: "Field-shell composition and a compact set of form wrappers for consistent validation, copy, and layout.",
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
    description: "Tabular data surface centered on one canonical DataTable route, with helper pieces kept secondary.",
    sections: [
      {
        id: "primitives",
        label: "Primitives",
        description: "The canonical table surface teams should adopt first.",
        components: ["DataTable"],
      },
      {
        id: "core-companions",
        label: "Core companions",
        description: "Only the companions that most product teams install next to the main grid.",
        components: [
          "DataTableToolbar",
          "DataTablePagination",
          "DataTableRowActions",
          "DataTableBulkActions",
          "DataTableViewPresets",
        ],
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Factories, visibility helpers, and import-export tooling belong after the main grid contract is already clear.",
        components: [
          "DataTableColumnVisibilityMenu",
          "DataTableSortableHeader",
          "createDataTableSelectColumn",
          "createDataTableActionsColumn",
          "TableExportMenu",
          "TableImportButton",
        ],
      },
    ],
  },
  ...additionalDocsGroups,
] as const
