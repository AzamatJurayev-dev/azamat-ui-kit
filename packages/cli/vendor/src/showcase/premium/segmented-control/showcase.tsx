import * as React from "react"
import { LayoutGridIcon, Rows3Icon, SlidersHorizontalIcon, Table2Icon } from "lucide-react"

import { Badge, SegmentedControl } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function SegmentedControlShowcase() {
  const [view, setView] = React.useState("board")
  const [density, setDensity] = React.useState("comfortable")

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">SegmentedControl is the inline mode switch</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          Use it when the user should compare mutually-exclusive states immediately, not open a dropdown first.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Workspace view switch</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              The primary use-case is a visible view toggle for board, list, or table layouts.
            </p>
            <div className="mt-5">
              <SegmentedControl
                value={view}
                onValueChange={setView}
                options={[
                  { value: "board", label: "Board", icon: <LayoutGridIcon className="size-4" /> },
                  { value: "list", label: "List", icon: <Rows3Icon className="size-4" /> },
                  { value: "table", label: "Table", icon: <Table2Icon className="size-4" /> },
                ]}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold aui-text-strong">Current surface</p>
                <p className="mt-1 text-xs aui-text-muted">Controlled selection is ready for route state or URL sync.</p>
              </div>
              <Badge variant="secondary">{view}</Badge>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Prefer segmented controls for 2 to 4 options that should stay visible together.</p>
              <p>Once the list grows larger or becomes searchable, move to Select instead.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Density and size tokens</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              Compact admin pages often need a second segmented row for density or behavior mode.
            </p>
            <div className="mt-5 space-y-4">
              <SegmentedControl
                size="sm"
                value={density}
                onValueChange={setDensity}
                options={[
                  { value: "compact", label: "Compact" },
                  { value: "comfortable", label: "Comfortable" },
                  { value: "spacious", label: "Spacious" },
                ]}
              />
              <SegmentedControl
                size="lg"
                fullWidth
                equalWidth
                defaultValue="filters"
                options={[
                  { value: "filters", label: "Filters", icon: <SlidersHorizontalIcon className="size-4" /> },
                  { value: "views", label: "Views", icon: <Rows3Icon className="size-4" /> },
                ]}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] p-4">
            <p className="text-sm font-semibold aui-text-strong">Guidance</p>
            <div className="mt-3 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Use one sentence labels. Long phrases make the rail heavy and unstable.</p>
              <p>Keep the selected segment visually stronger than neighboring options, but do not turn it into a full button row.</p>
              <p>If a segment triggers navigation instead of state, route tabs may be the better primitive.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
