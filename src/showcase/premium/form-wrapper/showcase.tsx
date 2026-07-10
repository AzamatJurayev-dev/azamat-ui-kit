import { useForm, useWatch } from "react-hook-form"

import { Badge, Button, FormFieldShell, FormInput, FormSelect, FormSwitch, FormTextarea } from "@/index"

import type { ComponentDemoProps } from "../types"

type DemoValues = {
  name: string
  ownerPhone: string
  budget: number | null
  notes: string
  active: boolean
  status: string
  ownerId: string
}

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Review", value: "review" },
  { label: "Live", value: "live" },
] as const

const workspaceOptions = [
  { value: "workspace-alpha", label: "Workspace Alpha", description: "Core design system route" },
  { value: "workspace-beta", label: "Workspace Beta", description: "CRM rollout workspace" },
  { value: "workspace-gamma", label: "Workspace Gamma", description: "Billing and pricing flows" },
] as const

function loadWorkspaceOptions(search: string) {
  const normalized = search.trim().toLowerCase()
  return Promise.resolve(
    workspaceOptions
      .filter((option) => !normalized || option.label.toLowerCase().includes(normalized))
      .map((option) => ({ ...option }))
  )
}

function loadSelectedWorkspace(value: string) {
  const option = workspaceOptions.find((entry) => entry.value === value)
  return Promise.resolve(option ? { ...option } : null)
}

export function FormWrapperShowcase({ mode }: ComponentDemoProps) {
  const form = useForm<DemoValues>({
    defaultValues: {
      name: "Azamat UI",
      ownerPhone: "+998 90 123 45 67",
      budget: 120,
      notes: "RHF wrapper coverage for control, name, and validation.",
      active: true,
      status: "review",
      ownerId: "workspace-alpha",
    },
  })

  const activeValue = useWatch({ control: form.control, name: "active" })
  const slug = typeof window === "undefined" ? undefined : window.location.pathname.split("/").filter(Boolean).at(-1)

  if (slug === "form-select") {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        <FormSelect control={form.control} name="status" label="Release status" options={[...statusOptions]} />
        <FormSelect
          control={form.control}
          name="ownerId"
          kind="async"
          label="Linked workspace"
          defaultOptions={workspaceOptions.map((option) => ({ ...option }))}
          loadOptions={loadWorkspaceOptions}
          loadSelectedOption={loadSelectedWorkspace}
        />
      </div>
    )
  }

  return (
    <form className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-2">
        <FormFieldShell label="Workspace setup" description="Shared shell for required marker, error flow and spacing." required>
          <FormInput control={form.control} name="name" label="Workspace name" required />
        </FormFieldShell>

        <FormInput control={form.control} name="ownerPhone" kind="phone" label="Owner phone" />
        <FormInput control={form.control} name="budget" kind="number" label="Budget" min={0} max={999999} />
        <FormTextarea control={form.control} name="notes" label="Notes" rows={3} />
      </div>

      <FormSwitch control={form.control} name="active" label="Active" />

      <div className="flex flex-wrap gap-3">
        <Button type="button">Save</Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
        <Badge variant="outline">{mode === "playground" ? "Interactive" : activeValue ? "Active" : "Paused"}</Badge>
      </div>
    </form>
  )
}
