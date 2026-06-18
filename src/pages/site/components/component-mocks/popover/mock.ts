import type { ComponentDemoMock } from "../types"

export const popoverMock: ComponentDemoMock = {
  code: `import { Popover, PopoverTrigger, PopoverContent } from "@azamat/ui"\n\nexport function Example() {\n  return (\n    <Popover>\n      <PopoverTrigger render={<Button />}>Open</PopoverTrigger>\n      <PopoverContent>Details</PopoverContent>\n    </Popover>\n  )\n}`,
  cliCommand: "npx azamat-ui@latest add popover",
  highlights: ["Anchored overlay", "Compact helper content", "Action hints", "Contextual tips"],
  relatedBlockSlugs: ["users-table", "dashboard-starter", "ecommerce-product"],
  scenarios: [
    { title: "Inline help", description: "Keep helper text close to the trigger control." },
    { title: "Context actions", description: "Open lightweight menus without a full modal." },
    { title: "Detail summary", description: "Present a short supporting explanation in place." },
    { title: "Hover-adjacent utility", description: "Expose small helper surfaces next to controls and metrics." },
  ],
  capabilityNotes: [
    "Anchors compact content to a nearby trigger for contextual guidance.",
    "Fits helper text, short summaries and mini action panels.",
    "Should illustrate alignment and spacing in dense layouts.",
    "Works best when content is short and task-focused.",
  ],
}

