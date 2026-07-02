export const savedViews = [
  { value: "all-pipeline", label: "All pipeline", description: "Full team deal flow" },
  { value: "at-risk", label: "At risk", description: "Overdue and stalled records" },
  { value: "owner-azamat", label: "Owner: Azamat", description: "Personal operating view" },
]

export const defaultFilterChips = [
  { key: "status", label: "Status", value: "Active", tone: "default" as const },
  { key: "segment", label: "Segment", value: "Enterprise", tone: "info" as const },
  { key: "period", label: "Period", value: "This month", tone: "muted" as const },
  { key: "owner", label: "Owner", value: "Assigned", tone: "success" as const },
]

export const statusOptions = [
  { value: "active", label: "Active", description: "Healthy operating records" },
  { value: "review", label: "Review", description: "Needs manual follow-up" },
  { value: "overdue", label: "Overdue", description: "Past expected date" },
]
