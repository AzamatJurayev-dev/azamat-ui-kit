# Apply Phase 10 - DataTable Action Helpers

This patch adds advanced DataTable action helpers to `azamat-ui-kit`.

## Files

```txt
src/components/data-table/
  data-table-row-actions.tsx
  data-table-actions-column.tsx
  data-table-bulk-actions.tsx
  index.ts

docs/
  migration-plan.md
  data-table-actions.md
```

## Verify

```bash
npm run build
```

## Added components

- `DataTableRowActions`
- `createDataTableActionsColumn`
- `DataTableBulkActions`

These are generic and do not know about routes, API clients, tenant logic, or project-specific actions.
