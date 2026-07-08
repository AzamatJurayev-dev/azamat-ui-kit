import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const displayShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("description-list", "DescriptionList", "display", "Structured key-value details for entity, invoice and profile pages."),
  component("progress", "Progress", "display", "Linear progress with label, value formatter, tone and indeterminate state."),
  component("progress-circle", "ProgressCircle", "display", "Compact circular progress for sidebars and status cards."),
  component("timeline", "Timeline", "display", "Vertical or horizontal event stream for workflow history."),
  component("status-dot", "StatusDot", "display", "Tiny live status indicator with optional pulse animation."),
  component("user-card", "UserCard", "display", "User summary row with avatar, metadata and actions."),
  component("delta-badge", "DeltaBadge", "display", "Compact positive, negative, and risk deltas for metric summaries."),
  component("notification-center", "NotificationCenter", "display", "Compact activity and notifications stream."),
  component("data-list", "DataList", "display", "Readable title and description rows for compact operational lists."),
  component("status-legend", "StatusLegend", "display", "Explain status meaning and counts in a compact legend."),
  component("trend-card", "TrendCard", "display", "Metric summary card with trend context."),
])
