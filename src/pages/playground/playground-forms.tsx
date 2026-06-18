import { useForm } from "react-hook-form"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComponentPreview,
  FormBuilder,
  FormFieldShell,
  InfoCard,
  Input,
  MetricGrid,
  StatusBadge,
  formSection,
  inputField,
  phoneField,
  switchField,
  textareaField,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid } from "./playground-ui"
import { PlaygroundForm } from "./playground-form"

type BuilderDemoValues = {
  name: string
  phone: string
  notes: string
  active: boolean
}

const formHighlights = [
  { title: "Layouts", value: "3", description: "vertical, horizontal and inline field shells" },
  { title: "States", value: "5+", description: "error, disabled, read-only, dirty and submitting" },
  { title: "Fields", value: "12+", description: "input, select, async, date, switch, phone and number wrappers" },
]

const builderMetrics = [
  { key: "fields", label: "Preset helpers", value: "10", description: "Less boilerplate", tone: "info" as const },
  { key: "sections", label: "Sections", value: "∞", description: "Config-driven groups", tone: "success" as const },
  { key: "logic", label: "Business logic", value: "0", description: "UI-only pattern", tone: "muted" as const },
]

function FormBuilderPreview() {
  const form = useForm<BuilderDemoValues>({
    defaultValues: {
      name: "Premium Coffee",
      phone: "+998 90 123 45 67",
      notes: "Reusable config-driven form example.",
      active: true,
    },
  })

  const sections = [
    formSection<BuilderDemoValues>({
      id: "main",
      title: "Product form",
      description: "Built with FormBuilder preset helpers and local mock state only.",
      actions: <StatusBadge tone="success" dot>Preset helpers</StatusBadge>,
      fields: [
        inputField<BuilderDemoValues>({
          id: "name",
          props: { name: "name", label: "Name", required: true },
        }),
        phoneField<BuilderDemoValues>({
          id: "phone",
          props: { name: "phone", label: "Phone" },
        }),
        textareaField<BuilderDemoValues>({
          id: "notes",
          colSpan: "full",
          props: { name: "notes", label: "Notes", rows: 3 },
        }),
        switchField<BuilderDemoValues>({
          id: "active",
          colSpan: "full",
          props: { name: "active", label: "Active product", description: "Shown in public catalog." },
        }),
      ],
    }),
  ]

  return <FormBuilder control={form.control} sections={sections} columns={2} submitLabel="Save" resetLabel="Reset" />
}

