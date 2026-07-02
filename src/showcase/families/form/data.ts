export type WorkspaceOption = {
  value: string
  label: string
  description: string
  data: {
    team: string
    status: "Live" | "Draft" | "Review"
  }
}

export type FormValues = {
  workspaceName: string
  status: string
  owner: string
  publishChanges: boolean
  notes: string
}

export const workspaceOptions: WorkspaceOption[] = [
  { value: "azamat-ui", label: "Azamat UI", description: "Public component library", data: { team: "Core", status: "Live" } },
  { value: "crm-pulse", label: "CRM Pulse", description: "Sales workflow module", data: { team: "Sales", status: "Review" } },
  { value: "store-command", label: "Store Command", description: "Commerce operations area", data: { team: "Commerce", status: "Live" } },
  { value: "finance-dock", label: "Finance Dock", description: "Billing admin surface", data: { team: "Finance", status: "Draft" } },
]

export const groupedWorkspaceOptions = [
  { label: "Pinned", options: workspaceOptions.slice(0, 2) },
  { label: "All projects", options: workspaceOptions.slice(2) },
]

export const defaultFormValues: FormValues = {
  workspaceName: "Azamat UI Kit",
  status: "review",
  owner: "azamat-ui",
  publishChanges: true,
  notes: "Public documentation and component routes are being prepared for release.",
}
