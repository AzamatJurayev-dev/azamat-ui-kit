# @azamatjurayevdev/azix-ui

Editable React components for Tailwind apps.

Use the CLI to copy component source into your project. Do not install `@azamatjurayevdev/azix-ui` as a runtime UI dependency for new apps.

## Next.js

```bash
npx @azamatjurayevdev/azix-ui init --template next --defaults
npx @azamatjurayevdev/azix-ui add button
```

```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Create workspace</Button>
}
```

## Vite

```bash
npx @azamatjurayevdev/azix-ui init --template vite --defaults
npx @azamatjurayevdev/azix-ui add input
```

```tsx
import { Input } from "@/components/ui/input"

export default function App() {
  return <Input placeholder="Workspace name" />
}
```

## Common Commands

```bash
npx @azamatjurayevdev/azix-ui list
npx @azamatjurayevdev/azix-ui add button input data-table
npx @azamatjurayevdev/azix-ui preset dashboard
npx @azamatjurayevdev/azix-ui theme src/index.css
```

## Component Imports

After `add`, import from your app source:

```tsx
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { FormInput } from "@/components/form/form-input"
```

## Canonical Components First

Teach these names first in app code and docs:

- `Button`
- `Input`
- `Select`
- `FormInput`
- `FormSelect`
- `FormFieldShell`
- `Card`
- `InfoCard`
- `Badge`
- `Dialog`
- `DataTable`
- `Sidebar`

Legacy wrappers such as `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput`, `FormAsyncSelect`, `AppSidebar`, and `SmartCard` remain only as compatibility aliases.

## Notes

- `init` writes theme tokens into your global CSS.
- `add` copies only the requested component source and required support files.
- Tailwind scans copied files naturally because they live inside your `src` folder.
- You can edit copied components like normal app code.

## Public Metadata

The package also exports docs metadata for catalog pages:

- `InputFamily`
- `SelectFamily`
- `CardFamily`
- `BadgeFamily`
- `OverlayFamily`
- `FormFamily`
- `DataTableFamily`
- `componentFamilyCatalog`
- `componentDocsGroups`
- `componentFamilyMigrationMap`

## Verify

```bash
npm run lint
npm run build
```

Check that your app has:

- `azamat-ui.json`
- Azamat UI tokens in global CSS
- local imports from `@/components/...`
