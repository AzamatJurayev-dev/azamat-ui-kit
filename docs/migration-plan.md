# UI Kit Migration Plan

This plan is based on reusable code extracted from existing projects. The goal is to move reusable code into `azamat-ui-kit` without bringing app-specific business logic.

## Phase 1 - Safe reusable foundation

Added: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`, `Pagination`, `SimpleSelect`, `MoneyInput`, `QuantityInput`, `useSessionStorageState`, `useBeforeUnloadWhenDirty`, `useIsMobile`.

Rules: no API client imports, no app route imports, no i18n dependency, no business types.

## Phase 2 - Form wrappers

Added: `FormFieldShell`, `FormInput`, `FormSelect`, `FormAsyncSelect`, `FormTextarea`, `FormSwitch`.

Rules: form wrappers only connect generic field state; validation messages come from the consuming app.

## Phase 3 - Universal async select

Added: `AsyncSelect`, `AsyncMultiSelect`, grouped options, quick create, selected option preload, local option cache, selected count labels.

Rules: core component does not import API clients and does not know backend response shape.

## Phase 4 - DataTable and feedback

Added: `DataTable`, `DataTablePagination`, `DataTableToolbar`, `EmptyState`, `LoadingState`, `StatusBadge`.

Rules: no endpoints, no route/query dependency, no project resource state.

## Phase 5 - Dashboard helpers

Added: `ActionMenu`, `PageHeader`, `FilterBar`, `StatCard`, `DataTableColumnVisibilityMenu`.

Rules: all behavior is passed through props/callbacks.

## Phase 6 - Layout, table, input and hook helpers

Added: `AppShell`, `AppHeader`, `AppSidebar`, `Checkbox`, `createDataTableSelectColumn`, `DataTableSortableHeader`, `MaskedInput`, `PhoneInput`, `useDisclosure`, `useDebouncedValue`, `useDebouncedCallback`.

Rules: shell components do not know router/auth/permission logic.

## Phase 7 - Theme CSS strategy

Changed package styling strategy:

- package entry no longer forces global CSS import
- CLI writes theme tokens to the consumer app global CSS file
- dark mode uses `.dark` class on the root/html element
- theme CSS is updated through marked blocks

## Phase 8 - Advanced form inputs

Added: `ClearableInput`, `SearchInput`, `PasswordInput`, `NumberInput`, `DateInput`, `DateRangeInput`, `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput`, `FormDateRangeInput`.

## Phase 9 - Playground and local preview

Added a Vite playground for testing components inside the UI kit repository.

Rules: fake local data only; no real project API clients.

## Phase 10 - DataTable action helpers

Added: `DataTableRowActions`, `createDataTableActionsColumn`, `DataTableBulkActions`.

Rules: row and bulk actions receive data through props and emit callbacks.

## Phase 11 - Notifications and command palette

Added: `ToastProvider`, `useToast`, `CommandPalette`, `useCommandPaletteShortcut`.

Rules: no router/auth/API dependency; consuming apps pass behavior through callbacks.

## Phase 12 - Calendar, upload, wizard and CI

Added:

- `Calendar`
- `DatePicker`
- `DateRangePicker`
- `FormDatePicker`
- `FormDateRangePicker`
- `FileUpload`
- `ImageUpload`
- `Stepper`
- `Wizard`
- GitHub Actions build workflow

Rules:

- calendar stores values as `YYYY-MM-DD` strings
- date pickers use popover calendar UI and remain API-independent
- upload components only handle selected `File[]`; API/S3/R2 upload stays in the app
- wizard controls visual flow only; validation/submission stay in the app
- CI runs install and build on push/pull request

## Phase 13 - Registry polish

Expanded CLI registry coverage for all current components and groups:

- `recommended`
- `dashboard`
- `layout`
- `inputs`
- `form`
- `feedback`
- `data-table`
- `notifications`
- `command`
- `calendar-suite`
- `upload`
- `wizard-suite`
- `hooks`

Rules:

- CLI registry dependencies should copy required primitives automatically
- groups should be useful entry points for real dashboards
- registry entries must point to source files, not stale inline templates
- component copy mode must stay API/business independent

## Phase 14 - DataTable hardening

Improved existing `DataTable` without changing its default usage:

- `density`: `compact`, `default`, `comfortable`
- `striped` rows
- `bordered` cells
- `stickyHeader`
- skeleton loading rows through `loadingVariant="skeleton"`
- `onRowDoubleClick`
- `getRowDisabled`
- `cellFallback`
- `headerCellClassName` and `cellClassName` callbacks
- improved mobile loading fallback

Rules:

- all new behavior is optional and backward-compatible
- no API, route, permission or project state dependency is introduced
- visual variants are controlled by props only

## Phase 15 - AsyncSelect hardening

Improved existing `AsyncSelect` and `AsyncMultiSelect` without changing basic usage:

- `cacheTtl` for expiring cached remote searches
- custom `renderLoading`, `renderEmpty`, `renderError`, `renderMinSearch` renderers
- `minSearchLength` message through labels/render prop
- sticky group labels inside option lists
- multi-select `showSelectAll`
- multi-select visible-option select all
- multi-select clear all action in dropdown
- `renderMaxSelected` and `labels.maxSelected`
- max selected message support

Rules:

- loading/search/create behavior stays API-independent
- cache is local component memory only
- select all only selects currently visible options
- all advanced render states are optional

## Phase 16 - Form components hardening

Improved the shared form layer and core form wrappers:

- `FormFieldShell` layout support: `vertical`, `horizontal`, `inline`
- `descriptionPosition`: `top` or `bottom`
- `labelAction` slot
- custom `requiredIndicator`
- custom `errorIcon` and `showErrorIcon`
- `disabled` and `readOnly` visual state propagation
- `labelRowClassName`, `contentClassName`, `descriptionClassName`, `errorClassName`
- `FormInput`, `FormTextarea`, `FormSelect`, `FormAsyncSelect`, `FormSwitch` now expose advanced shell props
- `FormSwitch` supports `labelPlacement="start" | "end"`

Rules:

- form wrappers still only connect React Hook Form field state
- layout behavior is visual only and does not know business rules
- existing simple usage remains backward-compatible

## Phase 17 - Upload components hardening

Improved existing `FileUpload` and `ImageUpload` without adding API/S3/R2 coupling:

- drag-and-drop dropzone
- keyboard-accessible dropzone trigger
- `maxFiles` validation
- `maxSize` validation
- `accept` validation for extensions and MIME patterns
- controlled rejected files list
- file remove and clear all actions
- append/replace mode through `appendFiles`
- custom `renderFile`, `renderRejectedFile`, `renderActions`
- progress support per file or globally
- image preview URLs with automatic revoke
- custom image preview renderer

Rules:

- upload components only manage selected browser `File[]`
- real upload requests, R2/S3 URLs, auth and API logic stay in the app
- validation is client-side convenience, not a security boundary

## Phase 18 - CSS-first visual system

Started moving visual polish into CSS tokens and stable `data-slot` selectors:

- added `--aui-*` component tokens for controls, cards, popovers and tables
- added CSS slot rules for button, input, textarea, select trigger, card, stat card, popover, dropdown, dialog, sheet and data table
- synced the same token layer into the CLI theme template
- documented CSS-first theming in `docs/theme-css.md`

Rules:

- do not create duplicate component names just for visual differences
- component visuals should be adjustable from global CSS tokens
- components should expose slots and props; apps control branding through CSS variables

## Phase 19 - Toast API hardening

Improved `ToastProvider` and `useToast` without adding an external toast library:

- `toast.success(...)`
- `toast.info(...)`
- `toast.warning(...)`
- `toast.error(...)`
- `toast.loading(...)`
- `toast.promise(...)`
- loading tone with spinner icon
- `pauseOnHover` provider behavior
- promise toast keeps the same id and updates after success/error

Rules:

- toast helpers wrap app-owned actions only
- the UI kit does not perform API requests
- existing `addToast`, `updateToast`, `dismissToast`, `clearToasts` APIs remain available

## Phase 20 - Playground full showcase

Expanded the dev playground into a broad manual QA surface:

- app shell, sidebar, breadcrumbs and page header
- primitive buttons, badges, cards, checkbox and switch
- standalone inputs, selects, async select and multi-select
- hardened form wrappers and field shell layouts
- hardened DataTable states: density, skeleton, sticky header, actions and selection
- upload, image preview, calendar and date pickers
- overlays, command palette, toast, stepper and wizard
- CSS-first token controls for theme/radius checks

Rules:

- playground uses local mock data only
- playground should show important props/states before components are reused in real apps
- visual differences should be demonstrated through props, slots and CSS tokens, not duplicate component names

## Phase 21 - DataTable API consolidation

Improved existing `DataTable` as the single table component instead of adding a separate `ProTable` name:

- `features` prop for search, column visibility, row actions, bulk actions, refresh and export
- `search` prop for built-in SearchInput toolbar wiring
- `title` and `description` props for built-in toolbar title area
- `toolbarActions` slot or callback
- `rowActions` callback that automatically appends an actions column
- `bulkActions` for selected rows
- `onRefresh` and `onExport` callbacks with table context
- built-in column visibility menu integration

Rules:

- keep one `DataTable` name and control behavior through props
- callbacks receive table/data/selected rows but no API is called inside the UI kit
- existing `toolbar` and `toolbarProps` APIs remain available

## Phase 22 - Landing and documentation polish

Improved the playground as a public-facing UI kit website:

- redesigned landing page hero with CTAs, metrics and preview card
- added system cards for Foundation, Data Entry, Data Display and Application Blocks
- documented architecture principles and CSS-first customization on the landing page
- polished `PlaygroundCard`, `DemoSection`, `TokenPill` and usage cards
- polished `ComponentPreview` with preview/code tabs, copy button, dependency badges and line numbers
- updated `docs/playground.md` with landing-page and quality rules

Rules:

- showcase pages should feel like a real library website
- examples should remain mock/local and reusable
- UI polish should come from shared wrappers, slots and CSS tokens

## Phase 23 - Section showcase polish

Improved individual playground sections so each looks like a modern UI library documentation page:

- polished Forms section with metrics, field shell layout cards, state cards and a full `ComponentPreview`
- polished DataTable section with table metrics, feature controls, CSS token cards and an interactive table preview
- polished Upload section with upload metrics, policy cards, validation/progress states and a full upload workspace preview
- polished Calendar section with selected date/range metrics, date controls, model notes and calendar suite preview
- polished Overlay section with modal/sheet/confirm/command cards, wizard flow and controlled overlay preview

Rules:

- each section should show props, state and usage guidance in a structured way
- examples must use mock/local state only
- section polish should reuse shared playground wrappers instead of ad-hoc layouts

## Phase 24 - Foundation and Inputs polish

Finished the remaining high-traffic component sections:

- polished Foundation with metrics, button matrix, status language, primitive fields, radius controls, CSS token map and preview examples
- polished Inputs with metrics, async controls, controlled state summary, token guidance, complete input/select suite preview and state cards
- added stronger usage guidance for one-component/many-states, parser/formatter/loader props, and CSS-first input styling

Rules:

- foundation primitives should be the shared language for bigger components
- input behavior should be controlled by props and callbacks, not project-specific components
- all examples stay local/mock and API-free

## Phase 25 - CommandPalette hardening

Improved existing `CommandPalette` without adding router/API coupling:

- async `loadItems(search)` groups
- debounced search loading through `debounceMs`
- recent commands with configurable label and limit
- custom `filterItem`, `renderEmpty`, and `renderLoading`
- per-item `closeOnSelect`, `disabledReason`, and async `onSelect`
- loading indicators for groups and selected items
- documented async command and recent-command usage in `docs/notifications-command.md`

Rules:

- command palette remains generic and does not navigate by itself
- API clients, permissions, auth and routing stay in the consuming app
- async loaders are optional and passed through props
- existing static `groups/items` usage remains backward-compatible

## Next priority order

1. Templates section polish
2. App shell advanced responsive sidebar helpers
3. FormBuilder / ResourcePage planning on top of existing components
4. Component tests and accessibility smoke checks
