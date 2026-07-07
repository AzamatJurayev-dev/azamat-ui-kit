import * as React from "react"

import { Badge, Pagination } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function PaginationShowcase({ mode }: ComponentDemoProps) {
  const [page, setPage] = React.useState(6)
  const [pageCount, setPageCount] = React.useState(18)
  const [showEdges, setShowEdges] = React.useState(true)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Navigation control</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Pagination should preserve context while moving through data</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Good pagination feels quiet: the active page is obvious, edge jumps are available, and large datasets collapse into readable ellipsis states.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Controlled</Badge>
            <Badge variant="outline" className="rounded-full">Large lists</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium aui-text-muted">Review queue pages</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Showing page <span className="font-medium aui-text-strong">{page}</span> of <span className="font-medium aui-text-strong">{pageCount}</span>.</p>
          </div>
          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} showEdges={showEdges} />
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Why this matters</p>
          <div className="mt-4 space-y-3 text-sm leading-6 aui-text-muted">
            <p>Tables, audit trails, and inboxes all need stable navigation that does not compete with the data itself.</p>
            <p>Ellipsis should reduce noise, not hide where the user currently is.</p>
          </div>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Current demo state</p>
          <div className="mt-4 space-y-2 text-sm leading-6 aui-text-muted">
            <p>Page: <span className="font-medium aui-text-strong">{page}</span></p>
            <p>Total pages: <span className="font-medium aui-text-strong">{pageCount}</span></p>
            <p>Edges: <span className="font-medium aui-text-strong">{showEdges ? "visible" : "hidden"}</span></p>
          </div>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-full border border-[color:var(--aui-divider)] px-3 py-2 text-sm" onClick={() => setPage(Math.max(1, page - 1))}>
              Previous page
            </button>
            <button type="button" className="rounded-full border border-[color:var(--aui-divider)] px-3 py-2 text-sm" onClick={() => setPage(Math.min(pageCount, page + 1))}>
              Next page
            </button>
            <button type="button" className="rounded-full border border-[color:var(--aui-divider)] px-3 py-2 text-sm" onClick={() => setShowEdges((value) => !value)}>
              Toggle edges
            </button>
            <button type="button" className="rounded-full border border-[color:var(--aui-divider)] px-3 py-2 text-sm" onClick={() => setPageCount((value) => (value === 18 ? 8 : 18))}>
              Toggle page count
            </button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
