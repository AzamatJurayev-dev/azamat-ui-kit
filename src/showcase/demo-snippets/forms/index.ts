export const formDemoCodeSnippets: Record<string, string> = {
  "search-input": `import { Input } from "tembro"

export function Demo() {
  return (
    <Input
      type="search"
      value="invoice"
      onValueChange={(value) => console.log(value)}
      placeholder="Search invoices..."
      resultCount={12}
      shortcut="Ctrl K"
    />
  )
}`,
  "password-input": `import { PasswordInput } from "tembro"

export function Demo() {
  return <PasswordInput placeholder="Enter secure token" autoComplete="current-password" />
}`,
  "clearable-input": `import { Input } from "tembro"

export function Demo() {
  return <Input defaultValue="Azamat UI" placeholder="Search customer" clearable />
}`,
  "tag-input": `import { TagInput } from "tembro"

export function Demo() {
  return <TagInput defaultValue={["dashboard", "billing"]} placeholder="Add tag" />
}`,
}
