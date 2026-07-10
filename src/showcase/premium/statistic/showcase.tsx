import { Badge, ProgressRing, Statistic, StatisticCard, StatisticGrid, TrendCard } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function StatisticShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Statistic is the KPI surface, not a generic card clone</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use the base statistic when the number matters most. Promote to StatisticCard or StatisticGrid when several metrics need shared structure.
        </p>
      </section>

      <section className={panelClass}>
        <StatisticGrid columns={3}>
          <StatisticCard label="Revenue" value="$24.8k" change="+12.4%" trend="up" description="vs last 30 days" />
          <StatisticCard label="Errors" value="14" change="-3.1%" trend="down" description="production incidents" />
          <StatisticCard label="Adoption" value="86%" description="workspace activation rate" action={<Badge variant="secondary">Live</Badge>} />
        </StatisticGrid>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
            <Statistic
              label="Publish latency"
              value="1.8s"
              suffix="avg"
              change="-0.4s"
              trend="down"
              description="from the previous release window"
            />
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Keep labels short and units clear. Users should understand the value before reading the description.</p>
              <p>Trend color should reinforce meaning, not carry the whole message alone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_240px]">
          <TrendCard title="Release velocity" value="24" change="+3" trend="up" description="completed this sprint" sparkline={[8, 10, 9, 14, 18, 19, 24]} />
          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <ProgressRing value={76} label="76%" description="coverage" tone="success" />
          </div>
        </div>
      </section>
    </div>
  )
}
