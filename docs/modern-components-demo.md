# Modern Components Demo

Use the `modern` surface when a project needs richer product widgets that go beyond the base UI, form, or display groups.

## Import

```tsx
import {
  Affix,
  DualListPicker,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  QRCode,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tag,
  Tour,
} from "azamat-ui-kit"
```

## Display and utility examples

```tsx
<Affix offsetTop={16}>
  <Tag tone="info">Pinned tools</Tag>
</Affix>

<QRCode value="https://azamat-ui.vercel.app" alt="Azamat UI" />
```

## Navigation and workflow examples

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs" active>
        Docs
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/components">Components</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

<Tour
  index={0}
  steps={[
    { title: "Open search", description: "Use Ctrl+K to jump between routes." },
    { title: "Copy source", description: "Add only the pieces your app needs." },
  ]}
/>
```

## Layout and selection examples

```tsx
<ResizablePanelGroup>
  <ResizablePanel defaultSize="40%">Sidebar content</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize="60%">Main content</ResizablePanel>
</ResizablePanelGroup>

<DualListPicker
  items={[
    { label: "Revenue", value: "revenue" },
    { label: "Customers", value: "customers" },
    { label: "Churn", value: "churn" },
  ]}
  picked={["revenue"]}
/>
```

## QR code note

`QRCode` now includes an internal SVG fallback when `src` is not provided. This fallback is useful for docs, mockups, and local demos.

Important:
- It is not a scan-certified QR encoder.
- For production scan accuracy, use a real QR encoder dependency or a server-generated QR image.
