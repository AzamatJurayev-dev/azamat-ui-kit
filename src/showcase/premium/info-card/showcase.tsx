import * as React from "react"
import { Button, InfoCard } from "@/index"

import type { ComponentDemoProps } from "../types"

const cardMeta = {
  title: "Workspace",
  description: "Use one card per logical entity and keep content scannable.",
  actions: (
    <div className="flex gap-2">
      <Button size="sm" variant="outline">Export</Button>
      <Button size="sm">Open</Button>
    </div>
  ),
}

export function InfoCardShowcase({ mode }: ComponentDemoProps) {
  const [compact, setCompact] = React.useState(mode === "playground")
  const [orientation, setOrientation] = React.useState<"vertical" | "horizontal">("vertical")
  const [selected, setSelected] = React.useState(true)

  return (
    <div className="space-y-4">
      {mode === "playground" ? (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={compact ? "default" : "outline"} onClick={() => setCompact((value) => !value)}>
            {compact ? "Use spacious" : "Use compact"}
          </Button>
          <Button size="sm" variant={orientation === "vertical" ? "default" : "outline"} onClick={() => setOrientation("vertical")}>
            Vertical
          </Button>
          <Button size="sm" variant={orientation === "horizontal" ? "default" : "outline"} onClick={() => setOrientation("horizontal")}>
            Horizontal
          </Button>
          <Button size="sm" variant={selected ? "default" : "outline"} onClick={() => setSelected((value) => !value)}>
            {selected ? "Selected" : "Default"}
          </Button>
        </div>
      ) : null}
      <InfoCard
        eyebrow="Summary"
        title={cardMeta.title}
        description={cardMeta.description}
        actions={cardMeta.actions}
        compact={compact}
        orientation={orientation}
        selected={selected}
      >
        <p className="aui-text-muted mt-2 text-sm">Keep micro metadata and status chips in one card surface.</p>
      </InfoCard>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Header + actions</p>
          <p className="mt-2 aui-text-muted">Action area stays isolated from the parent card click/select state.</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Density</p>
          <p className="mt-2 aui-text-muted">Compact and regular modes cover dashboard tiles and detail summaries.</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Orientation</p>
          <p className="mt-2 aui-text-muted">Vertical and horizontal layouts reuse the same surface API.</p>
        </div>
      </div>
    </div>
  )
}
