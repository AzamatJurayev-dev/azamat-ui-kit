import type { SelectDemoGroup } from "./types"

export const selectDemoGroups: SelectDemoGroup[] = [
  {
    title: "Plan picker",
    options: [
      { value: "starter", label: "Starter" },
      { value: "growth", label: "Growth" },
      { value: "enterprise", label: "Enterprise" },
    ],
  },
  {
    title: "Status filter",
    size: "sm",
    options: [
      { value: "active", label: "Active" },
      { value: "review", label: "Review" },
      { value: "draft", label: "Draft" },
    ],
  },
]
