export type ComponentName =
  | "utils"
  | "button"
  | "input"
  | "textarea"
  | "checkbox"
  | "switch"
  | "badge"
  | "card"
  | "dialog"
  | "dropdown-menu"
  | "popover"
  | "select"
  | "table"
  | "dialog-actions"
  | "modal-shell"
  | "confirm-dialog"
  | "sheet-shell"
  | "overlay"
  | "pagination"
  | "clearable-input"
  | "search-input"
  | "password-input"
  | "number-input"
  | "date-input"
  | "date-range-input"
  | "money-input"
  | "quantity-input"
  | "masked-input"
  | "phone-input"
  | "simple-select"
  | "async-select"
  | "inputs"
  | "form-field-shell"
  | "form-input"
  | "form-select"
  | "form-async-select"
  | "form-textarea"
  | "form-switch"
  | "form-search-input"
  | "form-password-input"
  | "form-number-input"
  | "form-phone-input"
  | "form-date-input"
  | "form-date-range-input"
  | "form-date-picker"
  | "form-date-range-picker"
  | "form"
  | "empty-state"
  | "loading-state"
  | "status-badge"
  | "feedback"
  | "action-menu"
  | "actions"
  | "page-header"
  | "stat-card"
  | "app-shell"
  | "app-header"
  | "app-sidebar"
  | "sidebar-nav"
  | "breadcrumbs"
  | "page-container"
  | "layout"
  | "filter-bar"
  | "filters"
  | "data-table-toolbar"
  | "data-table-pagination"
  | "data-table-column-visibility-menu"
  | "data-table-select-column"
  | "data-table-sortable-header"
  | "data-table-row-actions"
  | "data-table-actions-column"
  | "data-table-bulk-actions"
  | "data-table"
  | "calendar"
  | "date-picker"
  | "date-range-picker"
  | "calendar-kit"
  | "file-upload"
  | "image-upload"
  | "upload"
  | "stepper"
  | "wizard"
  | "wizard-kit"
  | "toast"
  | "notifications"
  | "command-palette"
  | "command"
  | "use-session-storage-state"
  | "use-before-unload-when-dirty"
  | "use-is-mobile"
  | "use-disclosure"
  | "use-debounce"
  | "hooks"
  | "dashboard"
  | "all";

export type RegistryFile = { source: string; target: string };

export type ComponentCategory =
  | "lib"
  | "ui"
  | "overlay"
  | "navigation"
  | "inputs"
  | "form"
  | "feedback"
  | "actions"
  | "layout"
  | "filters"
  | "data-table"
  | "calendar"
  | "upload"
  | "wizard"
  | "notifications"
  | "command"
  | "hooks"
  | "group";

export type ComponentRegistryItem = {
  name: ComponentName;
  category: ComponentCategory;
  description?: string;
  dependencies?: string[];
  registryDependencies?: ComponentName[];
  files?: RegistryFile[];
};

const file = (source: string, target: string): RegistryFile => ({ source, target });

