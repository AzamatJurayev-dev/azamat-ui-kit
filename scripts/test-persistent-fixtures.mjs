import path from "node:path"
import process from "node:process"

import { execa } from "execa"

const root = process.cwd()
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm"

const fixtures = [
  { name: "Vite", directory: "fixtures/vite-consumer" },
  { name: "Next.js", directory: "fixtures/next-consumer" },
]

async function run(command, args, cwd) {
  await execa(command, args, {
    cwd,
    stdio: "inherit",
    env: {
      ...process.env,
      CI: "true",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  })
}

for (const fixture of fixtures) {
  const fixtureRoot = path.join(root, fixture.directory)
  console.log(`\n[fixture] ${fixture.name}: install`)
  await run(npmBin, ["install", "--no-audit", "--no-fund", "--ignore-scripts"], fixtureRoot)

  console.log(`[fixture] ${fixture.name}: source-copy setup`)
  await run(npmBin, ["run", "setup"], fixtureRoot)

  console.log(`[fixture] ${fixture.name}: production build`)
  await run(npmBin, ["run", "build"], fixtureRoot)
}

console.log("\nPersistent Vite and Next.js consumer fixtures passed.")
