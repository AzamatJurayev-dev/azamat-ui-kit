import * as React from "react"

import { Badge, PageContainer } from "@/index"

import type { ComponentDemoProps } from "../types"

type PageSize = "default" | "sm" | "md" | "lg" | "xl" | "full"

const sizes: PageSize[] = ["default", "sm", "md", "lg", "xl", "full"]

const containerClassName = "rounded-xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4"

export function PageContainerShowcase({ mode }: ComponentDemoProps) {
  const [size, setSize] = React.useState<PageSize>("lg")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Content width</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Page container should stabilize layout width</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This wrapper is not decorative. It keeps headings, forms, tables, and body copy aligned so every route does not invent its own max-width.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Width scale</Badge>
            <Badge variant="outline" className="rounded-full">Content rhythm</Badge>
          </div>
        </div>
      </section>

      {mode === "playground" ? (
        <div className="flex flex-wrap gap-2">
          {sizes.map((entry) => (
            <button key={entry} className={`rounded-full px-4 py-2 text-sm ${size === entry ? "bg-[color:var(--aui-surface-strong)] text-[color:var(--aui-surface-strong-foreground)]" : "border border-[color:var(--aui-divider)] aui-text-muted"}`} onClick={() => setSize(entry)}>
              {entry}
            </button>
          ))}
        </div>
      ) : null}

      <PageContainer size={size} className={containerClassName}>
        <p className="aui-text-muted text-sm">Active size: <span className="font-medium aui-text-strong">{size}</span></p>
        <p className="aui-text-muted mt-2 text-sm">Use this wrapper to keep internal sections aligned across pages and avoid route-by-route width drift.</p>
      </PageContainer>
    </div>
  )
}
