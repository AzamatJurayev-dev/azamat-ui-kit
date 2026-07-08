# azix

Azix is a source-copy-first React UI kit.

The CLI copies editable component source into your app. New projects should treat local `components` code as the canonical surface.

## Start

Next.js:

```bash
npx azix init --template next --defaults
npx azix add button input
```

Vite:

```bash
npx azix init --template vite --defaults
npx azix add button input
```

## Use

After `add`, import from local app source:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
```

## Core rule

- `init` sets up config and theme tokens.
- `add` copies component source into your app.
- Local source is the product surface.
- Runtime package import is compatibility-only, not the main path.

## Family governance

The public component model is kept intentionally small. `InputFamily`, `SelectFamily`, `CardFamily`, `FormFamily`, and `DataTableFamily` define the main grouped surfaces, while `componentFamilyCatalog`, `componentDocsGroups`, and `componentFamilyMigrationMap` keep docs, registry metadata, and migration aliases aligned.

## Current direction

The docs layer is being rebuilt from scratch around:

- source-copy workflow
- fewer public component names
- stronger component quality
- simpler theming and API contracts

## Local verification

```bash
npm run lint
npm run build
npm run test:run
```
