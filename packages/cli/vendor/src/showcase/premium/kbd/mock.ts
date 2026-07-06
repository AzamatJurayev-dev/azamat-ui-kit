import type { ComponentDemoMock } from "../types"

export const kbdMock: ComponentDemoMock = {
  code: `import { Kbd } from "azamat-ui-kit"

export function Example() {
  return (
    <div className="flex items-center gap-2 text-sm">
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open command search.
    </div>
  )
}`,
  htmlCode: `<kbd data-slot="kbd">Ctrl</kbd>`,
  cliCommand: "npx azix add kbd",
  highlights: ["Shortcut tokens", "Size variants", "Inline hints", "Command palette labels"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "settings-form"],
  scenarios: [
    { title: "Command palette", description: "Show shortcuts inline without turning them into bulky badges." },
    { title: "Toolbar hints", description: "Useful in dense product actions where key combos speed up frequent tasks." },
    { title: "Inline docs", description: "Clarify keyboard-driven paths near the action itself." },
  ],
  capabilityNotes: [
    "Use Kbd for short shortcut tokens only.",
    "Keep key labels consistent with platform guidance when possible.",
    "Avoid using Kbd as a general-purpose badge replacement.",
    "Inline command hints should stay secondary to the main action label.",
  ],
}
