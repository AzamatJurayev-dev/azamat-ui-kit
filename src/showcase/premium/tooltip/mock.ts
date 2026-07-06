import type { ComponentDemoMock } from "../types"

export const tooltipMock: ComponentDemoMock = {
  code: `import { Button, Tooltip } from "azamat-ui-kit"

export function Example() {
  return (
    <div className="flex gap-3">
      <Tooltip content="Copies the current code snippet to clipboard.">
        <Button variant="outline">Copy code</Button>
      </Tooltip>

      <Tooltip content="Only owners can publish this release." side="bottom">
        <Button>Publish</Button>
      </Tooltip>
    </div>
  )
}`,
  htmlCode: `<span data-slot="tooltip">Hover or focus to reveal hint</span>`,
  cliCommand: "npx azix add tooltip",
  highlights: ["Short helper copy", "Hover + focus states", "Placement control", "Low-noise guidance"],
  relatedBlockSlugs: ["settings-form", "dashboard-starter", "crm-dashboard"],
  scenarios: [
    { title: "Action clarification", description: "Clarify compact buttons without adding full inline helper text." },
    { title: "Permission hint", description: "Explain why a control matters before users commit." },
    { title: "Dense data tables", description: "Keep labels short while still exposing supporting context on focus." },
  ],
  capabilityNotes: [
    "Keep tooltip copy to one short sentence.",
    "Use focus-safe triggers so keyboard users get the same guidance.",
    "Do not place critical instructions only inside a tooltip.",
    "If the content needs actions or long text, switch to Popover instead.",
  ],
}
