import * as React from "react"

import { Badge, Breadcrumbs, Button } from "@/index"

import type { ComponentDemoProps } from "../types"

const pages = [
  { key: "home", label: "Home", href: "/" },
  { key: "apps", label: "Apps", href: "/apps" },
  { key: "workspace", label: "Workspace", href: "/apps/workspace" },
  { key: "team", label: "Team settings", href: "/apps/workspace/team" },
  { key: "security", label: "Security", href: "/apps/workspace/team/security" },
  { key: "overview", label: "Overview", current: true },
]

const compactPages = [
  { key: "home", label: "Home", href: "/" },
  { key: "dashboard", label: "Dashboard", current: true },
]

export function BreadcrumbsShowcase({ mode }: ComponentDemoProps) {
  const [activeMode, setActiveMode] = React.useState<"full" | "compact">("full")

  const selectedItems = React.useMemo(() => (activeMode === "full" ? pages : compactPages), [activeMode])
  const separator = activeMode === "full" ? "/" : <span className="px-1 aui-text-muted">→</span>

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Path context</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Breadcrumbs should answer where the user is</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Keep them short, directional, and useful. The preview should show both a fuller application path and a compact route path.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Full path</Badge>
            <Badge variant="outline" className="rounded-full">Compact path</Badge>
          </div>
        </div>
      </section>

      {mode === "playground" ? (
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant={activeMode === "full" ? "default" : "outline"} onClick={() => setActiveMode("full")}>
            Full path
          </Button>
          <Button size="sm" variant={activeMode === "compact" ? "default" : "outline"} onClick={() => setActiveMode("compact")}>
            Compact path
          </Button>
        </div>
      ) : null}

      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3">
        <Breadcrumbs items={selectedItems} separator={separator} maxItems={activeMode === "full" ? 4 : undefined} />
      </div>
    </div>
  )
}
