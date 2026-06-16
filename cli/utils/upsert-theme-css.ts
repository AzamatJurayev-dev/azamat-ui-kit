import path from "path"
import fs from "fs-extra"
import {
  AZAMAT_UI_THEME_END,
  AZAMAT_UI_THEME_START,
  azamatUiThemeCss,
} from "../templates/theme-css"

type UpsertThemeCssOptions = {
  cwd: string
  cssPath: string
}

function hasTailwindImport(content: string) {
  return /@import\s+["']tailwindcss["'];?/.test(content)
}

function ensureTailwindImport(content: string) {
  if (hasTailwindImport(content)) {
    return content
  }

  return `@import "tailwindcss";\n\n${content}`.trimEnd() + "\n"
}

function replaceMarkedBlock(content: string, block: string) {
  const startIndex = content.indexOf(AZAMAT_UI_THEME_START)
  const endIndex = content.indexOf(AZAMAT_UI_THEME_END)

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const before = content.slice(0, startIndex).trimEnd()
    const after = content.slice(endIndex + AZAMAT_UI_THEME_END.length).trimStart()

    return [before, block, after].filter(Boolean).join("\n\n") + "\n"
  }

  return `${content.trimEnd()}\n\n${block}\n`
}

export async function upsertThemeCss({ cwd, cssPath }: UpsertThemeCssOptions) {
  const targetPath = path.resolve(cwd, cssPath)

  await fs.ensureDir(path.dirname(targetPath))

  const currentContent = fs.existsSync(targetPath)
    ? await fs.readFile(targetPath, "utf8")
    : ""

  const withTailwind = ensureTailwindImport(currentContent)
  const nextContent = replaceMarkedBlock(withTailwind, azamatUiThemeCss)

  await fs.writeFile(targetPath, nextContent)

  return targetPath
}
