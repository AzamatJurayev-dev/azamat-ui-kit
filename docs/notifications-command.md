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

The command palette is fully generic. It does not navigate by itself. Pass actions through `onSelect`.

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

## Rules

- Toasts do not depend on any external toast package.
- Command palette does not depend on router, permissions, or auth.
- Navigation, API calls, and permissions must stay in the consuming app.
- Toast promise helpers should wrap app-owned async functions; the UI kit does not perform the request itself.
