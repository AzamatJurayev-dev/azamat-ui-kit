import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/index"

import type { ComponentDemoProps } from "../types"

import { dialogDemoItems } from "./data"

export function DialogShowcase({ mode }: ComponentDemoProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {dialogDemoItems.map((item) => (
          <Dialog key={item.label}>
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
        ))}
      </div>
      {mode === "playground" ? <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">Dialog route covers neutral confirm and destructive confirm flows.</div> : null}
    </div>
  )
}
