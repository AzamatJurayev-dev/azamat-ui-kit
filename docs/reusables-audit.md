# Reusables Audit Summary

A reusable archive from one project was reviewed. It contains many useful UI patterns, but not every file belongs in the UI kit.

## Good candidates for the UI kit

These are reusable or close to reusable:

```txt
AppModal
AppSheet
AppDialogActions
AppPagination
AppSimpleSelect
AppMoneyInput
AppQuantityInput
FormFieldShell
FormInput
FormSelect
FormAsyncSelect
FormDatePicker
FormTextarea
FormSwitch
AppTable
AppAsyncSelect
useSessionStorageState
useBeforeUnloadWhenDirty
useIsMobile
usePagination
useCursorTablePagination
usePhoneMask
useGlobalScanner
```

## Phase 1 candidates

Low-risk first batch:

```txt
ModalShell
SheetShell
ConfirmDialog
DialogActions
Pagination
SimpleSelect
MoneyInput
QuantityInput
useSessionStorageState
useBeforeUnloadWhenDirty
useIsMobile
```

## Needs refactor before moving

```txt
AppTable
AppAsyncSelect
FormAsyncSelect
usePagination
useCursorTablePagination
useGlobalScanner
usePhoneMask
```

Why: they may include project response shapes, query params, app state, connectivity, or formatting rules.

## Should not enter core UI kit

```txt
hooks/kassa-data/*
FoundationLayout
FoundationHeader
FoundationSidebar
FoundationWorkspaceSwitcher
useKassaAccess
useKassaScope
useKassaCapabilityGates
useAppLayoutModel
useAccessContext
useMe
useGlobalOptions
useFoundationLogoutAction
useOrganizationConfig
```

Reason: these are business/app architecture pieces, not generic UI kit components.

## Main rule

Move reusable visual/interaction logic into `azamat-ui-kit`. Keep product logic in the application repository.
