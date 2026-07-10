import type { ComponentDemoMock } from "../types"

export const inputMock: ComponentDemoMock = {
  code: `import { useState } from "react"\nimport { Label, Input } from "tembro"\n\nexport function Example() {\n  const [query, setQuery] = useState("buttons")\n\n  return (\n    <form className="space-y-4">\n      <div>\n        <Label htmlFor="support-email">Support email</Label>\n        <Input id="support-email" type="email" defaultValue="team@acme.io" required />\n      </div>\n\n      <div>\n        <Label htmlFor="component-search">Search components</Label>\n        <Input\n          id="component-search"\n          value={query}\n          onValueChange={setQuery}\n          placeholder="Search by slug or title"\n          clearable\n          trailingAction={<span className="text-xs text-muted-foreground">12 results</span>}\n          replaceTrailingWhenClear={false}\n        />\n      </div>\n\n      <div>\n        <Label htmlFor="api-prefix">Cost estimate</Label>\n        <Input\n          id="api-prefix"\n          defaultValue="120"\n          readOnly\n          trailing={<span className="text-sm aui-text-muted">USD</span>}\n        />\n      </div>\n\n      <div>\n        <Label htmlFor="disabled-input">Locked status</Label>\n        <Input id="disabled-input" disabled value="Locked while syncing" />\n      </div>\n    </form>\n  )\n}\n`,
  htmlCode: `<label for="example">Search components</label>\n<input id="example" data-slot="input" type="text" placeholder="Search components..." />`,
  cliCommand: "npx tembro add input",
  highlights: [
    "Controlled and uncontrolled value flows",
    "Label + control association with htmlFor",
    "Validation-ready required states",
    "Disabled and readOnly form states",
    "Built-in clear action and trailing metadata",
  ],
  relatedBlockSlugs: ["users-table", "settings-form", "crm-dashboard"],
  scenarios: [
    { title: "Search", description: "Use compact inputs inside headers and filter bars." },
    { title: "Email capture", description: "Pair Input with label and validation for accessible form entry." },
    { title: "Read-only preview", description: "Use readOnly for audit logs or prefilled settings values." },
    { title: "Disabled editing", description: "Prevent changes during lock states and permission restrictions." },
  ],
  capabilityNotes: [
    "Supports controlled text entry with placeholder, disabled state, and direct text callbacks.",
    "Works with label-first forms, validation messages, clearable behavior, and trailing actions.",
    "Use type attributes to narrow input modes: search, email, password, url, etc.",
    "Can be used in compact toolbar, modal, and full-width form layouts.",
  ],
}

