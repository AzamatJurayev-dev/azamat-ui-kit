import { useForm, useWatch } from "react-hook-form"

import { Badge, Button, FormInput, FormSelect, FormSwitch, FormTextarea } from "@/index"

import type { ComponentDemoProps } from "../types"

type DemoValues = {
  name: string
  ownerPhone: string
  budget: number | null
  notes: string
  active: boolean
  query: string
  password: string
  dueDate: string
  period: {
    from: string
    to: string
  }
  periodFrom: string
  periodTo: string
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
      name: "Tembro",
      ownerPhone: "+998 90 123 45 67",
      budget: 120,
      notes: "RHF wrapper coverage for control, name, and validation.",
      active: true,
      query: "billing",
      password: "",
      dueDate: "2026-07-18",
      period: {
        from: "2026-07-01",
        to: "2026-07-14",
      },
      periodFrom: "2026-07-01",
      periodTo: "2026-07-14",
      status: "review",
      ownerId: "workspace-alpha",
    },
  })

  const activeValue = useWatch({ control: form.control, name: "active" })
  const slug = typeof window === "undefined" ? undefined : window.location.pathname.split("/").filter(Boolean).at(-1)

  if (slug === "form-select" || slug === "form-async-select") {
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
        <FormInput
          control={form.control}
          name="name"
          label="Workspace name"
          description="Shared shell keeps required marker, helper text and error spacing aligned."
          required
        />

        <FormInput control={form.control} name="ownerPhone" kind="phone" label="Owner phone" />
        <FormInput control={form.control} name="budget" type="number" label="Budget" min={0} max={999999} />
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
