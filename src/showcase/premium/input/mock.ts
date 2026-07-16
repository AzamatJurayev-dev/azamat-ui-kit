import type { ComponentDemoMock } from "../types"

export const inputMock: ComponentDemoMock = {
  code: `import { useState } from "react"\nimport { Input } from "tembro"\n\nexport function Example() {\n  const [query, setQuery] = useState("buttons")\n  const [budget, setBudget] = useState<number | null>(1200)\n\n  return (\n    <div className="grid gap-4">\n      <Input\n        kind="search"\n        value={query}\n        onValueChange={setQuery}\n        placeholder="Search components"\n        clearOnEscape\n      />\n      <Input kind="password" autoComplete="current-password" />\n      <Input kind="money" value={budget} onValueChange={setBudget} prefix="$" suffix="USD" />\n      <Input kind="phone" defaultValue="+998 90 123 45 67" />\n      <Input kind="date" defaultValue="2026-07-13" />\n      <Input kind="quantity" defaultValue={3} min={1} max={12} />\n    </div>\n  )\n}\n`,
  htmlCode: `<label for="example">Search components</label>\n<input id="example" data-slot="input" type="text" placeholder="Search components..." />`,
  cliCommand: "npx tembro add input",
  highlights: [
    "Controlled and uncontrolled value flows",
    "Label + control association with htmlFor",
    "Validation-ready required states",
    "Disabled and readOnly form states",
    "Built-in clear action and trailing metadata",
    "Password, numeric, money, phone, date and quantity kinds through one import",
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

