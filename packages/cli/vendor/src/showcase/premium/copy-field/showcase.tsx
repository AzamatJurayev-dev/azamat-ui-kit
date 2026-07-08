import * as React from "react"

import { Badge, CopyField } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

const values = {
  secret: "whsec_workspace_live_72AJK1P",
  endpoint: "https://api.tembro.dev/webhooks/events",
  invite: "ops-release-2026",
}

export function CopyFieldShowcase() {
  const [selected, setSelected] = React.useState<keyof typeof values>("secret")

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed action</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">CopyField is the complete value + action row</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use it when a technical or shareable string needs label, explanation, and copy action together.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <CopyField
              label="Webhook signing secret"
              description="Store this on the server only."
              value={values.secret}
              copyButtonProps={{ onCopied: () => setSelected("secret") }}
            />
            <CopyField
              label="Event endpoint"
              description="Public endpoint that receives signed events."
              value={values.endpoint}
              copyButtonProps={{ onCopied: () => setSelected("endpoint"), copyLabel: "Copy url" }}
            />
            <CopyField
              label="Invite code"
              description="Share this with internal release reviewers."
              value={values.invite}
              monospace={false}
              copyButtonProps={{ onCopied: () => setSelected("invite"), variant: "secondary" }}
            />
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold aui-text-strong">Recently used row</p>
              <Badge variant="secondary">{selected}</Badge>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 aui-text-muted">
              <p>CopyField is stronger than a naked button because the user never loses context about what will be copied.</p>
              <p>Prefer it on settings and integration pages. In dense tables, CopyButton alone is usually enough.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
