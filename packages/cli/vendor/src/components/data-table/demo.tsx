import { DataTableShowcase, dataTableMock } from "@/showcase/premium/data-table"

import type { ComponentDemoBundle } from "@/showcase/premium/types"

export const dataTableShowcaseDemoRegistry: Record<string, ComponentDemoBundle> = {
  "data-table": { mock: dataTableMock, Showcase: DataTableShowcase },
}
