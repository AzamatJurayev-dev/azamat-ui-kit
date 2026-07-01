import { Badge, Button } from "@/index"

export function PatternsFamilyShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        ["Resource page", "List-heavy surface with filters, cards and actions."],
        ["Detail page", "Focused record view with modular content blocks."],
        ["Form builder", "Preset-driven field composer for internal tools."],
      ].map(([title, text], index) => (
        <div key={title} className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-5">
          <div className="flex items-center justify-between">
            <p className="aui-text-strong text-lg font-semibold">{title}</p>
            <Badge variant={index === 2 ? "secondary" : "outline"}>{index === 2 ? "Preset" : "Pattern"}</Badge>
          </div>
          <p className="aui-text-muted mt-3 text-sm leading-6">{text}</p>
          <Button className="mt-4 w-full">{index === 0 ? "Open resources" : index === 1 ? "Open detail" : "Open builder"}</Button>
        </div>
      ))}
    </div>
  )
}

