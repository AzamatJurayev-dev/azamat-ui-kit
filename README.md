# azamat-ui-kit

Reusable React components for Tailwind-based apps, with an optional source-copy CLI.

Use the runtime package when you want normal npm imports. Use the CLI only when you want editable component source copied into your app.

## Install

Runtime package:

```bash
npm install azamat-ui-kit
```

Peer dependencies:

```bash
npm install react react-dom react-hook-form
```

For Tailwind 4 apps:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Optional source-copy CLI:

```bash
npx azamat-ui-kit-cli init --template vite --defaults
npx azamat-ui-kit-cli add button input form-input --skip-install
```

Choose one path first:

- `Package mode`: import directly from `azamat-ui-kit`
- `Source mode`: use `azamat-ui-kit-cli` and import from your local `src/components`
- `Hybrid mode`: package for primitives, source-copy for larger product surfaces

## Quick Start

### Runtime imports

No CLI is required for this path:

```tsx
import { Button, Input } from "azamat-ui-kit"

export function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder="Project name" />
      <Button>Create</Button>
    </div>
  )
}
```

### Source-copy workflow

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

`add` copies source files into the consumer app. This path is optional and useful for large components because the app can edit the component source.

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

### Next.js package mode

`app/layout.tsx`

```tsx
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

`app/page.tsx`

```tsx
import { Button, Input } from "azamat-ui-kit"

export default function Page() {
  return (
    <div className="space-y-4 p-6">
      <Input placeholder="Workspace name" />
      <Button>Create workspace</Button>
    </div>
  )
}
```

### Vite package mode

`src/main.tsx`

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

`src/App.tsx`

```tsx
import { Button, Input } from "azamat-ui-kit"

export default function App() {
  return (
    <div className="space-y-4 p-6">
      <Input placeholder="Workspace name" />
      <Button>Create workspace</Button>
    </div>
  )
}
```

### Source mode imports

After running CLI `init` + `add`, prefer local imports:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
```

Use this mode for larger surfaces like `DataTable`, `AppShell`, `ResourcePage`, and long-lived product-specific flows.

## Verify Setup

After installation, confirm these before building more screens:

- Global CSS is imported exactly once.
- Azamat UI theme tokens exist in the app CSS entry.
- One `Button` and one `Input` render with correct spacing and colors.
- Tailwind scans the app source and copied component files.
- Dark mode strategy is consistent across the app.

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

## Troubleshooting

### AsyncSelect request ordering

`AsyncSelect` and `AsyncMultiSelect` already ignore stale responses internally. Still, your app should keep `loadOptions` stable and keyed by the current query so older requests do not overwrite fresh server state outside the component.

### Disabled option behavior

Disabled options stay visible in the result list but cannot be selected. Use that state to explain why an item is unavailable instead of silently removing it from search results.

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
