import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { componentDocsGroups } from "@/families/docs-groups"

const root = path.resolve(import.meta.dirname, "..", "..")
const publicApiInventory = fs.readFileSync(path.join(root, "PUBLIC_API_INVENTORY.md"), "utf8")
const publicComponentApi = fs.readFileSync(path.join(root, "PUBLIC_COMPONENT_API.md"), "utf8")

describe("public docs files", () => {
  it("keeps first-level docs entries aligned with docs-group primary components", () => {
    const primaryComponents = componentDocsGroups.map((entry) => entry.primaryComponent)

    primaryComponents.forEach((component) => {
      expect(
        publicApiInventory,
        `${component} should be documented in the Family Display Rule section`
      ).toContain(`- \`${component}\`:`)

      expect(
        publicComponentApi,
        `${component} should have a canonical public API section`
      ).toContain(`## ${component}`)
    })
  })

  it("does not teach removed first-level names after the route model changed", () => {
    expect(publicApiInventory).not.toContain("- `DatePicker`:")
    expect(publicComponentApi).not.toContain("## DatePicker")
  })
})
