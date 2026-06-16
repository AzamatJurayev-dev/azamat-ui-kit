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
  | "masked-input"
  | "phone-input"
  | "simple-select"
  | "async-select"
  | "money-input"
  | "quantity-input"
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
  | "data-table-toolbar"
  | "data-table-pagination"
  | "data-table-column-visibility-menu"
  | "data-table-select-column"
  | "data-table-sortable-header"
  | "data-table-row-actions"
  | "data-table-actions-column"
  | "data-table-bulk-actions"
  | "data-table"
  | "action-menu"
  | "actions"
  | "filter-bar"
  | "filters"
  | "page-header"
  | "stat-card"
  | "app-shell"
  | "app-header"
  | "app-sidebar"
  | "sidebar-nav"
  | "breadcrumbs"
  | "page-container"
  | "layout"
  | "toast"
  | "notifications"
  | "command-palette"
  | "command"
  | "calendar"
  | "date-picker"
  | "date-range-picker"
  | "calendar-suite"
  | "file-upload"
  | "image-upload"
  | "upload"
  | "stepper"
  | "wizard"
  | "wizard-suite"
  | "use-session-storage-state"
  | "use-before-unload-when-dirty"
  | "use-is-mobile"
  | "use-disclosure"
  | "use-debounce"
  | "hooks"
  | "dashboard"
  | "recommended";

export type RegistryFile = {
  source: string;
  target: string;
};

export type ComponentCategory =
  | "lib"
  | "ui"
  | "overlay"
  | "navigation"
  | "inputs"
  | "form"
  | "feedback"
  | "data-table"
  | "actions"
  | "filters"
  | "layout"
  | "notifications"
  | "command"
  | "calendar"
  | "upload"
  | "wizard"
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

const baseUiDependency = "@base-ui/react";

