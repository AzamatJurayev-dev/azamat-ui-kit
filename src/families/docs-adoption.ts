import {
  componentDocsGroups,
  type ComponentDocsGroupName,
} from "@/families/docs-groups"
import { getComponentMemberMetadata } from "@/families/member-queries"

export type ComponentDocsBadgeTone =
  | "stable"
  | "preview"
  | "advanced"
  | "migration"

export type ComponentDocsAdoption = {
  component: string
  group: ComponentDocsGroupName
  badge: {
    label: string
    tone: ComponentDocsBadgeTone
  }
  recommendedOrder: number
  sectionOrder: number
  itemOrder: number
}

const sectionBaseOrder = {
  primitives: 0,
  presets: 100,
  "form-wrappers": 200,
  wrappers: 200,
  extensions: 200,
  advanced: 300,
  transitional: 400,
} as const

function getBadgeForComponent(component: string) {
  const metadata = getComponentMemberMetadata(component)

  if (!metadata) {
    return {
      label: "Unknown",
      tone: "preview" as const,
    }
  }

  if (metadata.maturity === "canonical") {
    return {
      label: "Start here",
      tone: "stable" as const,
    }
  }

  if (metadata.maturity === "advanced") {
    return {
      label: "Advanced",
      tone: "advanced" as const,
    }
  }

  if (metadata.maturity === "transitional") {
    return {
      label: "Migration",
      tone: "migration" as const,
    }
  }

  return {
    label: "Expand",
    tone: "preview" as const,
  }
}

const docsAdoptionMap = new Map<string, ComponentDocsAdoption>()

for (const group of componentDocsGroups) {
  group.sections.forEach((section, sectionIndex) => {
    section.components.forEach((component, itemIndex) => {
      const baseOrder =
        sectionBaseOrder[section.id as keyof typeof sectionBaseOrder] ?? 500
      const recommendedOrder = baseOrder + sectionIndex * 10 + itemIndex

      docsAdoptionMap.set(component, {
        component,
        group: group.group,
        badge: getBadgeForComponent(component),
        recommendedOrder,
        sectionOrder: sectionIndex,
        itemOrder: itemIndex,
      })
    })
  })
}

function getComponentDocsAdoption(component: string) {
  return docsAdoptionMap.get(component)
}

function listDocsAdoption(group: ComponentDocsGroupName) {
  return [...docsAdoptionMap.values()]
    .filter((entry) => entry.group === group)
    .sort((left, right) => left.recommendedOrder - right.recommendedOrder)
}

export { getComponentDocsAdoption, listDocsAdoption }
