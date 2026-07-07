import { Button, KeyboardShortcut } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function KeyboardShortcutShowcase() {
  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed display primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">KeyboardShortcut shows power-user hints without noise</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Keep shortcut chips short and nearby to the action they describe. They should reinforce real behavior, not decorative text.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline">Search routes</Button>
              <KeyboardShortcut keys={["Ctrl", "K"]} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button variant="secondary">Save draft</Button>
              <KeyboardShortcut keys={["Ctrl", "S"]} />
              <Button>Publish</Button>
              <KeyboardShortcut keys={["Shift", "Enter"]} />
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Show shortcuts only where the action is relevant. Repeating the same hint everywhere weakens it.</p>
              <p>Use concise labels like `Ctrl`, `Cmd`, `Shift`, `Enter`, not long prose inside the chip.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
