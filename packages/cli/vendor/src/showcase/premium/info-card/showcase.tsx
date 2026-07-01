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
        </div>
      ) : null}
      <InfoCard
        eyebrow="Summary"
        title={cardMeta.title}
        description={cardMeta.description}
        actions={cardMeta.actions}
        compact={compact}
        orientation={orientation}
      >
        <p className="aui-text-muted mt-2 text-sm">Keep micro metadata and status chips in one card surface.</p>
      </InfoCard>
    </div>
  )
}
