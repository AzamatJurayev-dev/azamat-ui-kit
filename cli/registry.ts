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
  | "hooks"
  | "families"
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
  input: { name: "input", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/input", "{ui}/input")] },
  textarea: { name: "textarea", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/textarea.tsx", "{ui}/textarea.tsx")] },
  checkbox: { name: "checkbox", category: "ui", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/checkbox.tsx", "{ui}/checkbox.tsx")] },
  switch: { name: "switch", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/switch.tsx", "{ui}/switch.tsx")] },
  badge: { name: "badge", category: "ui", dependencies: ["@base-ui/react", "class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/badge", "{ui}/badge")] },
  card: { name: "card", category: "ui", dependencies: ["class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/card", "{ui}/card")] },
  skeleton: { name: "skeleton", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/skeleton.tsx", "{ui}/skeleton.tsx")] },
  tabs: { name: "tabs", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/tabs.tsx", "{ui}/tabs.tsx")] },
  dialog: { name: "dialog", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/ui/dialog", "{ui}/dialog")] },
  "dropdown-menu": { name: "dropdown-menu", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/dropdown-menu.tsx", "{ui}/dropdown-menu.tsx")] },
  popover: { name: "popover", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/popover.tsx", "{ui}/popover.tsx")] },
  tooltip: { name: "tooltip", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/tooltip.tsx", "{ui}/tooltip.tsx")] },
  select: { name: "select", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/select", "{ui}/select")] },
  table: { name: "table", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/table.tsx", "{ui}/table.tsx")] },
  "segmented-control": { name: "segmented-control", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/segmented-control.tsx", "{ui}/segmented-control.tsx")] },
  "radio-group": { name: "radio-group", category: "ui", registryDependencies: ["button", "utils"], files: [file("src/components/ui/radio-group.tsx", "{ui}/radio-group.tsx")] },
  kbd: { name: "kbd", category: "ui", files: [file("src/components/ui/kbd.tsx", "{ui}/kbd.tsx")] },
  "scroll-box": { name: "scroll-box", category: "ui", files: [file("src/components/ui/scroll-box.tsx", "{ui}/scroll-box.tsx")] },
  "right-click-menu": { name: "right-click-menu", category: "ui", dependencies: ["react"], files: [file("src/components/ui/right-click-menu.tsx", "{ui}/right-click-menu.tsx")] },
  accordion: { name: "accordion", category: "ui", registryDependencies: ["collapse"], files: [file("src/components/ui/accordion.tsx", "{ui}/accordion.tsx")] },

  "input-decorator": { name: "input-decorator", category: "inputs", dependencies: ["class-variance-authority"], registryDependencies: ["input", "utils"], files: [file("src/components/inputs/input-decorator.tsx", "{components}/inputs/input-decorator.tsx")] },
  "input-value": { name: "input-value", category: "inputs", files: [file("src/components/inputs/input-value.ts", "{components}/inputs/input-value.ts")] },
  "clearable-input": { name: "clearable-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["input-decorator", "input-value"], files: [file("src/components/inputs/clearable-input.tsx", "{components}/inputs/clearable-input.tsx")] },
  "search-input": { name: "search-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["clearable-input"], files: [file("src/components/inputs/search-input.tsx", "{components}/inputs/search-input.tsx")] },
  "password-input": { name: "password-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["input-decorator"], files: [file("src/components/inputs/password-input.tsx", "{components}/inputs/password-input.tsx")] },
  "number-input": { name: "number-input", category: "inputs", registryDependencies: ["input-decorator"], files: [file("src/components/inputs/number-input.tsx", "{components}/inputs/number-input.tsx")] },
  "date-input": { name: "date-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["input-decorator", "input-value"], files: [file("src/components/inputs/date-input.tsx", "{components}/inputs/date-input.tsx")] },
  "date-range-input": { name: "date-range-input", category: "inputs", registryDependencies: ["date-input", "utils"], files: [file("src/components/inputs/date-range-input.tsx", "{components}/inputs/date-range-input.tsx")] },
  "money-input": { name: "money-input", category: "inputs", registryDependencies: ["input", "utils"], files: [file("src/components/inputs/money-input.tsx", "{components}/inputs/money-input.tsx")] },
  "quantity-input": { name: "quantity-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["button", "input", "utils"], files: [file("src/components/inputs/quantity-input.tsx", "{components}/inputs/quantity-input.tsx")] },
  "masked-input": { name: "masked-input", category: "inputs", registryDependencies: ["input-decorator", "input-value"], files: [file("src/components/inputs/masked-input.tsx", "{components}/inputs/masked-input.tsx")] },
  "phone-input": { name: "phone-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["masked-input"], files: [file("src/components/inputs/phone-input.tsx", "{components}/inputs/phone-input.tsx")] },
  "tag-input": { name: "tag-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["badge", "input", "utils"], files: [file("src/components/inputs/tag-input.tsx", "{components}/inputs/tag-input.tsx")] },
  "simple-select": { name: "simple-select", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["select", "utils"], files: [file("src/components/inputs/simple-select.tsx", "{components}/inputs/simple-select.tsx")] },
  "async-select": { name: "async-select", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["button", "input", "popover", "utils"], files: [file("src/components/inputs/async-select.tsx", "{components}/inputs/async-select.tsx")] },
  inputs: { name: "inputs", category: "group", registryDependencies: ["clearable-input", "search-input", "password-input", "number-input", "date-input", "date-range-input", "money-input", "quantity-input", "masked-input", "phone-input", "tag-input", "simple-select", "async-select"], files: [file("src/components/inputs/index.ts", "{components}/inputs/index.ts")] },

  "form-field-shell": { name: "form-field-shell", category: "form", registryDependencies: ["utils"], files: [file("src/components/form/form-field-shell.tsx", "{components}/form/form-field-shell.tsx")] },
  "form-input": { name: "form-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["input", "search-input", "password-input", "number-input", "phone-input", "date-input", "form-field-shell"], files: [file("src/components/form/form-input.tsx", "{components}/form/form-input.tsx")] },
  "form-select": { name: "form-select", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["simple-select", "async-select", "form-field-shell"], files: [file("src/components/form/form-select.tsx", "{components}/form/form-select.tsx")] },
  "form-async-select": { name: "form-async-select", category: "form", migrationAliasFor: "form-select", dependencies: ["react-hook-form"], registryDependencies: ["async-select", "form-field-shell"], files: [file("src/components/form/form-async-select.tsx", "{components}/form/form-async-select.tsx")] },
  "form-textarea": { name: "form-textarea", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["textarea", "form-field-shell"], files: [file("src/components/form/form-textarea.tsx", "{components}/form/form-textarea.tsx")] },
  "form-switch": { name: "form-switch", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["switch", "form-field-shell", "utils"], files: [file("src/components/form/form-switch.tsx", "{components}/form/form-switch.tsx")] },
  "form-search-input": { name: "form-search-input", category: "form", migrationAliasFor: "form-input", dependencies: ["react-hook-form"], registryDependencies: ["form-input"], files: [file("src/components/form/form-search-input.tsx", "{components}/form/form-search-input.tsx")] },
  "form-password-input": { name: "form-password-input", category: "form", migrationAliasFor: "form-input", dependencies: ["react-hook-form"], registryDependencies: ["password-input", "form-field-shell"], files: [file("src/components/form/form-password-input.tsx", "{components}/form/form-password-input.tsx")] },
  "form-number-input": { name: "form-number-input", category: "form", migrationAliasFor: "form-input", dependencies: ["react-hook-form"], registryDependencies: ["form-input"], files: [file("src/components/form/form-number-input.tsx", "{components}/form/form-number-input.tsx")] },
  "form-phone-input": { name: "form-phone-input", category: "form", migrationAliasFor: "form-input", dependencies: ["react-hook-form"], registryDependencies: ["form-input"], files: [file("src/components/form/form-phone-input.tsx", "{components}/form/form-phone-input.tsx")] },
  "form-date-input": { name: "form-date-input", category: "form", migrationAliasFor: "form-input", dependencies: ["react-hook-form"], registryDependencies: ["form-input"], files: [file("src/components/form/form-date-input.tsx", "{components}/form/form-date-input.tsx")] },
  "form-date-range-input": { name: "form-date-range-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-range-input", "form-field-shell"], files: [file("src/components/form/form-date-range-input.tsx", "{components}/form/form-date-range-input.tsx")] },
  "form-date-picker": { name: "form-date-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-picker", "form-field-shell"], files: [file("src/components/form/form-date-picker.tsx", "{components}/form/form-date-picker.tsx")] },
  "form-date-range-picker": { name: "form-date-range-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-range-picker", "form-field-shell"], files: [file("src/components/form/form-date-range-picker.tsx", "{components}/form/form-date-range-picker.tsx")] },
  form: { name: "form", category: "group", registryDependencies: ["form-field-shell", "form-input", "form-select", "form-async-select", "form-textarea", "form-switch", "form-search-input", "form-password-input", "form-number-input", "form-phone-input", "form-date-input", "form-date-range-input", "form-date-picker", "form-date-range-picker"], files: [file("src/components/form/index.ts", "{components}/form/index.ts")] },

  "dialog-actions": { name: "dialog-actions", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["button", "dialog"], files: [file("src/components/overlay/dialog-actions.tsx", "{components}/overlay/dialog-actions.tsx")] },
  "modal-shell": { name: "modal-shell", category: "overlay", dependencies: ["@base-ui/react"], registryDependencies: ["button", "dialog"], files: [file("src/components/overlay/modal-shell.tsx", "{components}/overlay/modal-shell.tsx")] },
  "confirm-dialog": { name: "confirm-dialog", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["dialog-actions"], files: [file("src/components/overlay/confirm-dialog.tsx", "{components}/overlay/confirm-dialog.tsx")] },
  "sheet-shell": { name: "sheet-shell", category: "overlay", registryDependencies: ["dialog"], files: [file("src/components/overlay/sheet-shell.tsx", "{components}/overlay/sheet-shell.tsx")] },
  "alert-dialog": { name: "alert-dialog", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["dialog", "button"], files: [file("src/components/overlay/alert-dialog.tsx", "{components}/overlay/alert-dialog.tsx")] },
  drawer: { name: "drawer", category: "overlay", dependencies: ["@base-ui/react"], registryDependencies: ["dialog"], files: [file("src/components/overlay/drawer.tsx", "{components}/overlay/drawer.tsx")] },

  "empty-state": { name: "empty-state", category: "feedback", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/feedback/empty-state.tsx", "{components}/feedback/empty-state.tsx")] },
  "loading-state": { name: "loading-state", category: "feedback", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/feedback/loading-state.tsx", "{components}/feedback/loading-state.tsx")] },
  "page-state": { name: "page-state", category: "feedback", registryDependencies: ["button", "utils"], files: [file("src/components/feedback/page-state.tsx", "{components}/feedback/page-state.tsx")] },
  feedback: { name: "feedback", category: "group", registryDependencies: ["empty-state", "loading-state", "page-state"], files: [file("src/components/feedback/index.ts", "{components}/feedback/index.ts")] },

  "stat-card": { name: "stat-card", category: "layout", registryDependencies: ["card", "badge", "utils"], files: [file("src/components/layout/stat-card.tsx", "{components}/layout/stat-card.tsx")] },
  sidebar: { name: "sidebar", category: "layout", dependencies: ["react"], registryDependencies: ["tooltip", "utils"], files: [file("src/components/layout/app-sidebar.tsx", "{components}/layout/sidebar.tsx")] },
  layout: { name: "layout", category: "group", registryDependencies: ["sidebar", "stat-card"], files: [file("src/components/layout/index.ts", "{components}/layout/index.ts")] },
  calendar: { name: "calendar", category: "calendar", files: [file("src/components/calendar/calendar.tsx", "{components}/calendar/calendar.tsx"), file("src/components/calendar/date-utils.ts", "{components}/calendar/date-utils.ts")] },
  "date-picker": { name: "date-picker", category: "calendar", registryDependencies: ["calendar"], files: [file("src/components/calendar/date-picker.tsx", "{components}/calendar/date-picker.tsx")] },
  "date-range-picker": { name: "date-range-picker", category: "calendar", registryDependencies: ["calendar"], files: [file("src/components/calendar/date-range-picker.tsx", "{components}/calendar/date-range-picker.tsx")] },

  dashboard: { name: "dashboard", category: "group", registryDependencies: ["layout", "feedback", "inputs", "form"] },
  all: { name: "all", category: "group", registryDependencies: ["dashboard"] },
};

const generatedSourceRegistry: ComponentRegistryItem[] = [
  { name: "action-menu", category: "actions", files: [file("src/components/actions/action-menu.tsx", "{components}/actions/action-menu.tsx")] },
  { name: "activity-feed", category: "display", files: [file("src/components/display/activity-feed.tsx", "{components}/display/activity-feed.tsx")] },
  { name: "alert", category: "feedback", files: [file("src/components/feedback/alert.tsx", "{components}/feedback/alert.tsx")] },
  { name: "anchor-nav", category: "navigation", files: [file("src/components/navigation/anchor-nav.tsx", "{components}/navigation/anchor-nav.tsx")] },
  { name: "app-header", category: "layout", files: [file("src/components/layout/app-header.tsx", "{components}/layout/app-header.tsx")] },
  { name: "app-sidebar", category: "layout", migrationAliasFor: "sidebar", files: [file("src/components/layout/app-sidebar.tsx", "{components}/layout/app-sidebar.tsx")] },
  { name: "avatar", category: "display", files: [file("src/components/display/avatar.tsx", "{components}/display/avatar.tsx")] },
  { name: "breadcrumbs", category: "layout", files: [file("src/components/layout/breadcrumbs.tsx", "{components}/layout/breadcrumbs.tsx")] },
  { name: "button-group", category: "actions", files: [file("src/components/actions/button-group.tsx", "{components}/actions/button-group.tsx")] },
  { name: "charts", category: "charts", files: [file("src/components/charts/charts.tsx", "{components}/charts/charts.tsx")] },
  { name: "code-block", category: "display", files: [file("src/components/display/code-block.tsx", "{components}/display/code-block.tsx")] },
  { name: "collapse", category: "ui", files: [file("src/components/ui/collapse.tsx", "{ui}/collapse.tsx")] },
  { name: "color-input", category: "inputs", files: [file("src/components/inputs/color-input.tsx", "{components}/inputs/color-input.tsx")] },
  { name: "combobox", category: "inputs", files: [file("src/components/inputs/combobox.tsx", "{components}/inputs/combobox.tsx")] },
  { name: "command", category: "ui", files: [file("src/components/ui/command.tsx", "{ui}/command.tsx")] },
  { name: "command-palette", category: "command", files: [file("src/components/command/command-palette.tsx", "{components}/command/command-palette.tsx")] },
  { name: "copy-button", category: "actions", files: [file("src/components/actions/copy-button.tsx", "{components}/actions/copy-button.tsx")] },
  { name: "copy-field", category: "actions", files: [file("src/components/actions/copy-field.tsx", "{components}/actions/copy-field.tsx")] },
  { name: "data-state", category: "display", files: [file("src/components/display/data-state.tsx", "{components}/display/data-state.tsx")] },
  { name: "data-list", category: "display", files: [file("src/components/display/data-list.tsx", "{components}/display/data-list.tsx")] },
  { name: "data-table", category: "data-table", files: [file("src/components/data-table/data-table.tsx", "{components}/data-table/data-table.tsx")] },
  { name: "data-table-actions-column", category: "data-table", files: [file("src/components/data-table/data-table-actions-column.tsx", "{components}/data-table/data-table-actions-column.tsx")] },
  { name: "data-table-bulk-actions", category: "data-table", files: [file("src/components/data-table/data-table-bulk-actions.tsx", "{components}/data-table/data-table-bulk-actions.tsx")] },
  { name: "data-table-column-visibility-menu", category: "data-table", files: [file("src/components/data-table/data-table-column-visibility-menu.tsx", "{components}/data-table/data-table-column-visibility-menu.tsx")] },
  { name: "data-table-pagination", category: "data-table", files: [file("src/components/data-table/data-table-pagination.tsx", "{components}/data-table/data-table-pagination.tsx")] },
  { name: "data-table-row-actions", category: "data-table", files: [file("src/components/data-table/data-table-row-actions.tsx", "{components}/data-table/data-table-row-actions.tsx")] },
  { name: "data-table-select-column", category: "data-table", files: [file("src/components/data-table/data-table-select-column.tsx", "{components}/data-table/data-table-select-column.tsx")] },
  { name: "data-table-sortable-header", category: "data-table", files: [file("src/components/data-table/data-table-sortable-header.tsx", "{components}/data-table/data-table-sortable-header.tsx")] },
  { name: "data-table-toolbar", category: "data-table", files: [file("src/components/data-table/data-table-toolbar.tsx", "{components}/data-table/data-table-toolbar.tsx")] },
  { name: "data-table-view-presets", category: "data-table", files: [file("src/components/data-table/data-table-view-presets.tsx", "{components}/data-table/data-table-view-presets.tsx")] },
  { name: "data-table-saved-filters", category: "data-table", files: [file("src/components/data-table/data-table-saved-filters.tsx", "{components}/data-table/data-table-saved-filters.tsx")] },
  { name: "description-list", category: "display", files: [file("src/components/display/description-list.tsx", "{components}/display/description-list.tsx")] },
  { name: "descriptions", category: "display", files: [file("src/components/display/descriptions.tsx", "{components}/display/descriptions.tsx")] },
  { name: "divider", category: "ui", files: [file("src/components/ui/divider.tsx", "{ui}/divider.tsx")] },
  { name: "entity-card", category: "display", files: [file("src/components/display/entity-card.tsx", "{components}/display/entity-card.tsx")] },
  { name: "file-card", category: "display", files: [file("src/components/display/file-card.tsx", "{components}/display/file-card.tsx")] },
  { name: "file-dropzone", category: "upload", files: [file("src/components/upload/file-dropzone.tsx", "{components}/upload/file-dropzone.tsx")] },
  { name: "file-upload", category: "upload", files: [file("src/components/upload/file-upload.tsx", "{components}/upload/file-upload.tsx")] },
  { name: "filter-bar", category: "filters", files: [file("src/components/filters/filter-bar.tsx", "{components}/filters/filter-bar.tsx")] },
  { name: "filter-chips", category: "filters", files: [file("src/components/filters/filter-chips.tsx", "{components}/filters/filter-chips.tsx")] },
  { name: "form-builder", category: "patterns", files: [file("src/components/patterns/form-builder.tsx", "{components}/patterns/form-builder.tsx")] },
  { name: "horizontal-bar-chart", category: "charts", files: [file("src/components/charts/horizontal-bar-chart.tsx", "{components}/charts/horizontal-bar-chart.tsx")] },
  { name: "image-upload", category: "upload", files: [file("src/components/upload/image-upload.tsx", "{components}/upload/image-upload.tsx")] },
  { name: "input-group", category: "ui", files: [file("src/components/ui/input-group.tsx", "{ui}/input-group.tsx")] },
  { name: "input-primitive", category: "ui", files: [file("src/components/ui/input-primitive.tsx", "{ui}/input-primitive.tsx")] },
  { name: "kanban", category: "display", files: [file("src/components/display/kanban.tsx", "{components}/display/kanban.tsx")] },
  { name: "keyboard-shortcut", category: "display", files: [file("src/components/display/keyboard-shortcut.tsx", "{components}/display/keyboard-shortcut.tsx")] },
  { name: "key-value-card", category: "display", registryDependencies: ["card"], files: [file("src/components/display/key-value-card.tsx", "{components}/display/key-value-card.tsx")] },
  { name: "kpi", category: "charts", files: [file("src/components/charts/kpi.tsx", "{components}/charts/kpi.tsx")] },
  { name: "list", category: "display", files: [file("src/components/display/list.tsx", "{components}/display/list.tsx")] },
  { name: "metric-grid", category: "display", files: [file("src/components/display/metric-grid.tsx", "{components}/display/metric-grid.tsx")] },
  { name: "nav-tabs", category: "navigation", files: [file("src/components/navigation/nav-tabs.tsx", "{components}/navigation/nav-tabs.tsx")] },
  { name: "otp-input", category: "inputs", files: [file("src/components/inputs/otp-input.tsx", "{components}/inputs/otp-input.tsx")] },
  { name: "page-container", category: "layout", files: [file("src/components/layout/page-container.tsx", "{components}/layout/page-container.tsx")] },
  { name: "page-tabs", category: "navigation", files: [file("src/components/navigation/page-tabs.tsx", "{components}/navigation/page-tabs.tsx")] },
  { name: "pagination", category: "navigation", files: [file("src/components/navigation/pagination.tsx", "{components}/navigation/pagination.tsx")] },
  { name: "progress", category: "display", files: [file("src/components/display/progress.tsx", "{components}/display/progress.tsx")] },
  { name: "progress-circle", category: "display", files: [file("src/components/display/progress-circle.tsx", "{components}/display/progress-circle.tsx")] },
  { name: "progress-ring", category: "charts", files: [file("src/components/charts/progress-ring.tsx", "{components}/charts/progress-ring.tsx")] },
  { name: "property-grid", category: "display", files: [file("src/components/display/property-grid.tsx", "{components}/display/property-grid.tsx")] },
  { name: "quantity-stepper", category: "inputs", files: [file("src/components/inputs/quantity-stepper.tsx", "{components}/inputs/quantity-stepper.tsx")] },
  { name: "quick-action-grid", category: "actions", files: [file("src/components/actions/quick-action-grid.tsx", "{components}/actions/quick-action-grid.tsx")] },
  { name: "rating", category: "inputs", files: [file("src/components/inputs/rating.tsx", "{components}/inputs/rating.tsx")] },
  { name: "resource-detail-page", category: "patterns", files: [file("src/components/patterns/resource-detail-page.tsx", "{components}/patterns/resource-detail-page.tsx")] },
  { name: "resource-page", category: "patterns", files: [file("src/components/patterns/resource-page.tsx", "{components}/patterns/resource-page.tsx")] },
  { name: "result", category: "display", files: [file("src/components/display/result.tsx", "{components}/display/result.tsx")] },
  { name: "section", category: "layout", files: [file("src/components/layout/section.tsx", "{components}/layout/section.tsx")] },
  { name: "section-header", category: "layout", files: [file("src/components/layout/section-header.tsx", "{components}/layout/section-header.tsx")] },
  { name: "sidebar-nav", category: "layout", files: [file("src/components/layout/sidebar-nav.tsx", "{components}/layout/sidebar-nav.tsx")] },
  { name: "slider", category: "inputs", files: [file("src/components/inputs/slider.tsx", "{components}/inputs/slider.tsx")] },
  { name: "info-card", category: "display", files: [file("src/components/display/smart-card.tsx", "{components}/display/smart-card.tsx")] },
  { name: "spinner", category: "ui", files: [file("src/components/ui/spinner.tsx", "{ui}/spinner.tsx")] },
  { name: "stack", category: "layout", files: [file("src/components/layout/stack.tsx", "{components}/layout/stack.tsx")] },
  { name: "statistic", category: "display", files: [file("src/components/display/statistic.tsx", "{components}/display/statistic.tsx")] },
  { name: "status-dot", category: "display", files: [file("src/components/display/status-dot.tsx", "{components}/display/status-dot.tsx")] },
  { name: "status-legend", category: "display", files: [file("src/components/display/status-legend.tsx", "{components}/display/status-legend.tsx")] },
  { name: "stepper", category: "wizard", files: [file("src/components/wizard/stepper.tsx", "{components}/wizard/stepper.tsx")] },
  { name: "stepper-tabs", category: "navigation", files: [file("src/components/navigation/stepper-tabs.tsx", "{components}/navigation/stepper-tabs.tsx")] },
  { name: "sticky-footer-bar", category: "layout", files: [file("src/components/layout/sticky-footer-bar.tsx", "{components}/layout/sticky-footer-bar.tsx")] },
  { name: "table-export-menu", category: "data-table", files: [file("src/components/data-table/table-export-menu.tsx", "{components}/data-table/table-export-menu.tsx")] },
  { name: "table-import-button", category: "data-table", files: [file("src/components/data-table/table-import-button.tsx", "{components}/data-table/table-import-button.tsx")] },
  { name: "tag-list", category: "display", files: [file("src/components/display/tag-list.tsx", "{components}/display/tag-list.tsx")] },
  { name: "timeline", category: "display", files: [file("src/components/display/timeline.tsx", "{components}/display/timeline.tsx")] },
  { name: "toast", category: "notifications", files: [file("src/components/notifications/toast.tsx", "{components}/notifications/toast.tsx")] },
  { name: "tree-view", category: "display", files: [file("src/components/display/tree-view.tsx", "{components}/display/tree-view.tsx")] },
  { name: "use-before-unload-when-dirty", category: "hooks", files: [file("src/hooks/use-before-unload-when-dirty.ts", "{hooks}/use-before-unload-when-dirty.ts")] },
  { name: "use-data-table-view-state", category: "hooks", files: [file("src/hooks/use-data-table-view-state.ts", "{hooks}/use-data-table-view-state.ts")] },
  { name: "use-debounce", category: "hooks", files: [file("src/hooks/use-debounce.ts", "{hooks}/use-debounce.ts")] },
  { name: "use-disclosure", category: "hooks", files: [file("src/hooks/use-disclosure.ts", "{hooks}/use-disclosure.ts")] },
  { name: "use-is-mobile", category: "hooks", files: [file("src/hooks/use-is-mobile.ts", "{hooks}/use-is-mobile.ts")] },
  { name: "use-session-storage-state", category: "hooks", files: [file("src/hooks/use-session-storage-state.ts", "{hooks}/use-session-storage-state.ts")] },
  { name: "user-card", category: "display", files: [file("src/components/display/user-card.tsx", "{components}/display/user-card.tsx")] },
  { name: "wizard", category: "wizard", files: [file("src/components/wizard/wizard.tsx", "{components}/wizard/wizard.tsx")] },
  { name: "trend-card", category: "display", files: [file("src/components/display/trend-card.tsx", "{components}/display/trend-card.tsx")] },
  { name: "comparison-card", category: "display", files: [file("src/components/display/comparison-card.tsx", "{components}/display/comparison-card.tsx")] },
  { name: "delta-badge", category: "display", files: [file("src/components/display/delta-badge.tsx", "{components}/display/delta-badge.tsx")] },
  { name: "skeleton-table", category: "display", files: [file("src/components/display/skeleton-table.tsx", "{components}/display/skeleton-table.tsx")] },
  { name: "skeleton-form", category: "display", files: [file("src/components/display/skeleton-form.tsx", "{components}/display/skeleton-form.tsx")] },
  { name: "entity-header", category: "display", files: [file("src/components/display/entity-header.tsx", "{components}/display/entity-header.tsx")] },
  { name: "inline-editable", category: "inputs", files: [file("src/components/inputs/inline-editable.tsx", "{components}/inputs/inline-editable.tsx")] },
  { name: "repeater-field", category: "form", files: [file("src/components/form/repeater-field.tsx", "{components}/form/repeater-field.tsx")] },
  { name: "empty-search-state", category: "feedback", files: [file("src/components/feedback/empty-search-state.tsx", "{components}/feedback/empty-search-state.tsx")] },
  { name: "command-bar", category: "navigation", files: [file("src/components/navigation/command-bar.tsx", "{components}/navigation/command-bar.tsx")] },
  { name: "saved-filter-select", category: "filters", files: [file("src/components/filters/saved-filter-select.tsx", "{components}/filters/saved-filter-select.tsx")] },
  { name: "notification-center", category: "notifications", files: [file("src/components/notifications/notification-center.tsx", "{components}/notifications/notification-center.tsx")] },
];

for (const item of generatedSourceRegistry) {
  registry[item.name] ??= item;
}

export const registryNames = Object.keys(registry) as ComponentName[];
