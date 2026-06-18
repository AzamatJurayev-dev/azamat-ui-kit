import type { FamilyDemoMock } from "../types"

export const dataTableFamilyMock: FamilyDemoMock = {
  code: `import { DataTable, DataTableToolbar, DataTablePagination } from "@azamat/ui"\n\nexport function Example() {\n  return <DataTable />\n}`,
  highlights: ["Toolbar actions", "Bulk actions", "Row actions", "Visibility and presets"],
  scenarios: [
    { title: "Invoice table", description: "Filter, sort and paginate transactional records." },
    { title: "User management", description: "Apply bulk actions across large row collections." },
    { title: "Preset views", description: "Store analyst-friendly table configurations." },
  ],
  metrics: [
    { label: "Exports", value: "10" },
    { label: "Rows", value: "128" },
    { label: "Status", value: "Stable" },
  ],
}

