import type { ComponentDemoMock } from "../types"

export const propertyGridMock: ComponentDemoMock = {
  code: `import { PropertyGrid } from "@/index"

export function Example() {
  return (
    <PropertyGrid
      columns={3}
      items={[
        { key: "owner", label: "Owner", value: "Azamat Jurayev" },
        { key: "status", label: "Status", value: "Ready for review" },
        { key: "version", label: "Version", value: "0.3.27" },
      ]}
    />
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add property-grid",
  highlights: [
    "Dense key/value metadata layout",
    "Responsive columns with optional span support",
    "Useful for entity details, release summaries, and integration metadata",
  ],
  scenarios: [
    { title: "Entity details", description: "Render many small facts without a full description list layout." },
    { title: "Release summary", description: "Group ownership, version and environment metadata." },
    { title: "Integration card", description: "Show endpoints, modes and dates in a compact details grid." },
  ],
}
