import path from "path"
import fs from "fs-extra"
import {
  AZAMAT_UI_THEME_END,
  AZAMAT_UI_THEME_START,
  getAzamatUiThemeCss,
} from "../templates/theme-css"

type UpsertThemeCssOptions = {
  cwd: string
  cssPath: string
  componentsPath?: string
}

const TEMBRO_CUSTOM_STYLES_START = "/* tembro:custom-styles:start */"
const TEMBRO_CUSTOM_STYLES_END = "/* tembro:custom-styles:end */"

function ensureRequiredImports(content: string) {
  const packages = ["tailwindcss", "tw-animate-css", "@fontsource-variable/geist"]
  let body = content

  for (const packageName of packages) {
    const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    body = body.replace(new RegExp(`^\\s*@import\\s+["']${escapedName}["'];?\\s*`, "gm"), "")
  }

  const imports = packages.map((packageName) => `@import "${packageName}";`).join("\n")
  return `${imports}\n\n${body.trimStart()}`.trimEnd() + "\n"
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

function ensureCustomStylesBlock(content: string) {
  const hasStart = content.includes(TEMBRO_CUSTOM_STYLES_START)
  const hasEnd = content.includes(TEMBRO_CUSTOM_STYLES_END)

  if (hasStart && hasEnd) {
    return content.trimEnd() + "\n"
  }

  const customStylesBlock = `${TEMBRO_CUSTOM_STYLES_START}
/*
 * This block belongs to your application and is preserved by tembro init
 * and tembro theme. Override semantic tokens or data-slot styles here.
 */
@layer theme {
  :root {
    /* --aui-radius-control: 0.5rem; */
  }

  .dark {
    /* Dark theme token overrides. */
  }
}

@layer components {
  /* Example: [data-slot="button"] { border-radius: var(--aui-radius-control); } */
}
${TEMBRO_CUSTOM_STYLES_END}`

  return `${content.trimEnd()}\n\n${customStylesBlock}\n`
}

function normalizeImportPath(filePath: string) {
  return filePath.replaceAll("\\", "/")
}

export async function upsertThemeCss({ cwd, cssPath, componentsPath = "src/components" }: UpsertThemeCssOptions) {
  const targetPath = path.resolve(cwd, cssPath)
  const cssDir = path.dirname(targetPath)
  const componentSourceGlob = path.join(cwd, componentsPath, "**", "*.{ts,tsx}")

  const sourceGlob = normalizeImportPath(path.relative(cssDir, componentSourceGlob))
  const relativeSourceGlob = sourceGlob.startsWith(".") ? sourceGlob : `./${sourceGlob}`

  await fs.ensureDir(path.dirname(targetPath))

  const currentContent = fs.existsSync(targetPath)
    ? await fs.readFile(targetPath, "utf8")
    : ""

  const withTailwind = ensureRequiredImports(currentContent)
  const withManagedTheme = replaceMarkedBlock(withTailwind, getAzamatUiThemeCss(relativeSourceGlob))
  const nextContent = ensureCustomStylesBlock(withManagedTheme)

  await fs.writeFile(targetPath, nextContent)

  return targetPath
}
