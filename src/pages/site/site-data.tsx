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
  DatabaseIcon,
  FileTextIcon,
  FormInputIcon,
  Grid2x2Icon,
  Layers3Icon,
  LayoutDashboardIcon,
  MousePointerClickIcon,
  Paintbrush2Icon,
  PanelTopIcon,
  SmartphoneIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  Table2Icon,
  TerminalSquareIcon,
  ToggleLeftIcon,
  WorkflowIcon,
} from "lucide-react"

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

export type BlockCard = {
  slug: string
  title: string
  description: string
  tags: string[]
  tone: string
  href: string
  previewHref?: string
  layout: "Application" | "Marketing"
  theme: "Light" | "Soft"
}

export type TemplateSection = {
  key: "overview" | "leads" | "reports" | "settings"
  label: string
  title: string
  description: string
  bullets: string[]
}

export type TemplateRecord = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  status: "Live" | "Review" | "Draft"
  metrics: Array<{ label: string; value: string; delta: string }>
  sections: TemplateSection[]
  modules: Array<{ label: string; href: string }>
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
  group: "Component" | "Playground" | "Family" | "Template" | "Export" | "Docs"
  shortcut: string
}

export type ComponentCatalogItem = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  category: "Components" | "Forms" | "Overlay" | "Data Display"
  status: "Stable" | "Preview"
  installCommand: string
  propsRows: string[][]
  features: string[]
}

