import path from "path"
import fs from "fs-extra"
import { logger } from "../utils/logger"
import { getCliNpxCommand } from "../utils/cli-metadata"
import { registry, registryNames, type ComponentRegistryItem } from "../registry"

type DoctorCommandOptions = {
  json?: boolean
}

type TembroConfig = {
  alias?: string
  utilsPath?: string
  componentsPath?: string
  cssPath?: string
  paths?: {
    components?: string
    ui?: string
    hooks?: string
    lib?: string
  }
}

type DoctorCheck = {
  name: string
  status: "pass" | "warn" | "fail"
  message: string
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    return fs.readJsonSync(filePath) as T
  } catch {
    return null
  }
}

function readTextFile(filePath: string) {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch {
    return null
  }
}

function resolveProjectPath(cwd: string, value?: string) {
  if (!value) return null
  return path.resolve(cwd, value)
}

function getConfigPaths(config: TembroConfig) {
  const componentsRoot = config.paths?.components ?? config.componentsPath ?? "src/components"
  const uiPath = config.paths?.ui ?? config.componentsPath ?? path.join(componentsRoot, "ui")
  const libPath = config.paths?.lib ?? path.dirname(config.utilsPath ?? "src/lib/utils.ts")
  const hooksPath = config.paths?.hooks ?? "src/hooks"
  const utilsPath = config.utilsPath ?? path.join(libPath, "utils.ts")

  return {
    componentsRoot,
    uiPath,
    libPath,
    hooksPath,
    utilsPath,
  }
}

function resolveRegistryTarget(target: string, config: TembroConfig) {
  const paths = getConfigPaths(config)

  return target
    .replace("{components}", paths.componentsRoot)
    .replace("{ui}", paths.uiPath)
    .replace("{hooks}", paths.hooksPath)
    .replace("{lib}", paths.libPath)
    .replace("{utils}", paths.utilsPath)
}

function hasTsconfigAlias(cwd: string, alias: string) {
  const tsconfigPaths = ["tsconfig.app.json", "tsconfig.json"].map((fileName) => path.join(cwd, fileName))

  return tsconfigPaths.some((tsconfigPath) => {
    const tsconfig = readJsonFile<{ compilerOptions?: { paths?: Record<string, string[]> } }>(tsconfigPath)
    return Boolean(tsconfig?.compilerOptions?.paths?.[`${alias}/*`])
  })
}

function hasViteAlias(cwd: string, alias: string) {
  const viteConfigPaths = ["vite.config.ts", "vite.config.js", "vite.config.mjs"].map((fileName) =>
    path.join(cwd, fileName),
  )

  return viteConfigPaths.some((viteConfigPath) => {
    const content = readTextFile(viteConfigPath)
    return Boolean(content?.includes(`"${alias}"`) || content?.includes(`'${alias}'`))
  })
}

function getMissingPackages(cwd: string, packages: string[]) {
  const packageJson = readJsonFile<{
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }>(path.join(cwd, "package.json"))
  const installed = new Set([
    ...Object.keys(packageJson?.dependencies ?? {}),
    ...Object.keys(packageJson?.devDependencies ?? {}),
  ])

  return packages.filter((packageName) => !installed.has(packageName))
}

function getRegistryItemTargets(item: ComponentRegistryItem, config: TembroConfig) {
  return (item.files ?? []).map((file) => ({
    source: file.source,
    target: resolveRegistryTarget(file.target, config),
  }))
}

function getCopiedRegistryItems(cwd: string, config: TembroConfig) {
  return registryNames
    .map((name) => registry[name])
    .filter((item) => item.category !== "lib")
    .filter((item) => !item.migrationAliasFor)
    .filter((item) => item.files?.length)
    .filter((item) => getRegistryItemTargets(item, config).some((file) => fs.existsSync(path.join(cwd, file.target))))
}

function getComponentAudit(cwd: string, config: TembroConfig) {
  const copiedItems = getCopiedRegistryItems(cwd, config)
  const missingFiles: string[] = []
  const missingRegistryDependencies: string[] = []
  const packageDependencies = new Set<string>()

  for (const item of copiedItems) {
    for (const file of getRegistryItemTargets(item, config)) {
      if (!fs.existsSync(path.join(cwd, file.target))) {
        missingFiles.push(`${item.name}: ${file.target}`)
      }
    }

    for (const dependency of item.registryDependencies ?? []) {
      const dependencyItem = registry[dependency]
      if (!dependencyItem?.files?.length) continue

      const hasDependencyFiles = getRegistryItemTargets(dependencyItem, config).some((file) =>
        fs.existsSync(path.join(cwd, file.target)),
      )
      if (!hasDependencyFiles) {
        missingRegistryDependencies.push(`${item.name} -> ${dependency}`)
      }
    }

    for (const dependency of item.dependencies ?? []) {
      packageDependencies.add(dependency)
    }
  }

  return {
    copiedItems,
    missingFiles,
    missingRegistryDependencies,
    missingPackages: getMissingPackages(cwd, Array.from(packageDependencies).sort()),
  }
}

function pushCheck(checks: DoctorCheck[], check: DoctorCheck) {
  checks.push(check)
}

function hasTembroThemeTokens(content: string | null) {
  if (!content) return false

  return (
    content.includes("/* tembro:start */") ||
    content.includes("--aui-") ||
    content.includes("--az-")
  )
}

