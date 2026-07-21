import type { ComponentDemoMock } from "../types"

export const kanbanBoardMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { KanbanBoard } from "tembro"

const initialColumns = [
  {
    key: "todo",
    title: "Backlog",
    description: "Ready for triage",
    limit: 4,
    color: "#64748b",
    cards: [
      { key: "a", title: "Prototype", description: "Build initial modal flow.", priority: "high", labels: [{ key: "ui", label: "ui", tone: "info" }], assignee: { name: "Madina" }, dueDate: "Today" },
      { key: "b", title: "Audit", description: "Review token contrast.", priority: "medium", assignee: { name: "Sofia" }, dueDate: "Fri" },
    ],
  },
  {
    key: "progress",
    title: "In progress",
    description: "Current sprint",
    limit: 3,
    color: "#2563eb",
    cards: [{ key: "c", title: "Implement", description: "Add demo variants.", priority: "urgent", labels: [{ key: "dnd", label: "dnd", tone: "warning" }] }],
  },
]

export function Example() {
  const [columns, setColumns] = React.useState(initialColumns)

  return (
    <KanbanBoard
      columns={columns}
      onColumnsChange={setColumns}
      selectionMode="multiple"
      onAddCard={(column) => console.log("Add to", column.key)}
      emptyColumn="Drop cards here."
    />
  )
}`,
  cliCommand: "npx tembro add kanban",
  highlights: [
    "Cross-column pointer, touch and keyboard movement",
    "Limits, selection, metadata, priority badges and assignees",
    "Controlled and uncontrolled board state with add-card hooks",
  ],
  scenarios: [
    { title: "Task board", description: "Keep tasks in grouped lanes with minimal state." },
    { title: "Issue triage", description: "Move and reorder issues across real workflow states." },
  ],
}