export type ModuleFamilyItem = {
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

export const componentDocsPath = (slug: string) => `/docs/components/${slug}`
export const componentPlaygroundPath = (slug: string) => `/playground/${slug}`
export const moduleFamilyPath = (slug: string) => `/components/families/${slug}`
export const moduleFamilyExportSlug = (value: string) => value.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()
export const moduleFamilyExportPath = (familySlug: string, exportName: string) => `/components/families/${familySlug}/${moduleFamilyExportSlug(exportName)}`
export const templatePath = (slug: string) => `/templates/${slug}`

export const componentCatalog: ComponentCatalogItem[] = [
  {
    slug: "button",
    title: "Button",
    description: "Trigger actions with multiple variants, sizes, icon positions and loading states.",
    icon: MousePointerClickIcon,
    category: "Components",
    status: "Stable",
    installCommand: "npx azamat-ui@latest add button",
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
    description: "Single-line text field for forms, filters and compact editor layouts.",
    icon: FormInputIcon,
    category: "Forms",
    status: "Stable",
    installCommand: "npx azamat-ui@latest add input",
    propsRows: [
      ["type", "'text' | 'email' | 'password' | ...", "'text'", "Input HTML type."],
      ["placeholder", "string", "-", "Placeholder text."],
      ["disabled", "boolean", "false", "Disables the field."],
      ["value", "string", "-", "Controlled value."],
      ["onChange", "(event) => void", "-", "Change handler."],
    ],
    features: ["Text input", "Disabled state", "Placeholder", "Controlled value"],
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "Multi-line input with autosizing-friendly layout for notes, messages and long-form data.",
    icon: FileTextIcon,
    category: "Forms",
    status: "Stable",
    installCommand: "npx azamat-ui@latest add textarea",
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
    description: "Structured value picker for lists, status filters and compact forms.",
    icon: ComponentIcon,
    category: "Forms",
    status: "Stable",
    installCommand: "npx azamat-ui@latest add select",
    propsRows: [
      ["value", "string", "-", "Controlled selected value."],
      ["defaultValue", "string", "-", "Initial selected value."],
      ["disabled", "boolean", "false", "Disables the trigger."],
      ["onValueChange", "(value) => void", "-", "Selection change callback."],
      ["size", "'sm' | 'default'", "'default'", "Trigger size."],
    ],
    features: ["Dropdown trigger", "Selectable items", "Compact size", "Controlled selection"],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Binary selection control for permissions, tasks and grouped form actions.",
    icon: BoxIcon,
    category: "Forms",
    status: "Stable",
    installCommand: "npx azamat-ui@latest add checkbox",
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
    installCommand: "npx azamat-ui@latest add switch",
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
    installCommand: "npx azamat-ui@latest add badge",
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
    installCommand: "npx azamat-ui@latest add card",
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
    installCommand: "npx azamat-ui@latest add tabs",
    propsRows: [
      ["value", "string", "-", "Controlled active tab."],
      ["defaultValue", "string", "-", "Initial tab."],
      ["orientation", "'horizontal' | 'vertical'", "'horizontal'", "Tab list direction."],
      ["disabled", "boolean", "false", "Disables a trigger."],
    ],
    features: ["Segmented nav", "Panel switching", "Controlled state", "Settings sections"],
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "Focused modal surface for confirmation flows, forms and destructive actions.",
    icon: AlertCircleIcon,
    category: "Overlay",
    status: "Stable",
    installCommand: "npx azamat-ui@latest add dialog",
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
    installCommand: "npx azamat-ui@latest add popover",
    propsRows: [
      ["side", "'top' | 'right' | 'bottom' | 'left'", "'bottom'", "Popup side."],
      ["align", "'start' | 'center' | 'end'", "'center'", "Popup alignment."],
      ["sideOffset", "number", "4", "Distance from trigger."],
      ["children", "ReactNode", "-", "Trigger and content composition."],
    ],
    features: ["Anchored overlay", "Title/description", "Action menus", "Compact help content"],
  },
  {
    slug: "table",
    title: "Table",
    description: "Structured row and column layout for invoices, users and reporting surfaces.",
    icon: Table2Icon,
    category: "Data Display",
    status: "Stable",
    installCommand: "npx azamat-ui@latest add table",
    propsRows: [
      ["className", "string", "-", "Additional table styling."],
      ["children", "ReactNode", "-", "Header, body and row markup."],
      ["caption", "ReactNode", "-", "Optional table caption."],
    ],
    features: ["Header rows", "Body rows", "Hover states", "Compact reporting"],
  },
]

export const moduleFamilyCatalog: ModuleFamilyItem[] = [
  {
    slug: "actions",
    title: "Actions",
    description: "Context actions, copy controls and quick grids for dense product surfaces.",
    icon: MousePointerClickIcon,
    category: "Actions",
    exports: ["ActionMenu", "CopyButton", "QuickActionGrid"],
    href: moduleFamilyPath("actions"),
    status: "Stable",
    features: ["Quick actions", "Copy affordances", "Dense command blocks"],
  },
  {
    slug: "layout",
    title: "Layout",
    description: "App shell, headers, sidebars, breadcrumbs and stat cards for structured screens.",
    icon: LayoutDashboardIcon,
    category: "Layout",
    exports: ["AppShell", "AppHeader", "AppSidebar", "PageHeader", "StatCard", "SidebarNav", "Breadcrumbs", "PageContainer"],
    href: moduleFamilyPath("layout"),
    status: "Stable",
    features: ["Shell composition", "Headers", "Sidebar navigation", "Stat surfaces"],
  },
  {
    slug: "filters",
    title: "Filters",
    description: "Filter bars and chip patterns for narrowing data without leaving the current view.",
    icon: SlidersHorizontalIcon,
    category: "Data",
    exports: ["FilterBar", "FilterChips"],
    href: moduleFamilyPath("filters"),
    status: "Stable",
    features: ["Filter bars", "Chips", "Search + filter pairing"],
  },
  {
    slug: "overlay",
    title: "Overlay patterns",
    description: "Confirm flows, modal shells, sheet layouts and dialog actions.",
    icon: AlertCircleIcon,
    category: "Overlay",
    exports: ["DialogActions", "ModalShell", "ConfirmDialog", "SheetShell"],
    href: moduleFamilyPath("overlay"),
    status: "Stable",
    features: ["Confirm flows", "Sheet layouts", "Modal actions"],
  },
  {
    slug: "navigation",
    title: "Navigation",
    description: "Pagination and tabbed navigation patterns for sectioned or paginated interfaces.",
    icon: ChevronRightIcon,
    category: "Layout",
    exports: ["Pagination", "PageTabs", "StepperTabs"],
    href: moduleFamilyPath("navigation"),
    status: "Stable",
    features: ["Pagination", "Page tabs", "Stepper tabs"],
  },
  {
    slug: "inputs",
    title: "Advanced inputs",
    description: "Specialized inputs for search, password, dates, money, phone and tags.",
    icon: FormInputIcon,
    category: "Forms",
    exports: ["SimpleSelect", "AsyncSelect", "ClearableInput", "SearchInput", "PasswordInput", "NumberInput", "DateInput", "DateRangeInput", "MoneyInput", "QuantityInput", "MaskedInput", "PhoneInput", "TagInput", "Combobox"],
    href: moduleFamilyPath("inputs"),
    status: "Stable",
    features: ["Async select", "Money input", "Date controls", "Tag input"],
  },
  {
    slug: "form",
    title: "Form adapters",
    description: "Form-shell components that wrap base controls into repeatable field patterns.",
    icon: FileTextIcon,
    category: "Forms",
    exports: ["FormFieldShell", "FormInput", "FormSelect", "FormAsyncSelect", "FormTextarea", "FormSwitch", "FormSearchInput", "FormPasswordInput", "FormNumberInput", "FormPhoneInput", "FormDateInput", "FormDateRangeInput", "FormDatePicker", "FormDateRangePicker"],
    href: moduleFamilyPath("form"),
    status: "Stable",
    features: ["Form field shell", "Wrapped controls", "Date helpers", "Form consistency"],
  },
  {
    slug: "display",
    title: "Display",
    description: "Metrics, activity, avatars, timelines and descriptive content surfaces.",
    icon: DatabaseIcon,
    category: "Data",
    exports: ["DescriptionList", "Progress", "Result", "Timeline", "MetricGrid", "InfoCard", "ActivityFeed", "StatusLegend", "Avatar", "DataState"],
    href: moduleFamilyPath("display"),
    status: "Stable",
    features: ["Metric grids", "Timelines", "Activity feeds", "Status legends"],
  },
  {
    slug: "data-table",
    title: "Data table system",
    description: "Toolbar, pagination, row actions, bulk actions and column visibility helpers.",
    icon: Table2Icon,
    category: "Data",
    exports: ["DataTable", "DataTablePagination", "DataTableToolbar", "DataTableColumnVisibilityMenu", "DataTableSelectColumn", "DataTableSortableHeader", "DataTableRowActions", "DataTableActionsColumn", "DataTableBulkActions", "DataTableViewPresets"],
    href: moduleFamilyPath("data-table"),
    status: "Stable",
    features: ["Toolbar", "Bulk actions", "Sortable header", "View presets"],
  },
  {
    slug: "notifications",
    title: "Notifications",
    description: "Toast-based feedback surfaces for success, warnings and async completion states.",
    icon: BadgeIcon,
    category: "Overlay",
    exports: ["Toast"],
    href: moduleFamilyPath("notifications"),
    status: "Preview",
    features: ["Toasts", "Transient feedback", "Status messaging"],
  },
  {
    slug: "command",
    title: "Command",
    description: "Command palette patterns for keyboard-driven discovery and navigation.",
    icon: TerminalSquareIcon,
    category: "Workflow",
    exports: ["CommandPalette"],
    href: moduleFamilyPath("command"),
    status: "Preview",
    features: ["Command palette", "Keyboard discovery", "Quick navigation"],
  },
  {
    slug: "calendar",
    title: "Calendar",
    description: "Calendar, date picker and range picker flows for scheduling and reporting.",
    icon: Grid2x2Icon,
    category: "Workflow",
    exports: ["DateUtils", "Calendar", "DatePicker", "DateRangePicker"],
    href: moduleFamilyPath("calendar"),
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
    href: moduleFamilyPath("upload"),
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
    href: moduleFamilyPath("wizard"),
    status: "Stable",
    features: ["Step flow", "Guided forms", "Progress state"],
  },
  {
    slug: "patterns",
    title: "Patterns",
    description: "Resource pages, detail pages and form-builder patterns composed from the library.",
    icon: PanelTopIcon,
    category: "Workflow",
    exports: ["ResourcePage", "ResourceDetailPage", "FormBuilder", "FormBuilderPresets"],
    href: moduleFamilyPath("patterns"),
    status: "Stable",
    features: ["Resource pages", "Detail layouts", "Form builder presets"],
  },
]

export const primaryNav: NavItem[] = [
  { label: "Docs", href: componentDocsPath("button") },
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Templates", href: "/blocks" },
  { label: "Changelog", href: componentDocsPath("button") },
]

export const docsSidebar: SidebarGroup[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs/components/button", icon: BookOpenIcon },
      { label: "Installation", href: componentDocsPath("button"), icon: ChevronRightIcon },
      { label: "Theming", href: componentDocsPath("button"), icon: SparklesIcon },
      { label: "Figma Design Kit", href: componentDocsPath("card"), icon: Grid2x2Icon, badge: "New" },
    ],
  },
  {
    title: "Components",
    items: componentCatalog
      .filter((item) => item.category === "Components")
      .map((item) => ({ label: item.title, href: componentDocsPath(item.slug), icon: item.icon })),
  },
  {
    title: "Forms",
    items: componentCatalog
      .filter((item) => item.category === "Forms")
      .map((item) => ({ label: item.title, href: componentDocsPath(item.slug), icon: item.icon })),
  },
  {
    title: "Overlay",
    items: componentCatalog
      .filter((item) => item.category === "Overlay")
      .map((item) => ({ label: item.title, href: componentDocsPath(item.slug), icon: item.icon })),
  },
  {
    title: "Data Display",
    items: componentCatalog
      .filter((item) => item.category === "Data Display")
      .map((item) => ({ label: item.title, href: componentDocsPath(item.slug), icon: item.icon })),
  },
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
  {
    title: "Components",
    items: componentCatalog
      .filter((item) => item.category === "Components")
      .map((item) => ({ label: item.title, href: componentPlaygroundPath(item.slug), icon: item.icon })),
  },
  {
    title: "Forms",
    items: componentCatalog
      .filter((item) => item.category === "Forms")
      .map((item) => ({ label: item.title, href: componentPlaygroundPath(item.slug), icon: item.icon })),
  },
  {
    title: "Overlay",
    items: componentCatalog
      .filter((item) => item.category === "Overlay")
      .map((item) => ({ label: item.title, href: componentPlaygroundPath(item.slug), icon: item.icon })),
  },
  {
    title: "Data Display",
    items: componentCatalog
      .filter((item) => item.category === "Data Display")
      .map((item) => ({ label: item.title, href: componentPlaygroundPath(item.slug), icon: item.icon })),
  },
]

