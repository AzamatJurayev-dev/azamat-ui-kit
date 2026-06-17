import { Card, CardContent } from "@/index"
import { DemoSection, PlaygroundUsage } from "./playground-ui"
import { PlaygroundForm } from "./playground-form"

export function FormsSection() {
  return (
    <DemoSection
      sectionIndex={4}
      id="forms"
      title="Form wrappers"
      description="React Hook Form wrappers with hardened field shell props."
    >
      <Card>
        <CardContent>
          <PlaygroundForm />
        </CardContent>
      </Card>

      <PlaygroundUsage
        title="Form usage"
        items={[
          "Compose wrapper fields (`FormInput`, `FormSelect`) around raw RHF `control` only once per view.",
          "Use shell-level props (`disabled`, `error`, `readOnly`) to control field states uniformly.",
          "Keep `defaultValues` explicit so product previews are deterministic in playground and docs.",
          "Use the top action rail to toggle locked, read-only and simulated submit states quickly for real-world behavior checks.",
        ]}
        code={`const form = useForm<ProductFormValues>({ defaultValues, mode: \"onChange\" })\nconst onSubmit = async () => new Promise((resolve) => setTimeout(resolve, 700))\n<Button onClick={handleSubmit(onSubmit)}>Run submit</Button>`}
      />
    </DemoSection>
  )
}

