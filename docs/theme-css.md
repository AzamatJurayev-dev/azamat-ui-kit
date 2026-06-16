# Theme CSS strategy

Azamat UI Kit supports two styling modes.

## 1. Package mode

When importing the package directly:

```ts
import "azamat-ui-kit/style.css"
```

Use this when components are consumed from `node_modules`.

## 2. CLI / copy mode

When using shadcn-style component copying, do not import `azamat-ui-kit/style.css` in the app.

Run:

```bash
npx azamat-ui-kit init
```

or later:

```bash
npx azamat-ui-kit theme
```

The CLI writes the required theme tokens into your app global CSS file, usually:

```txt
src/index.css
```

The CLI uses markers:

```css
/* azamat-ui-kit:start */
/* theme tokens */
/* azamat-ui-kit:end */
```

Running the command again replaces only that marked block.

## Dark and light mode

Theme switching is class-based:

```ts
document.documentElement.classList.add("dark")
document.documentElement.classList.remove("dark")
```

Recommended structure:

```tsx
function setTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark")
  localStorage.setItem("theme", theme)
}
```

Components use CSS variables such as:

```txt
bg-background
text-foreground
bg-card
text-muted-foreground
border-border
ring-ring
```

That means every project can customize color tokens in its own `index.css` without changing component source code.

## Rule

Reusable components must not import project CSS directly.
The app owns global theme CSS.
The UI kit only provides the theme block and utilities.
