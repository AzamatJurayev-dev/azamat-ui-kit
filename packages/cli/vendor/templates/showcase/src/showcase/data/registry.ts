export type ComponentStatus = "stable" | "preview" | "experimental" | "internal"

export type RegistryComponent = {
  name: string
  status: ComponentStatus
  sourcePath: string
}

export type RegistryGroup = {
  name: string
  components: RegistryComponent[]
}

export type ComponentRow = {
  id: string
  component: string
  category: string
  status: "Ready" | "Testing" | "Review"
  props: number
}

const component = (name: string, status: ComponentStatus, sourcePath: string): RegistryComponent => ({
  name,
  status,
  sourcePath,
})

export const registryGroups: RegistryGroup[] = [
  {
    name: "ui",
    components: [
      component("button", "stable", "src/components/ui/button"),
      component("input", "stable", "src/components/ui/input"),
      component("textarea", "stable", "src/components/ui/textarea"),
      component("checkbox", "stable", "src/components/ui/checkbox"),
      component("switch", "stable", "src/components/ui/switch"),
      component("badge", "stable", "src/components/ui/badge"),
      component("card", "stable", "src/components/ui/card"),
      component("skeleton", "preview", "src/components/ui/skeleton"),
      component("tabs", "preview", "src/components/ui/tabs"),
      component("dialog", "stable", "src/components/ui/dialog"),
      component("dropdown-menu", "stable", "src/components/ui/dropdown-menu"),
      component("popover", "stable", "src/components/ui/popover"),
      component("tooltip", "preview", "src/components/ui/tooltip"),
      component("hover-card", "stable", "src/components/ui/hover-card"),
      component("menubar", "preview", "src/components/ui/menubar"),
      component("select", "stable", "src/components/ui/select"),
      component("table", "stable", "src/components/ui/table"),
      component("segmented-control", "preview", "src/components/ui/segmented-control"),
      component("radio-group", "stable", "src/components/ui/radio-group"),
      component("accordion", "stable", "src/components/ui/accordion"),
      component("kbd", "stable", "src/components/ui/kbd"),
      component("scroll-box", "stable", "src/components/ui/scroll-box"),
      component("right-click-menu", "stable", "src/components/ui/right-click-menu"),
      component("toggle-group", "preview", "src/components/ui/toggle-group"),
      component("collapse", "preview", "src/components/ui/collapse"),
      component("command", "preview", "src/components/ui/command"),
      component("divider", "preview", "src/components/ui/divider"),
      component("spinner", "preview", "src/components/ui/spinner"),
    ],
  },
  {
    name: "actions",
    components: [
      component("action-menu", "stable", "src/components/actions/action-menu.tsx"),
      component("button-group", "preview", "src/components/actions/button-group.tsx"),
      component("copy-button", "preview", "src/components/actions/copy-button.tsx"),
      component("quick-action-grid", "preview", "src/components/actions/quick-action-grid.tsx"),
    ],
  },
  {
    name: "inputs",
    components: [
      component("tag-input", "preview", "src/components/inputs/tag-input.tsx"),
      component("async-select", "preview", "src/components/inputs/async-select.tsx"),
      component("otp-input", "preview", "src/components/inputs/otp-input.tsx"),
      component("color-picker", "stable", "src/components/inputs/color-picker.tsx"),
      component("signature-pad", "preview", "src/components/inputs/signature-pad.tsx"),
      component("rating", "preview", "src/components/inputs/rating.tsx"),
      component("slider", "preview", "src/components/inputs/slider.tsx"),
      component("inline-editable", "preview", "src/components/inputs/inline-editable.tsx"),
      component("json-input", "preview", "src/components/inputs/json-input.tsx"),
      component("time-picker", "preview", "src/components/inputs/time-picker.tsx"),
    ],
  },
  {
    name: "form",
    components: [
      component("form-field-shell", "preview", "src/components/form/form-field-shell.tsx"),
      component("form-input", "preview", "src/components/form/form-input.tsx"),
      component("form-select", "preview", "src/components/form/form-select.tsx"),
      component("form-textarea", "preview", "src/components/form/form-textarea.tsx"),
      component("form-switch", "preview", "src/components/form/form-switch.tsx"),
      component("form-date-range-input", "preview", "src/components/form/form-date-range-input.tsx"),
      component("form-date-picker", "preview", "src/components/form/form-date-picker.tsx"),
      component("form-date-range-picker", "preview", "src/components/form/form-date-range-picker.tsx"),
    ],
  },
  {
    name: "display",
    components: [
      component("activity-feed", "stable", "src/components/display/activity-feed.tsx"),
      component("avatar", "preview", "src/components/display/avatar.tsx"),
      component("code-block", "preview", "src/components/display/code-block.tsx"),
      component("carousel", "preview", "src/components/display/carousel.tsx"),
      component("tag", "preview", "src/components/display/tag.tsx"),
      component("typography", "preview", "src/components/display/typography.tsx"),
      component("data-state", "preview", "src/components/display/data-state.tsx"),
      component("description-list", "stable", "src/components/display/description-list.tsx"),
      component("kanban", "preview", "src/components/display/kanban.tsx"),
      component("list", "preview", "src/components/display/list.tsx"),
      component("progress", "stable", "src/components/display/progress.tsx"),
      component("status-dot", "preview", "src/components/display/status-dot.tsx"),
      component("status-legend", "preview", "src/components/display/status-legend.tsx"),
      component("timeline", "stable", "src/components/display/timeline.tsx"),
      component("tree-view", "preview", "src/components/display/tree-view.tsx"),
      component("qr-code", "stable", "src/components/display/qr-code.tsx"),
      component("virtual-list", "preview", "src/components/display/virtual-list.tsx"),
    ],
  },
  { name: "data-table", components: [component("data-table", "preview", "src/components/data-table/data-table.tsx")] },
  {
    name: "calendar",
    components: [
      component("calendar", "preview", "src/components/calendar/calendar.tsx"),
      component("date-picker", "preview", "src/components/calendar/date-picker.tsx"),
      component("date-range-picker", "preview", "src/components/calendar/date-range-picker.tsx"),
    ],
  },
  {
    name: "overlay",
    components: [
      component("confirm-dialog", "stable", "src/components/overlay/confirm-dialog.tsx"),
      component("alert-dialog", "stable", "src/components/overlay/alert-dialog.tsx"),
      component("drawer", "stable", "src/components/overlay/drawer.tsx"),
    ],
  },
  {
    name: "feedback",
    components: [
      component("state-view", "stable", "src/components/feedback/state-view.tsx"),
      component("alert", "preview", "src/components/feedback/alert.tsx"),
    ],
  },
  {
    name: "layout",
    components: [
      component("sidebar", "stable", "src/components/layout/sidebar.tsx"),
      component("breadcrumbs", "stable", "src/components/layout/breadcrumbs.tsx"),
      component("section", "preview", "src/components/layout/section.tsx"),
    ],
  },
  {
    name: "patterns",
    components: [
      component("empty-state", "preview", "src/components/patterns/empty-state.tsx"),
    ],
  },
  {
    name: "modern",
    components: [
      component("calendar-scheduler", "preview", "src/components/modern/calendar-scheduler.tsx"),
      component("dual-list-picker", "preview", "src/components/modern/dual-list-picker.tsx"),
      component("resizable-panel", "preview", "src/components/modern/resizable-panel.tsx"),
      component("rich-text-editor", "preview", "src/components/modern/rich-text-editor.tsx"),
      component("map", "preview", "src/components/modern/map.tsx"),
      component("media-player", "preview", "src/components/modern/media-player.tsx"),
      component("spreadsheet", "preview", "src/components/modern/spreadsheet.tsx"),
    ],
  },
  {
    name: "upload",
    components: [
      component("file-upload", "preview", "src/components/upload/file-upload.tsx"),
      component("image-upload", "preview", "src/components/upload/image-upload.tsx"),
    ],
  },
  {
    name: "filters",
    components: [
      component("saved-filter-select", "preview", "src/components/filters/saved-filter-select.tsx"),
    ],
  },
  {
    name: "navigation",
    components: [
      component("navigation-menu", "preview", "src/components/ui/navigation-menu"),
      component("pagination", "stable", "src/components/navigation/pagination.tsx"),
    ],
  },
  { name: "charts", components: [component("progress-circle", "stable", "src/components/charts/progress-circle.tsx")] },
  {
    name: "wizard",
    components: [
      component("stepper", "preview", "src/components/wizard/stepper.tsx"),
      component("wizard", "preview", "src/components/wizard/wizard.tsx"),
    ],
  },
  {
    name: "notifications",
    components: [
      component("toast", "preview", "src/components/notifications/toast.tsx"),
      component("notification-center", "preview", "src/components/notifications/notification-center.tsx"),
    ],
  },
  { name: "command", components: [component("command-palette", "preview", "src/components/command/command-palette.tsx")] },
  { name: "dnd", components: [component("sortable-list", "preview", "src/components/dnd/sortable-list.tsx")] },
]

