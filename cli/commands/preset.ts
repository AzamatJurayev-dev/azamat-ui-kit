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

export async function presetCommand(name: string, options: PresetCommandOptions = {}) {
  const files = presetFiles[name]
  if (!files) {
    logger.error(`Preset topilmadi: ${name}`)
    process.exit(1)
  }

  const cwd = process.cwd()
  const configPath = path.join(cwd, "azamat-ui.json")
  if (!fs.existsSync(configPath)) {
    logger.error("azamat-ui.json topilmadi. Avval init qiling.")
    process.exit(1)
  }

  const config = (await fs.readJson(configPath)) as PresetInitConfig
  const packageRoot = getPackageRootFromImportMeta(import.meta.url)

  for (const item of files) {
    const source = path.join(packageRoot, item.source)
    const target = path.join(cwd, resolveTarget(item.target, config))
    if (options.dryRun) {
      logger.info(`[dry-run] ${item.source} -> ${path.relative(cwd, target)}`)
      continue
    }
    if (fs.existsSync(target) && !options.overwrite) {
      logger.warn(`${path.relative(cwd, target)} allaqachon mavjud.`)
      continue
    }
    await fs.ensureDir(path.dirname(target))
    await fs.writeFile(target, applyAlias(await fs.readFile(source, "utf8"), config.alias))
    logger.success(`${path.relative(cwd, target)} qo‘shildi.`)
  }
}
