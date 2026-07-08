import type { FamilyDemoMock } from "../types"

export const inputsFamilyMock: FamilyDemoMock = {
  code: `import { AsyncSelect, AsyncMultiSelect } from "tembro"\n\nexport function Example() {\n  return <AsyncSelect loadOptions={loadOptions} />\n}`,
  highlights: ["AsyncSelect hydration", "AsyncMultiSelect limits", "Create option flow", "Grouped remote results"],
  scenarios: [
    { title: "Workspace switching", description: "Load large remote workspace lists without blocking the form shell." },
    { title: "Linked module setup", description: "Attach multiple modules with max selection and select-all rules." },
    { title: "Editable resource forms", description: "Hydrate saved values back into async inputs on edit routes." },
  ],
  metrics: [
    { label: "Exports", value: "14" },
    { label: "Async flows", value: "6+" },
    { label: "Status", value: "Stable" },
  ],
}


