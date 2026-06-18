import type { ComponentDemoMock } from "../types"

export const switchMock: ComponentDemoMock = {
  code: `import { Switch } from "@azamat/ui"\n\nexport function Example() {\n  return <Switch defaultChecked />\n}`,
  cliCommand: "npx azamat-ui@latest add switch",
  highlights: ["Preference toggles", "Settings rows", "Controlled state", "Compact interactions"],
  relatedBlockSlugs: ["settings-form", "sidebar-layout", "dashboard-starter"],
  scenarios: [
    { title: "Workspace settings", description: "Use switches for lightweight on/off preferences." },
    { title: "Environment sync", description: "Mirror behavior across multiple surfaces." },
    { title: "Feature flags", description: "Represent enabled states without modal confirmation." },
    { title: "Inline preference rows", description: "Fit tightly within stacked settings content." },
  ],
  capabilityNotes: [
    "Designed for binary preference control in compact form rows.",
    "Supports controlled checked state and disabled scenarios.",
    "Best shown inside settings cards and preference pages.",
    "Needs examples for explanatory copy and grouped toggles.",
  ],
}

