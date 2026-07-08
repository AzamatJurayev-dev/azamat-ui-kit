import path from "path"
import fs from "fs-extra"
import { presetFiles } from "../preset-files"
import { logger } from "../utils/logger"
import { getPackageRootFromImportMeta } from "../utils/package-root"

export type PresetCommandOptions = {
  overwrite?: boolean
  dryRun?: boolean
  skipInstall?: boolean
}

type PresetInitConfig = {
  alias?: string
  utilsPath?: string
  paths?: {
    components?: string
    ui?: string
  }
}

function applyAlias(content: string, alias = "@") {
  return alias === "@" ? content : content.replaceAll("@/", `${alias}/`)
}

function resolveTarget(target: string, config: PresetInitConfig) {
  const components = config.paths?.components ?? "src/components"
  const ui = config.paths?.ui ?? "src/components/ui"
  const utils = config.utilsPath ?? "src/lib/utils.ts"
  return target.replaceAll("{components}", components).replaceAll("{ui}", ui).replaceAll("{utils}", utils)
}

async function copyPresetEntry(source: string, target: string, alias: string | undefined, options: PresetCommandOptions) {
  const sourceStat = await fs.stat(source)

  if (sourceStat.isDirectory()) {
    const entries = await fs.readdir(source, { withFileTypes: true })

    for (const entry of entries) {
      await copyPresetEntry(
        path.join(source, entry.name),
        path.join(target, entry.name),
        alias,
        options,
      )
    }

    return
  }

  if (options.dryRun) {
    logger.info(`[dry-run] ${source} -> ${target}`)
    return
  }
  if (fs.existsSync(target) && !options.overwrite) {
    logger.warn(`${target} allaqachon mavjud.`)
    return
  }

  await fs.ensureDir(path.dirname(target))
  await fs.writeFile(target, applyAlias(await fs.readFile(source, "utf8"), alias))
  logger.success(`${target} qo‘shildi.`)
}

export async function presetCommand(name: string, options: PresetCommandOptions = {}) {
  const files = presetFiles[name]
  if (!files) {
    logger.error(`Preset topilmadi: ${name}`)
    process.exit(1)
  }

  const cwd = process.cwd()
  const configPath = path.join(cwd, "tembro.json")
  if (!fs.existsSync(configPath)) {
    logger.error("tembro.json topilmadi. Avval init qiling.")
    process.exit(1)
  }

  const config = (await fs.readJson(configPath)) as PresetInitConfig
  const packageRoot = getPackageRootFromImportMeta(import.meta.url)

  for (const item of files) {
    const source = path.join(packageRoot, item.source)
    const target = path.join(cwd, resolveTarget(item.target, config))
    await copyPresetEntry(source, target, config.alias, options)
  }
}
