import * as React from "react"

import { Divider } from "@/index"

export function DividerShowcase() {
  const examples = [
    { label: "No label", props: { label: undefined as string | undefined } },
    { label: "Team access", props: {} as Record<string, string> },
    { label: "Dashed section", props: { dashed: true } },
    { label: "Start label", props: { labelPosition: "start" as const } },
    { label: "End label", props: { labelPosition: "end" as const } },
  ]

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card p-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Divider modes</p>
        <p className="text-sm text-muted-foreground">Use labels and orientation to keep content hierarchy readable without extra layout noise.</p>
      </div>

      <div className="space-y-5">
        {examples.map((entry, index) => (
          <div key={entry.label + index} className="rounded-lg border border-border/80 px-4 py-3">
            <div className="text-xs text-muted-foreground">{entry.label}</div>
            <Divider orientation="horizontal" label={index === 0 ? undefined : entry.label} {...entry.props} />
            <div className="text-sm text-foreground">Row before section</div>
          </div>
        ))}
      </div>

      <div className="flex h-28 items-center justify-between gap-4 rounded-lg border border-border/80 bg-background p-4">
        <div className="text-sm text-foreground">A</div>
        <Divider orientation="vertical" />
        <div className="text-sm text-foreground">B</div>
        <Divider orientation="vertical" dashed />
        <div className="text-sm text-foreground">C</div>
      </div>
    </div>
  )
}
