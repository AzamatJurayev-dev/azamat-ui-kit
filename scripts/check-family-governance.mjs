import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import * as ts from "typescript"

const root = process.cwd()
const failures = []

function readSource(relativePath) {
  const filePath = path.join(root, relativePath)

  if (!fs.existsSync(filePath)) {
    failures.push(`${relativePath}: file not found`)
    return null
  }

  return ts.createSourceFile(relativePath, fs.readFileSync(filePath, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

function unwrap(node) {
  let current = node

  while (
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isSatisfiesExpression?.(current)
  ) {
    current = current.expression
  }

  return current
}

function evaluate(node, context = {}) {
  const current = unwrap(node)

  if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) {
    return current.text
  }

  if (current.kind === ts.SyntaxKind.TrueKeyword) return true
  if (current.kind === ts.SyntaxKind.FalseKeyword) return false

  if (ts.isIdentifier(current)) {
    if (current.text in context) {
      return context[current.text]
    }

    throw new Error(`unsupported identifier ${current.text}`)
  }

  if (ts.isArrayLiteralExpression(current)) {
    return current.elements.flatMap((element) => {
      if (ts.isSpreadElement(element)) {
        const value = evaluate(element.expression, context)
        if (!Array.isArray(value)) {
          throw new Error(`spread expression must evaluate to an array`)
        }
        return value
      }

      return [evaluate(element, context)]
    })
  }

  if (ts.isObjectLiteralExpression(current)) {
    const result = {}

    for (const property of current.properties) {
      if (ts.isSpreadAssignment(property)) {
        const value = evaluate(property.expression, context)
        if (!value || typeof value !== "object" || Array.isArray(value)) {
          throw new Error(`spread assignment must evaluate to an object`)
        }
        Object.assign(result, value)
        continue
      }

      if (!ts.isPropertyAssignment(property)) {
        throw new Error(`unsupported object property in ${(current.getSourceFile()?.fileName) ?? "source"}`)
      }

      const key = getPropertyName(property.name)
      result[key] = evaluate(property.initializer, context)
    }

    return result
  }

  throw new Error(`unsupported node kind ${ts.SyntaxKind[current.kind]}`)
}

function getPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text
  }

  throw new Error(`unsupported property name kind ${ts.SyntaxKind[name.kind]}`)
}

function getExportedConstValue(sourceFile, exportName, context = {}) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue

    const isExported = statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    if (!isExported) continue

    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === exportName && declaration.initializer) {
        return evaluate(declaration.initializer, context)
      }
    }
  }

  failures.push(`${sourceFile.fileName}: could not find exported const '${exportName}'`)
  return []
}

function collectCatalogComponents(entry) {
  return [
    ...(entry.canonical ?? []).map((component) => ({ component, expectedStatuses: new Set(["canonical", "canonical composed member"]) })),
    ...(entry.members ?? []).map((component) => ({ component, expectedStatuses: new Set(["family-member", "family-member helper"]) })),
    ...(entry.transitional ?? []).map((component) => ({ component, expectedStatuses: new Set(["transitional"]) })),
    ...(entry.advanced ?? []).map((component) => ({ component, expectedStatuses: new Set(["advanced"]) })),
  ]
}

function requireReadmeMentions(readmeText, labels) {
  for (const label of labels) {
    if (!readmeText.includes(label)) {
      failures.push(`README.md is missing '${label}' from the public family docs guidance`)
    }
  }
}

const catalogSource = readSource("src/families/catalog.ts")
const docsGroupsSource = readSource("src/families/docs-groups.ts")
const migrationSource = readSource("src/families/migration-map.ts")
const registryStatusSource = readSource("cli/registry-status.ts")
const rationalizationSource = readSource("src/families/public-surface-rationalization.ts")
const readmePath = path.join(root, "README.md")
const readmeText = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : ""

