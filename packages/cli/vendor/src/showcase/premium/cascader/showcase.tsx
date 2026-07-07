import * as React from "react"

import { Cascader, type CascaderOption } from "@/index"

const locations: CascaderOption[] = [
  { value: "eu", label: "Europe", children: [{ value: "uk", label: "United Kingdom", children: [{ value: "london", label: "London" }] }] },
  { value: "us", label: "United States", children: [{ value: "ca", label: "California", children: [{ value: "sf", label: "San Francisco" }] }] },
]

export function CascaderShowcase() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <div className="space-y-3">
      <Cascader options={locations} value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">Selected path: {value.length ? value.join(" / ") : "Not selected"}</p>
    </div>
  )
}

