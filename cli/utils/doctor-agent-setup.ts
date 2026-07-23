import path from "path"
import fs from "fs-extra"

import { logger } from "./logger"

const requiredSkills = [
  "tembro-component-development",
  "design-system-governance",
  "accessibility-review",
  "testing-and-validation",
  "frontend-architecture",
  "code-review-and-delivery",
]

export function doctorAgentSetup(cwd = process.cwd()) {
  const agentsPath = path.join(cwd, "AGENTS.md")
  const skillsRoot = path.join(cwd, ".agents", "skills")
  const missing = requiredSkills.filter((name) => !fs.existsSync(path.join(skillsRoot, name, "SKILL.md")))
  const empty = requiredSkills.filter((name) => {
    const filePath = path.join(skillsRoot, name, "SKILL.md")
    return fs.existsSync(filePath) && fs.statSync(filePath).size === 0
  })

  if (!fs.existsSync(agentsPath)) {
    logger.warn("WARN ai-agents: AGENTS.md topilmadi. `npx tembro agents` ishlating.")
    return { status: "warn" as const, missing: ["AGENTS.md", ...missing], empty }
  }

  if (missing.length || empty.length) {
    logger.warn(`WARN ai-agents: ${missing.length} skill missing, ${empty.length} empty. ` +
      "`npx tembro agents` preserves custom files; use --overwrite only for generated files.")
    return { status: "warn" as const, missing, empty }
  }

  logger.success(`PASS ai-agents: AGENTS.md and ${requiredSkills.length} focused skills found.`)
  return { status: "pass" as const, missing: [], empty: [] }
}
