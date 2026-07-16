export const actionDemoCodeSnippets: Record<string, string> = {
  "action-menu": `import { ActionMenu, Button } from "tembro"

export function Demo() {
  return (
    <ActionMenu
      label="Row actions"
      actions={[
        { key: "open", label: "Open" },
        { key: "duplicate", label: "Duplicate" },
        { key: "archive", label: "Archive", destructive: true },
      ]}
      trigger={<Button variant="outline">Actions</Button>}
    />
  )
}`,
  "button-group": `import { ButtonGroup } from "tembro"

export function Demo() {
  return (
    <ButtonGroup
      items={[
        { key: "day", label: "Day" },
        { key: "week", label: "Week" },
        { key: "month", label: "Month" },
      ]}
    />
  )
}`,
  "quick-action-grid": `import { QuickActionGrid } from "tembro"

export function Demo() {
  return (
    <QuickActionGrid
      columns={3}
      items={[
        { key: "new", label: "New invoice", description: "Create a billing row." },
        { key: "import", label: "Import CSV", description: "Upload operational data." },
        { key: "share", label: "Share", description: "Invite a teammate." },
      ]}
    />
  )
}`,
  "dialog-actions": `import { Button, ButtonGroup } from "tembro"

export function Demo() {
  return (
    <ButtonGroup attached={false}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="outline">Save draft</Button>
      <Button>Publish</Button>
    </ButtonGroup>
  )
}`,
  stepper: `import { Stepper } from "tembro"

export function Demo() {
  return (
    <Stepper
      currentStep="billing"
      steps={[
        { id: "profile", title: "Profile", completed: true },
        { id: "billing", title: "Billing" },
        { id: "review", title: "Review" },
      ]}
      onStepChange={() => undefined}
    />
  )
}`,
}
