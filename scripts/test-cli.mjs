import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import process from "node:process"

import { execa } from "execa"
import fsExtra from "fs-extra"

const root = process.cwd()
const cliBinary = path.join(root, "packages", "cli", "dist", "index.cjs")
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm"
const nodeBin = process.execPath
let cliBuildCompleted = false

function templateRootForFixture(template) {
  if (template === "vite") {
    return {
      rootDir: "src",
      cssPath: "src/index.css",
      uiPath: "src/components/ui",
      componentsPath: "src/components",
      hooksPath: "src/hooks",
      utilsPath: "src/lib/utils.ts",
    }
  }

  return {
    rootDir: ".",
    cssPath: "app/globals.css",
    uiPath: "components/ui",
    componentsPath: "components",
    hooksPath: "hooks",
    utilsPath: "lib/utils.ts",
  }
}

async function buildCli() {
  if (cliBuildCompleted) return

  const attempts = 2
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await execa(npmBin, ["run", "build:cli"], {
        cwd: root,
        stdio: "pipe",
      })
      cliBuildCompleted = true
      return
    } catch (error) {
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }

  throw lastError
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8")
}

async function writeTemplateProjectFiles(fixtureRoot, template) {
  const paths = templateRootForFixture(template)

  const packageJson = {
    name: `azamat-ui-kit-${template}-cli-smoke`,
    private: true,
    type: "module",
    scripts: {
      test: "echo done",
    },
  }

  if (template === "next") {
    packageJson.dependencies = { react: "^19.2.0", "react-dom": "^19.2.0" }
    await fsExtra.ensureDir(path.join(fixtureRoot, "app"))
    await fs.writeFile(path.join(fixtureRoot, "app", "globals.css"), ":root {}\n", "utf8")
    await fs.writeFile(path.join(fixtureRoot, "app", "page.tsx"), "export default function Page(){return null}", "utf8")
  } else {
    await fsExtra.ensureDir(path.join(fixtureRoot, "src"))
    await fs.writeFile(path.join(fixtureRoot, paths.cssPath), ":root {}\n", "utf8")
    await fs.writeFile(path.join(fixtureRoot, "vite.config.ts"), "import { defineConfig } from 'vite'\n\nexport default defineConfig({})\n", "utf8")
  }

  await writeJson(path.join(fixtureRoot, "package.json"), packageJson)
  return paths
}

function assertFileExists(base, relativePath) {
  if (!fsExtra.existsSync(path.join(base, relativePath))) {
    throw new Error(`Expected file missing: ${relativePath}`)
  }
}

async function assertRuntimePackageNotInstalled(fixtureRoot, template) {
  const packageJson = await fsExtra.readJson(path.join(fixtureRoot, "package.json"))
  const installedPackages = new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
  ])

  if (installedPackages.has("azamat-ui-kit")) {
    throw new Error(`source-copy init should not install azamat-ui-kit runtime package for ${template}`)
  }
}

async function runCli(fixtureRoot, args) {
  const child = await execa(nodeBin, [cliBinary, ...args], {
    cwd: fixtureRoot,
    env: {
      ...process.env,
      CI: "true",
    },
  })

  return child
}

async function assertInitAndArtifacts(template) {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), `azix-${template}-`))

  try {
    const paths = await writeTemplateProjectFiles(fixtureRoot, template)
    await buildCli()
    await runCli(fixtureRoot, ["init", "--template", template, "--skip-install", "--defaults"])

    assertFileExists(fixtureRoot, "azamat-ui.json")
    await assertRuntimePackageNotInstalled(fixtureRoot, template)

    const listResult = await runCli(fixtureRoot, ["list"])
    if (!listResult.stdout.includes("button")) {
      throw new Error(`list output does not include button for ${template}`)
    }

    if (!listResult.stdout.includes("stable")) {
      throw new Error(`list output missing status metadata for ${template}`)
    }

    const presetName = "minimal"
    await runCli(fixtureRoot, ["preset", presetName, "--overwrite"])
    assertFileExists(fixtureRoot, path.join(paths.uiPath, "button.tsx"))

    await runCli(fixtureRoot, ["add", "input", "form-select", "--overwrite", "--skip-install"])
    assertFileExists(fixtureRoot, path.join(paths.uiPath, "input.tsx"))
    assertFileExists(fixtureRoot, path.join(paths.componentsPath, "form", "form-select.tsx"))

    await runCli(fixtureRoot, ["theme", paths.cssPath])
    const themePath = path.join(fixtureRoot, paths.cssPath)
    const themeContent = await fs.readFile(themePath, "utf8")
    if (!themeContent.includes("--aui-control-radius")) {
      throw new Error(`theme command did not write CSS variables for ${template}`)
    }

    if (template === "vite") {
      const tsconfigPaths = path.join(fixtureRoot, "tsconfig.app.json")
      if (fsExtra.existsSync(tsconfigPaths)) {
        const tsconfigContent = await fs.readFile(tsconfigPaths, "utf8")
        if (!tsconfigContent.includes("paths")) {
          throw new Error(`vite init should add tsconfig alias for ${template}`)
        }
      }
    }

    return true
  } finally {
    await fsExtra.remove(fixtureRoot)
  }
}

async function main() {
  const hasVite = await assertInitAndArtifacts("vite")
  if (!hasVite) throw new Error("Vite fixture failed")
  const hasNext = await assertInitAndArtifacts("next")
  if (!hasNext) throw new Error("Next fixture failed")
}

await main()
