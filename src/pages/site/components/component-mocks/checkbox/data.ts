import type { CheckboxDemoItem } from "./types"

export const checkboxDemoItems: CheckboxDemoItem[] = [
  { label: "Enable release checklist", description: "Primary controlled state", checked: true },
  { label: "Ship docs update", description: "Default checked example", checked: true },
  { label: "Locked permission", description: "Disabled access item", disabled: true },
  { label: "Notify stakeholders", description: "Unchecked follow-up action" },
]
