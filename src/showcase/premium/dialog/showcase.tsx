import { Badge, Button, Dialog, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/index"

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
                    <DialogBody>
                      <div className="rounded-[16px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm leading-6 aui-text-muted">
                        This body area scrolls independently when content becomes long. Footer actions stay visible and aligned.
                      </div>
                    </DialogBody>
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
        <div className="grid gap-4 xl:grid-cols-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open form dialog</DialogTrigger>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Create staff member</DialogTitle>
                <DialogDescription>Use focused form dialogs for short admin tasks with stable footer actions.</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Full name", "Phone", "Role", "Status", "Branch", "Temporary password"].map((label) => (
                    <label key={label} className="grid gap-2 text-sm font-medium aui-text-strong">
                      {label}
                      <input className="h-10 rounded-xl border border-[color:var(--aui-input-border)] bg-[color:var(--aui-input-bg)] px-3 text-sm outline-none focus-visible:border-[color:var(--aui-ring)]" placeholder={label} />
                    </label>
                  ))}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create staff</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger render={<Button variant="destructive" />}>Open destructive dialog</DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Deactivate restaurant</DialogTitle>
                <DialogDescription>This action pauses public ordering and hides active shifts from the restaurant.</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  Operators can reactivate it later, but active customer sessions will be interrupted.
                </div>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline">Keep active</Button>
                <Button variant="destructive">Deactivate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
