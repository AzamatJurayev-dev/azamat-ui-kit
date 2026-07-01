import * as React from "react"
import { BarChart3Icon, CreditCardIcon, FolderIcon, HomeIcon, SettingsIcon } from "lucide-react"

import { AppSidebar, Badge, Button } from "@/index"

import type { ComponentDemoProps } from "../types"

const navItems = [
  { key: "overview", label: "Overview", href: "/overview", icon: <HomeIcon className="size-4" /> },
  { key: "projects", label: "Projects", href: "/projects", icon: <FolderIcon className="size-4" />, badge: "8" },
  { key: "reports", label: "Reports", href: "/reports", icon: <BarChart3Icon className="size-4" /> },
  { key: "billing", label: "Billing", href: "/billing", icon: <CreditCardIcon className="size-4" />, badge: "2" },
  { key: "settings", label: "Settings", href: "/settings", icon: <SettingsIcon className="size-4" />, disabled: true },
]

const panelClass = "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function AppSidebarShowcase({ mode }: ComponentDemoProps) {
  const [activeKey, setActiveKey] = React.useState("overview")
  const [collapsed, setCollapsed] = React.useState(mode === "playground")

  const items = React.useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        active: item.key === activeKey,
        onSelect: () => setActiveKey(item.key),
      })),
    [activeKey],
  )

  const activeItem = navItems.find((item) => item.key === activeKey)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Navigation shell</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Sidebar should feel install-ready on its own</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This preview keeps the focus on one reusable sidebar surface: identity, route items, badges, disabled states and collapsed behavior.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Header slot</Badge>
            <Badge variant="outline" className="rounded-full">Badges</Badge>
            <Badge variant="outline" className="rounded-full">Collapsed rail</Badge>
          </div>
        </div>
      </section>

      {mode === "playground" ? (
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant={collapsed ? "outline" : "default"} onClick={() => setCollapsed((value) => !value)}>
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setActiveKey("reports")}>
            Jump to reports
          </Button>
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <section className={panelClass}>
          <AppSidebar
            collapsed={collapsed}
            items={items}
            header={<div className="px-3 py-2 text-sm font-semibold">Azamat Workspace</div>}
            footer={<div className="aui-text-muted px-3 py-2 text-xs">Starter plan • 3 editors</div>}
            className="min-h-[440px] rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)]"
          />
        </section>

        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Current route</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{activeItem?.label ?? "Overview"}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
            Start with the sidebar itself as a stable navigation contract. Only after this feels right should the app introduce a bigger shell, page header, or route-level statistics around it.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] aui-text-muted">Mode</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{collapsed ? "Collapsed" : "Expanded"}</p>
            </div>
            <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] aui-text-muted">Visible items</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{items.length}</p>
            </div>
            <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] aui-text-muted">Disabled</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">1 route</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
