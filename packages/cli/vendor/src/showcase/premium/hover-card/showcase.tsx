import * as React from "react"

import { Avatar, Button, HoverCard } from "@/index"

const sides = ["bottom", "right", "top", "left"] as const
const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function HoverCardShowcase() {
  const [side, setSide] = React.useState<(typeof sides)[number]>("bottom")

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Hover card</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Richer than tooltip, lighter than popover</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Use hover card when one entity preview needs a bit more room but still should feel lightweight.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Side</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong capitalize">{side}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Use for</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Entity preview</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Avoid for</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Heavy actions</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex min-h-52 items-center justify-center rounded-[22px] border border-[color:var(--aui-divider)] p-5">
          <HoverCard
            side={side}
            trigger={<button type="button" className="rounded-full border border-[color:var(--aui-divider)] p-1"><Avatar fallback="AJ" /></button>}
            content={<div className="space-y-1"><p className="font-medium">Azamat Jurayev</p><p className="text-sm text-muted-foreground">Design system owner</p><p className="text-xs text-muted-foreground">Keeps public components and package releases in sync.</p></div>}
          />
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap gap-2">
          {sides.map((entry) => (
            <Button key={entry} type="button" size="sm" variant={side === entry ? "default" : "secondary"} onClick={() => setSide(entry)}>
              {entry}
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}
