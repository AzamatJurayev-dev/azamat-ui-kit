# azamat-ui-kit

Source-copy React UI components for Tailwind-based apps.

Azamat UI Kit is now designed to work like a local component registry: run the CLI, copy the components into your app, then import and edit them from your own source tree. A runtime package install is not required for normal usage.

## Quick Start

### Next.js

```bash
npx azamat-ui-kit-cli init --template next --defaults
npx azamat-ui-kit-cli add button input card
```

Use the copied files:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <main className="space-y-4 p-6">
      <Input placeholder="Workspace name" />
      <Button>Create workspace</Button>
    </main>
  )
}
```

### Vite

```bash
npx azamat-ui-kit-cli init --template vite --defaults
npx azamat-ui-kit-cli add button input card
```

Use the copied files:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function App() {
  return (
    <main className="space-y-4 p-6">
      <Input placeholder="Workspace name" />
      <Button>Create workspace</Button>
    </main>
  )
}
```

## Why Source-Copy

- No `npm install azamat-ui-kit` runtime dependency is required in the consumer app.
- No Tailwind `@source "../node_modules/..."` workaround is required.
- Components are copied into your app, so Tailwind scans them naturally.
- Teams can edit component source, variants, spacing, tokens, and product behavior directly.
- Bundle output only includes components your app actually imports.

## CLI Commands

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
- Tailwind theme tokens into your global CSS file
- path alias defaults for Vite or Next.js
- local folders for components, hooks, and utilities

`add` copies source files into your app and installs only the third-party packages required by those copied components.

## Tailwind Setup

The CLI writes the required Azamat UI theme tokens into your global CSS file.

For Vite, make sure Tailwind is enabled:

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

For Next.js, import `app/globals.css` from your root layout:

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

## Component Examples

Add small primitives:

```bash
npx azamat-ui-kit-cli add button input badge tabs
```

Add form surfaces:

```bash
npx azamat-ui-kit-cli add form-input form-select form-textarea form-switch
```

Add larger dashboard pieces:

```bash
npx azamat-ui-kit-cli add data-table page-header stat-card empty-state
```

Add a preset:

```bash
npx azamat-ui-kit-cli preset dashboard
```

## Local Imports

After `init` and `add`, imports should point to your project source:

```tsx
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { FormInput } from "@/components/form/form-input"
```

Avoid importing UI components from `azamat-ui-kit` in new apps. The published runtime package remains only for compatibility and package metadata.

## Verify Setup

After setup, confirm:

- `azamat-ui.json` exists.
- Your global CSS contains Azamat UI theme tokens.
- `Button` and `Input` render from local imports.
- Tailwind is enabled in Vite or Next.js.
- There is no `azamat-ui-kit` runtime dependency in the consumer app unless you intentionally added legacy package imports.

## Governance References

These source-of-truth exports keep the public docs and component families aligned:

- `componentFamilyCatalog`
- `componentDocsGroups`
- `componentFamilyMigrationMap`
- `InputFamily`
- `SelectFamily`
- `CardFamily`
- `FormFamily`
- `DataTableFamily`

Family intent:

- `Input` is the canonical text-entry surface; presets stay subordinate.
- `Select` is the canonical choice surface.
- `AsyncSelect` and `AsyncMultiSelect` own remote and creatable option flows.
- `Combobox` stays the local filter-first branch when command-style search matters more than strict select semantics.

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
- `npm run build:cli`: CLI package build with synced source assets
- `npm run check-version-sync`: root package, CLI, registry and CLI runtime version check
- `npm run test:registry`: registry validation
- `npm run test:cli`: source-copy CLI smoke test

## Release

Before publishing:

```bash
npm run release:gate
npm publish --access public
npm publish --workspace azamat-ui-kit-cli --access public
```

The CLI package is the primary consumer entry point. Publish it whenever component source, templates, registry entries, or theme tokens change.
