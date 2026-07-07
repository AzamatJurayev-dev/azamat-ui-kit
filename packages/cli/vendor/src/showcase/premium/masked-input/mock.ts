import type { ComponentDemoMock } from "../types"

export const maskedInputMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { MaskedInput } from "@/index"

export function Example() {
  const [value, setValue] = useState("AA-123")

  return (
    <MaskedInput
      value={value}
      onValueChange={(nextValue) => setValue(nextValue)}
      mask={(raw: string) => raw.toUpperCase().slice(0, 6).replace(/(.{3})(?=.)/, "$1-")}
      placeholder="AA-123"
    />
  )
}
`,
  htmlCode: '<label for="masked">Referral code</label><input id="masked" type="text" value="AA-123" placeholder="AA-123" />',
  cliCommand: "npx @azamatjurayevdev/azix-ui add masked-input",
  highlights: [
    "Mask callback runs on each edit",
    "Uppercase and slicing are explicit formatting assumptions",
    "Raw value assumptions should be mirrored in validation and submit payloads",
    "Use a deterministic placeholder that matches the mask contract",
  ],
  relatedBlockSlugs: ["settings-form", "crm-dashboard", "auth-sign-in"],
  scenarios: [
    { title: "Referral codes", description: "Use fixed pattern for short identifiers while typing." },
    { title: "License keys", description: "Apply grouping with a strict uppercase format and controlled length." },
    { title: "Display normalization", description: "Normalize display while preserving form-level expectations." },
    { title: "Validation gate", description: "Reject submission when value shape does not match mask contract." },
  ],
  capabilityNotes: [
    "Document whether callback receives raw text or already masked text.",
    "If you need raw payload, sanitize before submit and keep canonical storage layer separate.",
    "Use one mask function source for both form and API submission paths.",
    "Treat partially typed values as invalid until user completion conditions are met.",
  ],
}
