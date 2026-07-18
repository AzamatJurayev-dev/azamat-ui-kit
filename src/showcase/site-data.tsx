import type { LucideIcon } from "lucide-react"
import {
  AlertCircleIcon,
  BadgeIcon,
  BlocksIcon,
  BookOpenIcon,
  BoxIcon,
  ChevronRightIcon,
  ComponentIcon,
  CreditCardIcon,
  BellIcon,
  DatabaseIcon,
  CalendarClockIcon,
  FileTextIcon,
  FormInputIcon,
  Grid2x2Icon,
  Layers3Icon,
  LayoutDashboardIcon,
  MousePointerClickIcon,
  PanelTopIcon,
  SmartphoneIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  Table2Icon,
  TerminalSquareIcon,
  WalletIcon,
  ToggleLeftIcon,
  WorkflowIcon,
} from "lucide-react"
import tembroRegistry from "./tembro-registry.json"
import {
  PACKAGE_LATEST_RELEASE_DATE,
  PACKAGE_LATEST_VERSION,
} from "./package-meta"
import {
  comparePublicComponentSurfaceOrder,
  isPublicComponentSurfaceSlug,
} from "@/public-component-surface"

export type NavItem = {
  label: string
  href: string
}

export type SidebarGroup = {
  title: string
  items: Array<{
    label: string
    href: string
    active?: boolean
    badge?: string
    icon: LucideIcon
  }>
}

export type PackageReleaseRecord = {
  version: string
  date: string
  status: "Published" | "Planned" | "Draft"
  summary: string
  notes: string[]
}

export type BlockCard = {
  slug: string
  title: string
  description: string
  category: "Dashboard" | "Auth" | "Table" | "Settings" | "Pricing" | "Product" | "Marketing"
  bestFor: string
  tags: string[]
  uses: string[]
  tone: string
  href: string
  previewHref?: string
  previewTone: TemplatePreviewTone
  layout: "Application" | "Marketing"
  theme: "Light" | "Soft"
  relatedTemplateSlug: string
  installSteps: string[]
  dependencyGroups: string[]
  copyTargets: string[]
  notes: string[]
}

export type TemplatePreviewTone = "dashboard" | "crm" | "table" | "auth" | "pricing" | "settings"

export type TemplateSectionCard = {
  title: string
  text: string
  status: string
}

export type TemplateStatCard = {
  label: string
  value: string
  meta: string
}

export type TemplateSection = {
  key: "overview" | "leads" | "reports" | "settings"
  label: string
  title: string
  description: string
  bullets: string[]
  statCards: TemplateStatCard[]
  supportCards: TemplateSectionCard[]
}

export type TemplateRecord = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  status: "Live" | "Review" | "Draft"
  previewTone: TemplatePreviewTone
  navItems: string[]
  metrics: Array<{ label: string; value: string; delta: string }>
  sections: TemplateSection[]
  uses: string[]
  modules: Array<{ label: string; href: string }>
  installSteps: string[]
  fileTree: string[]
  customizationNotes: string[]
  notes: string[]
}

export type LandingSearchItem = {
  label: string
  shortcut: string
  href: string
  group: string
}

export type GlobalSearchItem = {
  title: string
  description: string
  href: string
  group: "Components" | "Docs" | "Examples" | "Blocks" | "Templates"
  shortcut: string
  keywords?: string[]
  featured?: boolean
}

export type ComponentGroup =
  | "Primitives"
  | "Form Controls"
  | "Overlay"
  | "Data Display"
  | "Layout"
  | "Feedback"
  | "Patterns"

export type ComponentCatalogItem = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  category: "Components" | "Forms" | "Overlay" | "Data Display" | "Patterns"
  status: "Stable" | "Preview"
  installCommand: string
  propsRows: string[][]
  features: string[]
}

const formRHFWrapperBasePropsRows: string[][] = [
  ["control", "Control<TFieldValues>", "-", "RHF control instance from `useForm()`."],
  ["name", "FieldPath<TFieldValues>", "-", "Field path used for registration and value lookup."],
  ["rules", "Omit<UseControllerProps['rules'], 'value' | 'name'>", "-", "Validation rules and constraints for the field."],
  ["required", "boolean | \"*\" | FieldError", "false", "Marks field required in shell and optional validation path."],
  ["disabled", "boolean", "false", "Disables input and blocks interaction."],
  ["readOnly", "boolean", "false", "Allows viewing without edit; value remains controlled."],
  ["success", "ReactNode", "-", "Optional success message rendered by the shared field shell."],
  ["loading", "boolean", "false", "Shows a consistent loading message inside the shared field shell."],
  ["error", "string | FieldError | null", "-", "Optional error override instead of default form state message."],
]

const formRHFWrapperCommonFeatures = [
  "RHF control wiring",
  "name-based field registration",
  "error and required visual states",
  "validation contract",
  "label/description consistency",
  "disabled/readOnly handling",
] as const

export type ComponentRelationMap = Record<
  string,
  {
    groupSlugs: string[]
    componentSlugs: string[]
  }
>

export type ComponentModuleItem = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  category: "Actions" | "Layout" | "Forms" | "Data" | "Overlay" | "Workflow"
  exports: string[]
  href: string
  status: "Stable" | "Preview"
  features: string[]
}

export type ComponentGroupMeta = {
  title: ComponentGroup
  description: string
  whenToUse: string
  whenNotToUse: string
}

export type ComponentSurfaceSectionKey = "core" | "related" | "integrations" | "advanced" | "compatibility"

export type ComponentSurfaceSectionMeta = {
  key: ComponentSurfaceSectionKey
  title: string
  description: string
  slugs: string[]
}

export type ComponentSurfaceMemberInventoryItem = {
  component: string
  slug: string
  title: string
  surfaceSlug: string
  surfaceTitle: string
  sectionId: string
  sectionLabel: string
  sectionKey: ComponentSurfaceSectionKey
  summary: string
  useWhen: string
  maturity: string
  status: "Stable" | "Preview"
  href: string
}

export type ComponentDetailSidebarItem = {
  slug: string
  title: string
  href: string
  status: "Stable" | "Preview"
  group: ComponentGroup
  active: boolean
}

export type ComponentDetailSidebarSection = {
  key: string
  label: string
  items: ComponentDetailSidebarItem[]
}

export const PACKAGE_NAME = "tembro"
export const CLI_PACKAGE_NAME = "tembro"
export const PACKAGE_IMPORT = "tembro"
export const DOCS_APP_NAME = "tembro"
export const CLI_INIT_NEXT_COMMAND = `npx ${CLI_PACKAGE_NAME} init --template next --defaults`
export const CLI_INIT_VITE_COMMAND = `npx ${CLI_PACKAGE_NAME} init --template vite --defaults`
export const CLI_ADD_COMMAND = `npx ${CLI_PACKAGE_NAME} add button input`
export const PACKAGE_INSTALL_COMMAND = `${CLI_INIT_NEXT_COMMAND}\n${CLI_ADD_COMMAND}`
export const CLI_INSTALL_COMMAND = `npx ${CLI_PACKAGE_NAME} --help`
export const CLI_THEME_COMMAND = `npx ${CLI_PACKAGE_NAME} theme`
export const PACKAGE_NPM_URL = "https://www.npmjs.com/package/tembro"
export const PACKAGE_GITHUB_URL = "https://github.com/AzamatJurayev-dev/azamat-ui-kit"
export const PACKAGE_GITHUB_RELEASES_URL = `${PACKAGE_GITHUB_URL}/releases`
export const DOCS_REPO_URL = PACKAGE_GITHUB_URL
export const PACKAGE_RELEASES_URL = PACKAGE_GITHUB_RELEASES_URL
export const DOCS_RELEASES_URL = `${DOCS_REPO_URL}/releases`
export const DOCS_ROOT_PATH = "/docs"
export const releaseHistory: PackageReleaseRecord[] = [
  {
    version: PACKAGE_LATEST_VERSION,
    date: PACKAGE_LATEST_RELEASE_DATE,
    status: "Published",
    summary: "Expanded the registry with newer dashboard, input, badge, sidebar, and notification primitives.",
    notes: [
      "Registry truth now includes `collapse`, `sidebar`, `statistic`, `badge`, `notification-center`, and `command-palette`.",
      "Component metadata was refreshed so docs can keep canonical surfaces and related helpers accurate.",
      "CLI-first local component setup remains the default path for Next.js and Vite users.",
    ],
  },
  {
    version: "0.3.18",
    date: "June 30, 2026",
    status: "Published",
    summary: "Refined grouped docs and related-surface mapping.",
    notes: [
      "Input, Select, Card, Badge, Overlay, Form, and Data Table components were aligned with the latest public exports.",
      "Deprecated route-level names stayed aliased for compatibility while primary docs move toward simpler canonical surfaces.",
      "Docs app metadata now prefers current package registry vocabulary over older showcase-only names.",
    ],
  },
]
export const PACKAGE_VERSION = releaseHistory[0]?.version ?? PACKAGE_LATEST_VERSION
export const PACKAGE_RELEASE_DATE = releaseHistory[0]?.date ?? PACKAGE_LATEST_RELEASE_DATE

export const componentDocsPath = (slug: string) => `/components/${slug}`
export const componentPlaygroundPath = (slug: string) => `/playground/${slug}`
export const componentModulePath = (slug: string) => `/components/${slug}`
export const componentExportSlug = (value: string) => value.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()
export const componentExportPath = (moduleSlug: string, exportName: string) => `/components/${moduleSlug}/${componentExportSlug(exportName)}`
export const templatePath = (slug: string) => `/templates/${slug}`
export const blockPath = (slug: string) => `/blocks/${slug}`
export const componentGroupOrder: ComponentGroup[] = ["Primitives", "Form Controls", "Overlay", "Data Display", "Layout", "Feedback", "Patterns"]
export const componentGroupMeta: Record<ComponentGroup, ComponentGroupMeta> = {
  Primitives: {
    title: "Primitives",
    description: "Foundation components for actions, text entry, compact layout and small state changes.",
    whenToUse: "Use when you need a small reusable UI unit with minimal product opinion.",
    whenNotToUse: "Do not start here when the page needs full form orchestration, route structure, or async flows.",
  },
  "Form Controls": {
    title: "Form Controls",
    description: "Fields, wrappers and input flows for validation, selection, formatting and data entry.",
    whenToUse: "Use for user input, validation, RHF wiring and constrained value contracts.",
    whenNotToUse: "Do not use for read-only summaries or large page layout composition.",
  },
  Overlay: {
    title: "Overlay",
    description: "Dialog, popover, menu and confirmation surfaces that appear above the current screen.",
    whenToUse: "Use for contextual actions, confirmations and short focused tasks.",
    whenNotToUse: "Do not hide long multi-step flows inside overlays when a full page works better.",
  },
  "Data Display": {
    title: "Data Display",
    description: "Metrics, tables, empty states and read-oriented surfaces for operational screens.",
    whenToUse: "Use when the main job is reading, comparing or scanning product data.",
    whenNotToUse: "Do not use these as the first layer for input-heavy forms or route-level navigation.",
  },
  Layout: {
    title: "Layout",
    description: "Shell, breadcrumbs, side navigation and page framing for structured application routes.",
    whenToUse: "Use when the route needs hierarchy, section framing and navigation continuity.",
    whenNotToUse: "Do not pull layout components into tiny isolated widgets or inline forms.",
  },
  Feedback: {
    title: "Feedback",
    description: "Loading, result and toast patterns for status communication and short response loops.",
    whenToUse: "Use when the UI needs clear success, error, pending or completion feedback.",
    whenNotToUse: "Do not use feedback components as a substitute for missing page structure or field validation.",
  },
  Patterns: {
    title: "Patterns",
    description: "Composed flows and builders that connect multiple primitives.",
    whenToUse: "Use when the screen needs a repeatable workflow instead of one atomic control.",
    whenNotToUse: "Do not start here when a primitive or one wrapper solves the need cleanly.",
  },
}

