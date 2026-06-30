import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { spawnSync } from "node:child_process"

const root = process.cwd()
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm"

const requiredFiles = [
  path.join(root, "dist", "index.js"),
  path.join(root, "dist", "index.cjs"),
  path.join(root, "dist", "index.d.ts"),
  path.join(root, "dist", "components", "actions", "action-menu.js"),
]

const hasRequiredBuildOutput = requiredFiles.every((filePath) => fs.existsSync(filePath))

if (!hasRequiredBuildOutput) {
  console.log("Build output missing or stale. Running `npm run build:lib` before build smoke check...")

  const result = spawnSync(npmBin, ["run", "build:lib"], {
    cwd: root,
    stdio: "inherit",
    shell: false,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

console.log("Build output is ready.")
