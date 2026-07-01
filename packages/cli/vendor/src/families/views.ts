import type { ComponentFamilyCatalogEntry, ComponentFamilyName } from "@/families/catalog"
import type { FamilyMigrationEntry } from "@/families/migration-map"
import { getFamilyCatalogEntry, getFamilyMembers, listAdvancedComponents, listCanonicalComponents, listFamilyCatalogEntries, listTransitionalComponents } from "@/families/queries"

export type ComponentFamilyView = ComponentFamilyCatalogEntry & {
  canonicalEntries: FamilyMigrationEntry[]
  memberEntries: FamilyMigrationEntry[]
  transitionalEntries: FamilyMigrationEntry[]
  advancedEntries: FamilyMigrationEntry[]
}

function toSortedEntries(entries: FamilyMigrationEntry[]) {
  return [...entries].sort((left, right) => left.component.localeCompare(right.component))
}

function filterByCatalogList(entries: FamilyMigrationEntry[], components: string[] = []) {
  const componentSet = new Set(components)
  return entries.filter((entry) => componentSet.has(entry.component))
}

function getFamilyView(family: ComponentFamilyName): ComponentFamilyView | undefined {
  const catalogEntry = getFamilyCatalogEntry(family)
  if (!catalogEntry) return undefined
  const familyMembers = getFamilyMembers(family)
  return {
    ...catalogEntry,
    canonicalEntries: toSortedEntries(filterByCatalogList(familyMembers, catalogEntry.canonical)),
    memberEntries: toSortedEntries(filterByCatalogList(familyMembers, catalogEntry.members)),
    transitionalEntries: toSortedEntries(filterByCatalogList(familyMembers, catalogEntry.transitional)),
    advancedEntries: toSortedEntries(filterByCatalogList(familyMembers, catalogEntry.advanced)),
  }
}

function listFamilyViews() {
  return listFamilyCatalogEntries().map((entry) => getFamilyView(entry.family)).filter(Boolean) as ComponentFamilyView[]
}

function getFamilyNavigation() {
  return listFamilyCatalogEntries().map((entry) => ({
    family: entry.family,
    label: entry.label,
    description: entry.description,
    canonicalCount: entry.canonical.length,
    memberCount: entry.members.length,
    transitionalCount: entry.transitional?.length ?? 0,
    advancedCount: entry.advanced?.length ?? 0,
  }))
}

function getMetadataSummary() {
  return {
    families: listFamilyCatalogEntries().length,
    canonical: listCanonicalComponents().length,
    transitional: listTransitionalComponents().length,
    advanced: listAdvancedComponents().length,
  }
}

export { getFamilyNavigation, getFamilyView, getMetadataSummary, listFamilyViews }
