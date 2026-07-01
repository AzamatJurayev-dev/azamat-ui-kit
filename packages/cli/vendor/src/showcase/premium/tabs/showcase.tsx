import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/index"

import type { ComponentDemoProps } from "../types"

import { tabsDemoPanels } from "./data"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function TabsShowcase({ state, setState }: ComponentDemoProps) {
  const activePanel = tabsDemoPanels.find((panel) => panel.value === state.activeTab)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">View switching</p>
        <h3 className="aui-text-strong mt-3 text-2xl font-semibold tracking-tight">Tabs should read like page sections</h3>
        <p className="aui-text-muted mt-3 max-w-2xl text-sm leading-6">Overview, activity and settings stay separated without turning the screen into a navigation maze.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <div className={panelClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Current tab</p>
          <p className="mt-3 text-lg font-semibold aui-text-strong">{activePanel?.label}</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">The selected view should feel like a real section change, not a tiny state toggle.</p>
        </div>
        <div className={panelClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Sections</p>
          <p className="mt-3 text-lg font-semibold aui-text-strong">{tabsDemoPanels.length} surfaces</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">Use a small number of high-signal tabs so the layout stays readable.</p>
        </div>
        <div className={panelClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Pattern</p>
          <p className="mt-3 text-lg font-semibold aui-text-strong">Page sections</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">Tabs work best when each panel owns a distinct slice of the workflow.</p>
        </div>
      </section>

      <div className={panelClass}>
        <Tabs value={state.activeTab} onValueChange={(value: string) => setState({ activeTab: value as ComponentDemoProps["state"]["activeTab"] })}>
          <TabsList>
            {tabsDemoPanels.map((panel) => (
              <TabsTrigger key={panel.value} value={panel.value}>{panel.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabsDemoPanels.map((panel) => (
            <TabsContent key={panel.value} value={panel.value} className="aui-text-muted mt-4 border-t border-[color:var(--aui-divider)] pt-4 text-sm leading-6">
              {panel.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">
              Active tab: {activePanel?.label}
            </h4>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Change tabs above or jump directly to a common product section.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabsDemoPanels.map((panel) => (
              <Button
                key={panel.value}
                type="button"
                size="sm"
                variant={state.activeTab === panel.value ? "default" : "secondary"}
                onClick={() => setState({ activeTab: panel.value })}
              >
                {panel.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