export const blockTabs = ["Dashboard", "CRM", "Finance", "Ecommerce", "Auth", "Forms"]
export const blockLayoutFilters = ["All layouts", "Application", "Marketing"] as const
export const blockThemeFilters = ["All themes", "Light", "Soft"] as const
export const blockSortOptions = ["Popular", "A-Z"] as const

export const blockCoverageSections = [
  {
    title: "Application layouts",
    text: "Dashboard, CRM, invoices and settings should surface structure, actions, table density and route depth clearly.",
    items: ["Sidebar shell", "Toolbar actions", "Table states", "Deep section routes"],
  },
  {
    title: "Marketing/auth sections",
    text: "Auth, pricing and product templates should show hierarchy, trust points, forms and conversion areas without iframe dependency.",
    items: ["Form blocks", "CTA hierarchy", "Status chips", "Responsive sections"],
  },
  {
    title: "Reusable block library",
    text: "Every block card should explain where it fits, what modules it uses and which route opens the richer template detail view.",
    items: ["Linked modules", "Usage notes", "Preview action", "Copy install path"],
  },
]

export const featuredBlock: BlockCard = {
  slug: "dashboard-starter",
  title: "Modern Dashboard",
  description: "Clean dashboard with analytics, charts, and activity tables.",
  tags: ["Dashboard", "Analytics", "Charts", "Overview"],
  tone: "from-emerald-50 via-white to-sky-50",
  href: templatePath("dashboard-starter"),
  previewHref: "/preview/blocks/dashboard-01",
  layout: "Application",
  theme: "Soft",
}

