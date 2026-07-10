import type { ComponentDemoMock } from "../types"

export const virtualListMock: ComponentDemoMock = {
  code: `import { VirtualList } from "tembro"

const events = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  title: \`Audit event \${index + 1}\`,
}))

export function Example() {
  return (
    <VirtualList
      items={events}
      height={420}
      estimateSize={56}
      getItemKey={(event) => event.id}
      renderItem={(event) => <div>{event.title}</div>}
    />
  )
}`,
  cliCommand: "npx tembro add virtual-list",
  highlights: [
    "Renders only visible DOM nodes",
    "Dynamic row measurement and overscan",
    "Stable item keys and accessible set metadata",
  ],
  scenarios: [
    { title: "Audit log", description: "Keep tens of thousands of events responsive in a fixed viewport." },
    { title: "Search results", description: "Render large result sets without mounting every result card." },
  ],
}