export function FormsSection() {
  return (
    <DemoSection
      sectionIndex={4}
      id="forms"
      eyebrow="Data entry"
      title="Form wrappers"
      description="React Hook Form connected fields with layout, validation, async lookup, state controls and config-driven FormBuilder patterns."
      action={<StatusBadge tone="success" dot>RHF-ready</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <Card className="border-primary/15 bg-background shadow-lg shadow-primary/5">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">RHF ready</Badge>
              <Badge variant="outline">Field shells</Badge>
              <Badge variant="outline">FormBuilder</Badge>
            </div>
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">Structured forms.</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6">
              Build predictable form layouts with reusable field shells, typed helpers and a config-driven builder so every screen keeps
              the same rhythm.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Field layouts</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">Vertical</Badge>
                <Badge variant="outline">Horizontal</Badge>
                <Badge variant="outline">Inline</Badge>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Builder presets</p>
              <div className="mt-2 grid gap-2">
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">inputField()</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">phoneField()</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">switchField()</div>
              </div>
            </div>
            <div className="rounded-2xl border bg-background/80 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">State</p>
                <Badge variant="outline" className="text-[11px]">RHF ready</Badge>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Field shell.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Reusable presets.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Visible validation.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-muted/15">
          <CardHeader>
            <CardTitle className="text-lg">Form preview</CardTitle>
            <CardDescription>Current mock form state and layout mode.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Sections</p>
                <p className="mt-1 text-sm font-medium">1 builder group</p>
              </div>
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Fields</p>
                <p className="mt-1 text-sm font-medium">Name, phone, notes, active</p>
              </div>
            </div>
            <div className="rounded-2xl border bg-background p-3 text-sm text-muted-foreground">
              One form API. Multiple visual patterns. No app-specific logic inside the kit.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-4 grid gap-4 md:grid-cols-3">
        {formHighlights.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-3xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <MetricGrid className="mb-4" columns={3} items={builderMetrics} />

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="Field shell layouts" description="Same primitive, different layouts through props." badge={<Badge variant="outline">layout</Badge>}>
          <div className="grid gap-4">
            <FormFieldShell label="Vertical" description="Default stacked layout." required>
              <Input placeholder="Product name" />
            </FormFieldShell>
            <FormFieldShell label="Horizontal" description="Two-column label/content layout." layout="horizontal" descriptionPosition="bottom">
              <Input placeholder="SKU-001" />
            </FormFieldShell>
            <FormFieldShell label="Inline" layout="inline" labelAction={<Button size="xs" variant="ghost">Action</Button>}>
              <Input placeholder="Compact value" />
            </FormFieldShell>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Validation and states" description="Visual states are consistent across every form wrapper." badge={<Badge variant="outline">state</Badge>}>
          <div className="grid gap-4">
            <FormFieldShell label="Error" error="This product name is reserved." required>
              <Input aria-invalid defaultValue="Premium Coffee" />
            </FormFieldShell>
            <FormFieldShell label="Read only" description="The value can be copied but not edited." readOnly>
              <Input readOnly defaultValue="Readonly value" />
            </FormFieldShell>
            <FormFieldShell label="Disabled" description="Disabled field state." disabled>
              <Input disabled defaultValue="Disabled value" />
            </FormFieldShell>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="FormBuilder presets" description="Config-driven forms without repeating long field objects." badge={<Badge variant="outline">builder</Badge>}>
          <InfoCard title="Field factories" description="inputField(), phoneField(), textareaField(), switchField()" compact>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <div className="rounded-lg border bg-muted/25 p-2">Typed helpers create normal FormBuilder fields.</div>
              <div className="rounded-lg border bg-muted/25 p-2">Validation and API stay in the consuming app.</div>
            </div>
          </InfoCard>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="FormBuilder preset demo"
        description="Build a structured form from typed field helpers and sections. This is still local mock state only."
        dependencies={["react-hook-form", "FormBuilder", "inputField", "phoneField", "textareaField", "switchField"]}
        code={`const sections = [
  formSection({
    id: "main",
    fields: [
      inputField({ id: "name", props: { name: "name", label: "Name" } }),
      phoneField({ id: "phone", props: { name: "phone", label: "Phone" } }),
    ],
  }),
]

<FormBuilder control={form.control} sections={sections} />`}
      >
        <div className="w-full max-w-4xl">
          <FormBuilderPreview />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Complete form demo"
        description="Toggle locked/read-only/error/latency states and check all field wrappers in one controlled mock form."
        dependencies={["react-hook-form", "FormFieldShell", "AsyncSelect", "DatePicker"]}
        code={`const form = useForm<ProductFormValues>({ defaultValues, mode: "onChange" })

<FormInput control={form.control} name="name" label="Name" required />
<FormAsyncSelect control={form.control} name="customerId" loadOptions={loadCustomers} />
<FormSwitch control={form.control} name="active" label="Active product" />`}
      >
        <div className="w-full max-w-5xl">
          <PlaygroundForm />
        </div>
      </ComponentPreview>

      <PlaygroundUsage
        title="Form usage"
        items={[
          "Use one form field shell API for vertical, horizontal and inline layouts instead of creating duplicate field components.",
          "Use FormBuilder and field presets when a page has repeated form sections that should stay consistent.",
          "Pass read-only, disabled, error and description behavior through wrapper props so every field looks consistent.",
          "Keep default values explicit; all examples in the playground should be deterministic and API-free.",
        ]}
        code={`const form = useForm<ProductFormValues>({ defaultValues, mode: "onChange" })
const fields = [inputField({ id: "name", props: { name: "name", label: "Name" } })]

<FormBuilder control={form.control} fields={fields} />`}
      />
    </DemoSection>
  )
}






