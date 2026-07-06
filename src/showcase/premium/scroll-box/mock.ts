import type { ComponentDemoMock } from "../types"

export const scrollBoxMock: ComponentDemoMock = {
  code: `import { ScrollBox } from "azamat-ui-kit"

const items = ["Queue item 1", "Queue item 2", "Queue item 3", "Queue item 4", "Queue item 5"]

export function Example() {
  return (
    <ScrollBox maxHeight={220} className="rounded-2xl border border-border bg-card p-3">
      <div className="grid gap-2">
        {items.map((item) => <div key={item} className="rounded-xl border border-border/70 px-3 py-2">{item}</div>)}
      </div>
    </ScrollBox>
  )
}`,
  htmlCode: `<div data-slot="scroll-box"></div>`,
  cliCommand: "npx azix add scroll-box",
  highlights: ["Bounded scroll", "Axis control", "Dense lists", "Panel content"],
  relatedBlockSlugs: ["users-table", "crm-dashboard", "dashboard-starter"],
  scenarios: [
    { title: "Queue panel", description: "Keep long lists inside a bounded surface instead of stretching the page." },
    { title: "Side panel", description: "Useful when a drawer or sidebar must scroll independently." },
    { title: "Dense admin lists", description: "Preserve surrounding layout while still exposing all records." },
  ],
  capabilityNotes: [
    "Use ScrollBox when only one region should scroll, not the whole page.",
    "Set a clear height boundary so users understand why the area scrolls.",
    "Avoid nesting many independent scroll regions unless necessary.",
    "Keep internal spacing readable; scroll should not become visual punishment.",
  ],
}
