import {
  componentSnippetExamples,
  type ComponentSnippetExample,
  type ComponentSnippetVariant,
} from "@/families/member-snippets"
import type { ComponentFamilyName } from "@/families/catalog"
import { getComponentMemberMetadata } from "@/families/member-queries"

const snippetsByComponent = new Map<string, ComponentSnippetExample[]>()

for (const snippet of componentSnippetExamples) {
  const existing = snippetsByComponent.get(snippet.component) ?? []
  existing.push(snippet)
  snippetsByComponent.set(snippet.component, existing)
}

function getComponentSnippets(component: string) {
  return snippetsByComponent.get(component) ?? []
}

function getPrimaryComponentSnippet(component: string) {
  return getComponentSnippets(component)[0]
}

function getComponentSnippetsByVariant(component: string) {
  const grouped = new Map<ComponentSnippetVariant, ComponentSnippetExample[]>()

  for (const snippet of getComponentSnippets(component)) {
    const existing = grouped.get(snippet.variant) ?? []
    existing.push(snippet)
    grouped.set(snippet.variant, existing)
  }

  return grouped
}

function getFamilySnippets(family: ComponentFamilyName) {
  return componentSnippetExamples.filter((snippet) => {
    const metadata = getComponentMemberMetadata(snippet.component)
    return metadata?.family === family
  })
}

function listSnippetVariants() {
  return [...new Set(componentSnippetExamples.map((snippet) => snippet.variant))]
}

export {
  getComponentSnippets,
  getComponentSnippetsByVariant,
  getFamilySnippets,
  getPrimaryComponentSnippet,
  listSnippetVariants,
}
