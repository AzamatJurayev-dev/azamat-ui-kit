import { Badge } from "@/index"

export function DisplayFamilyShowcase() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Revenue", "$24,780"],
          ["Customers", "1,429"],
          ["Growth", "+12.8%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
            <p className="aui-text-muted text-sm">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-[0.6fr_1fr]">
        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <p className="font-medium">Status legend</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">Live</Badge>
            <Badge variant="outline">Review</Badge>
            <Badge variant="destructive">Blocked</Badge>
          </div>
        </div>
        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <p className="font-medium">Activity feed</p>
          <div className="aui-text-muted mt-4 space-y-3 text-sm">
            <div>Design system tokens updated</div>
            <div>Table presets synchronized</div>
            <div>Release note draft created</div>
          </div>
        </div>
      </div>
    </div>
  )
}