export const componentRows: ComponentRow[] = [
  { id: "cmp-001", component: "sidebar", category: "layout", status: "Ready", props: 34 },
  { id: "cmp-002", component: "kanban", category: "display", status: "Ready", props: 13 },
  { id: "cmp-003", component: "data-table", category: "data-table", status: "Testing", props: 50 },
  { id: "cmp-004", component: "calendar", category: "calendar", status: "Ready", props: 22 },
  { id: "cmp-005", component: "drawer", category: "overlay", status: "Ready", props: 14 },
  { id: "cmp-006", component: "wizard", category: "wizard", status: "Review", props: 12 },
  { id: "cmp-007", component: "button", category: "ui", status: "Ready", props: 9 },
  { id: "cmp-008", component: "input", category: "ui", status: "Ready", props: 11 },
  { id: "cmp-009", component: "map", category: "modern", status: "Testing", props: 13 },
  { id: "cmp-010", component: "media-player", category: "modern", status: "Testing", props: 12 },
  { id: "cmp-011", component: "spreadsheet", category: "modern", status: "Testing", props: 13 },
]

export const wizardSteps = [
  { id: "setup", title: "Setup", description: "init + theme", completed: true },
  { id: "add", title: "Add", description: "registry components", completed: true },
  { id: "test", title: "Test", description: "visible workbench" },
]

