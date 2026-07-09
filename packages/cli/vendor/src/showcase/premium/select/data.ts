import type { SelectDemoGroup } from "./types"

export const selectDemoGroups: SelectDemoGroup[] = [
  {
    title: "Plan picker",
    options: [
      { value: "starter", label: "Starter" },
      { value: "growth", label: "Growth", description: "25 seats and shared support" },
      { value: "enterprise", label: "Enterprise", description: "Unlimited seats and priority support" },
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
  {
    title: "Grouped workspace routing",
    options: [
      { value: "north", label: "North Region", description: "Sales operations", keywords: ["sales"] },
      { value: "south", label: "South Region", description: "Support queue", keywords: ["support"] },
      { value: "billing", label: "Billing Desk", description: "Finance team", keywords: ["finance"] },
      { value: "archive", label: "Archive", description: "Read-only records", disabled: true, keywords: ["disabled"] },
    ],
  },
]