export function doctorCommand(options: DoctorCommandOptions = {}) {
  const cwd = process.cwd()
  const checks: DoctorCheck[] = []
  const packageJsonPath = path.join(cwd, "package.json")
  const configPath = path.join(cwd, "tembro.json")
  const packageJsonExists = fs.existsSync(packageJsonPath)
  const config = readJsonFile<TembroConfig>(configPath)

  pushCheck(checks, {
    name: "package.json",
    status: packageJsonExists ? "pass" : "fail",
    message: packageJsonExists
      ? "package.json topildi."
      : "package.json topilmadi. Commandni React, Vite yoki Next project ichida ishlating.",
  })

  pushCheck(checks, {
    name: "tembro.json",
    status: config ? "pass" : "fail",
    message: config ? "tembro.json topildi." : `tembro.json topilmadi. Avval ${getCliNpxCommand("init")} ishlating.`,
  })

  if (config) {
    const alias = config.alias ?? "@"
    const { componentsRoot, uiPath, libPath, hooksPath } = getConfigPaths(config)
    const cssPath = config.cssPath ?? "src/index.css"
    const missingPaths = [
      ["components", componentsRoot],
      ["ui", uiPath],
      ["lib", libPath],
      ["hooks", hooksPath],
    ].filter(([, relativePath]) => {
      const resolvedPath = resolveProjectPath(cwd, relativePath)
      return !resolvedPath || !fs.existsSync(resolvedPath)
    })

    pushCheck(checks, {
      name: "paths",
      status: missingPaths.length ? "warn" : "pass",
      message: missingPaths.length
        ? `Yetishmayotgan pathlar: ${missingPaths.map(([name, relativePath]) => `${name}=${relativePath}`).join(", ")}`
        : "Configured source paths mavjud.",
    })

    pushCheck(checks, {
      name: "alias",
      status: hasTsconfigAlias(cwd, alias) || hasViteAlias(cwd, alias) ? "pass" : "warn",
      message:
        hasTsconfigAlias(cwd, alias) || hasViteAlias(cwd, alias)
          ? `${alias} alias tsconfig yoki vite configda topildi.`
          : `${alias} alias topilmadi. Import pathlar ishlamasligi mumkin.`,
    })

    const cssContent = readTextFile(path.join(cwd, cssPath))
    const hasThemeTokens = hasTembroThemeTokens(cssContent)
    pushCheck(checks, {
      name: "theme-css",
      status: hasThemeTokens ? "pass" : "warn",
      message: hasThemeTokens
        ? `${cssPath} ichida Tembro tokenlari bor.`
        : `${cssPath} ichida Tembro tokenlari topilmadi. ${getCliNpxCommand(`theme ${cssPath}`)} ishlating.`,
    })

    const componentAudit = getComponentAudit(cwd, config)

    pushCheck(checks, {
      name: "component-files",
      status: componentAudit.missingFiles.length ? "warn" : "pass",
      message: componentAudit.missingFiles.length
        ? `Yetishmayotgan component fayllari: ${componentAudit.missingFiles.slice(0, 8).join(", ")}${
            componentAudit.missingFiles.length > 8 ? ` (+${componentAudit.missingFiles.length - 8})` : ""
          }`
        : `${componentAudit.copiedItems.length} ta copied component file set tekshirildi.`,
    })

    pushCheck(checks, {
      name: "registry-dependencies",
      status: componentAudit.missingRegistryDependencies.length ? "warn" : "pass",
      message: componentAudit.missingRegistryDependencies.length
        ? `Yetishmayotgan registry dependencylar: ${componentAudit.missingRegistryDependencies.slice(0, 8).join(", ")}${
            componentAudit.missingRegistryDependencies.length > 8
              ? ` (+${componentAudit.missingRegistryDependencies.length - 8})`
              : ""
          }`
        : "Copied componentlar uchun registry dependencylar joyida.",
    })

    pushCheck(checks, {
      name: "component-dependencies",
      status: componentAudit.missingPackages.length ? "warn" : "pass",
      message: componentAudit.missingPackages.length
        ? `Copied componentlar uchun yetishmayotgan package dependencylar: ${componentAudit.missingPackages.join(", ")}`
        : "Copied component package dependencylari package.json ichida bor.",
    })
  }

  if (packageJsonExists) {
    const missingBasePackages = getMissingPackages(cwd, [
      "@fontsource-variable/geist",
      "clsx",
      "tailwind-merge",
      "tw-animate-css",
    ])

    pushCheck(checks, {
      name: "base-dependencies",
      status: missingBasePackages.length ? "warn" : "pass",
      message: missingBasePackages.length
        ? `Yetishmayotgan dependencylar: ${missingBasePackages.join(", ")}`
        : "Base dependencylar package.json ichida bor.",
    })
  }

  const failed = checks.filter((check) => check.status === "fail")
  const warnings = checks.filter((check) => check.status === "warn")

  if (options.json) {
    console.log(JSON.stringify({ ok: failed.length === 0, checks }, null, 2))
    return
  }

  for (const check of checks) {
    const message = `${check.status.toUpperCase()} ${check.name}: ${check.message}`
    if (check.status === "pass") logger.success(message)
    if (check.status === "warn") logger.warn(message)
    if (check.status === "fail") logger.error(message)
  }

  if (failed.length) {
    logger.error(`Doctor failed: ${failed.length} fail, ${warnings.length} warn.`)
    process.exit(1)
  }

  if (warnings.length) {
    logger.warn(`Doctor completed with ${warnings.length} warning.`)
    return
  }

  logger.success("Doctor passed. Project Tembro setup looks ready.")
}