export const registry: Record<ComponentName, ComponentRegistryItem> = {
  utils: { name: "utils", category: "lib", dependencies: ["clsx", "tailwind-merge"], files: [file("src/lib/utils.ts", "{utils}")] },

  button: { name: "button", category: "ui", dependencies: ["@base-ui/react", "class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/button.tsx", "{ui}/button.tsx")] },
  input: { name: "input", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/input.tsx", "{ui}/input.tsx")] },
  textarea: { name: "textarea", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/textarea.tsx", "{ui}/textarea.tsx")] },
  checkbox: { name: "checkbox", category: "ui", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/checkbox.tsx", "{ui}/checkbox.tsx")] },
  switch: { name: "switch", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/switch.tsx", "{ui}/switch.tsx")] },
  badge: { name: "badge", category: "ui", dependencies: ["@base-ui/react", "class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/badge.tsx", "{ui}/badge.tsx")] },
  card: { name: "card", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/card.tsx", "{ui}/card.tsx")] },
  dialog: { name: "dialog", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/ui/dialog.tsx", "{ui}/dialog.tsx")] },
  "dropdown-menu": { name: "dropdown-menu", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/dropdown-menu.tsx", "{ui}/dropdown-menu.tsx")] },
  popover: { name: "popover", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/popover.tsx", "{ui}/popover.tsx")] },
  select: { name: "select", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/select.tsx", "{ui}/select.tsx")] },
  table: { name: "table", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/table.tsx", "{ui}/table.tsx")] },

  "dialog-actions": { name: "dialog-actions", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/overlay/dialog-actions.tsx", "{components}/overlay/dialog-actions.tsx")] },
  "modal-shell": { name: "modal-shell", category: "overlay", registryDependencies: ["dialog", "utils"], files: [file("src/components/overlay/modal-shell.tsx", "{components}/overlay/modal-shell.tsx")] },
  "confirm-dialog": { name: "confirm-dialog", category: "overlay", registryDependencies: ["modal-shell", "dialog-actions"], files: [file("src/components/overlay/confirm-dialog.tsx", "{components}/overlay/confirm-dialog.tsx")] },
  "sheet-shell": { name: "sheet-shell", category: "overlay", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/overlay/sheet-shell.tsx", "{components}/overlay/sheet-shell.tsx")] },
  overlay: { name: "overlay", category: "group", registryDependencies: ["dialog-actions", "modal-shell", "confirm-dialog", "sheet-shell"], files: [file("src/components/overlay/index.ts", "{components}/overlay/index.ts")] },

  pagination: { name: "pagination", category: "navigation", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/navigation/pagination.tsx", "{components}/navigation/pagination.tsx")] },

  "clearable-input": { name: "clearable-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["input", "utils"], files: [file("src/components/inputs/clearable-input.tsx", "{components}/inputs/clearable-input.tsx")] },
  "search-input": { name: "search-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["clearable-input"], files: [file("src/components/inputs/search-input.tsx", "{components}/inputs/search-input.tsx")] },
  "password-input": { name: "password-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["input", "utils"], files: [file("src/components/inputs/password-input.tsx", "{components}/inputs/password-input.tsx")] },
  "number-input": { name: "number-input", category: "inputs", registryDependencies: ["input"], files: [file("src/components/inputs/number-input.tsx", "{components}/inputs/number-input.tsx")] },
  "date-input": { name: "date-input", category: "inputs", registryDependencies: ["input"], files: [file("src/components/inputs/date-input.tsx", "{components}/inputs/date-input.tsx")] },
  "date-range-input": { name: "date-range-input", category: "inputs", registryDependencies: ["date-input", "utils"], files: [file("src/components/inputs/date-range-input.tsx", "{components}/inputs/date-range-input.tsx")] },
  "money-input": { name: "money-input", category: "inputs", registryDependencies: ["input", "utils"], files: [file("src/components/inputs/money-input.tsx", "{components}/inputs/money-input.tsx")] },
  "quantity-input": { name: "quantity-input", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["button", "input", "utils"], files: [file("src/components/inputs/quantity-input.tsx", "{components}/inputs/quantity-input.tsx")] },
  "masked-input": { name: "masked-input", category: "inputs", registryDependencies: ["input"], files: [file("src/components/inputs/masked-input.tsx", "{components}/inputs/masked-input.tsx")] },
  "phone-input": { name: "phone-input", category: "inputs", registryDependencies: ["masked-input"], files: [file("src/components/inputs/phone-input.tsx", "{components}/inputs/phone-input.tsx")] },
  "simple-select": { name: "simple-select", category: "inputs", registryDependencies: ["select", "utils"], files: [file("src/components/inputs/simple-select.tsx", "{components}/inputs/simple-select.tsx")] },
  "async-select": { name: "async-select", category: "inputs", dependencies: ["lucide-react"], registryDependencies: ["button", "input", "popover", "utils"], files: [file("src/components/inputs/async-select.tsx", "{components}/inputs/async-select.tsx")] },
  inputs: { name: "inputs", category: "group", registryDependencies: ["clearable-input", "search-input", "password-input", "number-input", "date-input", "date-range-input", "money-input", "quantity-input", "masked-input", "phone-input", "simple-select", "async-select"], files: [file("src/components/inputs/index.ts", "{components}/inputs/index.ts")] },

  "form-field-shell": { name: "form-field-shell", category: "form", registryDependencies: ["utils"], files: [file("src/components/form/form-field-shell.tsx", "{components}/form/form-field-shell.tsx")] },
  "form-input": { name: "form-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["input", "form-field-shell"], files: [file("src/components/form/form-input.tsx", "{components}/form/form-input.tsx")] },
  "form-select": { name: "form-select", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["simple-select", "form-field-shell"], files: [file("src/components/form/form-select.tsx", "{components}/form/form-select.tsx")] },
  "form-async-select": { name: "form-async-select", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["async-select", "form-field-shell"], files: [file("src/components/form/form-async-select.tsx", "{components}/form/form-async-select.tsx")] },
  "form-textarea": { name: "form-textarea", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["textarea", "form-field-shell"], files: [file("src/components/form/form-textarea.tsx", "{components}/form/form-textarea.tsx")] },
  "form-switch": { name: "form-switch", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["switch", "form-field-shell", "utils"], files: [file("src/components/form/form-switch.tsx", "{components}/form/form-switch.tsx")] },
  "form-search-input": { name: "form-search-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["search-input", "form-field-shell"], files: [file("src/components/form/form-search-input.tsx", "{components}/form/form-search-input.tsx")] },
  "form-password-input": { name: "form-password-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["password-input", "form-field-shell"], files: [file("src/components/form/form-password-input.tsx", "{components}/form/form-password-input.tsx")] },
  "form-number-input": { name: "form-number-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["number-input", "form-field-shell"], files: [file("src/components/form/form-number-input.tsx", "{components}/form/form-number-input.tsx")] },
  "form-phone-input": { name: "form-phone-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["phone-input", "form-field-shell"], files: [file("src/components/form/form-phone-input.tsx", "{components}/form/form-phone-input.tsx")] },
  "form-date-input": { name: "form-date-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-input", "form-field-shell"], files: [file("src/components/form/form-date-input.tsx", "{components}/form/form-date-input.tsx")] },
  "form-date-range-input": { name: "form-date-range-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-range-input", "form-field-shell"], files: [file("src/components/form/form-date-range-input.tsx", "{components}/form/form-date-range-input.tsx")] },
  "form-date-picker": { name: "form-date-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-picker", "form-field-shell"], files: [file("src/components/form/form-date-picker.tsx", "{components}/form/form-date-picker.tsx")] },
  "form-date-range-picker": { name: "form-date-range-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-range-picker", "form-field-shell"], files: [file("src/components/form/form-date-range-picker.tsx", "{components}/form/form-date-range-picker.tsx")] },
  form: { name: "form", category: "group", registryDependencies: ["form-field-shell", "form-input", "form-select", "form-async-select", "form-textarea", "form-switch", "form-search-input", "form-password-input", "form-number-input", "form-phone-input", "form-date-input", "form-date-range-input", "form-date-picker", "form-date-range-picker"], files: [file("src/components/form/index.ts", "{components}/form/index.ts")] },

  "empty-state": { name: "empty-state", category: "feedback", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/feedback/empty-state.tsx", "{components}/feedback/empty-state.tsx")] },
  "loading-state": { name: "loading-state", category: "feedback", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/feedback/loading-state.tsx", "{components}/feedback/loading-state.tsx")] },
  "status-badge": { name: "status-badge", category: "feedback", registryDependencies: ["badge", "utils"], files: [file("src/components/feedback/status-badge.tsx", "{components}/feedback/status-badge.tsx")] },
  feedback: { name: "feedback", category: "group", registryDependencies: ["empty-state", "loading-state", "status-badge"], files: [file("src/components/feedback/index.ts", "{components}/feedback/index.ts")] },

  "action-menu": { name: "action-menu", category: "actions", dependencies: ["lucide-react"], registryDependencies: ["button", "dropdown-menu", "utils"], files: [file("src/components/actions/action-menu.tsx", "{components}/actions/action-menu.tsx")] },
  actions: { name: "actions", category: "group", registryDependencies: ["action-menu"], files: [file("src/components/actions/index.ts", "{components}/actions/index.ts")] },

  "page-header": { name: "page-header", category: "layout", registryDependencies: ["utils"], files: [file("src/components/layout/page-header.tsx", "{components}/layout/page-header.tsx")] },
  "stat-card": { name: "stat-card", category: "layout", registryDependencies: ["card", "utils"], files: [file("src/components/layout/stat-card.tsx", "{components}/layout/stat-card.tsx")] },
  "app-shell": { name: "app-shell", category: "layout", registryDependencies: ["utils"], files: [file("src/components/layout/app-shell.tsx", "{components}/layout/app-shell.tsx")] },
  "app-header": { name: "app-header", category: "layout", registryDependencies: ["utils"], files: [file("src/components/layout/app-header.tsx", "{components}/layout/app-header.tsx")] },
  "app-sidebar": { name: "app-sidebar", category: "layout", registryDependencies: ["utils"], files: [file("src/components/layout/app-sidebar.tsx", "{components}/layout/app-sidebar.tsx")] },
  "sidebar-nav": { name: "sidebar-nav", category: "layout", registryDependencies: ["badge", "utils"], files: [file("src/components/layout/sidebar-nav.tsx", "{components}/layout/sidebar-nav.tsx")] },
  breadcrumbs: { name: "breadcrumbs", category: "layout", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/layout/breadcrumbs.tsx", "{components}/layout/breadcrumbs.tsx")] },
  "page-container": { name: "page-container", category: "layout", registryDependencies: ["utils"], files: [file("src/components/layout/page-container.tsx", "{components}/layout/page-container.tsx")] },
  layout: { name: "layout", category: "group", registryDependencies: ["app-shell", "app-header", "app-sidebar", "page-header", "stat-card", "sidebar-nav", "breadcrumbs", "page-container"], files: [file("src/components/layout/index.ts", "{components}/layout/index.ts")] },

  "filter-bar": { name: "filter-bar", category: "filters", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/filters/filter-bar.tsx", "{components}/filters/filter-bar.tsx")] },
  filters: { name: "filters", category: "group", registryDependencies: ["filter-bar"], files: [file("src/components/filters/index.ts", "{components}/filters/index.ts")] },

  "data-table-toolbar": { name: "data-table-toolbar", category: "data-table", registryDependencies: ["utils"], files: [file("src/components/data-table/data-table-toolbar.tsx", "{components}/data-table/data-table-toolbar.tsx")] },
  "data-table-pagination": { name: "data-table-pagination", category: "data-table", registryDependencies: ["pagination", "simple-select", "utils"], files: [file("src/components/data-table/data-table-pagination.tsx", "{components}/data-table/data-table-pagination.tsx")] },
  "data-table-column-visibility-menu": { name: "data-table-column-visibility-menu", category: "data-table", dependencies: ["@tanstack/react-table", "lucide-react"], registryDependencies: ["button", "dropdown-menu", "utils"], files: [file("src/components/data-table/data-table-column-visibility-menu.tsx", "{components}/data-table/data-table-column-visibility-menu.tsx")] },
  "data-table-select-column": { name: "data-table-select-column", category: "data-table", dependencies: ["@tanstack/react-table"], registryDependencies: ["checkbox", "utils"], files: [file("src/components/data-table/data-table-select-column.tsx", "{components}/data-table/data-table-select-column.tsx")] },
  "data-table-sortable-header": { name: "data-table-sortable-header", category: "data-table", dependencies: ["@tanstack/react-table", "lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/data-table/data-table-sortable-header.tsx", "{components}/data-table/data-table-sortable-header.tsx")] },
  "data-table-row-actions": { name: "data-table-row-actions", category: "data-table", dependencies: ["@tanstack/react-table"], registryDependencies: ["action-menu"], files: [file("src/components/data-table/data-table-row-actions.tsx", "{components}/data-table/data-table-row-actions.tsx")] },
  "data-table-actions-column": { name: "data-table-actions-column", category: "data-table", dependencies: ["@tanstack/react-table"], registryDependencies: ["data-table-row-actions", "utils"], files: [file("src/components/data-table/data-table-actions-column.tsx", "{components}/data-table/data-table-actions-column.tsx")] },
  "data-table-bulk-actions": { name: "data-table-bulk-actions", category: "data-table", dependencies: ["lucide-react"], registryDependencies: ["action-menu", "button", "utils"], files: [file("src/components/data-table/data-table-bulk-actions.tsx", "{components}/data-table/data-table-bulk-actions.tsx")] },
  "data-table": { name: "data-table", category: "group", dependencies: ["@tanstack/react-table"], registryDependencies: ["table", "empty-state", "loading-state", "data-table-toolbar", "data-table-pagination", "data-table-column-visibility-menu", "data-table-select-column", "data-table-sortable-header", "data-table-row-actions", "data-table-actions-column", "data-table-bulk-actions", "utils"], files: [file("src/components/data-table/data-table.tsx", "{components}/data-table/data-table.tsx"), file("src/components/data-table/index.ts", "{components}/data-table/index.ts")] },

  calendar: { name: "calendar", category: "calendar", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/calendar/date-utils.ts", "{components}/calendar/date-utils.ts"), file("src/components/calendar/calendar.tsx", "{components}/calendar/calendar.tsx")] },
  "date-picker": { name: "date-picker", category: "calendar", dependencies: ["lucide-react"], registryDependencies: ["calendar", "button", "popover", "utils"], files: [file("src/components/calendar/date-picker.tsx", "{components}/calendar/date-picker.tsx")] },
  "date-range-picker": { name: "date-range-picker", category: "calendar", dependencies: ["lucide-react"], registryDependencies: ["calendar", "button", "popover", "utils"], files: [file("src/components/calendar/date-range-picker.tsx", "{components}/calendar/date-range-picker.tsx")] },
  "calendar-kit": { name: "calendar-kit", category: "group", registryDependencies: ["calendar", "date-picker", "date-range-picker"], files: [file("src/components/calendar/index.ts", "{components}/calendar/index.ts")] },

  "file-upload": { name: "file-upload", category: "upload", registryDependencies: ["button"], files: [file("src/components/upload/file-upload.tsx", "{components}/upload/file-upload.tsx")] },
  "image-upload": { name: "image-upload", category: "upload", registryDependencies: ["file-upload"], files: [file("src/components/upload/image-upload.tsx", "{components}/upload/image-upload.tsx")] },
  upload: { name: "upload", category: "group", registryDependencies: ["file-upload", "image-upload"], files: [file("src/components/upload/index.ts", "{components}/upload/index.ts")] },

  stepper: { name: "stepper", category: "wizard", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/wizard/stepper.tsx", "{components}/wizard/stepper.tsx")] },
  wizard: { name: "wizard", category: "wizard", registryDependencies: ["button", "stepper", "utils"], files: [file("src/components/wizard/wizard.tsx", "{components}/wizard/wizard.tsx")] },
  "wizard-kit": { name: "wizard-kit", category: "group", registryDependencies: ["stepper", "wizard"], files: [file("src/components/wizard/index.ts", "{components}/wizard/index.ts")] },

  toast: { name: "toast", category: "notifications", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/notifications/toast.tsx", "{components}/notifications/toast.tsx")] },
  notifications: { name: "notifications", category: "group", registryDependencies: ["toast"], files: [file("src/components/notifications/index.ts", "{components}/notifications/index.ts")] },

  "command-palette": { name: "command-palette", category: "command", dependencies: ["lucide-react"], registryDependencies: ["dialog", "input", "utils"], files: [file("src/components/command/command-palette.tsx", "{components}/command/command-palette.tsx")] },
  command: { name: "command", category: "group", registryDependencies: ["command-palette"], files: [file("src/components/command/index.ts", "{components}/command/index.ts")] },

  "use-session-storage-state": { name: "use-session-storage-state", category: "hooks", files: [file("src/hooks/use-session-storage-state.ts", "{hooks}/use-session-storage-state.ts")] },
  "use-before-unload-when-dirty": { name: "use-before-unload-when-dirty", category: "hooks", files: [file("src/hooks/use-before-unload-when-dirty.ts", "{hooks}/use-before-unload-when-dirty.ts")] },
  "use-is-mobile": { name: "use-is-mobile", category: "hooks", files: [file("src/hooks/use-is-mobile.ts", "{hooks}/use-is-mobile.ts")] },
  "use-disclosure": { name: "use-disclosure", category: "hooks", files: [file("src/hooks/use-disclosure.ts", "{hooks}/use-disclosure.ts")] },
  "use-debounce": { name: "use-debounce", category: "hooks", files: [file("src/hooks/use-debounce.ts", "{hooks}/use-debounce.ts")] },
  hooks: { name: "hooks", category: "group", registryDependencies: ["use-session-storage-state", "use-before-unload-when-dirty", "use-is-mobile", "use-disclosure", "use-debounce"], files: [file("src/hooks/index.ts", "{hooks}/index.ts")] },

  dashboard: { name: "dashboard", category: "group", registryDependencies: ["layout", "actions", "filters", "feedback", "data-table", "inputs", "form", "notifications", "command"] },
  all: { name: "all", category: "group", registryDependencies: ["dashboard", "overlay", "calendar-kit", "upload", "wizard-kit", "hooks"] },
};

export const registryNames = Object.keys(registry) as ComponentName[];