const additionalPublicFamilies = rationalizationSource
  ? getExportedConstValue(rationalizationSource, "additionalPublicFamilies")
  : []
const additionalDocsGroups = rationalizationSource
  ? getExportedConstValue(rationalizationSource, "additionalDocsGroups")
  : []

const componentFamilyCatalog = catalogSource
  ? getExportedConstValue(catalogSource, "componentFamilyCatalog", { additionalPublicFamilies })
  : []
const componentDocsGroups = docsGroupsSource
  ? getExportedConstValue(docsGroupsSource, "componentDocsGroups", { additionalDocsGroups })
  : []
const componentFamilyMigrationMap = migrationSource ? getExportedConstValue(migrationSource, "componentFamilyMigrationMap") : []
const registryStatus = registryStatusSource ? getExportedConstValue(registryStatusSource, "registryStatus") : {}

const catalogByFamily = new Map(componentFamilyCatalog.map((entry) => [entry.family, entry]))
const docsComponents = new Set(componentDocsGroups.flatMap((group) => group.sections.flatMap((section) => section.components)))

for (const entry of componentFamilyCatalog) {
  for (const { component, expectedStatuses } of collectCatalogComponents(entry)) {
    const migrationEntry = componentFamilyMigrationMap.find(
      (candidate) => candidate.component === component && candidate.family === entry.family,
    )

    if (!migrationEntry) {
      failures.push(`${entry.family}: '${component}' is listed in componentFamilyCatalog but missing from componentFamilyMigrationMap`)
      continue
    }

    if (!expectedStatuses.has(migrationEntry.status)) {
      failures.push(
        `${entry.family}: '${component}' has migration status '${migrationEntry.status}', expected one of ${Array.from(expectedStatuses).join(", ")}`,
      )
    }

    if (!docsComponents.has(component)) {
      failures.push(`${entry.family}: '${component}' is listed in componentFamilyCatalog but missing from componentDocsGroups`)
    }
  }
}

for (const group of componentDocsGroups) {
  const catalogEntry = catalogByFamily.get(group.family)

  if (!catalogEntry) {
    failures.push(`componentDocsGroups '${group.group}' references unknown family '${group.family}'`)
    continue
  }

  if (!(catalogEntry.canonical ?? []).includes(group.primaryComponent)) {
    failures.push(
      `componentDocsGroups '${group.group}' uses primary component '${group.primaryComponent}', but '${group.family}' canonical components are ${(catalogEntry.canonical ?? []).join(", ")}`,
    )
  }

  const seenSectionIds = new Set()
  for (const section of group.sections) {
    if (seenSectionIds.has(section.id)) {
      failures.push(`componentDocsGroups '${group.group}' has duplicate section id '${section.id}'`)
    }

    seenSectionIds.add(section.id)

    for (const component of section.components) {
      const existsInMigration = componentFamilyMigrationMap.some((entry) => entry.component === component)
      if (!existsInMigration) {
        failures.push(`componentDocsGroups '${group.group}' references '${component}', but it is missing from componentFamilyMigrationMap`)
      }
    }
  }
}

for (const [name, status] of Object.entries(registryStatus)) {
  if (status === "experimental" || status === "internal") {
    if (readmeText.includes(`\`${name}\``) && readmeText.includes("Stable today")) {
      failures.push(`README.md mentions '${name}' near stable guidance, but registry status marks it as '${status}'`)
    }
  }
}

requireReadmeMentions(readmeText, [
  "InputFamily",
  "SelectFamily",
  "CardFamily",
  "FormFamily",
  "DataTableFamily",
  "componentFamilyCatalog",
  "componentDocsGroups",
  "componentFamilyMigrationMap",
])

if (failures.length > 0) {
  console.error("Family governance validation failed:\n")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(
  `Family governance validation passed (${componentFamilyCatalog.length} families, ${componentDocsGroups.length} docs groups, ${componentFamilyMigrationMap.length} migration rows).`,
)
