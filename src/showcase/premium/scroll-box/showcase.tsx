import * as React from "react"

import { Badge, Button, ScrollBox } from "@/index"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const items = Array.from({ length: 12 }, (_, index) => ({
  id: `queue-${index + 1}`,
  title: `Queue item ${index + 1}`,
  text: index % 2 === 0 ? "Waiting for review and release notes approval." : "Needs design check before public docs sync.",
}))

export function ScrollBoxShowcase() {
  const [maxHeight, setMaxHeight] = React.useState(220)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Bounded scroll</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Scroll box should contain density without breaking page rhythm</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use it when one region must scroll independently while the rest of the page stays stable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Independent region</Badge>
            <Badge variant="outline" className="rounded-full">Height bound</Badge>
            <Badge variant="outline" className="rounded-full">Dense lists</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_0.9fr]">
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Review queue</p>
            <div className="mt-3">
              <ScrollBox maxHeight={maxHeight} className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-3">
                <div className="grid gap-2">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-3 py-3">
                      <p className="font-medium aui-text-strong">{item.title}</p>
                      <p className="mt-1 text-sm aui-text-muted">{item.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollBox>
            </div>
          </div>
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Current max height</p>
            <p className="mt-3 text-lg font-semibold aui-text-strong">{maxHeight}px</p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">Scroll height: {maxHeight}px</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {[160, 220, 320].map((value) => (
              <Button key={value} type="button" size="sm" variant={maxHeight === value ? "default" : "secondary"} onClick={() => setMaxHeight(value)}>
                {value}px
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
