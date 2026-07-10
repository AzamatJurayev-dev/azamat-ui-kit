import type { ComponentDemoMock } from "../types"

export const kanbanBoardMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { KanbanBoard } from "tembro"

const initialColumns = [
  {
    key: "todo",
    title: "To Do",
    cards: [
      { key: "a", title: "Prototype", description: "Build initial modal flow." },
      { key: "b", title: "Audit", description: "Review token contrast." },
    ],
  },
  {
    key: "progress",
    title: "In progress",
    cards: [{ key: "c", title: "Implement", description: "Add demo variants." }],
  },
]

export function Example() {
  const [columns, setColumns] = React.useState(initialColumns)

  return (
    <KanbanBoard
      columns={columns}
      onColumnsChange={setColumns}
    />
  )
}`,
  cliCommand: "npx tembro add kanban",
  highlights: [
    "Cross-column pointer, touch and keyboard movement",
    "Controlled and uncontrolled board state",
    "Empty-lane drops, cancel handling and drag overlays",
  ],
  scenarios: [
    { title: "Task board", description: "Keep tasks in grouped lanes with minimal state." },
    { title: "Issue triage", description: "Move and reorder issues across real workflow states." },
  ],
}
