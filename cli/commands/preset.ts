import { addCommand } from "./add"
import { presetComponents } from "../preset-files"
import { logger } from "../utils/logger"

export type PresetCommandOptions = {
  overwrite?: boolean
  dryRun?: boolean
  skipInstall?: boolean
}

export async function presetCommand(name: string, options: PresetCommandOptions = {}) {
  const components = presetComponents[name]

  if (!components) {
    logger.error(`Preset topilmadi: ${name}`)
    process.exit(1)
  }

  await addCommand(components, options)
}
