import * as React from "react"

import { Button, SkeletonForm } from "@/index"

export function SkeletonFormShowcase() {
  const [fields, setFields] = React.useState(4)
  const [columns, setColumns] = React.useState<1 | 2>(1)
  const [showActions, setShowActions] = React.useState(true)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={fields === 3 ? "default" : "outline"} onClick={() => setFields(3)}>
          3 fields
        </Button>
        <Button size="sm" variant={fields === 4 ? "default" : "outline"} onClick={() => setFields(4)}>
          4 fields
        </Button>
        <Button size="sm" variant={columns === 1 ? "default" : "outline"} onClick={() => setColumns(1)}>
          1 column
        </Button>
        <Button size="sm" variant={columns === 2 ? "default" : "outline"} onClick={() => setColumns(2)}>
          2 columns
        </Button>
        <Button size="sm" variant={showActions ? "default" : "outline"} onClick={() => setShowActions((value) => !value)}>
          {showActions ? "Actions" : "No actions"}
        </Button>
      </div>

      <SkeletonForm fields={fields} columns={columns} showActions={showActions} />
    </div>
  )
}

