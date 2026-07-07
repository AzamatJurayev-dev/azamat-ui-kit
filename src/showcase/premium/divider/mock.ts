import type { ComponentDemoMock } from "../types"

export const dividerMock: ComponentDemoMock = {
  code: `import { Divider } from "@/index"

export function Example() {
  return (
    <div className="space-y-6">
      <Divider label="Sections" />
      <Divider orientation="horizontal" dashed label="Dashed" />
      <Divider dashed orientation="vertical" />
    </div>
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add divider",
  highlights: [
    "Horizontal divider as labeled group boundary",
    "Vertical divider for compact dense layouts",
    "Dashed style for low-emphasis sections",
  ],
  scenarios: [
    { title: "Settings page", description: "Separate header and settings controls." },
    { title: "Data list", description: "Use a subtle split before action groups." },
    { title: "Card interior", description: "Distinguish primary/secondary areas without extra wrappers." },
  ],
}
