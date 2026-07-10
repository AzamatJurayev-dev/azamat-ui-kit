import type { ComponentDemoMock } from "../types"

export const typographyMock: ComponentDemoMock = {
  code: `import { Blockquote, Heading, Mark, Text } from "tembro"

export function Example() {
  return (
    <div className="space-y-2">
      <Heading level={3}>Product page</Heading>
      <Text muted>
        <Mark>Typography</Mark> is part of every polished UI.
      </Text>
      <Blockquote>Keep hierarchy tight, readable, and reusable.</Blockquote>
    </div>
  )
}`,
  cliCommand: "npx tembro add typography",
  highlights: ["Heading hierarchy", "Muted and default text sizes", "Blockquote and mark patterns for content-heavy pages"],
  scenarios: [
    { title: "Docs pages", description: "Use components for stable copy rhythm." },
    { title: "Blog layouts", description: "Keep large and small text consistent." },
    { title: "Help center", description: "Support spoilers and highlighted snippets." },
  ],
}