export const blockCards: BlockCard[] = [
  { slug: "sidebar-layout", title: "Sidebar Layout", description: "Application shell with responsive sidebar.", tags: ["Dashboard", "Layout", "Navigation", "Shell"], tone: "from-slate-50 to-white", href: templatePath("dashboard-starter"), previewHref: "/preview/blocks/dashboard-01", layout: "Application", theme: "Light" },
  { slug: "crm-dashboard", title: "CRM Dashboard", description: "Sales pipeline and deals management.", tags: ["CRM", "Pipeline", "Kanban"], tone: "from-cyan-50 to-white", href: templatePath("crm-dashboard"), layout: "Application", theme: "Soft" },
  { slug: "users-table", title: "Users Table", description: "Advanced table with filters and actions.", tags: ["Dashboard", "Table", "Data", "Filters"], tone: "from-zinc-50 to-white", href: templatePath("dashboard-starter"), previewHref: "/preview/blocks/table-01", layout: "Application", theme: "Light" },
  { slug: "auth-sign-in", title: "Auth Sign In", description: "Minimal sign in form with social login.", tags: ["Auth", "Form", "Minimal"], tone: "from-amber-50 to-white", href: templatePath("dashboard-starter"), previewHref: "/preview/blocks/auth-01", layout: "Marketing", theme: "Light" },
  { slug: "pricing-section", title: "Pricing Section", description: "Responsive pricing with feature lists.", tags: ["Forms", "Pricing", "Marketing", "Section"], tone: "from-orange-50 to-white", href: templatePath("dashboard-starter"), layout: "Marketing", theme: "Soft" },
  { slug: "settings-form", title: "Settings Form", description: "Profile and preferences settings form.", tags: ["Forms", "Settings", "Profile"], tone: "from-stone-50 to-white", href: templatePath("dashboard-starter"), layout: "Application", theme: "Light" },
  { slug: "invoices-page", title: "Invoices Page", description: "Invoices list with status and actions.", tags: ["Finance", "Invoices", "Table"], tone: "from-blue-50 to-white", href: templatePath("dashboard-starter"), previewHref: "/preview/blocks/table-01", layout: "Application", theme: "Soft" },
  { slug: "ecommerce-product", title: "Ecommerce Product", description: "Product details with images and options.", tags: ["Ecommerce", "Product", "Detail"], tone: "from-rose-50 to-white", href: templatePath("ecommerce-product"), previewHref: "/preview/blocks/product-01", layout: "Marketing", theme: "Soft" },
]

