import type { ComponentDemoMock } from "../types"

export const commandBarMock: ComponentDemoMock = {
  code: `import { CommandBar, Kbd, Button } from "@/index"

export function Example() {
  return (
    <CommandBar>
      <Kbd>G</Kbd>
      <Button size="sm" variant="ghost">Go to dashboard</Button>
      <Button size="sm">Publish</Button>
    </CommandBar>
  )
}`,
  cliCommand: "npx tembro add command-bar",
  highlights: [
    "Floating action rail for global shortcuts or workflow actions",
    "Top or bottom positioning",
    "Useful when a few persistent actions should stay reachable",
  ],
  scenarios: [
    { title: "Global actions", description: "Keep a small set of route-level actions always reachable." },
    { title: "Keyboard hints", description: "Pair actions with shortcuts inside the same persistent rail." },
    { title: "Review flow", description: "Float approve, reject, and comment actions over long content." },
  ],
}
