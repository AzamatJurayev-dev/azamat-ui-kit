import path from "path"
import { fileURLToPath } from "url"
import fs from "fs-extra"
import { LIBRARY_PACKAGE_NAME } from "./cli-metadata"

export function getPackageRootFromImportMeta(importMetaUrl: string) {
  const currentDir = path.dirname(fileURLToPath(importMetaUrl))
  const vendorDir = path.resolve(currentDir, "../vendor")

  if (fs.existsSync(path.join(vendorDir, "src"))) {
    return vendorDir
  }

  const candidates = [
    path.resolve(currentDir, "../.."),
    path.resolve(currentDir, ".."),
    process.cwd(),
  ]

  for (const candidate of candidates) {
    const packageJsonPath = path.join(candidate, "package.json")

    if (!fs.existsSync(packageJsonPath)) continue

    try {
      const packageJson = fs.readJsonSync(packageJsonPath) as { name?: string }
      if (packageJson.name === LIBRARY_PACKAGE_NAME) return candidate
    } catch {
      // Keep scanning.
    }
  }

  return path.resolve(currentDir, "../..")
}
