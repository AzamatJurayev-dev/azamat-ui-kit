# Layout shell components

This document describes generic dashboard layout primitives.

## Components

- `AppShell`
- `AppHeader`
- `AppSidebar`
- `SidebarNav`
- `Breadcrumbs`
- `PageContainer`

These components do not import React Router, auth, permissions, billing, tenant, branch, or app-specific stores.

## Example

```tsx
import {
  AppHeader,
  AppShell,
  AppSidebar,
  Breadcrumbs,
  Button,
  PageContainer,
  PageHeader,
  SidebarNav,
} from "azamat-ui-kit"

function DashboardLayout() {
  return (
    <AppShell
      sidebar={
        <AppSidebar header={<strong>Azamat</strong>}>
          <SidebarNav
            items={[
              { key: "dashboard", label: "Dashboard", href: "/dashboard", active: true },
              { key: "products", label: "Products", href: "/products" },
              { key: "orders", label: "Orders", href: "/orders", badge: 12 },
            ]}
          />
        </AppSidebar>
      }
      header={
        <AppHeader
          left={
            <Breadcrumbs
              items={[
                { key: "home", label: "Home", href: "/" },
                { key: "products", label: "Products" },
              ]}
            />
          }
          right={<Button>Add</Button>}
        />
      }
    >
      <PageContainer>
        <PageHeader title="Products" description="Manage your catalog" />
      </PageContainer>
    </AppShell>
  )
}
```