const primitiveComponentSlugs = new Set(["button", "input", "textarea", "checkbox", "switch", "badge", "card", "tabs", "collapse", "kbd"])
const formControlComponentSlugs = new Set([
  "select",
  "combobox",
  "async-select",
  "async-multi-select",
  "radio-group",
  "date-picker",
  "date-range-picker",
  "form-field-shell",
  "form-input",
  "form-select",
  "form-textarea",
  "form-switch",
  "form-date-range-input",
  "form-date-picker",
  "form-date-range-picker",
])
const overlayComponentSlugs = new Set(["dialog", "popover", "dropdown-menu", "tooltip", "right-click-menu", "confirm-dialog", "alert-dialog", "drawer"])
const layoutComponentSlugs = new Set(["sidebar", "breadcrumbs", "section"])
const feedbackComponentSlugs = new Set(["toast", "loading-state", "empty-state"])
const patternComponentSlugs = new Set(["form-builder", "resource-page", "resource-detail-page", "page-toolbar", "bulk-action-bar", "detail-layout", "settings-page", "data-view"])

const legacyComponentSlugAliases = new Map<string, string>([
  ["app-sidebar", "sidebar"],
  ["form-async-select", "form-select"],
  ["form-search-input", "form-input"],
  ["form-password-input", "form-input"],
  ["form-number-input", "form-input"],
  ["form-phone-input", "form-input"],
  ["form-date-input", "form-input"],
  ["confirm-action", "confirm-dialog"],
  ["file-dropzone", "file-upload"],
  ["hover-card", "popover"],
  ["metric-card", "statistic"],
  ["nav-tabs", "tabs"],
  ["section-header", "section"],
  ["side-panel", "sidebar"],
  ["status-dot", "status-legend"],
]) 

function resolveLegacyComponentSlug(slug: string) {
  return legacyComponentSlugAliases.get(slug) ?? slug
}

export function getComponentGroup(slug: string): ComponentGroup {
  if (primitiveComponentSlugs.has(slug)) return "Primitives"
  if (formControlComponentSlugs.has(slug)) return "Form Controls"
  if (overlayComponentSlugs.has(slug)) return "Overlay"
  if (layoutComponentSlugs.has(slug)) return "Layout"
  if (feedbackComponentSlugs.has(slug)) return "Feedback"
  if (patternComponentSlugs.has(slug)) return "Patterns"
  return "Data Display"
}

export function getComponentGroupDetails(slug: string) {
  return componentGroupMeta[getComponentGroup(slug)]
}

function buildSidebarItemsForGroup(group: ComponentGroup, routeBuilder: (slug: string) => string) {
  return componentCatalog
    .filter((item) => getComponentGroup(item.slug) === group)
    .map((item) => ({ label: item.title, href: routeBuilder(item.slug), icon: item.icon, badge: item.status }))
}

