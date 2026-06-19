export const exportFamilies = [
  "ui",
  "actions",
  "layout",
  "display",
  "inputs",
  "form",
  "feedback",
  "navigation",
  "overlay",
  "patterns",
  "charts",
  "data-table",
  "calendar",
  "upload",
  "command",
  "wizard",
] as const

export type ExportFamily = (typeof exportFamilies)[number]

export function getFamilyExportPattern(family: ExportFamily) {
  return {
    types: `./dist/components/${family}/*.d.ts`,
    import: `./dist/components/${family}/*.js`,
    require: `./dist/components/${family}/*.cjs`,
  }
}
