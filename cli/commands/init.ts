import path from "path"
import fs from "fs-extra"
import prompts from "prompts"
import { logger } from "../utils/logger"
import { detectPackageManager } from "../utils/detect-package-manager"
import { installPackages } from "../utils/install-packages"
import { upsertThemeCss } from "../utils/upsert-theme-css"

const baseDependencies = [
  "@base-ui/react",
  "@fontsource-variable/geist",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-react",
  "tw-animate-css",
  "@tanstack/react-table",
  "react-hook-form",
]

type InitTemplate = "vite" | "next"

type InitCommandOptions = {
  template?: string
  skipInstall?: boolean
}

type InitResponse = {
  installDeps: boolean
  alias: string
  componentsPath: string
  uiPath: string
  hooksPath: string
  utilsPath: string
  globalCssPath: string
  writeThemeCss: boolean
}

const templateDefaults: Record<InitTemplate, Omit<InitResponse, "installDeps" | "writeThemeCss">> = {
  vite: {
    alias: "@",
    componentsPath: "src/components",
    uiPath: "src/components/ui",
    hooksPath: "src/hooks",
    utilsPath: "src/lib/utils.ts",
    globalCssPath: "src/index.css",
  },
  next: {
    alias: "@",
    componentsPath: "components",
    uiPath: "components/ui",
    hooksPath: "hooks",
    utilsPath: "lib/utils.ts",
    globalCssPath: "app/globals.css",
  },
}

function resolveTemplate(value?: string): InitTemplate {
  if (value === "next" || value === "vite") return value

  logger.warn(`Unknown template '${value}'. Falling back to vite defaults.`)
  return "vite"
}

export async function initCommand(options: InitCommandOptions = {}) {
  const cwd = process.cwd()
  const packageJsonPath = path.join(cwd, "package.json")

  if (!fs.existsSync(packageJsonPath)) {
    logger.error("package.json topilmadi / not found. Commandni React, Vite yoki Next project ichida ishlating.")
    process.exit(1)
  }

  const defaults = templateDefaults[resolveTemplate(options.template)]

  const response = (await prompts([
    {
      type: "confirm",
      name: "installDeps",
      message: "Asosiy dependencylarni o‘rnataymi? / Install base dependencies?",
      initial: !options.skipInstall,
    },
    {
      type: "text",
      name: "alias",
      message: "Path alias qanday? / Path alias?",
      initial: defaults.alias,
    },
    {
      type: "text",
      name: "componentsPath",
      message: "Component root qayerda? / Component root?",
      initial: defaults.componentsPath,
    },
    {
      type: "text",
      name: "uiPath",
      message: "UI primitives qayerga yozilsin? / UI primitives path?",
      initial: defaults.uiPath,
    },
    {
      type: "text",
      name: "hooksPath",
      message: "Hooks qayerga yozilsin? / Hooks path?",
      initial: defaults.hooksPath,
    },
    {
      type: "text",
      name: "utilsPath",
      message: "utils.ts qayerga yozilsin? / utils.ts path?",
      initial: defaults.utilsPath,
    },
    {
      type: "text",
      name: "globalCssPath",
      message: "Theme tokenlar qaysi global CSS faylga yozilsin? / Global CSS path?",
      initial: defaults.globalCssPath,
    },
    {
      type: "confirm",
      name: "writeThemeCss",
      message: "Dark/light theme tokenlarni global CSS faylga yozaymi? / Write theme tokens?",
      initial: true,
    },
  ])) as InitResponse

  const packageManager = detectPackageManager(cwd)

  logger.info(`Package manager: ${packageManager}`)

  if (!options.skipInstall && response.installDeps) {
    await installPackages({
      cwd,
      packageManager,
      packages: baseDependencies,
    })
  }

  const utilsPath = response.utilsPath || defaults.utilsPath
  const globalCssPath = response.globalCssPath || defaults.globalCssPath

  const config = {
    style: "default",
    alias: response.alias || defaults.alias,
    componentsPath: response.uiPath || defaults.uiPath,
    utilsPath,
    cssPath: globalCssPath,
    globalCssPath,
    paths: {
      components: response.componentsPath || defaults.componentsPath,
      ui: response.uiPath || defaults.uiPath,
      hooks: response.hooksPath || defaults.hooksPath,
      lib: path.dirname(utilsPath),
    },
  }

  await fs.writeJson(path.join(cwd, "azamat-ui.json"), config, {
    spaces: 2,
  })

  const utilsFullPath = path.join(cwd, utilsPath)
  await fs.ensureDir(path.dirname(utilsFullPath))

  if (!fs.existsSync(utilsFullPath)) {
    await fs.writeFile(
      utilsFullPath,
      `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    )
  }

  if (response.writeThemeCss && globalCssPath) {
    const cssTarget = await upsertThemeCss({
      cwd,
      cssPath: globalCssPath,
    })

    logger.success(`Theme CSS yozildi / written: ${cssTarget}`)
  }

  logger.success("Azamat UI Kit init qilindi / initialized.")
  logger.info("Componentlarni ko‘rish / list components:")
  logger.info("npx azamat-ui-kit list")
  logger.info("Component qo‘shish / add components:")
  logger.info("npx azamat-ui-kit add button input data-table")
  logger.info("Theme CSS ni yangilash / update theme CSS:")
  logger.info("npx azamat-ui-kit theme")
}
