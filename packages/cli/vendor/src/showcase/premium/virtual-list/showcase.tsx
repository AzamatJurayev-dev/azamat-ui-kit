import * as React from "react"

import { Badge, VirtualList } from "@/index"

const events = Array.from({ length: 10_000 }, (_, index) => ({
  id: index + 1,
  title: `Audit event ${index + 1}`,
  actor: ["Azamat", "Madina", "Jasur", "Nodira"][index % 4],
  tone: index % 7 === 0 ? "Review" : "Completed",
}))

export function VirtualListShowcase() {
  const [range, setRange] = React.useState("Calculating visible range…")

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>10,000 records</span>
        <span>{range}</span>
      </div>
      <VirtualList
        items={events}
        height={420}
        estimateSize={58}
        getItemKey={(event) => event.id}
        onRangeChange={({ startIndex, endIndex }) => {
          setRange(`Mounted window: ${startIndex + 1}–${endIndex + 1}`)
        }}
        renderItem={(event) => (
          <div className="flex min-h-14 items-center justify-between gap-3 rounded-lg border bg-card px-4 py-2.5 shadow-sm">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{event.title}</div>
              <div className="text-xs text-muted-foreground">Actor: {event.actor}</div>
            </div>
            <Badge variant={event.tone === "Review" ? "outline" : "secondary"}>{event.tone}</Badge>
          </div>
        )}
      />
    </div>
  )
}
