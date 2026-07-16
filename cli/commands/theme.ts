import path from "path"
import fs from "fs-extra"

import { logger } from "../utils/logger"
import { upsertThemeCss } from "../utils/upsert-theme-css"

type TembroConfig = {
  cssPath?: string
  globalCssPath?: string
  componentsPath?: string
  paths?: {
    components?: string
  }
}

export async function themeCommand(cssPathArg?: string) {
  const cwd = process.cwd()
  const configPath = path.join(cwd, "tembro.json")

  const config = fs.existsSync(configPath)
    ? ((await fs.readJson(configPath)) as TembroConfig)
    : {}

  const cssPath = cssPathArg ?? config.cssPath ?? config.globalCssPath ?? "src/index.css"
  const componentsPath = config.paths?.components ?? config.componentsPath ?? "src/components"
  const targetPath = await upsertThemeCss({ cwd, cssPath, componentsPath })

  logger.success(`Tembro theme CSS yangilandi: ${targetPath}`)
}
