import * as React from "react"
import { CheckIcon, MessageSquareIcon, XIcon } from "lucide-react"

import { Button, CommandBar, Kbd } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function CommandBarShowcase() {
  const [position, setPosition] = React.useState<"bottom" | "top">("bottom")
  const [open, setOpen] = React.useState(true)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed navigation helper</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">CommandBar keeps a few high-value actions nearby</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          This is not a replacement for every footer or toolbar. Use it when persistent floating actions improve a long reading or review flow.
        </p>
      </section>

      <section className={panelClass}>
        <div className="rounded-[28px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant={open ? "secondary" : "outline"} onClick={() => setOpen((value) => !value)}>
              {open ? "Hide bar" : "Show bar"}
            </Button>
            <Button size="sm" variant={position === "bottom" ? "secondary" : "outline"} onClick={() => setPosition("bottom")}>
              Bottom
            </Button>
            <Button size="sm" variant={position === "top" ? "secondary" : "outline"} onClick={() => setPosition("top")}>
              Top
            </Button>
          </div>

          <div className="relative mt-5 min-h-[320px] overflow-hidden rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
            <div className="max-w-2xl">
              <p className="text-lg font-semibold aui-text-strong">Quarterly release review</p>
              <p className="mt-3 text-sm leading-6 aui-text-muted">
                Long content benefits from a small floating action rail when the user must repeatedly approve, reject, or comment without scrolling back to a fixed footer.
              </p>
              <div className="mt-6 space-y-3 text-sm leading-6 aui-text-muted">
                <p>Keep the action set intentionally small. More than three or four actions usually means the bar should become a real toolbar instead.</p>
                <p>Pair shortcut hints with actions only when the shortcuts are actually supported by the product.</p>
                <p>The bar should help reading-heavy workflows, not distract from them.</p>
              </div>
            </div>

            <CommandBar open={open} position={position} className="max-w-[calc(100%-2rem)]">
              <Kbd>G</Kbd>
              <Button size="sm" variant="ghost">
                <MessageSquareIcon className="mr-2 size-4" />
                Comment
              </Button>
              <Button size="sm" variant="outline">
                <XIcon className="mr-2 size-4" />
                Reject
              </Button>
              <Button size="sm">
                <CheckIcon className="mr-2 size-4" />
                Approve
              </Button>
            </CommandBar>
          </div>
        </div>
      </section>
    </div>
  )
}
