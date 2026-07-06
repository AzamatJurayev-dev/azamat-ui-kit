import type { ComponentDemoMock } from "../types"

function createDataTablePartMock(
  slug: string,
  component: string,
  summary: string
): ComponentDemoMock {
  return {
    code: `import { ${component} } from "azix"\n\nexport function Example() {\n  return <${component} />\n}`,
    cliCommand: `npx azix add ${slug}`,
    highlights: [
      `${component} preview inside a real DataTable shell`,
      "Interaction-focused route",
      "Selection and row behavior proof",
    ],
    scenarios: [
      { title: "Route-level preview", description: summary },
      { title: "Production context", description: "See the helper in the same shell where it is typically used." },
      { title: "Behavior proof", description: "Verify how selection, toolbar and actions interact together." },
    ],
    capabilityNotes: [
      "These routes are intentionally shown inside a real DataTable context instead of isolated fake markup.",
      "Use them to understand interaction boundaries before wiring the helper into a product surface.",
    ],
  }
}

export const dataTablePaginationMock = createDataTablePartMock(
  "data-table-pagination",
  "DataTablePagination",
  "Preview pagination behavior with the real DataTable shell."
)

export const dataTableToolbarMock = createDataTablePartMock(
  "data-table-toolbar",
  "DataTableToolbar",
  "Preview search, visibility and table actions inside a live toolbar context."
)

export const dataTableRowActionsMock = createDataTablePartMock(
  "data-table-row-actions",
  "DataTableRowActions",
  "Preview row-specific actions without breaking row click and selection."
)

export const dataTableActionsColumnMock = createDataTablePartMock(
  "data-table-actions-column",
  "createDataTableActionsColumn",
  "Preview how the reusable actions column helper behaves in a real grid."
)

export const dataTableSelectColumnMock = createDataTablePartMock(
  "data-table-select-column",
  "createDataTableSelectColumn",
  "Preview row selection behavior and bulk state separation."
)

export const dataTableSavedFiltersMock = createDataTablePartMock(
  "data-table-saved-filters",
  "DataTableSavedFilters",
  "Preview saved table views and named filter state restoration."
)
