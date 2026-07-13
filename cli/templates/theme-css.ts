export const AZAMAT_UI_THEME_START = "/* tembro:start */"
export const AZAMAT_UI_THEME_END = "/* tembro:end */"
export const AZAMAT_UI_THEME_MARKER = "tembro"

export function getAzamatUiThemeCss(componentSourcePath: string) {
  return `${AZAMAT_UI_THEME_START}
@source "${componentSourcePath}";

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

  --radius-sm: calc(var(--radius) * 0.72);
  --radius-md: calc(var(--radius) * 0.88);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.18);
  --radius-2xl: calc(var(--radius) * 1.4);
  --radius-3xl: calc(var(--radius) * 1.7);
  --radius-4xl: calc(var(--radius) * 2);
}

:root,
.light {
  /* Edit these first to reshape the whole library. */
  --background: oklch(0.988 0.004 95);
  --foreground: oklch(0.238 0.02 255);
  --card: oklch(0.998 0.002 95);
  --card-foreground: oklch(0.238 0.02 255);
  --popover: oklch(0.998 0.002 95);
  --popover-foreground: oklch(0.238 0.02 255);
  --primary: oklch(0.312 0.05 255);
  --primary-foreground: oklch(0.985 0.002 95);
  --secondary: oklch(0.958 0.008 250);
  --secondary-foreground: oklch(0.282 0.028 255);
  --muted: oklch(0.964 0.006 250);
  --muted-foreground: oklch(0.52 0.016 255);
  --accent: oklch(0.948 0.014 220);
  --accent-foreground: oklch(0.27 0.03 255);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.892 0.01 250);
  --input: oklch(0.91 0.012 250);
  --ring: oklch(0.66 0.035 245);
  --chart-1: oklch(0.68 0.13 245);
  --chart-2: oklch(0.74 0.1 205);
  --chart-3: oklch(0.78 0.11 165);
  --chart-4: oklch(0.72 0.15 45);
  --chart-5: oklch(0.66 0.15 15);
  --radius: 0.625rem;
  --sidebar: oklch(0.982 0.006 250);
  --sidebar-foreground: oklch(0.238 0.02 255);
  --sidebar-primary: oklch(0.312 0.05 255);
  --sidebar-primary-foreground: oklch(0.985 0.002 95);
  --sidebar-accent: oklch(0.95 0.012 240);
  --sidebar-accent-foreground: oklch(0.27 0.03 255);
  --sidebar-border: oklch(0.89 0.012 250);
  --sidebar-ring: oklch(0.66 0.035 245);
  --aui-info: oklch(0.61 0.13 245);
  --aui-info-foreground: oklch(0.985 0.004 95);
  --aui-success: oklch(0.68 0.14 160);
  --aui-success-foreground: oklch(0.985 0.004 95);
  --aui-warning: oklch(0.76 0.15 80);
  --aui-warning-foreground: oklch(0.24 0.02 80);
  --aui-danger: var(--destructive);
  --aui-danger-foreground: oklch(0.985 0.004 95);

  --aui-radius-control: var(--radius-md);
  --aui-radius-surface: var(--radius-lg);
  --aui-radius-overlay: var(--radius-xl);
  --aui-radius-pill: 999px;
  --aui-control-height-sm: 2rem;
  --aui-control-height-md: 2.5rem;
  --aui-control-height-lg: 2.75rem;
  --aui-motion-fast: 140ms;
  --aui-motion-normal: 220ms;
  --aui-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --aui-disabled-opacity: 0.52;
  --aui-shadow-xs: 0 1px 2px oklch(0.24 0.02 255 / 5%);
  --aui-shadow-sm: 0 1px 3px oklch(0.24 0.02 255 / 7%);
  --aui-shadow-md: 0 8px 24px oklch(0.24 0.02 255 / 8%);
  --aui-shadow-lg: 0 16px 36px oklch(0.24 0.02 255 / 10%);
  --aui-surface-base: var(--background);
  --aui-surface-raised: color-mix(in oklch, var(--background), white 42%);
  --aui-surface-muted: color-mix(in oklch, var(--muted), var(--background) 52%);
  --aui-border-strong: color-mix(in oklch, var(--border), var(--foreground) 7%);

  --aui-control-radius: var(--aui-radius-control);
  --aui-focus-ring: color-mix(in oklch, var(--ring), transparent 44%);
  --aui-focus-ring-soft: color-mix(in oklch, var(--ring), transparent 82%);
  --aui-danger-ring: color-mix(in oklch, var(--destructive), transparent 48%);
  --aui-danger-ring-soft: color-mix(in oklch, var(--destructive), transparent 86%);
  --aui-warning-ring: color-mix(in oklch, var(--aui-warning), transparent 48%);
  --aui-warning-ring-soft: color-mix(in oklch, var(--aui-warning), transparent 86%);
  --aui-control-surface: var(--aui-surface-raised);
  --aui-control-surface-hover: color-mix(in oklch, var(--aui-surface-raised), white 12%);
  --aui-control-surface-muted: var(--aui-surface-muted);
  --aui-control-surface-disabled: color-mix(in oklch, var(--muted), var(--background) 62%);
  --aui-control-surface-readonly: color-mix(in oklch, var(--muted), var(--background) 78%);
  --aui-control-shadow: var(--aui-shadow-sm);
  --aui-control-border-strong: var(--aui-border-strong);
  --aui-control-hover-border: color-mix(in oklch, var(--ring), transparent 68%);
  --aui-control-panel-bg: var(--aui-surface-raised);
  --aui-control-panel-shadow: var(--aui-shadow-md);
  --aui-card-radius: var(--aui-radius-surface);
  --aui-card-border: color-mix(in oklch, var(--border), white 8%);
  --aui-card-shadow: var(--aui-shadow-md);
  --aui-card-shadow-hover: var(--aui-shadow-lg);
  --aui-card-soft-bg: color-mix(in oklch, var(--muted), var(--background) 34%);
  --aui-card-outline-bg: var(--aui-surface-raised);
  --aui-popover-shadow: var(--aui-shadow-lg);
  --aui-overlay-surface: var(--popover);
  --aui-overlay-border: color-mix(in oklch, var(--border), white 8%);
  --aui-overlay-footer-bg: color-mix(in oklch, var(--muted), var(--background) 30%);
  --aui-sidebar-surface: var(--sidebar);
  --aui-sidebar-border: color-mix(in oklch, var(--sidebar-border), white 6%);
  --aui-sidebar-item-bg: transparent;
  --aui-sidebar-item-hover-bg: color-mix(in oklch, var(--sidebar-accent), transparent 12%);
  --aui-sidebar-item-active-bg: color-mix(in oklch, var(--sidebar-primary), transparent 70%);
  --aui-sidebar-item-active-border: color-mix(in oklch, var(--sidebar-primary), transparent 48%);
  --aui-sidebar-item-active-fg: color-mix(in oklch, var(--sidebar-foreground), white 6%);
  --aui-sidebar-item-indicator: var(--sidebar-primary);
  --aui-sidebar-section-label: color-mix(in oklch, var(--sidebar-foreground), transparent 34%);
  --aui-sidebar-action-fg: color-mix(in oklch, var(--sidebar-foreground), transparent 4%);
  --aui-sidebar-nav-item-bg: transparent;
  --aui-sidebar-nav-item-hover-bg: color-mix(in oklch, var(--muted), transparent 68%);
  --aui-sidebar-nav-item-active-bg: color-mix(in oklch, var(--foreground), transparent 94%);
  --aui-sidebar-nav-item-active-border: color-mix(in oklch, var(--border), white 4%);
  --aui-sidebar-nav-active-indicator: var(--primary);
  --aui-table-surface: var(--card);
  --aui-table-container-surface: var(--aui-surface-raised);
  --aui-table-border: color-mix(in oklch, var(--border), white 5%);
  --aui-table-selection-surface: color-mix(in oklch, var(--background), white 28%);
  --aui-button-primary-shadow: 0 10px 24px color-mix(in oklch, var(--primary), transparent 88%);
  --aui-button-danger-shadow: 0 10px 24px color-mix(in oklch, var(--destructive), transparent 89%);
  --aui-table-header-bg: color-mix(in oklch, var(--muted), var(--background) 26%);
  --aui-table-toolbar-bg: var(--aui-surface-raised);
  --aui-table-toolbar-border: color-mix(in oklch, var(--border), white 16%);
  --aui-table-row-hover-bg: color-mix(in oklch, var(--accent), white 55%);
  --aui-table-row-selected-bg: color-mix(in oklch, var(--primary), white 90%);
  --aui-table-stripe-bg: oklch(0.978 0.004 250 / 55%);
  --aui-table-footer-bg: linear-gradient(180deg, oklch(0.994 0.002 95), oklch(0.974 0.006 250));
}

.dark {
  --background: oklch(0.19 0.01 255);
  --foreground: oklch(0.965 0.004 95);
  --card: oklch(0.235 0.012 255);
  --card-foreground: oklch(0.965 0.004 95);
  --popover: oklch(0.235 0.012 255);
  --popover-foreground: oklch(0.965 0.004 95);
  --primary: oklch(0.82 0.04 235);
  --primary-foreground: oklch(0.205 0.014 255);
  --secondary: oklch(0.29 0.012 255);
  --secondary-foreground: oklch(0.965 0.004 95);
  --muted: oklch(0.29 0.012 255);
  --muted-foreground: oklch(0.78 0.012 250);
  --accent: oklch(0.31 0.018 235);
  --accent-foreground: oklch(0.97 0.004 95);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 14%);
  --ring: oklch(0.68 0.03 235);
  --chart-1: oklch(0.78 0.11 235);
  --chart-2: oklch(0.74 0.1 205);
  --chart-3: oklch(0.72 0.1 165);
  --chart-4: oklch(0.76 0.11 45);
  --chart-5: oklch(0.74 0.12 15);
  --sidebar: oklch(0.215 0.012 255);
  --sidebar-foreground: oklch(0.965 0.004 95);
  --sidebar-primary: oklch(0.82 0.04 235);
  --sidebar-primary-foreground: oklch(0.205 0.014 255);
  --sidebar-accent: oklch(0.29 0.012 255);
  --sidebar-accent-foreground: oklch(0.965 0.004 95);
  --sidebar-border: oklch(1 0 0 / 12%);
  --sidebar-ring: oklch(0.68 0.03 235);
  --aui-info: oklch(0.7 0.1 235);
  --aui-info-foreground: oklch(0.19 0.012 255);
  --aui-success: oklch(0.76 0.12 160);
  --aui-success-foreground: oklch(0.19 0.012 255);
  --aui-warning: oklch(0.8 0.13 82);
  --aui-warning-foreground: oklch(0.19 0.012 255);
  --aui-danger: var(--destructive);
  --aui-danger-foreground: oklch(0.19 0.012 255);

  --aui-focus-ring: color-mix(in oklch, var(--ring), transparent 40%);
  --aui-focus-ring-soft: color-mix(in oklch, var(--ring), transparent 80%);
  --aui-danger-ring: color-mix(in oklch, var(--destructive), transparent 46%);
  --aui-danger-ring-soft: color-mix(in oklch, var(--destructive), transparent 84%);
  --aui-warning-ring: color-mix(in oklch, var(--aui-warning), transparent 46%);
  --aui-warning-ring-soft: color-mix(in oklch, var(--aui-warning), transparent 84%);
  --aui-radius-control: var(--radius-lg);
  --aui-radius-surface: var(--radius-xl);
  --aui-shadow-xs: 0 1px 2px oklch(0 0 0 / 12%);
  --aui-shadow-sm: 0 1px 3px oklch(0 0 0 / 16%);
  --aui-shadow-md: 0 12px 30px oklch(0 0 0 / 26%);
  --aui-shadow-lg: 0 22px 54px oklch(0 0 0 / 36%);
  --aui-surface-base: var(--background);
  --aui-surface-raised: oklch(1 0 0 / 4%);
  --aui-surface-muted: oklch(1 0 0 / 6%);
  --aui-border-strong: oklch(1 0 0 / 16%);

  --aui-control-surface: var(--aui-surface-raised);
  --aui-control-surface-hover: oklch(1 0 0 / 7%);
  --aui-control-surface-muted: var(--aui-surface-muted);
  --aui-control-surface-disabled: oklch(1 0 0 / 3%);
  --aui-control-surface-readonly: oklch(1 0 0 / 4%);
  --aui-control-shadow: var(--aui-shadow-sm);
  --aui-card-border: oklch(1 0 0 / 10%);
  --aui-card-shadow: var(--aui-shadow-md);
  --aui-card-shadow-hover: var(--aui-shadow-lg);
  --aui-card-soft-bg: var(--aui-surface-muted);
  --aui-card-outline-bg: oklch(1 0 0 / 2%);
  --aui-popover-shadow: var(--aui-shadow-lg);
  --aui-overlay-surface: var(--popover);
  --aui-overlay-border: oklch(1 0 0 / 10%);
  --aui-overlay-footer-bg: oklch(1 0 0 / 5%);
  --aui-sidebar-surface: var(--sidebar);
  --aui-sidebar-border: oklch(1 0 0 / 10%);
  --aui-sidebar-item-bg: transparent;
  --aui-sidebar-item-hover-bg: oklch(1 0 0 / 10%);
  --aui-sidebar-item-active-bg: color-mix(in oklch, var(--sidebar-primary), transparent 70%);
  --aui-sidebar-item-active-border: color-mix(in oklch, var(--sidebar-primary), transparent 46%);
  --aui-sidebar-item-active-fg: var(--sidebar-foreground);
  --aui-sidebar-item-indicator: var(--sidebar-primary);
  --aui-sidebar-section-label: color-mix(in oklch, var(--sidebar-foreground), transparent 28%);
  --aui-sidebar-action-fg: color-mix(in oklch, var(--sidebar-foreground), transparent 3%);
  --aui-sidebar-nav-item-bg: transparent;
  --aui-sidebar-nav-item-hover-bg: oklch(1 0 0 / 6%);
  --aui-sidebar-nav-item-active-bg: oklch(1 0 0 / 7%);
  --aui-sidebar-nav-item-active-border: oklch(1 0 0 / 10%);
  --aui-sidebar-nav-active-indicator: var(--primary);
  --aui-table-surface: var(--card);
  --aui-table-container-surface: var(--aui-surface-raised);
  --aui-table-border: oklch(1 0 0 / 8%);
  --aui-table-selection-surface: oklch(1 0 0 / 4%);
  --aui-control-border-strong: var(--aui-border-strong);
  --aui-control-hover-border: color-mix(in oklch, var(--ring), transparent 72%);
  --aui-control-panel-bg: var(--aui-surface-raised);
  --aui-control-panel-shadow: var(--aui-shadow-md);
  --aui-button-primary-shadow: 0 10px 26px color-mix(in oklch, var(--primary), transparent 88%);
  --aui-button-danger-shadow: 0 10px 26px color-mix(in oklch, var(--destructive), transparent 88%);
  --aui-table-header-bg: color-mix(in oklch, var(--muted), var(--background) 24%);
  --aui-table-toolbar-bg: var(--aui-surface-raised);
  --aui-table-toolbar-border: oklch(1 0 0 / 9%);
  --aui-table-row-hover-bg: oklch(1 0 0 / 5%);
  --aui-table-row-selected-bg: color-mix(in oklch, var(--primary), transparent 84%);
  --aui-table-stripe-bg: oklch(1 0 0 / 3%);
  --aui-table-footer-bg: linear-gradient(180deg, oklch(0.245 0.012 255), oklch(0.215 0.012 255));
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

@keyframes aui-spin {
  to { transform: rotate(360deg); }
}

@layer components {
  [data-slot="text"][data-size="sm"] {
    font-size: 0.875rem;
    line-height: 1.45;
  }

  [data-slot="text"][data-size="lg"] {
    font-size: 1.125rem;
    line-height: 1.6;
  }

  [data-slot="text"][data-muted="true"] {
    color: var(--muted-foreground);
  }

  [data-slot="heading"] {
    font-family: var(--font-heading);
    font-weight: 650;
    letter-spacing: -0.025em;
    text-wrap: balance;
  }

  [data-slot="heading"][data-level="1"] { font-size: clamp(2.25rem, 5vw, 3.75rem); line-height: 1.02; }
  [data-slot="heading"][data-level="2"] { font-size: clamp(1.875rem, 3vw, 3rem); line-height: 1.08; }
  [data-slot="heading"][data-level="3"] { font-size: clamp(1.5rem, 2vw, 2.25rem); line-height: 1.15; }
  [data-slot="heading"][data-level="4"] { font-size: 1.25rem; line-height: 1.3; }

  [data-slot="blockquote"] {
    border-inline-start: 0.25rem solid var(--border);
    padding-inline-start: 1rem;
    color: var(--muted-foreground);
    font-style: italic;
  }

  [data-slot="mark"] {
    border-radius: calc(var(--aui-radius-control) * 0.65);
    background: color-mix(in oklch, var(--aui-warning), transparent 72%);
    color: color-mix(in oklch, var(--aui-warning-foreground), black 8%);
    padding: 0.125rem 0.25rem;
  }

  [data-slot="spoiler"] {
    border: 1px solid var(--aui-card-border);
    border-radius: var(--aui-card-radius);
    background: var(--aui-surface-raised);
    padding: 0.75rem;
    box-shadow: var(--aui-shadow-xs);
  }

  [data-slot="spoiler-summary"] {
    cursor: pointer;
    font-weight: 600;
  }

  [data-slot="password-caps-lock"] {
    display: none;
    color: color-mix(in oklch, var(--aui-warning), black 14%);
    font-size: 0.75rem;
  }

  @media (min-width: 40rem) {
    [data-slot="password-caps-lock"] { display: inline; }
  }

  [data-slot="password-toggle"] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(var(--aui-control-radius) * 0.6);
    padding: 0.125rem;
    color: var(--muted-foreground);
    transition: color var(--aui-motion-fast) var(--aui-ease-standard), box-shadow var(--aui-motion-fast) var(--aui-ease-standard);
  }

  [data-slot="password-toggle"]:hover { color: var(--foreground); }
  [data-slot="password-toggle"]:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--aui-focus-ring); }
  [data-slot="password-toggle"]:disabled { pointer-events: none; opacity: var(--aui-disabled-opacity); }
  [data-slot="password-toggle"] [data-icon] { width: 1rem; height: 1rem; }

  [data-slot="alert"] {
    border-color: var(--aui-card-border);
    border-radius: var(--aui-card-radius);
    background: var(--aui-surface-raised);
    box-shadow: var(--aui-shadow-sm);
  }

  :is([data-slot="checkbox"], [data-slot="radio-group-item"]) {
    border-color: var(--aui-control-border-strong);
    background: var(--aui-control-surface);
    box-shadow: var(--aui-shadow-xs);
    transition: border-color var(--aui-motion-fast) var(--aui-ease-standard), background-color var(--aui-motion-fast) var(--aui-ease-standard), box-shadow var(--aui-motion-fast) var(--aui-ease-standard);
  }

  :is([data-slot="checkbox"], [data-slot="radio-group-item"]):focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px var(--aui-focus-ring), 0 0 0 4px var(--aui-focus-ring-soft);
  }

  :is([data-slot="checkbox"], [data-slot="radio-group-item"])[data-state="checked"] {
    border-color: var(--primary);
    background: var(--primary);
    color: var(--primary-foreground);
  }

  [data-slot="switch"] {
    border: 1px solid var(--aui-control-border-strong);
    background: var(--aui-control-surface-muted);
    box-shadow: var(--aui-shadow-xs);
    transition: border-color var(--aui-motion-fast) var(--aui-ease-standard), background-color var(--aui-motion-fast) var(--aui-ease-standard), box-shadow var(--aui-motion-fast) var(--aui-ease-standard);
  }

  [data-slot="switch"][data-state="checked"] {
    border-color: var(--primary);
    background: var(--primary);
  }

  [data-slot="switch"]:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px var(--aui-focus-ring), 0 0 0 4px var(--aui-focus-ring-soft);
  }

  [data-slot="switch-thumb"] {
    background: var(--background);
    box-shadow: var(--aui-shadow-sm);
  }

  [data-slot="skeleton"] {
    background: var(--aui-surface-muted);
    border-radius: var(--aui-control-radius);
  }

  [data-slot="kbd"] {
    border-color: var(--aui-control-border-strong);
    border-radius: calc(var(--aui-control-radius) * 0.7);
    background: var(--aui-control-surface-muted);
    color: var(--muted-foreground);
    box-shadow: inset 0 -1px 0 var(--aui-control-border-strong);
  }

  :is([data-slot="command"], [data-slot="right-click-menu-content"]) {
    border-color: var(--aui-overlay-border);
    border-radius: var(--aui-radius-overlay);
    background: var(--aui-overlay-surface);
    box-shadow: var(--aui-popover-shadow);
  }

  [data-slot="command-item"] {
    border-radius: var(--aui-control-radius);
    transition: background-color var(--aui-motion-fast) var(--aui-ease-standard), color var(--aui-motion-fast) var(--aui-ease-standard);
  }

  [data-slot="command-item"][data-selected="true"] {
    background: var(--accent);
    color: var(--accent-foreground);
  }

  [data-slot="avatar"] {
    border-color: var(--aui-card-border);
    background: var(--aui-surface-muted);
    box-shadow: var(--aui-shadow-xs);
  }

  [data-slot="avatar-fallback"] {
    color: var(--muted-foreground);
  }

  [data-slot="progress-track"] {
    background: var(--aui-control-surface-muted);
  }

  [data-slot="progress-indicator"] {
    background: var(--primary);
    transition: width var(--aui-motion-normal) var(--aui-ease-standard);
  }

  [data-slot="pagination"] {
    --aui-pagination-active-bg: var(--primary);
    --aui-pagination-active-fg: var(--primary-foreground);
  }

  [data-slot="button"][data-slot="button"] {
    border-radius: var(--aui-control-radius);
    box-shadow: var(--aui-control-shadow);
    border-color: var(--aui-control-border-strong);
    background: var(--aui-control-surface);
    color: var(--foreground);
  }

  [data-slot="button"][data-slot="button"] {
    gap: 0.375rem;
    font-size: 0.875rem;
    font-weight: 650;
    transition: transform var(--aui-motion-fast) var(--aui-ease-standard), background-color var(--aui-motion-fast) var(--aui-ease-standard), border-color var(--aui-motion-fast) var(--aui-ease-standard), color var(--aui-motion-fast) var(--aui-ease-standard), box-shadow var(--aui-motion-fast) var(--aui-ease-standard), opacity var(--aui-motion-fast) var(--aui-ease-standard);
  }

  [data-slot="button"]:active:not([aria-haspopup]):not(:disabled) { transform: translateY(1px); }
  [data-slot="button"][data-pressed="true"] { box-shadow: var(--aui-control-shadow), 0 0 0 1px var(--aui-focus-ring); }

  [data-slot="button"][data-size="default"],
  [data-slot="button"][data-size="md"] { height: 2.25rem; padding-inline: 0.875rem; }

  [data-slot="button"][data-size="xs"] { height: 1.75rem; gap: 0.25rem; border-radius: var(--radius-sm); padding-inline: 0.625rem; font-size: 0.75rem; }
  [data-slot="button"][data-size="sm"] { height: 2rem; gap: 0.25rem; border-radius: var(--radius-md); padding-inline: 0.875rem; font-size: 0.82rem; }
  [data-slot="button"][data-size="lg"] { height: 2.5rem; padding-inline: 1rem; }
  [data-slot="button"][data-size="xl"] { height: 2.75rem; gap: 0.5rem; padding-inline: 1.25rem; font-size: 1rem; }

  [data-slot="button"][data-size="icon"] { width: 2.25rem; height: 2.25rem; padding: 0; }
  [data-slot="button"][data-size="icon-xs"] { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm); padding: 0; }
  [data-slot="button"][data-size="icon-sm"] { width: 2rem; height: 2rem; border-radius: var(--radius-md); padding: 0; }
  [data-slot="button"][data-size="icon-lg"] { width: 2.5rem; height: 2.5rem; padding: 0; }

  [data-slot="button"] [data-slot="button-icon"] { display: inline-flex; flex-shrink: 0; align-items: center; justify-content: center; }
  [data-slot="button"] svg { width: 1rem; height: 1rem; }
  [data-slot="button"][data-size="xs"] svg,
  [data-slot="button"][data-size="icon-xs"] svg { width: 0.75rem; height: 0.75rem; }
  [data-slot="button"][data-size="sm"] svg { width: 0.875rem; height: 0.875rem; }

  [data-slot="button-spinner"] {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: var(--aui-radius-pill);
    opacity: 0.8;
    animation: aui-spin 700ms linear infinite;
  }

  [data-slot="button"][data-slot="button"]:focus-visible {
    box-shadow: var(--aui-control-shadow), 0 0 0 1px var(--aui-focus-ring), 0 0 0 5px var(--aui-focus-ring-soft);
  }

  [data-slot="button"][data-slot="button"]:not(:disabled):not([aria-disabled="true"]):hover {
    border-color: var(--aui-control-hover-border);
    background: var(--aui-control-surface-hover);
  }

  [data-slot="button"][data-variant="default"] {
    border-color: color-mix(in oklch, var(--primary), black 10%);
    background: var(--primary);
    color: var(--primary-foreground);
    box-shadow: var(--aui-button-primary-shadow);
  }

  [data-slot="button"][data-variant="default"]:not(:disabled):not([aria-disabled="true"]):hover {
    background: color-mix(in oklch, var(--primary), white 10%);
    box-shadow: 0 12px 28px color-mix(in oklch, var(--primary), transparent 84%);
  }

  [data-slot="button"][data-variant="secondary"] {
    border-color: color-mix(in oklch, var(--border), var(--foreground) 8%);
    background: color-mix(in oklch, var(--secondary), var(--background) 18%);
    color: var(--secondary-foreground);
  }

  [data-slot="button"][data-variant="outline"] {
    background: var(--aui-control-surface);
    color: var(--foreground);
    box-shadow: none;
  }

  [data-slot="button"][data-variant="outline"]:not(:disabled):not([aria-disabled="true"]):hover {
    background: color-mix(in oklch, var(--background), transparent 14%);
  }

  [data-slot="button"][data-variant="ghost"] {
    border-color: transparent;
    background: transparent;
    box-shadow: none;
    color: color-mix(in oklch, var(--foreground), transparent 12%);
  }

  [data-slot="button"][data-variant="ghost"]:not(:disabled):not([aria-disabled="true"]):hover {
    border-color: color-mix(in oklch, var(--border), var(--foreground) 8%);
    background: color-mix(in oklch, var(--accent), transparent 22%);
  }

  [data-slot="button"][data-variant="destructive"] {
    border-color: color-mix(in oklch, var(--destructive), black 8%);
    background: var(--destructive);
    color: var(--aui-danger-foreground);
    box-shadow: var(--aui-button-danger-shadow);
  }

  [data-slot="button"][data-variant="destructive"]:not(:disabled):not([aria-disabled="true"]):hover {
    background: color-mix(in oklch, var(--destructive), white 10%);
  }

  [data-slot="button"][data-variant="warning"] {
    border-color: color-mix(in oklch, var(--aui-warning), transparent 64%);
    background: color-mix(in oklch, var(--aui-warning), transparent 82%);
    color: color-mix(in oklch, var(--aui-warning-foreground), black 12%);
    box-shadow: 0 10px 24px color-mix(in oklch, var(--aui-warning), transparent 86%);
  }

  [data-slot="button"][data-variant="warning"]:not(:disabled):not([aria-disabled="true"]) {
    background: color-mix(in oklch, var(--aui-warning), transparent 74%);
    box-shadow: 0 12px 28px color-mix(in oklch, var(--aui-warning), transparent 84%);
  }

  [data-slot="button"][data-variant="link"] {
    border-color: transparent;
    background: transparent;
    box-shadow: none;
    color: var(--primary);
  }

  [data-slot="button"][data-variant="link"]:not(:disabled):not([aria-disabled="true"]):hover {
    border-color: transparent;
    background: transparent;
    color: color-mix(in oklch, var(--primary), white 16%);
  }

  [data-slot="button"][data-loading="true"] {
    cursor: progress;
  }

  [data-slot="button"]:disabled,
  [data-slot="button"][aria-disabled="true"] {
    border-color: color-mix(in oklch, var(--border), transparent 24%);
    background: var(--aui-control-surface-disabled);
    color: color-mix(in oklch, var(--muted-foreground), transparent 8%);
    box-shadow: none;
  }

  [data-slot="button"][data-variant="default"]:disabled,
  [data-slot="button"][data-variant="default"][aria-disabled="true"],
  [data-slot="button"][data-variant="destructive"]:disabled,
  [data-slot="button"][data-variant="destructive"][aria-disabled="true"] {
    color: color-mix(in oklch, var(--primary-foreground), transparent 24%);
  }

  [data-slot="button"][data-variant="warning"]:disabled,
  [data-slot="button"][data-variant="warning"][aria-disabled="true"] {
    color: color-mix(in oklch, var(--aui-warning-foreground), transparent 30%);
    background: color-mix(in oklch, var(--aui-warning), transparent 60%);
  }

  [data-slot="button"][data-variant="link"]:disabled,
  [data-slot="button"][data-variant="link"][aria-disabled="true"],
  [data-slot="button"][data-variant="ghost"]:disabled,
  [data-slot="button"][data-variant="ghost"][aria-disabled="true"] {
    border-color: transparent;
    background: transparent;
  }

  [data-slot="input"][data-slot="input"],
  [data-slot="textarea"][data-slot="textarea"],
  [data-slot="select-trigger"][data-slot="select-trigger"] {
    border-color: var(--aui-control-border-strong);
    border-radius: var(--aui-control-radius);
    background: var(--aui-control-surface);
    box-shadow: var(--aui-control-shadow);
  }

  [data-slot="input"][data-slot="input"]:hover,
  [data-slot="textarea"][data-slot="textarea"]:hover,
  [data-slot="select-trigger"][data-slot="select-trigger"]:hover {
    border-color: var(--aui-control-hover-border);
    background: var(--aui-control-surface-hover);
  }

  [data-slot="input"][data-slot="input"]:focus-visible,
  [data-slot="textarea"][data-slot="textarea"]:focus-visible,
  [data-slot="select-trigger"][data-slot="select-trigger"]:focus-visible {
    box-shadow: var(--aui-control-shadow), 0 0 0 1px var(--aui-focus-ring), 0 0 0 5px var(--aui-focus-ring-soft);
  }

  [data-slot="input"][data-slot="input"]:disabled,
  [data-slot="textarea"][data-slot="textarea"]:disabled,
  [data-slot="select-trigger"][data-slot="select-trigger"]:disabled {
    background: var(--aui-control-surface-disabled);
    border-color: color-mix(in oklch, var(--border), transparent 18%);
    box-shadow: none;
  }

  [data-slot="input"][data-slot="input"][readonly],
  [data-slot="textarea"][data-slot="textarea"][readonly] {
    background: var(--aui-control-surface-readonly);
    box-shadow: none;
  }

  [data-slot="input-field"][data-slot="input-field"] {
    width: 100%;
  }

  [data-slot="form-field-shell"] { border-radius: var(--aui-radius-surface); }
  [data-slot="form-field-label"] { color: var(--foreground); font-size: 0.875rem; font-weight: 650; line-height: 1; letter-spacing: -0.01em; }
  [data-slot="form-field-shell"][data-disabled="true"] :is([data-slot="form-field-label"], [data-slot="form-field-description"]) { cursor: not-allowed; opacity: var(--aui-disabled-opacity); }
  [data-slot="form-field-shell"][data-readonly="true"] [data-slot="form-field-label"] { opacity: 0.8; }
  [data-slot="form-field-required"] { margin-inline-start: 0.25rem; color: var(--destructive); }
  [data-slot="form-field-label-action"] { flex-shrink: 0; font-size: 0.875rem; }
  [data-slot="form-field-description"],
  [data-slot="form-field-loading"] { color: var(--muted-foreground); font-size: 0.875rem; line-height: 1.5rem; }
  :is([data-slot="form-field-error"], [data-slot="form-field-success"]) { border-radius: var(--aui-radius-surface); padding: 0.5rem 0.75rem; font-size: 0.875rem; font-weight: 500; line-height: 1.5rem; }
  [data-slot="form-field-error"] { border: 1px solid color-mix(in oklch, var(--destructive), transparent 82%); background: color-mix(in oklch, var(--destructive), transparent 92%); color: var(--destructive); }
  [data-slot="form-field-success"] { border: 1px solid color-mix(in oklch, var(--aui-success), transparent 78%); background: color-mix(in oklch, var(--aui-success), transparent 91%); color: color-mix(in oklch, var(--aui-success), black 18%); }
  [data-slot="form-field-error-icon"] { margin-top: 0.25rem; }
  [data-slot="form-field-error-icon"] svg { width: 0.875rem; height: 0.875rem; }

  [data-slot="input-helper"] { color: var(--muted-foreground); font-size: 0.75rem; line-height: 1.25rem; }
  [data-slot="input-count"] { color: var(--muted-foreground); font-size: 0.6875rem; font-weight: 500; }
  :is([data-slot="input-helper"], [data-slot="input-count"])[data-invalid="true"] { color: var(--destructive); }
  [data-slot="input-group-text"] { color: var(--muted-foreground); font-size: 0.875rem; }
  [data-slot="input-group-text"] svg { width: 1rem; height: 1rem; }

  [data-slot="input-meta"][data-slot="input-meta"] {
    color: var(--muted-foreground);
  }

  [data-slot="input-count"][data-slot="input-count"] {
    color: color-mix(in oklch, var(--muted-foreground), transparent 8%);
  }

  [data-slot="input"][aria-invalid="true"],
  [data-slot="textarea"][aria-invalid="true"],
  [data-slot="select-trigger"][aria-invalid="true"] {
    border-color: color-mix(in oklch, var(--destructive), transparent 26%);
    box-shadow: var(--aui-control-shadow), 0 0 0 1px var(--aui-danger-ring), 0 0 0 5px var(--aui-danger-ring-soft);
  }

  [data-slot="badge"][data-slot="badge"] {
    border-color: color-mix(in oklch, var(--border), var(--foreground) 5%);
    background: color-mix(in oklch, var(--muted), var(--background) 42%);
    color: var(--foreground);
    box-shadow: inset 0 1px 0 color-mix(in oklch, white, transparent 38%);
  }

  [data-slot="badge"][data-variant="soft"] {
    border-color: transparent;
    background: color-mix(in oklch, var(--muted), transparent 38%);
    color: var(--foreground);
    box-shadow: none;
  }

  [data-slot="badge"][data-size="sm"] { min-height: 1.25rem; gap: 0.3rem; padding: 0.125rem 0.625rem; font-size: 0.64rem; }
  [data-slot="badge"][data-size="default"] { min-height: 1.5rem; gap: 0.375rem; padding: 0.25rem 0.75rem; font-size: 0.7rem; }
  [data-slot="badge"][data-size="lg"] { min-height: 1.75rem; gap: 0.375rem; padding: 0.25rem 0.875rem; font-size: 0.78rem; }

  [data-slot="badge-dot"] { width: 0.375rem; height: 0.375rem; flex-shrink: 0; border-radius: var(--aui-radius-pill); background: currentColor; opacity: 0.75; }
  [data-slot="badge-icon"] { display: inline-flex; flex-shrink: 0; align-items: center; }
  [data-slot="badge-icon"] svg { width: 0.75rem; height: 0.75rem; }
  [data-slot="badge-count"] { display: inline-flex; min-width: 1.25rem; align-items: center; justify-content: center; border-radius: var(--aui-radius-pill); background: color-mix(in oklch, currentColor, transparent 88%); padding: 0.125rem 0.375rem; font-size: 0.72em; font-weight: 650; }
  [data-slot="badge-remove"] { display: inline-flex; width: 1rem; height: 1rem; flex-shrink: 0; align-items: center; justify-content: center; border-radius: var(--aui-radius-pill); background: color-mix(in oklch, currentColor, transparent 90%); opacity: 0.8; transition: opacity var(--aui-motion-fast) var(--aui-ease-standard), box-shadow var(--aui-motion-fast) var(--aui-ease-standard); }
  [data-slot="badge-remove"]:hover { opacity: 1; }
  [data-slot="badge-remove"]:focus-visible { outline: none; box-shadow: 0 0 0 2px color-mix(in oklch, currentColor, transparent 65%); }
  [data-slot="badge-remove"] svg { width: 0.75rem; height: 0.75rem; }

  [data-slot="badge"][data-variant="default"] {
    border-color: color-mix(in oklch, var(--primary), transparent 64%);
    background: color-mix(in oklch, var(--primary), transparent 82%);
    color: color-mix(in oklch, var(--primary), black 28%);
  }

  [data-slot="badge"][data-variant="secondary"] {
    border-color: color-mix(in oklch, var(--border), var(--foreground) 6%);
    background: color-mix(in oklch, var(--muted), var(--background) 26%);
  }

  [data-slot="badge"][data-variant="outline"] {
    background: transparent;
    box-shadow: none;
  }

  [data-slot="badge"][data-variant="ghost"] {
    border-color: transparent;
    background: transparent;
    color: var(--muted-foreground);
    box-shadow: none;
  }

  [data-slot="badge"][data-variant="destructive"] {
    border-color: color-mix(in oklch, var(--destructive), transparent 64%);
    background: color-mix(in oklch, var(--destructive), transparent 84%);
    color: color-mix(in oklch, var(--destructive), black 18%);
  }

  [data-slot="badge"][data-variant="link"] {
    border-color: transparent;
    background: transparent;
    box-shadow: none;
    color: var(--primary);
  }

  [data-slot="badge"][data-tone="info"] {
    border-color: color-mix(in oklch, var(--aui-info), transparent 64%);
    background: color-mix(in oklch, var(--aui-info), transparent 82%);
    color: color-mix(in oklch, var(--aui-info), black 18%);
  }

  [data-slot="badge"][data-tone="success"] {
    border-color: color-mix(in oklch, var(--aui-success), transparent 64%);
    background: color-mix(in oklch, var(--aui-success), transparent 82%);
    color: color-mix(in oklch, var(--aui-success), black 18%);
  }

  [data-slot="badge"][data-tone="warning"] {
    border-color: color-mix(in oklch, var(--aui-warning), transparent 58%);
    background: color-mix(in oklch, var(--aui-warning), transparent 76%);
    color: color-mix(in oklch, var(--aui-warning-foreground), black 10%);
  }

  [data-slot="badge"][data-tone="danger"] {
    border-color: color-mix(in oklch, var(--destructive), transparent 64%);
    background: color-mix(in oklch, var(--destructive), transparent 84%);
    color: color-mix(in oklch, var(--destructive), black 18%);
  }

  [data-slot="badge"][data-tone="muted"] {
    border-color: color-mix(in oklch, var(--border), var(--foreground) 6%);
    background: color-mix(in oklch, var(--muted), var(--background) 26%);
    color: var(--muted-foreground);
  }

  [data-slot="tabs-list"][data-slot="tabs-list"],
  [data-slot="calendar"][data-slot="calendar"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: var(--aui-control-panel-bg);
    box-shadow: var(--aui-control-panel-shadow);
  }

  [data-slot="tabs-list"] { min-height: 2.75rem; gap: 0.25rem; padding: 0.25rem; }
  [data-slot="tabs-list"][data-variant="underline"] { min-height: 2.5rem; border-inline: 0; border-top: 0; border-radius: 0; background: transparent; padding: 0; box-shadow: none; }
  [data-slot="tabs-list"][data-variant="compact"] { min-height: 2.25rem; border-radius: var(--radius-lg); padding: 0.125rem; }
  [data-slot="tabs-list"][data-variant="pills"] { border-radius: var(--aui-radius-pill); }

  [data-slot="tabs-trigger"] { min-height: 2.25rem; gap: 0.5rem; border: 1px solid transparent; border-radius: var(--radius-md); padding: 0.375rem 0.875rem; font-size: 0.875rem; font-weight: 500; }
  [data-slot="tabs-trigger"][data-variant="underline"] { min-height: 2.5rem; border-width: 0 0 2px; border-radius: 0; padding-inline: 0.5rem; box-shadow: none; }
  [data-slot="tabs-trigger"][data-variant="underline"][data-selected],
  [data-slot="tabs-trigger"][data-variant="underline"][aria-selected="true"] { border-bottom-color: var(--primary); background: transparent; box-shadow: none; }
  [data-slot="tabs-trigger"][data-variant="pills"] { border-radius: var(--aui-radius-pill); }
  [data-slot="tabs-trigger"][data-variant="compact"] { min-height: 2rem; padding-inline: 0.625rem; font-size: 0.75rem; }
  [data-slot="tabs-trigger"] svg { width: 1rem; height: 1rem; flex-shrink: 0; }

  [data-slot="tabs-content"] { margin-top: 0.75rem; }
  [data-slot="tabs-content"]:focus-visible { outline: none; box-shadow: 0 0 0 1px var(--aui-focus-ring), 0 0 0 5px var(--aui-focus-ring-soft); }

  [data-slot="tabs-trigger"][data-slot="tabs-trigger"] {
    color: var(--muted-foreground);
  }

  [data-slot="tabs-trigger"][data-slot="tabs-trigger"]:hover {
    color: var(--foreground);
    background: color-mix(in oklch, var(--background), transparent 18%);
  }

  [data-slot="tabs-trigger"][data-slot="tabs-trigger"][data-selected] {
    border-color: color-mix(in oklch, var(--border), var(--foreground) 8%);
    background: var(--aui-control-surface);
    color: var(--foreground);
    box-shadow: var(--aui-control-shadow);
  }

  [data-slot="tabs-trigger"][data-slot="tabs-trigger"]:focus-visible {
    box-shadow: var(--aui-control-shadow), 0 0 0 1px var(--aui-focus-ring), 0 0 0 5px var(--aui-focus-ring-soft);
  }

  [data-slot="card"][data-slot="card"],
  [data-slot="stat-card"][data-slot="stat-card"] {
    border: 1px solid var(--aui-card-border);
    border-radius: var(--aui-card-radius);
    background: linear-gradient(180deg, color-mix(in oklch, var(--card), white 8%), var(--card));
    box-shadow: var(--aui-card-shadow);
  }

  [data-slot="card"] {
    --card-spacing: 1.25rem;
    color: var(--card-foreground);
    font-size: 0.875rem;
    transition: background-color var(--aui-motion-normal) var(--aui-ease-standard), border-color var(--aui-motion-normal) var(--aui-ease-standard), box-shadow var(--aui-motion-normal) var(--aui-ease-standard), transform var(--aui-motion-normal) var(--aui-ease-standard), opacity var(--aui-motion-normal) var(--aui-ease-standard);
  }

  [data-slot="card"][data-size="sm"] { --card-spacing: 1rem; }
  [data-slot="card"][data-size="lg"] { --card-spacing: 1.5rem; }
  [data-slot="card"][data-density="compact"] { font-size: 0.75rem; }
  [data-slot="card"][data-density="comfortable"] { font-size: 1rem; }
  [data-slot="card"][data-variant="ghost"] { border-color: transparent; background: transparent; box-shadow: none; }
  [data-slot="card"] > img:first-child { border-radius: var(--aui-card-radius) var(--aui-card-radius) 0 0; }
  [data-slot="card"] > img:last-child { border-radius: 0 0 var(--aui-card-radius) var(--aui-card-radius); }

  [data-slot="card-header"] { border-radius: var(--aui-card-radius) var(--aui-card-radius) 0 0; }
  [data-slot="card-eyebrow"] { color: color-mix(in oklch, var(--muted-foreground), transparent 20%); font-size: 0.6875rem; font-weight: 650; letter-spacing: 0.18em; text-transform: uppercase; }
  [data-slot="card-title"] { font-family: var(--font-heading); font-size: 1.05rem; font-weight: 650; line-height: 1.35; letter-spacing: -0.02em; }
  [data-slot="card"][data-size="sm"] [data-slot="card-title"] { font-size: 0.875rem; }
  [data-slot="card"][data-size="lg"] [data-slot="card-title"] { font-size: 1.25rem; }
  [data-slot="card-description"] { color: var(--muted-foreground); font-size: 0.875rem; line-height: 1.5rem; }
  [data-slot="card-footer"] { border-top: 1px solid color-mix(in oklch, var(--border), transparent 40%); border-radius: 0 0 var(--aui-card-radius) var(--aui-card-radius); background: color-mix(in oklch, var(--muted), transparent 78%); }

  [data-slot="card"][data-variant="elevated"] {
    box-shadow: 0 1px 0 oklch(1 0 0 / 76%), 0 24px 58px oklch(0.24 0.02 255 / 10%);
  }

  [data-slot="card"][data-variant="outline"] {
    background: var(--aui-card-outline-bg);
    box-shadow: none;
  }

  [data-slot="card"][data-variant="soft"] {
    border-color: color-mix(in oklch, var(--border), transparent 28%);
    background: var(--aui-card-soft-bg);
    box-shadow: none;
  }

  [data-slot="card"][data-tone="info"] {
    background: linear-gradient(180deg, color-mix(in oklch, var(--card), var(--aui-info) 14%), var(--card));
  }

  [data-slot="card"][data-tone="success"] {
    background: linear-gradient(180deg, color-mix(in oklch, var(--card), var(--aui-success) 14%), var(--card));
  }

  [data-slot="card"][data-tone="warning"] {
    background: linear-gradient(180deg, color-mix(in oklch, var(--card), var(--aui-warning) 14%), var(--card));
  }

  [data-slot="card"][data-tone="danger"] {
    background: linear-gradient(180deg, color-mix(in oklch, var(--card), var(--destructive) 10%), var(--card));
  }

  [data-slot="card"][data-interactive="true"]:hover {
    border-color: var(--aui-control-hover-border);
    box-shadow: var(--aui-card-shadow-hover);
  }

  [data-slot="card"][data-interactive="true"]:focus-visible {
    box-shadow: var(--aui-card-shadow), 0 0 0 1px var(--aui-focus-ring), 0 0 0 5px var(--aui-focus-ring-soft);
  }

  [data-slot="card"][data-selected="true"] {
    border-color: color-mix(in oklch, var(--primary), transparent 44%);
    box-shadow: var(--aui-card-shadow), 0 0 0 1px color-mix(in oklch, var(--primary), transparent 64%), 0 0 0 6px color-mix(in oklch, var(--primary), transparent 88%);
  }

  [data-slot="card"][data-disabled="true"] {
    box-shadow: none;
    opacity: 0.76;
  }

  [data-slot="card"][data-size="sm"] {
    border-radius: var(--radius-xl);
  }

  [data-slot="card"][data-size="lg"] {
    border-radius: var(--radius-3xl);
  }

  [data-slot="card"][data-density="compact"] [data-slot="card-description"] {
    font-size: 0.8125rem;
    line-height: 1.35;
  }

  [data-slot="card"][data-density="comfortable"] [data-slot="card-description"] {
    font-size: 0.975rem;
    line-height: 1.7;
  }

  [data-slot="card"] [data-slot="card"][data-slot="card"] {
    box-shadow: none;
    border-color: color-mix(in oklch, var(--border), transparent 18%);
    background: color-mix(in oklch, var(--muted), transparent 74%);
  }

  [data-slot="card-footer"][data-slot="card-footer"] {
    background: linear-gradient(180deg, color-mix(in oklch, var(--muted), transparent 80%), color-mix(in oklch, var(--muted), transparent 66%));
  }

  [data-slot="popover-content"][data-slot="popover-content"],
  [data-slot="dropdown-menu-content"][data-slot="dropdown-menu-content"],
  [data-slot="dialog-content"][data-slot="dialog-content"],
  [data-slot="sheet-content"][data-slot="sheet-content"],
  [data-slot="select-trigger"] { padding-inline: 0.75rem; font-size: 0.875rem; transition: background-color var(--aui-motion-fast) var(--aui-ease-standard), border-color var(--aui-motion-fast) var(--aui-ease-standard), box-shadow var(--aui-motion-fast) var(--aui-ease-standard), color var(--aui-motion-fast) var(--aui-ease-standard); }
  [data-slot="select-trigger"][data-size="sm"] { height: 2.25rem; border-radius: var(--radius-sm); }
  [data-slot="select-trigger"][data-size="default"] { height: 2.75rem; }
  [data-slot="select-trigger"][data-size="lg"] { height: 3rem; }
  [data-slot="select-icon"] { width: 1rem; height: 1rem; color: var(--muted-foreground); }
  [data-slot="select-icon"] svg { width: 1rem; height: 1rem; }
  [data-slot="select-content"] { padding: 0.375rem; }
  [data-slot="select-label"] { padding: 0.375rem 0.5rem; color: var(--muted-foreground); font-size: 0.6875rem; font-weight: 650; letter-spacing: 0.14em; text-transform: uppercase; }
  [data-slot="select-item"] { border: 1px solid transparent; border-radius: var(--aui-control-radius); padding: 0.625rem 2.25rem 0.625rem 0.75rem; color: var(--foreground); font-size: 0.875rem; transition: background-color var(--aui-motion-fast) var(--aui-ease-standard), border-color var(--aui-motion-fast) var(--aui-ease-standard), color var(--aui-motion-fast) var(--aui-ease-standard); }
  [data-slot="select-item"][data-disabled] { pointer-events: none; opacity: var(--aui-disabled-opacity); }
  [data-slot="select-separator"] { height: 1px; margin: 0.375rem -0.25rem; background: color-mix(in oklch, var(--border), transparent 20%); }

  [data-slot="select-content"][data-slot="select-content"] {
    border-color: var(--aui-overlay-border);
    background: var(--aui-overlay-surface);
    box-shadow: var(--aui-popover-shadow);
  }

[data-slot="info-card"] {
  overflow: hidden;
  transition:
    background-color var(--aui-motion-normal) var(--aui-ease-standard),
    border-color var(--aui-motion-normal) var(--aui-ease-standard),
    box-shadow var(--aui-motion-normal) var(--aui-ease-standard);
}

[data-slot="info-card"][data-selected="true"] {
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
}

[data-slot="info-card"][data-disabled="true"] {
  pointer-events: none;
  opacity: var(--aui-disabled-opacity);
}

[data-slot="info-card"][data-interactive="true"] {
  cursor: pointer;
}

[data-slot="info-card"][data-interactive="true"]:hover {
  background: color-mix(in srgb, var(--aui-surface-muted) 55%, var(--card));
  border-color: color-mix(in srgb, var(--primary) 28%, var(--aui-card-border));
}

[data-slot="info-card-body"],
[data-slot="info-card-loading"] {
  padding: 1rem;
}

[data-slot="info-card"][data-info-density="compact"] :is([data-slot="info-card-body"], [data-slot="info-card-loading"]) {
  padding: 0.75rem;
}

[data-slot="info-card"][data-info-density="comfortable"] :is([data-slot="info-card-body"], [data-slot="info-card-loading"]) {
  padding: 1.25rem;
}

[data-slot="info-card-media"] {
  overflow: hidden;
  background: var(--aui-surface-muted);
  border-bottom: 1px solid var(--aui-card-border);
}

[data-slot="info-card"][data-orientation="horizontal"] [data-slot="info-card-media"] {
  border-right: 1px solid var(--aui-card-border);
  border-bottom: 0;
}

[data-slot="info-card-icon"] {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--aui-card-border);
  border-radius: var(--aui-radius-control);
  background: var(--aui-surface-muted);
  color: var(--foreground);
  box-shadow: var(--aui-shadow-xs);
}

[data-slot="info-card-eyebrow"] {
  color: var(--muted-foreground);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1rem;
  text-transform: uppercase;
}

[data-slot="info-card-title"] {
  color: var(--card-foreground);
  font-size: 1rem;
  font-weight: 650;
  line-height: 1.35;
}

[data-slot="info-card"][data-info-size="sm"] [data-slot="info-card-title"] {
  font-size: 0.875rem;
}

[data-slot="info-card"][data-info-size="lg"] [data-slot="info-card-title"] {
  font-size: 1.125rem;
}

[data-slot="info-card-description"] {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.5;
}

[data-slot="info-card-meta"] {
  color: var(--muted-foreground);
  font-size: 0.75rem;
  line-height: 1.25rem;
}

[data-slot="info-card-footer"] {
  padding-top: 0.75rem;
  border-top: 1px solid var(--aui-card-border);
  color: var(--muted-foreground);
  font-size: 0.8125rem;
}

[data-slot="dialog-overlay"] {
  background: color-mix(in srgb, var(--foreground) 42%, transparent);
  backdrop-filter: blur(2px);
}

[data-slot="dialog-content"] {
  border: 1px solid var(--aui-overlay-border);
  border-radius: var(--aui-radius-overlay);
  background: var(--popover);
  color: var(--popover-foreground);
  padding: 1.5rem;
  font-size: 0.875rem;
  box-shadow: var(--aui-shadow-lg);
}

[data-slot="dialog-content"][data-surface="plain"] {
  border-color: transparent;
  background: transparent;
  padding: 0;
  box-shadow: none;
}

[data-slot="dialog-close"] {
  display: inline-flex;
  width: var(--aui-control-height-sm);
  height: var(--aui-control-height-sm);
  align-items: center;
  justify-content: center;
  border-radius: var(--aui-radius-control);
  color: var(--muted-foreground);
  transition:
    background-color var(--aui-motion-fast) var(--aui-ease-standard),
    color var(--aui-motion-fast) var(--aui-ease-standard);
}

[data-slot="dialog-close"]:hover {
  background: var(--aui-surface-muted);
  color: var(--foreground);
}

[data-slot="dialog-close"]:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

[data-slot="dialog-header"] {
  gap: 0.375rem;
}

[data-slot="dialog-title"] {
  color: var(--foreground);
  font-size: 1.125rem;
  font-weight: 650;
  line-height: 1.4;
}

[data-slot="dialog-description"] {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.5;
}

[data-slot="dialog-description"] a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
}

[data-slot="dialog-description"] a:hover {
  color: var(--foreground);
}

[data-slot="dialog-footer"] {
  margin: 0 -1.5rem -1.5rem;
  padding: 1.25rem;
  border-top: 1px solid var(--aui-overlay-border);
  background: color-mix(in srgb, var(--aui-surface-muted) 55%, transparent);
}

[data-slot="dialog-content"][data-surface="plain"] [data-slot="dialog-footer"] {
  margin: 0;
}

[data-slot="popover-content"] {
  border: 1px solid var(--aui-overlay-border);
  border-radius: var(--aui-radius-overlay);
  background: var(--popover);
  color: var(--popover-foreground);
  padding: 1rem;
  font-size: 0.875rem;
  box-shadow: var(--aui-shadow-md);
}

[data-slot="popover-header"] {
  display: grid;
  gap: 0.25rem;
}

[data-slot="popover-title"] {
  color: var(--foreground);
  font-size: 0.875rem;
  font-weight: 650;
  line-height: 1.25rem;
}

[data-slot="popover-description"] {
  color: var(--muted-foreground);
  font-size: 0.8125rem;
  line-height: 1.25rem;
}

[data-slot="dropdown-menu-content"],
[data-slot="dropdown-menu-sub-content"] {
  min-width: 10rem;
  overflow: hidden;
  border: 1px solid var(--aui-overlay-border);
  border-radius: var(--aui-radius-overlay);
  background: var(--popover);
  color: var(--popover-foreground);
  padding: 0.25rem;
  box-shadow: var(--aui-shadow-md);
}

:is([data-slot="dropdown-menu-item"], [data-slot="dropdown-menu-checkbox-item"], [data-slot="dropdown-menu-radio-item"], [data-slot="dropdown-menu-sub-trigger"]) {
  display: flex;
  min-height: var(--aui-control-height-sm);
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: calc(var(--aui-radius-control) - 2px);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
}

:is([data-slot="dropdown-menu-item"], [data-slot="dropdown-menu-checkbox-item"], [data-slot="dropdown-menu-radio-item"], [data-slot="dropdown-menu-sub-trigger"])[data-highlighted] {
  background: var(--aui-surface-muted);
  color: var(--foreground);
}

:is([data-slot="dropdown-menu-item"], [data-slot="dropdown-menu-checkbox-item"], [data-slot="dropdown-menu-radio-item"], [data-slot="dropdown-menu-sub-trigger"])[data-disabled] {
  pointer-events: none;
  opacity: var(--aui-disabled-opacity);
}

[data-slot="dropdown-menu-item"][data-variant="destructive"] {
  color: var(--destructive);
}

[data-slot="dropdown-menu-item"][data-variant="destructive"][data-highlighted] {
  background: color-mix(in srgb, var(--destructive) 10%, transparent);
  color: var(--destructive);
}

[data-slot="dropdown-menu-label"] {
  padding: 0.375rem 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 650;
}

[data-slot="dropdown-menu-separator"] {
  height: 1px;
  margin: 0.25rem -0.25rem;
  background: var(--aui-overlay-border);
}

[data-slot="dropdown-menu-shortcut"] {
  margin-left: auto;
  color: var(--muted-foreground);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
}

[data-slot="dropdown-menu-item-description"] {
  color: var(--muted-foreground);
  font-size: 0.75rem;
  line-height: 1rem;
}

:is([data-slot="dropdown-menu-label"], [data-slot="dropdown-menu-item"], [data-slot="dropdown-menu-checkbox-item"], [data-slot="dropdown-menu-radio-item"], [data-slot="dropdown-menu-sub-trigger"])[data-inset="true"] {
  padding-left: 2rem;
}

:is([data-slot="dropdown-menu-checkbox-item"], [data-slot="dropdown-menu-radio-item"]) {
  position: relative;
  padding-right: 2.25rem;
}

:is([data-slot="dropdown-menu-checkbox-item"], [data-slot="dropdown-menu-radio-item"])[data-checked] {
  background: var(--aui-surface-muted);
  font-weight: 600;
}

:is([data-slot="dropdown-menu-checkbox-item-indicator"], [data-slot="dropdown-menu-radio-item-indicator"]) {
  pointer-events: none;
  position: absolute;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-slot="dropdown-menu-sub-icon"] {
  margin-left: auto;
  color: var(--muted-foreground);
}

[data-slot="dropdown-menu-shortcut"] {
  border-radius: calc(var(--aui-radius-control) - 2px);
  background: var(--aui-surface-muted);
  padding: 0.125rem 0.375rem;
  font-weight: 600;
}

[data-slot="dialog-footer"][data-slot="dialog-footer"] {
    border-color: color-mix(in oklch, var(--border), transparent 12%);
    background: var(--aui-overlay-footer-bg);
  }

  [data-slot="dialog-content"][data-size="xs"] {
    max-width: min(28rem, calc(100% - 2rem));
  }

  [data-slot="dialog-content"][data-size="sm"] {
    max-width: min(34rem, calc(100% - 2rem));
  }

  [data-slot="dialog-content"][data-size="md"] {
    max-width: min(40rem, calc(100% - 2rem));
  }

  [data-slot="dialog-content"][data-size="lg"] {
    max-width: min(48rem, calc(100% - 2rem));
  }

  [data-slot="dialog-content"][data-size="xl"] {
    max-width: min(64rem, calc(100% - 2rem));
  }

  [data-slot="dialog-content"][data-size="full"] {
    max-width: min(84rem, calc(100% - 2rem));
  }

  [data-slot="select-item"][data-slot="select-item"]:focus,
  [data-slot="select-item"][data-slot="select-item"][data-highlighted] {
    border-color: color-mix(in oklch, var(--border), var(--foreground) 8%);
    background: color-mix(in oklch, var(--accent), transparent 18%);
    color: var(--accent-foreground);
  }

  [data-slot="select-item"][data-slot="select-item"][data-selected] {
    border-color: color-mix(in oklch, var(--primary), transparent 72%);
    background: color-mix(in oklch, var(--primary), transparent 88%);
    color: var(--foreground);
  }

  [data-slot="select-search"][data-slot="select-search"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: var(--aui-control-surface);
    box-shadow: var(--aui-control-shadow);
  }

  [data-slot="select-state"][data-slot="select-state"] {
    color: var(--muted-foreground);
  }

  [data-slot="async-select-option"] { border: 1px solid transparent; border-radius: var(--aui-control-radius); padding: 0.625rem 0.75rem; font-size: 0.875rem; transition: background-color var(--aui-motion-fast) var(--aui-ease-standard), border-color var(--aui-motion-fast) var(--aui-ease-standard), color var(--aui-motion-fast) var(--aui-ease-standard), box-shadow var(--aui-motion-fast) var(--aui-ease-standard); }
  [data-slot="async-select-option"]:focus-visible { border-color: var(--aui-focus-ring); box-shadow: 0 0 0 3px var(--aui-focus-ring-soft); }
  [data-slot="async-select-option-indicator"] { display: flex; width: 1rem; height: 1rem; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: var(--aui-radius-pill); }
  [data-slot="async-select-option-indicator"][data-selected="true"] { border-color: var(--primary); background: var(--primary); color: var(--primary-foreground); }
  [data-slot="async-select-option-indicator"] svg { width: 0.75rem; height: 0.75rem; }
  [data-slot="async-select-search-icon"] { pointer-events: none; position: absolute; left: 0.625rem; top: 50%; width: 1rem; height: 1rem; transform: translateY(-50%); color: var(--muted-foreground); }
  [data-slot="async-select-state"][data-tone="danger"] { color: var(--destructive); }
  [data-slot="async-select-tag-remove"] { border-radius: var(--aui-radius-pill); padding: 0.125rem; color: var(--muted-foreground); transition: background-color var(--aui-motion-fast) var(--aui-ease-standard), color var(--aui-motion-fast) var(--aui-ease-standard); }
  [data-slot="async-select-tag-remove"]:hover { background: var(--background); color: var(--foreground); }
  [data-slot="async-select-tag-remove"] svg { width: 0.75rem; height: 0.75rem; }
  [data-slot="async-select-tag-overflow"] { border: 1px dashed var(--aui-card-border); border-radius: var(--radius-sm); background: color-mix(in oklch, var(--muted), transparent 58%); padding: 0.25rem 0.5rem; color: var(--muted-foreground); font-size: 0.75rem; font-weight: 500; }

  [data-slot="async-select-content"][data-slot="async-select-content"] {
    border-color: var(--aui-overlay-border);
    background: var(--aui-overlay-surface);
    box-shadow: var(--aui-popover-shadow);
  }

  [data-slot="async-select-trigger"][data-slot="async-select-trigger"] {
    background: var(--aui-control-surface);
  }

  [data-slot="async-select-meta"][data-slot="async-select-meta"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: color-mix(in oklch, var(--muted), transparent 72%);
  }

  [data-slot="async-select-state"][data-slot="async-select-state"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: color-mix(in oklch, var(--muted), transparent 72%);
    box-shadow: inset 0 1px 0 oklch(1 0 0 / 8%);
  }

  [data-slot="async-select-option"][data-slot="async-select-option"]:hover {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: color-mix(in oklch, var(--accent), transparent 16%);
    color: var(--accent-foreground);
  }

  [data-slot="async-select-option"][data-selected="true"] {
    border-color: color-mix(in oklch, var(--primary), transparent 70%);
    background: color-mix(in oklch, var(--primary), transparent 88%);
    color: var(--foreground);
    box-shadow: inset 0 1px 0 oklch(1 0 0 / 10%);
  }

  [data-slot="async-select-create"][data-slot="async-select-create"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: color-mix(in oklch, var(--background), transparent 14%);
  }

  [data-slot="async-select-create"][data-slot="async-select-create"]:hover {
    border-color: color-mix(in oklch, var(--primary), transparent 68%);
    background: color-mix(in oklch, var(--primary), transparent 92%);
  }

  [data-slot="async-select-tag"][data-slot="async-select-tag"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: color-mix(in oklch, var(--muted), transparent 72%);
    box-shadow: inset 0 1px 0 oklch(1 0 0 / 4%);
  }

  [data-slot="async-select-clear"][data-slot="async-select-clear"],
  [data-slot="clearable-input-clear"][data-slot="clearable-input-clear"],
  [data-slot="async-select-meta-action"][data-slot="async-select-meta-action"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
  }

  [data-slot="async-select-clear"][data-slot="async-select-clear"]:hover,
  [data-slot="clearable-input-clear"][data-slot="clearable-input-clear"]:hover,
  [data-slot="async-select-meta-action"][data-slot="async-select-meta-action"]:hover {
    background: color-mix(in oklch, var(--background), transparent 18%);
  }

  [data-slot="async-select-group-label"][data-slot="async-select-group-label"] {
    color: var(--muted-foreground);
  }

  [data-slot="data-table-wrapper"][data-slot="data-table-wrapper"] {
    border-color: var(--aui-table-border);
    background: var(--aui-table-surface);
    box-shadow: var(--aui-card-shadow);
  }

  [data-slot="data-table-toolbar"][data-slot="data-table-toolbar"] {
    border: 1px solid var(--aui-table-toolbar-border);
    border-radius: var(--aui-card-radius);
    background: var(--aui-table-toolbar-bg);
    box-shadow: var(--aui-card-shadow);
  }

  [data-slot="data-table-toolbar"][data-variant="soft"] {
    border-color: transparent;
    background: color-mix(in oklch, var(--muted), transparent 70%);
    box-shadow: none;
  }

  [data-slot="data-table-selection-bar"][data-slot="data-table-selection-bar"] {
    border-color: color-mix(in oklch, var(--border), white 4%);
    background: var(--aui-table-selection-surface);
    box-shadow: var(--aui-control-shadow);
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

  [data-slot="data-table-wrapper"] tbody tr[data-striped="true"] {
    background: var(--aui-table-stripe-bg);
  }

  [data-slot="data-table-pagination"][data-slot="data-table-pagination"] {
    border-color: var(--aui-table-border);
    background: var(--aui-table-footer-bg);
  }

  [data-slot="table-container"][data-slot="table-container"] {
    border-color: var(--aui-table-border);
    background: var(--aui-table-container-surface);
    box-shadow: var(--aui-card-shadow);
  }

  [data-slot="table-header"][data-slot="table-header"] {
    background: color-mix(in oklch, var(--muted), transparent 72%);
  }

  [data-slot="table-footer"][data-slot="table-footer"] {
    background: color-mix(in oklch, var(--muted), transparent 54%);
  }

  [data-slot="table-row"][data-slot="table-row"] {
    border-color: color-mix(in oklch, var(--border), white 2%);
  }

  [data-slot="table-row"][data-slot="table-row"]:hover {
    background: color-mix(in oklch, var(--muted), transparent 72%);
  }

  [data-slot="table-row"][data-state="selected"] {
    background: color-mix(in oklch, var(--primary), transparent 88%);
  }

  [data-slot="table-row"][data-striped="true"] {
    background: var(--aui-table-stripe-bg);
  }

  [data-slot="app-sidebar"][data-slot="app-sidebar"] {
    border-right: 1px solid var(--aui-sidebar-border);
    background: var(--aui-sidebar-surface);
    box-shadow: inset -1px 0 0 oklch(1 0 0 / 4%);
  }

  [data-slot="app-sidebar-header"][data-slot="app-sidebar-header"],
  [data-slot="app-sidebar-footer"][data-slot="app-sidebar-footer"] {
    border-color: var(--aui-sidebar-border);
  }

  [data-slot="app-sidebar-item"][data-slot="app-sidebar-item"] {
    background: var(--aui-sidebar-item-bg);
    color: color-mix(in oklch, var(--sidebar-foreground), transparent 2%);
  }

  :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"]) {
    color: color-mix(in oklch, var(--sidebar-foreground), transparent 24%);
  }

  :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"])[data-size="sm"] {
    min-height: var(--aui-control-height-sm);
    border-radius: var(--radius-md);
    padding-inline: 0.5rem;
    font-size: 0.8125rem;
  }

  :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"])[data-size="md"] {
    min-height: 2.25rem;
    border-radius: var(--aui-control-radius);
    padding-inline: 0.625rem;
  }

  :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"])[data-size="lg"] {
    min-height: var(--aui-control-height-lg);
    border-radius: var(--aui-radius-surface);
    padding-inline: 0.875rem;
    font-size: 0.9375rem;
  }

  [data-slot="app-sidebar"][data-collapsed="true"] :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"]) {
    padding-inline: 0.5rem;
  }

  :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"])[data-active="true"][data-active-indicator="bar"] {
    box-shadow: inset 3px 0 0 var(--aui-sidebar-item-indicator), inset 0 1px 0 oklch(1 0 0 / 8%), 0 10px 24px color-mix(in oklch, var(--sidebar-primary), transparent 88%);
  }

  :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"])[data-active="true"][data-active-indicator="pill"] {
    box-shadow: inset 0 1px 0 oklch(1 0 0 / 8%), 0 10px 24px color-mix(in oklch, var(--sidebar-primary), transparent 88%);
  }

  :is([data-slot="app-sidebar-item"], [data-slot="app-sidebar-group-trigger"])[data-active="true"][data-active-indicator="none"] {
    box-shadow: none;
  }

  [data-slot="app-sidebar-item"][data-slot="app-sidebar-item"]:hover {
    border-color: color-mix(in oklch, var(--sidebar-border), white 6%);
    background: var(--aui-sidebar-item-hover-bg);
    color: var(--sidebar-accent-foreground);
  }

  [data-slot="app-sidebar-item"][data-active="true"] {
    border-color: var(--aui-sidebar-item-active-border);
    background: var(--aui-sidebar-item-active-bg);
    color: var(--aui-sidebar-item-active-fg);
    box-shadow: 0 1px 0 oklch(1 0 0 / 6%), 0 10px 24px color-mix(in oklch, var(--sidebar-primary), transparent 88%);
  }

  [data-slot="app-sidebar-item"][data-slot="app-sidebar-item"]:focus-visible {
    box-shadow: 0 0 0 1px color-mix(in oklch, var(--sidebar-ring), transparent 40%), 0 0 0 5px color-mix(in oklch, var(--sidebar-ring), transparent 82%);
  }

  [data-slot="app-sidebar-group-trigger"][data-slot="app-sidebar-group-trigger"] {
    color: color-mix(in oklch, var(--sidebar-foreground), transparent 2%);
  }

  [data-slot="app-sidebar-group-trigger"][data-slot="app-sidebar-group-trigger"]:hover {
    border-color: color-mix(in oklch, var(--sidebar-border), white 6%);
    background: var(--aui-sidebar-item-hover-bg);
    color: var(--sidebar-accent-foreground);
  }

  [data-slot="app-sidebar-group-content"][data-slot="app-sidebar-group-content"] {
    border-left: 1px solid color-mix(in oklch, var(--sidebar-border), transparent 28%);
  }

  [data-slot="app-sidebar-group-label"][data-slot="app-sidebar-group-label"] {
    color: var(--aui-sidebar-section-label);
  }

  [data-slot="app-sidebar-footer-secondary"][data-slot="app-sidebar-footer-secondary"] {
    border-bottom: 1px solid color-mix(in oklch, var(--sidebar-border), transparent 16%);
    padding-bottom: 0.75rem;
  }

  [data-slot="app-sidebar-action"][data-slot="app-sidebar-action"],
  [data-slot="app-sidebar-account"][data-slot="app-sidebar-account"] {
    background: color-mix(in oklch, var(--sidebar), transparent 24%);
    color: var(--aui-sidebar-action-fg);
  }

  [data-slot="app-sidebar-action"][data-slot="app-sidebar-action"]:hover,
  [data-slot="app-sidebar-account"][data-slot="app-sidebar-account"]:hover {
    border-color: color-mix(in oklch, var(--sidebar-border), white 6%);
    background: var(--aui-sidebar-item-hover-bg);
    color: var(--sidebar-accent-foreground);
  }

  [data-slot="app-sidebar-rail-actions"][data-slot="app-sidebar-rail-actions"] {
    margin-bottom: 0.75rem;
  }

  [data-slot="app-sidebar-account-wrap"][data-slot="app-sidebar-account-wrap"] {
    border-top: 1px solid color-mix(in oklch, var(--sidebar-border), transparent 18%);
    padding-top: 0.75rem;
  }

  [data-slot="sidebar-nav-item"][data-slot="sidebar-nav-item"] {
    background: var(--aui-sidebar-nav-item-bg);
    color: var(--muted-foreground);
  }

  [data-slot="sidebar-nav-item"] {
    color: var(--aui-page-muted-strong, var(--muted-foreground));
  }

  [data-slot="sidebar-nav-item"][data-size="sm"] {
    min-height: var(--aui-control-height-sm);
    border-radius: var(--radius-lg);
    padding-inline: 0.5rem;
    font-size: 0.8125rem;
  }

  [data-slot="sidebar-nav-item"][data-size="md"] {
    min-height: 2.25rem;
    border-radius: var(--aui-radius-surface);
    padding-inline: 0.625rem;
  }

  [data-slot="sidebar-nav-item"][data-size="lg"] {
    min-height: var(--aui-control-height-lg);
    border-radius: var(--aui-radius-surface);
    padding-inline: 0.75rem;
    font-size: 0.9375rem;
  }

  [data-slot="sidebar-nav"][data-collapsed="true"] [data-slot="sidebar-nav-item"] {
    padding-inline: 0;
  }

  [data-slot="sidebar-nav-item"][data-active="true"][data-active-indicator="bar"] {
    box-shadow: inset 3px 0 0 var(--aui-sidebar-nav-active-indicator), inset 0 1px 0 oklch(1 0 0 / 20%);
  }

  [data-slot="sidebar-nav-item"][data-active="true"][data-active-indicator="pill"] {
    box-shadow: 0 10px 24px color-mix(in oklch, var(--primary), transparent 88%), inset 0 1px 0 oklch(1 0 0 / 20%);
  }

  [data-slot="sidebar-nav-item"][data-active="true"][data-active-indicator="none"] {
    box-shadow: none;
  }

  [data-slot="sidebar-nav-item"][data-slot="sidebar-nav-item"]:hover {
    border-color: var(--aui-sidebar-nav-item-active-border);
    background: var(--aui-sidebar-nav-item-hover-bg);
    color: var(--foreground);
  }

  [data-slot="sidebar-nav-item"][data-active="true"] {
    border-color: var(--aui-sidebar-nav-item-active-border);
    background: var(--aui-sidebar-nav-item-active-bg);
    color: var(--foreground);
  }

  [data-slot="sidebar-nav-group-trigger"][data-slot="sidebar-nav-group-trigger"] {
    color: var(--muted-foreground);
  }

  [data-slot="sidebar-nav-group-trigger"][data-slot="sidebar-nav-group-trigger"]:hover {
    border-color: var(--aui-sidebar-nav-item-active-border);
    background: var(--aui-sidebar-nav-item-hover-bg);
    color: var(--foreground);
  }

  [data-slot="sidebar-nav-group-label"][data-slot="sidebar-nav-group-label"] {
    color: color-mix(in oklch, var(--muted-foreground), transparent 4%);
  }

  [data-slot="breadcrumbs-collapsed"][data-slot="breadcrumbs-collapsed"] {
    background: color-mix(in oklch, var(--muted), transparent 72%);
  }

  [data-slot="breadcrumbs-link"][data-slot="breadcrumbs-link"]:hover {
    color: var(--foreground);
  }

  [data-slot="breadcrumbs-current"][data-slot="breadcrumbs-current"] {
    color: var(--foreground);
  }

  [data-slot="file-upload-dropzone"][data-dragging="true"] {
    border-color: var(--primary);
    background: color-mix(in oklch, var(--primary), transparent 93%);
  }

  [data-slot="statistic-card"] {
    border-color: var(--aui-surface-border);
    background: var(--aui-surface);
    box-shadow: var(--aui-shadow-card);
  }

  [data-slot="statistic-label"],
  [data-slot="statistic-prefix"],
  [data-slot="statistic-suffix"],
  [data-slot="statistic-meta"] {
    color: var(--muted-foreground);
  }

  [data-slot="statistic-change"][data-trend="up"] { color: var(--aui-success-fg); background: var(--aui-success-bg); }
  [data-slot="statistic-change"][data-trend="down"] { color: var(--destructive); background: color-mix(in oklch, var(--destructive), transparent 90%); }

  [data-slot="page-state"] {
    border-color: var(--aui-surface-border);
    border-radius: var(--aui-radius-panel);
    background: var(--aui-surface);
    box-shadow: var(--aui-shadow-card);
  }

  [data-slot="page-state-icon"] { color: var(--muted-foreground); background: var(--aui-surface-muted); }
  [data-slot="page-state"][data-tone="error"] [data-slot="page-state-icon"] { color: var(--destructive); background: color-mix(in oklch, var(--destructive), transparent 90%); }
  [data-slot="page-state"][data-tone="success"] [data-slot="page-state-icon"] { color: var(--aui-success-fg); background: var(--aui-success-bg); }
  [data-slot="page-state"][data-tone="info"] [data-slot="page-state-icon"] { color: var(--aui-info-fg); background: var(--aui-info-bg); }

  [data-slot="file-upload-dropzone"],
  [data-slot="file-upload-item"] {
    border-color: var(--aui-surface-border);
    background: var(--aui-surface);
    box-shadow: var(--aui-shadow-card);
  }

  [data-slot="file-upload-file-status"][data-status="success"] { color: var(--aui-success-fg); background: var(--aui-success-bg); }
  [data-slot="file-upload-file-status"][data-status="error"] { color: var(--destructive); background: color-mix(in oklch, var(--destructive), transparent 90%); }
  [data-slot="file-upload-progress-bar"] { background: var(--primary); }
}
${AZAMAT_UI_THEME_END}
`
}
