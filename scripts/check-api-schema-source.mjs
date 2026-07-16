import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

const schemaSource = readFileSync(join(rootDir, "src/showcase/component-api-schema.ts"), "utf8")

const requiredMetadataSlugs = [
  "button",
  "input",
  "select",
  "textarea",
  "data-table",
  "dialog",
  "date-picker",
  "form-input",
]

const requiredPropsBySlug = {
  button: [
    "variant",
    "size",
    "loading",
    "loadingLabel",
    "leftIcon",
    "rightIcon",
    "iconOnly",
    "fullWidth",
    "pressed",
    "aria-label",
  ],
  input: [
    "kind",
    "onValueChange",
    "onDebouncedValueChange",
    "leading",
    "trailing",
    "trailingAction",
    "clearable",
    "onClear",
    "clearLabel",
    "clearOnEscape",
    "helperText",
    "errorText",
    "showCharacterCount",
    "loading",
    "resultCount",
    "shortcut",
    "debounceMs",
  ],
  select: [
    "value",
    "defaultValue",
    "onValueChange",
    "options",
    "groups",
    "placeholder",
    "searchPlaceholder",
    "emptyLabel",
    "emptyMessage",
    "clearLabel",
    "size",
    "clearable",
    "searchable",
    "loading",
    "loadingLabel",
    "showSelectedDescription",
    "renderOption",
    "invalid",
    "onSearchChange",
  ],
  "data-table": [
    "columns",
    "data",
    "features",
    "search",
    "filters",
    "summary",
    "toolbarActions",
    "rowActions",
    "bulkActions",
    "onRefresh",
    "onExport",
    "getRowId",
    "toolbar",
    "toolbarProps",
    "pagination",
    "sorting",
    "columnVisibility",
    "rowSelection",
    "enableRowSelection",
    "renderMobileCard",
    "onRowClick",
    "onRowDoubleClick",
    "density",
    "striped",
    "bordered",
    "stickyHeader",
    "renderExpandedRow",
    "columnPinning",
    "virtualization",
  ],
}

const sourceFilesBySlug = {
  button: ["src/components/ui/button/index.tsx"],
  input: [
    "src/components/ui/input/index.tsx",
    "src/components/ui/input/clearable.tsx",
    "src/components/ui/input/search.tsx",
  ],
  select: ["src/components/ui/select/index.tsx"],
  textarea: ["src/components/ui/textarea/index.tsx"],
  "data-table": [
    "src/components/data-table/data-table.tsx",
    "src/components/data-table/data-table-toolbar.tsx",
  ],
  dialog: ["src/components/ui/dialog/index.tsx"],
  "date-picker": [
    "src/components/calendar/date-picker.tsx",
    "src/components/calendar/calendar.tsx",
  ],
  "form-input": [
    "src/components/form/form-input.tsx",
    "src/components/form/form-field-shell.tsx",
  ],
}

function findSchemaBlock(slug) {
  const key = /^[a-zA-Z_$][\w$]*$/.test(slug) ? `${slug}:` : `"${slug}":`
  const start = schemaSource.indexOf(key)
  if (start === -1) return ""

  let depth = 0
  let inString = false
  let stringChar = ""
  let escaped = false
  let blockStarted = false

  for (let index = start; index < schemaSource.length; index += 1) {
    const char = schemaSource[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === "\\") {
        escaped = true
      } else if (char === stringChar) {
        inString = false
      }
      continue
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true
      stringChar = char
      continue
    }

    if (char === "{") {
      depth += 1
      blockStarted = true
      continue
    }

    if (char === "}") {
      depth -= 1
      if (blockStarted && depth === 0) {
        return schemaSource.slice(start, index + 1)
      }
    }
  }

  return ""
}

function collectSchemaProps(block) {
  return new Set(Array.from(block.matchAll(/\{\s*name:\s*"([^"]+)"/g)).map((match) => match[1]))
}

function sourceContainsProp(slug, prop) {
  const files = sourceFilesBySlug[slug] ?? []
  const propPattern = new RegExp(`(^|[^A-Za-z0-9_$-])${prop.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z0-9_$-]|$)`)

  return files.some((file) => {
    const source = readFileSync(join(rootDir, file), "utf8")
    return propPattern.test(source)
  })
}

const failures = []

for (const slug of requiredMetadataSlugs) {
  const block = findSchemaBlock(slug)
  if (!block) {
    failures.push(`${slug}: missing componentApiSchemas entry`)
    continue
  }

  if (!block.includes('source: "metadata"')) {
    failures.push(`${slug}: schema source must be metadata`)
  }

  const documentedProps = collectSchemaProps(block)
  for (const prop of requiredPropsBySlug[slug] ?? []) {
    if (!documentedProps.has(prop)) {
      failures.push(`${slug}: missing public prop '${prop}' in component API schema`)
    }

    if (!sourceContainsProp(slug, prop)) {
      failures.push(`${slug}: documented prop '${prop}' is not traceable to source component types`)
    }
  }
}

if (failures.length > 0) {
  console.error("API schema source gate failed:")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log("API schema source gate passed")
