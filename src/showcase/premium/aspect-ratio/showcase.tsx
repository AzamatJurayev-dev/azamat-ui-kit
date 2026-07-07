import * as React from "react"

const ratioLabels: Array<{ label: string; ratio: number }> = [
  { label: "16:9", ratio: 16 / 9 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "1:1", ratio: 1 },
  { label: "3:4", ratio: 3 / 4 },
]

import { Button, AspectRatio } from "@/index"
import type { ComponentDemoProps } from "../types"

export function AspectRatioShowcase({}: ComponentDemoProps) {
  const [active, setActive] = React.useState(0)

  return (
    <div className="space-y-5">
      <section className="flex flex-wrap gap-3">
        {ratioLabels.map((item, index) => (
          <Button
            key={item.label}
            variant={active === index ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(index)}
          >
            {item.label}
          </Button>
        ))}
      </section>

      <AspectRatio ratio={ratioLabels[active].ratio} className="rounded-2xl border border-border bg-card">
        <div className="grid h-full place-items-center bg-[linear-gradient(135deg,color-mix(in_oklch,var(--aui-page-bg),transparent_75%),transparent)] p-6 text-center">
          <p className="text-sm text-muted-foreground">{ratioLabels[active].label}</p>
          <p className="text-xl font-semibold text-foreground">Adaptive ratio surface</p>
        </div>
      </AspectRatio>
    </div>
  )
}
