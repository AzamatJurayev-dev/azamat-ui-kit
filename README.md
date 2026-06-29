# azamat-ui-kit

Editable React components for Tailwind apps.

Use the CLI to copy component source into your project. Do not install `azamat-ui-kit` as a runtime UI dependency for new apps.

## Next.js

```bash
npx azamat-ui-kit-cli init --template next --defaults
npx azamat-ui-kit-cli add button
```

```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Create workspace</Button>
}
```

## Vite

```bash
npx azamat-ui-kit-cli init --template vite --defaults
npx azamat-ui-kit-cli add input
```

```tsx
import { Input } from "@/components/ui/input"

export default function App() {
  return <Input placeholder="Workspace name" />
}
```

## Common Commands

```bash
npx azamat-ui-kit-cli list
npx azamat-ui-kit-cli add button input data-table
npx azamat-ui-kit-cli preset dashboard
npx azamat-ui-kit-cli theme src/index.css
```

## Component Imports

After `add`, import from your app source:

```tsx
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { FormInput } from "@/components/form/form-input"
```

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
