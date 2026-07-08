import * as React from "react"

import { Badge, CopyButton, Input } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function CopyButtonShowcase() {
  const [token, setToken] = React.useState("sk_live_workspace_28A91X")
  const [copiedValue, setCopiedValue] = React.useState("")

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed action</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">CopyButton handles inline copy feedback cleanly</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          It should replace one-off clipboard wrappers in tokens, invite links, integration keys, and compact table rows.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">API token row</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              A copy action should sit directly beside the value it belongs to and confirm success immediately.
            </p>
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4 sm:flex-row sm:items-center">
              <Input value={token} onValueChange={setToken} className="flex-1" />
              <CopyButton
                value={token}
                variant="outline"
                copyLabel="Copy token"
                copiedLabel="Copied"
                onCopied={setCopiedValue}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold aui-text-strong">Last copied value</p>
                <p className="mt-1 text-xs aui-text-muted">The component exposes hooks so products can log or toast on success.</p>
              </div>
              <Badge variant={copiedValue ? "secondary" : "outline"}>{copiedValue ? "Copied" : "Idle"}</Badge>
            </div>
            <p className="mt-4 break-all text-sm leading-6 aui-text-muted">{copiedValue || "No value copied yet."}</p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton value="INV-2026-00482" size="sm" variant="outline" copyLabel="Copy invoice id" />
          <CopyButton value="https://tembro.dev/invite/team-ops" variant="secondary" copyLabel="Copy invite link" />
          <CopyButton value="workspace_admin" variant="ghost" copyLabel="Copy role" />
        </div>
      </section>
    </div>
  )
}
