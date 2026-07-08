import * as React from "react"
import { useForm, useWatch } from "react-hook-form"

import {
  Badge,
  Button,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from "@/index"
import { FormDatePicker } from "@/components/form/form-date-picker"
import { FormDateRangePicker } from "@/components/form/form-date-range-picker"

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
  const [pathname, setPathname] = React.useState("")

  React.useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const form = useForm<DemoValues>({
    defaultValues: {
      name: "Azamat UI",
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
  const slug = pathname.split("/").filter(Boolean).at(-1)

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

  if (slug === "form-search-input") {
    return (
      <FormInput
        control={form.control}
        name="query"
        kind="search"
        label="Search query"
        description="Search wrapper should keep label, hint and result-ready spacing together."
        placeholder="Search workspaces"
      />
    )
  }

  if (slug === "form-password-input") {
    return (
      <FormInput
        control={form.control}
        name="password"
        kind="password"
        label="Workspace password"
        description="Password wrapper keeps toggle behavior inside the same form shell."
        placeholder="Enter secure password"
      />
    )
  }

  if (slug === "form-number-input") {
    return (
      <FormInput
        control={form.control}
        name="budget"
        kind="number"
        label="Budget"
        description="Numeric wrapper keeps parsed value handling inside the field contract."
        min={0}
        max={999999}
      />
    )
  }

  if (slug === "form-phone-input") {
    return (
      <FormInput
        control={form.control}
        name="ownerPhone"
        kind="phone"
        label="Owner phone"
        description="Phone wrapper preserves stable raw value while showing a formatted UI."
      />
    )
  }

  if (slug === "form-date-input") {
    return (
      <FormInput
        control={form.control}
        name="dueDate"
        kind="date"
        label="Due date"
        description="Use the lightweight date input wrapper when string date entry is enough."
      />
    )
  }

  if (slug === "form-date-range-input") {
    return (
      <FormInput
        control={form.control}
        name="period"
        kind="date-range"
        label="Reporting period"
        description="Range input wrapper keeps from/to fields under one shell."
      />
    )
  }

  if (slug === "form-date-picker") {
    return (
      <FormDatePicker
        control={form.control}
        name="dueDate"
        label="Launch date"
        description="Use the picker wrapper when calendar selection matters more than raw typing."
      />
    )
  }

  if (slug === "form-date-range-picker") {
    return (
      <FormDateRangePicker
        control={form.control}
        fromName="periodFrom"
        toName="periodTo"
        label="Launch window"
        description="Popover range picker keeps both fields synchronized inside one wrapper."
      />
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
