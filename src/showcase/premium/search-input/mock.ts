import type { ComponentDemoMock } from "../types"

export const searchInputMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { Kbd, SearchInput } from "azix"

export function Example() {
  const [value, setValue] = React.useState("")

  return (
    <SearchInput
      value={value}
      onValueChange={setValue}
      placeholder="Search customers, invoices, or routes..."
      resultCount={18}
      shortcut={<Kbd>Ctrl+K</Kbd>}
      debounceMs={250}
    />
  )
}`,
  highlights: ["Search icon, result count, and shortcut support", "Debounced value callback", "Clear action inheritance", "Good fit for toolbars and command launchers"],
  scenarios: [
    { title: "Data table search", description: "Filter customers, invoices, or events without leaving the current view." },
    { title: "Global search bar", description: "Pair result count and shortcut hint in a compact top-level surface." },
    { title: "Settings search", description: "Reduce long preferences pages into one searchable control." },
  ],
  capabilityNotes: [
    "Keep search placeholder specific to the entities users can actually find.",
    "Use debounced callbacks for remote or expensive filtering.",
    "Only show result count when the number helps the user decide the next step.",
  ],
}
