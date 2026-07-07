import type { ComponentDemoMock } from "../types"

export const descriptionListMock: ComponentDemoMock = {
  code: `import { DescriptionList } from "@azamatjurayevdev/azix-ui"

export function Example() {
  return (
    <DescriptionList
      title="Invoice details"
      items={[
        { key: "customer", label: "Customer", value: "Acme Growth" },
        { key: "status", label: "Status", value: "Paid" },
        { key: "total", label: "Total", value: "$4,280" },
      ]}
    />
  )
}`,
  highlights: ["Structured key-value layout", "Grid column control", "Header actions and descriptions", "Good for entity, invoice, and profile details"],
  scenarios: [
    { title: "Invoice facts", description: "Display billing metadata in a scannable form." },
    { title: "Workspace profile", description: "Group account settings and ownership information clearly." },
    { title: "Customer summary", description: "Expose key details without writing a custom grid every time." },
  ],
  capabilityNotes: [
    "Description lists work best for static or slow-changing factual data.",
    "Use them when labels matter as much as values.",
    "Avoid forcing long narrative content into this format.",
  ],
}
