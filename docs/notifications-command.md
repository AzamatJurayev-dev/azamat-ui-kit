# Notifications and command palette

This phase adds lightweight dashboard helpers that are useful in every app.

## ToastProvider

Wrap the app once:

```tsx
import { ToastProvider } from "azamat-ui-kit"

export function App() {
  return (
    <ToastProvider position="top-right" pauseOnHover>
      <Routes />
    </ToastProvider>
  )
}
```

## Basic toast API

Use the low-level API when you need full control:

```tsx
const { addToast, updateToast, dismissToast, clearToasts } = useToast()

const id = addToast({
  tone: "success",
  title: "Saved",
  description: "Changes were saved successfully.",
})

updateToast(id, { description: "Updated message" })
dismissToast(id)
clearToasts()
```

## Shortcut helpers

Use shortcut helpers for common cases:

```tsx
const toast = useToast()

toast.success("Saved")
toast.info({ title: "Info", description: "Details changed." })
toast.warning("Check required fields")
toast.error({ title: "Failed", description: "Something went wrong." })
toast.loading({ title: "Uploading", duration: 0 })
```

## Promise toast

`toast.promise` keeps the same toast id and updates it after the async task finishes:

```tsx
await toast.promise(saveProduct(values), {
  loading: { title: "Saving..." },
  success: () => ({ title: "Saved", description: "Product was saved." }),
  error: (error) => ({
    title: "Save failed",
    description: error instanceof Error ? error.message : "Unknown error",
  }),
})
```

Supported tones:

```txt
default
success
info
warning
danger
loading
```

## CommandPalette

The command palette is fully generic. It does not navigate by itself. Pass behavior through `onSelect`.

```tsx
const [open, setOpen] = React.useState(false)

useCommandPaletteShortcut(setOpen)

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  groups={[
    {
      id: "navigation",
      label: "Navigation",
      items: [
        { id: "dashboard", label: "Dashboard", onSelect: () => navigate("/dashboard") },
        { id: "products", label: "Products", onSelect: () => navigate("/products") },
      ],
    },
  ]}
/>
```

Default shortcut:

```txt
Ctrl + K
Cmd + K
```

## Async command groups

Use `loadItems` for search-backed command groups. The UI kit only calls the loader that the app passes in; routing, API clients, permissions and data shape stay outside the UI kit.

```tsx
<CommandPalette
  open={open}
  onOpenChange={setOpen}
  debounceMs={250}
  groups={[
    {
      id: "products",
      label: "Products",
      loadingLabel: "Searching products...",
      emptyLabel: "No products found.",
      loadItems: async (search) => {
        const products = await productsApi.search(search)

        return products.map((product) => ({
          id: `product-${product.id}`,
          label: product.name,
          description: product.sku,
          keywords: [product.sku],
          onSelect: () => navigate(`/products/${product.id}`),
        }))
      },
    },
  ]}
/>
```

## Recent commands

Recent commands are local component state by default. They help users repeat actions without requiring app storage.

```tsx
<CommandPalette
  recent={{ enabled: true, label: "Recently used", limit: 6 }}
  groups={groups}
/>
```

Disable them when needed:

```tsx
<CommandPalette recent={false} groups={groups} />
```

## Custom filtering and render states

```tsx
<CommandPalette
  groups={groups}
  filterItem={(item, search) => item.id.includes(search) || item.keywords?.includes(search)}
  renderEmpty={(search) => <EmptyState title={`No result for ${search}`} />}
  renderLoading={() => <LoadingState label="Loading commands" />}
/>
```

## Rules

- Toasts do not depend on any external toast package.
- Command palette does not depend on router, permissions, auth, or API clients.
- Navigation, API calls, and permissions must stay in the consuming app.
- Toast promise helpers should wrap app-owned async functions; the UI kit does not perform the request itself.
- Async command groups must be loader-driven through props and should remain optional.
