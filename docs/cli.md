# CLI Usage

`azamat-ui-kit` includes a small CLI for copying reusable components into other React projects.

## Initialize

Run inside the target project:

```bash
npx azamat-ui-kit init
```

This creates `azamat-ui.json`, writes the `cn` utility, and can inject dark/light theme tokens into your global CSS file.

Default config:

```json
{
  "style": "default",
  "alias": "@",
  "componentsPath": "src/components/ui",
  "utilsPath": "src/lib/utils.ts",
  "cssPath": "src/index.css",
  "globalCssPath": "src/index.css",
  "paths": {
    "components": "src/components",
    "ui": "src/components/ui",
    "hooks": "src/hooks",
    "lib": "src/lib"
  }
}
```

## Theme CSS

To update only theme tokens later:

```bash
npx azamat-ui-kit theme src/index.css
```

The CLI writes inside this marked block:

```css
/* azamat-ui-kit:start */
/* theme tokens */
/* azamat-ui-kit:end */
```

## List available components

```bash
npx azamat-ui-kit list
```

## Add individual components

```bash
npx azamat-ui-kit add button input checkbox
npx azamat-ui-kit add search-input password-input phone-input
npx azamat-ui-kit add form-input form-select form-phone-input
npx azamat-ui-kit add data-table data-table-bulk-actions
npx azamat-ui-kit add date-picker date-range-picker
npx azamat-ui-kit add toast command-palette
```

## Add groups

```bash
npx azamat-ui-kit add overlay
npx azamat-ui-kit add inputs
npx azamat-ui-kit add form
npx azamat-ui-kit add feedback
npx azamat-ui-kit add actions
npx azamat-ui-kit add filters
npx azamat-ui-kit add layout
npx azamat-ui-kit add dashboard
npx azamat-ui-kit add data-table
npx azamat-ui-kit add notifications
npx azamat-ui-kit add command
npx azamat-ui-kit add calendar-suite
npx azamat-ui-kit add upload
npx azamat-ui-kit add wizard-suite
npx azamat-ui-kit add hooks
npx azamat-ui-kit add recommended
```

## Options

```bash
npx azamat-ui-kit add data-table --dry-run
npx azamat-ui-kit add data-table --overwrite
npx azamat-ui-kit add data-table --skip-install
```

- `--dry-run` only prints which files would be copied.
- `--overwrite` replaces existing files.
- `--skip-install` copies files without installing dependencies.

## Registry behavior

The registry resolves dependencies automatically. For example:

```bash
npx azamat-ui-kit add data-table
```

also copies required files such as:

```txt
button
input
checkbox
dropdown-menu
select
table
pagination
simple-select
empty-state
loading-state
data-table-toolbar
data-table-pagination
data-table-select-column
data-table-sortable-header
data-table-actions-column
data-table-bulk-actions
utils
```

For a dashboard project, start with:

```bash
npx azamat-ui-kit add recommended
```

or a smaller set:

```bash
npx azamat-ui-kit add dashboard form inputs notifications command
```

The CLI copies source templates from this package and keeps app-specific business logic outside the UI kit.
