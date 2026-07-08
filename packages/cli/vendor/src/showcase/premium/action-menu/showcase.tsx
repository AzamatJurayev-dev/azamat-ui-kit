import * as React from "react"
import { ArchiveIcon, CopyIcon, ExternalLinkIcon } from "lucide-react"

import { ActionMenu, Badge } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function ActionMenuShowcase({ mode }: ComponentDemoProps) {
  const [lastAction, setLastAction] = React.useState("No action selected")
  const [pinOpen, setPinOpen] = React.useState(false)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Compact actions</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">ActionMenu should hide secondary actions, not critical path actions</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This surface is ideal for row or card actions that matter, but should not dominate the layout.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Contextual</Badge>
            <Badge variant="outline" className="rounded-full">Secondary actions</Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium aui-text-strong">Invoice #2048</p>
              <p className="mt-1 text-sm aui-text-muted">Acme Growth payment workflow</p>
            </div>
            <ActionMenu
              label="Invoice actions"
              closeOnSelect={!pinOpen}
              actions={[
                { key: "open", section: "Primary", label: "Open details", description: "Jump into the full invoice route", icon: <ExternalLinkIcon className="size-4" />, shortcut: "↵", onSelect: async () => setLastAction("Opened invoice details") },
                { key: "duplicate", section: "Primary", label: "Duplicate", description: "Create a new workflow from this one", icon: <CopyIcon className="size-4" />, keepOpen: pinOpen, onSelect: async () => setLastAction("Duplicated invoice workflow") },
                { key: "archive", section: "Danger zone", label: "Archive", description: "Hide it from active operational queues", icon: <ArchiveIcon className="size-4" />, destructive: true, onSelect: async () => setLastAction("Archived invoice workflow") },
              ]}
            />
          </div>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Last action</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{lastAction}</p>
          <button
            type="button"
            className="mt-4 rounded-full border border-[color:var(--aui-divider)] px-3 py-1.5 text-xs font-medium"
            onClick={() => setPinOpen((value) => !value)}
          >
            {pinOpen ? "Close on select off" : "Close on select on"}
          </button>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">ActionMenu table row, card header yoki compact list itemlarda juda foydali.</p>
        </section>
      ) : null}
    </div>
  )
}
