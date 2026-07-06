import type { ComponentDemoMock } from "../types"

export const rightClickMenuMock: ComponentDemoMock = {
  code: `import { RightClickMenu } from "azamat-ui-kit"

export function Example() {
  return (
    <RightClickMenu
      items={[
        { label: "Rename" },
        { label: "Duplicate" },
        { label: "Archive" },
      ]}
    >
      <div className="rounded-2xl border border-border bg-card px-4 py-8 text-sm">
        Right click this surface
      </div>
    </RightClickMenu>
  )
}`,
  htmlCode: `<div data-slot="right-click-menu"></div>`,
  cliCommand: "npx azix add right-click-menu",
  highlights: ["Context actions", "Pointer workflow", "Compact menus", "Workspace interactions"],
  relatedBlockSlugs: ["users-table", "crm-dashboard", "dashboard-starter"],
  scenarios: [
    { title: "File-like actions", description: "Useful where users expect desktop-style context menus." },
    { title: "Dense workspaces", description: "Expose secondary row actions without cluttering the default UI." },
    { title: "Power-user flow", description: "Keep advanced actions one right-click away instead of always visible." },
  ],
  capabilityNotes: [
    "Use RightClickMenu only where pointer-first interaction is expected.",
    "Always keep a visible fallback path for touch and keyboard users.",
    "Keep labels short so menus remain scannable.",
    "Reserve it for secondary actions, not the only way to complete a task.",
  ],
}
