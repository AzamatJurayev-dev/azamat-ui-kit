import type { ComponentCategory, ComponentName } from "./registry"

export type RegistryDistribution = "foundation" | "source-copy" | "system"

const categoryDistribution: Record<ComponentCategory, RegistryDistribution> = {
  lib: "foundation",
  ui: "foundation",
  hooks: "foundation",
  overlay: "source-copy",
  navigation: "source-copy",
  inputs: "source-copy",
  form: "source-copy",
  feedback: "source-copy",
  display: "source-copy",
  dnd: "source-copy",
  actions: "source-copy",
  layout: "source-copy",
  filters: "source-copy",
  "data-table": "system",
  calendar: "source-copy",
  upload: "source-copy",
  wizard: "source-copy",
  notifications: "source-copy",
  command: "source-copy",
  patterns: "system",
  modern: "source-copy",
  group: "system",
}

const explicitDistribution: Partial<Record<ComponentName, RegistryDistribution>> = {
  utils: "foundation",
  button: "foundation",
  input: "foundation",
  textarea: "foundation",
  checkbox: "foundation",
  switch: "foundation",
  badge: "foundation",
  card: "foundation",
  skeleton: "foundation",
  tabs: "foundation",
  dialog: "foundation",
  "dropdown-menu": "foundation",
  popover: "foundation",
  select: "foundation",
  table: "foundation",
  "number-field": "foundation",
  "toggle-group": "foundation",
  toolbar: "foundation",
  "multi-select": "foundation",
  "use-session-storage-state": "foundation",
  "use-before-unload-when-dirty": "foundation",
  "use-is-mobile": "foundation",
  "use-disclosure": "foundation",
  "use-debounce": "foundation",
  hooks: "foundation",
  "data-table": "system",
  "hover-card": "system",
  menubar: "system",
  "navigation-menu": "system",
  "calendar-kit": "system",
  "wizard-kit": "system",
  dashboard: "system",
  all: "system",
}

export function getRegistryDistribution(
  name: ComponentName,
  category: ComponentCategory,
): RegistryDistribution {
  return explicitDistribution[name] ?? categoryDistribution[category]
}
