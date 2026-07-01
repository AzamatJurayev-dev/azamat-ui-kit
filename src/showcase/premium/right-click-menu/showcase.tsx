import * as React from "react"

import { Badge, Button, RightClickMenu } from "@/index"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function RightClickMenuShowcase() {
  const [lastAction, setLastAction] = React.useState("Rename")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Context actions</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Right click menu should hide secondary actions until they are needed</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use it for workspace-style surfaces where always-visible row actions would create too much noise.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Secondary actions</Badge>
            <Badge variant="outline" className="rounded-full">Pointer workflow</Badge>
            <Badge variant="outline" className="rounded-full">Compact menu</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Interactive surface</p>
            <div className="mt-3">
              <RightClickMenu
                items={[
                  { label: "Rename", onSelect: () => setLastAction("Rename") },
                  { label: "Duplicate", onSelect: () => setLastAction("Duplicate") },
                  { label: "Archive", onSelect: () => setLastAction("Archive") },
                ]}
              >
                <div className="rounded-[20px] border border-dashed border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] px-4 py-12 text-center text-sm aui-text-muted">
                  Right click anywhere in this area
                </div>
              </RightClickMenu>
            </div>
          </div>
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Last action</p>
            <p className="mt-3 text-lg font-semibold aui-text-strong">{lastAction}</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Keep a visible fallback action path for keyboard and touch users.</p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">Selected action: {lastAction}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Rename", "Duplicate", "Archive"].map((action) => (
              <Button key={action} type="button" size="sm" variant={lastAction === action ? "default" : "secondary"} onClick={() => setLastAction(action)}>
                {action}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
