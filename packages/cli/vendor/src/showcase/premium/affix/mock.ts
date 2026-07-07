import type { ComponentDemoMock } from "../types"

export const affixMock: ComponentDemoMock = {
  code: `import { Affix } from "@/index"

export function Example() {
  return (
    <div className="relative h-48 overflow-y-auto border p-3">
      <Affix offsetTop={12} zIndex={40} className="bg-primary text-primary-foreground px-3 py-2">
        Sticky header
      </Affix>
      <p className="pt-10">Scroll inside container to test sticky placement.</p>
    </div>
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add affix",
  highlights: [
    "Pin content to an offset within a scrollable container",
    "Simple API with top and z-index control",
  ],
  scenarios: [
    { title: "Toolbar", description: "Keep action buttons visible while users scroll long forms." },
    { title: "Quick filters", description: "Keep filters always reachable in long list pages." },
  ],
}

