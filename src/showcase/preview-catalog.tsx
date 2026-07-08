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
    command: "npx azix init --template next --defaults\nnpx azix add app-sidebar metric-grid data-table",
    code: `import { AppSidebar } from "@/components/layout/app-sidebar"\nimport { MetricGrid } from "@/components/display/metric-grid"\n\nexport function Dashboard01() {\n  return <AppSidebar />\n}`,
    tone: "dashboard",
  },
  {
    slug: "table-01",
    title: "Advanced invoice table",
    command: "npx azix add data-table",
    code: `import { DataTable } from "@/components/data-table/data-table"\n\nexport function Table01() {\n  return <DataTable columns={columns} data={rows} />\n}`,
    tone: "table",
  },
  {
    slug: "auth-01",
    title: "Authentication screen",
    command: "npx azix add input button",
    code: `import { Button } from "@/components/ui/button"\nimport { Input } from "@/components/ui/input"\n\nexport function Auth01() {\n  return (\n    <div className="space-y-3">\n      <Input placeholder="Email" type="email" />\n      <Input placeholder="Password" type="password" />\n      <Button>Sign in</Button>\n    </div>\n  )\n}`,
    tone: "auth",
  },
  {
    slug: "product-01",
    title: "Commerce product detail",
    command: "npx azix add badge button",
    code: `import { Badge } from "@/components/ui/badge"\nimport { Button } from "@/components/ui/button"\n\nexport function Product01() {\n  return (\n    <div className="space-y-2">\n      <Badge>Featured</Badge>\n      <div>Starter kit bundle</div>\n      <Button>Buy now</Button>\n    </div>\n  )\n}`,
    tone: "product",
  },
  {
    slug: "command-01",
    title: "Command palette",
    command: "npx azix add command-palette",
    code: `import { CommandPalette } from "@/components/command/command-palette"\n\nexport function Command01() {\n  return <CommandPalette />\n}`,
    tone: "command",
  },
  {
    slug: "calendar-01",
    title: "Calendar and date picker",
    command: "npx azix add calendar date-picker",
    code: `import { Calendar } from "@/components/calendar/calendar"\n\nexport function Calendar01() {\n  return <Calendar />\n}`,
    tone: "calendar",
  },
  {
    slug: "upload-01",
    title: "Upload workspace",
    command: "npx azix add file-upload image-upload",
    code: `import { FileUpload } from "@/components/upload/file-upload"\n\nexport function Upload01() {\n  return <FileUpload />\n}`,
    tone: "upload",
  },
]

export function getPreviewSurface(slug: string) {
  return previewSurfaceCatalog.find((item) => item.slug === slug) ?? null
}
