import type { ComponentDemoMock } from "../types"

export const popoverMock: ComponentDemoMock = {
  code: `import { Button, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "azamat-ui-kit"

export function Example() {
  return (
    <div className="space-y-3">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Open helper</Button>} />
        <PopoverContent className="w-72">
          <PopoverHeader>
            <PopoverTitle>Keyboard shortcut</PopoverTitle>
            <PopoverDescription>Press Cmd/Ctrl + K to open quick search.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="secondary">Open workspace menu</Button>} />
        <PopoverContent className="w-64">
          Duplicate Archive Share
        </PopoverContent>
      </Popover>
    </div>
  )
}`,
  htmlCode: `<button data-slot="popover-trigger">Open popover</button>`,
  cliCommand: "npx azamat-ui-kit-cli add popover",
  highlights: ["Anchored overlay", "Action-specific compact content", "Placement control", "Keyboard-focus hints"],
  relatedBlockSlugs: ["users-table", "dashboard-starter", "crm-dashboard"],
  scenarios: [
    { title: "Inline help", description: "Keep helper text close to the trigger control." },
    { title: "Context menu", description: "Use popover for compact action sets instead of full modals." },
    { title: "Detail summary", description: "Show small explanations where space is limited." },
    { title: "Tooltip-style guidance", description: "Offer focus-safe guidance for complex form controls." },
  ],
  capabilityNotes: [
    "Use popovers for short, contextual content and actions.",
    "Avoid placing long-form or deeply interactive workflows in popovers.",
    "Prefer stable side/alignment to prevent layout jank in dense UIs.",
    "Set focus behavior intentionally when nested controls are present.",
  ],
}
