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
    command: "npx azamat-ui-kit add dashboard-01",
    code: `import { AppShell, StatCard, DataTableToolbar } from "@azamat/ui"\n\nexport function Dashboard01() {\n  return <AppShell />\n}`,
    tone: "dashboard",
  },
  {
    slug: "table-01",
    title: "Advanced invoice table",
    command: "npx azamat-ui-kit add table-01",
    code: `import { DataTable, DataTableToolbar, DataTablePagination } from "@azamat/ui"\n\nexport function Table01() {\n  return <DataTable />\n}`,
    tone: "table",
  },
  {
    slug: "auth-01",
    title: "Authentication screen",
    command: "npx azamat-ui-kit add auth-01",
    code: `import { Input, Button } from "@azamat/ui"\n\nexport function Auth01() {\n  return <SignInScreen />\n}`,
    tone: "auth",
  },
  {
    slug: "product-01",
    title: "Commerce product detail",
    command: "npx azamat-ui-kit add product-01",
    code: `import { Badge, Button } from "@azamat/ui"\n\nexport function Product01() {\n  return <ProductDetail />\n}`,
    tone: "product",
  },
  {
    slug: "command-01",
    title: "Command palette",
    command: "npx azamat-ui-kit add command-01",
    code: `import { CommandPalette } from "@azamat/ui"\n\nexport function Command01() {\n  return <CommandPalette />\n}`,
    tone: "command",
  },
  {
    slug: "calendar-01",
    title: "Calendar and date picker",
    command: "npx azamat-ui-kit add calendar-01",
    code: `import { Calendar, DatePicker } from "@azamat/ui"\n\nexport function Calendar01() {\n  return <Calendar />\n}`,
    tone: "calendar",
  },
  {
    slug: "upload-01",
    title: "Upload workspace",
    command: "npx azamat-ui-kit add upload-01",
    code: `import { FileUpload, ImageUpload } from "@azamat/ui"\n\nexport function Upload01() {\n  return <FileUpload />\n}`,
    tone: "upload",
  },
]

export function getPreviewSurface(slug: string) {
  return previewSurfaceCatalog.find((item) => item.slug === slug) ?? null
}
