import type { ComponentFamilyCatalogEntry, ComponentFamilyName } from "@/families/catalog"
import type { FamilyMigrationEntry } from "@/families/migration-map"
import {
  getFamilyCatalogEntry,
  getFamilyMembers,
  listAdvancedComponents,
  listCanonicalComponents,
  listFamilyCatalogEntries,
  listTransitionalComponents,
} from "@/families/queries"

export type ComponentFamilyView = ComponentFamilyCatalogEntry & {
  canonicalEntries: FamilyMigrationEntry[]
  memberEntries: FamilyMigrationEntry[]
  transitionalEntries: FamilyMigrationEntry[]
  advancedEntries: FamilyMigrationEntry[]
}

function toSortedEntries(entries: FamilyMigrationEntry[]) {
  return [...entries].sort((left, right) => left.component.localeCompare(right.component))
}

function getFamilyView(family: ComponentFamilyName): ComponentFamilyView | undefined {
  const catalogEntry = getFamilyCatalogEntry(family)

  if (!catalogEntry) return undefined

  const familyMembers = getFamilyMembers(family)
  const canonicalEntries = toSortedEntries(familyMembers.filter((entry) => entry.status === "canonical" || entry.status === "canonical composed member"))
  const transitionalEntries = toSortedEntries(familyMembers.filter((entry) => entry.status === "transitional"))
  const advancedEntries = toSortedEntries(familyMembers.filter((entry) => entry.status === "advanced"))
  const memberEntries = toSortedEntries(familyMembers.filter((entry) => entry.status === "family-member" || entry.status === "family-member helper"))

  return {
    ...catalogEntry,
    canonicalEntries,
    memberEntries,
    transitionalEntries,
    advancedEntries,
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
