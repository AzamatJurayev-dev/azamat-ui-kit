import type { ComponentDemoMock } from "../types"

export const textareaMock: ComponentDemoMock = {
  code: `import { FormEvent, useState } from "react"
import { Textarea } from "@/index"

export function Example() {
  const [note, setNote] = useState("")
  const [error, setError] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(note.trim().length < 10)
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Textarea rows={6} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write your message..." />
      <Textarea rows={4} defaultValue="Internal changelog draft..." />
      <Textarea readOnly value="Locked review comment" rows={3} />
      <button type="submit">Submit</button>
      {error ? <p className="text-sm text-red-600">Please enter at least 10 characters.</p> : null}
    </form>
  )
}`,
  htmlCode: `<textarea data-slot="textarea" placeholder="Write your message..." rows="6"></textarea>`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add textarea",
  highlights: ["Long-form notes", "Multiline forms", "Rows/height control", "Validation-friendly error context"],
  relatedBlockSlugs: ["settings-form", "auth-sign-in", "pricing-section"],
  scenarios: [
    { title: "Support notes", description: "Capture longer messages with 6+ rows without layout shift." },
    { title: "Release notes", description: "Use multiline fields for changelog and update summaries." },
    { title: "Review comments", description: "Keep readOnly previews for policy or audit style workflows." },
    { title: "Internal description editor", description: "Combine rows with validation text and section headers." },
  ],
  capabilityNotes: [
    "Designed for multi-line content with enough vertical rhythm for long text.",
    "Supports controlled/uncontrolled usage with rows customization.",
    "Should demonstrate empty, filled and read-only states in form contexts.",
    "Pairs well with form shells and richer editorial patterns.",
  ],
}
