import type { FamilyDemoMock } from "../types"

export const layoutFamilyMock: FamilyDemoMock = {
  code: `import { AppShell, AppHeader, AppSidebar, PageHeader, StatCard } from "azamat-ui-kit"\n\nexport function Example() {\n  return <AppShell />\n}`,
  highlights: ["App shell composition", "Sidebar navigation", "Page headers", "Dashboard stat surfaces"],
  scenarios: [
    { title: "Admin workspace", description: "Combine shell, sidebar and stat cards into a dense admin product." },
    { title: "Analytics overview", description: "Use cards and page headers to structure KPI-heavy screens." },
    { title: "Nested navigation", description: "Keep route context visible with breadcrumbs and section headers." },
  ],
  metrics: [
    { label: "Exports", value: "8" },
    { label: "Layouts", value: "3" },
    { label: "Status", value: "Stable" },
  ],
}

