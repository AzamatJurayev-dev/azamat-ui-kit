export const presets = {
  minimal: ["utils", "button", "input", "card", "badge"],
  dashboard: ["utils", "button", "input", "card", "badge", "dialog", "dropdown-menu", "data-view", "filter-builder", "action-system", "status-system", "smart-card", "smart-form-shell", "workspace-shell"],
} as const

export type PresetName = keyof typeof presets
