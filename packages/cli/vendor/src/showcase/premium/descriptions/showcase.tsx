import * as React from "react"

import { Button, Descriptions } from "@/index"

export function DescriptionsShowcase() {
  const [columns, setColumns] = React.useState<1 | 2 | 3 | 4>(3)
  const [bordered, setBordered] = React.useState(true)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={columns === 1 ? "default" : "outline"} onClick={() => setColumns(1)}>
          1 col
        </Button>
        <Button size="sm" variant={columns === 2 ? "default" : "outline"} onClick={() => setColumns(2)}>
          2 col
        </Button>
        <Button size="sm" variant={columns === 3 ? "default" : "outline"} onClick={() => setColumns(3)}>
          3 col
        </Button>
        <Button size="sm" variant={columns === 4 ? "default" : "outline"} onClick={() => setColumns(4)}>
          4 col
        </Button>
        <Button size="sm" variant={bordered ? "default" : "outline"} onClick={() => setBordered((value) => !value)}>
          {bordered ? "Bordered" : "Unbordered"}
        </Button>
      </div>

      <Descriptions
        title="Project profile"
        extra={<span className="text-sm text-muted-foreground">Draft</span>}
        bordered={bordered}
        columns={columns}
        items={[
          { key: "owner", label: "Owner", value: "Azamat UI Team" },
          { key: "status", label: "Status", value: "In review" },
          { key: "release", label: "Release", value: "v0.3.27", span: 2 },
          { key: "stack", label: "Tech", value: "React + Tailwind" },
          { key: "source", label: "Source", value: "Package-first components", span: 4 },
        ]}
      />
    </div>
  )
}

