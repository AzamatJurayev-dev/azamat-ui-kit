# DataTable view state

`useDataTableViewState` stores the selected DataTable view preset in `localStorage`, `sessionStorage`, or memory.

It is designed to work with `DataTableViewPresets`.

## Example

```tsx
const viewState = useDataTableViewState({
  key: "products:view",
  defaultValue: "active",
  allowedValues: ["active", "draft", "archived"],
})

<DataTableViewPresets
  value={viewState.value}
  onValueChange={viewState.setValue}
  presets={[
    { value: "active", label: "Active", count: 18 },
    { value: "draft", label: "Draft", count: 6 },
    { value: "archived", label: "Archived", count: 3 },
  ]}
/>
```

## Options

- `key` — storage key.
- `defaultValue` — selected view when no value is stored.
- `allowedValues` — prevents invalid stored values from being used.
- `storage` — `local`, `session`, or `memory`.
- `syncAcrossTabs` — updates state when localStorage changes in another tab.
- `serialize` / `deserialize` — custom storage transforms.
- `onValueChange` — callback after value changes.

## Return value

- `value`
- `setValue`
- `clearValue`
- `resetValue`
- `isDefaultValue`

## Rule

The hook only stores UI view state. It does not know about API filters, backend query params, roles, tenants, auth, or business rules.
