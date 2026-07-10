import type { ComponentDemoMock } from "../types"

export const copyButtonMock: ComponentDemoMock = {
  code: `import { CopyButton } from "tembro"

export function Example() {
  return (
    <CopyButton
      value="sk_live_demo_123"
      copyLabel="Copy token"
      copiedLabel="Copied"
      variant="outline"
      size="sm"
    />
  )
}`,
  cliCommand: "npx tembro add copy-button",
  highlights: [
    "Built-in copied feedback state",
    "Works with the exported Button API surface",
    "Useful for tokens, links, invite codes, and IDs",
  ],
  scenarios: [
    { title: "Token copy", description: "Copy secret-like values without opening a secondary modal." },
    { title: "Share link", description: "Inline copy action beside invite or embed links." },
    { title: "Row action", description: "Small copy affordance inside a dense operational table." },
  ],
}
