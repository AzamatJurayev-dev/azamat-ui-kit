import * as React from "react"

import { Button, KanbanBoard } from "@/index"
import type { KanbanColumn } from "@/components/display/kanban"

const baseColumns = [
  {
    key: "todo",
    title: "To do",
    description: "Incoming tasks",
    cards: [
      { key: "a", title: "Audit inputs", description: "Collect edge cases", meta: "high" },
      { key: "b", title: "Review docs", description: "Ensure API completeness", meta: "medium" },
    ],
  },
  {
    key: "inProgress",
    title: "In progress",
    description: "Current sprint",
    cards: [{ key: "c", title: "Add demos", description: "Finish missing routes", meta: "urgent" }],
  },
]

export function KanbanBoardShowcase() {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(baseColumns)
  const [selected, setSelected] = React.useState<string | undefined>(undefined)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setColumns((current) => [...current, { key: `new-${Date.now()}`, title: "New", cards: [] }])}>
          Add lane
        </Button>
      </div>
      <KanbanBoard
        columns={columns}
        onCardClick={(card) => setSelected(String(card.key))}
        renderCard={(card) => (
          <div
            key={card.key}
            className="rounded-lg border bg-card p-3"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter") setSelected(card.key)
            }}
            onClick={() => setSelected(card.key)}
          >
            <div className="font-medium text-sm">{card.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{card.description}</div>
            {card.meta && <div className="mt-2 text-xs text-foreground/80">{card.meta}</div>}
          </div>
        )}
      />
      {selected && <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">Selected card: {selected}</div>}
    </div>
  )
}
