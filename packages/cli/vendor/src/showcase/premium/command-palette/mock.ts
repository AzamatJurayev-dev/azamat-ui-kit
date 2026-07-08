import type { ComponentDemoMock } from "../types"

export const commandPaletteMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { CommandPalette, Kbd } from "azix"

export function Example() {
  const [open, setOpen] = React.useState(true)

  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      placeholder="Search routes and actions..."
      groups={[
        {
          id: "routes",
          label: "Routes",
          items: [
            { id: "overview", label: "Open overview", shortcut: <Kbd>G O</Kbd> },
            { id: "billing", label: "Open billing", shortcut: <Kbd>G B</Kbd> },
          ],
        },
      ]}
    />
  )
}`,
  highlights: ["Grouped commands", "Recent items", "Async load support", "Keyboard-first global navigation surface"],
  scenarios: [
    { title: "Route jump", description: "Move between product areas without reaching for sidebar navigation." },
    { title: "Quick action", description: "Trigger create, invite, export, or sync flows from one searchable surface." },
    { title: "Large workspace", description: "Merge static routes and async results into one command layer." },
  ],
  capabilityNotes: [
    "Keep labels verb-led and searchable.",
    "Use async groups for remote entities such as customers or projects.",
    "Recent commands help repeated admin workflows feel much faster.",
  ],
}
