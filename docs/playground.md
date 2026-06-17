# Playground

The playground is the local preview and manual QA page for `azamat-ui-kit` components.

Run it inside the UI kit repository:

```bash
npm install
npm run dev
```

The Vite app renders `src/App.tsx`, which is intentionally kept as a demo surface and is not part of the library entry. The package entry remains `src/index.ts`.

## What is covered

The playground uses only mock/local data and currently covers these groups:

- app shell layout: `AppShell`, `AppHeader`, `AppSidebar`, `SidebarNav`, `Breadcrumbs`, `PageContainer`, `PageHeader`
- primitives and display: `Button`, `Badge`, `Card`, `CardFooter`, `StatusBadge`, `StatCard`
- feedback: `EmptyState`, `LoadingState`, `ToastProvider`, `useToast`
- standalone inputs: `SearchInput`, `ClearableInput`, `PasswordInput`, `PhoneInput`, `NumberInput`, `MoneyInput`, `QuantityInput`, `DateInput`, `DateRangeInput`
- selects: `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`
- form wrappers: `FormInput`, `FormTextarea`, `FormSelect`, `FormAsyncSelect`, `FormSwitch`, `FormDateInput`, `FormDatePicker`, `FormDateRangeInput`, `FormDateRangePicker`
- form shell hardening: `FormFieldShell` vertical, horizontal and inline layouts, label actions, custom descriptions, errors, read-only state
- data table: `DataTable`, selection column, actions column, column visibility, row actions, bulk actions, skeleton loading, sticky header, striped rows, bordered cells, mobile cards
- upload: `FileUpload`, `ImageUpload`, rejected files, max file size/count, progress and previews
- calendar: `Calendar`, `DatePicker`, `DateRangePicker`
- overlays: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`, `DialogActionButton`
- command: `CommandPalette`, `useCommandPaletteShortcut`
- wizard: `Stepper`, `Wizard`

## Manual QA checklist

Use this checklist after every hardening commit:

```txt
1. Start dev server
   npm run dev

2. Confirm app shell renders
   - sidebar visible on desktop
   - header sticky
   - breadcrumbs visible
   - page header actions open ActionMenu

3. Check primitives
   - button variants render
   - badge/status tones render
   - card footer renders
   - empty/loading states render

4. Check inputs
   - SearchInput updates table filtering
   - ClearableInput clears value
   - PasswordInput toggles visibility
   - PhoneInput formats +998 phone
   - NumberInput respects min/max
   - MoneyInput emits raw value
   - QuantityInput plus/minus works
   - DateInput and DateRangeInput update values

5. Check selects
   - SimpleSelect opens and selects
   - AsyncSelect respects minSearchLength
   - AsyncSelect empty renderer appears for unmatched search
   - AsyncMultiSelect supports maxSelected and select visible

6. Check form wrappers
   - vertical fields align normally
   - horizontal FormFieldShell uses two-column layout
   - inline FormFieldShell stays compact
   - labelAction renders
   - descriptionPosition bottom works
   - readOnly/disabled states are visible

7. Check DataTable
   - row selection works
   - bulk actions appear
   - column visibility menu toggles columns
   - skeleton mode toggles
   - striped/bordered/sticky header styles are visible
   - disabled row is dimmed
   - row click/double click triggers toast

8. Check upload
   - file picker opens
   - drag/drop works
   - invalid files appear in rejected list
   - maxFiles/maxSize messages render
   - progress bar renders
   - image preview renders and updates

9. Check overlays
   - ModalShell opens/closes
   - SheetShell opens/closes
   - ConfirmDialog destructive action works

10. Check command and toast
   - Command button opens palette
   - Ctrl/Cmd + K opens palette
   - command actions trigger toast or navigation hash
   - toast closes automatically or by close button

11. Check wizard
   - Stepper changes current step
   - Wizard next/previous works
   - Finish triggers toast
```

## Rules

The playground can use fake local data, but it must not import a real project API client, auth store, tenant logic, permission logic, or route configuration.

When a new reusable component is added, add a small usage example to the playground before using it across real projects.

When an existing component is hardened, add at least one playground example for the new props so `npm run dev` can be used as a manual QA page.

## Next playground improvements

Upcoming UI coverage should focus on:

```txt
- standalone Checkbox and Switch primitive demos
- Textarea primitive demo outside form wrappers
- MaskedInput direct demo
- Toast promise-style demo after Toast hardening
- CommandPalette async group demo after command hardening
- AppShell mobile sidebar demo after shell hardening
```
