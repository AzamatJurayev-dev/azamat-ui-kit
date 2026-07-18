import type { ComponentName } from "./registry"

export const presetComponents: Record<string, ComponentName[]> = {
  minimal: ["button", "input", "card", "badge"],
  dashboard: [
    "button",
    "input",
    "card",
    "badge",
    "dropdown-menu",
    "skeleton",
    "tabs",
    "state-view",
    "filter-bar",
    "description-list",
    "info-card",
    "data-table",
  ],
}
