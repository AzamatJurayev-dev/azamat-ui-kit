# Playground

The playground is the local preview page for `azamat-ui-kit` components.

Run it inside the UI kit repository:

```bash
npm install
npm run dev
```

The Vite app renders `src/App.tsx`, which is intentionally kept as a demo surface and is not part of the library entry. The package entry remains `src/index.ts`.

## What is covered

The current playground shows mock examples for:

- app shell layout: `AppShell`, `AppHeader`, `AppSidebar`, `SidebarNav`, `Breadcrumbs`, `PageContainer`, `PageHeader`
- primitives: `Button`, `Badge`, `Card`, `StatusBadge`
- feedback: `EmptyState`, `LoadingState`, `ToastProvider`, `useToast`
- standalone inputs: `SearchInput`, `ClearableInput`, `PasswordInput`, `PhoneInput`, `NumberInput`, `MoneyInput`, `QuantityInput`, `DateInput`, `DateRangeInput`
- selects: `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`
- form wrappers: `FormInput`, `FormTextarea`, `FormSelect`, `FormAsyncSelect`, `FormSwitch`, `FormDateInput`, `FormDatePicker`, `FormDateRangeInput`, `FormDateRangePicker`
- form shell hardening: vertical, horizontal and inline layouts, label actions, custom descriptions and errors
- data table: `DataTable`, selection column, actions column, column visibility, row actions, bulk actions, skeleton loading, sticky header, striped and bordered modes
- upload: `FileUpload`, `ImageUpload`, rejected files, max file size/count, progress and previews
- calendar: `Calendar`, `DatePicker`, `DateRangePicker`
- overlays: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`, `DialogActionButton`
- command: `CommandPalette`, `useCommandPaletteShortcut`
- wizard: `Stepper`, `Wizard`

## Rules

The playground can use fake local data, but it must not import a real project API client, auth store, tenant logic, permission logic, or route configuration.

When a new reusable component is added, add a small usage example to the playground before using it across real projects.

When an existing component is hardened, add at least one playground example for the new props so `npm run dev` can be used as a manual QA page.
