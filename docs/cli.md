# CLI Usage

`azamat-ui-kit` includes a small CLI for copying reusable components into other React projects.

## Initialize

Run inside the target project:

```bash
npx azamat-ui-kit init
```

This creates `azamat-ui.json`.

Default config:

```json
{
  "style": "default",
  "alias": "@",
  "componentsPath": "src/components/ui",
  "utilsPath": "src/lib/utils.ts",
  "paths": {
    "components": "src/components",
    "ui": "src/components/ui",
    "hooks": "src/hooks",
    "lib": "src/lib"
  }
}
```

## List available components

```bash
npx azamat-ui-kit list
```

## Add components

```bash
npx azamat-ui-kit add button input data-table
```

Useful groups:

```bash
npx azamat-ui-kit add overlay
npx azamat-ui-kit add inputs
npx azamat-ui-kit add form
npx azamat-ui-kit add feedback
npx azamat-ui-kit add data-table
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
select
table
pagination
simple-select
empty-state
loading-state
data-table-toolbar
data-table-pagination
utils
```

The CLI copies source templates from this package and keeps app-specific business logic outside the UI kit.
