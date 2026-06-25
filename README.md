# azamat-ui-kit

Reusable React components plus a source-copy CLI for building Tailwind-based apps.

The recommended workflow is similar to source-copy UI libraries: install the packages, initialize theme/config, then copy the components you want into your app so you can edit them.

## Install

```bash
npm install azamat-ui-kit
npm install -D azamat-ui-kit-cli
```

Peer dependencies:

```bash
npm install react react-dom react-hook-form
```

For Tailwind 4 apps:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

## Quick Start

### Vite

```bash
npx azamat-ui-kit-cli init --template vite --defaults
npx azamat-ui-kit-cli add button input form-input --skip-install
```

Use copied source in your app:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder="Project name" />
      <Button>Create</Button>
    </div>
  )
}
```

### Next.js

```bash
npx azamat-ui-kit-cli init --template next --defaults
npx azamat-ui-kit-cli add button input form-input --skip-install
```

Use copied source:

```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Get started</Button>
}
```

## CLI

```bash
npx azamat-ui-kit-cli init --template vite --defaults
npx azamat-ui-kit-cli init --template next --defaults
npx azamat-ui-kit-cli list
npx azamat-ui-kit-cli add button input data-table
npx azamat-ui-kit-cli preset minimal
npx azamat-ui-kit-cli preset dashboard
npx azamat-ui-kit-cli theme src/index.css
```

`init` writes:

- `azamat-ui.json`
- theme tokens into the global CSS file
- alias/config defaults for the selected template

`add` copies source files into the consumer app. This is the preferred path for large components because the app can edit the component source.

## Tailwind Setup

The CLI writes the required CSS tokens. For Vite, confirm the Tailwind plugin is enabled:

```ts
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Your app entry must import the global CSS file:

```tsx
import "./index.css"
```

For Next.js, import `app/globals.css` from the root layout as usual.

## Adoption Model

Use copied source for most real apps:

```tsx
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
```

Runtime package imports are allowed for small stable primitives or quick prototypes:

```tsx
import { Button } from "azamat-ui-kit"
```

Large systems should be copied through the CLI so the consuming app owns styling, routing and business behavior.

## Component Names

Docs should show one clean primary name first, then explain related variants inside the detail page.

Primary families:

- `Input`: `SearchInput`, `PasswordInput`, `NumberInput`, `MoneyInput`, `QuantityInput`, `PhoneInput`, `MaskedInput`, `DateInput`, `DateRangeInput`, `FormInput`
- `Select`: `Select`, `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox`, `FormSelect`
- `DatePicker`: `Calendar`, `DatePicker`, `DateRangePicker`, date form wrappers
- `Card`: `Card`, `InfoCard`, `StatCard`, `StatisticCard`, `EntityCard`, `FileCard`
- `DataTable`: table, toolbar, pagination, visibility, actions, bulk actions, presets

## Useful Imports

```tsx
import {
  Alert,
  Badge,
  Button,
  Card,
  DataTable,
  Dialog,
  FormInput,
  Input,
  Select,
  ToastProvider,
} from "azamat-ui-kit"
```

Prefer local copied imports after using the CLI.

## Advanced Inputs

### AsyncSelect

```tsx
import * as React from "react"
import { AsyncSelect, type AsyncSelectOption } from "azamat-ui-kit"

const loadUsers = async (search: string): Promise<AsyncSelectOption[]> => {
  const response = await fetch(`/api/users?q=${encodeURIComponent(search)}`)
  const users = await response.json()

  return users.map((user: { id: string; name: string }) => ({
    value: user.id,
    label: user.name,
  }))
}

export function OwnerField() {
  const [value, setValue] = React.useState<string>()

  return (
    <AsyncSelect
      value={value}
      onValueChange={setValue}
      loadOptions={loadUsers}
      loadSelectedOption={async (selectedId) => {
        const response = await fetch(`/api/users/${selectedId}`)
        const user = await response.json()
        return { value: user.id, label: user.name }
      }}
      labels={{
        placeholder: "Select owner",
        searchPlaceholder: "Search owners...",
        empty: "No owners found",
      }}
    />
  )
}
```

### AsyncMultiSelect

```tsx
import * as React from "react"
import { AsyncMultiSelect, type AsyncSelectOption } from "azamat-ui-kit"

const loadTags = async (search: string): Promise<AsyncSelectOption[]> => {
  const response = await fetch(`/api/tags?q=${encodeURIComponent(search)}`)
  const tags = await response.json()

  return tags.map((tag: { id: string; label: string }) => ({
    value: tag.id,
    label: tag.label,
  }))
}

export function TagField() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <AsyncMultiSelect
      value={value}
      onValueChange={(nextValue) => setValue(nextValue)}
      loadOptions={loadTags}
      loadSelectedOptions={async (selectedIds) =>
        selectedIds.map((id) => ({ value: id, label: id.toUpperCase() }))
      }
      maxSelected={5}
      closeOnSelect={false}
      showSelectAll
      labels={{
        placeholder: "Select tags",
        searchPlaceholder: "Search tags...",
        empty: "No tags found",
        maxSelected: (max) => `You can select up to ${max} tags`,
      }}
    />
  )
}
```

## Development

```bash
npm install
npm run lint
npm run test:run
npm run test:cli
npm run test:fixtures
npm run release:gate
```

Important scripts:

- `npm run build`: library build plus build-output checks
- `npm run build:cli`: CLI package build
- `npm run check-version-sync`: root package, CLI, registry and CLI runtime version check
- `npm run test:registry`: registry validation
- `npm run test:root-exports`: root export guard

## Release

Before publishing:

```bash
npm run release:gate
npm publish --access public
npm publish --workspace azamat-ui-kit-cli --access public
```

If npm requires 2FA bypass, create a granular access token with write access and `Bypass 2FA` enabled, then publish with that token.

## Project Docs

- `README.md`: install and usage
- `CHANGELOG.md`: user-facing changes
- `componentFamilyCatalog`, `componentDocsGroups`, `componentFamilyMigrationMap`: family governance source-of-truth
- `InputFamily`, `SelectFamily`, `CardFamily`, `FormFamily`, `DataTableFamily`: stable family labels in docs
