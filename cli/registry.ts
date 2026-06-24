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
  | "upload"
  | "wizard"
  | "notifications"
  | "command"
  | "patterns"
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
  card: { name: "card", category: "ui", dependencies: ["class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/ui/card.tsx", "{ui}/card.tsx")] },
  skeleton: { name: "skeleton", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/skeleton.tsx", "{ui}/skeleton.tsx")] },
  tabs: { name: "tabs", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/tabs.tsx", "{ui}/tabs.tsx")] },
  dialog: { name: "dialog", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/ui/dialog.tsx", "{ui}/dialog.tsx")] },
  "dropdown-menu": { name: "dropdown-menu", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/dropdown-menu.tsx", "{ui}/dropdown-menu.tsx")] },
  popover: { name: "popover", category: "ui", dependencies: ["@base-ui/react"], registryDependencies: ["utils"], files: [file("src/components/ui/popover.tsx", "{ui}/popover.tsx")] },
  tooltip: { name: "tooltip", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/tooltip.tsx", "{ui}/tooltip.tsx")] },
  select: { name: "select", category: "ui", dependencies: ["@base-ui/react", "lucide-react"], registryDependencies: ["utils"], files: [file("src/components/ui/select.tsx", "{ui}/select.tsx")] },
  table: { name: "table", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/table.tsx", "{ui}/table.tsx")] },
  "segmented-control": { name: "segmented-control", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/segmented-control.tsx", "{ui}/segmented-control.tsx")] },
  "radio-group": { name: "radio-group", category: "ui", registryDependencies: ["button", "utils"], files: [file("src/components/ui/radio-group.tsx", "{ui}/radio-group.tsx")] },
  kbd: { name: "kbd", category: "ui", files: [file("src/components/ui/kbd.tsx", "{ui}/kbd.tsx")] },
  "hover-card": { name: "hover-card", category: "ui", registryDependencies: ["utils"], files: [file("src/components/ui/hover-card.tsx", "{ui}/hover-card.tsx")] },
  "scroll-box": { name: "scroll-box", category: "ui", files: [file("src/components/ui/scroll-box.tsx", "{ui}/scroll-box.tsx")] },
  "right-click-menu": { name: "right-click-menu", category: "ui", dependencies: ["react"], files: [file("src/components/ui/right-click-menu.tsx", "{ui}/right-click-menu.tsx")] },

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
  "app-input": { name: "app-input", category: "inputs", registryDependencies: ["input-decorator", "clearable-input", "search-input", "password-input", "number-input", "phone-input", "date-input"], files: [file("src/components/inputs/app-input.tsx", "{components}/inputs/app-input.tsx")] },
  inputs: { name: "inputs", category: "group", registryDependencies: ["app-input", "clearable-input", "search-input", "password-input", "number-input", "date-input", "date-range-input", "money-input", "quantity-input", "masked-input", "phone-input", "tag-input", "simple-select", "async-select"], files: [file("src/components/inputs/index.ts", "{components}/inputs/index.ts")] },

  "form-field-shell": { name: "form-field-shell", category: "form", registryDependencies: ["utils"], files: [file("src/components/form/form-field-shell.tsx", "{components}/form/form-field-shell.tsx")] },
  "form-field-utils": { name: "form-field-utils", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["form-field-shell"], files: [file("src/components/form/form-field-utils.ts", "{components}/form/form-field-utils.ts")] },
  "form-app-input": { name: "form-app-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["app-input", "form-field-shell", "form-field-utils"], files: [file("src/components/form/form-app-input.tsx", "{components}/form/form-app-input.tsx")] },
  "form-input": { name: "form-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["input", "search-input", "password-input", "number-input", "phone-input", "date-input", "form-field-shell"], files: [file("src/components/form/form-input.tsx", "{components}/form/form-input.tsx")] },
  "form-select": { name: "form-select", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["simple-select", "async-select", "form-field-shell"], files: [file("src/components/form/form-select.tsx", "{components}/form/form-select.tsx")] },
  "form-async-select": { name: "form-async-select", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["async-select", "form-field-shell"], files: [file("src/components/form/form-async-select.tsx", "{components}/form/form-async-select.tsx")] },
  "form-textarea": { name: "form-textarea", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["textarea", "form-field-shell"], files: [file("src/components/form/form-textarea.tsx", "{components}/form/form-textarea.tsx")] },
  "form-switch": { name: "form-switch", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["switch", "form-field-shell", "utils"], files: [file("src/components/form/form-switch.tsx", "{components}/form/form-switch.tsx")] },
  "form-search-input": { name: "form-search-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["form-app-input"], files: [file("src/components/form/form-search-input.tsx", "{components}/form/form-search-input.tsx")] },
  "form-password-input": { name: "form-password-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["password-input", "form-field-shell"], files: [file("src/components/form/form-password-input.tsx", "{components}/form/form-password-input.tsx")] },
  "form-number-input": { name: "form-number-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["form-app-input"], files: [file("src/components/form/form-number-input.tsx", "{components}/form/form-number-input.tsx")] },
  "form-phone-input": { name: "form-phone-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["form-app-input"], files: [file("src/components/form/form-phone-input.tsx", "{components}/form/form-phone-input.tsx")] },
  "form-date-input": { name: "form-date-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["form-app-input"], files: [file("src/components/form/form-date-input.tsx", "{components}/form/form-date-input.tsx")] },
  "form-date-range-input": { name: "form-date-range-input", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-range-input", "form-field-shell"], files: [file("src/components/form/form-date-range-input.tsx", "{components}/form/form-date-range-input.tsx")] },
  "form-date-picker": { name: "form-date-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-picker", "form-field-shell"], files: [file("src/components/form/form-date-picker.tsx", "{components}/form/form-date-picker.tsx")] },
  "form-date-range-picker": { name: "form-date-range-picker", category: "form", dependencies: ["react-hook-form"], registryDependencies: ["date-range-picker", "form-field-shell"], files: [file("src/components/form/form-date-range-picker.tsx", "{components}/form/form-date-range-picker.tsx")] },
  "form-actions": { name: "form-actions", category: "form", registryDependencies: ["button"], files: [file("src/components/form/form-actions.tsx", "{components}/form/form-actions.tsx")] },
  "form-section": { name: "form-section", category: "form", registryDependencies: ["utils"], files: [file("src/components/form/form-section.tsx", "{components}/form/form-section.tsx")] },
  "smart-form-shell": { name: "smart-form-shell", category: "form", registryDependencies: ["form-actions", "form-section", "utils"], files: [file("src/components/form/smart-form-shell.tsx", "{components}/form/smart-form-shell.tsx")] },
  form: { name: "form", category: "group", registryDependencies: ["form-field-shell", "form-field-utils", "form-app-input", "form-input", "form-select", "form-async-select", "form-textarea", "form-switch", "form-search-input", "form-password-input", "form-number-input", "form-phone-input", "form-date-input", "form-date-range-input", "form-date-picker", "form-date-range-picker", "form-actions", "form-section", "smart-form-shell"], files: [file("src/components/form/index.ts", "{components}/form/index.ts")] },

  "dialog-actions": { name: "dialog-actions", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["button", "dialog"], files: [file("src/components/overlay/dialog-actions.tsx", "{components}/overlay/dialog-actions.tsx")] },
  "modal-shell": { name: "modal-shell", category: "overlay", dependencies: ["@base-ui/react"], registryDependencies: ["button", "dialog"], files: [file("src/components/overlay/modal-shell.tsx", "{components}/overlay/modal-shell.tsx")] },
  "confirm-dialog": { name: "confirm-dialog", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["dialog-actions"], files: [file("src/components/overlay/confirm-dialog.tsx", "{components}/overlay/confirm-dialog.tsx")] },
  "sheet-shell": { name: "sheet-shell", category: "overlay", registryDependencies: ["dialog"], files: [file("src/components/overlay/sheet-shell.tsx", "{components}/overlay/sheet-shell.tsx")] },
  "alert-dialog": { name: "alert-dialog", category: "overlay", dependencies: ["lucide-react"], registryDependencies: ["dialog", "button"], files: [file("src/components/overlay/alert-dialog.tsx", "{components}/overlay/alert-dialog.tsx")] },
  drawer: { name: "drawer", category: "overlay", dependencies: ["@base-ui/react"], registryDependencies: ["dialog"], files: [file("src/components/overlay/drawer.tsx", "{components}/overlay/drawer.tsx")] },

  "empty-state": { name: "empty-state", category: "feedback", dependencies: ["lucide-react"], registryDependencies: ["button", "utils"], files: [file("src/components/feedback/empty-state.tsx", "{components}/feedback/empty-state.tsx")] },
  "loading-state": { name: "loading-state", category: "feedback", dependencies: ["lucide-react"], registryDependencies: ["utils"], files: [file("src/components/feedback/loading-state.tsx", "{components}/feedback/loading-state.tsx")] },
  "status-badge": { name: "status-badge", category: "feedback", registryDependencies: ["badge", "utils"], files: [file("src/components/feedback/status-badge.tsx", "{components}/feedback/status-badge.tsx")] },
  "page-state": { name: "page-state", category: "feedback", registryDependencies: ["button", "utils"], files: [file("src/components/feedback/page-state.tsx", "{components}/feedback/page-state.tsx")] },
  feedback: { name: "feedback", category: "group", registryDependencies: ["empty-state", "loading-state", "status-badge", "page-state"], files: [file("src/components/feedback/index.ts", "{components}/feedback/index.ts")] },

  "page-header": { name: "page-header", category: "layout", dependencies: ["class-variance-authority"], registryDependencies: ["utils"], files: [file("src/components/layout/page-header.tsx", "{components}/layout/page-header.tsx")] },
  "stat-card": { name: "stat-card", category: "layout", registryDependencies: ["card", "badge", "utils"], files: [file("src/components/layout/stat-card.tsx", "{components}/layout/stat-card.tsx")] },
  layout: { name: "layout", category: "group", registryDependencies: ["page-header", "stat-card"], files: [file("src/components/layout/index.ts", "{components}/layout/index.ts")] },

  "metric-card": { name: "metric-card", category: "display", registryDependencies: ["card"], files: [file("src/components/display/metric-card.tsx", "{components}/display/metric-card.tsx")] },
  calendar: { name: "calendar", category: "calendar", files: [file("src/components/calendar/calendar.tsx", "{components}/calendar/calendar.tsx"), file("src/components/calendar/date-utils.ts", "{components}/calendar/date-utils.ts")] },
  "date-picker": { name: "date-picker", category: "calendar", registryDependencies: ["calendar"], files: [file("src/components/calendar/date-picker.tsx", "{components}/calendar/date-picker.tsx")] },
  "date-range-picker": { name: "date-range-picker", category: "calendar", registryDependencies: ["calendar"], files: [file("src/components/calendar/date-range-picker.tsx", "{components}/calendar/date-range-picker.tsx")] },

  dashboard: { name: "dashboard", category: "group", registryDependencies: ["layout", "feedback", "inputs", "form"] },
  all: { name: "all", category: "group", registryDependencies: ["dashboard"] },
};

export const registryNames = Object.keys(registry) as ComponentName[];
