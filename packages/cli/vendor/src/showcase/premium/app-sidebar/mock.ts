import type { ComponentDemoMock } from "../types"

export const appSidebarMock: ComponentDemoMock = {
  code: `import { Sidebar } from "tembro"

const items = [
  { key: "overview", label: "Overview", href: "/overview", active: true, sectionLabel: "Workspace" },
  {
    key: "customers",
    label: "Customers",
    badge: "12",
    defaultExpanded: true,
    items: [
      { key: "active", label: "Active", href: "/customers/active" },
      { key: "archived", label: "Archived", href: "/customers/archived" },
    ],
  },
  { key: "billing", label: "Billing", href: "/billing", sectionLabel: "Manage" },
  { key: "settings", label: "Settings", href: "/settings", disabled: true },
]

export function Example() {
  return (
    <Sidebar
      items={items}
      navigationLabel="Workspace navigation"
      itemSize="md"
      activeIndicator="bar"
      showSectionLabels
      responsive
      renderLink={({ item: _item, href = "/", ...props }) => (
        <a {...props} href={href} />
      )}
      header={<div className="px-3 py-2 text-sm font-semibold">Azamat Workspace</div>}
      footerAccount={{ label: "Azamat Workspace", description: "Starter plan", avatar: "AW" }}
      secondaryActions={[{ key: "support", label: "Support", href: "/support" }]}
      onItemSelect={(item) => console.log(item.key)}
    />
  )
}`,
  highlights: ["Nested and collapsible route groups", "Three density modes", "Bar, pill and minimal active indicators", "Responsive mobile navigation", "Custom link rendering"],
  scenarios: [
    { title: "Workspace shell", description: "Use one sidebar contract across dashboards, settings and dense internal tools." },
    { title: "Router integration", description: "Swap anchors with framework links through renderLink without rewriting item state." },
    { title: "Collapsed desktop rail", description: "Keep icons visible when space is tight, but preserve labels in expanded mode." },
  ],
  capabilityNotes: [
    "Keep one items array as the source of truth for label, badge, disabled and active route state.",
    "Use the header slot for workspace identity, not for unrelated page actions.",
    "Collapsed mode works best when icons stay distinctive and current route is still obvious.",
    "Use navigationLabel and the mobile labels when the product language is not English.",
    "Prefer Sidebar for reusable nav chrome; move to AppShell only when the full page frame is also shared.",
  ],
}
