# tembro

tembro is a source-copy-first React UI kit.

The CLI copies editable component source into your app. New projects should treat local `components` code as the canonical surface.

## Start

Next.js:

```bash
npx tembro init --template next --defaults
npx tembro add button input
```

Vite:

```bash
npx tembro init --template vite --defaults
npx tembro add button input
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

## Component model

Every public surface is a component. Repeated behavior should be handled with props, hooks, helpers, and local source files, not separate family abstractions.

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
