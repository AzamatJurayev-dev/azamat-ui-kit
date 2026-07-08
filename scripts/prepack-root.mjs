import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"

const root = process.cwd()
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm"

const requiredFiles = [
  path.join(root, "dist", "index.js"),
  path.join(root, "dist", "index.cjs"),
  path.join(root, "dist", "index.d.ts"),
]

const hasBuildOutput = requiredFiles.every((filePath) => fs.existsSync(filePath))

if (hasBuildOutput) {
  console.log("prepack: existing root build output detected, skipping rebuild.")
  process.exit(0)
}

const result = spawnSync(npmBin, ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: false,
})

process.exit(result.status ?? 1)
