# Playground

The playground is the local preview page for `azamat-ui-kit` components.

Run it inside the UI kit repository:

```bash
npm install
npm run dev
```

The Vite app renders `src/App.tsx`, which is intentionally kept as a demo surface and is not part of the library entry. The package entry remains `src/index.ts`.

## What is covered

The current playground shows:

- app shell layout
- page header
- stat cards
- advanced inputs
- React Hook Form wrappers
- async multi select
- data table
- column visibility menu
- action menu
- empty/loading states
- modal and confirm dialog

## Rules

The playground can use fake local data, but it must not import a real project API client, auth store, tenant logic, permission logic, or route configuration.

When a new reusable component is added, add a small usage example to the playground before using it across real projects.
