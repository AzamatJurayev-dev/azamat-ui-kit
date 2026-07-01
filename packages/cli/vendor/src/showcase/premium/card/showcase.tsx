import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/index"

import type { ComponentDemoProps } from "../types"

import { cardDemoProjects } from "./data"

const badgeVariants = ["secondary", "outline", "destructive"] as const
const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function CardShowcase({ state }: ComponentDemoProps) {
  const primaryProject = cardDemoProjects[0]
  const compactProject = cardDemoProjects[1]

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Container</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">One card should hold the whole story</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Show one rich card and one compact card, not extra chrome around them.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Primary</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{primaryProject.title}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Compact</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{state.cardCompact ? "Small" : "Default"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Metrics</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{primaryProject.metrics.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <Card size={state.cardCompact ? "sm" : "default"}>
            <CardHeader>
              <CardTitle>{primaryProject.title}</CardTitle>
              <CardDescription>{primaryProject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {primaryProject.metrics.map((metric) => (
                  <div key={metric} className="rounded-xl border border-[color:var(--aui-divider)] px-4 py-3 text-sm font-medium aui-text-strong">
                    {metric}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>{primaryProject.footer}</CardFooter>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>{compactProject.title}</CardTitle>
              <CardDescription>{compactProject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {compactProject.metrics.map((metric, index) => (
                  <Badge key={metric} variant={badgeVariants[index]}>{metric}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>{compactProject.footer}</CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
