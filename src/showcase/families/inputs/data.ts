export type WorkspaceOption = {
  value: string
  label: string
  description: string
  data: {
    team: string
    status: "Live" | "Draft" | "Review"
  }
}

export const workspaceOptions: WorkspaceOption[] = [
  { value: "acme-dashboard", label: "Acme Dashboard", description: "Core analytics workspace", data: { team: "Growth", status: "Live" } },
  { value: "crm-workspace", label: "CRM Workspace", description: "Deals and pipeline control", data: { team: "Sales", status: "Review" } },
  { value: "store-command", label: "Store Command", description: "Commerce operations shell", data: { team: "Commerce", status: "Live" } },
  { value: "finance-dock", label: "Finance Dock", description: "Billing and payout center", data: { team: "Finance", status: "Draft" } },
  { value: "creator-hub", label: "Creator Hub", description: "Content and campaign surface", data: { team: "Marketing", status: "Live" } },
  { value: "ops-center", label: "Ops Center", description: "Internal service operations", data: { team: "Operations", status: "Review" } },
]

export const defaultWorkspaceGroups = [
  {
    label: "Pinned",
    options: workspaceOptions.slice(0, 2),
  },
  {
    label: "All workspaces",
    options: workspaceOptions.slice(2),
  },
]

export const environmentOptions = [
  { value: "production", label: "Production", description: "Public customer-facing traffic", keywords: ["prod", "live"] },
  { value: "staging", label: "Staging", description: "Pre-release QA and review", keywords: ["preview", "qa"] },
  { value: "development", label: "Development", description: "Internal local build flow", keywords: ["dev", "sandbox"] },
]

export const densityOptions = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
]
