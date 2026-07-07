import { Avatar, Badge, List } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

const rows = [
  {
    key: "invoice",
    title: "Invoice #4821 review",
    description: "Finance approval is still waiting on updated tax evidence.",
    avatar: <Avatar name="Finance Team" size="sm" shape="rounded" />,
    extra: <Badge variant="outline">Pending</Badge>,
  },
  {
    key: "deploy",
    title: "Release publish window",
    description: "Documentation and component demo checks passed for the next deploy.",
    avatar: <Avatar name="Release Ops" size="sm" />,
    extra: <Badge variant="secondary">Ready</Badge>,
  },
  {
    key: "design",
    title: "Design audit feedback",
    description: "Spacing and token inconsistencies were reduced across the public catalog.",
    avatar: <Avatar name="Design" size="sm" />,
    extra: <Badge variant="outline">3 notes</Badge>,
  },
]

export function ListShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">List is for compact operational rows</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use it when a full table would be too heavy, but a simple stack of cards would waste space.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Operational queue</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              The exported List keeps title, context and status aligned without forcing table columns.
            </p>
            <List className="mt-5" items={rows} />
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Use List when content is read top-to-bottom and each row can tolerate flexible height.</p>
              <p>If sorting, bulk actions, or stable columns become important, move up to DataTable.</p>
              <p>The `extra` slot should stay compact so the title remains the strongest visual anchor.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
