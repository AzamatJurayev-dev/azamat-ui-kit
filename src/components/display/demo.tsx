import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const displayShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("description-list", "DescriptionList", "display", "Structured key-value details for entity, invoice and profile pages."),
  component("progress", "Progress", "display", "Linear progress with label, value formatter, tone and indeterminate state."),
  component("timeline", "Timeline", "display", "Vertical or horizontal event stream for workflow history."),
  component("status-dot", "StatusDot", "display", "Tiny live status indicator with optional pulse animation."),
  component("notification-center", "NotificationCenter", "display", "Compact activity and notifications stream."),
  component("status-legend", "StatusLegend", "display", "Explain status meaning and counts in a compact legend."),
])
