import * as React from "react"

import { Button, SkeletonTable } from "@/index"

export function SkeletonTableShowcase() {
  const [showToolbar, setShowToolbar] = React.useState(true)
  const [columns, setColumns] = React.useState(4)
  const [rows, setRows] = React.useState(4)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={showToolbar ? "default" : "outline"} onClick={() => setShowToolbar((value) => !value)}>
          Toolbar
        </Button>
        <Button size="sm" onClick={() => setColumns(3)} variant="outline">
          3 cols
        </Button>
        <Button size="sm" onClick={() => setColumns(4)} variant="outline">
          4 cols
        </Button>
        <Button size="sm" onClick={() => setColumns(5)} variant="outline">
          5 cols
        </Button>
        <Button size="sm" onClick={() => setRows(3)} variant="outline">
          3 rows
        </Button>
        <Button size="sm" onClick={() => setRows(6)} variant="outline">
          6 rows
        </Button>
      </div>

      <SkeletonTable rows={rows} columns={columns} showHeader showToolbar={showToolbar} />
    </div>
  )
}

