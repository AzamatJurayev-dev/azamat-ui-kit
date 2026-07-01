import { Badge, Button } from "@/index"

export function OverlayFamilyShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        ["Confirm dialog", "Irreversible actions with strong intent and footer controls."],
        ["Edit sheet", "Context-aware panel for quick updates and side tasks."],
        ["Modal shell", "Focused overlay for short forms and approvals."],
      ].map(([title, text], index) => (
        <div key={title} className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-5">
          <div className="flex items-center justify-between">
            <p className="aui-text-strong text-lg font-semibold">{title}</p>
            <Badge variant={index === 0 ? "destructive" : "outline"}>{index === 0 ? "Confirm" : "Overlay"}</Badge>
          </div>
          <p className="aui-text-muted mt-3 text-sm leading-6">{text}</p>
          <Button className="mt-4 w-full">{index === 0 ? "Open confirm" : index === 1 ? "Open sheet" : "Open modal"}</Button>
        </div>
      ))}
    </div>
  )
}

