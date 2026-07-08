import type { FamilyDemoMock } from "../types"

export const overlayFamilyMock: FamilyDemoMock = {
  code: `import { ConfirmDialog, ModalShell, SheetShell } from "azix"\n\nexport function Example() {\n  return <ConfirmDialog />\n}`,
  highlights: ["Confirm dialogs", "Sheet surfaces", "Modal actions", "Focused flows"],
  scenarios: [
    { title: "Deletion confirm", description: "Protect destructive actions with explicit confirmation." },
    { title: "Edit sheet", description: "Slide contextual editing surfaces without leaving the page." },
    { title: "Compact modal", description: "Collect short forms in a focused overlay." },
  ],
  metrics: [
    { label: "Exports", value: "4" },
    { label: "Surfaces", value: "Dialog + sheet" },
    { label: "Status", value: "Stable" },
  ],
}