const baseComponentCatalog: ComponentCatalogItem[] = [
  {
    slug: "button",
    title: "Button",
    description: "Trigger actions with multiple variants, sizes, icon positions and loading states.",
    icon: MousePointerClickIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["variant", "'default' | 'secondary' | ...", "'default'", "The visual style of the button."],
      ["size", "'xs' | 'sm' | 'md' | 'lg' | 'xl'", "'md'", "The size of the button."],
      ["asChild", "boolean", "false", "Render as a child element using Slot."],
      ["disabled", "boolean", "false", "Disables the button."],
      ["className", "string", "-", "Additional CSS classes."],
      ["onClick", "(e: MouseEvent) => void", "-", "Click event handler."],
    ],
    features: ["Variants", "Sizes", "Icon support", "Loading state"],
  },
  {
    slug: "input",
    title: "Input",
    description: "Primary text-entry surface for forms, filters, and compact editor layouts before moving into presets.",
    icon: FormInputIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "string", "-", "Controlled value."],
      ["onValueChange", "(value) => void", "-", "Direct text callback for controlled string flows."],
      ["type", "'text' | 'email' | 'password' | ...", "'text'", "Input HTML type before moving to a preset."],
      ["clearable", "boolean", "false", "Adds a built-in clear action when value exists."],
      ["trailingAction", "ReactNode", "-", "Interactive trailing slot for counters, shortcuts, or actions."],
      ["replaceTrailingWhenClear", "boolean", "true", "Keep or replace trailing content when clear is visible."],
      ["disabled", "boolean", "false", "Disables the field."],
    ],
    features: ["Primary text field", "Built-in clear action", "Trailing action slot", "Preset-friendly API"],
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "Multi-line input with autosizing-friendly layout for notes, messages and long-form data.",
    icon: FileTextIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["placeholder", "string", "-", "Placeholder text."],
      ["disabled", "boolean", "false", "Disables the textarea."],
      ["rows", "number", "-", "Preferred visible rows."],
      ["value", "string", "-", "Controlled value."],
      ["onChange", "(event) => void", "-", "Change handler."],
    ],
    features: ["Long-form input", "Disabled state", "Resizable content", "Controlled value"],
  },
  {
    slug: "select",
    title: "Select",
    description: "Primary selection surface for lists, status filters, and compact forms before moving into members.",
    icon: ComponentIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "string", "-", "Controlled selected value."],
      ["defaultValue", "string", "-", "Initial selected value."],
      ["onValueChange", "(value) => void", "-", "Selection change callback."],
      ["searchable", "boolean", "false", "Enables local filtering on the main surface."],
      ["multiple", "boolean", "false", "Allows multiple values when the active member supports it."],
      ["size", "'sm' | 'default'", "'default'", "Trigger size."],
      ["disabled", "boolean", "false", "Disables the trigger."],
    ],
    features: ["Primary choice input", "Local filtering", "Compact trigger", "Preset-friendly API"],
  },
  {
    slug: "combobox",
    title: "Combobox",
    description: "Searchable local choice input for static datasets, owners, tags, and filter controls.",
    icon: ComponentIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "string", "-", "Controlled selected value."],
      ["defaultValue", "string", "-", "Initial selected value."],
      ["onValueChange", "(value, option?) => void", "-", "Selection callback with the resolved option."],
      ["options", "ComboboxOption[]", "-", "Flat local option list."],
      ["groups", "ComboboxGroup[]", "-", "Grouped local options with section labels."],
      ["searchable", "boolean", "true", "Shows the built-in local search input."],
      ["clearable", "boolean", "true", "Allows clearing the selected value."],
      ["filterOption", "(option, search) => boolean", "-", "Custom local filtering contract."],
      ["renderOption", "(option, state) => ReactNode", "-", "Custom option row renderer."],
    ],
    features: ["Local search", "Grouped options", "Clearable value", "Custom renderers"],
  },
  {
    slug: "async-select",
    title: "Async Select",
    description: "Remote-aware select for search-driven datasets, edit hydration, and production loading or empty states.",
    icon: ComponentIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "string", "-", "Controlled selected value."],
      ["selectedOption", "AsyncSelectOption", "-", "Hydrated selected option for controlled edit modes."],
      ["onValueChange", "(value, option?) => void", "-", "Selection callback with optional option payload."],
      ["loadOptions", "(search) => Promise<AsyncSelectOption[]>", "-", "Async option fetcher."],
      ["loadSelectedOption", "(value) => Promise<AsyncSelectOption | null>", "-", "Fetch selected option for controlled edit."],
      ["defaultOptions", "AsyncSelectOption[]", "-", "Initial static options."],
      ["clearable", "boolean", "true", "Allows clearing the selected value."],
      ["cacheOptions", "boolean", "false", "Reuse options cache across repeated queries."],
      ["minSearchLength", "number", "1", "Minimum query length for request."],
      ["debounceMs", "number", "250", "Delay before calling remote search."],
      ["labels", "AsyncSelectLabels", "-", "Copy and state copy labels."],
      ["renderLoading", "AsyncSelectStateRenderer", "-", "Custom loading content renderer."],
    ],
    features: ["Remote option loading", "Debounced search", "Hydrated edit state", "Clearable controlled output"],
  },
  {
    slug: "async-multi-select",
    title: "Async Select",
    description: "Legacy alias for Async Select multi mode. Use `isMulti` on AsyncSelect instead of installing a separate component.",
    icon: ComponentIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["isMulti", "boolean", "true", "Turns AsyncSelect into multi mode with tag selection."],
      ["value", "string[]", "-", "Controlled selected values in multi mode."],
      ["onValueChange", "(values, options) => void", "-", "Bulk selection callback in multi mode."],
      ["maxSelected", "number", "-", "Upper cap for total selected items."],
      ["showSelectAll", "boolean", "false", "Allow select-all shortcut."],
    ],
    features: ["Legacy alias", "Multi selection", "Select-all helpers", "Use AsyncSelect as the canonical API"],
  },
  {
    slug: "number-input",
    title: "Number Input",
    description: "Numeric entry with parsing, constraints, and precise change semantics.",
    icon: ToggleLeftIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "number | string", "-", "Controlled value."],
      ["defaultValue", "number | string", "-", "Initial uncontrolled value."],
      ["onChange", "React.ChangeEventHandler<HTMLInputElement>", "-", "Native change event."],
      ["onNumberChange", "(value) => void", "-", "Parsed numeric callback."],
      ["onValueChange", "(value) => void", "-", "String-based callback for raw typed value."],
      ["min", "number", "-", "Lower bound."],
      ["max", "number", "-", "Upper bound."],
      ["step", "number", "1", "Step size for changes."],
      ["allowEmpty", "boolean", "false", "Allows clearing the input without forcing zero."],
  ],
  features: ["Parsing", "min/max", "Step semantics", "Invalid number handling"],
  },
  {
    slug: "date-picker",
    title: "Date Picker",
    description: "Popover-based date picker optimized for form fields and action buttons.",
    icon: CalendarClockIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "string", "-", "Controlled picker value."],
      ["defaultValue", "string", "-", "Initial uncontrolled value."],
      ["onValueChange", "(value) => void", "-", "Picker change callback."],
      ["disabled", "boolean", "false", "Disables the popover trigger."],
      ["min", "string", "-", "Minimum selectable date string."],
      ["max", "string", "-", "Maximum selectable date string."],
      ["disabledDates", "string[]", "-", "Date literals that are blocked."],
      ["className", "string", "-", "Wrapper style class."],
    ],
    features: ["Popover selection", "Date formatting", "min/max", "disabledDates"],
  },
  {
    slug: "date-range-picker",
    title: "Date Range Picker",
    description: "Popover date-range picker for period selection with constrained windows.",
    icon: CalendarClockIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "{ from: string; to: string }", "-", "Controlled range value."],
      ["defaultValue", "{ from: string; to: string }", "-", "Initial uncontrolled range value."],
      ["onValueChange", "(value) => void", "-", "Range callback with from/to."],
      ["disabled", "boolean", "false", "Disables all picker interactions."],
      ["min", "string", "-", "Earliest allowed date."],
      ["max", "string", "-", "Latest allowed date."],
      ["disabledDates", "string[]", "-", "Date literals blocked from selection."],
      ["className", "string", "-", "Wrapper style class."],
    ],
    features: ["Range picker", "Range windows", "disabledDates", "Boundary guards"],
  },
  {
    slug: "form-field-shell",
    title: "Form Field Shell",
    description: "Composable field shell that standardizes label, description, layout, errors and required markers.",
    icon: FileTextIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["label", "string", "-", "Field shell label text."],
      ["description", "string", "-", "Supporting helper text."],
      ["descriptionPosition", "'top' | 'bottom'", "'bottom'", "Description location relative to control."],
      ["layout", "'vertical' | 'horizontal' | 'inline'", "'vertical'", "Visual layout mode of label and field."],
      ["required", "boolean", "false", "Renders required marker and forwards required metadata."],
      ["error", "string | FieldError", "-", "Explicit error message shown in helper area."],
      ["labelAction", "ReactNode", "-", "Optional action in label area."],
      ["readOnly", "boolean", "false", "Read-only shell state."],
      ["disabled", "boolean", "false", "Disables shell state visuals."],
      ["className", "string", "-", "Custom wrapper class."],
    ],
    features: ["Label contract", "Inline description", "Horizontal/inline layout", "ReadOnly + disabled states", "Required indicator"],
  },
  {
    slug: "form-input",
    title: "Form Input",
    description: "Primary RHF field wrapper for text-like inputs. Use `kind` to cover search, password, number, phone, and date flows from one surface.",
    icon: FormInputIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ...formRHFWrapperBasePropsRows,
      ["kind", "'text' | 'search' | 'password' | 'number' | 'phone' | 'date'", "'text'", "Selects the field variant without changing wrapper-level API."],
      ["type", "'text' | 'email' | 'search' | ...", "'text'", "Rendered input type for base behavior when using the text variant."],
      ["placeholder", "string", "-", "Input placeholder."],
      ["onValueChange", "(value: string) => void", "-", "Change callback with parsed display value."],
      ["defaultValue", "string", "-", "Uncontrolled initial value in hybrid modes."],
    ],
    features: [...formRHFWrapperCommonFeatures, "Universal `kind` variants", "Error text and message flow", "Single wrapper migration path"],
  },
  {
    slug: "form-select",
    title: "Form Select",
    description: "Primary RHF select wrapper. Start with the default simple mode and switch to `kind=\"async\"` when option loading or hydration is remote.",
    icon: ComponentIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ...formRHFWrapperBasePropsRows,
      ["kind", "'simple' | 'async'", "'simple'", "Chooses the select surface while keeping the same form wrapper contract."],
      ["options", "SimpleSelectOption[]", "-", "Flat option set for select rendering."],
      ["placeholder", "string", "-", "Default label when empty."],
      ["onValueChange", "(value: string) => void", "-", "Selection change callback."],
    ],
    features: [...formRHFWrapperCommonFeatures, "Simple + async under one API", "Form-driven value control", "Clear/empty handling"],
  },
  {
    slug: "form-textarea",
    title: "Form Textarea",
    description: "RHF textarea wrapper with shell-level validation messages and descriptions.",
    icon: FileTextIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ...formRHFWrapperBasePropsRows,
      ["rows", "number", "-", "Visible row count."],
      ["minHeight", "number", "-", "Optional minimum height in rem/px."],
      ["maxLength", "number", "-", "Input length safety guard."],
      ["onValueChange", "(value: string) => void", "-", "Raw text callback from field."],
    ],
    features: [...formRHFWrapperCommonFeatures, "Long text support", "Error placement", "Description + helper states"],
  },
  {
    slug: "form-switch",
    title: "Form Switch",
    description: "RHF switch wrapper with binary payload and shell-level feedback.",
    icon: ToggleLeftIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ...formRHFWrapperBasePropsRows,
      ["checked", "boolean", "-", "Controlled checked value when controlled by wrapper."],
      ["defaultChecked", "boolean", "false", "Uncontrolled initial value in mixed modes."],
      ["onCheckedChange", "(value: boolean) => void", "-", "Boolean callback from switch state change."],
    ],
    features: [...formRHFWrapperCommonFeatures, "Boolean value contract", "Readable shell errors", "Disabled states"],
  },
  {
    slug: "form-date-range-input",
    title: "Form Date Range Input",
    description: "RHF range input wrapper supporting from/to bounds and required range validation.",
    icon: CalendarClockIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ...formRHFWrapperBasePropsRows,
      ["value", "{ from: string; to: string }", "-", "RHF controlled date range value."],
      ["min", "string", "-", "Earliest valid date for start boundary."],
      ["max", "string", "-", "Latest valid date for end boundary."],
      ["required", "boolean | { from: boolean; to: boolean }", "false", "Require one or both bounds."],
      ["onValueChange", "(value: { from: string; to: string }) => void", "-", "Range update callback."],
    ],
    features: [...formRHFWrapperCommonFeatures, "Range required validation", "from/to coordination", "Filter-ready contract"],
  },
  {
    slug: "form-date-picker",
    title: "Form Date Picker",
    description: "RHF popover date picker wrapper with shared validation and controlled submit flow.",
    icon: CalendarClockIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ...formRHFWrapperBasePropsRows,
      ["value", "string", "-", "Controlled popover date value."],
      ["disabledDates", "string[]", "-", "Calendar date blacklist."],
      ["min", "string", "-", "Earliest selectable date string."],
      ["max", "string", "-", "Latest selectable date string."],
      ["onValueChange", "(value: string | null) => void", "-", "Normalized picker value callback."],
    ],
    features: [...formRHFWrapperCommonFeatures, "Popover interaction", "Range of disabled dates", "Controlled popover state"],
  },
  {
    slug: "form-date-range-picker",
    title: "Form Date Range Picker",
    description: "RHF wrapper over popover date-range picker with required range and block-out support.",
    icon: CalendarClockIcon,
    category: "Forms",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ...formRHFWrapperBasePropsRows,
      ["value", "{ from: string; to: string }", "-", "Controlled range value object."],
      ["fromLabel", "string", "\"From\"", "Label text for start field."],
      ["toLabel", "string", "\"To\"", "Label text for end field."],
      ["disabledDates", "string[]", "-", "Date literals blocked from selection."],
      ["onValueChange", "(value: { from: string; to: string }) => void", "-", "Range callback for form state updates."],
    ],
    features: [...formRHFWrapperCommonFeatures, "Range-specific validation", "Date range constraints", "Accessible error mapping"],
  },
  {
    slug: "form-builder",
    title: "Form Builder",
    description: "RHF section builder for schema-driven forms with submit/reset and disabled/read-only modes.",
    icon: FileTextIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["control", "Control<TFieldValues>", "-", "RHF control passed to all generated sections."],
      ["fields", "FormBuilderField<TFieldValues, string>[]", "-", "Explicit field descriptors for full control."],
      ["sections", "FormBuilderSection<TFieldValues>[]", "-", "Form section descriptors with grouped presets."],
      ["submitLabel", "string", "\"Save\"", "Submit button text."],
      ["resetLabel", "string", "\"Reset\"", "Reset button text."],
      ["disabled", "boolean", "false", "Disables all controls and actions in builder."],
      ["readOnly", "boolean", "false", "Read-only state for generated field controls."],
      ["columns", "1 | 2 | 3", "1", "Grid column count for generated sections."],
      ["onSubmit", "(values) => Promise<void> | void", "-", "Submit handler for generated `<form>` events."],
    ],
    features: [
      "Field schema",
      "Section composition",
      "Custom render hooks",
      "Submit and reset control",
      "Disabled/readOnly pass-through",
      "Preset factories (inputField, phoneField, ...)",
    ],
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    description: "Single-choice grouped control for plans, density modes, and mutually exclusive settings.",
    icon: ToggleLeftIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["options", "RadioGroupOption[]", "-", "Options with label, value and optional description."],
      ["value", "string", "-", "Controlled selected value."],
      ["defaultValue", "string", "-", "Initial uncontrolled value."],
      ["onValueChange", "(value) => void", "-", "Selection callback."],
      ["orientation", "'vertical' | 'horizontal'", "'vertical'", "Layout direction."],
      ["size", "'sm' | 'default' | 'lg'", "'default'", "Control density."],
    ],
    features: ["Single selection", "Descriptions", "Horizontal or vertical layout", "Controlled plans"],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Binary selection control for permissions, tasks and grouped form actions.",
    icon: BoxIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["checked", "boolean | 'indeterminate'", "false", "Controlled checked state."],
      ["defaultChecked", "boolean | 'indeterminate'", "false", "Initial state."],
      ["disabled", "boolean", "false", "Disables the control."],
      ["onCheckedChange", "(checked) => void", "-", "Checked state callback."],
    ],
    features: ["Checked state", "Indeterminate state", "Disabled state", "Task lists"],
  },
  {
    slug: "switch",
    title: "Switch",
    description: "On/off control for preferences, settings and lightweight toggles.",
    icon: ToggleLeftIcon,
    category: "Forms",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["checked", "boolean", "false", "Controlled on/off state."],
      ["defaultChecked", "boolean", "false", "Initial state."],
      ["disabled", "boolean", "false", "Disables the switch."],
      ["onCheckedChange", "(checked) => void", "-", "State change callback."],
    ],
    features: ["Checked state", "Settings toggles", "Disabled state", "Compact interaction"],
  },
  {
    slug: "badge",
    title: "Badge",
    description: "Small status surface for counts, labels, intents and inline metadata.",
    icon: BadgeIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["variant", "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'", "'default'", "Visual style."],
      ["render", "ReactNode", "-", "Optional custom render target."],
      ["className", "string", "-", "Additional CSS classes."],
    ],
    features: ["Status labels", "Variants", "Inline metadata", "Compact counters"],
  },
  {
    slug: "card",
    title: "Card",
    description: "Structured content container with header, content and footer slots.",
    icon: LayoutDashboardIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["size", "'default' | 'sm'", "'default'", "Card density."],
      ["className", "string", "-", "Additional CSS classes."],
      ["children", "ReactNode", "-", "Composed card content."],
    ],
    features: ["Header/footer slots", "Compact size", "Dashboard modules", "Composed content"],
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "Segmented navigation for switching views without leaving the current route.",
    icon: Layers3Icon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["value", "string", "-", "Controlled active tab."],
      ["defaultValue", "string", "-", "Initial tab."],
      ["orientation", "'horizontal' | 'vertical'", "'horizontal'", "Tab list direction."],
      ["disabled", "boolean", "false", "Disables a trigger."],
    ],
    features: ["Segmented nav", "Panel switching", "Controlled state", "Settings sections"],
  },
  {
    slug: "collapse",
    title: "Collapse",
    description: "Expandable disclosure surface for FAQs, dense settings, and progressive detail blocks.",
    icon: WorkflowIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["open", "boolean", "-", "Controlled open state for a single collapse item."],
      ["defaultOpen", "boolean", "false", "Initial uncontrolled open state."],
      ["onOpenChange", "(open) => void", "-", "Open state callback."],
      ["items", "CollapseItem[]", "-", "Grouped disclosure items for `CollapseGroup`."],
      ["type", "'single' | 'multiple'", "'multiple'", "Whether one or many group items can stay open."],
    ],
    features: ["Disclosure sections", "Controlled state", "Grouped items", "Dense content reveal"],
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "Focused modal surface for confirmation flows, forms and destructive actions.",
    icon: AlertCircleIcon,
    category: "Overlay",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["open", "boolean", "-", "Controlled open state."],
      ["defaultOpen", "boolean", "false", "Initial open state."],
      ["onOpenChange", "(open) => void", "-", "Open state callback."],
      ["showCloseButton", "boolean", "true", "Toggles the close affordance."],
    ],
    features: ["Modal trigger", "Overlay", "Header/footer slots", "Close actions"],
  },
  {
    slug: "popover",
    title: "Popover",
    description: "Lightweight anchored overlay for context actions and compact helper content.",
    icon: SparklesIcon,
    category: "Overlay",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["side", "'top' | 'right' | 'bottom' | 'left'", "'bottom'", "Popup side."],
      ["align", "'start' | 'center' | 'end'", "'center'", "Popup alignment."],
      ["sideOffset", "number", "4", "Distance from trigger."],
      ["children", "ReactNode", "-", "Trigger and content composition."],
    ],
    features: ["Anchored overlay", "Title/description", "Action menus", "Compact help content"],
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Menu overlays with action, checkbox and radio items for dense navigation.",
    icon: ComponentIcon,
    category: "Overlay",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["open", "boolean", "-", "Controlled open state."],
      ["onOpenChange", "(open) => void", "-", "Open state callback."],
      ["children", "ReactNode", "-", "Trigger and content composition."],
      ["side", "'top' | 'right' | 'bottom' | 'left'", "'bottom'", "Popup side."],
      ["align", "'start' | 'center' | 'end'", "'start'", "Popup alignment."],
      ["sideOffset", "number", "4", "Distance from trigger."],
      ["disabled", "boolean", "false", "Disable menu interaction."],
    ],
    features: ["Dropdown patterns", "Checkbox items", "Radio groups", "Shortcut labels"],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "Compact hover and focus hint for controls that need one short piece of guidance.",
    icon: SparklesIcon,
    category: "Overlay",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["content", "ReactNode", "-", "Tooltip label or helper content."],
      ["side", "'top' | 'bottom' | 'left' | 'right'", "'top'", "Placement around the trigger."],
      ["disabled", "boolean", "false", "Disables tooltip rendering."],
      ["children", "ReactNode", "-", "Trigger content wrapped by the tooltip."],
    ],
    features: ["Short helper copy", "Hover + focus", "Side placement", "Low-noise guidance"],
  },
  {
    slug: "right-click-menu",
    title: "Right Click Menu",
    description: "Context menu surface for dense workspaces that need pointer-driven secondary actions.",
    icon: MousePointerClickIcon,
    category: "Overlay",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["items", "RightClickMenuItem[]", "-", "Context actions shown after right click."],
      ["children", "ReactNode", "-", "Target area that owns the right-click interaction."],
      ["className", "string", "-", "Wrapper classes for the interaction zone."],
    ],
    features: ["Context actions", "Pointer workflow", "Compact menus", "Workspace interactions"],
  },
  {
    slug: "confirm-dialog",
    title: "Confirm Dialog",
    description: "Clear confirm overlays for safe destructive and irreversible actions.",
    icon: AlertCircleIcon,
    category: "Overlay",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["open", "boolean", "-", "Controlled open state."],
      ["onOpenChange", "(open) => void", "-", "Open state callback for parent-driven flow."],
      ["title", "string", "-", "Dialog title text."],
      ["description", "string", "-", "Secondary context and scope text."],
      ["confirmText", "string", "'Confirm'", "Primary action label."],
      ["confirmVariant", "'default' | 'destructive'", "'default'", "Primary button emphasis."],
      ["isLoading", "boolean", "false", "Disables actions while async action runs."],
      ["onConfirm", "() => void | Promise<void>", "-", "Required confirm handler."],
    ],
    features: ["Destructive confirmations", "Controlled usage", "Async confirm", "Clear copy guidance"],
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    description: "Reusable application sidebar with header, footer, active states, collapsed mode and custom link rendering.",
    icon: LayoutDashboardIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["items", "SidebarItem[]", "[]", "Sidebar entries with active, disabled, badge and callback state."],
      ["header", "ReactNode", "-", "Optional content rendered above navigation items."],
      ["footer", "ReactNode", "-", "Optional footer actions or account area."],
      ["collapsed", "boolean", "false", "Compact sidebar mode for dense layouts."],
      ["onItemSelect", "(item) => void", "-", "Called when a sidebar item is selected."],
      ["renderItem", "(item, state) => ReactNode", "-", "Override full item rendering."],
      ["renderLink", "(props) => ReactNode", "-", "Override anchor rendering for router integration."],
    ],
    features: ["Navigation sidebar", "Collapsed state", "Header and footer slots", "Router-friendly rendering"],
  },
  {
    slug: "workspace-layout",
    title: "Workspace Layout",
    description: "Viewport-safe shell with fixed navigation, structured header and independently scrolling main content.",
    icon: LayoutDashboardIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["viewport", "boolean", "true", "Use dynamic viewport height and prevent body scrolling."],
      ["SidebarProvider", "Component", "-", "Coordinates desktop collapse and mobile drawer state."],
      ["WorkspaceContent", "Component", "-", "Contains header and route content without overflow leaks."],
      ["WorkspaceHeader", "Component", "-", "Canonical product header for shell-level controls."],
      ["WorkspaceMain", "Component", "-", "Owns route scrolling and optional responsive padding."],
    ],
    features: ["Viewport-safe shell", "Provider-driven sidebar", "Independent main scroll", "Mobile navigation state"],
  },
  {
    slug: "breadcrumbs",
    title: "Breadcrumbs",
    description: "Navigation breadcrumbs with current context, overflow collapse, and custom link rendering.",
    icon: ChevronRightIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["items", "BreadcrumbItem[]", "-", "Breadcrumb sequence for navigation context."],
      ["separator", "ReactNode", "-", "Custom separator between items."],
      ["maxItems", "number", "-", "Collapses middle items when the path gets too long."],
      ["renderLink", "(props) => ReactNode", "-", "Custom link renderer for each item."],
      ["currentItemLabel", "string", "-", "Accessible label for the current page item."],
    ],
    features: ["Navigation context", "Custom separators", "Custom links", "Current state support"],
  },
  {
    slug: "page-header",
    title: "Page Header",
    description: "Top-level page heading block with breadcrumbs, actions and optional meta area.",
    icon: CreditCardIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["title", "ReactNode", "-", "Primary heading text."],
      ["description", "ReactNode", "-", "Subtext explanation for current page."],
      ["eyebrow", "ReactNode", "-", "Small uppercase lead text."],
      ["breadcrumbs", "ReactNode", "-", "Optional breadcrumb trail."],
      ["actions", "ReactNode", "-", "Actions rendered on the right side."],
      ["meta", "ReactNode", "-", "Secondary metadata block."],
      ["sticky", "boolean", "false", "Enable sticky positioning in scroll containers."],
    ],
    features: ["Page context", "Action areas", "Breadcrumb composition", "Sticky header option"],
  },
  {
    slug: "info-card",
    title: "Info Card",
    description: "Flexible context card for summaries, metadata, quick actions, and supporting media inside real product surfaces.",
    icon: FileTextIcon,
    category: "Data Display",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["eyebrow", "ReactNode", "-", "Small label above card title."],
      ["title", "ReactNode", "-", "Main card title."],
      ["description", "ReactNode", "-", "Supporting description text."],
      ["icon", "ReactNode", "-", "Optional leading icon."],
      ["actions", "ReactNode", "-", "Card action area."],
      ["media", "ReactNode", "-", "Optional media block."],
      ["compact", "boolean", "false", "Compact card density."],
      ["orientation", "'vertical' | 'horizontal'", "'vertical'", "Content layout direction."],
    ],
    features: ["Metadata summaries", "Action regions", "Media slots", "Vertical or horizontal layout"],
  },
  {
    slug: "activity-feed",
    title: "Activity Feed",
    description: "Timeline-like feed list for events, audits and recent activity surfaces.",
    icon: BadgeIcon,
    category: "Data Display",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["items", "ActivityFeedItem[]", "-", "List of timeline-like activity rows."],
      ["title", "ReactNode", "-", "Feed title."],
      ["description", "ReactNode", "-", "Supporting card description."],
      ["actions", "ReactNode", "-", "Optional header actions."],
      ["empty", "ReactNode", "-", "Fallback when there are no items."],
      ["compact", "boolean", "false", "Compact feed density."],
      ["itemClassName", "string", "-", "Class for each feed item."],
    ],
    features: ["Audit timeline", "Empty state handling", "Compact mode", "Action rows"],
  },
  {
    slug: "state-view",
    title: "State View",
    description: "Canonical empty, loading, error, success and informational state surface for routes and embedded panels.",
    icon: AlertCircleIcon,
    category: "Data Display",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["status", "StateViewStatus", "'empty'", "Controls semantics, icon and default copy."],
      ["variant", "'card' | 'plain' | 'inline'", "'card'", "Selects the surrounding surface."],
      ["size", "'compact' | 'default' | 'page'", "'default'", "Controls density and minimum height."],
      ["onRetry", "() => void", "-", "Adds a consistent recovery action."],
      ["onClear", "() => void", "-", "Adds clear behavior for filtered empty states."],
      ["loadingVariant", "'spinner' | 'skeleton' | 'progress'", "'spinner'", "Selects loading feedback."],
    ],
    features: ["One canonical state API", "Accessible live regions", "Retry and clear actions", "Spinner, skeleton and progress"],
  },
  {
    slug: "data-state",
    title: "Data State",
    description: "Unified data state block for empty, search-empty, loading, error and success surfaces.",
    icon: AlertCircleIcon,
    category: "Data Display",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["status", "\"idle\" | \"loading\" | \"empty\" | \"error\" | \"success\"", "-", "State preset that controls default copy and icon."],
      ["title", "ReactNode", "-", "Primary state title."],
      ["description", "ReactNode", "-", "Short explanation for the current state."],
      ["variant", "\"card\" | \"plain\" | \"inline\"", "\"card\"", "Container style for page, table and inline usage."],
      ["query", "ReactNode", "-", "Optional searched value for empty search results."],
      ["actions", "ReactNode", "-", "Custom action elements."],
      ["onRetry", "() => void", "-", "Retry callback for error/loading recovery."],
      ["onClear", "() => void", "-", "Clear callback for search-empty states."],
    ],
    features: ["Empty/search-empty states", "Error retry", "Plain table fallback", "Inline state rows"],
  },
  {
    slug: "loading-state",
    title: "Loading State",
    description: "Scoped loading block with spinner, skeleton, or progress variants for real route and panel states.",
    icon: SparklesIcon,
    category: "Data Display",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["label", "ReactNode", "-", "Loading heading."],
      ["description", "ReactNode", "-", "Loading explanation text."],
      ["icon", "ReactNode", "-", "Optional loading icon."],
      ["variant", "'spinner' | 'skeleton' | 'progress'", "'spinner'", "Visual loading style."],
      ["progress", "number", "-", "Progress amount when `variant` is `progress`."],
      ["className", "string", "-", "Container class override."],
    ],
    features: ["Spinner, skeleton and progress", "Section loading labels", "Scoped placeholders", "Custom icon"],
  },
  {
    slug: "scroll-box",
    title: "Scroll Box",
    description: "Scoped scrolling surface for dense lists, side panels, and bounded data regions.",
    icon: PanelTopIcon,
    category: "Data Display",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["maxHeight", "string | number", "-", "Maximum rendered height before scroll starts."],
      ["axis", "'y' | 'x' | 'both'", "'y'", "Allowed scroll direction."],
      ["children", "ReactNode", "-", "Scrollable content."],
      ["className", "string", "-", "Container classes."],
    ],
    features: ["Bounded scroll", "Axis control", "Dense lists", "Panel content"],
  },
  {
    slug: "toast",
    title: "Toast",
    description: "Global transient messaging system with provider, stacking, promise states, placement and dismiss behavior.",
    icon: ShieldCheckIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["children", "ReactNode", "-", "Application children wrapped by provider."],
      ["position", "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", "'top-right'", "Toast container placement."],
      ["defaultDuration", "number", "3000", "Default auto-dismiss duration in ms."],
      ["maxToasts", "number", "5", "Maximum number of visible toasts."],
      ["pauseOnHover", "boolean", "true", "Pause dismiss timer when hovered."],
      ["addToast", "(input) => string", "-", "API to push a toast from context."],
      ["success/info/warning/error/loading", "(input) => string", "-", "Tone helpers for common outcomes."],
      ["promise", "(promise, messages) => Promise<T>", "-", "Tracks loading/success/error from async work."],
    ],
    features: ["Provider setup", "Stacking and duration", "Promise states", "Placement options"],
  },
  {
    slug: "table",
    title: "Table primitive",
    description: "Low-level semantic table pieces for internal composition, not the primary public data-grid showcase.",
    icon: Table2Icon,
    category: "Data Display",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["className", "string", "-", "Additional table styling."],
      ["children", "ReactNode", "-", "Header, body and row markup."],
      ["caption", "ReactNode", "-", "Optional table caption."],
    ],
    features: ["Semantic rows", "Header/body slots", "Internal composition", "Primitive markup"],
  },
  {
    slug: "kbd",
    title: "Kbd",
    description: "Keyboard hint token for shortcuts, command palettes, and focused action labels.",
    icon: TerminalSquareIcon,
    category: "Components",
    status: "Stable",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["size", "'sm' | 'default' | 'lg'", "'default'", "Visual size for the key token."],
      ["variant", "'default' | 'outline' | 'ghost'", "'default'", "Surface treatment."],
      ["children", "ReactNode", "-", "Rendered key label."],
      ["className", "string", "-", "Extra classes for the token."],
    ],
    features: ["Shortcut tokens", "Size variants", "Outline or ghost style", "Command labels"],
  },
  {
    slug: "data-table",
    title: "Data Table",
    description: "Primary reusable admin data grid with sorting, row selection, bulk actions, saved views, mobile cards, and server-aware pagination.",
    icon: Table2Icon,
    category: "Data Display",
    status: "Preview",
    installCommand: PACKAGE_INSTALL_COMMAND,
    propsRows: [
      ["columns", "ColumnDef<RowData>[]", "-", "Table column definitions."],
      ["data", "Array<RowData>", "-", "Row data at current page in server mode."],
      ["getRowId", "(row) => string", "-", "Stable row identifier function."],
      ["sorting", "SortingState", "[]", "Controlled sort state."],
      ["rowSelection", "RowSelectionState", "{}", "Controlled row selection state."],
      ["enableRowSelection", "boolean", "false", "Turns row selection on."],
      ["pagination", "PaginationStateProps", "-", "Page controls, counts and page size."],
      ["toolbarProps", "ToolbarProps", "-", "Header actions, search and contextual controls."],
      ["onRowClick", "(row) => void", "-", "Row click callback."],
      ["isLoading", "boolean", "false", "Loading indicator state."],
      ["isError", "boolean", "false", "Error state flag for fallback."],
      ["loadingState", "LoadingState", "-", "Loading UI when `isLoading` is true."],
      ["emptyState", "Omit<DataStateProps, \"status\">", "-", "State shown when no rows are present."],
      ["errorState", "ErrorState", "-", "State shown when `isError` is true."],
    ],
    features: ["Column-based API", "Sorting and pagination", "Row selection and bulk actions", "Toolbar, visibility and saved views", "Mobile cards and server mode", "Empty/loading/error states"],
  },
]

