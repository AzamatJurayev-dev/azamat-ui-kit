import * as React from "react"

import { Alert, Badge, Button } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const tones = ["info", "success", "warning", "destructive"] as const

export function AlertShowcase({ mode }: ComponentDemoProps) {
  const [toneIndex, setToneIndex] = React.useState(2)
  const [resolvedCount, setResolvedCount] = React.useState(0)
  const [visible, setVisible] = React.useState(true)

  const tone = tones[toneIndex] ?? "warning"

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Inline feedback</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Alert should guide the next user decision</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use alert when the page needs a visible, contextual message with a clear action. It should feel operational, not decorative.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Context aware</Badge>
            <Badge variant="outline" className="rounded-full">Action ready</Badge>
          </div>
        </div>
      </section>

      {visible ? (
        <Alert
          tone={tone}
          dismissible
          onDismiss={() => setVisible(false)}
          title={tone === "success" ? "Workspace synced" : tone === "destructive" ? "Action blocked" : tone === "info" ? "Heads up" : "Review needed"}
          description={
            tone === "success"
              ? "Changes were saved and the team can continue safely."
              : tone === "destructive"
                ? "The release cannot continue until billing permissions are restored."
                : tone === "info"
                  ? "Usage data refreshed and one metric changed since your last visit."
                  : "Billing rules changed and one approval is pending before publish."
          }
          action={
            <Button size="sm" variant={tone === "destructive" ? "destructive" : "default"} onClick={() => setResolvedCount((value) => value + 1)}>
              {tone === "success" ? "Continue" : tone === "destructive" ? "Fix access" : tone === "info" ? "Open details" : "Open review"}
            </Button>
          }
        />
      ) : (
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Alert dismissed</p>
          <Button className="mt-4" size="sm" variant="outline" onClick={() => setVisible(true)}>
            Restore alert
          </Button>
        </section>
      )}

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Action count</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{resolvedCount}</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">Alert CTA should resolve a real decision, not just dismiss a message.</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Recommended usage</p>
          <div className="mt-4 space-y-3 text-sm leading-6 aui-text-muted">
            <p>Put alert above the affected surface, form, or result area.</p>
            <p>Prefer one primary action. If the user only needs acknowledgment, use toast instead.</p>
          </div>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="flex flex-wrap gap-2">
            {tones.map((value, index) => (
              <Button
                key={value}
                size="sm"
                variant={toneIndex === index ? "default" : "outline"}
                onClick={() => setToneIndex(index)}
              >
                {value}
              </Button>
            ))}
            <Button size="sm" variant="outline" onClick={() => setResolvedCount(0)}>
              Reset counter
            </Button>
            <Button size="sm" variant="outline" onClick={() => setVisible(true)}>
              Show alert
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
