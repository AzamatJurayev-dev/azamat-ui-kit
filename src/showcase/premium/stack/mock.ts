import type { ComponentDemoMock } from "../types"

export const stackMock: ComponentDemoMock = {
  code: `import { Button, Stack } from "@/index"

export function Example() {
  return (
    <Stack gap="lg" splitAfter={<Button size="sm">Secondary</Button>}>
      <div className="text-sm">Primary action</div>
      <div className="text-sm">Status line</div>
    </Stack>
  )
}`,
  cliCommand: "npx tembro add stack",
  highlights: [
    "Flexible vertical layout helper",
    "Split insert points without extra wrappers",
    "Consistent spacing with simple gap presets",
  ],
  scenarios: [
    { title: "Form stack", description: "Stable form section spacing." },
    { title: "Card body", description: "Build readable content groups quickly." },
    { title: "Settings page", description: "Keep labels and controls in order." },
  ],
}