export const templateRecords: TemplateRecord[] = [
  {
    slug: "dashboard-starter",
    title: "Dashboard starter",
    eyebrow: "Analytics template",
    summary: "A production-style admin workspace with KPI cards, quick actions, dense data panels and reusable page scaffolding.",
    status: "Live",
    metrics: [
      { label: "Revenue", value: "$24,780", delta: "+12.8%" },
      { label: "Active users", value: "18,390", delta: "+7.2%" },
      { label: "Conversion", value: "6.3%", delta: "+1.1%" },
    ],
    sections: [
      { key: "overview", label: "Overview", title: "Overview workspace", description: "High-level metrics, chart zones and recent activity for fast decision making.", bullets: ["KPI cards", "Chart panel", "Recent activity", "Quick actions"] },
      { key: "leads", label: "Leads", title: "Acquisition pipeline", description: "A lead-focused view with owner tracking, source breakdown and response status.", bullets: ["Lead sources", "Owner table", "Priority chips", "Team assignments"] },
      { key: "reports", label: "Reports", title: "Reporting layout", description: "Dense but readable reporting surface with filters, exports and period comparisons.", bullets: ["Date filters", "Comparison rows", "Export action", "Readable totals"] },
      { key: "settings", label: "Settings", title: "Workspace settings", description: "Preferences, connected modules and roles grouped into a calmer management view.", bullets: ["Profile controls", "Role rules", "Module toggles", "Audit actions"] },
    ],
    modules: [
      { label: "Button docs", href: "/docs/components/button" },
      { label: "Button playground", href: "/playground/button" },
      { label: "Blocks catalog", href: "/blocks" },
    ],
    notes: [
      "This template route demonstrates how a public block becomes a deeper preview page with its own sections, actions and supporting modules.",
      "Every primary action here is wired: section buttons switch the canvas, copy actions copy code, and linked modules navigate to real routes.",
    ],
  },
  {
    slug: "crm-dashboard",
    title: "CRM workspace",
    eyebrow: "Pipeline template",
    summary: "A CRM-oriented shell for deals, stages, team ownership and relationship history with heavier action density.",
    status: "Review",
    metrics: [
      { label: "Open deals", value: "142", delta: "+18" },
      { label: "Pipeline value", value: "$182k", delta: "+9.4%" },
      { label: "Win rate", value: "24%", delta: "+2.3%" },
    ],
    sections: [
      { key: "overview", label: "Overview", title: "CRM overview", description: "Track stage velocity, assigned owners and recent customer touchpoints in one place.", bullets: ["Stage lanes", "Owner snapshot", "Customer touchpoints", "Deal summary"] },
      { key: "leads", label: "Leads", title: "Lead board", description: "Focus on capturing, qualifying and routing new leads without leaving the board.", bullets: ["Qualification cards", "Score badges", "Owner routing", "Next-action queue"] },
      { key: "reports", label: "Reports", title: "Revenue reports", description: "Sales reporting grouped by rep, source and stage with export-ready formatting.", bullets: ["Rep summary", "Source breakdown", "Stage conversion", "Monthly totals"] },
      { key: "settings", label: "Settings", title: "CRM settings", description: "Manage stages, scoring thresholds and automations from one compact settings area.", bullets: ["Stage config", "Scoring rules", "Automation toggles", "Permissions"] },
    ],
    modules: [
      { label: "Button docs", href: "/docs/components/button" },
      { label: "Button playground", href: "/playground/button" },
      { label: "Blocks catalog", href: "/blocks" },
    ],
    notes: [
      "CRM layouts should show dense actions, stage movement and owner context without collapsing into static marketing cards.",
      "Section switching here is intentionally route-safe so the same data structure can drive deeper nested views later.",
    ],
  },
  {
    slug: "ecommerce-product",
    title: "Commerce product",
    eyebrow: "Commerce template",
    summary: "A product-facing commerce layout with media, pricing, option selection and supporting conversion blocks.",
    status: "Draft",
    metrics: [
      { label: "Orders", value: "1,429", delta: "+6.1%" },
      { label: "Average order", value: "$83", delta: "+4.2%" },
      { label: "Stock health", value: "92%", delta: "+3.0%" },
    ],
    sections: [
      { key: "overview", label: "Overview", title: "Product overview", description: "Lead with gallery, price, trust points and purchase controls in a clean hierarchy.", bullets: ["Hero media", "Price stack", "Trust badges", "Primary CTA"] },
      { key: "leads", label: "Leads", title: "Customer interest", description: "Surface wishlists, saved carts and subscriber intent around the product page.", bullets: ["Saved carts", "Interest list", "Segment chips", "Follow-up CTA"] },
      { key: "reports", label: "Reports", title: "Commerce reporting", description: "Summarize revenue, inventory movement and offer performance on the same route family.", bullets: ["Revenue cards", "Inventory table", "Offer lifts", "Channel compare"] },
      { key: "settings", label: "Settings", title: "Catalog settings", description: "Edit options, shipping rules and featured modules through a consistent settings screen.", bullets: ["Variant config", "Shipping rules", "Featured slots", "Content ordering"] },
    ],
    modules: [
      { label: "Button docs", href: "/docs/components/button" },
      { label: "Button playground", href: "/playground/button" },
      { label: "Blocks catalog", href: "/blocks" },
    ],
    notes: [
      "Commerce surfaces need pricing, option selection and supporting trust blocks to feel complete and production-like.",
      "This record is also prepared for richer nested sections so blocks and templates can keep sharing one data model.",
    ],
  },
]

