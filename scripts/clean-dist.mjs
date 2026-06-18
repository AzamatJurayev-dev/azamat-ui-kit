import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const distPath = path.join(process.cwd(), "dist")

fs.rmSync(distPath, { recursive: true, force: true })
console.log("Cleaned dist output.")
