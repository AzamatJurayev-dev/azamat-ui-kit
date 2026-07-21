export type PreviewSurfaceTone = "dashboard" | "table" | "auth" | "product" | "command" | "calendar" | "upload"

export type PreviewSurfaceRecord = {
  slug: string
  title: string
  command: string
  code: string
  tone: PreviewSurfaceTone
}

export const previewSurfaceCatalog: PreviewSurfaceRecord[] = [
  {
    slug: "dashboard-01",
    title: "Dashboard with sidebar",
    command: "npx tembro init --template next --defaults\nnpx tembro add sidebar chart-card data-table",
    code: `import { Sidebar } from "tembro"\n\nexport function Dashboard01() {\n  return <Sidebar />\n}`,
    tone: "dashboard",
  },
  {
    slug: "table-01",
    title: "Advanced invoice table",
    command: "npx tembro add data-table",
    code: `import { DataTable } from "tembro"\n\nexport function Table01() {\n  return <DataTable columns={columns} data={rows} />\n}`,
    tone: "table",
  },
  {
    slug: "auth-01",
    title: "Authentication screen",
    command: "npx tembro add input button",
    code: `import { Button, Input } from "tembro"\n\nexport function Auth01() {\n  return (\n    <div className="space-y-3">\n      <Input placeholder="Email" type="email" />\n      <Input placeholder="Password" type="password" />\n      <Button>Sign in</Button>\n    </div>\n  )\n}`,
    tone: "auth",
  },
  {
    slug: "product-01",
    title: "Commerce product detail",
    command: "npx tembro add badge button",
    code: `import { Badge, Button } from "tembro"\n\nexport function Product01() {\n  return (\n    <div className="space-y-2">\n      <Badge>Featured</Badge>\n      <div>Starter kit bundle</div>\n      <Button>Buy now</Button>\n    </div>\n  )\n}`,
    tone: "product",
  },
  {
    slug: "command-01",
    title: "Command palette",
    command: "npx tembro add command-palette",
    code: `import { CommandPalette } from "tembro"\n\nexport function Command01() {\n  return <CommandPalette />\n}`,
    tone: "command",
  },
  {
    slug: "calendar-01",
    title: "Calendar and date picker",
    command: "npx tembro add calendar date-picker",
    code: `import { Calendar } from "tembro"\n\nexport function Calendar01() {\n  return <Calendar />\n}`,
    tone: "calendar",
  },
  {
    slug: "upload-01",
    title: "Upload workspace",
    command: "npx tembro add file-upload image-upload",
    code: `import { FileUpload } from "tembro"\n\nexport function Upload01() {\n  return <FileUpload />\n}`,
    tone: "upload",
  },
]

export function getPreviewSurface(slug: string) {
  return previewSurfaceCatalog.find((item) => item.slug === slug) ?? null
}