export const installCommand = "npx azamat-ui@latest add button"

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

export const heroStats = [
  ["11+", "Component families"],
  ["200+", "Components"],
  ["20+", "Blocks & templates"],
  ["100%", "TypeScript"],
]

export const partnerLogos = ["ACME", "statamic", "Pixels UI", "Toolpad", "ShipFast", "Larana, Inc."]

export const valueCards = [
  { title: "Beautiful by default", text: "Carefully crafted components with consistent spacing, typography and color.", icon: SparklesIcon, tone: "bg-zinc-950 text-white" },
  { title: "Composable & flexible", text: "Build complex interfaces with simple, composable primitives.", icon: BoxIcon, tone: "bg-amber-400 text-zinc-950" },
  { title: "Accessible", text: "WAI-ARIA compliant components that work for everyone.", icon: ShieldCheckIcon, tone: "bg-emerald-500 text-white" },
  { title: "Open source", text: "Built for the community, open source and always free.", icon: FileTextIcon, tone: "bg-blue-500 text-white" },
]

export const landingSearchItems: LandingSearchItem[] = [
  { label: "Button", shortcut: "B", href: componentDocsPath("button"), group: "Component" },
  { label: "Input", shortcut: "I", href: componentPlaygroundPath("input"), group: "Form" },
  { label: "Card", shortcut: "C", href: componentDocsPath("card"), group: "Component" },
  { label: "Dialog", shortcut: "D", href: componentPlaygroundPath("dialog"), group: "Overlay" },
  { label: "Data Table", shortcut: "T", href: componentDocsPath("table"), group: "Data" },
  { label: "Templates", shortcut: "P", href: "/blocks", group: "Template" },
  { label: "Installation", shortcut: "/", href: componentDocsPath("button"), group: "Docs" },
  { label: "Playground", shortcut: "K", href: componentPlaygroundPath("button"), group: "Preview" },
]

