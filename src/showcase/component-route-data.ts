export const routeWorkspaceOptions = [
  { value: "north", label: "North Region", description: "Sales ops", team: "Sales", status: "Live" },
  { value: "south", label: "South Region", description: "Support team", team: "Support", status: "Review" },
  { value: "west", label: "West Region", description: "Billing operations", team: "Finance", status: "Draft" },
]

export const routeSimpleSelectOptions = [
  { value: "public", label: "Public", description: "Visible to all users", keywords: ["open", "live"] },
  { value: "private", label: "Private", description: "Restricted to invited members", keywords: ["restricted"] },
  { value: "internal", label: "Internal", description: "Only workspace maintainers", keywords: ["team", "ops"] },
  { value: "archived", label: "Archived", description: "Kept for history only", disabled: true, keywords: ["disabled"] },
]

export const routeSavedViews = [
  { value: "billing", label: "Billing", description: "Invoices and payment status" },
  { value: "ops", label: "Operations", description: "Queues and workload" },
  { value: "owners", label: "Owner: Azamat", description: "Assigned records only" },
]
