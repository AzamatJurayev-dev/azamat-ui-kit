import type { InputDemoField } from "./types"

export const inputDemoFields: InputDemoField[] = [
  { kind: "search", label: "Search components", placeholder: "Search components..." },
  { kind: "email", label: "Team email", defaultValue: "team@azamatui.dev" },
  { kind: "disabled", label: "Disabled state", defaultValue: "Read-only unavailable" },
  { kind: "readOnly", label: "Readonly preview", defaultValue: "Readonly state" },
  { kind: "toolbar", label: "Filter by owner", placeholder: "Type owner name..." },
]
