import * as React from "react"

import { Badge, Button, Result } from "@/index"

import type { ComponentDemoProps } from "../types"

const resultStatuses = ["success", "error", "warning", "info", "not-found", "forbidden", "server-error"] as const
const descriptions = {
  success: "The requested action completed.",
  error: "The action failed. Review the message and try again.",
  warning: "The request completed with warnings. Verify details before proceed.",
  info: "An additional state is available for neutral communication.",
  "not-found": "The requested resource could not be found.",
  forbidden: "You do not have permission to perform this action.",
  "server-error": "The server returned an unexpected response.",
}

type ResultStatus = (typeof resultStatuses)[number]

export function ResultShowcase({ mode }: ComponentDemoProps) {
  const [status, setStatus] = React.useState<ResultStatus>("success")
  const [compact, setCompact] = React.useState(mode === "playground")

  const title = status === "success" ? "Operation complete" : "Attention required"

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Outcome state</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Result should explain what happened next</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use result for decisive page outcomes: success, failure, missing access, or blocked states. It should never read like a decorative alert.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Success</Badge>
            <Badge variant="outline" className="rounded-full">Failure</Badge>
            <Badge variant="outline" className="rounded-full">Blocked access</Badge>
          </div>
        </div>
      </section>

      {mode === "playground" ? (
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-[color:var(--aui-divider)] px-4 py-2 text-sm aui-text-muted" onClick={() => setCompact((value) => !value)}>
            {compact ? "Use roomy mode" : "Use compact mode"}
          </button>
          {resultStatuses.map((entry) => (
            <button key={entry} className={`rounded-full px-4 py-2 text-sm ${status === entry ? "bg-[color:var(--aui-surface-strong)] text-[color:var(--aui-surface-strong-foreground)]" : "border border-[color:var(--aui-divider)] aui-text-muted"}`} onClick={() => setStatus(entry)}>
              {entry}
            </button>
          ))}
        </div>
      ) : null}

      <Result
        status={status}
        title={title}
        compact={compact}
        description={descriptions[status]}
        actions={<Button size="sm" variant={status === "success" ? "outline" : "default"}>{status === "success" ? "Continue" : "Try again"}</Button>}
      />
    </div>
  )
}
