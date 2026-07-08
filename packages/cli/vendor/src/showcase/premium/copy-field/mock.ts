import type { ComponentDemoMock } from "../types"

export const copyFieldMock: ComponentDemoMock = {
  code: `import { CopyField } from "@/index"

export function Example() {
  return (
    <CopyField
      label="Webhook signing secret"
      description="Use on the server only."
      value="whsec_demo_value_123"
    />
  )
}`,
  cliCommand: "npx tembro add copy-field",
  highlights: [
    "Label, helper text, value surface, and copy action in one unit",
    "Works well for tokens, endpoints, environment values, and invite links",
    "Monospace value mode for technical strings",
  ],
  scenarios: [
    { title: "Webhook secret", description: "Expose a technical value with safety copy and one clear action." },
    { title: "Endpoint URL", description: "Share a connection string without making the user select text manually." },
    { title: "Invite code", description: "Package title and value together inside a settings screen." },
  ],
}
