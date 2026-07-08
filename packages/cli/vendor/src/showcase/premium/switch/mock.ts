import type { ComponentDemoMock } from "../types"

export const switchMock: ComponentDemoMock = {
  code: `import { useState } from "react"\nimport { Switch } from "azix"\n\nexport function Example() {\n  const [isOn, setIsOn] = useState(true)\n\n  return (\n    <div className="space-y-3">\n      <div className="flex items-center gap-2">\n        <Switch id="workspace-sync" checked={isOn} onCheckedChange={setIsOn} aria-label="Workspace sync" />\n        <label htmlFor="workspace-sync">Workspace sync</label>\n      </div>\n      <Switch id="feature-flag" defaultChecked aria-label="Beta feature" />\n      <Switch id="disabled-switch" disabled aria-label="Disabled switch" />\n    </div>\n  )\n}\n`,
  highlights: ["Preference toggles", "Settings rows", "Controlled state", "Compact interactions", "Accessible labels"],
  relatedBlockSlugs: ["settings-form", "sidebar-layout", "dashboard-starter"],
  scenarios: [
    { title: "Workspace settings", description: "Use switches for lightweight on/off preferences." },
    { title: "Environment sync", description: "Mirror behavior across multiple surfaces." },
    { title: "Feature flags", description: "Represent enabled states without modal confirmation." },
    { title: "Inline preference rows", description: "Fit tightly within stacked settings content." },
  ],
  capabilityNotes: [
    "Designed for binary preference control in compact form rows.",
    "Supports controlled checked state, disabled and readOnly-safe patterns.",
    "Best shown inside settings cards with explanatory copy per row.",
    "Always include an accessible label (id + htmlFor or aria-label).",
  ],
}

