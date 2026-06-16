# Notifications and command palette

This phase adds lightweight dashboard helpers that are useful in every app.

## ToastProvider

Wrap the app once:

```tsx
import { ToastProvider } from "azamat-ui-kit"

export function App() {
  return (
    <ToastProvider position="top-right">
      <Routes />
    </ToastProvider>
  )
}
```

Use it from any child component:

```tsx
import { useToast } from "azamat-ui-kit"

function SaveButton() {
  const { addToast } = useToast()

  return (
    <Button
      onClick={() => {
        addToast({
          tone: "success",
          title: "Saved",
          description: "Changes were saved successfully.",
        })
      }}
    >
      Save
    </Button>
  )
}
```

Supported tones:

```txt
default
success
info
warning
danger
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
