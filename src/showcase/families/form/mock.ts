import type { FamilyDemoMock } from "../types"

export const formFamilyMock: FamilyDemoMock = {
  code: `import { FormInput, FormSelect, FormSwitch } from "azix"\n\nexport function Example() {\n  return (\n    <>\n      <FormInput control={control} name="workspaceName" label="Workspace" />\n      <FormInput control={control} name="ownerPhone" kind="phone" label="Owner phone" />\n      <FormSelect control={control} name="owner" kind="async" label="Linked workspace" />\n      <FormSwitch control={control} name="publishChanges" label="Publish after save" />\n    </>\n  )\n}`,
  highlights: ["Universal form wrappers", "Async field hydration", "Dirty + reset flow", "Consistent validation surfaces"],
  scenarios: [
    { title: "Settings form", description: "Keep labels, helper text, toggles and async fields aligned through the same wrapper language." },
    { title: "Edit resource flow", description: "Hydrate saved owner/workspace values back into the form route with `FormSelect kind=\"async\"`." },
    { title: "Long forms", description: "Scale complex field groups without splitting into many narrowly named wrappers." },
  ],
  metrics: [
    { label: "Exports", value: "14" },
    { label: "Universal wrappers", value: "2 primary" },
    { label: "Status", value: "Stable" },
  ],
}


