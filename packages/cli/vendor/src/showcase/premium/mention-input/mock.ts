import type { ComponentDemoMock } from "../types"

export const mentionInputMock: ComponentDemoMock = {
  code: `import { MentionInput } from "@/index"

export function Example() {
  return (
    <MentionInput
      value="Assign @alice and @bob."
      options={[{ label: "Alice", value: "alice" }, { label: "Bob", value: "bob" }]}
      onValueChange={(value) => console.log(value)}
    />
  )
}`,
  cliCommand: "npx azix add mention-input",
  highlights: [
    "Trigger-based suggestion filtering",
    "Keyboard navigation for suggestions",
    "Auto insert with controlled value",
  ],
  scenarios: [
    { title: "Comments", description: "Mention teammates in internal notes." },
    { title: "Chat input", description: "Add quick user references while composing." },
  ],
}

