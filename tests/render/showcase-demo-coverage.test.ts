import { describe, expect, test } from "vitest"

import { showcaseDemoRegistry } from "@/showcase"
import { componentCatalog } from "@/showcase/site-data"

describe("showcase demo coverage", () => {
  test("every public component catalog slug has a dedicated demo registry entry", () => {
    const demoSlugs = new Set(Object.keys(showcaseDemoRegistry))
    const missing = componentCatalog
      .map((item) => item.slug)
      .filter((slug) => !demoSlugs.has(slug))

    expect(missing).toEqual([])
  })
})
