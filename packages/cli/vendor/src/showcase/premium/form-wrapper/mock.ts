import type { ComponentDemoMock } from "../types"

export const formRHFWrapperMock: ComponentDemoMock = {
  code: `import { useForm } from "react-hook-form"
import { Button, FormFieldShell, FormInput, FormSwitch, FormTextarea } from "@/index"

type DemoValues = {
  name: string
  ownerPhone: string
  price: number | null
  notes: string
  active: boolean
}

export function Example() {
  const form = useForm<DemoValues>({
    defaultValues: {
      name: "Azamat UI",
      ownerPhone: "+998 90 123 45 67",
      price: 120,
      notes: "Use control, name, rules, error, and required labels.",
      active: true,
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    console.log(values)
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormFieldShell label="Workspace name" required>
        <FormInput
          control={form.control}
          name="name"
          label="Workspace name"
          required
          placeholder="Write a workspace title"
          rules={{
            required: "Workspace name is required",
            minLength: { value: 3, message: "At least 3 characters" },
          }}
        />
      </FormFieldShell>

      <FormInput
        control={form.control}
        name="ownerPhone"
        kind="phone"
        label="Owner phone"
        description="Use canonical phone value for API payloads."
        rules={{ required: "Phone number is required" }}
      />

      <FormInput
        control={form.control}
        name="price"
        kind="number"
        label="Budget"
        min={0}
        max={100000}
        required
      />

      <FormTextarea
        control={form.control}
        name="notes"
        label="Notes"
        required
        rows={3}
        description="RHF handles error and required states."
      />

      <FormSwitch control={form.control} name="active" label="Active" />

      <Button type="submit">Save</Button>
    </form>
  )`
,
  htmlCode: '<form><label for="workspace">Workspace</label><input id="workspace" value="Azamat UI" /></form>',
  cliCommand: "npx azix add form-wrapper",
  highlights: ["control + name contract", "Universal `kind` variants", "Error display and required markers", "Consistent wrapper shell behavior"],
  relatedBlockSlugs: ["settings-form", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Required validation", description: "Use `rules` for required and length constraints and show errors in shell." },
    { title: "Error display", description: "Inject custom error messages for required and domain checks." },
    { title: "Read-only states", description: "Support locked and disabled states from parent screens." },
    { title: "Unified layout", description: "Keep one shell language for input, select and toggle types without multiplying wrapper names." },
  ],
  capabilityNotes: [
    "Use `control` and `name` from a shared `useForm` call for every field wrapper.",
    "Prefer `FormInput kind=...` and `FormSelect kind=...` for new work; keep alias wrappers only for migration.",
    "Pass RHF `rules` or `validate` to each wrapper, instead of inline ad-hoc checks.",
    "`required` should be explicit both in copy (UI marker) and schema.",
    "Render validation messages through wrapper-level `error` or formState errors for consistent spacing.",
  ],
}

export const formSelectMock: ComponentDemoMock = {
  code: `import { useForm } from "react-hook-form"
import { Button, FormSelect } from "azix"

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Review", value: "review" },
  { label: "Live", value: "live" },
]

export function Example() {
  const form = useForm({
    defaultValues: {
      status: "review",
      ownerId: "workspace-alpha",
    },
  })

  return (
    <form className="space-y-4">
      <FormSelect
        control={form.control}
        name="status"
        label="Release status"
        options={statusOptions}
        placeholder="Choose status"
      />

      <FormSelect
        control={form.control}
        name="ownerId"
        kind="async"
        label="Linked workspace"
        loadOptions={loadWorkspaces}
        loadSelectedOption={loadWorkspace}
      />

      <Button type="submit">Save</Button>
    </form>
  )
}`,
  cliCommand: "npx azix add form-select",
  highlights: ["One RHF select wrapper", "Simple + async under one API", "Shared shell labels and errors", "Preferred select-form entry"],
  relatedBlockSlugs: ["settings-form", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Static form choices", description: "Use the default FormSelect mode for known statuses, roles, or visibility controls." },
    { title: "Remote edit flows", description: "Switch to kind=\"async\" when the form hydrates saved entity values from remote search results." },
    { title: "Shared validation shell", description: "Keep labels, descriptions, and errors aligned across simple and async field variants." },
  ],
  capabilityNotes: [
    "Prefer FormSelect for new select fields instead of splitting wrappers too early.",
    "Use kind=\"async\" only when loading and hydration are remote concerns.",
    "Keep the RHF contract identical while the field interaction model changes underneath.",
  ],
}

export const formAsyncSelectMock: ComponentDemoMock = {
  code: `import { useForm } from "react-hook-form"
import { Button, FormAsyncSelect } from "azix"

export function Example() {
  const form = useForm({
    defaultValues: {
      ownerId: "workspace-alpha",
    },
  })

  return (
    <form className="space-y-4">
      <FormAsyncSelect
        control={form.control}
        name="ownerId"
        label="Linked workspace"
        loadOptions={loadWorkspaces}
        loadSelectedOption={loadWorkspace}
      />

      <Button type="submit">Save</Button>
    </form>
  )
}

// New work should prefer:
// <FormSelect control={form.control} name="ownerId" kind="async" ... />`,
  cliCommand: "npx azix add form-async-select",
  highlights: ["Compatibility alias", "Async form selection", "Hydrated remote value support", "Migration-safe route"],
  relatedBlockSlugs: ["settings-form", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Legacy migration", description: "Keep old async form routes working while teams move to FormSelect kind=\"async\"." },
    { title: "Remote search fields", description: "Hydrate saved form values back into the same async wrapper contract." },
    { title: "Alias cleanup path", description: "Use this route to document migration, not as the new primary entry point." },
  ],
  capabilityNotes: [
    "Keep FormAsyncSelect only while existing forms still import it directly.",
    "Point all new docs and new code toward FormSelect kind=\"async\".",
    "Treat this alias as a migration member inside the wider Select family.",
  ],
}

