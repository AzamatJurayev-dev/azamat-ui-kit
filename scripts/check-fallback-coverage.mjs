import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const source = readFileSync(join(rootDir, "src/public-component-surface.ts"), "utf8")
const fallbackSource = readFileSync(join(rootDir, "src/showcase/fallback.tsx"), "utf8")
const registrySpecificSource = readFileSync(join(rootDir, "src/showcase/registry-specific.tsx"), "utf8")

const standaloneSlugs = Array.from(
  source.matchAll(/\{\s*slug:\s*"([^"]+)",\s*registryName:\s*"[^"]+",\s*surface:\s*"standalone"\s*\}/g)
).map((match) => match[1])

const explicitFallbackSlugs = new Set(
  Array.from(fallbackSource.matchAll(/item\.slug\s*===\s*"([^"]+)"/g)).map((match) => match[1])
)
const specificRegistrySlugs = new Set(
  Array.from(registrySpecificSource.matchAll(/component\(\s*"([^"]+)"/g)).map((match) => match[1])
)

const genericAllowedSlugs = new Set([
  // These entries are composition aliases that intentionally share a family renderer.
  "bulk-action-bar",
  "data-view",
  "description-list",
  "detail-layout",
  "empty-state",
  "page-toolbar",
  "settings-page",
])

const missing = standaloneSlugs.filter(
  (slug) => !explicitFallbackSlugs.has(slug) && !specificRegistrySlugs.has(slug) && !genericAllowedSlugs.has(slug)
)

if (missing.length > 0) {
  console.error("Standalone showcase fallback coverage failed:")
  for (const slug of missing) {
    console.error(`- ${slug}: add a slug-specific preview or move it into registry-specific demos`)
  }
  process.exit(1)
}

console.log("Standalone showcase fallback coverage passed")
