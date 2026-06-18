# FormBuilder field presets

`FormBuilder` can be configured with plain objects, but field preset helpers reduce repeated boilerplate.

## Helpers

```ts
inputField()
textareaField()
selectField()
asyncSelectField()
switchField()
numberField()
phoneField()
dateField()
dateRangeField()
customField()
formSection()
```

## Example

```tsx
const fields = [
  inputField({
    id: "name",
    props: {
      name: "name",
      label: "Name",
      required: true,
    },
  }),
  phoneField({
    id: "phone",
    props: {
      name: "phone",
      label: "Phone",
    },
  }),
  switchField({
    id: "active",
    colSpan: "full",
    props: {
      name: "active",
      label: "Active",
    },
  }),
]

<FormBuilder control={form.control} fields={fields} />
```

## Rules

- Helpers only create `FormBuilder` config.
- They do not add validation schema, API calls, auth, route or business logic.
- Each helper preserves the underlying field props from the existing form wrappers.
