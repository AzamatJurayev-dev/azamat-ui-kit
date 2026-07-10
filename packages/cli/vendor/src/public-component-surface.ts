export type PublicComponentSurfaceEntry = {
  slug: string
  registryName: string
  surface: "documented" | "standalone"
}

export const documentedPublicComponentSurfaces: readonly PublicComponentSurfaceEntry[] = [
  { slug: "button", registryName: "button", surface: "documented" },
  { slug: "input", registryName: "input", surface: "documented" },
  { slug: "select", registryName: "select", surface: "documented" },
  { slug: "card", registryName: "card", surface: "documented" },
  { slug: "badge", registryName: "badge", surface: "documented" },
  { slug: "checkbox", registryName: "checkbox", surface: "documented" },
  { slug: "overlay", registryName: "dialog", surface: "documented" },
  { slug: "data-table", registryName: "data-table", surface: "documented" },
  { slug: "calendar", registryName: "calendar", surface: "documented" },
  { slug: "date-picker", registryName: "date-picker", surface: "documented" },
  { slug: "date-range-picker", registryName: "date-range-picker", surface: "documented" },
  { slug: "alert", registryName: "alert", surface: "documented" },
  { slug: "bar-chart", registryName: "charts", surface: "documented" },
  { slug: "sidebar", registryName: "sidebar", surface: "documented" },
  { slug: "file-upload", registryName: "file-upload", surface: "documented" },
  { slug: "progress", registryName: "progress", surface: "documented" },
] as const

export const standalonePublicComponentSurfaces: readonly PublicComponentSurfaceEntry[] = [
  { slug: "accordion", registryName: "accordion", surface: "standalone" },
  { slug: "divider", registryName: "divider", surface: "standalone" },
  { slug: "segmented-control", registryName: "segmented-control", surface: "standalone" },
  { slug: "skeleton", registryName: "skeleton", surface: "standalone" },
  { slug: "spinner", registryName: "spinner", surface: "standalone" },
  { slug: "command-bar", registryName: "command-bar", surface: "standalone" },
  { slug: "inline-editable", registryName: "inline-editable", surface: "standalone" },
  { slug: "avatar", registryName: "avatar", surface: "standalone" },
  { slug: "code-block", registryName: "code-block", surface: "standalone" },
  { slug: "data-state", registryName: "data-state", surface: "standalone" },
  { slug: "kanban", registryName: "kanban", surface: "standalone" },
  { slug: "list", registryName: "list", surface: "standalone" },
  { slug: "property-grid", registryName: "property-grid", surface: "standalone" },
  { slug: "statistic", registryName: "statistic", surface: "standalone" },
  { slug: "tree-view", registryName: "tree-view", surface: "standalone" },
  { slug: "copy-button", registryName: "copy-button", surface: "standalone" },
  { slug: "section", registryName: "section", surface: "standalone" },
  { slug: "calendar-scheduler", registryName: "calendar-scheduler", surface: "standalone" },
  { slug: "dual-list-picker", registryName: "dual-list-picker", surface: "standalone" },
  { slug: "resizable-panel", registryName: "resizable-panel", surface: "standalone" },
  { slug: "tag", registryName: "tag", surface: "standalone" },
  { slug: "carousel", registryName: "carousel", surface: "standalone" },
  { slug: "typography", registryName: "typography", surface: "standalone" },
  { slug: "json-input", registryName: "json-input", surface: "standalone" },
  { slug: "time-picker", registryName: "time-picker", surface: "standalone" },
  { slug: "sortable-list", registryName: "sortable-list", surface: "standalone" },
  { slug: "virtual-list", registryName: "virtual-list", surface: "standalone" },
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
