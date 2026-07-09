import { DataTableShowcase, dataTableMock } from "@/showcase/premium/data-table"
import {
  DataTablePartShowcase,
  dataTableActionsColumnMock,
  dataTablePaginationMock,
  dataTableRowActionsMock,
  dataTableSavedFiltersMock,
  dataTableSelectColumnMock,
  dataTableToolbarMock,
} from "@/showcase/premium/data-table-parts"

import type { ComponentDemoBundle } from "@/showcase/premium/types"

function createPartBundle(
  slug: "data-table-pagination" | "data-table-toolbar" | "data-table-row-actions" | "data-table-actions-column" | "data-table-select-column" | "data-table-saved-filters",
  mock: ComponentDemoBundle["mock"]
): ComponentDemoBundle {
  return {
    mock,
    Showcase: (props) => <DataTablePartShowcase {...props} slug={slug} />,
  }
}

export const dataTableShowcaseDemoRegistry: Record<string, ComponentDemoBundle> = {
  "data-table": { mock: dataTableMock, Showcase: DataTableShowcase },
  "data-table-pagination": createPartBundle("data-table-pagination", dataTablePaginationMock),
  "data-table-toolbar": createPartBundle("data-table-toolbar", dataTableToolbarMock),
  "data-table-row-actions": createPartBundle("data-table-row-actions", dataTableRowActionsMock),
  "data-table-actions-column": createPartBundle("data-table-actions-column", dataTableActionsColumnMock),
  "data-table-select-column": createPartBundle("data-table-select-column", dataTableSelectColumnMock),
  "data-table-saved-filters": createPartBundle("data-table-saved-filters", dataTableSavedFiltersMock),
}
