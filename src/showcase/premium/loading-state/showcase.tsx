import * as React from "react"

import { Badge, Button, LoadingState } from "@/index"

import type { ComponentDemoProps } from "../types"

const labels: string[] = ["Loading metrics", "Loading table", "Loading details", "Loading export"]
const descriptions = [
  "Preparing dashboard widgets and chart data.",
  "Fetching list rows with filters applied.",
  "Waiting for content details from the API.",
  "Generating a local export file.",
]

export function LoadingStateShowcase({ mode }: ComponentDemoProps) {
  const [index, setIndex] = React.useState(0)
  const [showSecondary, setShowSecondary] = React.useState(mode === "playground")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Pending work</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Loading state should explain what is happening</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              The label and description should tell the user which part of the page is waiting and why. Generic loading with no context is weak documentation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Scoped loading</Badge>
            <Badge variant="outline" className="rounded-full">Clear label</Badge>
          </div>
        </div>
      </section>

      {mode === "playground" ? (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowSecondary((value) => !value)}>
            {showSecondary ? "Hide secondary" : "Show secondary"}
          </Button>
          {labels.map((entry, idx) => (
            <Button key={entry} size="sm" variant={index === idx ? "default" : "outline"} onClick={() => setIndex(idx)}>
              {entry}
            </Button>
          ))}
        </div>
      ) : null}

      <LoadingState label={labels[index]} description={descriptions[index]} />
      {showSecondary ? <LoadingState label={`${labels[index]} (compact)`} description="This is a second loading area inside the same page." /> : null}
    </div>
  )
}
