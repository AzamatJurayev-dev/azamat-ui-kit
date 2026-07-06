import type { ComponentDemoMock } from "../types"

export const toastMock: ComponentDemoMock = {
  code: `import { Button, ToastProvider, useToast } from "azix"

function Demo() {
  const { addToast, clearToasts, success, warning } = useToast()

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Button onClick={() => addToast({ title: "Saving", description: "Draft is being saved." })}>Add toast</Button>
      <Button variant="outline" onClick={() => success({ title: "Saved", description: "All changes are synced." })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => warning("Please review your inputs.")}>
        Warning
      </Button>
      <Button variant="outline" onClick={clearToasts}>
        Clear all
      </Button>
    </div>
  )
}

export function Example() {
  return (
    <ToastProvider defaultDuration={2500} position="top-right">
      <Demo />
    </ToastProvider>
  )
}`,
  highlights: ["Provider required for hook usage", "Global addToast API", "Tone helpers for common outcomes", "Dismiss and clear control"],
  scenarios: [
    { title: "Save feedback", description: "Show confirmation after async form submit." },
    { title: "Validation warning", description: "Surface form validation warnings near input." },
    { title: "Async operations", description: "Keep users informed during background actions." },
  ],
  capabilityNotes: [
    "Always wrap usage with `ToastProvider` close to app root or feature boundary.",
    "Use `position` consistently across app.",
    "Prefer small toast counts (`maxToasts`) for stable layout.",
  ],
}
