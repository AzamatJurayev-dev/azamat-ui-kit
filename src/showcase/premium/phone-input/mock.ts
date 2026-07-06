import type { ComponentDemoMock } from "../types"

export const phoneInputMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { PhoneInput } from "@/index"

export function Example() {
  const [value, setValue] = useState("+998 90 123 45 67")

  return (
    <PhoneInput
      value={value}
      onValueChange={setValue}
      defaultCountry="UZ"
      placeholder="+998 90 123 45 67"
    />
  )
}
`,
  htmlCode: '<label for="phone">Phone</label><input id="phone" type="tel" inputmode="tel" placeholder="+998 90 123 45 67" />',
  cliCommand: "npx azix add phone-input",
  highlights: ["Phone formatting assumptions", "Locale/defaultCountry behavior", "Controlled value contract", "Raw vs displayed phone forms"],
  relatedBlockSlugs: ["users-table", "settings-form", "pricing-section"],
  scenarios: [
    { title: "Profile contact", description: "Capture customer phone with predictable display behavior." },
    { title: "Checkout phone", description: "Format validation before creating verification records." },
    { title: "Country switch", description: "Change defaultCountry and keep callback contract stable." },
    { title: "Backend integration", description: "Persist normalized phone payload while rendering localized format." },
  ],
  capabilityNotes: [
    "Write down whether your backend expects E.164 or local phone format.",
    "Avoid mixing formatted display and raw storage in schema validation.",
    "For country-aware inputs, keep default country explicit in docs and migration notes.",
    "Use one validator shared by form and API integration layers.",
  ],
}
