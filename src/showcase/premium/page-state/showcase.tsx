import * as React from "react"

import { Badge, Button, PageState } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const tones = ["empty", "loading", "error", "success", "info"] as const

export function PageStateShowcase({ mode }: ComponentDemoProps) {
  const [toneIndex, setToneIndex] = React.useState(2)
  const tone = tones[toneIndex] ?? "error"

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Route feedback</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">PageState should explain the route outcome immediately</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              When the page is empty, blocked, loading, or complete, the user should understand what happened and what to do next in one glance.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Route-level</Badge>
            <Badge variant="outline" className="rounded-full">Outcome first</Badge>
          </div>
        </div>
      </section>

      <PageState
        tone={tone}
        title={
          tone === "empty" ? "No invoices found"
            : tone === "loading" ? "Preparing workspace"
              : tone === "error" ? "Connection failed"
                : tone === "success" ? "Workspace connected"
                  : "Sync started"
        }
        description={
          tone === "empty" ? "Create the first invoice to unlock exports, reminders, and payment tracking."
            : tone === "loading" ? "We are syncing permissions and bringing the latest workspace data into this route."
              : tone === "error" ? "We could not sync workspace usage. Retry after restoring the API token."
                : tone === "success" ? "The workspace is ready and the team can continue with the next operational step."
                  : "Background sync is running. You can keep working while updates are processed."
        }
        action={
          tone === "loading" ? undefined : (
            <Button variant={tone === "error" ? "outline" : "default"}>
              {tone === "empty" ? "Create invoice" : tone === "error" ? "Retry sync" : tone === "success" ? "Open dashboard" : "View progress"}
            </Button>
          )
        }
        extra={tone === "error" ? <Button variant="ghost">Open logs</Button> : undefined}
      />

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="flex flex-wrap gap-2">
            {tones.map((value, index) => (
              <Button key={value} size="sm" variant={toneIndex === index ? "default" : "outline"} onClick={() => setToneIndex(index)}>
                {value}
              </Button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
