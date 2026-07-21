export const presets = {
  minimal: ["utils", "button", "input", "card", "badge"],
  dashboard: ["utils", "button", "input", "card", "badge", "dialog", "dropdown-menu", "data-table", "state-view", "async-boundary", "chart-card", "multi-select", "progress", "activity-feed"],
} as const

export type PresetName = keyof typeof presets
