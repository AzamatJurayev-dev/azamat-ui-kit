import { Button, Input, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/index"

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
        <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Inline settings form</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              Short forms fit when they change a local view and can be dismissed without losing page context.
            </p>
          </div>
          <div className="flex justify-start xl:justify-end">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>Edit workspace</PopoverTrigger>
              <PopoverContent align="end" collisionPadding={16}>
                <PopoverHeader>
                  <PopoverTitle>Workspace details</PopoverTitle>
                  <PopoverDescription>Update the label used in local navigation.</PopoverDescription>
                </PopoverHeader>
                <div className="grid gap-3">
                  <Input aria-label="Workspace name" defaultValue="Growth analytics" />
                  <Input aria-label="Workspace slug" defaultValue="growth" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" size="sm">Cancel</Button>
                  <Button type="button" size="sm">Save</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
    </div>
  )
}