export const landingProofPoints = [
  {
    title: "Route-first docs",
    text: "Every major section has its own clean path, so docs, blocks and playground pages are easy to share and scale.",
    icon: WorkflowIcon,
    tone: "bg-zinc-950 text-white",
  },
  {
    title: "Token-driven styling",
    text: "Spacing, radius, borders and color decisions follow one system so every surface feels related.",
    icon: Paintbrush2Icon,
    tone: "bg-amber-400 text-zinc-950",
  },
  {
    title: "Responsive previews",
    text: "Desktop, tablet and mobile behavior can be shown inside docs instead of relying on static mockups.",
    icon: SmartphoneIcon,
    tone: "bg-emerald-500 text-white",
  },
  {
    title: "Real code output",
    text: "Install commands, usage examples and interaction states are presented together for faster adoption.",
    icon: TerminalSquareIcon,
    tone: "bg-blue-500 text-white",
  },
]

export const landingInstallSteps = [
  {
    step: "01",
    title: "Install the package",
    text: "Start with a short CLI path so the first component can be added immediately.",
    code: "npm install azamat-ui\nnpx azamat-ui@latest add button",
  },
  {
    step: "02",
    title: "Wire tokens and theme",
    text: "Configure the shared styling layer once, then reuse the same visual language across all screens.",
    code: "import \"./styles.css\"\nimport { ThemeProvider } from \"@/components/theme-provider\"",
  },
  {
    step: "03",
    title: "Move through docs and playground",
    text: "Users should be able to learn, preview and copy code without leaving the system.",
    code: "/docs/components/button\n/playground/button\n/blocks",
  },
]