export const componentRelations: ComponentRelationMap = {
  button: {
    groupSlugs: ["actions", "navigation", "layout"],
    componentSlugs: ["badge", "card", "tabs"],
  },
  input: {
    groupSlugs: ["form", "filters"],
    componentSlugs: ["textarea", "select", "switch"],
  },
  textarea: {
    groupSlugs: ["form", "layout"],
    componentSlugs: ["input", "card", "badge"],
  },
  select: {
    groupSlugs: ["filters", "overlay"],
    componentSlugs: ["select", "async-select", "form-select"],
  },
  "radio-group": {
    groupSlugs: ["form"],
    componentSlugs: ["checkbox", "switch", "select"],
  },
  "async-select": {
    groupSlugs: ["form", "filters"],
    componentSlugs: ["select", "async-select", "form-select"],
  },
  "async-multi-select": {
    groupSlugs: ["form"],
    componentSlugs: ["select", "async-select", "form-select"],
  },
  "date-picker": {
    groupSlugs: ["form", "display"],
    componentSlugs: ["calendar", "date-range-picker"],
  },
  "date-range-picker": {
    groupSlugs: ["form", "filters"],
    componentSlugs: ["date-picker", "calendar", "data-table"],
  },
  "form-field-shell": {
    groupSlugs: ["form"],
    componentSlugs: ["form-input", "form-select", "form-textarea", "form-switch", "input", "textarea", "switch"],
  },
  "form-input": {
    groupSlugs: ["form"],
    componentSlugs: ["form-field-shell", "form-textarea", "input"],
  },
  "form-select": {
    groupSlugs: ["form"],
    componentSlugs: ["async-select", "select", "form-field-shell"],
  },
  "form-textarea": {
    groupSlugs: ["form"],
    componentSlugs: ["form-input", "textarea", "form-field-shell"],
  },
  "form-switch": {
    groupSlugs: ["form"],
    componentSlugs: ["form-field-shell", "switch", "checkbox", "form-builder"],
  },
  "form-date-range-input": {
    groupSlugs: ["form", "filters"],
    componentSlugs: ["date-range-picker", "form-date-range-picker", "form-field-shell"],
  },
  "form-date-picker": {
    groupSlugs: ["form"],
    componentSlugs: ["date-picker", "calendar", "form-field-shell"],
  },
  "form-date-range-picker": {
    groupSlugs: ["form", "filters"],
    componentSlugs: ["date-range-picker", "form-date-range-input", "calendar", "form-field-shell"],
  },
  "form-builder": {
    groupSlugs: ["patterns", "form"],
    componentSlugs: ["form-field-shell", "form-input", "form-switch", "form-textarea", "form-select"],
  },
  checkbox: {
    groupSlugs: ["form"],
    componentSlugs: ["switch", "button", "card"],
  },
  switch: {
    groupSlugs: ["layout"],
    componentSlugs: ["checkbox", "tabs", "badge"],
  },
  badge: {
    groupSlugs: ["actions", "display"],
    componentSlugs: ["button", "card", "tabs"],
  },
  card: {
    groupSlugs: ["layout", "display", "actions"],
    componentSlugs: ["tabs", "badge", "button"],
  },
  tabs: {
    groupSlugs: ["navigation", "layout"],
    componentSlugs: ["dialog", "card", "button"],
  },
  collapse: {
    groupSlugs: ["layout", "display", "form"],
    componentSlugs: ["tabs", "card"],
  },
  dialog: {
    groupSlugs: ["overlay", "notifications"],
    componentSlugs: ["popover", "confirm-dialog"],
  },
  popover: {
    groupSlugs: ["overlay", "navigation"],
    componentSlugs: ["dropdown-menu", "dialog", "confirm-dialog"],
  },
  "dropdown-menu": {
    groupSlugs: ["overlay", "navigation", "actions"],
    componentSlugs: ["popover", "dialog", "confirm-dialog"],
  },
  tooltip: {
    groupSlugs: ["overlay", "actions", "form"],
    componentSlugs: ["popover", "button", "input"],
  },
  "right-click-menu": {
    groupSlugs: ["overlay", "actions", "navigation"],
    componentSlugs: ["dropdown-menu", "popover", "data-table"],
  },
  "confirm-dialog": {
    groupSlugs: ["overlay", "notifications"],
    componentSlugs: ["dialog", "alert-dialog"],
  },
  table: {
    groupSlugs: ["data-table", "display", "filters"],
    componentSlugs: ["card", "tabs", "badge"],
  },
  "data-table": {
    groupSlugs: ["data-table", "layout", "filters"],
    componentSlugs: ["table", "card", "tabs"],
  },
  sidebar: {
    groupSlugs: ["layout", "navigation"],
    componentSlugs: ["breadcrumbs"],
  },
  breadcrumbs: {
    groupSlugs: ["layout", "navigation"],
    componentSlugs: ["section", "sidebar"],
  },
  "info-card": {
    groupSlugs: ["display", "layout"],
    componentSlugs: ["activity-feed", "card"],
  },
  "activity-feed": {
    groupSlugs: ["display"],
    componentSlugs: ["info-card"],
  },
  "data-state": {
    groupSlugs: ["display"],
    componentSlugs: ["loading-state", "data-table"],
  },
  "loading-state": {
    groupSlugs: ["display"],
    componentSlugs: ["data-state", "data-table"],
  },
  "scroll-box": {
    groupSlugs: ["display", "layout"],
    componentSlugs: ["table", "data-table"],
  },
  toast: {
    groupSlugs: ["notifications", "overlay"],
    componentSlugs: ["confirm-dialog", "dialog"],
  },
  kbd: {
    groupSlugs: ["command", "actions"],
    componentSlugs: ["button", "tooltip", "input"],
  },
}

