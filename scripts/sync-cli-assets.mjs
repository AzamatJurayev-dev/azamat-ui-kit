import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const cliRoot = path.join(root, "packages", "cli")
const vendorRoot = path.join(cliRoot, "vendor")
const sources = ["src", "templates"]

await fs.rm(vendorRoot, { recursive: true, force: true })
await fs.mkdir(vendorRoot, { recursive: true })

for (const source of sources) {
  await fs.cp(path.join(root, source), path.join(vendorRoot, source), {
    recursive: true,
  })
}

await fs.writeFile(
  path.join(vendorRoot, "package.json"),
  JSON.stringify(
    {
      name: "azamat-ui-kit",
      private: true,
    },
    null,
    2,
  ) + "\n",
  "utf8",
)

console.log("CLI vendor assets synced.")
