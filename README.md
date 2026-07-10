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

## Migrating to 3.0

Replace compatibility component imports with the canonical API:

```tsx
// before
<FormNumberInput control={control} name="price" />
<FormAsyncSelect control={control} name="ownerId" loadOptions={loadOwners} />
<AppSidebar items={items} />
<SmartCard title="Account" />

// after
<FormInput control={control} name="price" kind="number" />
<FormSelect control={control} name="ownerId" kind="async" loadOptions={loadOwners} />
<Sidebar items={items} />
<InfoCard title="Account" />
```

The CLI still accepts old component names and redirects them to canonical source-copy entries. Removed incomplete components do not have drop-in replacements; use a production-grade implementation only when the application actually needs that interaction.

## Production interaction components

Install the new drag-and-drop and virtualization surfaces through the CLI:

```bash
npx tembro add sortable-list kanban virtual-list data-table
```

- `SortableList` supports pointer, touch, and keyboard reordering with controlled or uncontrolled state.
- `KanbanBoard` moves cards within and across columns, including empty columns and canceled operations.
- `VirtualList` keeps large collections responsive by mounting only the visible window.
- `DataTable` enables row virtualization with `virtualization={{ height: 480 }}`.

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
