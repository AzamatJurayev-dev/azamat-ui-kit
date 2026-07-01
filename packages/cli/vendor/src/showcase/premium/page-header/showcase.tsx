import * as React from "react"

import { Badge, Breadcrumbs, Button } from "@/index"
import { PageHeader } from "@/components/layout/page-header"

import type { ComponentDemoProps } from "../types"

const baseBreadcrumbs = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "active", label: "Workspace", current: true },
]

export function PageHeaderShowcase({ mode }: ComponentDemoProps) {
  const [sticky, setSticky] = React.useState(mode === "playground")

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4 sm:p-5">
        <PageHeader
          eyebrow="Workspace"
          title="Team settings"
          description="Configure profile, billing and preferences from this page-level surface."
          breadcrumbs={<Breadcrumbs items={baseBreadcrumbs} />}
          actions={<Button size="sm">Save</Button>}
          meta={
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full">Breadcrumbs</Badge>
              <Badge variant="outline" className="rounded-full">Action</Badge>
              <Badge variant="outline" className="rounded-full">Sticky option</Badge>
            </div>
          }
          sticky={sticky}
        />
      </div>

      {mode === "playground" ? (
        <button className="rounded-full border border-[color:var(--aui-divider)] px-4 py-2 text-sm aui-text-muted" onClick={() => setSticky((value) => !value)}>
          {sticky ? "Disable sticky" : "Enable sticky"}
        </button>
      ) : null}
    </div>
  )
}
