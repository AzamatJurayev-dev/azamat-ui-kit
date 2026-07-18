export const presets = {
  minimal: ["utils", "button", "input", "card", "badge"],
  dashboard: ["utils", "button", "input", "card", "badge", "dialog", "dropdown-menu", "data-table", "filter-bar", "state-view", "info-card"],
} as const

export type PresetName = keyof typeof presets
