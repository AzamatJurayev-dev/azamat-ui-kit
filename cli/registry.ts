export type ComponentName = string;

export type RegistryFile = { source: string; target: string };

export type ComponentCategory =
  | "lib"
  | "ui"
  | "overlay"
  | "navigation"
  | "inputs"
  | "form"
  | "feedback"
  | "display"
  | "dnd"
  | "actions"
  | "layout"
  | "filters"
  | "data-table"
  | "calendar"
  | "charts"
  | "upload"
  | "wizard"
  | "notifications"
  | "command"
  | "patterns"
  | "modern"
  | "hooks"
  | "group";

export type ComponentRegistryItem = {
  name: ComponentName;
  category: ComponentCategory;
  description?: string;
  migrationAliasFor?: ComponentName;
  dependencies?: string[];
  registryDependencies?: ComponentName[];
  files?: RegistryFile[];
};

const file = (source: string, target: string): RegistryFile => ({ source, target });

export const registry: Record<ComponentName, ComponentRegistryItem> = {
  utils: { name: "utils", category: "lib", dependencies: ["clsx", "tailwind-merge"], files: [file("src/lib/utils.ts", "{utils}")] },

  button: { name: "button", category: "ui", dependencies: ["@base-ui/react", "class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/button", "{ui}/button")] },
  input: { name: "input", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/input", "{ui}/input")] },
  textarea: { name: "textarea", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/textarea", "{ui}/textarea")] },
  checkbox: { name: "checkbox", category: "ui", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/checkbox", "{ui}/checkbox")] },
  switch: { name: "switch", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/switch", "{ui}/switch")] },
  badge: { name: "badge", category: "ui", dependencies: ["@base-ui/react", "class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/badge", "{ui}/badge")] },
  card: { name: "card", category: "ui", dependencies: ["class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/card", "{ui}/card")] },
  skeleton: { name: "skeleton", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/skeleton", "{ui}/skeleton")] },
  tabs: { name: "tabs", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/tabs", "{ui}/tabs")] },
  dialog: { name: "dialog", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/ui/dialog", "{ui}/dialog")] },
  "dropdown-menu": { name: "dropdown-menu", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/dropdown-menu", "{ui}/dropdown-menu")] },
  popover: { name: "popover", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/popover", "{ui}/popover")] },
  tooltip: { name: "tooltip", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/tooltip", "{ui}/tooltip")] },
  "hover-card": { name: "hover-card", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/hover-card", "{ui}/hover-card")] },
  menubar: { name: "menubar", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/menubar", "{ui}/menubar")] },
  "navigation-menu": { name: "navigation-menu", category: "navigation", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/navigation-menu", "{ui}/navigation-menu")] },
  "simple-select": { name: "simple-select", category: "ui", migrationAliasFor: "select" },
  select: { name: "select", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/select", "{ui}/select")] },
  table: { name: "table", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/table", "{ui}/table")] },
  "segmented-control": { name: "segmented-control", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/segmented-control", "{ui}/segmented-control")] },
  "radio-group": { name: "radio-group", category: "ui", registryDependencies: ["button", "utils"], files: [file("src/components/ui/radio-group", "{ui}/radio-group")] },
  accordion: { name: "accordion", category: "ui", dependencies: ["lucide-react"], registryDependencies: ["collapse"], files: [file("src/components/ui/accordion", "{ui}/accordion")] },
  kbd: { name: "kbd", category: "ui", files: [file("src/components/ui/kbd", "{ui}/kbd")] },
  "scroll-box": { name: "scroll-box", category: "ui", files: [file("src/components/ui/scroll-box", "{ui}/scroll-box")] },
  "right-click-menu": { name: "right-click-menu", category: "ui", dependencies: ["react"], files: [file("src/components/ui/right-click-menu", "{ui}/right-click-menu")] },
  "number-field": { name: "number-field", category: "inputs", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/number-field", "{ui}/number-field")] },
  "toggle-group": { name: "toggle-group", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/toggle-group", "{ui}/toggle-group")] },
  toolbar: { name: "toolbar", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/toolbar", "{ui}/toolbar")] },

  "tag-input": { name: "tag-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["badge", "input", "utils"], files: [file("src/components/inputs/tag-input.tsx", "{components}/inputs/tag-input.tsx")] },
  combobox: { name: "combobox", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["button", "input", "popover", "utils"], files: [file("src/components/inputs/combobox.tsx", "{components}/inputs/combobox.tsx")] },
  "async-select": { name: "async-select", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["button", "input", "popover", "utils"], files: [file("src/components/inputs/async-select.tsx", "{components}/inputs/async-select.tsx")] },

  "form-field-shell": { name: "form-field-shell", category: "form", registryDependencies: ["utils"], files: [file("src/components/form/form-field-shell.tsx", "{components}/form/form-field-shell.tsx")] },
  "form-input": { name: "form-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["input", "form-field-shell"], files: [file("src/components/form/form-input.tsx", "{components}/form/form-input.tsx")] },
  "form-select": { name: "form-select", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["select", "async-select", "form-field-shell"], files: [file("src/components/form/form-select.tsx", "{components}/form/form-select.tsx")] },
  "form-textarea": { name: "form-textarea", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["textarea", "form-field-shell"], files: [file("src/components/form/form-textarea.tsx", "{components}/form/form-textarea.tsx")] },
  "form-switch": { name: "form-switch", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["switch", "form-field-shell", "utils"], files: [file("src/components/form/form-switch.tsx", "{components}/form/form-switch.tsx")] },
  "form-date-range-input": { name: "form-date-range-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["input", "form-field-shell"], files: [file("src/components/form/form-date-range-input.tsx", "{components}/form/form-date-range-input.tsx")] },
  "form-date-picker": { name: "form-date-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-picker", "form-field-shell"], files: [file("src/components/form/form-date-picker.tsx", "{components}/form/form-date-picker.tsx")] },
  "form-date-range-picker": { name: "form-date-range-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-range-picker", "form-field-shell"], files: [file("src/components/form/form-date-range-picker.tsx", "{components}/form/form-date-range-picker.tsx")] },
  form: { name: "form", category: "group", registryDependencies: ["form-field-shell", "form-input", "form-select", "form-textarea", "form-switch", "form-date-range-input", "form-date-picker", "form-date-range-picker"], files: [file("src/components/form/index.ts", "{components}/form/index.ts")] },

  "dialog-actions": { name: "dialog-actions", category: "overlay", migrationAliasFor: "dialog" },
  "modal-shell": { name: "modal-shell", category: "overlay", migrationAliasFor: "dialog" },
  "confirm-dialog": { name: "confirm-dialog", category: "overlay", registryDependencies: ["button", "dialog"], files: [file("src/components/overlay/confirm-dialog.tsx", "{components}/overlay/confirm-dialog.tsx")] },
  "alert-dialog": { name: "alert-dialog", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["dialog", "button"], files: [file("src/components/overlay/alert-dialog.tsx", "{components}/overlay/alert-dialog.tsx")] },
  drawer: { name: "drawer", category: "overlay", dependencies: ["@base-ui/react"], registryDependencies: ["dialog"], files: [file("src/components/overlay/drawer.tsx", "{components}/overlay/drawer.tsx")] },

  "state-view": { name: "state-view", category: "feedback", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/feedback/state-view.tsx", "{components}/feedback/state-view.tsx")] },
  feedback: { name: "feedback", category: "group", registryDependencies: ["alert", "state-view"], files: [file("src/components/feedback/index.ts", "{components}/feedback/index.ts")] },

  "sidebar-context": { name: "sidebar-context", category: "layout", dependencies: ["lucide-react"], registryDependencies: ["button"], files: [file("src/components/layout/sidebar-context.tsx", "{components}/layout/sidebar-context.tsx")] },
  "workspace-layout": { name: "workspace-layout", category: "layout", registryDependencies: ["utils"], files: [file("src/components/layout/workspace-layout.tsx", "{components}/layout/workspace-layout.tsx"), file("src/components/layout/workspace-header.tsx", "{components}/layout/workspace-header.tsx")] },
  sidebar: { name: "sidebar", category: "layout", dependencies: ["react"], registryDependencies: ["tooltip", "sidebar-context", "utils"], files: [file("src/components/layout/sidebar.tsx", "{components}/layout/sidebar.tsx")] },
  layout: { name: "layout", category: "group", registryDependencies: ["workspace-layout", "sidebar", "breadcrumbs", "section"], files: [file("src/components/layout/index.ts", "{components}/layout/index.ts")] },
  calendar: { name: "calendar", category: "calendar", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/calendar/calendar.tsx", "{components}/calendar/calendar.tsx"), file("src/components/calendar/date-utils.ts", "{components}/calendar/date-utils.ts")] },
  "date-picker": { name: "date-picker", category: "calendar", dependencies: ["lucide-react"], registryDependencies: ["calendar", "button", "popover", "utils"], files: [file("src/components/calendar/date-picker.tsx", "{components}/calendar/date-picker.tsx")] },
  "date-range-picker": { name: "date-range-picker", category: "calendar", dependencies: ["lucide-react"], registryDependencies: ["calendar", "button", "popover", "utils"], files: [file("src/components/calendar/date-range-picker.tsx", "{components}/calendar/date-range-picker.tsx")] },

  dashboard: { name: "dashboard", category: "group", registryDependencies: ["layout", "feedback", "input", "async-select", "tag-input", "form"] },
  "calendar-kit": { name: "calendar-kit", category: "group", registryDependencies: ["calendar", "date-picker", "date-range-picker"] },
  "wizard-kit": { name: "wizard-kit", category: "group", registryDependencies: ["stepper", "wizard"] },
  dnd: { name: "dnd", category: "group", registryDependencies: ["sortable-list"], files: [file("src/components/dnd/index.ts", "{components}/dnd/index.ts")] },
  all: { name: "all", category: "group", registryDependencies: ["dashboard"] },
};

const generatedSourceRegistry: ComponentRegistryItem[] = [
  { name: "action-menu", category: "actions", files: [file("src/components/actions/action-menu.tsx", "{components}/actions/action-menu.tsx")] },
  { name: "activity-feed", category: "display", files: [file("src/components/display/activity-feed.tsx", "{components}/display/activity-feed.tsx")] },
  { name: "alert", category: "feedback", files: [file("src/components/feedback/alert.tsx", "{components}/feedback/alert.tsx")] },
  { name: "app-header", category: "layout", migrationAliasFor: "workspace-layout" },
  { name: "avatar", category: "display", files: [file("src/components/display/avatar.tsx", "{components}/display/avatar.tsx")] },
  { name: "breadcrumbs", category: "layout", files: [file("src/components/layout/breadcrumbs.tsx", "{components}/layout/breadcrumbs.tsx")] },
  { name: "button-group", category: "actions", files: [file("src/components/actions/button-group.tsx", "{components}/actions/button-group.tsx")] },
  { name: "code-block", category: "display", files: [file("src/components/display/code-block.tsx", "{components}/display/code-block.tsx")] },
  { name: "collapse", category: "ui", files: [file("src/components/ui/collapse", "{ui}/collapse")] },
  { name: "carousel", category: "display", files: [file("src/components/display/carousel.tsx", "{components}/display/carousel.tsx")] },
  { name: "tag", category: "display", registryDependencies: ["badge", "utils"], files: [file("src/components/display/tag.tsx", "{components}/display/tag.tsx")] },
  { name: "typography", category: "display", registryDependencies: ["utils"], files: [file("src/components/display/typography.tsx", "{components}/display/typography.tsx")] },
  { name: "command", category: "ui", files: [file("src/components/ui/command", "{ui}/command")] },
  { name: "copy-button", category: "actions", files: [file("src/components/actions/copy-button.tsx", "{components}/actions/copy-button.tsx")] },
  { name: "copy-field", category: "actions", migrationAliasFor: "copy-button" },
  { name: "clearable-input", category: "inputs", migrationAliasFor: "input" },
  { name: "search-input", category: "inputs", migrationAliasFor: "input" },
  { name: "password-input", category: "inputs", migrationAliasFor: "input" },
  { name: "number-input", category: "inputs", migrationAliasFor: "input" },
  { name: "money-input", category: "inputs", migrationAliasFor: "input" },
  { name: "phone-input", category: "inputs", migrationAliasFor: "input" },
  { name: "masked-input", category: "inputs", migrationAliasFor: "input" },
  { name: "quantity-input", category: "inputs", migrationAliasFor: "input" },
  { name: "date-input", category: "inputs", migrationAliasFor: "input" },
  { name: "date-range-input", category: "inputs", migrationAliasFor: "input" },
  { name: "form-async-select", category: "form", migrationAliasFor: "form-select" },
  { name: "input-decorator", category: "inputs", migrationAliasFor: "input" },
  { name: "input-value", category: "inputs", migrationAliasFor: "input" },
  { name: "inputs", category: "group", migrationAliasFor: "input" },
  { name: "app-sidebar", category: "layout", migrationAliasFor: "sidebar" },
  { name: "stat-card", category: "layout", migrationAliasFor: "statistic" },
  { name: "smart-card", category: "display", migrationAliasFor: "info-card" },
  { name: "file-dropzone", category: "upload", migrationAliasFor: "file-upload" },
  { name: "comparison-card", category: "display", migrationAliasFor: "card" },
  { name: "delta-badge", category: "display", migrationAliasFor: "badge" },
  { name: "trend-card", category: "display", migrationAliasFor: "statistic" },
  { name: "user-card", category: "display", migrationAliasFor: "avatar" },
  { name: "sheet-shell", category: "overlay", migrationAliasFor: "drawer" },
  { name: "nav-tabs", category: "navigation", migrationAliasFor: "tabs" },
  { name: "page-tabs", category: "navigation", migrationAliasFor: "tabs" },
  { name: "stepper-tabs", category: "navigation", migrationAliasFor: "stepper" },
  { name: "command-bar", category: "navigation", migrationAliasFor: "command-palette" },
  { name: "data-list", category: "display", migrationAliasFor: "list" },
  { name: "property-grid", category: "display", migrationAliasFor: "description-list" },
  { name: "data-table-bulk-actions", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-column-visibility-menu", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-pagination", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-row-actions", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-saved-filters", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-select-column", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-sortable-header", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-toolbar", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-table-view-presets", category: "data-table", migrationAliasFor: "data-table" },
  { name: "data-state", category: "display", registryDependencies: ["state-view"], files: [file("src/components/display/data-state.tsx", "{components}/display/data-state.tsx")] },
  {
    name: "data-table",
    category: "data-table",
    dependencies: ["@tanstack/react-table", "@tanstack/react-virtual", "lucide-react"],
    registryDependencies: [
      "button",
      "checkbox",
      "data-state",
      "dropdown-menu",
      "input",
      "pagination",
      "search-input",
      "select",
      "table",
      "utils",
    ],
    files: [
      file("src/components/data-table/data-table.tsx", "{components}/data-table/data-table.tsx"),
      file("src/components/data-table/data-table-actions-column.tsx", "{components}/data-table/data-table-actions-column.tsx"),
      file("src/components/data-table/data-table-bulk-actions.tsx", "{components}/data-table/data-table-bulk-actions.tsx"),
      file("src/components/data-table/data-table-column-visibility-menu.tsx", "{components}/data-table/data-table-column-visibility-menu.tsx"),
      file("src/components/data-table/data-table-pagination.tsx", "{components}/data-table/data-table-pagination.tsx"),
      file("src/components/data-table/data-table-row-actions.tsx", "{components}/data-table/data-table-row-actions.tsx"),
      file("src/components/data-table/data-table-saved-filters.tsx", "{components}/data-table/data-table-saved-filters.tsx"),
      file("src/components/data-table/data-table-select-column.tsx", "{components}/data-table/data-table-select-column.tsx"),
      file("src/components/data-table/data-table-sortable-header.tsx", "{components}/data-table/data-table-sortable-header.tsx"),
      file("src/components/data-table/data-table-toolbar.tsx", "{components}/data-table/data-table-toolbar.tsx"),
      file("src/components/data-table/data-table-view-presets.tsx", "{components}/data-table/data-table-view-presets.tsx"),
      file("src/components/data-table/table-export-menu.tsx", "{components}/data-table/table-export-menu.tsx"),
      file("src/components/data-table/table-import-button.tsx", "{components}/data-table/table-import-button.tsx"),
    ],
  },
  { name: "data-table-actions-column", category: "data-table", migrationAliasFor: "data-table" },
  { name: "table-export-menu", category: "data-table", migrationAliasFor: "data-table" },
  { name: "table-import-button", category: "data-table", migrationAliasFor: "data-table" },
  { name: "description-list", category: "display", files: [file("src/components/display/description-list.tsx", "{components}/display/description-list.tsx")] },
  { name: "divider", category: "ui", files: [file("src/components/ui/divider", "{ui}/divider")] },
  { name: "file-upload", category: "upload", files: [file("src/components/upload/file-upload.tsx", "{components}/upload/file-upload.tsx")] },
  { name: "filter-bar", category: "filters", files: [file("src/components/filters/filter-bar.tsx", "{components}/filters/filter-bar.tsx")] },
  { name: "empty-state", category: "patterns", registryDependencies: ["state-view", "button"], files: [file("src/components/patterns/empty-state.tsx", "{components}/patterns/empty-state.tsx")] },
  { name: "charts", category: "charts", dependencies: ["recharts"], registryDependencies: ["card", "state-view", "utils"], files: [file("src/components/charts/charts.tsx", "{components}/charts/charts.tsx"), file("src/components/charts/index.ts", "{components}/charts/index.ts")] },
  { name: "horizontal-bar-chart", category: "charts", migrationAliasFor: "charts" },
  { name: "image-upload", category: "upload", files: [file("src/components/upload/image-upload.tsx", "{components}/upload/image-upload.tsx")] },
  { name: "kanban", category: "display", dependencies: ["@dnd-kit/helpers", "@dnd-kit/react", "lucide-react"], registryDependencies: ["avatar", "badge", "button", "card", "utils"], files: [file("src/components/display/kanban.tsx", "{components}/display/kanban.tsx")] },
  { name: "chat", category: "display", dependencies: ["lucide-react"], registryDependencies: ["avatar", "badge", "button", "input", "textarea", "utils"], files: [file("src/components/display/chat.tsx", "{components}/display/chat.tsx")] },
  { name: "kpi", category: "charts", migrationAliasFor: "statistic" },
  { name: "list", category: "display", files: [file("src/components/display/list.tsx", "{components}/display/list.tsx")] },
  { name: "otp-input", category: "inputs", files: [file("src/components/inputs/otp-input.tsx", "{components}/inputs/otp-input.tsx")] },
  { name: "color-picker", category: "inputs", registryDependencies: ["utils"], files: [file("src/components/inputs/color-picker.tsx", "{components}/inputs/color-picker.tsx")] },
  { name: "signature-pad", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/inputs/signature-pad.tsx", "{components}/inputs/signature-pad.tsx")] },
  { name: "pagination", category: "navigation", files: [file("src/components/navigation/pagination.tsx", "{components}/navigation/pagination.tsx")] },
  { name: "progress", category: "display", files: [file("src/components/display/progress.tsx", "{components}/display/progress.tsx")] },
  { name: "progress-circle", category: "charts", files: [file("src/components/charts/progress-circle.tsx", "{components}/charts/progress-circle.tsx")] },
  { name: "quick-action-grid", category: "actions", files: [file("src/components/actions/quick-action-grid.tsx", "{components}/actions/quick-action-grid.tsx")] },
  { name: "rating", category: "inputs", files: [file("src/components/inputs/rating.tsx", "{components}/inputs/rating.tsx")] },
  { name: "section", category: "layout", files: [file("src/components/layout/section.tsx", "{components}/layout/section.tsx")] },
  { name: "slider", category: "inputs", files: [file("src/components/inputs/slider.tsx", "{components}/inputs/slider.tsx")] },
  { name: "info-card", category: "display", registryDependencies: ["card", "skeleton", "utils"], files: [file("src/components/display/info-card.tsx", "{components}/display/info-card.tsx")] },
  { name: "spinner", category: "ui", files: [file("src/components/ui/spinner", "{ui}/spinner")] },
  { name: "statistic", category: "display", files: [file("src/components/display/statistic.tsx", "{components}/display/statistic.tsx")] },
  { name: "status-dot", category: "display", files: [file("src/components/display/status-dot.tsx", "{components}/display/status-dot.tsx")] },
  { name: "status-legend", category: "display", registryDependencies: ["badge", "status-dot", "card", "utils"], files: [file("src/components/display/status-legend.tsx", "{components}/display/status-legend.tsx")] },
  { name: "stepper", category: "wizard", files: [file("src/components/wizard/stepper.tsx", "{components}/wizard/stepper.tsx")] },
  { name: "timeline", category: "display", files: [file("src/components/display/timeline.tsx", "{components}/display/timeline.tsx")] },
  { name: "toast", category: "notifications", files: [file("src/components/notifications/toast.tsx", "{components}/notifications/toast.tsx")] },
  { name: "tree-view", category: "display", files: [file("src/components/display/tree-view.tsx", "{components}/display/tree-view.tsx")] },
  { name: "use-before-unload-when-dirty", category: "hooks", files: [file("src/hooks/use-before-unload-when-dirty.ts", "{hooks}/use-before-unload-when-dirty.ts")] },
  { name: "use-data-table-view-state", category: "hooks", files: [file("src/hooks/use-data-table-view-state.ts", "{hooks}/use-data-table-view-state.ts")] },
  { name: "use-debounce", category: "hooks", files: [file("src/hooks/use-debounce.ts", "{hooks}/use-debounce.ts")] },
  { name: "use-disclosure", category: "hooks", files: [file("src/hooks/use-disclosure.ts", "{hooks}/use-disclosure.ts")] },
  { name: "use-is-mobile", category: "hooks", files: [file("src/hooks/use-is-mobile.ts", "{hooks}/use-is-mobile.ts")] },
  { name: "use-session-storage-state", category: "hooks", files: [file("src/hooks/use-session-storage-state.ts", "{hooks}/use-session-storage-state.ts")] },
  { name: "wizard", category: "wizard", files: [file("src/components/wizard/wizard.tsx", "{components}/wizard/wizard.tsx")] },
  { name: "inline-editable", category: "inputs", files: [file("src/components/inputs/inline-editable.tsx", "{components}/inputs/inline-editable.tsx")] },
  { name: "command-palette", category: "command", dependencies: ["cmdk", "lucide-react"], registryDependencies: ["button", "dialog", "input", "kbd", "utils"], files: [file("src/components/command/command-palette.tsx", "{components}/command/command-palette.tsx")] },
  { name: "saved-filter-select", category: "filters", files: [file("src/components/filters/saved-filter-select.tsx", "{components}/filters/saved-filter-select.tsx")] },
  { name: "notification-center", category: "notifications", files: [file("src/components/notifications/notification-center.tsx", "{components}/notifications/notification-center.tsx")] },
  { name: "calendar-scheduler", category: "modern", registryDependencies: ["utils"], files: [file("src/components/modern/calendar-scheduler.tsx", "{components}/modern/calendar-scheduler.tsx")] },
  { name: "dual-list-picker", category: "modern", registryDependencies: ["utils"], files: [file("src/components/modern/dual-list-picker.tsx", "{components}/modern/dual-list-picker.tsx")] },
  { name: "resizable-panel", category: "modern", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/modern/resizable-panel.tsx", "{components}/modern/resizable-panel.tsx")] },
  { name: "rich-text-editor", category: "modern", dependencies: ["@tiptap/core", "@tiptap/extensions", "@tiptap/extension-bubble-menu", "@tiptap/extension-floating-menu", "@tiptap/react", "@tiptap/pm", "@tiptap/starter-kit", "@tiptap/extension-link", "@tiptap/extension-placeholder", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/modern/rich-text-editor.tsx", "{components}/modern/rich-text-editor.tsx")] },
  { name: "image-cropper", category: "modern", dependencies: ["react-easy-crop", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/modern/image-cropper.tsx", "{components}/modern/image-cropper.tsx")] },
  { name: "qr-code", category: "display", dependencies: ["qrcode", "@types/qrcode"], registryDependencies: ["utils"], files: [file("src/components/display/qr-code.tsx", "{components}/display/qr-code.tsx")] },
  { name: "json-input", category: "inputs", registryDependencies: ["utils"], files: [file("src/components/inputs/json-input.tsx", "{components}/inputs/json-input.tsx")] },
  { name: "time-picker", category: "inputs", registryDependencies: ["utils"], files: [file("src/components/inputs/time-picker.tsx", "{components}/inputs/time-picker.tsx")] },
  { name: "sortable-list", category: "dnd", dependencies: ["@dnd-kit/helpers", "@dnd-kit/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/dnd/sortable-list.tsx", "{components}/dnd/sortable-list.tsx")] },
  { name: "virtual-list", category: "display", dependencies: ["@tanstack/react-virtual"], registryDependencies: ["utils"], files: [file("src/components/display/virtual-list.tsx", "{components}/display/virtual-list.tsx")] },
];

for (const item of generatedSourceRegistry) {
  registry[item.name] ??= item;
}

export function getAllRegistryComponentNames() {
  return Object.values(registry)
    .filter((item) => item.name !== "all")
    .filter((item) => item.category !== "group" && item.category !== "lib")
    .filter((item) => !item.migrationAliasFor)
    .filter((item) => (item.files?.length ?? 0) > 0)
    .map((item) => item.name);
}

registry.all.registryDependencies = getAllRegistryComponentNames();

export const registryNames = Object.keys(registry) as ComponentName[];
