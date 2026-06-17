import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComponentPreview,
  FormFieldShell,
  Input,
  StatusBadge,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid, TokenPill } from "./playground-ui"
import { PlaygroundForm } from "./playground-form"

const formHighlights = [
  { title: "Layouts", value: "3", description: "vertical, horizontal and inline field shells" },
  { title: "States", value: "5+", description: "error, disabled, read-only, dirty and submitting" },
  { title: "Fields", value: "12+", description: "input, select, async, date, switch, phone and number wrappers" },
]

export function FormsSection() {
  return (
    <DemoSection
      sectionIndex={4}
      id="forms"
      eyebrow="Data entry"
      title="Form wrappers"
      description="React Hook Form connected fields with layout, validation, async lookup and state controls."
      action={<StatusBadge tone="success" dot>RHF-ready</StatusBadge>}
    >
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

        <PlaygroundCard title="CSS controlled form UI" description="Form wrappers inherit the same control tokens." badge={<Badge variant="outline">tokens</Badge>}>
          <div className="flex flex-wrap gap-2">
            <TokenPill>--aui-control-radius</TokenPill>
            <TokenPill>--aui-control-shadow</TokenPill>
            <TokenPill>data-slot="form-field-shell"</TokenPill>
            <TokenPill>data-invalid="true"</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Form components should not create visual-only copies. Use layout props, shell slots and global CSS tokens instead.
          </p>
        </PlaygroundCard>
      </ShowcaseGrid>

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
          "Pass read-only, disabled, error and description behavior through wrapper props so every field looks consistent.",
          "Keep default values explicit; all examples in the playground should be deterministic and API-free.",
          "Use async select and calendar wrappers through props only; API clients stay in the consuming app.",
        ]}
        code={`const form = useForm<ProductFormValues>({ defaultValues, mode: "onChange" })
const onSubmit = async (values) => save(values)

<FormInput control={form.control} name="name" label="Name" layout="horizontal" />`}
      />
    </DemoSection>
  )
}
