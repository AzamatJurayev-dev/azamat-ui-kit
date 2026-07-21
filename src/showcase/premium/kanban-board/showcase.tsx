import * as React from "react"

import { Badge, Button, KanbanBoard } from "@/index"
import type { KanbanCardMove, KanbanColumn } from "@/components/display/kanban"

const baseColumns: KanbanColumn[] = [
  {
    key: "todo",
    title: "Backlog",
    description: "Ready for triage",
    color: "#64748b",
    limit: 5,
    cards: [
      { key: "a", title: "Audit input focus states", description: "Check dark mode, clear actions and form validation states.", priority: "high", labels: [{ key: "forms", label: "forms", tone: "info" }], assignee: { name: "Madina", fallback: "M" }, dueDate: "Today" },
      { key: "b", title: "Review component docs", description: "Make sure every public prop has a working usage example.", priority: "medium", labels: [{ key: "docs", label: "docs", tone: "muted" }], assignee: { name: "Sofia", fallback: "S" }, dueDate: "Fri" },
    ],
  },
  {
    key: "progress",
    title: "In progress",
    description: "Current sprint",
    color: "#2563eb",
    limit: 3,
    cards: [
      { key: "c", title: "Upgrade kanban demo", description: "Exercise drag, limits, selection and default card metadata.", priority: "urgent", labels: [{ key: "dnd", label: "dnd", tone: "warning" }], assignee: { name: "Azamat", fallback: "AZ" }, dueDate: "Tomorrow" },
    ],
  },
  {
    key: "review",
    title: "Review",
    description: "QA and release checks",
    color: "#7c3aed",
    limit: 4,
    cards: [
      { key: "d", title: "Validate toast portal", description: "Confirm toasts stay fixed to viewport while the page scrolls.", priority: "medium", labels: [{ key: "qa", label: "qa", tone: "success" }], assignee: { name: "Nodir", fallback: "N" }, dueDate: "Next week" },
    ],
  },
  {
    key: "done",
    title: "Done",
    description: "Shipped changes",
    color: "#10b981",
    cards: [],
  },
]

export function KanbanBoardShowcase() {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(baseColumns)
  const [selected, setSelected] = React.useState<string[]>(["c"])
  const [lastMove, setLastMove] = React.useState<KanbanCardMove | null>(null)

  const addCard = (column: KanbanColumn) => {
    const nextCard = {
      key: `task-${Date.now()}`,
      title: "New QA task",
      description: "New task created from the column action.",
      priority: "low" as const,
      labels: [{ key: "new", label: "new", tone: "muted" as const }],
      assignee: { name: "Team", fallback: "T" },
      dueDate: "Later",
    }
    setColumns((current) => current.map((item) => item.key === column.key ? { ...item, cards: [...item.cards, nextCard] } : item))
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="soft" tone="info" showDot label={`${selected.length} selected`} />
          {lastMove ? <Badge variant="outline" label={`${lastMove.card.title} -> ${lastMove.toColumn.title}`} /> : null}
        </div>
        <Button size="sm" onClick={() => setColumns((current) => [...current, { key: `new-${Date.now()}`, title: "New lane", description: "Added during test", color: "#f59e0b", cards: [] }])}>
          Add lane
        </Button>
      </div>
      <KanbanBoard
        columns={columns}
        onColumnsChange={setColumns}
        onCardMove={setLastMove}
        selectionMode="multiple"
        selectedCardKeys={selected}
        onSelectionChange={setSelected}
        onAddCard={addCard}
        onAddColumn={() => setColumns((current) => [...current, { key: `lane-${Date.now()}`, title: "Extra lane", cards: [] }])}
        emptyColumn="Drop work here or add a task."
      />
    </div>
  )
}
