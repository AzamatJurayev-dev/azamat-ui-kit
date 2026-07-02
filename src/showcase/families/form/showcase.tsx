import * as React from "react"
import { useForm, useWatch } from "react-hook-form"

import { Badge, Button, FormInput, FormSelect, FormSwitch, FormTextarea } from "@/index"

import type { FamilyDemoProps } from "../types"

import {
  defaultFormValues,
  groupedWorkspaceOptions,
  type FormValues,
  workspaceOptions,
  type WorkspaceOption,
} from "./data"

export function FormFamilyShowcase({ setState }: FamilyDemoProps) {
  const [mode, setMode] = React.useState<"editing" | "submitting" | "saved">("editing")
  const form = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  const publishChanges = useWatch({ control: form.control, name: "publishChanges" })
  const workspaceName = useWatch({ control: form.control, name: "workspaceName" })
  const status = useWatch({ control: form.control, name: "status" })
  const owner = useWatch({ control: form.control, name: "owner" })

  const loadOptions = React.useCallback(async (search: string) => {
    await new Promise((resolve) => window.setTimeout(resolve, 260))

    const query = search.trim().toLowerCase()
    if (!query) return groupedWorkspaceOptions

    return [
      {
        label: "Search results",
        options: workspaceOptions.filter((item) =>
          [item.label, item.description, item.data.team, item.data.status].join(" ").toLowerCase().includes(query)
        ),
      },
    ]
  }, [])

  const loadSelectedOption = React.useCallback(async (value: string) => {
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    return workspaceOptions.find((item) => item.value === value) ?? null
  }, [])

  const onSubmit = form.handleSubmit(async (values) => {
    setMode("submitting")
    await new Promise((resolve) => window.setTimeout(resolve, 420))
    setMode("saved")
    setState({
      notes: `Saved ${values.workspaceName} with ${values.status} status and ${values.publishChanges ? "enabled" : "disabled"} publish sync.`,
    })
  })

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">react-hook-form</Badge>
              <Badge variant="outline">Wrapped fields</Badge>
              <Badge variant="outline">Async entity select</Badge>
              <Badge variant="outline">{form.formState.isDirty ? "Dirty" : "Pristine"}</Badge>
            </div>
            <div>
              <p className="aui-text-strong text-sm font-medium">Settings editor flow</p>
              <p className="aui-text-muted mt-1 text-sm leading-6">
                Wrapped field shell, async entity selection, boolean control, helper copy and submit/reset behavior should read like one coherent form route.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                form.reset(defaultFormValues)
                setMode("editing")
              }}
            >
              Reset
            </Button>
            <Button size="sm" onClick={() => void onSubmit()} disabled={mode === "submitting"}>
              {mode === "submitting" ? "Saving..." : mode === "saved" ? "Saved" : "Save changes"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-4 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-5">
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              void onSubmit()
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput<FormValues>
                control={form.control}
                name="workspaceName"
                label="Workspace name"
                required
                placeholder="Enter workspace name"
                description="Primary title rendered across docs, templates, and component routes."
                fieldClassName="h-11"
              />

              <FormSelect<FormValues>
                control={form.control}
                name="status"
                label="Release status"
                required
                description="Use a controlled select for lifecycle state."
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Review", value: "review" },
                  { label: "Live", value: "live" },
                ]}
                placeholder="Choose status"
              />
            </div>

            <FormSelect
              control={form.control}
              name="owner"
              kind="async"
              label="Linked workspace"
              required
              description="Hydrate saved entity values back into the form and keep async selection inside the same FormSelect API."
              defaultOptions={groupedWorkspaceOptions}
              loadOptions={loadOptions}
              loadSelectedOption={loadSelectedOption}
              labels={{
                placeholder: "Select workspace",
                searchPlaceholder: "Search workspaces...",
                loading: "Loading workspaces...",
                empty: "No workspace found",
              }}
              renderValue={(option: WorkspaceOption) => (
                <span className="inline-flex min-w-0 flex-col text-left">
                  <span className="truncate">{option.label}</span>
                  <span className="aui-text-muted truncate text-xs">{option.data.team}</span>
                </span>
              )}
              renderOption={(option: WorkspaceOption, optionState: { selected: boolean }) => (
                <span className="flex min-w-0 items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{option.label}</span>
                    <span className="aui-text-muted block truncate text-xs">{option.description}</span>
                  </span>
                  <span className={optionState.selected ? "rounded-full aui-surface-strong px-2 py-0.5 text-[11px]" : "aui-text-muted rounded-full bg-[color:var(--aui-surface-muted)] px-2 py-0.5 text-[11px]"}>
                    {option.data.status}
                  </span>
                </span>
              )}
            />

            <FormTextarea<FormValues>
              control={form.control}
              name="notes"
              label="Release notes"
              description="Long-form copy should stay aligned with labels, descriptions and validation shell."
              fieldClassName="min-h-28"
            />

            <FormSwitch<FormValues>
              control={form.control}
              name="publishChanges"
              label="Publish after save"
              description="Demonstrates wrapped boolean controls inside the same form system."
            />
          </form>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-strong text-sm font-medium">Step 1: edit fields</p>
              <p className="aui-text-subtle mt-2 text-sm leading-6">Text, select, async select and textarea stay aligned inside one shell system.</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-strong text-sm font-medium">Step 2: track dirty</p>
              <p className="aui-text-subtle mt-2 text-sm leading-6">Pristine and dirty state remain visible without building custom page-specific glue.</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="aui-text-strong text-sm font-medium">Step 3: submit flow</p>
              <p className="aui-text-subtle mt-2 text-sm leading-6">Save and reset show real behavior instead of just decorative buttons.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] p-4">
              <p className="aui-text-muted text-sm">Form state</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{mode}</p>
              <p className="aui-text-subtle mt-2 text-sm">{form.formState.isDirty ? "There are unsaved changes in the editor." : "Current values match the saved snapshot."}</p>
            </div>
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] p-4">
              <p className="aui-text-muted text-sm">Current workspace</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{workspaceName || "Untitled workspace"}</p>
              <p className="aui-text-subtle mt-2 text-sm">Status: {status} • Owner: {owner}</p>
            </div>
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] p-4">
              <p className="aui-text-muted text-sm">Submit behavior</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline">Reset</Badge>
                <Badge variant="outline">Dirty tracking</Badge>
                <Badge variant="outline">Async hydrate</Badge>
                <Badge variant="outline">{publishChanges ? "Publish on" : "Publish off"}</Badge>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] p-4">
            <p className="aui-text-muted text-sm">Why this matters</p>
            <div className="aui-text-subtle mt-3 space-y-2 text-sm">
              <p>One wrapper system keeps label, helper and error layout consistent.</p>
              <p>Async fields can hydrate edit values instead of only supporting fresh creation.</p>
              <p>Form route now shows actual submit and reset flow instead of static decoration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
