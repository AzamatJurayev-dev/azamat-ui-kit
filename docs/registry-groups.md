# Registry groups

The CLI registry supports installing individual components or grouped kits.

## Main groups

```bash
npx azamat-ui-kit add ui
npx azamat-ui-kit add inputs
npx azamat-ui-kit add form
npx azamat-ui-kit add display
npx azamat-ui-kit add data-table
npx azamat-ui-kit add patterns
npx azamat-ui-kit add dashboard
```

## Dashboard-ready groups

- `display` includes `DescriptionList`, `Progress`, `Result`, `Timeline`, `MetricGrid`, `InfoCard`, and `ActivityFeed`.
- `patterns` includes `ResourcePage`, `ResourceDetailPage`, `FormBuilder`, and FormBuilder preset helpers.
- `data-table` includes the table, toolbar, pagination, row actions, bulk actions, and view presets.

## Validation

Run:

```bash
npm run test:registry
```

This checks that `registry.json`, `cli/registry.ts`, registry dependencies and source files stay in sync.
