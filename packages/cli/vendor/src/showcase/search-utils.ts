import { globalSearchItems } from "./site-data"

export type SearchItem = (typeof globalSearchItems)[number]

export const searchGroupOrder: Array<SearchItem["group"]> = [
  "Components",
  "Docs",
  "Examples",
]

export function searchGroupLabel(group: SearchItem["group"]) {
  if (group === "Components") return "Components"
  if (group === "Templates") return "Templates"
  if (group === "Blocks") return "Blocks"
  if (group === "Docs") return "Docs"
  if (group === "Examples") return "Examples"
  return group
}

export function isAdvancedSearchItem(item: SearchItem) {
  return item.shortcut === "E" || item.shortcut === "F" || item.shortcut === "M" || item.title.endsWith(" API") || item.title.endsWith(" group") || item.title.includes(" in ")
}

export function searchItemKindLabel(item: SearchItem) {
  if (item.href === "/docs" || item.href === "/docs/installation" || item.href === "/changelog" || item.href === "/command") return "Docs page"
  if (item.group === "Docs") return "Docs page"
  if (item.group === "Examples") return "Live example"
  if (item.group === "Blocks") return "Block"
  if (item.group === "Templates" && item.href.includes("#")) return "Template section"
  if (item.group === "Templates") return "Template"
  if (item.shortcut === "M") return "Surface member"
  if (item.title.endsWith(" API")) return "API item"
  if (item.title.endsWith(" group")) return "Component group"
  return "Component"
}

export function getSearchItemByHref(href: string) {
  return globalSearchItems.find((item) => item.href === href)
}

export function scoreSearchItem(item: SearchItem, query: string) {
  if (!query) return item.featured ? 100 : isAdvancedSearchItem(item) ? -20 : 0

  const normalizedQuery = query.toLowerCase().replace(/\s+/g, " ").trim()
  const title = item.title.toLowerCase().replace(/\s+/g, " ").trim()
  const description = item.description.toLowerCase().replace(/\s+/g, " ").trim()
  const keywords = (item.keywords ?? []).join(" ").toLowerCase().replace(/\s+/g, " ").trim()

  let score = 0

  if (title === normalizedQuery) score += 120
  if (title.startsWith(normalizedQuery)) score += 60
  if (title.includes(normalizedQuery)) score += 35
  if (keywords.includes(normalizedQuery)) score += 18
  if (description.includes(normalizedQuery)) score += 10
  if (item.featured) score += 4
  if (item.shortcut === "D" || item.shortcut === "C") score += 8
  if (isAdvancedSearchItem(item) && !normalizedQuery.includes("api") && !normalizedQuery.includes("group") && !normalizedQuery.includes("member") && !normalizedQuery.includes("variant") && !normalizedQuery.includes("wrapper")) score -= 10

  return score
}

export function getVisibleSearchItems(query: string) {
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, " ").trim()
  if (/\b(block|blocks|template|templates)\b/.test(normalizedQuery)) return []

  const prefersAdvanced =
    normalizedQuery.includes("api") ||
    normalizedQuery.includes("group") ||
    normalizedQuery.includes("registry") ||
    normalizedQuery.includes("helper") ||
    normalizedQuery.includes("member") ||
    normalizedQuery.includes("variant") ||
    normalizedQuery.includes("wrapper")

  return globalSearchItems
    .filter((item) => item.group !== "Blocks" && item.group !== "Templates")
    .map((item) => ({
      item,
      score: scoreSearchItem(item, normalizedQuery),
    }))
    .filter(({ item, score }) => {
      if (!normalizedQuery) return (item.featured || item.group === "Docs" || item.group === "Templates" || item.group === "Components") && !isAdvancedSearchItem(item)
      const haystack = [item.title, item.description, item.group, ...(item.keywords ?? [])].join(" ").toLowerCase()
      return score > 0 || haystack.includes(normalizedQuery) || (prefersAdvanced && isAdvancedSearchItem(item) && haystack.includes(normalizedQuery.replace("api", "").replace("group", "").replace("member", "").replace("variant", "").replace("wrapper", "").trim()))
    })
    .sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title))
    .map(({ item }) => item)
}
