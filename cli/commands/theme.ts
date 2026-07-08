import path from "path"
import fs from "fs-extra"

import { logger } from "../utils/logger"
import { upsertThemeCss } from "../utils/upsert-theme-css"

type TembroConfig = {
  cssPath?: string
  globalCssPath?: string
}

export async function themeCommand(cssPathArg?: string) {
  const cwd = process.cwd()
  const configPath = path.join(cwd, "tembro.json")

  const config = fs.existsSync(configPath)
    ? ((await fs.readJson(configPath)) as TembroConfig)
    : {}

  const cssPath = cssPathArg ?? config.cssPath ?? config.globalCssPath ?? "src/index.css"
  const targetPath = await upsertThemeCss({ cwd, cssPath })

  logger.success(`Tembro theme CSS yangilandi: ${targetPath}`)
}
