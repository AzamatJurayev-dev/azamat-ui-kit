import * as React from "react"

import { Badge, Breadcrumbs, Button, InfoCard, MetricGrid, PageContainer, SidebarNav } from "@/index"
import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { PageHeader } from "@/components/layout/page-header"

import type { ComponentDemoProps } from "../types"

const navigationItems = [
  { key: "overview", label: "Overview", href: "#overview" },
  { key: "products", label: "Products", href: "#products" },
  { key: "billing", label: "Billing", href: "#billing" },
  { key: "settings", label: "Settings", href: "#settings" },
]

const metrics = [
  { key: "mrr", label: "MRR", value: "$64k", description: "11% vs last week", tone: "success" as const },
  { key: "users", label: "Users", value: "1,020", description: "3% churn risk", tone: "warning" as const },
  { key: "tasks", label: "Tasks", value: "58", description: "5 in progress", tone: "info" as const },
  { key: "response", label: "Latency", value: "1.2s", description: "P95 API response", tone: "default" as const },
]

export function AppShellShowcase({ mode }: ComponentDemoProps) {
  const [active, setActive] = React.useState("overview")
  const [collapsed, setCollapsed] = React.useState(false)

  const navItems = navigationItems.map((item) => ({
    ...item,
    active: item.key === active,
    onSelect: () => setActive(item.key),
  }))

  const activeLabel = navigationItems.find((item) => item.key === active)?.label ?? "Overview"

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Application frame</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Reusable shell preview</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">
              Header, sidebar, main content and aside should feel like one predictable route frame.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Header</Badge>
            <Badge variant="outline" className="rounded-full">Sidebar</Badge>
            <Badge variant="outline" className="rounded-full">Aside</Badge>
          </div>
        </div>
      </div>

      {mode === "playground" ? (
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant={collapsed ? "outline" : "default"} onClick={() => setCollapsed((value) => !value)}>
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </Button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)]">
        <AppHeader
          className="border-b border-[color:var(--aui-divider)] px-4 py-3"
          left="Product shell"
          right={<Button size="sm" variant="outline">Profile</Button>}
        />

        <div className="grid min-h-[420px] lg:grid-cols-[250px_minmax(0,1fr)_260px]">
          <AppSidebar
            className={collapsed ? "hidden lg:block" : ""}
            header={<div className="px-3 py-2 text-sm font-semibold">AZA Studio</div>}
            footer={<div className="aui-text-muted px-3 py-2 text-xs">Shell footer</div>}
          >
            <SidebarNav items={navItems} />
          </AppSidebar>

          <div className="min-w-0 border-x border-[color:var(--aui-divider)] p-4">
            <PageContainer size="lg">
              <PageHeader
                eyebrow="Workspace"
                title={activeLabel}
                description="Use shared shell primitives to keep regions stable across routes."
                breadcrumbs={
                  <Breadcrumbs
                    items={[
                      { key: "home", label: "Home", href: "/" },
                      { key: "components", label: "Components", href: "/components" },
                      { key: "active", label: activeLabel, current: true },
                    ]}
                  />
                }
                actions={<Button size="sm">Manage</Button>}
              />

              <div className="mt-4">
                <MetricGrid items={metrics} columns={2} compact />
              </div>
            </PageContainer>
          </div>

          <aside className="hidden p-4 lg:block">
            <InfoCard title="Quick actions" description="Support content can live in the aside." compact />
          </aside>
        </div>
      </div>
    </div>
  )
}
