# azix

Source-copy CLI for Azamat UI Kit.

Use this package to copy editable component source into a Next.js or Vite project. New apps should use copied local source, not a runtime UI package.

## Next.js

```bash
npx azix init --template next --defaults
npx azix add button input data-table
```

## Vite

```bash
npx azix init --template vite --defaults
npx azix add button input data-table
```

## Commands

```bash
npx azix list
npx azix add button input card
npx azix preset minimal
npx azix preset dashboard
npx azix theme src/index.css
```

The CLI installs only third-party dependencies required by the copied source files.
