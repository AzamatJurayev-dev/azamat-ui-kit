import type { ComponentDemoMock } from "../types"

export const appSidebarMock: ComponentDemoMock = {
  code: `import { AppSidebar } from "@/components/layout/app-sidebar"

const items = [
  { key: "overview", label: "Overview", href: "/overview", active: true },
  { key: "customers", label: "Customers", href: "/customers", badge: "12" },
  { key: "billing", label: "Billing", href: "/billing" },
  { key: "settings", label: "Settings", href: "/settings", disabled: true },
]

export function Example() {
  return (
    <AppSidebar
      items={items}
      header={<div className="px-3 py-2 text-sm font-semibold">Azamat Workspace</div>}
      footer={<div className="px-3 py-2 text-xs text-muted-foreground">Starter plan</div>}
    />
  )
}`,
  highlights: ["Header and footer slots", "Active and disabled items", "Collapsed rail support", "Custom link rendering for routers"],
  scenarios: [
    { title: "Workspace shell", description: "Use one sidebar contract across dashboards, settings and dense internal tools." },
    { title: "Router integration", description: "Swap anchors with framework links through renderLink without rewriting item state." },
    { title: "Collapsed desktop rail", description: "Keep icons visible when space is tight, but preserve labels in expanded mode." },
  ],
  capabilityNotes: [
    "Keep one items array as the source of truth for label, badge, disabled and active route state.",
    "Use the header slot for workspace identity, not for unrelated page actions.",
    "Collapsed mode works best when icons stay distinctive and current route is still obvious.",
    "Prefer AppSidebar for reusable nav chrome; move to AppShell only when the full page frame is also shared.",
  ],
}
