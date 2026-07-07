import type { ComponentDemoMock } from "../types"

export const jsonInputMock: ComponentDemoMock = {
  code: `import { JsonInput } from "@/index"

export function Example() {
  return <JsonInput value='{"name":"azix"}' />
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add json-input",
  highlights: [
    "Validates JSON on edit",
    "Returns parsed payload and validity in callback",
    "Great for admin panels accepting structured config",
  ],
  scenarios: [
    { title: "Webhooks", description: "Validate headers/payload examples before save." },
    { title: "Feature flags", description: "Let power users edit nested JSON settings." },
  ],
}

