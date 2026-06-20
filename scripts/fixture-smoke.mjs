import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import process from "node:process"

import { execa } from "execa"
import fsExtra from "fs-extra"

const root = process.cwd()
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm"
const npxBin = process.platform === "win32" ? "npx.cmd" : "npx"

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8")
}

async function createTarball(tempRoot) {
  await execa(npmBin, ["pack", "--pack-destination", tempRoot], {
    cwd: root,
    stdio: "pipe",
  })
  const filenames = (await fs.readdir(tempRoot)).filter((entry) => entry.endsWith(".tgz"))
  const filename = filenames[0]

  if (!filename) {
    throw new Error("npm pack did not return a tarball filename")
  }

  return path.join(tempRoot, filename)
}

async function installConsumerFixture({
  fixtureRoot,
  fixtureName,
  tarballPath,
  packageJson,
  tsconfig,
  sourceFiles,
}) {
  const cwd = path.join(fixtureRoot, fixtureName)
  await fsExtra.ensureDir(cwd)

  await writeJson(path.join(cwd, "package.json"), packageJson)
  await writeJson(path.join(cwd, "tsconfig.json"), tsconfig)

  for (const [relativePath, contents] of Object.entries(sourceFiles)) {
    const fullPath = path.join(cwd, relativePath)
    await fsExtra.ensureDir(path.dirname(fullPath))
    await fs.writeFile(fullPath, contents, "utf8")
  }

  await execa(
    npmBin,
    [
      "install",
      "--no-fund",
      "--no-audit",
      tarballPath,
      "react",
      "react-dom",
      "react-hook-form",
      "typescript",
      "@types/react",
      "@types/react-dom",
      "@types/node",
    ],
    { cwd, stdio: "pipe" }
  )

  await execa(npxBin, ["tsc", "--noEmit", "-p", "tsconfig.json"], {
    cwd,
    stdio: "pipe",
  })

  await execa(process.execPath, ["src/runtime-check.mjs"], {
    cwd,
    stdio: "pipe",
  })
}

async function main() {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), "azamat-ui-kit-fixtures-"))

  try {
    const tarballPath = await createTarball(fixtureRoot)

    await installConsumerFixture({
      fixtureRoot,
      fixtureName: "vite-smoke",
      tarballPath,
      packageJson: {
        name: "vite-smoke",
        private: true,
        type: "module",
      },
      tsconfig: {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          esModuleInterop: true,
          types: ["node"],
          noEmit: true,
        },
        include: ["src"],
      },
      sourceFiles: {
        "src/main.tsx": `import { Button, DataTable, ToastProvider, FormBuilder } from "azamat-ui-kit"
import { ActionBar } from "azamat-ui-kit/actions/action-bar"
import { SmartFormShell } from "azamat-ui-kit/form/smart-form-shell"
import { TableExportMenu } from "azamat-ui-kit/data-table/table-export-menu"

const value = [Button, DataTable, ToastProvider, FormBuilder, ActionBar, SmartFormShell, TableExportMenu]

export default value
`,
        "src/runtime-check.mjs": `import { Button, DataTable, ToastProvider, FormBuilder } from "azamat-ui-kit"
import { ActionBar } from "azamat-ui-kit/actions/action-bar"
import { SmartFormShell } from "azamat-ui-kit/form/smart-form-shell"
import { TableExportMenu } from "azamat-ui-kit/data-table/table-export-menu"

const required = [Button, DataTable, ToastProvider, FormBuilder, ActionBar, SmartFormShell, TableExportMenu]

if (required.some((entry) => typeof entry !== "function" && typeof entry !== "object")) {
  throw new Error("Vite fixture import contract failed")
}
`,
      },
    })

    await installConsumerFixture({
      fixtureRoot,
      fixtureName: "next-smoke",
      tarballPath,
      packageJson: {
        name: "next-smoke",
        private: true,
        type: "module",
      },
      tsconfig: {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "preserve",
          strict: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowJs: true,
          resolveJsonModule: true,
          types: ["node"],
          noEmit: true,
        },
        include: ["app", "src"],
      },
      sourceFiles: {
        "app/page.tsx": `import { Button, CommandPalette, InputFamily } from "azamat-ui-kit"
import { WorkspaceShell } from "azamat-ui-kit/layout/workspace-shell"
import { ProgressRing } from "azamat-ui-kit/charts/progress-ring"
import { ActionSystem } from "azamat-ui-kit/patterns/action-system"

export default function Page() {
  return (
    <div>
      <Button>Open</Button>
      <CommandPalette open={false} onOpenChange={() => {}} groups={[]} />
      <InputFamily.Search placeholder="Search" />
      <WorkspaceShell />
      <ProgressRing value={40} />
      <ActionSystem item={{ id: "1" }} actions={[]} />
    </div>
  )
}
`,
        "src/runtime-check.mjs": `import { Button, CommandPalette, InputFamily } from "azamat-ui-kit"
import { WorkspaceShell } from "azamat-ui-kit/layout/workspace-shell"
import { ProgressRing } from "azamat-ui-kit/charts/progress-ring"
import { ActionSystem } from "azamat-ui-kit/patterns/action-system"

const required = [Button, CommandPalette, InputFamily, WorkspaceShell, ProgressRing, ActionSystem]

if (required.some((entry) => typeof entry !== "function" && typeof entry !== "object")) {
  throw new Error("Next fixture import contract failed")
}
`,
      },
    })
  } finally {
    await fsExtra.remove(fixtureRoot)
  }
}

await main()
