import { createGenericShowcaseDemo } from "./fallback"
import { componentCatalog, getComponentGroup } from "./site-data"
import type { ShowcaseDemoBundle } from "./types"
import { standalonePublicComponentSlugs } from "@/public-component-surface"

function slugToExportName(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function getLocalImportSnippet(slug: string, category: string) {
  const exportName = slugToExportName(slug)
  void category
  return `import { ${exportName} } from "tembro"`
}

export const supplementalShowcaseDemoRegistry = Object.fromEntries(
  standalonePublicComponentSlugs.map((slug) => {
    const item = componentCatalog.find((entry) => entry.slug === slug)
    if (!item) {
      throw new Error(`Missing component catalog item for supplemental showcase slug: ${slug}`)
    }

    return [
      slug,
      createGenericShowcaseDemo({
        item,
        groupLabel: getComponentGroup(slug),
        importSnippet: getLocalImportSnippet(slug, item.category),
      }),
    ]
  })
) satisfies Record<string, ShowcaseDemoBundle>

export const supplementalShowcaseDemoSlugs = [...standalonePublicComponentSlugs]
