import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()

const checks = [
  {
    file: "src/components/layout/app-shell.tsx",
    required: ["aria-label={mobileMenuLabel}", "aria-label={mobileCloseLabel}", "data-slot=\"app-shell-mobile-sidebar\""],
  },
  {
    file: "src/components/command/command-palette.tsx",
    required: ["DialogTitle", "DialogDescription", "autoFocus", "disabledReason", "data-slot=\"command-palette\""],
  },
  {
    file: "src/components/inputs/async-select.tsx",
    required: ["aria-expanded={open}", "aria-label={labels?.clear", "disabled={option.disabled}", "data-slot=\"async-select\""],
  },
  {
    file: "src/components/data-table/data-table.tsx",
    required: ["data-slot=\"data-table\"", "data-disabled={rowDisabled", "aria-hidden=\"true\"", "onDoubleClick"],
  },
  {
    file: "src/components/upload/file-upload.tsx",
    required: ["type=\"file\"", "onFilesChange", "disabled={disabled"],
  },
  {
    file: "src/components/patterns/resource-page.tsx",
    required: ["data-slot=\"resource-page\"", "data-slot=\"resource-page-header\"", "data-slot=\"resource-page-main\""],
  },
  {
    file: "src/components/patterns/form-builder.tsx",
    required: ["data-slot=\"form-builder\"", "type=\"submit\"", "type=\"button\"", "disabled={disabled || isSubmitting}"],
  },
]

const failures = []

for (const check of checks) {
  const filePath = path.join(root, check.file)

  if (!fs.existsSync(filePath)) {
    failures.push(`${check.file}: file not found`)
    continue
  }

  const content = fs.readFileSync(filePath, "utf8")

  for (const pattern of check.required) {
    if (!content.includes(pattern)) {
      failures.push(`${check.file}: missing pattern ${pattern}`)
    }
  }
}

if (failures.length > 0) {
  console.error("Accessibility smoke checks failed:\n")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`Accessibility smoke checks passed (${checks.length} files).`)