const primaryComponentSurfaceSlugs = new Set([
  "button",
  "input",
  "select",
  "date-picker",
  "checkbox",
  "switch",
  "badge",
  "card",
  "tabs",
  "dialog",
  "popover",
  "dropdown-menu",
  "sidebar",
  "breadcrumbs",
  "data-table",
  "info-card",
  "activity-feed",
  "loading-state",
  "toast",
  "notification-center",
  "progress",
])

const componentPrimarySurfaceParent: Record<string, string> = {
  textarea: "input",
  "tag-input": "input",
  "otp-input": "input",
  "form-input": "input",
  "form-textarea": "input",
  "async-select": "select",
  "async-multi-select": "select",
  "form-select": "select",
  calendar: "date-picker",
  "date-range-picker": "date-picker",
  "form-date-range-input": "date-picker",
  "form-date-picker": "date-picker",
  "form-date-range-picker": "date-picker",
  "confirm-dialog": "dialog",
  "app-header": "workspace-layout",
  section: "sidebar",
  toolbar: "sidebar",
  "split-layout": "sidebar",
  "page-header": "breadcrumbs",
  table: "data-table",
}

const componentSurfaceSections: Partial<Record<string, ComponentSurfaceSectionMeta[]>> = {
  input: [
    {
      key: "core",
      title: "Core input surfaces",
      description: "Start with the default text field and move outward only when the workflow demands specialization.",
      slugs: ["input", "textarea"],
    },
    {
      key: "related",
      title: "Related input patterns",
      description: "Specialized input types for search, masking, numeric entry, and compact structured values.",
      slugs: ["tag-input", "otp-input"],
    },
    {
      key: "integrations",
      title: "Form integrations",
      description: "Use these wrappers when the field needs to plug directly into shared form shells or React Hook Form.",
      slugs: ["form-input", "form-textarea"],
    },
  ],
  select: [
    {
      key: "core",
      title: "Core select surfaces",
      description: "Use the base selection control first, then expand only when the interaction model truly changes.",
      slugs: ["select"],
    },
    {
      key: "related",
      title: "Related select members",
      description: "These members add real behavior such as remote loading or keyboard-first local filtering.",
      slugs: ["async-select"],
    },
    {
      key: "integrations",
      title: "Form integrations",
      description: "Use wrapped selects when you need consistent form-level validation, labels, and shell behavior.",
      slugs: ["form-select"],
    },
  ],
  "date-picker": [
    {
      key: "core",
      title: "Core date surfaces",
      description: "Choose the popover picker or range picker when visual selection matters more than raw text entry.",
      slugs: ["date-picker", "date-range-picker", "calendar"],
    },
    {
      key: "integrations",
      title: "Form integrations",
      description: "Use wrapped date fields when validation, labels, and form shell behavior should stay standardized.",
      slugs: ["form-input", "form-date-range-input", "form-date-picker", "form-date-range-picker"],
    },
  ],
  dialog: [
    {
      key: "core",
      title: "Core overlay surfaces",
      description: "Use the lightest overlay that still matches the interaction. Do not default every action to a full modal.",
      slugs: ["dialog", "popover", "dropdown-menu"],
    },
    {
      key: "advanced",
      title: "Confirmation and shell patterns",
      description: "These composed overlays handle destructive confirmation and side-drawer editing flows.",
      slugs: ["confirm-dialog", "drawer"],
    },
  ],
  sidebar: [
    {
      key: "core",
      title: "Sidebar surfaces",
      description: "These pieces define the reusable sidebar surface first, then layer shell framing around it only when the route really needs it.",
      slugs: ["sidebar", "breadcrumbs"],
    },
    {
      key: "related",
      title: "Route-level patterns",
      description: "Use these patterns only after the sidebar and navigation contract are already clear.",
      slugs: ["section", "toolbar", "split-layout"],
    },
  ],
  "data-table": [
    {
      key: "core",
      title: "Primary data table surface",
      description: "Start with the full DataTable route first. It demonstrates the reusable grid the way product teams actually consume it.",
      slugs: ["data-table"],
    },
    {
      key: "related",
      title: "Supporting primitive",
      description: "Drop down to the semantic table primitive only when you do not need the full DataTable workflow.",
      slugs: ["table"],
    },
  ],
  toast: [
    {
      key: "core",
      title: "Global feedback surface",
      description: "Use toast messaging for transient global feedback, not for critical form validation or persistent page states.",
      slugs: ["toast"],
    },
  ],
}

type KitRegistryFile = {
  groups?: Record<string, string[]>
  migrationAliases?: Record<string, string>
  recommended?: string[]
}

const kitRegistry = tembroRegistry as KitRegistryFile
const kitGroups = kitRegistry?.groups ?? {}
const kitRecommendedSlugs = new Set((kitRegistry?.recommended ?? []).map((slug) => slug))
const kitMigrationAliases = kitRegistry?.migrationAliases ?? {}
const migrationAliasTargets = new Set(Object.values(kitMigrationAliases))

const internalComponentCatalogSlugs = new Set([
  "app-header",
  "async-multi-select",
  "form",
  "form-field",
  "form-field-shell",
  "form-input",
  "form-select",
  "form-switch",
  "form-textarea",
  "page-header",
])

const hiddenKitGroups = new Set(["kits"])
const hiddenKitSlugs = new Set(["all", "dashboard", "calendar-kit", "wizard-kit", ...internalComponentCatalogSlugs])
const skippedKitGroups = new Set(["hooks"])

const fallbackRegistryCategoryByGroup: Record<string, ComponentCatalogItem["category"]> = {
  ui: "Components",
  actions: "Components",
  layout: "Components",
  feedback: "Data Display",
  display: "Data Display",
  overlay: "Overlay",
  form: "Forms",
  dataTable: "Data Display",
  data_table: "Data Display",
  navigation: "Data Display",
  filters: "Data Display",
  calendar: "Data Display",
  upload: "Data Display",
  wizard: "Data Display",
  notifications: "Data Display",
  command: "Data Display",
  patterns: "Patterns",
}

