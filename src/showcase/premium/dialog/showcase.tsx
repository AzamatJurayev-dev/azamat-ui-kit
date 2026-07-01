import { Badge, Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/index"

import { dialogDemoItems } from "./data"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function DialogShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Overlay</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Dialogs should justify focus</h3>
          <p className="mt-3 text-sm leading-6 aui-text-muted">Use them for short, high-risk, or confirm-first actions. Keep the trigger, title, description, and footer actions explicit.</p>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-4 xl:grid-cols-3">
          {dialogDemoItems.map((item) => (
            <div key={item.label} className="rounded-[20px] border border-[color:var(--aui-divider)] px-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold aui-text-strong">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 aui-text-muted">{item.description}</p>
                </div>
                <Badge variant={item.confirmVariant === "destructive" ? "destructive" : "outline"}>{item.confirmLabel}</Badge>
              </div>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger render={<Button variant={item.triggerVariant} />}>{item.label}</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>{item.description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter showCloseButton>
                      <Button variant={item.confirmVariant}>{item.confirmLabel}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-3">
          {[
            "Keep the page understandable before the overlay opens.",
            "Use outcome-specific action labels inside the dialog footer.",
            "Do not move long multi-step workflows into a small modal by default.",
          ].map((note) => (
            <div key={note} className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3 text-sm leading-6 aui-text-muted">
              {note}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
