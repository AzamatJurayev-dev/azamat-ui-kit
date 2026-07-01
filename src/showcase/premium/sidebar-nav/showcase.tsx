import * as React from "react"

import { Badge, SidebarNav } from "@/index"

import type { ComponentDemoProps } from "../types"

const baseItems = [
  { key: "overview", label: "Overview", href: "/overview" },
  { key: "products", label: "Products", href: "/products" },
  { key: "settings", label: "Settings", href: "/settings", disabled: true },
  { key: "billing", label: "Billing", href: "/billing" },
]

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function SidebarNavShowcase({ mode }: ComponentDemoProps) {
  const [activeKey, setActiveKey] = React.useState(baseItems[0]?.key ?? "overview")
  const [collapsed, setCollapsed] = React.useState(mode === "playground")

  const items = React.useMemo(
    () =>
      baseItems.map((item) => ({
        ...item,
        active: item.key === activeKey,
        onSelect: () => setActiveKey(item.key),
      })),
    [activeKey],
  )

  const selectedLabel = baseItems.find((item) => item.key === activeKey)?.label ?? "Overview"

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Route navigation</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Sidebar nav should orient the page fast</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Show active route, disabled destination, and collapsed behavior in one calm preview instead of a standalone toy sidebar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Active route</Badge>
            <Badge variant="outline" className="rounded-full">Disabled item</Badge>
            <Badge variant="outline" className="rounded-full">Collapsed</Badge>
          </div>
        </div>
      </section>

      <div className={`${panelClass} grid gap-4 xl:grid-cols-[0.92fr_1.08fr]`}>
        <section>
          <p className="text-sm font-medium aui-text-muted">Workspace navigation</p>
          <div className="mt-3 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-3">
            <SidebarNav items={items} collapsed={collapsed} />
          </div>
        </section>

        <section>
          <p className="text-sm font-medium aui-text-muted">Current context</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{selectedLabel}</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">
            Collapsed mode is useful only when the shell still leaves enough context elsewhere. Do not collapse navigation if labels are the only orientation cue on the page.
          </p>
          {mode === "playground" ? (
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="mt-4 rounded-full border border-[color:var(--aui-divider)] px-4 py-2 text-sm aui-text-muted transition hover:text-[color:var(--aui-fg)]"
            >
              {collapsed ? "Expand nav" : "Collapse nav"}
            </button>
          ) : null}
        </section>
      </div>
    </div>
  )
}
