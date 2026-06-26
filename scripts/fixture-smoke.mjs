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
    if (/from\s+["']azamat-ui-kit\/[^"']+["']/.test(contents)) {
      throw new Error("Fixture source must not use package subpath imports. Use package root only.")
    }
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
        "src/main.tsx": `import {
  Button,
  DataTable,
  ToastProvider,
  Input,
  Select,
  AsyncSelect,
  FormInput,
  InfoCard,
  CommandPalette,
  ProgressCard,
  RightClickMenu,
} from "azamat-ui-kit"

const value = [
  Button,
  DataTable,
  ToastProvider,
  Input,
  Select,
  AsyncSelect,
  FormInput,
  InfoCard,
  CommandPalette,
  ProgressCard,
  RightClickMenu,
]

export default value
`,
        "src/runtime-check.mjs": `import {
  Button,
  DataTable,
  ToastProvider,
  Input,
  Select,
  AsyncSelect,
  FormInput,
  InfoCard,
  CommandPalette,
  ProgressCard,
  RightClickMenu,
} from "azamat-ui-kit"

const required = [
  Button,
  DataTable,
  ToastProvider,
  Input,
  Select,
  AsyncSelect,
  FormInput,
  InfoCard,
  CommandPalette,
  ProgressCard,
  RightClickMenu,
]

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
        "app/page.tsx": `"use client"

import {
  Button,
  CommandPalette,
  Input,
  InfoCard,
  ProgressCard,
  Calendar,
  DatePicker,
  DateRangePicker,
  DataTablePagination,
  useSessionStorageState,
  useToast,
} from "azamat-ui-kit"

function DemoToastButton() {
  const { addToast } = useToast()

  return (
    <button
      type="button"
      onClick={() => addToast({ title: "demo", description: "ready" })}
    >
      Show toast
    </button>
  )
}

export default function Page() {
  const [value, setValue] = useSessionStorageState("fixture", "off")

  return (
    <div>
      <Button>Open</Button>
      <CommandPalette open={false} onOpenChange={() => {}} groups={[]} />
      <Input placeholder="Search" value={value} onChange={() => setValue("changed")} />
      <InfoCard title="Demo card" description="Root exports from package only." />
      <ProgressCard title="Load" value={70} />
      <Calendar />
      <DatePicker value="2026-01-01" onValueChange={() => {}} />
      <DateRangePicker value={{ from: new Date(), to: new Date() }} onValueChange={() => {}} />
      <DataTablePagination
        pageIndex={1}
        pageSize={10}
        rowCount={30}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
      <DemoToastButton />
    </div>
  )
}
`,
        "src/runtime-check.mjs": `import {
  Button,
  CommandPalette,
  Input,
  InfoCard,
  ProgressCard,
  Calendar,
  DatePicker,
  DateRangePicker,
  DataTablePagination,
  useSessionStorageState,
  useToast,
} from "azamat-ui-kit"

const required = [
  Button,
  CommandPalette,
  Input,
  InfoCard,
  ProgressCard,
  Calendar,
  DatePicker,
  DateRangePicker,
  DataTablePagination,
  useSessionStorageState,
  useToast,
]

const hasHooks = useSessionStorageState && useToast

if (!hasHooks) {
  throw new Error("Root export contract for hooks failed")
}

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
