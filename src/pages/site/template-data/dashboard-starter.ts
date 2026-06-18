import type { TemplateRecord } from "../site-data"

export const dashboardStarterTemplate: TemplateRecord = {
  slug: "dashboard-starter",
  title: "Dashboard starter",
  eyebrow: "Analytics template",
  summary: "A production-style admin workspace with KPI cards, quick actions, dense data panels and reusable page scaffolding.",
  status: "Live",
  previewTone: "dashboard",
  navItems: ["Overview", "Analytics", "Customers", "Orders", "Products", "Reports", "Settings"],
  metrics: [
    { label: "Revenue", value: "$24,780", delta: "+12.8%" },
    { label: "Active users", value: "18,390", delta: "+7.2%" },
    { label: "Conversion", value: "6.3%", delta: "+1.1%" },
  ],
  sections: [
    {
      key: "overview",
      label: "Overview",
      title: "Overview workspace",
      description: "High-level metrics, chart zones and recent activity for fast decision making.",
      bullets: ["KPI cards", "Chart panel", "Recent activity", "Quick actions"],
      statCards: [
        { label: "MRR", value: "$24.7k", meta: "+8.4%" },
        { label: "New users", value: "1,284", meta: "+12%" },
        { label: "Orders", value: "1,429", meta: "+6.1%" },
      ],
      supportCards: [
        { title: "Revenue overview", text: "Layered chart surface with monthly trend and readable comparison context.", status: "Chart" },
        { title: "Recent workspaces", text: "Dense row list with active status, owner and export actions.", status: "Table" },
        { title: "Launch checklist", text: "Release QA, docs sync and route verification grouped together.", status: "Ops" },
      ],
    },
    {
      key: "leads",
      label: "Leads",
      title: "Acquisition pipeline",
      description: "A lead-focused view with owner tracking, source breakdown and response status.",
      bullets: ["Lead sources", "Owner table", "Priority chips", "Team assignments"],
      statCards: [
        { label: "Inbound leads", value: "482", meta: "+21" },
        { label: "Qualified", value: "168", meta: "34.8%" },
        { label: "Avg. response", value: "18m", meta: "-6m" },
      ],
      supportCards: [
        { title: "Lead source mix", text: "Paid, organic and referral channels presented with visible weight.", status: "Sources" },
        { title: "Qualification queue", text: "Team ownership and next action state shown per lead.", status: "Queue" },
        { title: "Priority routing", text: "Urgent, medium and nurture lanes ready for follow-up flows.", status: "Routing" },
      ],
    },
    {
      key: "reports",
      label: "Reports",
      title: "Reporting layout",
      description: "Dense but readable reporting surface with filters, exports and period comparisons.",
      bullets: ["Date filters", "Comparison rows", "Export action", "Readable totals"],
      statCards: [
        { label: "This month", value: "$98.4k", meta: "+9.2%" },
        { label: "Last month", value: "$90.1k", meta: "Baseline" },
        { label: "Export jobs", value: "14", meta: "Today" },
      ],
      supportCards: [
        { title: "Comparison table", text: "Side-by-side totals and category deltas without visual clutter.", status: "Report" },
        { title: "Filter stack", text: "Date, team and source filters stay compact above the grid.", status: "Filters" },
        { title: "CSV / PDF export", text: "Secondary action block for reporting workflows.", status: "Export" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      title: "Workspace settings",
      description: "Preferences, connected modules and roles grouped into a calmer management view.",
      bullets: ["Profile controls", "Role rules", "Module toggles", "Audit actions"],
      statCards: [
        { label: "Active roles", value: "12", meta: "3 custom" },
        { label: "Connected modules", value: "8", meta: "2 pending" },
        { label: "Audit events", value: "248", meta: "7d" },
      ],
      supportCards: [
        { title: "Role matrix", text: "Permission blocks with explicit read/write visibility.", status: "Roles" },
        { title: "Module toggles", text: "Settings page can switch layouts, exports and notifications.", status: "Modules" },
        { title: "Audit controls", text: "Sensitive actions are grouped into dedicated management cards.", status: "Audit" },
      ],
    },
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
}
