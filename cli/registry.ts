export type ComponentName =
  | "utils"
  | "button"
  | "input"
  | "textarea"
  | "switch"
  | "badge"
  | "card"
  | "dialog"
  | "dropdown-menu"
  | "popover"
  | "select"
  | "table"
  | "modal-shell"
  | "sheet-shell"
  | "confirm-dialog"
  | "dialog-actions"
  | "pagination"
  | "simple-select"
  | "async-select"
  | "money-input"
  | "quantity-input"
  | "form-field-shell"
  | "form-input"
  | "form-select"
  | "form-async-select"
  | "form-textarea"
  | "form-switch"
  | "empty-state"
  | "loading-state"
  | "status-badge"
  | "data-table"
  | "data-table-pagination"
  | "data-table-toolbar"
  | "overlay"
  | "inputs"
  | "form"
  | "feedback";

export type RegistryFile = {
  source: string;
  target: string;
};

export type ComponentRegistryItem = {
  name: ComponentName;
  category: "lib" | "ui" | "overlay" | "navigation" | "inputs" | "form" | "feedback" | "data-table" | "group";
  description?: string;
  dependencies?: string[];
  registryDependencies?: ComponentName[];
  files?: RegistryFile[];
};

export const registry: Record<ComponentName, ComponentRegistryItem> = {
  utils: {
    name: "utils",
    category: "lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [{ source: "src/lib/utils.ts", target: "{utils}" }],
  },

  button: {
    name: "button",
    category: "ui",
    dependencies: ["@base-ui/react", "class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/button.tsx", target: "{ui}/button.tsx" }],
  },
  input: {
    name: "input",
    category: "ui",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/input.tsx", target: "{ui}/input.tsx" }],
  },
  textarea: {
    name: "textarea",
    category: "ui",
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/textarea.tsx", target: "{ui}/textarea.tsx" }],
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
    dependencies: ["@base-ui/react", "class-variance-authority"],
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
    dependencies: ["@base-ui/react", "lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [{ source: "src/components/ui/dialog.tsx", target: "{ui}/dialog.tsx" }],
  },
  "dropdown-menu": {
    name: "dropdown-menu",
    category: "ui",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/dropdown-menu.tsx", target: "{ui}/dropdown-menu.tsx" }],
  },
  popover: {
    name: "popover",
    category: "ui",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["utils"],
    files: [{ source: "src/components/ui/popover.tsx", target: "{ui}/popover.tsx" }],
  },
  select: {
    name: "select",
    category: "ui",
    dependencies: ["@base-ui/react", "lucide-react"],
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
    dependencies: ["@base-ui/react", "lucide-react"],
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
    registryDependencies: ["simple-select", "async-select", "money-input", "quantity-input"],
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
  form: {
    name: "form",
    category: "group",
    registryDependencies: ["form-field-shell", "form-input", "form-select", "form-async-select", "form-textarea", "form-switch"],
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
  "data-table": {
    name: "data-table",
    category: "data-table",
    dependencies: ["@tanstack/react-table"],
    registryDependencies: ["table", "empty-state", "loading-state", "data-table-toolbar", "data-table-pagination", "utils"],
    files: [
      { source: "src/components/data-table/data-table.tsx", target: "{components}/data-table/data-table.tsx" },
      { source: "src/components/data-table/index.ts", target: "{components}/data-table/index.ts" },
    ],
  },
};

export const registryNames = Object.keys(registry) as ComponentName[];
