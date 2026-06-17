export type Product = {
  id: string
  name: string
  sku: string
  status: "active" | "inactive" | "draft"
  price: number
  stock: number
  category: string
}

export type ProductFormValues = {
  search: string
  name: string
  password: string
  phone: string
  price: number | null
  status: string
  customerId: string
  active: boolean
  notes: string
  availableFrom: string
  dateFrom: string
  dateTo: string
  pickerDate: string
  pickerRangeFrom: string
  pickerRangeTo: string
}

export type TagOption = {
  value: string
  label: string
  description: string
}

export type OptionItem = {
  value: string
  label: string
  description: string
}

export type TemplateShowcase = {
  id: string
  title: string
  description: string
  focus: string
  category: string
  pages: string[]
  modules: string[]
  tone: string
}

export type WizardStep = {
  id: string
  title: string
  description: string
}

export const products: Product[] = [
  { id: "1", name: "Premium Coffee", sku: "COF-001", status: "active", price: 42000, stock: 32, category: "Drinks" },
  { id: "2", name: "Green Tea", sku: "TEA-002", status: "inactive", price: 18000, stock: 12, category: "Drinks" },
  { id: "3", name: "Chocolate Box", sku: "CHO-003", status: "draft", price: 73000, stock: 0, category: "Snacks" },
  { id: "4", name: "Water Bottle", sku: "WAT-004", status: "active", price: 6000, stock: 160, category: "Drinks" },
  { id: "5", name: "Office Cookies", sku: "COO-005", status: "active", price: 29000, stock: 44, category: "Snacks" },
  { id: "6", name: "Gift Pack", sku: "GIF-006", status: "inactive", price: 128000, stock: 7, category: "Gifts" },
]

export const tagOptions: TagOption[] = [
  { value: "new", label: "New", description: "Recently added" },
  { value: "popular", label: "Popular", description: "Top selling" },
  { value: "discount", label: "Discount", description: "Has active offer" },
  { value: "warehouse", label: "Warehouse", description: "Stock controlled" },
]

export const customerOptions: OptionItem[] = [
  { value: "1", label: "Azamat Store", description: "Retail customer" },
  { value: "2", label: "Bilimza Academy", description: "Education customer" },
  { value: "3", label: "Distron Market", description: "Wholesale customer" },
]

export const wizardSteps: WizardStep[] = [
  { id: "info", title: "Info", description: "Basic details" },
  { id: "settings", title: "Settings", description: "Options" },
  { id: "finish", title: "Finish", description: "Review" },
]

export const templateCatalog: TemplateShowcase[] = [
  {
    id: "template-crm",
    title: "CRM Pulse",
    description: "Kanban pipeline, lead stages, quota metrics, and activity timeline.",
    focus: "Sales workflows",
    category: "Enterprise",
    pages: ["Pipeline", "Leads", "Accounts", "Reports", "Settings"],
    modules: ["Data table", "Form", "Status badges", "Filters", "Modals", "Sidebar"],
    tone: "emerald",
  },
  {
    id: "template-analytics",
    title: "Growth Radar",
    description: "SaaS analytics dashboard with KPI cards, cohort trends, and retention signals.",
    focus: "Product analytics",
    category: "SaaS",
    pages: ["Overview", "Funnels", "Retention", "Segments", "Budgets"],
    modules: ["Cards", "Tabs", "Calendar", "Progress", "Data table"],
    tone: "blue",
  },
  {
    id: "template-ecommerce",
    title: "Store Command",
    description: "Inventory catalog management, order lifecycle, and shipping controls.",
    focus: "E-commerce ops",
    category: "Marketplace",
    pages: ["Catalog", "Orders", "Stock", "Customers", "Returns"],
    modules: ["File upload", "Stepper", "Date picker", "Data table", "Form"],
    tone: "violet",
  },
  {
    id: "template-operations",
    title: "Ops Center",
    description: "Incident board, SLA timeline, and on-call checklist for operations teams.",
    focus: "Incident response",
    category: "Ops",
    pages: ["Incidents", "Playbooks", "Team", "Escalation", "Audit"],
    modules: ["Overlays", "Toasts", "Tabs", "Status badges", "Sidebar"],
    tone: "amber",
  },
  {
    id: "template-finance",
    title: "Finance Dock",
    description: "Invoice tracker and spend analytics with approval flow and role visibility.",
    focus: "Finance controls",
    category: "FinTech",
    pages: ["Dashboard", "Invoices", "Approvals", "Payments", "Forecast"],
    modules: ["Form", "Dialog", "Stepper", "Charts", "Shell layouts"],
    tone: "rose",
  },
  {
    id: "template-hub",
    title: "Creator Hub",
    description: "Content publishing, campaign status, and editorial review workflow.",
    focus: "Content operations",
    category: "Media",
    pages: ["Campaigns", "Assets", "Calendar", "Approvals", "Analytics"],
    modules: ["Tabs", "Cards", "File upload", "Status badges", "Commands"],
    tone: "indigo",
  },
]

export function getStatusTone(status: Product["status"]) {
  if (status === "active") return "success" as const
  if (status === "inactive") return "muted" as const
  return "warning" as const
}

export function formatMoney(value: number) {
  return `${value.toLocaleString()} UZS`
}
