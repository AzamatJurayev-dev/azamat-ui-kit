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
    "async-boundary",
    "filter-bar",
    "description-list",
    "info-card",
    "chart-card",
    "multi-select",
    "data-table",
  ],
}
