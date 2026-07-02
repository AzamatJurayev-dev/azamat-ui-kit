import * as React from "react"
import { ActivityIcon, CheckCircle2Icon, FolderIcon } from "lucide-react"

import { Badge, EntityCard, FileCard, InfoCard } from "@/index"

import { activityItems, metricCards } from "./data"

export function DisplayFamilyShowcase() {
  const [activeCard, setActiveCard] = React.useState("workspace")

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {metricCards.map((item) => (
          <div key={item.label} className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
            <p className="aui-text-muted text-sm">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</p>
            <p className="aui-text-subtle mt-2 text-sm">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <InfoCard
            eyebrow="Workspace surface"
            title="Azamat UI release rail"
            description="Display components should present density, metadata, actions and emphasis without requiring route-specific styling each time."
            meta="Updated 2 min ago"
            status={<Badge variant="secondary">Live</Badge>}
            content={
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                  <p className="aui-text-muted text-xs uppercase tracking-[0.18em]">Surface</p>
                  <p className="aui-text-strong mt-2 text-sm font-medium">InfoCard</p>
                </div>
                <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                  <p className="aui-text-muted text-xs uppercase tracking-[0.18em]">State</p>
                  <p className="aui-text-strong mt-2 text-sm font-medium">Selected-safe actions</p>
                </div>
                <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                  <p className="aui-text-muted text-xs uppercase tracking-[0.18em]">Use case</p>
                  <p className="aui-text-strong mt-2 text-sm font-medium">Overview, result, summary</p>
                </div>
              </div>
            }
            actions={<Badge variant="outline">Action-safe</Badge>}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <EntityCard
              title="Workspace card"
              description="Composable entity block with media, status and actions."
              icon={<FolderIcon className="size-4" />}
              status={<Badge variant="outline">Review</Badge>}
              meta="Team: Core"
              selected={activeCard === "workspace"}
              onSelect={() => setActiveCard("workspace")}
              actions={<Badge variant="outline">Inspect</Badge>}
            />
            <FileCard
              name="release-notes.md"
              description="Prepared for changelog and docs page."
              meta="Updated 5m ago"
              selected={activeCard === "file"}
              onOpen={() => setActiveCard("file")}
              actions={<Badge variant="outline">Versioned</Badge>}
            />
          </div>
        </div>

        <div className="space-y-4">
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
              {activityItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                  <ActivityIcon className="size-4 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
            <p className="aui-text-muted text-sm">Focused surface</p>
            <p className="aui-text-strong mt-2 text-lg font-semibold">{activeCard === "workspace" ? "Workspace card" : "File card"}</p>
            <p className="aui-text-subtle mt-2 text-sm">Display family now shows actual card surfaces instead of only plain bordered boxes.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">InfoCard</Badge>
              <Badge variant="outline">EntityCard</Badge>
              <Badge variant="outline">FileCard</Badge>
              <Badge variant="outline">Badges</Badge>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2Icon className="size-4" />
              <span>Nested actions stay isolated from parent selection.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
