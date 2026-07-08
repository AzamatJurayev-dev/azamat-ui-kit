import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(scriptDir, "..")
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm"

const requiredFiles = [
  path.join(root, "packages", "cli", "dist", "index.cjs"),
  path.join(root, "packages", "cli", "vendor", "package.json"),
]

const hasBuildOutput = requiredFiles.every((filePath) => fs.existsSync(filePath))

if (hasBuildOutput) {
  console.log("prepack: existing CLI build output detected, skipping rebuild.")
  process.exit(0)
}

const result = spawnSync(npmBin, ["run", "build", "--workspace", "azix-cli-internal"], {
  cwd: root,
  stdio: "inherit",
  shell: false,
})

process.exit(result.status ?? 1)
