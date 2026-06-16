# azamat-ui-kit

Personal React + TypeScript UI kit for dashboard projects. The goal is to keep shadcn-style copyable components, Ant-style universal wrappers, and project-specific business logic separate.

## What belongs here

This package should contain UI primitives, reusable wrappers, generic hooks, formatting helpers, and component registry metadata.

Good candidates:

- Button, Input, Select, Dialog, Table, Badge, Card
- ModalShell, SheetShell, ConfirmDialog, DialogActions
- Pagination, SimpleSelect, MoneyInput, QuantityInput
- DataTable, AsyncSelect, FilterBar, EmptyState, LoadingState
- useSessionStorageState, useBeforeUnloadWhenDirty, useIsMobile

Do not put project-specific Kassa, LMS, Restaurant, tenant, billing, permission, branch, or API logic into the core UI kit.

## Install from GitHub

```bash
npm install github:AzamatJurayev-dev/azamat-ui-kit#master
```

Then import styles once in the app entry:

```ts
import "azamat-ui-kit/style.css"
```

Use components:

```tsx
import { Button, ModalShell, Pagination } from "azamat-ui-kit"
```

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Component rules

1. Components must be generic and reusable.
2. Components must not import project API clients, route paths, auth stores, or business types.
3. Data loading must be passed through props like `loadOptions`, `data`, `onSubmit`, `onConfirm`.
4. Business wrappers stay in the app project, not in the UI kit.
5. Primitive UI and form wrappers should stay separate.
6. Every reusable component should export from `src/index.ts`.

## Current layers

```txt
src/components/ui/          Base primitives
src/components/overlay/     Modal, sheet, confirm dialog wrappers
src/components/navigation/  Pagination and navigation widgets
src/components/inputs/      Simple input/select wrappers
src/hooks/                  Generic React hooks
src/lib/                    Utilities
```

## Migration plan

Phase 1 adds low-risk generic wrappers:

- ModalShell
- SheetShell
- ConfirmDialog
- DialogActions
- Pagination
- SimpleSelect
- MoneyInput
- QuantityInput
- useSessionStorageState
- useBeforeUnloadWhenDirty
- useIsMobile

Phase 2 should add:

- AsyncSelect
- FormFieldShell
- FormInput
- FormSelect
- FormAsyncSelect

Phase 3 should add:

- DataTable
- DataTablePagination
- DataTableToolbar
- EmptyState
- LoadingState
- StatusBadge

Phase 4 should add shadcn-style registry metadata and CLI commands.
