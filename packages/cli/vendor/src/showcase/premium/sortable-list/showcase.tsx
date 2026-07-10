import * as React from "react"

import { Badge, Button, SortableList } from "@/index"

const initialItems = [
  { id: "brief", label: "Product brief", owner: "Azamat", tone: "Ready" },
  { id: "design", label: "Design review", owner: "Madina", tone: "Review" },
  { id: "release", label: "Release checklist", owner: "Jasur", tone: "Blocked" },
  { id: "docs", label: "Documentation", owner: "Nodira", tone: "Draft" },
]

export function SortableListShowcase() {
  const [items, setItems] = React.useState(initialItems)
  const [lastMove, setLastMove] = React.useState("No moves yet")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{lastMove}</p>
        <Button type="button" size="sm" variant="outline" onClick={() => setItems(initialItems)}>
          Reset order
        </Button>
      </div>
      <SortableList
        items={items}
        getItemId={(item) => item.id}
        getItemLabel={(item) => item.label}
        onItemsChange={(nextItems, change) => {
          setItems(nextItems)
          setLastMove(`${change.item.label}: ${change.oldIndex + 1} → ${change.newIndex + 1}`)
        }}
        renderItem={(item) => (
          <div className="flex min-w-0 items-center justify-between gap-3 px-1 py-1.5">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">Owner: {item.owner}</div>
            </div>
            <Badge variant="outline">{item.tone}</Badge>
          </div>
        )}
      />
    </div>
  )
}
