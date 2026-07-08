import * as React from "react"

import { Button, Watermark } from "@/index"

const labels = ["tembro", "STAGING", "DRAFT", "PRIVATE BETA"]

export function WatermarkShowcase() {
  const [label, setLabel] = React.useState(labels[0])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {labels.map((item) => (
          <Button key={item} size="sm" variant={label === item ? "default" : "outline"} onClick={() => setLabel(item)}>
            {item}
          </Button>
        ))}
      </div>
      <Watermark text={label}>
        <div className="grid h-36 place-items-center rounded-xl border bg-card p-5 text-sm text-muted-foreground">
          This content keeps full interaction while visually marking environment.
        </div>
      </Watermark>
    </div>
  )
}
