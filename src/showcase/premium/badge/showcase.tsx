import * as React from "react"
import { Badge, Button } from "@/index"

import type { ComponentDemoProps } from "../types"

import { badgeDemoItems } from "./data"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"
type BadgeVariant = ComponentDemoProps["state"]["badgeVariant"]

export function BadgeShowcase({ state, setState, mode }: ComponentDemoProps) {
  const variants: BadgeVariant[] = ["default", "secondary", "soft", "destructive", "outline", "ghost", "link"]
  const activeItem = badgeDemoItems.find((item) => item.variant === state.badgeVariant) ?? badgeDemoItems[0]
  const [chipVisible, setChipVisible] = React.useState(true)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Status</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Badges should stay secondary</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Use them for metadata and state, not as the main content block.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Variant</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{state.badgeVariant}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Current</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{activeItem.label}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Samples</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{badgeDemoItems.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <Button
                key={variant}
                type="button"
                size="sm"
                variant={state.badgeVariant === variant ? ("default" as const) : ("secondary" as const)}
                onClick={() => setState({ badgeVariant: variant })}
              >
                {variant}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {badgeDemoItems.map((item, index) => (
              <Badge
                key={item.label}
                variant={index === 0 ? state.badgeVariant : item.variant}
                status={index === 0 ? "success" : undefined}
                count={index === 1 ? 12 : undefined}
              >
                {item.label}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--aui-divider)] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Live example</p>
                  <p className="mt-2 text-lg font-semibold aui-text-strong">Customer workspace</p>
                </div>
                <Badge variant={state.badgeVariant} status="success" label={activeItem.label} />
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  ["Plan", "Growth"],
                  ["Owner", "Azamat"],
                  ["Last sync", "2 min ago"],
                ].map(([label, value]) => (
                  <div key={label} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--aui-divider)] px-3 py-2">
                    <span className="text-xs aui-text-muted">{label}</span>
                    <span className="text-sm font-medium aui-text-strong">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 border-t border-[color:var(--aui-divider)] pt-4">
                <Badge variant="secondary" label="Customers" count={18} />
                <Badge variant="soft" tone="info" label="Synced" dot />
                <Badge status="warning" label="Pending approval" />
                {chipVisible ? (
                  <Badge
                    variant="outline"
                    label="Design owner"
                    removable
                    onRemove={() => setChipVisible(false)}
                  />
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => setChipVisible(true)}>
                    Restore chip
                  </Button>
                )}
              </div>
            </div>

            <div className="border-y border-[color:var(--aui-divider)]">
              {badgeDemoItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 border-b border-[color:var(--aui-divider)] py-3 last:border-b-0">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold aui-text-strong">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 aui-text-muted">{item.note}</p>
                  </div>
                  <Badge
                    variant={item.variant}
                    status={item.label === "Live" ? "success" : item.label === "Review" ? "warning" : undefined}
                    label={item.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {badgeDemoItems.map((item) => (
              <div key={item.label} className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant={item.variant} label={item.label} count={item.label === "Queued" ? 4 : undefined} />
                  <span className="text-[11px] uppercase tracking-[0.2em] aui-text-muted">sample</span>
                </div>
                <p className="mt-3 text-sm leading-6 aui-text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
