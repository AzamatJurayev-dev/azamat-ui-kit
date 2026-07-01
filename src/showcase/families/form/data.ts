import type { FormDemoAction, FormDemoField } from "./types"

export const formDemoFields: FormDemoField[] = [
  { label: "Workspace name", kind: "input", helper: "Controlled text field for form shells." },
  { label: "Status", kind: "badge", helper: "Inline state chips in the same form section." },
  { label: "Description", kind: "textarea", helper: "Long-form editorial and settings notes." },
]

export const formDemoActions: FormDemoAction[] = [
  { label: "Save form", variant: "default" },
  { label: "Reset", variant: "outline" },
]
