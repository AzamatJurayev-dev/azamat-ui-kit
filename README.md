# tembro

tembro is a source-copy-first React UI kit for production dashboards, admin panels, forms, data-heavy screens, and application shells.

The package gives you two things:

- A CLI that copies editable component source into your app.
- A typed React component library and registry metadata for docs, migration, and compatibility.

## Why source-copy-first?

Most product teams eventually need to change UI behavior, tokens, density, copy, and accessibility details. tembro treats copied local source as the main product surface so your app can own the final implementation without fighting a closed dependency.

## Start

Next.js:

```bash
npx tembro init --template next --defaults
npx tembro add button input data-table
```

Vite:

```bash
npx tembro init --template vite --defaults
npx tembro add button input data-table
```

## Use

After `add`, import from your local app source:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/data-table/data-table"
```

Runtime package imports are compatibility-oriented:

```tsx
import { Button, Input } from "tembro"
```

For production apps, prefer the local copied source because it is easier to audit, customize, and ship.

## Core rule

- `init` sets up config and theme tokens.
- `add` copies component source into your app.
- Local source is the canonical product surface.
- Runtime package import is available, but it is not the main customization path.

## Public API

The public API is intentionally organized by real product surfaces:

- `ui`: button, input, select, card, badge, dialog, table, tabs, accordion, primitives.
- `data-table`: reusable operational table with selection, pagination, toolbar, row actions, mobile cards, pinning, expansion, and virtualization.
- `form`: React Hook Form wrappers for input, select, textarea, switch, date fields, and field shell.
- `layout`: sidebar, breadcrumbs, section and page-level composition helpers.
- `display`: avatar, list, statistic, timeline, QR code, virtual list, typography, carousel, state surfaces.
- `inputs`: async select, rating, slider, tag input, color picker, signature pad, JSON input, time picker.
- `overlay`: alert dialog, confirm dialog, drawer.
- `patterns`: resource pages, form builder, empty state, settings page, data view.

Use the registry to discover the available source-copy entries:

```bash
npx tembro list
npx tembro add data-table sidebar command-palette
```

## Theme tokens

`tembro init` writes a managed theme block into your CSS. Edit tokens first, not scattered component classes.

Important token families:

- `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--border`, `--ring`.
- `--aui-radius-control`, `--aui-radius-surface`, `--aui-radius-overlay`.
- `--aui-control-surface`, `--aui-control-border-strong`, `--aui-control-shadow`.
- `--aui-sidebar-item-active-bg`, `--aui-sidebar-item-active-fg`, `--aui-sidebar-nav-item-active-bg`.
- `--aui-table-toolbar-bg`, `--aui-table-row-selected-bg`, `--aui-table-footer-bg`.

Use the preserved custom block for app-specific overrides:

```css
/* tembro:custom-styles:start */
@layer theme {
  :root {
    --aui-radius-control: 0.5rem;
  }
}
/* tembro:custom-styles:end */
```

## Production interaction components

Install advanced surfaces through the CLI:

```bash
npx tembro add sortable-list kanban virtual-list data-table command-palette
```

- `DataTable` supports search, filters, bulk actions, row actions, row click, pagination, mobile card rendering, expansion, column pinning, and virtualization.
- `SortableList` supports pointer/touch drag ordering with controlled or uncontrolled state.
- `KanbanBoard` moves cards within and across columns, including empty columns and canceled operations.
- `VirtualList` keeps large lists responsive by rendering only the visible window.
- `CommandPalette` supports grouped commands, async groups, recents, shortcuts, loading, and empty states.

## Component model

Every public surface should be useful on its own. Repeated behavior belongs in props, hooks, helpers, and local source files, not in many near-duplicate public component names.

Preferred direction:

```tsx
<FormInput control={control} name="price" kind="number" />
<FormSelect control={control} name="ownerId" kind="async" loadOptions={loadOwners} />
<Sidebar items={items} />
<InfoCard title="Account" />
```

Avoid exposing one-off wrappers unless they solve a real reusable product problem.

## Migration aliases

The CLI accepts several old names and redirects them to canonical entries. Examples:

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

Removed incomplete components do not have drop-in replacements. Add production-grade source only when the application actually needs that interaction.

## Production readiness

A component is considered production-ready when it has:

- Public props documented in the showcase API schema.
- Real preview coverage, not only a generic placeholder card.
- Light and dark token coverage through the central theme contract.
- Keyboard and focus behavior covered where interaction exists.
- Registry entry, source files, dependencies, migration aliases, and docs metadata kept in sync.
- Render/build checks passing before publish.

## Release gates

Local verification:

```bash
npm run lint
npm run build
npm run test:run
npm run test:cli
npm run test:fixtures
npm run pack:dry-run
```

Faster package gate:

```bash
npm run release:quick
```

Full publish gate:

```bash
npm run release:gate
```

The release pipeline checks:

- TypeScript and render tests.
- Registry consistency.
- Root export governance.
- API schema coverage against source props.
- Showcase quality and fallback coverage.
- Theme contract tokens/selectors.
- Package contract metadata.
- CLI behavior and fixture smoke.
- Build output and npm pack dry run.

## Docs site sync

The public docs site lives beside this repo as `azamat-ui`.

```bash
npm run sync:site
```

After sync, validate the docs repo:

```bash
cd ../azamat-ui
npm run check:version
npm run build
npm run smoke:browser
npm run test:visual
```

Intentional visual changes require updating baselines in the docs repo:

```bash
$env:UPDATE_VISUAL_BASELINES='1'; npm run test:visual
```

## Current direction

The library is moving toward:

- source-copy workflow as the default install model
- fewer, stronger public component names
- richer component demos with real behavior
- central theme tokens instead of scattered style overrides
- registry-driven docs and migration metadata
- production-grade release gates before every publish
## CLI production workflows

Tembro CLI includes workflow commands for predictable source-copy usage:

```bash
npx tembro doctor
npx tembro list --category data-table
npx tembro list --json
npx tembro add data-table --plan
```

Read the full workflow guide in `docs/cli-workflows.md`.
