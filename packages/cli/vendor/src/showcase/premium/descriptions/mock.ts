import type { ComponentDemoMock } from "../types"

export const descriptionsMock: ComponentDemoMock = {
  code: `import { Descriptions } from "@/index"

export function Example() {
  return (
    <Descriptions
      title="Project profile"
      extra={<span className="text-sm text-muted-foreground">Draft</span>}
      items={[
        { key: "owner", label: "Owner", value: "Azamat UI Team" },
        { key: "status", label: "Status", value: "In review" },
        { key: "release", label: "Release", value: "v0.3.27", span: 2 },
        { key: "stack", label: "Tech", value: "React + Tailwind" },
      ]}
    />
  )
}`,
  cliCommand: "npx tembro add descriptions",
  highlights: [
    "Title and metadata layout in a compact two-axis grid",
    "Bordered style with configurable columns",
    "Simple API for label and value metadata",
  ],
  scenarios: [
    { title: "Overview", description: "Use for project metadata and entity summary blocks." },
    { title: "Admin views", description: "Keep important fields readable in dense dashboard tables." },
  ],
}

