# DataTable action helpers

## Row actions

```tsx
import { createDataTableActionsColumn } from "azamat-ui-kit"

const columns = [
  createDataTableActionsColumn<Product>({
    getActions: (_row, product) => [
      { key: "edit", label: "Edit", onSelect: () => edit(product) },
      {
        key: "delete",
        label: "Delete",
        destructive: true,
        onSelect: () => remove(product),
      },
    ],
  }),
]
```

## Bulk actions

```tsx
import { DataTableBulkActions } from "azamat-ui-kit"

<DataTableBulkActions
  rows={selectedRows}
  actions={[
    {
      key: "delete",
      label: "Delete selected",
      destructive: true,
      onSelect: (rows) => removeMany(rows),
    },
  ]}
  onClearSelection={() => setRowSelection({})}
/>
```

These helpers do not perform API calls themselves. The consuming app owns all mutation/navigation logic.
