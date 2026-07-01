# Modern Components Demo

This page tracks modern UI components added after the public surface audit.

## Import

```tsx
import { AspectRatio, Tag, QRCode, TimePicker, Cascader, JsonInput, DualListPicker, Tour } from "azamat-ui-kit"
```

## Display examples

```tsx
<AspectRatio ratio={16 / 9} className="rounded-xl border bg-muted">
  <div className="grid size-full place-items-center">Preview</div>
</AspectRatio>

<Tag tone="success" removable>
  Active
</Tag>

<QRCode value="https://example.com/table/12" />
```

## Form and workflow examples

```tsx
<TimePicker label="Start time" />

<Cascader
  value={["uz", "tashkent"]}
  options={[{ label: "Uzbekistan", value: "uz", children: [{ label: "Tashkent", value: "tashkent" }] }]}
/>

<JsonInput value="{}" />

<DualListPicker
  items={[{ label: "Admin", value: "admin" }, { label: "Manager", value: "manager" }]}
  picked={["admin"]}
/>

<Tour steps={[{ title: "Welcome", description: "Start from the dashboard." }]} />
```

## Notes

- `QRCode` includes an internal SVG fallback. For production scan accuracy, replace the fallback with a QR encoder dependency or server-generated QR image.
- `RichTextEditor` is a lightweight scaffold. For complex editing, route it to a dedicated editor integration.
- `DualListPicker` is the safe public name for transfer-style list picking.
