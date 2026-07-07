# azix

Source-copy CLI for Azamat UI Kit.

Use this package to copy editable component source into a Next.js or Vite project. New apps should use copied local source, not a runtime UI package.

## Next.js

```bash
npx @azamatjurayevdev/azix-ui init --template next --defaults
npx @azamatjurayevdev/azix-ui add button input data-table
```

## Vite

```bash
npx @azamatjurayevdev/azix-ui init --template vite --defaults
npx @azamatjurayevdev/azix-ui add button input data-table
```

## Commands

```bash
npx @azamatjurayevdev/azix-ui list
npx @azamatjurayevdev/azix-ui add button input card
npx @azamatjurayevdev/azix-ui preset minimal
npx @azamatjurayevdev/azix-ui preset dashboard
npx @azamatjurayevdev/azix-ui theme src/index.css
```

The CLI installs only third-party dependencies required by the copied source files.
