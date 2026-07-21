import { StatusLegend } from "@/components/display/status-legend"
import { Timeline } from "@/components/display/timeline"
import { EmptyState } from "@/components/patterns/empty-state"

export function PatternsSection() {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-3">
      <EmptyState
        title="EmptyState pattern"
        description="Pattern components are installed: resource pages, settings pages, data view and form builder."
        primaryAction={{ label: "Primary action" }}
        secondaryAction={{ label: "Secondary action", variant: "outline" }}
      />
      <StatusLegend
        title="StatusLegend"
        description="Display module with counts."
        orientation="grid"
        items={[
          { key: "ready", label: "Ready", description: "Can be tested", count: 62, tone: "success" },
          { key: "large", label: "Large components", description: "sidebar, kanban, data-table", count: 8, tone: "info" },
          { key: "forms", label: "Form components", description: "inputs and shells", count: 18, tone: "warning" },
          { key: "overlay", label: "Overlay components", description: "dialog, drawer", count: 3, tone: "default" },
        ]}
      />
      <Timeline
        items={[
          { key: "init", title: "tembro init", description: "Project initialized", time: "done", tone: "success" },
          { key: "add", title: "tembro add", description: "All registry entries copied", time: "done", tone: "success" },
          { key: "show", title: "Workbench", description: "Visible app surface", time: "now", tone: "info" },
        ]}
        pending
        pendingLabel="Manual component QA"
      />
    </div>
  )
}
