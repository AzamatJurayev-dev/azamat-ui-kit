export type AgentTemplateContext = {
  framework: "vite" | "next"
  componentsPath: string
  uiPath: string
  hooksPath: string
  utilsPath: string
  globalCssPath: string
}

export function createAgentFiles(context: AgentTemplateContext) {
  const projectMap = `- Framework: ${context.framework}\n- Components: ${context.componentsPath}\n- UI primitives: ${context.uiPath}\n- Hooks: ${context.hooksPath}\n- Utilities: ${context.utilsPath}\n- Global CSS: ${context.globalCssPath}`
  const skill = (title: string, purpose: string, checks: string[]) => `# ${title}\n\n## Purpose\n\n${purpose}\n\n## Project map\n\n${projectMap}\n\n## Workflow\n\n${checks.map((check, index) => `${index + 1}. ${check}`).join("\n")}\n\n## Completion criteria\n\n- Keep changes scoped and typed.\n- Preserve existing public behavior unless a breaking change is explicit.\n- Run the most relevant available validation and report anything not run.\n`

  return new Map<string, string>([
    ["AGENTS.md", `# Repository instructions\n\nThis project uses Tembro source-copy components. Prefer improving existing components over creating parallel abstractions. Read the focused playbooks in \`.agents/skills\` before changing UI, architecture, tests, or delivery workflow.\n\n## Project map\n\n${projectMap}\n\n## Core rules\n\n- Treat copied component source as application-owned code.\n- Use semantic theme tokens instead of arbitrary colors.\n- Keep keyboard, focus, loading, empty, error, disabled, and responsive states complete.\n- Do not claim tests passed when they were not run.\n- Keep CLI, registry, docs, examples, and generated paths aligned.\n`],
    [".agents/README.md", `# AI skills\n\nFocused playbooks for agents working in this repository. Open the skill matching the task before implementation. Project paths are generated from the active Tembro configuration.\n`],
    [".agents/skills/tembro-component-development/SKILL.md", skill("Tembro component development", "Build or deepen reusable Tembro components without duplicating the public surface.", ["Inspect the existing component, registry entry, dependencies, demo, and related primitives.", "Define controlled and uncontrolled state, events, refs, composition slots, and recovery states.", "Implement accessibility, responsive behavior, cleanup, and source-copy-safe imports.", "Update registry metadata, examples, and tests together."])],
    [".agents/skills/design-system-governance/SKILL.md", skill("Design system governance", "Keep visual decisions consistent with the Tembro token and component system.", ["Reuse semantic tokens and established variants.", "Check light and dark themes, density, spacing, typography, and focus treatment.", "Avoid one-off component styles when a shared primitive or token is appropriate."])],
    [".agents/skills/accessibility-review/SKILL.md", skill("Accessibility review", "Review UI behavior against semantic, keyboard, focus, and assistive-technology expectations.", ["Check semantic HTML and accessible names.", "Verify keyboard operation, focus order, focus return, and visible focus.", "Connect validation errors and announcements to the relevant controls.", "Check reduced motion, contrast, target size, and disabled behavior."])],
    [".agents/skills/testing-and-validation/SKILL.md", skill("Testing and validation", "Select and run validation appropriate to the changed surface.", ["Run type checks and focused unit or render tests.", "Exercise keyboard, responsive, theme, loading, empty, error, and cleanup states.", "For source-copy integrations, validate a real Vite or Next consumer fixture.", "Report exact commands, results, and remaining limitations."])],
    [".agents/skills/frontend-architecture/SKILL.md", skill("Frontend architecture", "Keep component boundaries, state ownership, client/server behavior, and heavy dependencies maintainable.", ["Separate reusable UI state from business and transport logic.", "Keep browser-only engines behind client boundaries and clean up listeners, timers, workers, and subscriptions.", "Lazy-load heavy integrations where practical and avoid widening the root bundle.", "Keep APIs composable and avoid hidden global state."])],
    [".agents/skills/code-review-and-delivery/SKILL.md", skill("Code review and delivery", "Review and deliver changes with a correctness-first release contract.", ["Review correctness, compatibility, accessibility, dependency impact, and generated-file behavior.", "Keep commits scoped and describe user impact and root cause.", "Update docs and migration notes when public behavior changes.", "Record validation and untested areas explicitly."])],
  ])
}
