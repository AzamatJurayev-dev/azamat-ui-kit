# Theme CSS strategy

Azamat UI Kit uses a CSS-first styling strategy. Components expose stable `data-slot` attributes and read visual decisions from CSS variables. The goal is to avoid creating many duplicate components only for styling differences.

## 1. Package mode

When importing the package directly, app styles are bundled from the package build.

```ts
import "azamat-ui-kit/style.css"
```

Use this only when components are consumed as a normal package from `node_modules`.

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

## Token layers

Components use base shadcn-style tokens:

```txt
--background
--foreground
--card
--popover
--primary
--secondary
--muted
--accent
--destructive
--border
--input
--ring
--sidebar
```

Azamat UI Kit also adds component-level tokens:

```txt
--aui-control-radius
--aui-control-shadow
--aui-card-radius
--aui-card-border
--aui-card-shadow
--aui-popover-shadow
--aui-table-header-bg
--aui-table-row-hover-bg
--aui-table-row-selected-bg
```

These tokens can be overridden in the consumer app:

```css
:root {
  --aui-control-radius: 0.75rem;
  --aui-card-radius: 1rem;
  --aui-card-shadow: 0 12px 32px oklch(0 0 0 / 8%);
  --aui-table-header-bg: color-mix(in oklch, var(--primary), transparent 94%);
}
```

## Slot-based styling

Reusable components expose `data-slot`. The theme layer uses those slots to polish components globally:

```css
[data-slot="card"] {
  border-radius: var(--aui-card-radius);
  box-shadow: var(--aui-card-shadow);
}

[data-slot="data-table-wrapper"] thead {
  background: var(--aui-table-header-bg);
}
```

This keeps styling centralized in CSS and keeps component APIs clean.

## Rule

Reusable components must not import project CSS directly. The app owns global theme CSS. The UI kit provides tokens, slots and safe default styles.
