import type { ComponentDemoMock } from "../types"

export const appShellMock: ComponentDemoMock = {
  code: `import { AppHeader, AppSidebar, AppShell, Breadcrumbs, InfoCard, MetricGrid, PageContainer, PageHeader, SidebarNav, Button } from "azamat-ui-kit"

const navItems = [
  { key: "overview", label: "Overview", href: "/overview", active: true },
  { key: "products", label: "Products", href: "/products" },
  { key: "settings", label: "Settings", href: "/settings" },
]

const metrics = [
  { key: "mrr", label: "MRR", value: "$84k", description: "+14% vs last month", trend: "up" },
  { key: "sessions", label: "Active sessions", value: "1,240", description: "12% live growth" },
  { key: "issues", label: "Open issues", value: "23", description: "3 priority", trend: "down" },
]

export function Example() {
  return (
    <AppShell
      sidebarWidth="default"
      mainClassName="p-4"
      sidebar={
        <AppSidebar
          header={<div className="px-3 py-2 text-sm font-semibold">Azamat Workspace</div>}
          footer={<div className="px-3 py-2 text-xs aui-text-muted">v1.2.0</div>}
        >
          <SidebarNav items={navItems} />
        </AppSidebar>
      }
      header={<AppHeader left="Admin Console" right={<Button variant="outline">Open command</Button>} />}
      aside={<InfoCard title="Workspace" description="Metrics, alerts, and quick access cards." compact>Aside slot keeps secondary context near main content.</InfoCard>}
    >
      <PageContainer size="lg">
        <PageHeader
          eyebrow="Product dashboard"
          title="Teams and activity"
          description="Use shell slots for consistent layout and mobile-safe nav control."
          breadcrumbs={<Breadcrumbs items={[
            { key: "home", label: "Home", href: "/" },
            { key: "dashboard", label: "Dashboard", current: true },
          ]} />}
          actions={<Button variant="outline" size="sm">Manage</Button>}
        />
        <div className="mt-4">
          <MetricGrid items={metrics} compact />
        </div>
      </PageContainer>
    </AppShell>
  )
}`,
  cliCommand: "npx azix add app-shell",
  highlights: ["Shell slots (header, sidebar, aside)", "Static and mobile sidebar behavior", "Breadcrumbs inside page header", "Metric block composition"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "settings-form"],
  scenarios: [
    { title: "Dashboard shell", description: "Build an app frame with reusable header, sidebar and aside areas." },
    { title: "Router-aware layout", description: "Keep navigation and route content separated by region for SPA and SSR pages." },
    { title: "Mobile fallback", description: "Toggle mobile menu and keep aside optional for narrow screens." },
  ],
  capabilityNotes: [
    "Use AppShell when every page shares a stable structure: header, sidebar, main and optional aside.",
    "Keep sidebar composition explicit so route-level content stays predictable and testable.",
    "Pass controlled `sidebarCollapsed` and `mobileSidebarOpen` when app state is owned by a global layout manager.",
    "Avoid overloading the aside region in mobile contexts; hide non-essential context when needed.",
  ],
}
