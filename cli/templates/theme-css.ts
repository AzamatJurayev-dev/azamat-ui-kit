export const AZAMAT_UI_THEME_START = "/* azamat-ui-kit:start */"
export const AZAMAT_UI_THEME_END = "/* azamat-ui-kit:end */"
export const AZAMAT_UI_THEME_MARKER = "azamat-ui-kit"

export const azamatUiThemeCss = `${AZAMAT_UI_THEME_START}
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: 'Geist Variable', sans-serif;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root,
.light {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  --aui-control-radius: var(--radius-lg);
  --aui-control-shadow: 0 1px 2px oklch(0 0 0 / 5%);
  --aui-card-radius: var(--radius-xl);
  --aui-card-border: color-mix(in oklch, var(--border), transparent 5%);
  --aui-card-shadow: 0 1px 2px oklch(0 0 0 / 4%), 0 10px 28px oklch(0 0 0 / 4%);
  --aui-popover-shadow: 0 18px 60px oklch(0 0 0 / 16%);
  --aui-table-header-bg: color-mix(in oklch, var(--muted), transparent 42%);
  --aui-table-row-hover-bg: color-mix(in oklch, var(--muted), transparent 55%);
  --aui-table-row-selected-bg: color-mix(in oklch, var(--primary), transparent 91%);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);

  --aui-card-border: oklch(1 0 0 / 10%);
  --aui-card-shadow: 0 1px 0 oklch(1 0 0 / 5%), 0 18px 70px oklch(0 0 0 / 24%);
  --aui-popover-shadow: 0 18px 70px oklch(0 0 0 / 45%);
  --aui-table-header-bg: oklch(1 0 0 / 5%);
  --aui-table-row-hover-bg: oklch(1 0 0 / 5%);
  --aui-table-row-selected-bg: color-mix(in oklch, var(--primary), transparent 88%);
}

:root[data-radius="none"] { --radius: 0rem; }
:root[data-radius="sm"] { --radius: 0.375rem; }
:root[data-radius="md"] { --radius: 0.5rem; }
:root[data-radius="lg"] { --radius: 0.75rem; }
:root[data-radius="xl"] { --radius: 1rem; }

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    @apply font-sans;
  }

  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  [data-slot="button"][data-slot="button"] {
    border-radius: var(--aui-control-radius);
    box-shadow: var(--aui-control-shadow);
  }

  [data-slot="input"][data-slot="input"],
  [data-slot="textarea"][data-slot="textarea"],
  [data-slot="select-trigger"][data-slot="select-trigger"] {
    border-radius: var(--aui-control-radius);
    box-shadow: var(--aui-control-shadow);
  }

  [data-slot="card"][data-slot="card"],
  [data-slot="stat-card"][data-slot="stat-card"] {
    border: 1px solid var(--aui-card-border);
    border-radius: var(--aui-card-radius);
    box-shadow: var(--aui-card-shadow);
  }

  [data-slot="popover-content"][data-slot="popover-content"],
  [data-slot="dropdown-menu-content"][data-slot="dropdown-menu-content"],
  [data-slot="dialog-content"][data-slot="dialog-content"],
  [data-slot="sheet-content"][data-slot="sheet-content"] {
    box-shadow: var(--aui-popover-shadow);
  }

  [data-slot="data-table-wrapper"][data-slot="data-table-wrapper"] {
    box-shadow: var(--aui-card-shadow);
  }

  [data-slot="data-table-wrapper"] thead {
    background: var(--aui-table-header-bg);
  }

  [data-slot="data-table-wrapper"] tbody tr:hover {
    background: var(--aui-table-row-hover-bg);
  }

  [data-slot="data-table-wrapper"] tbody tr[data-state="selected"] {
    background: var(--aui-table-row-selected-bg);
  }

  [data-slot="file-upload-dropzone"][data-dragging="true"] {
    border-color: var(--primary);
    background: color-mix(in oklch, var(--primary), transparent 93%);
  }
}
${AZAMAT_UI_THEME_END}
`
