import type { ShowcaseDemoBundle, ShowcaseDemoDefinition, ShowcaseDemoProps } from "./types"
import { renderShowcasePreview } from "./render-registry-preview"

export function component(
  slug: string,
  componentName: string,
  kind: ShowcaseDemoDefinition["kind"],
  summary: string,
  importName = componentName
): ShowcaseDemoDefinition {
  const readableName = toTitle(slug)

  return {
    slug,
    title: readableName,
    component: componentName,
    kind,
    summary,
    importName,
    highlights: [
      `${readableName} uses the real ${componentName} surface.`,
      "CLI, import and preview stay scoped to this component.",
      "Preview wrappers stay light so the component UI remains visible.",
    ],
    scenarios: [
      {
        title: "Use when",
        description: summary,
      },
      {
        title: "Implementation",
        description: `Add ${slug}, import ${importName}, then pass controlled props where the API requires state.`,
      },
    ],
  }
}

export function createShowcaseDemoRegistry(definitions: ShowcaseDemoDefinition[]) {
  return Object.fromEntries(
    definitions.map((definition) => [
      definition.slug,
      {
        mock: createMock(definition),
        Showcase: (props: ShowcaseDemoProps) => <RegistryShowcase definition={definition} {...props} />,
      } satisfies ShowcaseDemoBundle,
    ])
  ) satisfies Record<string, ShowcaseDemoBundle>
}

function createMock(definition: ShowcaseDemoDefinition) {
  return {
    cliCommand: `npx azamat-ui-kit-cli add ${definition.slug}`,
    code: createCodeSnippet(definition),
    highlights: definition.highlights,
    scenarios: definition.scenarios,
    capabilityNotes: [
      `Add ${definition.slug} into your local source with the CLI.`,
      `Import from your configured components alias after the file is copied.`,
    ],
  }
}

function createCodeSnippet(definition: ShowcaseDemoDefinition) {
  const importName = definition.importName ?? definition.component

  return `import { ${importName} } from "@/components/${definition.slug}"\n\nexport function Demo() {\n  return <${importName} />\n}`
}

function RegistryShowcase({
  definition,
  state,
  setState,
}: ShowcaseDemoProps & {
  definition: ShowcaseDemoDefinition
}) {
  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--aui-page-muted)]">
          {definition.component}
        </p>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--aui-page-foreground)]">
            {definition.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--aui-page-muted)]">{definition.summary}</p>
        </div>
      </header>

      <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4 sm:p-5">
        {renderShowcasePreview(definition, state, setState)}
      </div>
    </div>
  )
}

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
