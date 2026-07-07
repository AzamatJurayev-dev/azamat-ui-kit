import * as React from "react"

import { Button, DataState } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function DataStateShowcase() {
  const [status, setStatus] = React.useState<"loading" | "empty" | "error" | "success">("loading")

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">DataState is the panel-level fallback surface</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use it when a card or module needs explicit state handling beyond a raw spinner or empty paragraph.
        </p>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap gap-2">
          {(["loading", "empty", "error", "success"] as const).map((item) => (
            <Button key={item} size="sm" variant={status === item ? "secondary" : "outline"} onClick={() => setStatus(item)}>
              {item}
            </Button>
          ))}
        </div>

        <div className="mt-5">
          <DataState
            status={status}
            title={
              status === "success"
                ? "Data ready"
                : status === "error"
                  ? "Unable to load metrics"
                  : undefined
            }
            description={
              status === "success"
                ? "The request completed and the panel can continue rendering detail content."
                : status === "error"
                  ? "The upstream request failed. Retry the panel request before leaving the route."
                  : undefined
            }
            onRetry={status === "error" ? () => setStatus("loading") : undefined}
            actions={status === "success" ? <Button size="sm" variant="outline">Open details</Button> : undefined}
          />
        </div>
      </section>
    </div>
  )
}
