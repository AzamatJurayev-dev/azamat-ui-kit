import { Button, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/index"

import { popoverDemoItems } from "./data"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function PopoverShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Popover</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Keep it short and contextual</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Popover should add nearby context, not replace the page or become a hidden modal.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Examples</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{popoverDemoItems.length}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Use for</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Short help</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Avoid for</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">Full flows</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-4 xl:grid-cols-3">
          {popoverDemoItems.map((item) => (
            <div key={item.label} className="rounded-[20px] border border-[color:var(--aui-divider)] px-4 py-4">
              <div>
                <p className="text-sm font-semibold aui-text-strong">{item.title}</p>
                <p className="mt-2 text-sm leading-6 aui-text-muted">{item.description}</p>
              </div>
              <div className="mt-4">
                <Popover>
                  <PopoverTrigger render={<Button variant={item.variant} />}>{item.label}</PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader>
                      <PopoverTitle>{item.title}</PopoverTitle>
                      <PopoverDescription>{item.description}</PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass}>
        <div className="border-y border-[color:var(--aui-divider)]">
          {[
            "Trigger text should already hint that extra context exists.",
            "If users need multiple actions or long reading, move up to a heavier surface.",
            "Popover body should stay compact enough to scan in one glance.",
          ].map((item) => (
            <div key={item} className="border-b border-[color:var(--aui-divider)] py-3 text-sm leading-6 aui-text-muted last:border-b-0">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
