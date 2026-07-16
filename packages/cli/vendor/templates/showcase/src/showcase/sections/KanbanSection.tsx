import { useMemo } from "react"

import { KanbanBoard, type KanbanColumn } from "@/components/display/kanban"
import { Badge } from "@/components/ui/badge"

export function KanbanSection() {
  const kanbanColumns = useMemo<KanbanColumn[]>(
    () => [
      {
        key: "todo",
        title: "Todo",
        count: 2,
        cards: [
          { key: "sidebar", title: "Sidebar", description: "Navigation, badges, collapsed state", meta: <Badge label="layout" /> },
          { key: "upload", title: "Upload", description: "file-upload and image-upload components", meta: <Badge label="upload" /> },
        ],
      },
      {
        key: "doing",
        title: "Doing",
        count: 2,
        cards: [
          { key: "kanban", title: "Kanban board", description: "Drag cards between columns", meta: <Badge status="info" label="dnd" /> },
          { key: "wizard", title: "Wizard flow", description: "Stepper and wizard controls", meta: <Badge status="warning" label="flow" /> },
        ],
      },
      {
        key: "done",
        title: "Done",
        count: 3,
        cards: [
          { key: "ui", title: "UI controls", description: "Button, input, select, tabs, card", meta: <Badge status="success" label="ready" /> },
          { key: "calendar", title: "Calendar", description: "Calendar and DatePicker", meta: <Badge status="success" label="ready" /> },
          { key: "table", title: "DataTable", description: "Search, actions, pagination", meta: <Badge status="success" label="ready" /> },
        ],
      },
    ],
    []
  )

  return <KanbanBoard defaultColumns={kanbanColumns} />
}
