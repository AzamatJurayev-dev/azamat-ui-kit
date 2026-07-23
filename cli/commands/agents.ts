import path from "path"
import fs from "fs-extra"

import { logger } from "../utils/logger"
import { createAgentFiles, type AgentTemplateContext } from "../templates/ai-agent-files"

type AgentsCommandOptions = {
  overwrite?: boolean
  dryRun?: boolean
}

type TembroConfig = {
  componentsPath?: string
  utilsPath?: string
  cssPath?: string
  globalCssPath?: string
  paths?: {
    components?: string
    ui?: string
    hooks?: string
    lib?: string
  }
}

function detectFramework(cwd: string): "vite" | "next" {
  const packageJson = fs.existsSync(path.join(cwd, "package.json"))
    ? fs.readJsonSync(path.join(cwd, "package.json")) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
    : {}
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }
  const hasNextConfig = ["next.config.js", "next.config.mjs", "next.config.ts"].some((file) => fs.existsSync(path.join(cwd, file)))
  return dependencies.next || hasNextConfig ? "next" : "vite"
}

function readContext(cwd: string): AgentTemplateContext {
  const framework = detectFramework(cwd)
  const configPath = path.join(cwd, "tembro.json")
  const config = fs.existsSync(configPath) ? fs.readJsonSync(configPath) as TembroConfig : {}
  const usesSrcApp = framework === "next" && fs.existsSync(path.join(cwd, "src", "app"))
  const componentsPath = config.paths?.components ?? config.componentsPath ?? (framework === "vite" || usesSrcApp ? "src/components" : "components")
  const uiPath = config.paths?.ui ?? path.join(componentsPath, "ui")
  const hooksPath = config.paths?.hooks ?? (framework === "vite" || usesSrcApp ? "src/hooks" : "hooks")
  const libPath = config.paths?.lib ?? (framework === "vite" || usesSrcApp ? "src/lib" : "lib")
  const utilsPath = config.utilsPath ?? path.join(libPath, "utils.ts")
  const globalCssPath = config.globalCssPath ?? config.cssPath ?? (framework === "vite" ? "src/index.css" : usesSrcApp ? "src/app/globals.css" : "app/globals.css")

  return { framework, componentsPath, uiPath, hooksPath, utilsPath, globalCssPath }
}

export async function agentsCommand(options: AgentsCommandOptions = {}) {
  const cwd = process.cwd()
  if (!fs.existsSync(path.join(cwd, "package.json"))) {
    logger.error("package.json topilmadi / not found. Commandni project ichida ishlating.")
    process.exitCode = 1
    return
  }

  const files = createAgentFiles(readContext(cwd))
  let created = 0
  let overwritten = 0
  let skipped = 0

  for (const [relativePath, content] of files) {
    const target = path.join(cwd, relativePath)
    const exists = fs.existsSync(target)

    if (options.dryRun) {
      logger.info(`${exists && !options.overwrite ? "SKIP" : exists ? "UPDATE" : "CREATE"} ${relativePath}`)
      continue
    }

    if (exists && !options.overwrite) {
      skipped += 1
      continue
    }

    await fs.ensureDir(path.dirname(target))
    await fs.writeFile(target, content, "utf8")
    if (exists) overwritten += 1
    else created += 1
  }

  if (options.dryRun) {
    logger.info("Dry run complete. No agent files were written.")
    return
  }

  logger.success(`AI agent setup ready: ${created} created, ${overwritten} updated, ${skipped} preserved.`)
  if (skipped > 0) logger.info("Use --overwrite only when generated agent files should replace existing project instructions.")
}
