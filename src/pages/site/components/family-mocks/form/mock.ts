import type { FamilyDemoMock } from "../types"

export const formFamilyMock: FamilyDemoMock = {
  code: `import { FormFieldShell, FormInput, FormSelect, FormDatePicker } from "@azamat/ui"\n\nexport function Example() {\n  return <FormInput />\n}`,
  highlights: ["Wrapped form controls", "Field shells", "Date helpers", "Consistent validation surfaces"],
  scenarios: [
    { title: "Settings form", description: "Keep labels, helper text and controls aligned." },
    { title: "Billing flows", description: "Wrap money, phone and date fields in a unified form system." },
    { title: "Long forms", description: "Scale complex field groups without losing consistency." },
  ],
  metrics: [
    { label: "Exports", value: "14" },
    { label: "Field types", value: "10+" },
    { label: "Status", value: "Stable" },
  ],
}

