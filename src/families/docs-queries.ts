import type { ComponentFamilyName } from "@/families/catalog"
import {
  componentDocsGroups,
  type ComponentDocsGroupEntry,
  type ComponentDocsGroupName,
} from "@/families/docs-groups"
import { getComponentMemberMetadata } from "@/families/member-queries"
import {
  getComponentSnippets,
  getComponentSnippetsByVariant,
} from "@/families/member-snippet-queries"
import { resolveDocsRouteByComponent } from "@/families/docs-routing"

const docsGroupByName = new Map<ComponentDocsGroupName, ComponentDocsGroupEntry>(
  componentDocsGroups.map((entry) => [entry.group, entry])
)

const docsGroupByComponent = new Map<string, ComponentDocsGroupEntry>()

for (const entry of componentDocsGroups) {
  for (const section of entry.sections) {
    for (const component of section.components) {
      docsGroupByComponent.set(component, entry)
    }
  }
}

function getDocsGroup(group: ComponentDocsGroupName) {
  return docsGroupByName.get(group)
}

function getDocsGroupByComponent(component: string) {
  const route = resolveDocsRouteByComponent(component)
  return route ? docsGroupByName.get(route.group) : docsGroupByComponent.get(component)
}

function getDocsGroupByFamily(family: ComponentFamilyName) {
  return componentDocsGroups.find((entry) => entry.family === family)
}

function listDocsGroups() {
  return [...componentDocsGroups]
}

function getDocsNavigation() {
  return componentDocsGroups.map((entry) => ({
    group: entry.group,
    family: entry.family,
    slug: entry.slug,
    label: entry.label,
    primaryComponent: entry.primaryComponent,
    sectionCount: entry.sections.length,
    componentCount: entry.sections.reduce((total, section) => total + section.components.length, 0),
  }))
}

function getDocsGroupDetail(group: ComponentDocsGroupName) {
  const entry = getDocsGroup(group)
  if (!entry) return undefined

  return {
    ...entry,
    sections: entry.sections.map((section) => ({
      ...section,
      items: section.components.map((component) => ({
        component,
        metadata: getComponentMemberMetadata(component),
        snippets: getComponentSnippets(component),
        snippetVariants: getComponentSnippetsByVariant(component),
      })),
    })),
  }
}

export {
  getDocsGroup,
  getDocsGroupDetail,
  getDocsGroupByComponent,
  getDocsGroupByFamily,
  getDocsNavigation,
  listDocsGroups,
}
