import * as React from "react"

import { Badge, Button, SheetShell } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function SheetShellShowcase() {
  const [side, setSide] = React.useState<"right" | "left" | "top" | "bottom">("right")
  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Sheet shell</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Keep the page visible while editing</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Sheet is for context-preserving edits and side details that should not fully block the screen.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Side</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong capitalize">{side}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Use for</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Quick edits</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Fallback</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Dialog</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setOpen(true)}>Open sheet</Button>
          <Button
            variant="outline"
            onClick={() =>
              setSide((current) => (current === "right" ? "left" : current === "left" ? "top" : current === "top" ? "bottom" : "right"))
            }
          >
            Cycle side
          </Button>
          <Badge variant="outline">Context edit</Badge>
        </div>
      </section>

      <section className={panelClass}>
        <div className="border-y border-[color:var(--aui-divider)]">
          {[
            "Use a sheet when returning to the same page context matters.",
            "Keep the body focused on one task or one record.",
            "If the interaction becomes global or destructive, switch to a stronger surface.",
          ].map((item) => (
            <div key={item} className="border-b border-[color:var(--aui-divider)] py-3 text-sm leading-6 aui-text-muted last:border-b-0">
              {item}
            </div>
          ))}
        </div>
      </section>

      <SheetShell
        open={open}
        onOpenChange={setOpen}
        side={side}
        title="Quick edit"
        description="Side sheets are best for quick updates and row actions."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-sm aui-text-muted">Use this panel for quick edit actions and context-aware updates.</p>
          <p className="text-xs uppercase tracking-[0.22em] aui-text-muted">Keep the main page visible while editing.</p>
        </div>
      </SheetShell>
    </div>
  )
}
