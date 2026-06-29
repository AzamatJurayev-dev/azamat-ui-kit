# azamat-ui-kit-cli

Source-copy CLI for Azamat UI Kit.

Use this package to copy editable component source into a Next.js or Vite project. New apps should use copied local source, not a runtime UI package.

## Next.js

```bash
npx azamat-ui-kit-cli init --template next --defaults
npx azamat-ui-kit-cli add button input data-table
```

## Vite

```bash
npx azamat-ui-kit-cli init --template vite --defaults
npx azamat-ui-kit-cli add button input data-table
```

## Commands

```bash
npx azamat-ui-kit-cli list
npx azamat-ui-kit-cli add button input card
npx azamat-ui-kit-cli preset minimal
npx azamat-ui-kit-cli preset dashboard
npx azamat-ui-kit-cli theme src/index.css
```

The CLI installs only third-party dependencies required by the copied source files.