const fallbackRegistryIconByGroup: Record<string, LucideIcon> = {
  ui: ComponentIcon,
  actions: SparklesIcon,
  feedback: WalletIcon,
  display: DatabaseIcon,
  overlay: PanelTopIcon,
  inputs: FormInputIcon,
  form: FormInputIcon,
  dataTable: Table2Icon,
  data_table: Table2Icon,
  layout: LayoutDashboardIcon,
  navigation: BoxIcon,
  filters: SlidersHorizontalIcon,
  calendar: CalendarClockIcon,
  upload: FileTextIcon,
  wizard: WorkflowIcon,
  notifications: BellIcon,
  command: TerminalSquareIcon,
  patterns: BlocksIcon,
  hooks: SmartphoneIcon,
}

function slugToTitle(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1))
    .join(" ")
}

const fallbackRegistryFeaturesByGroup: Record<string, string[]> = {
  ui: ["Composable primitive", "Variant-ready styling", "Keyboard and focus-friendly defaults", "Local source-copy customization"],
  actions: ["Action composition", "Icon and label pairing", "Keyboard and focus-friendly defaults", "Dense toolbar usage"],
  feedback: ["Inline status messaging", "Loading, empty or error context", "Accessible status copy", "Actionable recovery guidance"],
  display: ["Structured content display", "Empty and loading state support", "Accessible reading order", "Responsive data presentation"],
  overlay: ["Focused overlay behavior", "Escape and outside-click handling", "Accessible focus management", "Compact action footer"],
  inputs: ["Controlled value support", "Validation-ready states", "Keyboard and focus-friendly defaults", "Form-friendly composition"],
  form: ["Form shell integration", "Validation and error states", "Accessible label contract", "Reusable field composition"],
  dataTable: ["Data workflow composition", "Sorting/filtering integration", "Accessible row and header semantics", "Responsive operator surfaces"],
  data_table: ["Data workflow composition", "Sorting/filtering integration", "Accessible row and header semantics", "Responsive operator surfaces"],
  layout: ["Route-level structure", "Navigation-aware composition", "Responsive shell behavior", "Reusable product framing"],
  navigation: ["Section navigation", "Current state support", "Keyboard and focus-friendly defaults", "Route-friendly links"],
  filters: ["Search and filter composition", "Saved or reusable filter state", "Accessible control labels", "Data-table integration"],
  calendar: ["Date selection workflow", "Boundary and disabled-date support", "Keyboard and focus-friendly defaults", "Scheduling-ready layout"],
  upload: ["File interaction workflow", "Preview and progress states", "Accessible upload guidance", "Validation-ready constraints"],
  wizard: ["Step flow composition", "Progress and completion state", "Keyboard and focus-friendly defaults", "Guided form workflow"],
  notifications: ["Transient status messaging", "Unread and dismiss flows", "Accessible notification copy", "Async completion feedback"],
  command: ["Keyboard-first discovery", "Search and grouped actions", "Accessible command labels", "Route or action execution"],
  patterns: ["Composed product workflow", "Reusable screen section", "Accessible structure", "Production layout starting point"],
}

const fallbackRegistryDescriptionByGroup: Record<string, string> = {
  ui: "Reusable primitive for product interfaces with source-copy styling and predictable focus behavior.",
  actions: "Action surface for dense product workflows, toolbar controls and copy-friendly command areas.",
  feedback: "Status surface for communicating loading, empty, success, warning or error context with a clear next step.",
  display: "Read-oriented surface for presenting operational content, metadata, timelines or structured records.",
  overlay: "Focused overlay pattern for short decisions, contextual actions and contained editing flows.",
  inputs: "Input surface for controlled values, validation states and form-ready interaction patterns.",
  form: "Form composition helper for labels, validation, controlled values and repeatable field structure.",
  dataTable: "Data workflow helper for reusable tables, row actions, filtering, selection and responsive records.",
  data_table: "Data workflow helper for reusable tables, row actions, filtering, selection and responsive records.",
  layout: "Layout helper for route-level structure, navigation context and reusable application shells.",
  navigation: "Navigation helper for route-aware sections, current state and keyboard-friendly movement.",
  filters: "Filter composition helper for search, chips, saved views and data narrowing workflows.",
  calendar: "Date and schedule surface for reporting, planning, disabled-date rules and calendar-style selection.",
  upload: "Upload workflow surface for files, images, preview states, progress and validation guidance.",
  wizard: "Guided workflow surface for multi-step forms, progress state and step-by-step completion.",
  notifications: "Notification surface for async status, unread activity, dismiss behavior and transient updates.",
  command: "Command surface for keyboard-first search, grouped actions and fast route or action discovery.",
  patterns: "Composed product pattern that combines primitives into reusable production screen sections.",
}

function getFallbackFeatures(group: string) {
  return fallbackRegistryFeaturesByGroup[group] ?? [
    "Source-copy component",
    "Composable product usage",
    "Keyboard and focus-friendly defaults",
    "Local customization",
  ]
}

function getFallbackDescription(group: string, title: string) {
  return `${title}. ${fallbackRegistryDescriptionByGroup[group] ?? "Reusable source-copy surface for production product interfaces."}`
}

const baseComponentSlugs = new Set(baseComponentCatalog.map((item) => item.slug))
const generatedComponentCatalog = new Map<string, ComponentCatalogItem>()
for (const [group, groupSlugs] of Object.entries(kitGroups)) {
  if (hiddenKitGroups.has(group) || skippedKitGroups.has(group)) continue

  for (const slug of groupSlugs) {
    const aliasTarget = kitMigrationAliases[slug]
    const effectiveSlug = aliasTarget ?? slug
    if (!slug || hiddenKitSlugs.has(slug) || hiddenKitSlugs.has(effectiveSlug)) continue
    if (
      (migrationAliasTargets.has(effectiveSlug) && !isPublicComponentSurfaceSlug(effectiveSlug)) ||
      (migrationAliasTargets.has(slug) && !isPublicComponentSurfaceSlug(slug))
    ) continue
    if (baseComponentSlugs.has(effectiveSlug) || generatedComponentCatalog.has(effectiveSlug)) continue
      const category = fallbackRegistryCategoryByGroup[group] ?? "Data Display"
      const icon = fallbackRegistryIconByGroup[group] ?? SparklesIcon

    generatedComponentCatalog.set(effectiveSlug, {
      slug: effectiveSlug,
      title: aliasTarget ? slugToTitle(aliasTarget) : slugToTitle(effectiveSlug),
      description: getFallbackDescription(group, slugToTitle(effectiveSlug)),
      icon,
      category,
      status: kitRecommendedSlugs.has(effectiveSlug) ? "Stable" : "Preview",
      installCommand: PACKAGE_INSTALL_COMMAND,
      propsRows: [
        ["className", "string", "-", "Additional classes for wrapper element."],
        ["children", "ReactNode", "-", "Optional composed content or custom slots when the component supports composition."],
        ["aria-label", "string", "-", "Accessible label for icon-only, compact, or non-text usage."],
      ],
      features: getFallbackFeatures(group),
    })
  }
}

const fallbackComponentCatalog = [...generatedComponentCatalog.values()]
export const componentCatalog: ComponentCatalogItem[] = [...baseComponentCatalog, ...fallbackComponentCatalog].filter(
  (item) => !internalComponentCatalogSlugs.has(item.slug)
)

const packageDocsSurfaceCatalog: ComponentCatalogItem[] = []

const packageDocsSurfaceCatalogMap = new Map(packageDocsSurfaceCatalog.map((item) => [item.slug, item] as const))
const hiddenPrimaryComponentCatalogSlugs = new Set([
  ...internalComponentCatalogSlugs,
  "app-header",
  "page-header",
  "resource-page",
  "resource-detail-page",
])
const hiddenDirectoryComponentSlugs = new Set([...hiddenPrimaryComponentCatalogSlugs, ...legacyComponentSlugAliases.keys()])

export function getComponentSurfaceCatalogItem(slug?: string) {
  if (!slug) return undefined

  const canonicalSlug = resolveLegacyComponentSlug(slug)
  const primarySurfaceSlug = getPrimaryComponentSurfaceSlug(canonicalSlug)

  if (canonicalSlug !== primarySurfaceSlug) {
    return (
      packageDocsSurfaceCatalogMap.get(primarySurfaceSlug) ??
      componentCatalog.find((entry) => entry.slug === primarySurfaceSlug)
    )
  }

  return packageDocsSurfaceCatalogMap.get(canonicalSlug) ?? componentCatalog.find((item) => item.slug === canonicalSlug)
}

export function isPrimaryComponentSurface(slug: string) {
  return packageDocsSurfaceCatalogMap.has(resolveLegacyComponentSlug(slug)) || primaryComponentSurfaceSlugs.has(resolveLegacyComponentSlug(slug))
}

export function getPrimaryComponentSurfaceSlug(slug: string) {
  const canonicalSlug = resolveLegacyComponentSlug(slug)
  return isPrimaryComponentSurface(canonicalSlug) ? canonicalSlug : componentPrimarySurfaceParent[canonicalSlug] ?? canonicalSlug
}

export function getPrimaryComponentSurfaceTitle(slug: string) {
  const primarySlug = getPrimaryComponentSurfaceSlug(slug)
  return getComponentSurfaceCatalogItem(primarySlug)?.title ?? slug
}

export function getPrimaryComponentCatalog() {
  const primaryItems = componentCatalog.filter((item) => getPrimaryComponentSurfaceSlug(item.slug) === item.slug)
  const merged = new Map<string, ComponentCatalogItem>()

  for (const item of primaryItems) {
    merged.set(item.slug, item)
  }

  for (const item of packageDocsSurfaceCatalog) {
    merged.set(item.slug, item)
  }

  return Array.from(merged.values())
    .filter((item) => !hiddenPrimaryComponentCatalogSlugs.has(item.slug))
    .filter((item) => isPublicComponentSurfaceSlug(item.slug))
    .sort((left, right) => {
      const surfaceOrder = comparePublicComponentSurfaceOrder(left.slug, right.slug)
      if (surfaceOrder !== 0) return surfaceOrder
      return left.title.localeCompare(right.title)
    })
}

export function getVisibleComponentCatalog() {
  const merged = new Map<string, ComponentCatalogItem>()

  for (const item of componentCatalog) {
    merged.set(item.slug, item)
  }

  for (const item of packageDocsSurfaceCatalog) {
    merged.set(item.slug, item)
  }

  return Array.from(merged.values())
    .filter((item) => !hiddenDirectoryComponentSlugs.has(item.slug))
    .sort((left, right) => left.title.localeCompare(right.title))
}

export function getComponentDetailSidebarItems(activeSlug?: string): ComponentDetailSidebarItem[] {
  const activePrimary = activeSlug ? getPrimaryComponentSurfaceSlug(activeSlug) : undefined

  return getPrimaryComponentCatalog()
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      href: componentDocsPath(item.slug),
      status: item.status,
      group: getComponentGroup(item.slug),
      active: activePrimary ? getPrimaryComponentSurfaceSlug(item.slug) === activePrimary : false,
    }))
    .sort((left, right) => left.title.localeCompare(right.title))
}

export function getComponentDetailSidebarSections(activeSlug?: string): ComponentDetailSidebarSection[] {
  const sections = new Map<string, ComponentDetailSidebarSection>()

  for (const item of getComponentDetailSidebarItems(activeSlug)) {
    const firstLetter = item.title[0]?.toUpperCase() ?? "#"
    const key = `${firstLetter} - ${item.group}`

    if (!sections.has(key)) {
      sections.set(key, {
        key,
        label: `${firstLetter} • ${item.group}`,
        items: [],
      })
    }

    sections.get(key)?.items.push(item)
  }

  return Array.from(sections.values())
}

export function getComponentSurfaceSections(slug: string) {
  const primarySlug = getPrimaryComponentSurfaceSlug(slug)
  return (componentSurfaceSections[primarySlug] ?? [])
    .map((section) => ({
      ...section,
      slugs: section.slugs.filter((sectionSlug) => !internalComponentCatalogSlugs.has(sectionSlug)),
    }))
    .filter((section) => section.slugs.length > 0)
}

