import { Avatar, AvatarGroup, Badge } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

const team = [
  { key: "az", name: "Azamat Jurayev", status: "online" as const },
  { key: "sa", name: "Saida Karimova", status: "busy" as const },
  { key: "um", name: "Umid Rakhimov", status: "away" as const },
  { key: "ni", name: "Nigor Akhmedova", status: "online" as const },
  { key: "ja", name: "Jasur Tursunov", status: "offline" as const },
]

export function AvatarShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Avatar handles identity without heavy cards</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use Avatar for lightweight identity surfaces. Promote to UserCard only when profile metadata and actions are truly needed.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Assignee row</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              The component should stay readable in compact operational lists, not only inside profile layouts.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
              <Avatar name="Azamat Jurayev" size="lg" status="online" />
              <div className="min-w-0">
                <p className="text-sm font-semibold aui-text-strong">Azamat Jurayev</p>
                <p className="mt-1 text-sm aui-text-muted">Release owner for the current component pass</p>
              </div>
              <Badge variant="secondary">Online</Badge>
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Size and shape</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Avatar name="AZ" size="xs" />
              <Avatar name="AZ" size="sm" shape="rounded" />
              <Avatar name="AZ" size="default" />
              <Avatar name="AZ" size="lg" shape="square" />
              <Avatar name="AZ" size="xl" shape="rounded" />
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Team summary</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              Grouped avatars work best as a compact cue, not a replacement for a full people management panel.
            </p>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
            <AvatarGroup items={team} max={4} />
          </div>
        </div>
      </section>
    </div>
  )
}
