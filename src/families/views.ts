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

function pickCatalogEntries(entries: FamilyMigrationEntry[], components: readonly string[]) {
  const allowed = new Set(components)
  return toSortedEntries(entries.filter((entry) => allowed.has(entry.component)))
}

function getFamilyView(family: ComponentFamilyName): ComponentFamilyView | undefined {
  const catalogEntry = getFamilyCatalogEntry(family)

  if (!catalogEntry) return undefined

  const familyMembers = getFamilyMembers(family)
  const canonicalEntries = pickCatalogEntries(
    familyMembers.filter((entry) => entry.status === "canonical" || entry.status === "canonical composed member"),
    catalogEntry.canonical
  )
  const transitionalEntries = pickCatalogEntries(
    familyMembers.filter((entry) => entry.status === "transitional"),
    catalogEntry.transitional ?? []
  )
  const advancedEntries = pickCatalogEntries(
    familyMembers.filter((entry) => entry.status === "advanced"),
    catalogEntry.advanced ?? []
  )
  const memberEntries = pickCatalogEntries(
    familyMembers.filter((entry) => entry.status === "family-member" || entry.status === "family-member helper"),
    catalogEntry.members
  )

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
