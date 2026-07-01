import type { CheckboxDemoItem } from "./types"

export const checkboxDemoItems: CheckboxDemoItem[] = [
  { id: "release", label: "Enable release checklist", description: "Primary controlled state", checked: true },
  { id: "ship", label: "Ship docs update", description: "Default checked example", checked: true },
  { id: "locked", label: "Locked permission", description: "Disabled access item", disabled: true },
  { id: "notify", label: "Notify stakeholders", description: "Unchecked follow-up action" },
]