export const moduleCount = registryGroups.reduce((sum, group) => sum + group.components.length, 0)

export type WorkbenchSelection =
  | { type: "overview"; key: "overview" }
  | { type: "category"; key: string; group: RegistryGroup }
  | { type: "module"; key: string; group: RegistryGroup; component: RegistryComponent }

export function getCategoryKey(groupName: string) {
  return `category:${groupName}`
}

export function getModuleKey(groupName: string, componentName: string) {
  return `component:${groupName}/${componentName}`
}

export function getModuleLabel(componentName: string) {
  return componentName
}

export function getModuleSourcePath(component: RegistryComponent) {
  return component.sourcePath
}

export function resolveWorkbenchSelection(key: string): WorkbenchSelection {
  if (key === "overview") return { type: "overview", key: "overview" }

  if (key.startsWith("category:")) {
    const groupName = key.slice("category:".length)
    const group = registryGroups.find((item) => item.name === groupName)
    if (group) return { type: "category", key, group }
  }

  if (key.startsWith("component:")) {
    const value = key.slice("component:".length)
    const slashIndex = value.indexOf("/")
    const groupName = value.slice(0, slashIndex)
    const componentName = value.slice(slashIndex + 1)
    const group = registryGroups.find((item) => item.name === groupName)
    const selectedComponent = group?.components.find((item) => item.name === componentName)
    if (group && selectedComponent) {
      return { type: "module", key, group, component: selectedComponent }
    }
  }

  return { type: "overview", key: "overview" }
}
