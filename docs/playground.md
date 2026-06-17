# Playground

The playground is the local preview and manual QA page for `azamat-ui-kit` components.

Run it inside the UI kit repository:

```bash
npm install
npm run dev
```

The Vite app renders `src/App.tsx`. It is intentionally a demo surface and is not part of the library entry. The package entry remains `src/index.ts`.

## Current goal

`npm run dev` should show a broad mock dashboard, not a small button-only preview. The playground should help verify reusable component behavior, props, states, CSS tokens, dark mode and visual consistency before components are used in real projects.

## What is covered

The playground uses only mock/local data and covers these groups:

- app shell layout: `AppShell`, `AppHeader`, `AppSidebar`, `SidebarNav`, `Breadcrumbs`, `PageContainer`, `PageHeader`
- primitives and display: `Button`, `Badge`, `Card`, `CardFooter`, `Checkbox`, `Switch`, `StatusBadge`, `StatCard`
- feedback: `EmptyState`, `LoadingState`, `ToastProvider`, `useToast`
- standalone inputs: `Input`, `Textarea`, `SearchInput`, `ClearableInput`, `PasswordInput`, `PhoneInput`, `MaskedInput`, `NumberInput`, `MoneyInput`, `QuantityInput`, `DateInput`, `DateRangeInput`
- selects: `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`
- form wrappers: `FormInput`, `FormTextarea`, `FormSelect`, `FormAsyncSelect`, `FormSwitch`, `FormDateInput`, `FormDatePicker`, `FormDateRangeInput`, `FormDateRangePicker`
- form shell hardening: `FormFieldShell` vertical, horizontal and inline layouts, label actions, custom descriptions, errors, read-only state
- data table: `DataTable`, selection column, actions column, column visibility, row actions, bulk actions, skeleton loading, sticky header, striped rows, bordered cells
- upload: `FileUpload`, `ImageUpload`, rejected files, max file size/count, progress and previews
- calendar: `Calendar`, `DatePicker`, `DateRangePicker`
- overlays: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`, `DialogActionButton`
- command: `CommandPalette`, `useCommandPaletteShortcut`
- wizard: `Stepper`, `Wizard`
- CSS-first styling: root `.dark`, `data-radius`, `--aui-*` component tokens and `data-slot` selectors

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
   - command button opens CommandPalette

3. Check primitives
   - button variants render
   - button sizes render
   - badge/status tones render
   - card footer renders
   - checkbox checked/unchecked states work
   - switch toggles

4. Check CSS-first visual system
   - dark mode toggle changes the root .dark class
   - radius controls update documentElement data-radius
   - cards use --aui-card-shadow
   - table header uses --aui-table-header-bg
   - controls use --aui-control-radius

5. Check inputs
   - SearchInput updates table filtering
   - ClearableInput clears value
   - PasswordInput toggles visibility
   - PhoneInput formats +998 phone
   - MaskedInput transforms input
   - NumberInput respects min/max
   - MoneyInput emits raw value
   - QuantityInput plus/minus works
   - DateInput and DateRangeInput update values

6. Check selects
   - SimpleSelect opens and selects
   - AsyncSelect respects minSearchLength
   - AsyncSelect empty renderer appears for unmatched search
   - AsyncMultiSelect supports maxSelected and select visible

7. Check form wrappers
   - vertical fields align normally
   - horizontal FormFieldShell uses two-column layout
   - inline FormFieldShell stays compact
   - labelAction renders
   - descriptionPosition bottom works
   - readOnly/disabled states are visible
   - FormDatePicker and FormDateRangePicker open calendar popovers

8. Check DataTable
   - row selection works
   - bulk actions appear
   - column visibility menu toggles columns
   - sorting state updates
   - skeleton mode toggles
   - striped/bordered/sticky header styles are visible
   - disabled row is dimmed
   - row click/double click triggers toast

9. Check upload
   - file picker opens
   - drag/drop works
   - invalid files appear in rejected list
   - maxFiles/maxSize messages render
   - progress bar renders
   - image preview renders and updates

10. Check overlays
   - ModalShell opens/closes
   - SheetShell opens/closes
   - ConfirmDialog destructive action works
   - DialogActions footer alignment looks correct

11. Check command and toast
   - Command button opens palette
   - Ctrl/Cmd + K opens palette
   - command actions trigger toast or navigation hash
   - toast closes automatically or by close button

12. Check wizard
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
- DataTable API consolidation examples
- FormBuilder examples after it exists
- DetailView / ResourcePage examples after they exist
- Toast promise-style demo after Toast hardening
- CommandPalette async group demo after command hardening
- AppShell mobile sidebar demo after shell hardening
```