export const landingArchitecture = [
  {
    title: "Public landing",
    text: "A clean marketing entry point for story, release status, feature proof and primary actions.",
    points: ["Hero + proof", "Install CTA", "No sidebar clutter", "Clear product story"],
    icon: PanelTopIcon,
  },
  {
    title: "Component docs",
    text: "Each component page combines install, usage, API, examples and accessibility guidance in one route.",
    points: ["Usage tabs", "API table", "Helpful actions", "Theme preview"],
    icon: BookOpenIcon,
  },
  {
    title: "Interactive playground",
    text: "Variants, sizes, icons and states are adjusted live while code output changes with them.",
    points: ["Inspector controls", "Copy code", "Viewport switch", "Keyboard checks"],
    icon: MousePointerClickIcon,
  },
]

export const landingTemplateHighlights = [
  {
    title: "Dashboard starter",
    text: "Analytics overview with stat cards, charts and activity tables for admin-style products.",
    tags: ["Dashboard", "Analytics", "Sidebar"],
  },
  {
    title: "CRM workspace",
    text: "Lead pipeline, stage tracking, customer context and action-heavy widgets built from shared parts.",
    tags: ["CRM", "Pipeline", "Kanban"],
  },
  {
    title: "Commerce admin",
    text: "Orders, inventory, invoices and product surfaces using one layout and data-display language.",
    tags: ["Commerce", "Orders", "Tables"],
  },
]

export const landingLibraryStack = [
  "React + TypeScript foundation",
  "React Router based URL architecture",
  "Tailwind CSS utility styling",
  "Reusable docs, blocks and template primitives",
]

export const globalSearchItems: GlobalSearchItem[] = [
  ...componentCatalog.flatMap((item) => [
    {
      title: `${item.title} docs`,
      description: item.description,
      href: componentDocsPath(item.slug),
      group: "Docs" as const,
      shortcut: "D",
    },
    {
      title: `${item.title} playground`,
      description: `Interactive playground for ${item.title.toLowerCase()} states and scenarios.`,
      href: componentPlaygroundPath(item.slug),
      group: "Playground" as const,
      shortcut: "P",
    },
  ]),
  ...moduleFamilyCatalog.map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
    group: "Family" as const,
    shortcut: "F",
  })),
  ...moduleFamilyCatalog.flatMap((item) =>
    item.exports.map((exportName) => ({
      title: exportName,
      description: `${item.title} family export`,
      href: moduleFamilyExportPath(item.slug, exportName),
      group: "Export" as const,
      shortcut: "E",
    }))
  ),
  ...templateRecords.map((item) => ({
    title: item.title,
    description: item.summary,
    href: `/templates/${item.slug}`,
    group: "Template" as const,
    shortcut: "T",
  })),
]

export const footerFeatureStrip = [
  { title: "Copy blocks", text: "Grab any block and paste into your project.", icon: BlocksIcon },
  { title: "Customize", text: "Easily tweak styles and content to match your brand.", icon: SlidersHorizontalIcon },
  { title: "Ship faster", text: "Focus on building your product, not the UI.", icon: RocketIcon },
]

function RocketIcon(props: React.ComponentProps<typeof SparklesIcon>) {
  return <CreditCardIcon {...props} />
}
