import path from "path"
import fs from "fs-extra"
import { logger } from "../utils/logger"
import { createAiAgentTemplateFiles, type AiAgentTemplateContext } from "../templates/ai-agent-files"

type AgentsCommandOptions = {
  overwrite?: boolean
  dryRun?: boolean
  quiet?: boolean
}

type TembroConfig = {
  alias?: string
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

function detectTemplate(cwd: string): "vite" | "next" {
  const packageJson = fs.readJsonSync(path.join(cwd, "package.json")) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }
  return dependencies.next || ["next.config.js", "next.config.mjs", "next.config.ts"].some((file) => fs.existsSync(path.join(cwd, file)))
    ? "next"
    : "vite"
}

function getContext(cwd: string): AiAgentTemplateContext {
  const configPath = path.join(cwd, "tembro.json")
  const config = fs.existsSync(configPath) ? fs.readJsonSync(configPath) as TembroConfig : undefined
  const template = detectTemplate(cwd)
  const usesSrc = template === "vite" || fs.existsSync(path.join(cwd, "src", "app"))
  const root = usesSrc ? "src/" : ""

  return {
    template,
    alias: config?.alias ?? "@",
    componentsPath: config?.paths?.components ?? config?.componentsPath ?? `${root}components`,
    uiPath: config?.paths?.ui ?? `${root}components/ui`,
    hooksPath: config?.paths?.hooks ?? `${root}hooks`,
    utilsPath: config?.utilsPath ?? `${root}lib/utils.ts`,
    globalCssPath: config?.globalCssPath ?? config?.cssPath ?? (template === "next" ? `${root}app/globals.css` : "src/index.css"),
  }
}

export async function agentsCommand(options: AgentsCommandOptions = {}) {
  const cwd = process.cwd()
  const packageJsonPath = path.join(cwd, "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error("package.json not found. Run this command inside a project.")
  }

  const files = createAiAgentTemplateFiles(getContext(cwd))
  const written: string[] = []
  const preserved: string[] = []

  for (const file of files) {
    const target = path.join(cwd, file.path)
    if (fs.existsSync(target) && !options.overwrite) {
      preserved.push(file.path)
      continue
    }

    if (!options.dryRun) {
      await fs.ensureDir(path.dirname(target))
      await fs.writeFile(target, file.content, "utf8")
    }
    written.push(file.path)
  }

  if (!options.quiet) {
    if (options.dryRun) logger.info(`AI agent plan: ${written.length} file(s) would be written.`)
    else logger.success(`AI agent setup ready: ${written.length} file(s) written.`)
    if (preserved.length > 0) logger.info(`Preserved existing agent files: ${preserved.length}`)
    logger.info("Root instructions: AGENTS.md")
    logger.info("Skills: .agents/skills/*/SKILL.md")
  }

  return { written, preserved }
}