export function getPrimaryComponentMemberInventory(surfaceSlug?: string): ComponentSurfaceMemberInventoryItem[] {
  const surfaceSlugs = surfaceSlug ? [getPrimaryComponentSurfaceSlug(surfaceSlug)] : Object.keys(componentSurfaceSections)

  return surfaceSlugs.flatMap((currentSurfaceSlug) => {
    const surface = getComponentSurfaceCatalogItem(currentSurfaceSlug)
    const sections = getComponentSurfaceSections(currentSurfaceSlug)

    return sections.flatMap((section) => {
      const entries: ComponentSurfaceMemberInventoryItem[] = []

      for (const slug of section.slugs) {
          const source = componentCatalog.find((entry) => entry.slug === slug)
          if (!source) continue

          entries.push({
            component: source.title,
            slug: source.slug,
            title: source.title,
            surfaceSlug: currentSurfaceSlug,
            surfaceTitle: surface?.title ?? currentSurfaceSlug,
            sectionId: section.key,
            sectionLabel: section.title,
            sectionKey: section.key,
            summary: source.description,
            useWhen: section.description,
            maturity:
              section.key === "core"
                ? "core"
                : section.key === "compatibility"
                  ? "compatibility"
                  : "helper",
            status: source.status,
            href: componentDocsPath(source.slug),
          })
      }

      return entries
    })
  })
}

export function getDocumentedMemberByComponent(component: string) {
  return getPrimaryComponentMemberInventory().find((item) => item.component === component)
}

export function getDocumentedMembersByComponents(components: string[]) {
  const componentSet = new Set(components)
  return getPrimaryComponentMemberInventory().filter((item) => componentSet.has(item.component))
}

export const componentModuleCatalog: ComponentModuleItem[] = [
  {
    slug: "actions",
    title: "Actions",
    description: "Context actions, copy controls and quick grids for dense product surfaces.",
    icon: MousePointerClickIcon,
    category: "Actions",
    exports: ["ActionMenu", "CopyButton", "QuickActionGrid"],
    href: componentModulePath("actions"),
    status: "Stable",
    features: ["Quick actions", "Copy affordances", "Dense command blocks"],
  },
  {
    slug: "layout",
    title: "Application layout",
    description: "Route-level sidebars, breadcrumbs and page framing helpers that support real reusable components instead of replacing them.",
    icon: LayoutDashboardIcon,
    category: "Layout",
    exports: ["Sidebar", "Breadcrumbs", "Section"],
    href: componentModulePath("layout"),
    status: "Stable",
    features: ["Sidebar navigation", "Page framing", "Section structure", "Sticky actions"],
  },
  {
    slug: "filters",
    title: "Filters",
    description: "Filter bars and chip patterns for narrowing data without leaving the current view.",
    icon: SlidersHorizontalIcon,
    category: "Data",
    exports: ["FilterBar", "SavedFilterSelect"],
    href: componentModulePath("filters"),
    status: "Stable",
    features: ["Filter bars", "Chips", "Search + filter pairing"],
  },
  {
    slug: "overlay",
    title: "Overlay patterns",
    description: "Confirm flows, modal shells, sheet layouts and dialog actions.",
    icon: AlertCircleIcon,
    category: "Overlay",
    exports: ["AlertDialog", "ConfirmDialog", "Drawer", "Tooltip", "Popover", "RightClickMenu"],
    href: componentModulePath("overlay"),
    status: "Stable",
    features: ["Confirm flows", "Sheet layouts", "Modal actions", "Lightweight helper hints"],
  },
  {
    slug: "navigation",
    title: "Navigation",
    description: "Pagination and tabbed navigation patterns for sectioned or paginated interfaces.",
    icon: ChevronRightIcon,
    category: "Layout",
    exports: ["Pagination"],
    href: componentModulePath("navigation"),
    status: "Stable",
    features: ["Pagination", "Page tabs", "Stepper tabs"],
  },
  {
    slug: "form",
    title: "Form",
    description: "Form shell and wrapper layer for labels, validation, and repeatable field composition.",
    icon: FileTextIcon,
    category: "Forms",
    exports: ["FormFieldShell", "FormInput", "FormSelect", "FormTextarea", "FormSwitch", "FormDatePicker"],
    href: componentModulePath("form"),
    status: "Stable",
    features: ["Field shell", "Wrapped controls", "Date helpers", "Consistent validation"],
  },
  {
    slug: "display",
    title: "Display",
    description: "Metrics, activity, avatars, timelines and descriptive content surfaces.",
    icon: DatabaseIcon,
    category: "Data",
    exports: ["DescriptionList", "Progress", "PageState", "Timeline", "Statistic", "InfoCard", "ActivityFeed", "StatusLegend", "Avatar", "DataState", "ScrollBox"],
    href: componentModulePath("display"),
    status: "Stable",
    features: ["Metric grids", "Timelines", "Activity feeds", "Status legends"],
  },
  {
    slug: "data-table",
    title: "DataTable",
    description: "Primary reusable data-grid system. Helper pieces stay secondary to the main table route.",
    icon: Table2Icon,
    category: "Data",
    exports: ["DataTable"],
    href: componentModulePath("data-table"),
    status: "Stable",
    features: ["Toolbar", "Selection", "Row actions", "Saved views", "Pagination"],
  },
  {
    slug: "notifications",
    title: "Notifications",
    description: "Toast and notification surfaces for transient feedback, async completion, and unread activity.",
    icon: BadgeIcon,
    category: "Overlay",
    exports: ["Toast", "NotificationCenter"],
    href: componentModulePath("notifications"),
    status: "Preview",
    features: ["Toasts", "Promise feedback", "Unread activity", "Status messaging"],
  },
  {
    slug: "command",
    title: "Command",
    description: "Command palette patterns for keyboard-driven discovery, search, grouped actions and async navigation.",
    icon: TerminalSquareIcon,
    category: "Workflow",
    exports: ["CommandPalette"],
    href: componentModulePath("command"),
    status: "Preview",
    features: ["Command palette", "Grouped actions", "Async search", "Keyboard discovery"],
  },
  {
    slug: "calendar",
    title: "Calendar",
    description: "Calendar, date picker and range picker flows for scheduling and reporting.",
    icon: Grid2x2Icon,
    category: "Workflow",
    exports: ["DateUtils", "Calendar", "DatePicker", "DateRangePicker"],
    href: componentModulePath("calendar"),
    status: "Stable",
    features: ["Date picker", "Range picker", "Scheduling flows"],
  },
  {
    slug: "upload",
    title: "Upload",
    description: "File and image upload surfaces with preview-friendly interaction patterns.",
    icon: BlocksIcon,
    category: "Workflow",
    exports: ["FileUpload", "ImageUpload"],
    href: componentModulePath("upload"),
    status: "Preview",
    features: ["File upload", "Image upload", "Attachment flows"],
  },
  {
    slug: "wizard",
    title: "Wizard",
    description: "Stepper and multi-step workflow patterns for onboarding and guided flows.",
    icon: WorkflowIcon,
    category: "Workflow",
    exports: ["Stepper", "Wizard"],
    href: componentModulePath("wizard"),
    status: "Stable",
    features: ["Step flow", "Guided forms", "Progress state"],
  },
]

export const primaryNav: NavItem[] = [
  { label: "Docs", href: DOCS_ROOT_PATH },
  { label: "Installation", href: "/docs/installation" },
  { label: "Components", href: "/components" },
  { label: "Search", href: "/search" },
  { label: "Changelog", href: "/changelog" },
]

export const docsSidebar: SidebarGroup[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Overview", href: DOCS_ROOT_PATH, icon: BookOpenIcon },
      { label: "Installation", href: "/docs/installation", icon: ChevronRightIcon },
      { label: "Components catalog", href: "/components", icon: ComponentIcon },
      { label: "Changelog", href: "/changelog", icon: FileTextIcon },
    ],
  },
  ...componentGroupOrder
    .map((group) => ({
      title: group,
      items: buildSidebarItemsForGroup(group, componentDocsPath),
    }))
    .filter((group) => group.items.length > 0),
]

export const playgroundSidebar: SidebarGroup[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/playground/button", icon: BookOpenIcon },
      { label: "Installation", href: componentPlaygroundPath("button"), icon: ChevronRightIcon },
      { label: "Theming", href: componentPlaygroundPath("button"), icon: SparklesIcon },
      { label: "Tokens", href: componentPlaygroundPath("badge"), icon: Layers3Icon },
      { label: "Icon Library", href: componentPlaygroundPath("popover"), icon: Grid2x2Icon },
    ],
  },
  ...componentGroupOrder
    .map((group) => ({
      title: group,
      items: buildSidebarItemsForGroup(group, componentPlaygroundPath),
    }))
    .filter((group) => group.items.length > 0),
]

export const blockTabs = ["All blocks", "Dashboard", "Auth", "Table", "Settings", "Pricing", "Product", "Marketing"] as const
export const blockLayoutFilters = ["All layouts", "Application", "Marketing"] as const
export const blockThemeFilters = ["All themes", "Light", "Soft"] as const
export const blockSortOptions = ["Popular", "A-Z"] as const

export const blockCoverageSections = [
  {
    title: "Application blocks",
    text: "Dashboard, table and settings blocks should show route structure, visible actions and realistic operational density.",
    items: ["Sidebar shell", "Toolbar actions", "Table states", "Settings surfaces"],
  },
  {
    title: "Entry and conversion blocks",
    text: "Auth, pricing, product and marketing blocks should explain trust, conversion hierarchy and where the section fits in a larger page flow.",
    items: ["Form blocks", "CTA hierarchy", "Proof points", "Responsive sections"],
  },
  {
    title: "Reusable block library",
    text: "Every block card should show its category, where it fits, and which route opens the richer preview or template detail view.",
    items: ["Category label", "Usage notes", "Preview action", "Install path"],
  },
]

export const featuredBlock: BlockCard = {
  slug: "dashboard-starter",
  title: "Modern Dashboard",
  description: "Clean dashboard with analytics, charts, and activity tables.",
  bestFor: "Dashboard entry sections, KPI headers, recent activity, and operational overview surfaces.",
  category: "Dashboard",
  tags: ["Dashboard", "Analytics", "Charts", "Overview"],
  uses: ["Sidebar", "Section", "Statistic", "DataTable"],
  tone: "from-emerald-50 via-white to-sky-50",
  href: blockPath("dashboard-starter"),
  previewHref: "/preview/blocks/dashboard-01",
  previewTone: "dashboard",
  layout: "Application",
  theme: "Soft",
  relatedTemplateSlug: "dashboard-starter",
  installSteps: [
    "Run `npx tembro init` and make sure the dashboard route already has theme tokens loaded.",
    "Copy the shell section into an authenticated page and connect it to live KPI and activity data.",
    "Keep the block focused on one overview slice instead of turning it into a full page shell.",
  ],
  dependencyGroups: ["Layout shell", "Metric cards", "Table primitives", "Action buttons"],
  copyTargets: [
    "components/blocks/dashboard/overview-shell.tsx",
    "components/blocks/dashboard/metric-row.tsx",
    "components/blocks/dashboard/activity-table.tsx",
  ],
  notes: [
    "Use this block when one dashboard section is enough; move to the template when navigation and multiple zones are required.",
    "Primary actions should stay tied to one operational area, not a full application workflow.",
  ],
}

