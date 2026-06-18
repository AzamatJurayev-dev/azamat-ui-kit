import { Badge } from "@/index"

import type { ComponentDemoProps } from "../types"

import { badgeDemoItems } from "./data"

export function BadgeShowcase({ state, mode }: ComponentDemoProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {badgeDemoItems.map((item, index) => (
          <Badge key={item.label} variant={index === 0 ? state.badgeVariant : item.variant}>{item.label}</Badge>
        ))}
      </div>
      {mode === "playground" ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {badgeDemoItems.map((item) => (
            <div key={item.label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <Badge variant={item.variant}>{item.label}</Badge>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{item.note}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
