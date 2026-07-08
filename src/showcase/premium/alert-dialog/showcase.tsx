import * as React from "react"

import { AlertDialog, Badge, Button } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function AlertDialogShowcase({ mode }: ComponentDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [lastResult, setLastResult] = React.useState("No action confirmed yet")
  const [strictMode, setStrictMode] = React.useState(true)
  const [caseSensitive, setCaseSensitive] = React.useState(true)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Destructive gate</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">AlertDialog should interrupt only when the action has real consequence</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This is not a generic modal. It exists to slow the user down before irreversible, expensive, or risky operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">High risk</Badge>
            <Badge variant="outline" className="rounded-full">Explicit confirmation</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium aui-text-muted">Live destructive flow</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Open the dialog and confirm a risky workspace action.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={caseSensitive ? "secondary" : "outline"} onClick={() => setCaseSensitive((value) => !value)}>
              {caseSensitive ? "Case sensitive" : "Case insensitive"}
            </Button>
            <Button variant={strictMode ? "secondary" : "outline"} onClick={() => setStrictMode((value) => !value)}>
              {strictMode ? "Typed confirm on" : "Typed confirm off"}
            </Button>
            <Button variant="destructive" onClick={() => setOpen(true)}>
              Delete workspace
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Last result</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{lastResult}</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Design rule</p>
          <p className="mt-3 text-sm leading-6 aui-text-muted">
            Keep alert-dialog copy direct: what will happen, what is lost, and what the user should expect next.
          </p>
        </section>
      </div>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        loading={loading}
        title="Delete workspace?"
        description="This removes active billing rules, API tokens, and member access from the selected workspace."
        actionLabel="Delete workspace"
        confirmValue={strictMode ? "DELETE" : undefined}
        confirmCaseSensitive={caseSensitive}
        confirmLabel="High-risk confirmation"
        confirmDescription="Type DELETE to confirm you want to remove this workspace and its active access."
        severityNote="Deleting a workspace clears active access, billing rules, and route-level secrets for the current team."
        onAction={async () => {
          setLoading(true)
          await new Promise((resolve) => window.setTimeout(resolve, 450))
          setLoading(false)
          setOpen(false)
          setLastResult("Workspace deletion confirmed")
        }}
      />

      {mode === "playground" ? (
        <section className={panelClass}>
          <Button size="sm" variant="outline" onClick={() => setLastResult("No action confirmed yet")}>
            Reset result
          </Button>
        </section>
      ) : null}
    </div>
  )
}
