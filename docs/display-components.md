# Display components

This layer adds reusable dashboard display components that are common in modern UI libraries.

## Components

```txt
DescriptionList
Timeline
Progress
ProgressCard
Result
ResultAction
```

## DescriptionList

Use it for read-only detail screens, profile pages, order details, invoice summaries, tenant detail pages and audit views.

```tsx
<DescriptionList
  title="Product details"
  columns={2}
  items={[
    { key: "name", label: "Name", value: product.name },
    { key: "sku", label: "SKU", value: product.sku },
    { key: "status", label: "Status", value: <StatusBadge tone="success">Active</StatusBadge> },
    { key: "notes", label: "Notes", value: product.notes, span: 2 },
  ]}
/>
```

Rules:

- pass values through props
- app owns formatting and business labels
- use `hidden` for permission/state-based visibility
- use `span` instead of creating custom detail layouts

## Timeline

Use it for order history, status flow, audits, activity feed and process tracking.

```tsx
<Timeline
  pending
  items={[
    { key: "created", title: "Created", time: "09:30", tone: "success" },
    { key: "review", title: "Reviewed", time: "10:15", tone: "info" },
  ]}
/>
```

Horizontal mode:

```tsx
<Timeline orientation="horizontal" compact items={items} />
```

## Progress

Use for uploads, onboarding, setup flows, task completion and KPI progress.

```tsx
<Progress label="Sync progress" value={74} tone="success" showValue />

<ProgressCard
  title="Profile completion"
  value={82}
  tone="info"
  footer="3 steps left"
/>
```

## Result

Use for final states and page-level feedback.

```tsx
<Result
  status="success"
  title="Saved"
  description="Changes were saved successfully."
  actions={<ResultAction>Continue</ResultAction>}
/>
```

Statuses:

```txt
success
error
warning
info
not-found
forbidden
server-error
```

## Rule

These components do not call APIs, check permissions or know routes. They only display data/actions passed by the app.
