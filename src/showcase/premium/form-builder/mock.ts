import type { ComponentDemoMock } from "../types"

export const formBuilderMock: ComponentDemoMock = {
  code: `import { useForm } from "react-hook-form"
import {
  FormBuilder,
  formSection,
  inputField,
  phoneField,
  switchField,
  textareaField,
} from "azamat-ui-kit"

type DemoValues = {
  workspace: string
  ownerPhone: string
  notes: string
  isLive: boolean
}

const sections = [
  formSection<DemoValues>({
    id: "main",
    title: "Workspace settings",
    description: "Field schema, sections and disabled/readOnly behavior all live in FormBuilder config.",
    fields: [
      inputField<DemoValues>({ id: "workspace", props: { name: "workspace", label: "Workspace name", required: true } }),
      phoneField<DemoValues>({ id: "ownerPhone", props: { name: "ownerPhone", label: "Owner phone" } }),
      textareaField<DemoValues>({ id: "notes", colSpan: "full", props: { name: "notes", label: "Notes", rows: 3 } }),
      switchField<DemoValues>({
        id: "isLive",
        colSpan: "full",
        props: { name: "isLive", label: "Publish workspace", description: "Toggle public availability" },
      }),
    ],
  }),
]

export function Example() {
  const form = useForm<DemoValues>({
    defaultValues: {
      workspace: "Azamat UI",
      ownerPhone: "+998 90 123 45 67",
      notes: "Connected form sections with submit and reset lifecycle.",
      isLive: true,
    },
  })

  return (
    <FormBuilder
      control={form.control}
      sections={sections}
      columns={1}
      submitLabel="Save"
      resetLabel="Reset"
      disabled={false}
      readOnly={false}
    />
  )
}`
,
  htmlCode: `<form><label for="workspace">Workspace</label><input id="workspace" value="Azamat UI" /></form>`,
  cliCommand: "npx azamat-ui-kit-cli add form-builder",
  highlights: ["Field schema", "Sections and presets", "submitLabel / resetLabel wiring", "Disabled/readOnly passthrough", "Reusable field helpers"],
  relatedBlockSlugs: ["settings-form", "crm-dashboard"],
  scenarios: [
    { title: "Field schema validation", description: "Use typed `formSection` and helper fields for deterministic layout." },
    { title: "Submit + reset", description: "Pass submitLabel/resetLabel and rely on RHF formState for disabled transitions." },
    { title: "Custom render", description: "Inject custom field-level props through helper factories." },
    { title: "Read-only mode", description: "Toggle readOnly for inspect-only workflows without changing schema." },
  ],
  capabilityNotes: [
    "`sections` gives a single source of truth for layout and required validations.",
    "Use `fields` for precise schema-driven field composition.",
    "Expose submit and reset labels directly from component props so UX can match product language.",
    "Combine `disabled` + `readOnly` for different page states like locked records and review modes.",
  ],
}
