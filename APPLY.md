# Apply Phase 1

This file records the first reusable UI kit migration batch.

## Added

- Overlay wrappers: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`
- Navigation: `Pagination`
- Inputs: `SimpleSelect`, `MoneyInput`, `QuantityInput`
- Hooks: `useSessionStorageState`, `useBeforeUnloadWhenDirty`, `useIsMobile`
- Docs: UI kit rules, migration plan, reusable audit

## Verify

```bash
npm install
npm run build
```

## Next

Phase 2 should focus on `AsyncSelect`, `FormFieldShell`, and React Hook Form wrappers.
