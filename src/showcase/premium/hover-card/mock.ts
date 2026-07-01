import type { ComponentDemoMock } from "../types"

export const hoverCardMock: ComponentDemoMock = {
  code: `import { Avatar, HoverCard } from "azamat-ui-kit"

export function Example() {
  return (
    <HoverCard
      trigger={<Avatar fallback="AJ" />}
      content={<div className="space-y-1"><p className="font-medium">Azamat</p><p className="text-sm text-muted-foreground">Design system owner</p></div>}
    />
  )
}`,
  htmlCode: `<div data-slot="hover-card"></div>`,
  cliCommand: "npx azamat-ui-kit-cli add hover-card",
  highlights: ["Entity preview", "Hover + focus", "Secondary context", "Compact detail card"],
  relatedBlockSlugs: ["crm-dashboard", "users-table", "settings-form"],
  scenarios: [
    { title: "User preview", description: "Reveal compact profile details without opening a full panel." },
    { title: "Card summary", description: "Useful for metrics and owners in dense dashboard layouts." },
    { title: "Secondary context", description: "Show supporting data only when the user intentionally pauses." },
  ],
  capabilityNotes: [
    "HoverCard is for richer secondary context than Tooltip.",
    "Keep content compact; if users need actions, switch to Popover.",
    "Always ensure trigger remains meaningful without the reveal card.",
    "Support focus states so keyboard users can access the same content.",
  ],
}
