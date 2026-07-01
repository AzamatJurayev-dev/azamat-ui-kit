import { componentFamilyCatalog, type ComponentFamilyCatalogEntry, type ComponentFamilyName } from "@/families/catalog"
import {
  componentFamilyMigrationMap,
  type FamilyMigrationEntry,
  type FamilyMigrationStatus,
} from "@/families/migration-map"

const publicFamilyOverrides: Partial<Record<ComponentFamilyName, ComponentFamilyCatalogEntry>> = {
  InputFamily: {
    family: "InputFamily",
    label: "Input",
    description: "Small core input surface for the input types used most often in dashboard screens.",
    canonical: ["Input", "Textarea"],
    members: ["NumberInput", "DateInput", "DateRangeInput", "MoneyInput", "PhoneInput", "FormInput"],
    transitional: ["ClearableInput", "SearchInput", "MaskedInput", "QuantityInput"],
    advanced: ["Slider", "RangeSlider", "Rating", "OtpInput", "ColorInput", "InlineEditable", "TagInput", "QuantityStepper"],
  },
  SelectFamily: {
    family: "SelectFamily",
    label: "Select",
    description: "Choice-picking surface with async, multi-select, and combobox only when the interaction needs them.",
    canonical: ["Select"],
    members: ["AsyncSelect", "AsyncMultiSelect", "Combobox", "FormSelect"],
    transitional: ["SimpleSelect", "FormAsyncSelect"],
  },
  CardFamily: {
    family: "CardFamily",
    label: "Card",
    description: "Primitive card plus only the card presets that provide reusable product value.",
    canonical: ["Card", "InfoCard"],
    members: ["EntityCard", "FileCard"],
    transitional: ["SmartCard", "StatCard", "StatisticCard", "TrendCard", "ComparisonCard"],
  },
  OverlayFamily: {
    family: "OverlayFamily",
    label: "Overlay",
    description: "Floating interaction surfaces grouped by behavior, not by card-like visual appearance.",
    canonical: ["Dialog", "Popover", "DropdownMenu", "Tooltip"],
    members: ["ConfirmDialog", "SheetShell", "HoverCard"],
    transitional: ["RightClickMenu", "AlertDialog", "ModalShell", "Drawer", "DialogActions"],
  },
  FormFamily: {
    family: "FormFamily",
    label: "Form",
    description: "Field shell and a compact set of broad wrappers instead of many small aliases.",
    canonical: ["FormFieldShell"],
    members: ["FormInput", "FormTextarea", "FormSelect", "FormSwitch", "FormDatePicker", "FormDateRangePicker", "RepeaterField"],
    transitional: ["FormAsyncSelect", "FormSearchInput", "FormNumberInput", "FormPhoneInput", "FormDateInput", "FormDateRangeInput"],
    advanced: ["FormBuilder"],
  },
  DataTableFamily: {
    family: "DataTableFamily",
    label: "Data Table",
    description: "Table shell with toolbar and pagination as the only first-level companions.",
    canonical: ["DataTable"],
    members: ["DataTableToolbar", "DataTablePagination"],
    transitional: ["DataTableColumnVisibilityMenu", "DataTableSortableHeader", "DataTableRowActions", "DataTableBulkActions", "DataTableViewPresets", "createDataTableSelectColumn", "createDataTableActionsColumn"],
    advanced: ["TableExportMenu", "TableImportButton"],
  },
}

const publicFamilyCatalog = componentFamilyCatalog.map((entry) => publicFamilyOverrides[entry.family] ?? entry)

const familyCatalogMap = new Map<ComponentFamilyName, ComponentFamilyCatalogEntry>(publicFamilyCatalog.map((entry) => [entry.family, entry]))

const componentMigrationMap = new Map<string, FamilyMigrationEntry[]>()

for (const entry of componentFamilyMigrationMap) {
  const existingEntries = componentMigrationMap.get(entry.component) ?? []
  existingEntries.push(entry)
  componentMigrationMap.set(entry.component, existingEntries)
}

function getFamilyCatalogEntry(family: ComponentFamilyName) {
  return familyCatalogMap.get(family)
}

function listFamilyCatalogEntries() {
  return publicFamilyCatalog
}

function getFamilyMembers(family: ComponentFamilyName) {
  return componentFamilyMigrationMap.filter((entry) => entry.family === family)
}

function getComponentFamilyEntry(component: string) {
  return componentMigrationMap.get(component)?.[0]
}

function getComponentFamilyEntries(component: string) {
  return componentMigrationMap.get(component) ?? []
}

function listComponentsByStatus(status: FamilyMigrationStatus) {
  return componentFamilyMigrationMap.filter((entry) => entry.status === status)
}

function listTransitionalComponents() {
  return listComponentsByStatus("transitional")
}

function listAdvancedComponents() {
  return listComponentsByStatus("advanced")
}

function listCanonicalComponents() {
  return componentFamilyMigrationMap.filter((entry) => entry.status === "canonical" || entry.status === "canonical composed member")
}

export {
  getComponentFamilyEntry,
  getComponentFamilyEntries,
  getFamilyCatalogEntry,
  getFamilyMembers,
  listAdvancedComponents,
  listCanonicalComponents,
  listComponentsByStatus,
  listFamilyCatalogEntries,
  listTransitionalComponents,
}
