import path from "path"
import fs from "fs-extra"
import { logger } from "./utils/logger"

type TembroConfig = {
  alias?: string
  componentsPath?: string
  utilsPath?: string
  paths?: {
    components?: string
    ui?: string
    hooks?: string
    lib?: string
  }
}

export type ShowcaseWriteOptions = {
  cwd: string
  config: TembroConfig
  packageRoot: string
  overwrite?: boolean
  dryRun?: boolean
}

function getComponentsRoot(config: TembroConfig) {
  if (config.paths?.components) return config.paths.components

  const legacyComponentsPath = config.componentsPath ?? "src/components/ui"
  return legacyComponentsPath.endsWith("/ui") || legacyComponentsPath.endsWith("\\ui")
    ? path.dirname(legacyComponentsPath)
    : legacyComponentsPath
}

function getImportPrefix(alias: string, projectPath: string) {
  const normalized = projectPath.replaceAll("\\", "/").replace(/\/$/, "")
  if (normalized === "src") return alias
  if (normalized.startsWith("src/")) return `${alias}/${normalized.slice("src/".length)}`
  return `${alias}/${normalized}`
}

function applyShowcaseAliases(content: string, config: TembroConfig) {
  const alias = config.alias ?? "@"
  const componentsPrefix = getImportPrefix(alias, getComponentsRoot(config))
  const hooksPrefix = getImportPrefix(alias, config.paths?.hooks ?? "src/hooks")
  const libPrefix = getImportPrefix(alias, config.paths?.lib ?? path.dirname(config.utilsPath ?? "src/lib/utils.ts"))

  return content
    .replaceAll("@/components/", `${componentsPrefix}/`)
    .replaceAll("@/hooks/", `${hooksPrefix}/`)
    .replaceAll("@/lib/", `${libPrefix}/`)
    .replaceAll("@/", `${alias}/`)
}

export async function writeShowcaseFiles({
  cwd,
  config,
  packageRoot,
  overwrite,
  dryRun,
}: ShowcaseWriteOptions) {
  const templateRoot = path.join(packageRoot, "templates", "showcase", "src")
  if (!fs.existsSync(templateRoot)) {
    throw new Error(`Showcase template topilmadi: ${path.relative(cwd, templateRoot)}`)
  }

  const files: string[] = []

  async function collectFiles(currentRoot: string) {
    const entries = await fs.readdir(currentRoot, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(currentRoot, entry.name)
      if (entry.isDirectory()) {
        await collectFiles(entryPath)
      } else {
        files.push(entryPath)
      }
    }
  }

  await collectFiles(templateRoot)

  let addedFiles = 0
  let overwrittenFiles = 0
  let skippedFiles = 0

  for (const sourcePath of files) {
    const relativeSource = path.relative(templateRoot, sourcePath)
    const targetPath = path.join(cwd, "src", relativeSource)
    const relativeTarget = path.relative(cwd, targetPath)
    const targetExists = fs.existsSync(targetPath)

    if (dryRun) {
      logger.info(`[dry-run:${targetExists ? "conflict" : "add"}] showcase/${relativeSource} -> ${relativeTarget}`)
      continue
    }

    if (targetExists && !overwrite) {
      skippedFiles += 1
      logger.warn(`${relativeTarget} allaqachon mavjud. O‘tkazib yuborildi. Yangilash uchun --overwrite ishlating.`)
      continue
    }

    await fs.ensureDir(path.dirname(targetPath))
    const sourceContent = await fs.readFile(sourcePath, "utf8")
    await fs.writeFile(targetPath, applyShowcaseAliases(sourceContent, config))

    if (targetExists) {
      overwrittenFiles += 1
      logger.success(`${relativeTarget} yangilandi.`)
    } else {
      addedFiles += 1
      logger.success(`${relativeTarget} qo‘shildi.`)
    }
  }

  if (dryRun) {
    logger.info("Showcase dry run tugadi. Hech qanday fayl o‘zgartirilmadi.")
  } else {
    logger.success(
      `Showcase tayyor: ${addedFiles} ta qo‘shildi, ${overwrittenFiles} ta yangilandi, ${skippedFiles} ta saqlandi.`,
    )
  }

  return { addedFiles, overwrittenFiles, skippedFiles }
}