export const blockCards: BlockCard[] = [
  {
    slug: "sidebar-layout",
    title: "Sidebar Layout",
    description: "Application shell with responsive sidebar.",
    bestFor: "Route-level shells that need stable navigation, app header actions, and one main content zone.",
    category: "Dashboard",
    tags: ["Navigation", "Shell", "Analytics"],
    uses: ["Sidebar", "Section", "Button"],
    tone: "from-[color:var(--aui-page-bg-alt)] to-[color:var(--aui-page-bg)]",
    href: blockPath("sidebar-layout"),
    previewHref: "/preview/blocks/dashboard-01",
    previewTone: "dashboard",
    layout: "Application",
    theme: "Light",
    relatedTemplateSlug: "dashboard-starter",
    installSteps: [
      "Run `npx tembro init` and mount the shell inside an authenticated route group.",
      "Wire navigation items and header actions before copying child content zones into the shell.",
      "Keep the shell generic enough to reuse across more than one application page.",
    ],
    dependencyGroups: ["App shell", "Sidebar navigation", "Page header", "Action controls"],
    copyTargets: ["components/blocks/layout/sidebar-layout.tsx", "components/navigation/app-sidebar.tsx"],
    notes: [
      "Do not use this block for a whole admin app export; it is one shell slice, not the full template.",
      "Navigation depth and section order should come from the app route model, not from hardcoded demo labels.",
    ],
  },
  {
    slug: "crm-dashboard",
    title: "CRM Dashboard",
    description: "Sales pipeline and deals management.",
    bestFor: "Pipeline snapshots, team handoff sections, and account-focused operational dashboards.",
    category: "Product",
    tags: ["CRM", "Pipeline", "Kanban"],
    uses: ["ResourcePage", "Badge", "Tabs", "ActivityFeed"],
    tone: "from-[color:color-mix(in_oklch,var(--aui-accent)_10%,var(--aui-page-bg-alt))] to-[color:var(--aui-page-bg)]",
    href: blockPath("crm-dashboard"),
    previewTone: "crm",
    layout: "Application",
    theme: "Soft",
    relatedTemplateSlug: "crm-dashboard",
    installSteps: [
      "Run `npx tembro init` and reuse the CRM block inside an existing workspace route.",
      "Connect stage counts, owners, and next actions to live CRM entities before release.",
      "Escalate to the CRM template only when the page needs reports, settings, and multiple sections together.",
    ],
    dependencyGroups: ["Stage summaries", "Owner badges", "Activity feed", "Tabs and headers"],
    copyTargets: ["components/blocks/crm/pipeline-summary.tsx", "components/blocks/crm/account-activity.tsx"],
    notes: [
      "CRM sections lose clarity when actions are hidden; keep stage, owner, and next-step signals visible.",
      "This block should stay narrower than the full CRM workspace template.",
    ],
  },
  {
    slug: "users-table",
    title: "Users Table",
    description: "Advanced table with filters and actions.",
    bestFor: "Management tables with filters, row actions, bulk actions, and compact result scanning.",
    category: "Table",
    tags: ["Data", "Filters", "Bulk actions"],
    uses: ["DataTable", "PageToolbar", "Button", "Badge"],
    tone: "from-[color:var(--aui-page-bg-alt)] to-[color:var(--aui-page-bg)]",
    href: blockPath("users-table"),
    previewHref: "/preview/blocks/table-01",
    previewTone: "table",
    layout: "Application",
    theme: "Light",
    relatedTemplateSlug: "dashboard-starter",
    installSteps: [
      "Run `npx tembro init` and move the table block into the target resource page.",
      "Map columns, row identifiers, and action callbacks to your real API contract.",
      "Keep pagination, filters, and bulk actions aligned with backend capabilities.",
    ],
    dependencyGroups: ["Data table", "Toolbar filters", "Bulk actions", "Status badges"],
    copyTargets: ["components/blocks/tables/users-table.tsx", "components/blocks/tables/table-toolbar.tsx"],
    notes: [
      "Prefer this block for one resource section; use a template when the whole page needs navigation and surrounding analytics.",
      "Do not treat demo filters as final product logic; they are only structural placeholders.",
    ],
  },
  {
    slug: "auth-sign-in",
    title: "Auth Sign In",
    description: "Minimal sign in form with social login.",
    bestFor: "Entry flows that need one focused sign-in surface, trust copy, and a compact auth action stack.",
    category: "Auth",
    tags: ["Sign in", "Form", "Trust"],
    uses: ["Card", "Input", "Button", "Badge"],
    tone: "from-[color:color-mix(in_oklch,var(--aui-warning)_12%,var(--aui-page-bg-alt))] to-[color:var(--aui-page-bg)]",
    href: blockPath("auth-sign-in"),
    previewHref: "/preview/blocks/auth-01",
    previewTone: "auth",
    layout: "Marketing",
    theme: "Light",
    relatedTemplateSlug: "dashboard-starter",
    installSteps: [
      "Run `npx tembro init` and mount the auth block on a public or gated entry route.",
      "Replace demo trust copy, OAuth providers, and field labels with your real auth contract.",
      "Use the wider auth or app template only when onboarding needs multiple steps or side content.",
    ],
    dependencyGroups: ["Form fields", "Card shell", "Primary CTA", "Trust badges"],
    copyTargets: ["components/blocks/auth/sign-in-card.tsx", "components/blocks/auth/social-auth-row.tsx"],
    notes: [
      "Keep this block conversion-focused; avoid adding unrelated settings or dashboard content to the same surface.",
      "Auth blocks should show trust and hierarchy clearly on mobile before they are shipped.",
    ],
  },
  {
    slug: "settings-form",
    title: "Settings Form",
    description: "Profile and preferences settings form.",
    bestFor: "One bounded settings section with fields, toggles, save actions, and light explanatory copy.",
    category: "Settings",
    tags: ["Profile", "Preferences", "Form"],
    uses: ["FormFieldShell", "Input", "Switch", "Button"],
    tone: "from-[color:color-mix(in_oklch,var(--aui-surface-muted)_70%,var(--aui-page-bg-alt))] to-[color:var(--aui-page-bg)]",
    href: blockPath("settings-form"),
    previewTone: "settings",
    layout: "Application",
    theme: "Light",
    relatedTemplateSlug: "dashboard-starter",
    installSteps: [
      "Run `npx tembro init` and place the settings block inside an existing account or workspace page.",
      "Wire field state, validation, and save feedback to your app settings contract.",
      "Only move to a larger settings template when multiple settings areas need shared navigation.",
    ],
    dependencyGroups: ["Form wrappers", "Inputs and switches", "Save actions", "Inline helper text"],
    copyTargets: ["components/blocks/settings/profile-form.tsx", "components/blocks/settings/preferences-section.tsx"],
    notes: [
      "This block is for one settings slice, not an entire account management surface.",
      "Keep destructive account actions separate from routine preference editing.",
    ],
  },
  {
    slug: "invoices-page",
    title: "Invoices Page",
    description: "Invoices list with status and actions.",
    bestFor: "Billing or finance tables that need status columns, invoice actions, and readable operational totals.",
    category: "Table",
    tags: ["Finance", "Invoices", "Status"],
    uses: ["DataTable", "Badge", "Button", "ResourcePage"],
    tone: "from-[color:color-mix(in_oklch,var(--aui-accent)_12%,var(--aui-page-bg-alt))] to-[color:var(--aui-page-bg)]",
    href: blockPath("invoices-page"),
    previewHref: "/preview/blocks/table-01",
    previewTone: "table",
    layout: "Application",
    theme: "Soft",
    relatedTemplateSlug: "dashboard-starter",
    installSteps: [
      "Run `npx tembro init` and copy the invoice block into the billing route.",
      "Connect payment status, row actions, and export flows to real finance data.",
      "Keep summaries close to the table instead of turning the block into a full finance dashboard.",
    ],
    dependencyGroups: ["Table rows", "Invoice status badges", "Header actions", "Finance filters"],
    copyTargets: ["components/blocks/finance/invoices-table.tsx", "components/blocks/finance/invoice-actions.tsx"],
    notes: [
      "Finance blocks need explicit status language; avoid vague marketing labels in invoice rows.",
      "When the page needs broader reporting and settings, step up to a template-level surface.",
    ],
  },
]

export const installCommand = PACKAGE_INSTALL_COMMAND

export const propRows = [
  ["variant", "'default' | 'secondary' | ...", "'default'", "The visual style of the button."],
  ["size", "'xs' | 'sm' | 'md' | 'lg' | 'xl'", "'md'", "The size of the button."],
  ["asChild", "boolean", "false", "Render as a child element using Slot."],
  ["disabled", "boolean", "false", "Disables the button."],
  ["className", "string", "-", "Additional CSS classes."],
  ["onClick", "(e: MouseEvent) => void", "-", "Click event handler."],
]

export const tocItems = ["Installation", "Variations", "Sizes", "States", "Icon buttons", "Block button", "Examples", "API Reference", "Accessibility"]

export const exampleCards = [
  { title: "Action buttons", cta: "Save changes" },
  { title: "Icon with text", cta: "Send message" },
  { title: "Loading state", cta: "Processing..." },
  { title: "Destructive action", cta: "Delete item" },
]

export const inspectorChecks = [
  "Tab to focus",
  "Visible focus ring",
  "Enter / Space to activate",
]

export const accessibilityChecks = [
  "Role: button",
  "Name is programmatically determinable",
  "Minimum touch target (44x44px)",
  "Sufficient color contrast",
]

export const globalSearchItems: GlobalSearchItem[] = [
  {
    title: "Home",
    description: "Open the landing page with the product overview.",
    href: "/",
    group: "Docs",
    shortcut: "H",
    keywords: ["home", "landing", "overview", "introduction"],
  },
  {
    title: "Blocks",
    description: "Browse reusable blocks and layout sections.",
    href: "/blocks",
    group: "Blocks",
    shortcut: "B",
    featured: true,
    keywords: ["blocks", "catalog", "templates", "dashboards", "marketing", "layout patterns"],
  },
  {
    title: "Components",
    description: "Browse component docs and related modules.",
    href: "/components",
    group: "Docs",
    shortcut: "C",
    keywords: ["components", "catalog", "docs", "family", "category"],
  },
  {
    title: "Developer inventory",
    description: "Open the export inventory with primary components, groups, and member routes.",
    href: "/components/registry",
    group: "Docs",
    shortcut: "R",
    keywords: ["developer inventory", "registry", "inventory", "exports", "component list", "source of truth"],
  },
  {
    title: "Changelog",
    description: "Read release notes and track API and docs changes.",
    href: "/changelog",
    group: "Docs",
    shortcut: "L",
    keywords: ["changelog", "release", "history", "changes", "version"],
  },
  {
    title: "Command page",
    description: "Open the full route index and quick command page.",
    href: "/command",
    group: "Docs",
    shortcut: "K",
    keywords: ["command", "search", "palette", "route index", "jump"],
  },
  {
    title: "Installation",
    description: "Initialize the project, write theme tokens, and copy working CLI commands.",
    href: "/docs/installation",
    group: "Docs" as const,
    shortcut: "I",
    featured: true,
    keywords: ["installation", "setup", "npm", "theme", "tembro", "cli"],
  },
  {
    title: "Next.js installation",
    description: "Initialize tembro in a Next.js app and write local component files.",
    href: "/docs/installation/next",
    group: "Docs" as const,
    shortcut: "I",
    keywords: ["installation", "next", "nextjs", "setup", "init", "tailwind", "cli"],
  },
  {
    title: "Vite installation",
    description: "Initialize tembro in a Vite app and write local component files.",
    href: "/docs/installation/vite",
    group: "Docs" as const,
    shortcut: "I",
    keywords: ["installation", "vite", "setup", "init", "tailwind", "cli"],
  },
  ...getPrimaryComponentCatalog().flatMap((item) => [
    {
      title: item.title,
      description: item.description,
      href: `/components/${item.slug}`,
      group: "Components" as const,
      shortcut: "C",
      featured: item.slug === "button" || item.slug === "input" || item.slug === "dialog" || item.slug === "select" || item.slug === "card",
      keywords: [item.slug, item.title, item.category, getComponentGroup(item.slug), getPrimaryComponentSurfaceTitle(item.slug), ...item.features, "component", "detail", "usage", "installation"],
    },
  ]),
  ...getPrimaryComponentMemberInventory().map((item) => ({
    title: `${item.title} in ${item.surfaceTitle}`,
    description: `${item.summary} Documented inside the ${item.surfaceTitle} surface under ${item.sectionLabel.toLowerCase()}.`,
    href: item.href,
    group: "Components" as const,
    shortcut: "M",
    keywords: [
      item.title,
      item.slug,
      item.component,
      item.surfaceTitle,
      item.surfaceSlug,
      item.sectionLabel,
      item.maturity,
      "member",
      "surface",
      "variant",
      "wrapper",
    ],
  })),
  ...componentModuleCatalog.map((item) => ({
    title: `${item.title} group`,
    description: `${item.description} Open the grouped docs surface for related exports and usage boundaries.`,
    href: item.href,
    group: "Components" as const,
    shortcut: "F",
    featured: item.slug === "data-table" || item.slug === "form" || item.slug === "layout",
    keywords: [item.slug, item.title, item.category, ...item.features, ...item.exports, "component group", "catalog", "system"],
  })),
  ...componentModuleCatalog.flatMap((item) =>
    item.exports.map((exportName) => ({
      title: `${exportName} API`,
      description: `${item.title} export detail with import path, related docs and usage context.`,
      href: componentExportPath(item.slug, exportName),
      group: "Components" as const,
      shortcut: "E",
      keywords: [exportName, item.title, item.slug, ...item.features, "export", "api", "component"],
    }))
  ),
]
