import { componentFamilyCatalog, type ComponentFamilyCatalogEntry, type ComponentFamilyName } from "@/families/catalog"
import {
  componentFamilyMigrationMap,
  type FamilyMigrationEntry,
  type FamilyMigrationStatus,
} from "@/families/migration-map"

const familyCatalogMap = new Map<ComponentFamilyName, ComponentFamilyCatalogEntry>(
  componentFamilyCatalog.map((entry) => [entry.family, entry])
)

const componentMigrationMap = new Map<string, FamilyMigrationEntry[]>()

for (const entry of componentFamilyMigrationMap) {
  const existingEntries = componentMigrationMap.get(entry.component) ?? []
  existingEntries.push(entry)
  componentMigrationMap.set(entry.component, existingEntries)
}

function getFamilyCatalogEntry(family: ComponentFamilyName) {
  return familyCatalogMap.get(family)
}

function getFamilyMembers(family: ComponentFamilyName) {
  return componentFamilyMigrationMap.filter((entry) => entry.family === family)
}

function getComponentFamilyEntry(component: string) {
  return componentMigrationMap.get(component)?.[0]
}

function getComponentFamilyEntries(component: string) {
  return componentMigrationMap.get(component) ?? []
}

function listComponentsByStatus(status: FamilyMigrationStatus) {
  return componentFamilyMigrationMap.filter((entry) => entry.status === status)
}

function listTransitionalComponents() {
  return listComponentsByStatus("transitional")
}

function listAdvancedComponents() {
  return listComponentsByStatus("advanced")
}

function listCanonicalComponents() {
  return componentFamilyMigrationMap.filter(
    (entry) => entry.status === "canonical" || entry.status === "canonical composed member"
  )
}

export {
  getComponentFamilyEntry,
  getComponentFamilyEntries,
  getFamilyCatalogEntry,
  getFamilyMembers,
  listAdvancedComponents,
  listCanonicalComponents,
  listComponentsByStatus,
  listTransitionalComponents,
}
