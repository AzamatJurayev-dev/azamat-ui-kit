import * as React from "react"

import { Badge, Button, ToastProvider, useToast } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

function ToastPlayground({ mode }: { mode: ComponentDemoProps["mode"] }) {
  const [seed, setSeed] = React.useState(0)
  const { addToast, success, warning, error, clearToasts, toasts, dismissToast } = useToast()

  const addSimple = () => {
    setSeed((value) => value + 1)
    addToast({
      title: "Sync started",
      description: `Sync run ${seed + 1} has started.`,
      tone: "info",
    })
  }

  const addSuccess = () => {
    setSeed((value) => value + 1)
    success({
      title: "Saved",
      description: "Project updated successfully.",
      tone: "success",
    })
  }

  const addWarning = () => {
    setSeed((value) => value + 1)
    warning("Please confirm required metadata before publish.")
  }

  const addError = () => {
    setSeed((value) => value + 1)
    error({ title: "Request failed", description: `Failure occurred while saving item #${seed + 1}` })
  }

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Transient feedback</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Toasts should report short-lived outcomes</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use them for short confirmations and lightweight warnings. Critical blocking states should remain on the page, not vanish into transient notifications.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Success</Badge>
            <Badge variant="outline" className="rounded-full">Warning</Badge>
            <Badge variant="outline" className="rounded-full">Error</Badge>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" onClick={addSimple}>
            Add toast
          </Button>
          <Button size="sm" variant="outline" onClick={addSuccess}>
            Success
          </Button>
          <Button size="sm" variant="outline" onClick={addWarning}>
            Warning
          </Button>
          <Button size="sm" variant="outline" onClick={addError}>
            Error
          </Button>
          <Button size="sm" variant="outline" onClick={clearToasts}>
            Clear all
          </Button>
        </div>
      </section>

      <div className={panelClass}>
        <p className="mb-2 text-sm aui-text-muted">Active toasts: {toasts.length}</p>
        <div className="grid gap-2">
          {toasts.length === 0 ? (
            <div className="rounded-lg border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-3 py-2 text-sm aui-text-muted">No active toasts</div>
          ) : (
            toasts.map((toast) => (
              <div key={toast.id} className="flex items-start justify-between rounded-lg border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-3 py-2 text-sm">
                <div>
                  <p className="font-medium aui-text-strong">{toast.title ?? "Untitled"}</p>
                  <p className="aui-text-muted">{toast.description}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => dismissToast(toast.id)}>
                  Dismiss
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
      {mode === "playground" ? null : null}
    </div>
  )
}

export function ToastShowcase({ mode }: ComponentDemoProps) {
  return (
    <ToastProvider position="top-right" defaultDuration={3000} maxToasts={5} pauseOnHover={mode === "playground"}>
      <ToastPlayground mode={mode} />
    </ToastProvider>
  )
}
