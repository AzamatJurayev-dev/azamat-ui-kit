import { Badge, CodeBlock } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

const installSnippet = `npx @azamatjurayevdev/azix-ui init
npx @azamatjurayevdev/azix-ui add button input data-table`

const cssSnippet = `:root {
  --aui-card-radius: 18px;
  --aui-card-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
}`

export function CodeBlockShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">CodeBlock keeps docs snippets clean and copyable</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use it for short technical snippets where product docs need clean framing, title, language label and inline copy.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <CodeBlock title="Install" language="bash" code={installSnippet} />
            <CodeBlock title="Token override" language="css" code={cssSnippet} wrap />
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold aui-text-strong">Use when</p>
              <Badge variant="secondary">Docs</Badge>
            </div>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Prefer CodeBlock when the snippet itself is the content. Do not wrap every small inline token in a code panel.</p>
              <p>For long articles or syntax-highlighting needs, you may still layer a richer renderer around the same route.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
