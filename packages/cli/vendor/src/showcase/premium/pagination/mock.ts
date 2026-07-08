import type { ComponentDemoMock } from "../types"

export const paginationMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { Pagination } from "azix"

export function Example() {
  const [page, setPage] = React.useState(6)

  return (
    <Pagination
      page={page}
      pageCount={18}
      onPageChange={setPage}
      showEdges
    />
  )
}`,
  highlights: ["Controlled page state", "First/last edge actions", "Ellipsis generation for large datasets", "Compact navigation for tables and audit logs"],
  scenarios: [
    { title: "Orders table", description: "Switch through long operational tables without losing search and filters." },
    { title: "Audit trail", description: "Keep log browsing compact while preserving direct jumps to early and late pages." },
    { title: "Review queue", description: "Let teams move page-by-page through pending approvals." },
  ],
  capabilityNotes: [
    "Keep pagination controlled so URL params or table state remain the source of truth.",
    "Use `showEdges` when the dataset spans many pages.",
    "Pair with visible total count so users know how far they are in the list.",
  ],
}
