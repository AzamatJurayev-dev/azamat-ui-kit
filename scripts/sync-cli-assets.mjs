import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const cliRoot = path.join(root, "packages", "cli")
const vendorRoot = path.join(cliRoot, "vendor")
const sources = ["src", "templates"]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function safeRemove(target) {
  const retryMs = [60, 120, 240, 480, 960, 1500]
  for (let i = 0; i < retryMs.length; i += 1) {
    try {
      await fs.rm(target, { recursive: true, force: true })
      return
    } catch (error) {
      if (error.code !== "EBUSY" && error.code !== "EPERM" && error.code !== "EACCES") {
        throw error
      }

      await sleep(retryMs[i])
    }
  }

  await fs.rm(target, { recursive: true, force: true })
}

await safeRemove(vendorRoot)
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
      name: "azix-vendor",
      private: true,
    },
    null,
    2,
  ) + "\n",
  "utf8",
)

console.log("CLI vendor assets synced.")
