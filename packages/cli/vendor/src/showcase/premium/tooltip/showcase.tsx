import * as React from "react"

import { Button, Tooltip } from "@/index"

const tooltipSides = ["top", "right", "bottom", "left"] as const
const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function TooltipShowcase() {
  const [side, setSide] = React.useState<(typeof tooltipSides)[number]>("top")
  const [disabled, setDisabled] = React.useState(false)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Tooltip</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Explain quickly, then get out</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Tooltip should answer one short question near the trigger without interrupting the screen.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Side</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong capitalize">{side}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">State</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{disabled ? "Disabled" : "Enabled"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Use for</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Short hints</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex min-h-48 items-center justify-center rounded-[22px] border border-[color:var(--aui-divider)] p-5">
          <Tooltip content="Copies the current docs example to your clipboard." side={side} disabled={disabled}>
            <Button type="button" variant="outline">Hover or focus me</Button>
          </Tooltip>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap gap-2">
          {tooltipSides.map((entry) => (
            <Button
              key={entry}
              type="button"
              size="sm"
              variant={side === entry ? "default" : "secondary"}
              onClick={() => setSide(entry)}
            >
              {entry}
            </Button>
          ))}
          <Button type="button" size="sm" variant="outline" onClick={() => setDisabled((value) => !value)}>
            {disabled ? "Enable" : "Disable"}
          </Button>
        </div>
      </section>
    </div>
  )
}
