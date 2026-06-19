import { addCommand } from "./add"
import { presets, type PresetName } from "../presets"
import { logger } from "../utils/logger"

export type PresetCommandOptions = {
  overwrite?: boolean
  dryRun?: boolean
  skipInstall?: boolean
}

function isPresetName(value: string): value is PresetName {
  return value in presets
}

export async function presetCommand(name: string, options: PresetCommandOptions = {}) {
  if (!isPresetName(name)) {
    logger.error(`Preset topilmadi: ${name}`)
    logger.info(`Mavjud presetlar: ${Object.keys(presets).join(", ")}`)
    process.exit(1)
  }

  await addCommand([...presets[name]], options)
}
