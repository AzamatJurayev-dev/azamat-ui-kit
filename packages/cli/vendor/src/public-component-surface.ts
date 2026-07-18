export type PublicComponentSurfaceEntry = {
  slug: string
  registryName: string
  surface: "documented" | "standalone"
}

export const documentedPublicComponentSurfaces: readonly PublicComponentSurfaceEntry[] = [
  { slug: "button", registryName: "button", surface: "documented" },
  { slug: "input", registryName: "input", surface: "documented" },
  { slug: "textarea", registryName: "textarea", surface: "documented" },
  { slug: "select", registryName: "select", surface: "documented" },
  { slug: "combobox", registryName: "combobox", surface: "documented" },
  { slug: "async-select", registryName: "async-select", surface: "documented" },
  { slug: "card", registryName: "card", surface: "documented" },
  { slug: "badge", registryName: "badge", surface: "documented" },
  { slug: "checkbox", registryName: "checkbox", surface: "documented" },
  { slug: "switch", registryName: "switch", surface: "documented" },
  { slug: "radio-group", registryName: "radio-group", surface: "documented" },
  { slug: "overlay", registryName: "dialog", surface: "documented" },
  { slug: "dropdown-menu", registryName: "dropdown-menu", surface: "documented" },
  { slug: "popover", registryName: "popover", surface: "documented" },
  { slug: "tooltip", registryName: "tooltip", surface: "documented" },
  { slug: "data-table", registryName: "data-table", surface: "documented" },
  { slug: "pagination", registryName: "pagination", surface: "documented" },
  { slug: "calendar", registryName: "calendar", surface: "documented" },
  { slug: "date-picker", registryName: "date-picker", surface: "documented" },
  { slug: "date-range-picker", registryName: "date-range-picker", surface: "documented" },
  { slug: "alert", registryName: "alert", surface: "documented" },
  { slug: "toast", registryName: "toast", surface: "documented" },
  { slug: "notification-center", registryName: "notification-center", surface: "documented" },
  { slug: "bar-chart", registryName: "charts", surface: "documented" },
  { slug: "sidebar", registryName: "sidebar", surface: "documented" },
  { slug: "breadcrumbs", registryName: "breadcrumbs", surface: "documented" },
  { slug: "workspace-layout", registryName: "workspace-layout", surface: "documented" },
  { slug: "state-view", registryName: "state-view", surface: "documented" },
  { slug: "file-upload", registryName: "file-upload", surface: "documented" },
  { slug: "progress", registryName: "progress", surface: "documented" },
  { slug: "accordion", registryName: "accordion", surface: "documented" },
  { slug: "divider", registryName: "divider", surface: "documented" },
  { slug: "segmented-control", registryName: "segmented-control", surface: "documented" },
  { slug: "skeleton", registryName: "skeleton", surface: "documented" },
  { slug: "spinner", registryName: "spinner", surface: "documented" },
  { slug: "command-palette", registryName: "command-palette", surface: "documented" },
  { slug: "inline-editable", registryName: "inline-editable", surface: "documented" },
  { slug: "avatar", registryName: "avatar", surface: "documented" },
  { slug: "code-block", registryName: "code-block", surface: "documented" },
  { slug: "data-state", registryName: "data-state", surface: "documented" },
  { slug: "kanban", registryName: "kanban", surface: "documented" },
  { slug: "chat", registryName: "chat", surface: "documented" },
  { slug: "list", registryName: "list", surface: "documented" },
  { slug: "description-list", registryName: "description-list", surface: "documented" },
  { slug: "statistic", registryName: "statistic", surface: "documented" },
  { slug: "tree-view", registryName: "tree-view", surface: "documented" },
  { slug: "copy-button", registryName: "copy-button", surface: "documented" },
  { slug: "section", registryName: "section", surface: "documented" },
  { slug: "empty-state", registryName: "empty-state", surface: "documented" },
  { slug: "calendar-scheduler", registryName: "calendar-scheduler", surface: "documented" },
  { slug: "dual-list-picker", registryName: "dual-list-picker", surface: "documented" },
  { slug: "resizable-panel", registryName: "resizable-panel", surface: "documented" },
  { slug: "tag", registryName: "tag", surface: "documented" },
  { slug: "carousel", registryName: "carousel", surface: "documented" },
  { slug: "typography", registryName: "typography", surface: "documented" },
  { slug: "json-input", registryName: "json-input", surface: "documented" },
  { slug: "time-picker", registryName: "time-picker", surface: "documented" },
  { slug: "sortable-list", registryName: "sortable-list", surface: "documented" },
  { slug: "virtual-list", registryName: "virtual-list", surface: "documented" },
  { slug: "color-picker", registryName: "color-picker", surface: "documented" },
  { slug: "signature-pad", registryName: "signature-pad", surface: "documented" },
  { slug: "qr-code", registryName: "qr-code", surface: "documented" },
  { slug: "rich-text-editor", registryName: "rich-text-editor", surface: "documented" },
  { slug: "image-cropper", registryName: "image-cropper", surface: "documented" },
] as const

export const standalonePublicComponentSurfaces: readonly PublicComponentSurfaceEntry[] = [
  { slug: "form-builder", registryName: "form-builder", surface: "standalone" },
  { slug: "page-toolbar", registryName: "page-toolbar", surface: "standalone" },
  { slug: "bulk-action-bar", registryName: "bulk-action-bar", surface: "standalone" },
  { slug: "detail-layout", registryName: "detail-layout", surface: "standalone" },
  { slug: "settings-page", registryName: "settings-page", surface: "standalone" },
  { slug: "data-view", registryName: "data-view", surface: "standalone" },
  { slug: "resource-page", registryName: "resource-page", surface: "standalone" },
  { slug: "resource-detail-page", registryName: "resource-detail-page", surface: "standalone" },
] as const

export const publicComponentSurfaceEntries = [
  ...documentedPublicComponentSurfaces,
  ...standalonePublicComponentSurfaces,
] as const

const publicComponentSurfaceOrder = new Map(
  publicComponentSurfaceEntries.map((entry, index) => [entry.slug, index] as const)
)

const publicComponentSurfaceRegistryMap = new Map(
  publicComponentSurfaceEntries.map((entry) => [entry.slug, entry.registryName] as const)
)

export const publicComponentSurfaceSlugs = publicComponentSurfaceEntries.map((entry) => entry.slug)
export const publicComponentSurfaceSlugSet = new Set(publicComponentSurfaceSlugs)
export const standalonePublicComponentSlugs = standalonePublicComponentSurfaces.map((entry) => entry.slug)
export const documentedPublicRegistrySurfaceNames = documentedPublicComponentSurfaces.map((entry) => entry.registryName)
export const standalonePublicRegistrySurfaceNames = standalonePublicComponentSurfaces.map((entry) => entry.registryName)
export const publicRegistrySurfaceNames = publicComponentSurfaceEntries.map((entry) => entry.registryName)

export function getPublicComponentSurfaceOrder(slug: string) {
  return publicComponentSurfaceOrder.get(slug) ?? Number.MAX_SAFE_INTEGER
}

export function isPublicComponentSurfaceSlug(slug: string) {
  return publicComponentSurfaceSlugSet.has(slug)
}

export function getPublicComponentRegistryName(slug: string) {
  return publicComponentSurfaceRegistryMap.get(slug)
}

export function comparePublicComponentSurfaceOrder(leftSlug: string, rightSlug: string) {
  return getPublicComponentSurfaceOrder(leftSlug) - getPublicComponentSurfaceOrder(rightSlug)
}
