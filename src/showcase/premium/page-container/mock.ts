import type { ComponentDemoMock } from "../types"

export const pageContainerMock: ComponentDemoMock = {
  code: `import { PageContainer } from "azix"

export function Example() {
  return (
    <PageContainer size="lg">
      <div className="rounded-md border p-4">Page content stays constrained here.</div>
    </PageContainer>
  )
}`,
  highlights: ["Consistent max-width wrapper", "Size presets", "Useful for dashboard and content pages", "Simple integration with layout components"],
  scenarios: [
    { title: "Global page shell", description: "Use as the default wrapper inside AppShell main slot." },
    { title: "Long-form content", description: "Use smaller sizes for forms and full width for tables." },
    { title: "Readable spacing", description: "Pair with responsive spacing utilities from surrounding layouts." },
  ],
  capabilityNotes: [
    "Prefer `lg` or `xl` for heavy forms and tables.",
    "Use `full` when content needs entire width, such as charts.",
    "Wrap page-level cards in a single PageContainer to keep rhythm uniform.",
  ],
}
