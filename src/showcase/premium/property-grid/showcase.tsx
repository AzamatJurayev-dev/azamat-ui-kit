import { Badge, PropertyGrid } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function PropertyGridShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">PropertyGrid packs metadata into a compact surface</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Reach for it when the page needs many small facts and a full DescriptionList would feel too linear.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Release summary metadata</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              The grid layout works well for ownership, dates, environment and deployment facts.
            </p>
            <PropertyGrid
              className="mt-5"
              columns={3}
              items={[
                { key: "owner", label: "Owner", value: "Azamat Jurayev" },
                { key: "status", label: "Status", value: <Badge variant="secondary">Ready</Badge> },
                { key: "version", label: "Version", value: "0.3.27" },
                { key: "environment", label: "Environment", value: "Production" },
                { key: "updated", label: "Updated", value: "Today, 14:40" },
                { key: "notes", label: "Notes", value: "Premium demos expanded for core display and utility routes.", span: 2 },
              ]}
            />
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>PropertyGrid is best for short values. If the content becomes paragraph-length, a linear details layout will read better.</p>
              <p>Use `span` sparingly to keep rhythm predictable across breakpoints.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
