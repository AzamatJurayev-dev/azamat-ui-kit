import type { ComponentDemoMock } from "../types"

export const skeletonTableMock: ComponentDemoMock = {
  code: `import { SkeletonTable } from "@/index"

export function Example() {
  return <SkeletonTable rows={4} columns={4} showHeader showToolbar />
}`,
  cliCommand: "npx tembro add skeleton-table",
  highlights: [
    "Compact placeholder for async table loading",
    "Supports header and action bar variants",
    "Good fit during first-load and refetch states",
  ],
  scenarios: [
    { title: "Data pages", description: "Replace with table body after fetch completes." },
    { title: "Search results", description: "Keep layout stable while filters run." },
  ],
}

