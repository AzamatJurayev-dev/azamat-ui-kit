import {
  componentDocsGroups,
  type ComponentDocsGroupEntry,
  type ComponentDocsGroupName,
} from "@/families/docs-groups"

export type ComponentDocsRouteMatch = {
  component?: string
  group: ComponentDocsGroupName
  slug: string
  primaryComponent: string
}

function normalizeDocsToken(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "")
}

function toKebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

function getDocsRouteAliases(entry: ComponentDocsGroupEntry) {
  const components = entry.sections.flatMap((section) => section.components)
  const aliases = new Set<string>([
    entry.group,
    entry.label,
    entry.slug,
    entry.primaryComponent,
    toKebabCase(entry.primaryComponent),
  ])

  for (const component of components) {
    aliases.add(component)
    aliases.add(toKebabCase(component))
  }

  return [...aliases]
}

const docsRouteAliasMap = new Map<string, ComponentDocsRouteMatch>()
const docsRouteComponentMap = new Map<string, ComponentDocsRouteMatch>()

for (const entry of componentDocsGroups) {
  const components = entry.sections.flatMap((section) => section.components)

  for (const component of components) {
    docsRouteComponentMap.set(component, {
      component,
      group: entry.group,
      slug: entry.slug,
      primaryComponent: entry.primaryComponent,
    })
  }

  for (const alias of getDocsRouteAliases(entry)) {
    docsRouteAliasMap.set(normalizeDocsToken(alias), {
      group: entry.group,
      slug: entry.slug,
      primaryComponent: entry.primaryComponent,
    })
  }
}

function resolveDocsRouteByComponent(component: string) {
  return docsRouteComponentMap.get(component)
}

function resolveDocsRoute(value: string) {
  return docsRouteAliasMap.get(normalizeDocsToken(value))
}

function listDocsRouteAliases() {
  return componentDocsGroups.map((entry) => ({
    group: entry.group,
    slug: entry.slug,
    aliases: getDocsRouteAliases(entry),
  }))
}

export {
  listDocsRouteAliases,
  normalizeDocsToken,
  resolveDocsRoute,
  resolveDocsRouteByComponent,
  toKebabCase,
}
