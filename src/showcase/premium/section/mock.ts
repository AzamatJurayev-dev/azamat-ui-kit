import type { ComponentDemoMock } from "../types"

export const sectionMock: ComponentDemoMock = {
  code: `import { Button, Section } from "tembro"

export function Example() {
  return (
    <Section
      title="Team members"
      description="Manage who sees this workspace."
      bordered
      actions={<Button size="sm">Manage</Button>}
    >
      <div>Row content</div>
    </Section>
  )
}`,
  cliCommand: "npx tembro add section",
  highlights: ["Header, description and actions in one wrapper", "Bordered mode for page sections", "Reusable container semantics"],
  scenarios: [
    { title: "Overview", description: "Use as dashboard section shell." },
    { title: "Settings", description: "Keep section title and actions aligned." },
    { title: "Detail pages", description: "Consistent structure across multiple blocks." },
  ],
}
