import type { TemplateRecord } from "../site-data"

export const crmDashboardTemplate: TemplateRecord = {
  slug: "crm-dashboard",
  title: "CRM workspace",
  eyebrow: "Pipeline template",
  summary: "A CRM-oriented shell for deals, stages, team ownership and relationship history with heavier action density.",
  status: "Review",
  previewTone: "crm",
  navItems: ["Overview", "Pipeline", "Accounts", "Meetings", "Forecast", "Reports", "Settings"],
  metrics: [
    { label: "Open deals", value: "142", delta: "+18" },
    { label: "Pipeline value", value: "$182k", delta: "+9.4%" },
    { label: "Win rate", value: "24%", delta: "+2.3%" },
  ],
  sections: [
    {
      key: "overview",
      label: "Overview",
      title: "CRM overview",
      description: "Track stage velocity, assigned owners and recent customer touchpoints in one place.",
      bullets: ["Stage lanes", "Owner snapshot", "Customer touchpoints", "Deal summary"],
      statCards: [
        { label: "Qualified", value: "58", meta: "+6" },
        { label: "Meetings", value: "24", meta: "This week" },
        { label: "Forecast", value: "$182k", meta: "Q3" },
      ],
      supportCards: [
        { title: "Pipeline board", text: "Stage-based view with owner avatars and weighted deal cards.", status: "Board" },
        { title: "Activity feed", text: "Calls, emails and meeting updates grouped by account.", status: "Activity" },
        { title: "Risk watch", text: "Deals missing follow-up or next step are surfaced immediately.", status: "Risk" },
      ],
    },
    {
      key: "leads",
      label: "Leads",
      title: "Lead board",
      description: "Focus on capturing, qualifying and routing new leads without leaving the board.",
      bullets: ["Qualification cards", "Score badges", "Owner routing", "Next-action queue"],
      statCards: [
        { label: "Fresh leads", value: "96", meta: "+14" },
        { label: "Assigned", value: "81", meta: "84%" },
        { label: "Avg. score", value: "72", meta: "Healthy" },
      ],
      supportCards: [
        { title: "Qualification score", text: "Each lead card exposes confidence, urgency and fit.", status: "Scoring" },
        { title: "Owner router", text: "Regional assignment rules are visible instead of hidden.", status: "Routing" },
        { title: "Next action", text: "Call, email and demo steps sit directly inside the preview.", status: "Tasks" },
      ],
    },
    {
      key: "reports",
      label: "Reports",
      title: "Revenue reports",
      description: "Sales reporting grouped by rep, source and stage with export-ready formatting.",
      bullets: ["Rep summary", "Source breakdown", "Stage conversion", "Monthly totals"],
      statCards: [
        { label: "Rep avg.", value: "$15.1k", meta: "+4.2%" },
        { label: "Source lift", value: "12%", meta: "Referral" },
        { label: "Stage drop", value: "8%", meta: "Negotiation" },
      ],
      supportCards: [
        { title: "Rep summary table", text: "Performance rows with weighted pipeline and close rate.", status: "Rep" },
        { title: "Source mix", text: "Inbound channels compared with compact stacked indicators.", status: "Source" },
        { title: "Forecast compare", text: "Quarter-on-quarter deltas stay readable in one block.", status: "Forecast" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      title: "CRM settings",
      description: "Manage stages, scoring thresholds and automations from one compact settings area.",
      bullets: ["Stage config", "Scoring rules", "Automation toggles", "Permissions"],
      statCards: [
        { label: "Stages", value: "7", meta: "2 hidden" },
        { label: "Automations", value: "12", meta: "9 active" },
        { label: "Permission sets", value: "4", meta: "Team-wide" },
      ],
      supportCards: [
        { title: "Stage editor", text: "Deal states can be reordered with visible dependency notes.", status: "Stages" },
        { title: "Automation rules", text: "Scoring and assignment rules are grouped for fast review.", status: "Automation" },
        { title: "Team permissions", text: "Access scope and role coverage presented in-line.", status: "Access" },
      ],
    },
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
}
