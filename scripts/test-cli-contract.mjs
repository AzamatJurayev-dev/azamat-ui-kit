import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import process from "node:process"

import { execa } from "execa"

const root = process.cwd()
const cliBinary = path.join(root, "packages", "cli", "dist", "index.cjs")
const nodeBin = process.execPath
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm"

async function runCli(cwd, args) {
  return execa(nodeBin, [cliBinary, ...args], {
    cwd,
    env: { ...process.env, CI: "true" },
  })
}

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) throw new Error(`${label} missing: ${expected}`)
}

async function writeFixture(rootDir, template) {
  await fs.writeFile(path.join(rootDir, "package.json"), JSON.stringify({
    name: `tembro-contract-${template}`,
    private: true,
    type: "module",
    dependencies: template === "next" ? { next: "16.0.0", react: "19.2.0", "react-dom": "19.2.0" } : { react: "19.2.0", "react-dom": "19.2.0" },
    devDependencies: template === "vite" ? { vite: "8.0.0" } : {},
  }, null, 2))

  if (template === "next") {
    await fs.mkdir(path.join(rootDir, "app"), { recursive: true })
    await fs.writeFile(path.join(rootDir, "app", "globals.css"), ":root {}\n")
    await fs.writeFile(path.join(rootDir, "tsconfig.json"), JSON.stringify({ compilerOptions: { jsx: "preserve" } }, null, 2))
  } else {
    await fs.mkdir(path.join(rootDir, "src"), { recursive: true })
    await fs.writeFile(path.join(rootDir, "src", "index.css"), ":root {}\n")
    await fs.writeFile(path.join(rootDir, "vite.config.ts"), "import { defineConfig } from 'vite'\nexport default defineConfig({})\n")
    await fs.writeFile(path.join(rootDir, "tsconfig.app.json"), JSON.stringify({ compilerOptions: { jsx: "react-jsx" } }, null, 2))
  }
}

async function assertFile(rootDir, relativePath) {
  const stat = await fs.stat(path.join(rootDir, relativePath))
  if (!stat.isFile() || stat.size === 0) throw new Error(`Expected non-empty file: ${relativePath}`)
}

async function main() {
  await execa(npmBin, ["run", "build:cli"], { cwd: root, stdio: "inherit" })

  const help = await runCli(root, ["--help"])
  for (const command of ["init", "add", "list", "doctor", "theme", "preset", "agents", "showcase"]) {
    assertIncludes(help.stdout, command, "root help")
  }

  const initHelp = await runCli(root, ["init", "--help"])
  assertIncludes(initHelp.stdout, "--skip-agents", "init help")
  assertIncludes(initHelp.stdout, "--overwrite-agents", "init help")

  for (const template of ["vite", "next"]) {
    const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), `tembro-contract-${template}-`))
    try {
      await writeFixture(fixtureRoot, template)
      await runCli(fixtureRoot, ["init", "--template", template, "--defaults", "--skip-install"])

      await assertFile(fixtureRoot, "AGENTS.md")
      await assertFile(fixtureRoot, ".agents/README.md")
      await assertFile(fixtureRoot, ".agents/skills/tembro-component-development/SKILL.md")
      await assertFile(fixtureRoot, ".agents/skills/accessibility-review/SKILL.md")
      await assertFile(fixtureRoot, ".agents/skills/testing-and-validation/SKILL.md")

      const custom = "# custom project instructions\n"
      await fs.writeFile(path.join(fixtureRoot, "AGENTS.md"), custom)
      await runCli(fixtureRoot, ["agents"])
      const preserved = await fs.readFile(path.join(fixtureRoot, "AGENTS.md"), "utf8")
      if (preserved !== custom) throw new Error(`${template}: agents command overwrote custom AGENTS.md without --overwrite`)

      const dryRun = await runCli(fixtureRoot, ["agents", "--dry-run"])
      assertIncludes(dryRun.stdout, "Dry run complete", `${template} agents dry-run`)

      await runCli(fixtureRoot, ["agents", "--overwrite"])
      const overwritten = await fs.readFile(path.join(fixtureRoot, "AGENTS.md"), "utf8")
      if (overwritten === custom) throw new Error(`${template}: --overwrite did not refresh AGENTS.md`)

      const doctor = await runCli(fixtureRoot, ["doctor"])
      assertIncludes(`${doctor.stdout}\n${doctor.stderr}`, "ai-agents", `${template} doctor`)
    } finally {
      await fs.rm(fixtureRoot, { recursive: true, force: true })
    }
  }

  console.log("CLI contract smoke passed")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
