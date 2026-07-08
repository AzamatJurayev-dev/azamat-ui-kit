import type { ComponentDemoMock } from "../types"

export const kanbanBoardMock: ComponentDemoMock = {
  code: `import { KanbanBoard } from "@/index"

export function Example() {
  return (
    <KanbanBoard
      columns={[
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
      ]}
    />
  )
}`,
  cliCommand: "npx azix add kanban",
  highlights: [
    "Horizontal scrollable board layout",
    "Custom column metadata and counts",
    "Composable card rendering and click handlers",
  ],
  scenarios: [
    { title: "Task board", description: "Keep tasks in grouped lanes with minimal state." },
    { title: "Issue triage", description: "Simple draggable-ready board structure (UI only)." },
  ],
}

