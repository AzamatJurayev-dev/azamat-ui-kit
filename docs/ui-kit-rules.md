# UI Kit Rules

This document defines how reusable code should enter `azamat-ui-kit`.

## Main principle

The UI kit must stay generic. It can provide reusable presentation, interaction, and state helpers, but it must not know about a specific product domain.

Do not import project API clients, auth stores, route paths, organization/branch logic, billing logic, permissions, or domain types into the UI kit.

## What can be added

Good candidates:

- UI primitives: `Button`, `Input`, `Select`, `Dialog`, `Table`, `Badge`, `Card`
- UI wrappers: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`
- Input wrappers: `SimpleSelect`, `MoneyInput`, `QuantityInput`, `PhoneInput`
- Data widgets: `Pagination`, `DataTable`, `FilterBar`, `EmptyState`, `LoadingState`
- Generic hooks: `useSessionStorageState`, `useBeforeUnloadWhenDirty`, `useIsMobile`, `useDebounce`
- Format helpers: money, phone, date, number, pagination helpers

## What must stay outside

Keep these in the app project:

- Kassa-specific layout and workspace state
- LMS routes and role logic
- Restaurant tenant, branch, table, order, and billing logic
- API service wrappers
- Permission gates
- Feature flags tied to one product
- Components that hardcode Uzbek/Russian business labels for one module

## Naming rules

Use generic names:

```txt
AppModal        -> ModalShell
AppSheet        -> SheetShell
AppPagination   -> Pagination
AppSimpleSelect -> SimpleSelect
AppMoneyInput   -> MoneyInput
AppTable        -> DataTable
ActionsCell     -> ActionMenu
```

Avoid product names in reusable code:

```txt
Bad: KassaBranchSwitcher
Good: WorkspaceSwitcher

Bad: ImmigrantStatusBadge
Good: StatusBadge
```

## Component rules

1. Components must accept data through props.
2. Components must expose callbacks instead of performing API calls internally.
3. Components should not depend on React Router unless they are explicitly navigation primitives.
4. Components should not depend on i18n; labels should be passed as props.
5. Components must export their props types when useful.
6. Components must be exported from `src/index.ts`.
7. Business adapters should be created in the app, not in the UI kit.

## Folder rules

```txt
src/components/ui/          Base primitives
src/components/overlay/     Dialog, modal, sheet wrappers
src/components/navigation/  Pagination/navigation widgets
src/components/inputs/      Input/select wrappers
src/components/data-table/  Generic table layer
src/components/form/        React Hook Form wrappers
src/hooks/                  Generic hooks
src/lib/                    Utilities
src/registry/               shadcn-style registry metadata
```

## Refactor rule

When moving a reusable component from a project:

1. Remove app imports.
2. Replace API calls with props/callbacks.
3. Replace hardcoded labels with props.
4. Replace business types with generics.
5. Export the component and its types.
6. Add a demo/example before using it widely.