export const registry: Record<ComponentName, ComponentRegistryItem> = {
  utils: {
    name: "utils",
    category: "lib",
    description: "Shared cn utility.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [{ source: "src/lib/utils.ts", target: "{utils}" }],
  },

  button: {
    name: "button",
    category: "ui",
    dependencies: [baseUiDependency, "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/button.tsx", target: "{ui}/button.tsx" }],
  },
  input: {
    name: "input",
    category: "ui",
    dependencies: [baseUiDependency],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/input.tsx", target: "{ui}/input.tsx" }],
  },
  textarea: {
    name: "textarea",
    category: "ui",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/textarea.tsx", target: "{ui}/textarea.tsx" }],
  },
  checkbox: {
    name: "checkbox",
    category: "ui",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/checkbox.tsx", target: "{ui}/checkbox.tsx" }],
  },
  switch: {
    name: "switch",
    category: "ui",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/switch.tsx", target: "{ui}/switch.tsx" }],
  },
  badge: {
    name: "badge",
    category: "ui",
    dependencies: [baseUiDependency, "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/badge.tsx", target: "{ui}/badge.tsx" }],
  },
  card: {
    name: "card",
    category: "ui",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/card.tsx", target: "{ui}/card.tsx" }],
  },
  dialog: {
    name: "dialog",
    category: "ui",
    dependencies: [baseUiDependency, "lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/ui/dialog.tsx", target: "{ui}/dialog.tsx" }],
  },
  "dropdown-menu": {
    name: "dropdown-menu",
    category: "ui",
    dependencies: [baseUiDependency, "lucide-react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/dropdown-menu.tsx", target: "{ui}/dropdown-menu.tsx" }],
  },
  popover: {
    name: "popover",
    category: "ui",
    dependencies: [baseUiDependency],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/popover.tsx", target: "{ui}/popover.tsx" }],
  },
  select: {
    name: "select",
    category: "ui",
    dependencies: [baseUiDependency, "lucide-react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/select.tsx", target: "{ui}/select.tsx" }],
  },
  table: {
    name: "table",
    category: "ui",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/table.tsx", target: "{ui}/table.tsx" }],
  },

  "dialog-actions": {
    name: "dialog-actions",
    category: "overlay",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/overlay/dialog-actions.tsx", target: "{components}/overlay/dialog-actions.tsx" }],
  },
  "modal-shell": {
    name: "modal-shell",
    category: "overlay",
    registryDependencies: ["dialog", "utils"],
    files: [{ source: "src/components/overlay/modal-shell.tsx", target: "{components}/overlay/modal-shell.tsx" }],
  },
  "confirm-dialog": {
    name: "confirm-dialog",
    category: "overlay",
    registryDependencies: ["modal-shell", "dialog-actions"],
    files: [{ source: "src/components/overlay/confirm-dialog.tsx", target: "{components}/overlay/confirm-dialog.tsx" }],
  },
  "sheet-shell": {
    name: "sheet-shell",
    category: "overlay",
    dependencies: [baseUiDependency, "lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/overlay/sheet-shell.tsx", target: "{components}/overlay/sheet-shell.tsx" }],
  },
  overlay: {
    name: "overlay",
    category: "group",
    registryDependencies: ["dialog-actions", "modal-shell", "confirm-dialog", "sheet-shell"],
    files: [{ source: "src/components/overlay/index.ts", target: "{components}/overlay/index.ts" }],
  },

  pagination: {
    name: "pagination",
    category: "navigation",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/navigation/pagination.tsx", target: "{components}/navigation/pagination.tsx" }],
  },

  "clearable-input": {
    name: "clearable-input",
    category: "inputs",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "utils"],
    files: [{ source: "src/components/inputs/clearable-input.tsx", target: "{components}/inputs/clearable-input.tsx" }],
  },
  "search-input": {
    name: "search-input",
    category: "inputs",
    dependencies: ["lucide-react"],
    registryDependencies: ["clearable-input"],
    files: [{ source: "src/components/inputs/search-input.tsx", target: "{components}/inputs/search-input.tsx" }],
  },
  "password-input": {
    name: "password-input",
    category: "inputs",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "utils"],
    files: [{ source: "src/components/inputs/password-input.tsx", target: "{components}/inputs/password-input.tsx" }],
  },
  "number-input": {
    name: "number-input",
    category: "inputs",
    registryDependencies: ["input"],
    files: [{ source: "src/components/inputs/number-input.tsx", target: "{components}/inputs/number-input.tsx" }],
  },
  "date-input": {
    name: "date-input",
    category: "inputs",
    registryDependencies: ["input"],
    files: [{ source: "src/components/inputs/date-input.tsx", target: "{components}/inputs/date-input.tsx" }],
  },
  "date-range-input": {
    name: "date-range-input",
    category: "inputs",
    registryDependencies: ["date-input", "utils"],
    files: [{ source: "src/components/inputs/date-range-input.tsx", target: "{components}/inputs/date-range-input.tsx" }],
  },
  "masked-input": {
    name: "masked-input",
    category: "inputs",
    registryDependencies: ["input"],
    files: [{ source: "src/components/inputs/masked-input.tsx", target: "{components}/inputs/masked-input.tsx" }],
  },
  "phone-input": {
    name: "phone-input",
    category: "inputs",
    registryDependencies: ["masked-input"],
    files: [{ source: "src/components/inputs/phone-input.tsx", target: "{components}/inputs/phone-input.tsx" }],
  },
  "simple-select": {
    name: "simple-select",
    category: "inputs",
    registryDependencies: ["select", "utils"],
    files: [{ source: "src/components/inputs/simple-select.tsx", target: "{components}/inputs/simple-select.tsx" }],
  },
  "async-select": {
    name: "async-select",
    category: "inputs",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "popover", "utils"],
    files: [{ source: "src/components/inputs/async-select.tsx", target: "{components}/inputs/async-select.tsx" }],
  },
  "money-input": {
    name: "money-input",
    category: "inputs",
    registryDependencies: ["input", "utils"],
    files: [{ source: "src/components/inputs/money-input.tsx", target: "{components}/inputs/money-input.tsx" }],
  },
  "quantity-input": {
    name: "quantity-input",
    category: "inputs",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "utils"],
    files: [{ source: "src/components/inputs/quantity-input.tsx", target: "{components}/inputs/quantity-input.tsx" }],
  },
  inputs: {
    name: "inputs",
    category: "group",
    registryDependencies: [
      "clearable-input",
      "search-input",
      "password-input",
      "number-input",
      "date-input",
      "date-range-input",
      "masked-input",
      "phone-input",
      "simple-select",
      "async-select",
      "money-input",
      "quantity-input",
    ],
    files: [{ source: "src/components/inputs/index.ts", target: "{components}/inputs/index.ts" }],
  },

  "form-field-shell": {
    name: "form-field-shell",
    category: "form",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/form/form-field-shell.tsx", target: "{components}/form/form-field-shell.tsx" }],
  },
  "form-input": {
    name: "form-input",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["input", "form-field-shell"],
    files: [{ source: "src/components/form/form-input.tsx", target: "{components}/form/form-input.tsx" }],
  },
  "form-select": {
    name: "form-select",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["simple-select", "form-field-shell"],
    files: [{ source: "src/components/form/form-select.tsx", target: "{components}/form/form-select.tsx" }],
  },
  "form-async-select": {
    name: "form-async-select",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["async-select", "form-field-shell"],
    files: [{ source: "src/components/form/form-async-select.tsx", target: "{components}/form/form-async-select.tsx" }],
  },
  "form-textarea": {
    name: "form-textarea",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["textarea", "form-field-shell"],
    files: [{ source: "src/components/form/form-textarea.tsx", target: "{components}/form/form-textarea.tsx" }],
  },
  "form-switch": {
    name: "form-switch",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["switch", "form-field-shell", "utils"],
    files: [{ source: "src/components/form/form-switch.tsx", target: "{components}/form/form-switch.tsx" }],
  },
  "form-search-input": {
    name: "form-search-input",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["search-input", "form-field-shell"],
    files: [{ source: "src/components/form/form-search-input.tsx", target: "{components}/form/form-search-input.tsx" }],
  },
  "form-password-input": {
    name: "form-password-input",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["password-input", "form-field-shell"],
    files: [{ source: "src/components/form/form-password-input.tsx", target: "{components}/form/form-password-input.tsx" }],
  },
  "form-number-input": {
    name: "form-number-input",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["number-input", "form-field-shell"],
    files: [{ source: "src/components/form/form-number-input.tsx", target: "{components}/form/form-number-input.tsx" }],
  },
  "form-phone-input": {
    name: "form-phone-input",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["phone-input", "form-field-shell"],
    files: [{ source: "src/components/form/form-phone-input.tsx", target: "{components}/form/form-phone-input.tsx" }],
  },
  "form-date-input": {
    name: "form-date-input",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["date-input", "form-field-shell"],
    files: [{ source: "src/components/form/form-date-input.tsx", target: "{components}/form/form-date-input.tsx" }],
  },
  "form-date-range-input": {
    name: "form-date-range-input",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["date-range-input", "form-field-shell"],
    files: [{ source: "src/components/form/form-date-range-input.tsx", target: "{components}/form/form-date-range-input.tsx" }],
  },
  "form-date-picker": {
    name: "form-date-picker",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["date-picker", "form-field-shell"],
    files: [{ source: "src/components/form/form-date-picker.tsx", target: "{components}/form/form-date-picker.tsx" }],
  },
  "form-date-range-picker": {
    name: "form-date-range-picker",
    category: "form",
    dependencies: ["react-hook-form"],
    registryDependencies: ["date-range-picker", "form-field-shell"],
    files: [{ source: "src/components/form/form-date-range-picker.tsx", target: "{components}/form/form-date-range-picker.tsx" }],
  },
  form: {
    name: "form",
    category: "group",
    registryDependencies: [
      "form-field-shell",
      "form-input",
      "form-select",
      "form-async-select",
      "form-textarea",
      "form-switch",
      "form-search-input",
      "form-password-input",
      "form-number-input",
      "form-phone-input",
      "form-date-input",
      "form-date-range-input",
    ],
    files: [{ source: "src/components/form/index.ts", target: "{components}/form/index.ts" }],
  },

  "empty-state": {
    name: "empty-state",
    category: "feedback",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/feedback/empty-state.tsx", target: "{components}/feedback/empty-state.tsx" }],
  },
  "loading-state": {
    name: "loading-state",
    category: "feedback",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/feedback/loading-state.tsx", target: "{components}/feedback/loading-state.tsx" }],
  },
  "status-badge": {
    name: "status-badge",
    category: "feedback",
    registryDependencies: ["badge", "utils"],
    files: [{ source: "src/components/feedback/status-badge.tsx", target: "{components}/feedback/status-badge.tsx" }],
  },
  feedback: {
    name: "feedback",
    category: "group",
    registryDependencies: ["empty-state", "loading-state", "status-badge"],
    files: [{ source: "src/components/feedback/index.ts", target: "{components}/feedback/index.ts" }],
  },

  "action-menu": {
    name: "action-menu",
    category: "actions",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "dropdown-menu", "utils"],
    files: [{ source: "src/components/actions/action-menu.tsx", target: "{components}/actions/action-menu.tsx" }],
  },
  actions: {
    name: "actions",
    category: "group",
    registryDependencies: ["action-menu"],
    files: [{ source: "src/components/actions/index.ts", target: "{components}/actions/index.ts" }],
  },
  "filter-bar": {
    name: "filter-bar",
    category: "filters",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/filters/filter-bar.tsx", target: "{components}/filters/filter-bar.tsx" }],
  },
  filters: {
    name: "filters",
    category: "group",
    registryDependencies: ["filter-bar"],
    files: [{ source: "src/components/filters/index.ts", target: "{components}/filters/index.ts" }],
  },

  "data-table-toolbar": {
    name: "data-table-toolbar",
    category: "data-table",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/data-table/data-table-toolbar.tsx", target: "{components}/data-table/data-table-toolbar.tsx" }],
  },
  "data-table-pagination": {
    name: "data-table-pagination",
    category: "data-table",
    registryDependencies: ["pagination", "simple-select", "utils"],
    files: [{ source: "src/components/data-table/data-table-pagination.tsx", target: "{components}/data-table/data-table-pagination.tsx" }],
  },
  "data-table-column-visibility-menu": {
    name: "data-table-column-visibility-menu",
    category: "data-table",
    dependencies: ["@tanstack/react-table", "lucide-react"],
    registryDependencies: ["button", "dropdown-menu", "utils"],
    files: [{ source: "src/components/data-table/data-table-column-visibility-menu.tsx", target: "{components}/data-table/data-table-column-visibility-menu.tsx" }],
  },
  "data-table-select-column": {
    name: "data-table-select-column",
    category: "data-table",
    dependencies: ["@tanstack/react-table"],
    registryDependencies: ["checkbox", "utils"],
    files: [{ source: "src/components/data-table/data-table-select-column.tsx", target: "{components}/data-table/data-table-select-column.tsx" }],
  },
  "data-table-sortable-header": {
    name: "data-table-sortable-header",
    category: "data-table",
    dependencies: ["@tanstack/react-table", "lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/data-table/data-table-sortable-header.tsx", target: "{components}/data-table/data-table-sortable-header.tsx" }],
  },
  "data-table-row-actions": {
    name: "data-table-row-actions",
    category: "data-table",
    dependencies: ["@tanstack/react-table"],
    registryDependencies: ["action-menu"],
    files: [{ source: "src/components/data-table/data-table-row-actions.tsx", target: "{components}/data-table/data-table-row-actions.tsx" }],
  },
  "data-table-actions-column": {
    name: "data-table-actions-column",
    category: "data-table",
    dependencies: ["@tanstack/react-table"],
    registryDependencies: ["data-table-row-actions", "utils"],
    files: [{ source: "src/components/data-table/data-table-actions-column.tsx", target: "{components}/data-table/data-table-actions-column.tsx" }],
  },
  "data-table-bulk-actions": {
    name: "data-table-bulk-actions",
    category: "data-table",
    dependencies: ["lucide-react"],
    registryDependencies: ["action-menu", "button", "utils"],
    files: [{ source: "src/components/data-table/data-table-bulk-actions.tsx", target: "{components}/data-table/data-table-bulk-actions.tsx" }],
  },
  "data-table": {
    name: "data-table",
    category: "data-table",
    dependencies: ["@tanstack/react-table"],
    registryDependencies: [
      "table",
      "empty-state",
      "loading-state",
      "data-table-toolbar",
      "data-table-pagination",
      "data-table-column-visibility-menu",
      "data-table-select-column",
      "data-table-sortable-header",
      "data-table-row-actions",
      "data-table-actions-column",
      "data-table-bulk-actions",
      "utils",
    ],
    files: [
      { source: "src/components/data-table/data-table.tsx", target: "{components}/data-table/data-table.tsx" },
      { source: "src/components/data-table/index.ts", target: "{components}/data-table/index.ts" },
    ],
  },

  "page-header": {
    name: "page-header",
    category: "layout",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/layout/page-header.tsx", target: "{components}/layout/page-header.tsx" }],
  },
  "stat-card": {
    name: "stat-card",
    category: "layout",
    registryDependencies: ["card", "utils"],
    files: [{ source: "src/components/layout/stat-card.tsx", target: "{components}/layout/stat-card.tsx" }],
  },
  "app-shell": {
    name: "app-shell",
    category: "layout",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/layout/app-shell.tsx", target: "{components}/layout/app-shell.tsx" }],
  },
  "app-header": {
    name: "app-header",
    category: "layout",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/layout/app-header.tsx", target: "{components}/layout/app-header.tsx" }],
  },
  "app-sidebar": {
    name: "app-sidebar",
    category: "layout",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/layout/app-sidebar.tsx", target: "{components}/layout/app-sidebar.tsx" }],
  },
  "sidebar-nav": {
    name: "sidebar-nav",
    category: "layout",
    registryDependencies: ["badge", "utils"],
    files: [{ source: "src/components/layout/sidebar-nav.tsx", target: "{components}/layout/sidebar-nav.tsx" }],
  },
  breadcrumbs: {
    name: "breadcrumbs",
    category: "layout",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/layout/breadcrumbs.tsx", target: "{components}/layout/breadcrumbs.tsx" }],
  },
  "page-container": {
    name: "page-container",
    category: "layout",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/layout/page-container.tsx", target: "{components}/layout/page-container.tsx" }],
  },
  layout: {
    name: "layout",
    category: "group",
    registryDependencies: ["app-shell", "app-header", "app-sidebar", "page-header", "stat-card", "sidebar-nav", "breadcrumbs", "page-container"],
    files: [{ source: "src/components/layout/index.ts", target: "{components}/layout/index.ts" }],
  },
  dashboard: {
    name: "dashboard",
    category: "group",
    registryDependencies: ["layout", "actions", "filters", "feedback", "data-table"],
  },

  toast: {
    name: "toast",
    category: "notifications",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/notifications/toast.tsx", target: "{components}/notifications/toast.tsx" }],
  },
  notifications: {
    name: "notifications",
    category: "group",
    registryDependencies: ["toast"],
    files: [{ source: "src/components/notifications/index.ts", target: "{components}/notifications/index.ts" }],
  },
  "command-palette": {
    name: "command-palette",
    category: "command",
    dependencies: ["lucide-react"],
    registryDependencies: ["dialog", "input", "utils"],
    files: [{ source: "src/components/command/command-palette.tsx", target: "{components}/command/command-palette.tsx" }],
  },
  command: {
    name: "command",
    category: "group",
    registryDependencies: ["command-palette"],
    files: [{ source: "src/components/command/index.ts", target: "{components}/command/index.ts" }],
  },

  calendar: {
    name: "calendar",
    category: "calendar",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [
      { source: "src/components/calendar/date-utils.ts", target: "{components}/calendar/date-utils.ts" },
      { source: "src/components/calendar/calendar.tsx", target: "{components}/calendar/calendar.tsx" },
    ],
  },
  "date-picker": {
    name: "date-picker",
    category: "calendar",
    dependencies: ["lucide-react"],
    registryDependencies: ["calendar", "popover", "button", "utils"],
    files: [{ source: "src/components/calendar/date-picker.tsx", target: "{components}/calendar/date-picker.tsx" }],
  },
  "date-range-picker": {
    name: "date-range-picker",
    category: "calendar",
    dependencies: ["lucide-react"],
    registryDependencies: ["calendar", "popover", "button", "utils"],
    files: [{ source: "src/components/calendar/date-range-picker.tsx", target: "{components}/calendar/date-range-picker.tsx" }],
  },
  "calendar-suite": {
    name: "calendar-suite",
    category: "group",
    registryDependencies: ["calendar", "date-picker", "date-range-picker"],
    files: [{ source: "src/components/calendar/index.ts", target: "{components}/calendar/index.ts" }],
  },

  "file-upload": {
    name: "file-upload",
    category: "upload",
    registryDependencies: ["button"],
    files: [{ source: "src/components/upload/file-upload.tsx", target: "{components}/upload/file-upload.tsx" }],
  },
  "image-upload": {
    name: "image-upload",
    category: "upload",
    registryDependencies: ["file-upload"],
    files: [{ source: "src/components/upload/image-upload.tsx", target: "{components}/upload/image-upload.tsx" }],
  },
  upload: {
    name: "upload",
    category: "group",
    registryDependencies: ["file-upload", "image-upload"],
    files: [{ source: "src/components/upload/index.ts", target: "{components}/upload/index.ts" }],
  },

  stepper: {
    name: "stepper",
    category: "wizard",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/wizard/stepper.tsx", target: "{components}/wizard/stepper.tsx" }],
  },
  wizard: {
    name: "wizard",
    category: "wizard",
    registryDependencies: ["button", "stepper", "utils"],
    files: [{ source: "src/components/wizard/wizard.tsx", target: "{components}/wizard/wizard.tsx" }],
  },
  "wizard-suite": {
    name: "wizard-suite",
    category: "group",
    registryDependencies: ["stepper", "wizard"],
    files: [{ source: "src/components/wizard/index.ts", target: "{components}/wizard/index.ts" }],
  },

  "use-session-storage-state": {
    name: "use-session-storage-state",
    category: "hooks",
    files: [{ source: "src/hooks/use-session-storage-state.ts", target: "{hooks}/use-session-storage-state.ts" }],
  },
  "use-before-unload-when-dirty": {
    name: "use-before-unload-when-dirty",
    category: "hooks",
    files: [{ source: "src/hooks/use-before-unload-when-dirty.ts", target: "{hooks}/use-before-unload-when-dirty.ts" }],
  },
  "use-is-mobile": {
    name: "use-is-mobile",
    category: "hooks",
    files: [{ source: "src/hooks/use-is-mobile.ts", target: "{hooks}/use-is-mobile.ts" }],
  },
  "use-disclosure": {
    name: "use-disclosure",
    category: "hooks",
    files: [{ source: "src/hooks/use-disclosure.ts", target: "{hooks}/use-disclosure.ts" }],
  },
  "use-debounce": {
    name: "use-debounce",
    category: "hooks",
    files: [{ source: "src/hooks/use-debounce.ts", target: "{hooks}/use-debounce.ts" }],
  },
  hooks: {
    name: "hooks",
    category: "group",
    registryDependencies: ["use-session-storage-state", "use-before-unload-when-dirty", "use-is-mobile", "use-disclosure", "use-debounce"],
    files: [{ source: "src/hooks/index.ts", target: "{hooks}/index.ts" }],
  },

  recommended: {
    name: "recommended",
    category: "group",
    registryDependencies: ["dashboard", "form", "inputs", "notifications", "command", "calendar-suite", "upload", "wizard-suite", "hooks"],
  },
};

export const registryNames = Object.keys(registry) as ComponentName[];
