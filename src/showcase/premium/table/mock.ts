import type { ComponentDemoMock } from "../types"

export const tableMock: ComponentDemoMock = {
  code: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@azamatjurayevdev/azix-ui"\n\nexport function Example() {\n  return (\n    <Table>\n      <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>\n      <TableBody><TableRow><TableCell>Azamat UI</TableCell></TableRow></TableBody>\n    </Table>\n  )\n}`,
  htmlCode: `<table data-slot="table">\n  <thead><tr><th>Name</th><th>Status</th><th>Revenue</th></tr></thead>\n  <tbody><tr><td>Acme Dashboard</td><td>Live</td><td>$24,780</td></tr></tbody>\n</table>`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add table",
  highlights: ["Header rows", "Body rows", "Hover states", "Compact reporting"],
  relatedBlockSlugs: ["users-table", "invoices-page", "dashboard-starter"],
  scenarios: [
    { title: "User lists", description: "Render compact admin tables with readable structure." },
    { title: "Invoice reports", description: "Present transactional rows with aligned totals." },
    { title: "Revenue summaries", description: "Use table layouts in dashboards and exports." },
    { title: "Mobile stacking strategy", description: "Document how rows and columns should degrade in narrow layouts." },
  ],
  capabilityNotes: [
    "Provides semantic table structure with header, row and cell helpers.",
    "Targets reporting, finance and admin list use cases.",
    "Needs explicit responsive guidance for tablet and mobile layouts.",
    "Should document hover, dense row and aligned numeric column usage.",
  ],
}


