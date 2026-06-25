# Azamat UI Kit Complete Library Audit

Date: 2026-06-25

Scope:

- Package: `azamat-ui-kit`
- Current version in `package.json`: `0.3.1`
- Main source: `src`
- CLI/source-copy vendor source: `packages/cli/vendor/src`
- Registry: `registry.json`
- Existing governance docs: `COMPONENT_MATURITY.md`, `COMPONENT_FAMILY_ARCHITECTURE.md`, `PUBLIC_API_INVENTORY.md`, `UNIVERSAL_INPUT.md`

## Executive summary

`azamat-ui-kit` ancha kengaygan, lekin hozir library sifatida ikkita katta muammo bor:

- Public API juda keng va chalkash: root export hamma narsani eksport qiladi, registry recommended ro'yxati primary componentlar bilan preset/aliaslarni aralashtiradi.
- Component family modeli boshlangan, lekin hali to'liq enforce qilinmagan: `Input`, `Select`, `Card`, `Form`, `DataTable` primary surface bo'lishi kerak, lekin `MoneyInput`, `SearchInput`, `FormSearchInput`, `SmartCard` kabi nomlar hali public mental modelni buzmoqda.

Libraryni product-ready qilish uchun asosiy yo'nalish: component sonini ko'rsatish emas, developer uchun boshlash nuqtasini aniq qilish. Ya'ni public docs va registryda primary componentlar kam, detail/API ichida variantlar ko'p bo'lishi kerak.

## Current state summary

Source auditdan ko'ringan asosiy holatlar:

- `src/index.ts` root export juda keng.
- `src/components/inputs/index.ts` hamma input presetlarni eksport qiladi.
- `src/components/form/public.ts` eski form wrapper aliaslarini ham public qiladi.
- `registry.json` `recommended` ro'yxatida primary, preset va aliaslar aralash.
- `src/families/catalog.ts`, `docs-groups.ts`, `member-metadata.ts`, `migration-map.ts` family modelni boshlagan.
- `scripts/check-family-governance.mjs` metadata mavjudligini tekshiradi, lekin props/API sifati va public API tozaligini tekshirmaydi.
- `COMPONENT_MATURITY.md` root exports cheklanishi kerakligini yozgan, lekin amalda root export hali cheklanmagan.
- `packages/cli/vendor/src`da ko'p dirty o'zgarishlar bor; source va vendor sync risk yuqori.

## P0 - Root public API juda keng

### Problem

`src/index.ts` quyidagi qatlamlarni hammasini rootdan eksport qiladi:

- primitives
- actions
- layout
- filters
- overlay
- navigation
- inputs
- form
- feedback
- display
- data-table
- notifications
- command
- calendar
- upload
- wizard
- charts
- hooks
- utils

Bu qisqa muddatda qulay, lekin product library uchun risk:

- User `import { MoneyInput, FormSearchInput, SmartCard } from "azamat-ui-kit"` kabi eski yoki secondary APIlarni primary deb o'ylaydi.
- Bundle mental model katta ko'rinadi.
- Docs va root export orasida tartib yo'q.
- Breaking change qilish qiyinlashadi.

### Fix

- Root export faqat canonical adoption surface bo'lishi kerak.
- Advanced/legacy/helper exportlar subpathda qoladi.
- Root export policy:
  - Keep: `Button`, `Input`, `AppInput`, `FormInput`, `Select`, `FormSelect`, `Card`, `InfoCard`, `Dialog`, `DataTable`, `DatePicker`, `DateRangePicker`, core layout/feedback.
  - Move to subpath or mark alias: `MoneyInput`, `QuantityInput`, `SearchInput`, `PasswordInput`, `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput`, `SmartCard`.
  - Keep helper only if documented: `buttonVariants`, `badgeVariants`, `createDataTableActionsColumn`, `createDataTableSelectColumn`.

### Done criteria

- `src/index.ts` root public API is intentional.
- `npm pack --dry-run` package still includes subpath modules.
- Docs primary examples use canonical names only.

## P0 - Input family hali to'liq birlashtirilmagan

### Current useful work

Good parts:

- `src/components/inputs/app-input.tsx` exists.
- `AppInputKind = "text" | "clearable" | "search" | "password" | "number" | "phone" | "date"`.
- `src/components/form/form-app-input.tsx` exists.
- Existing `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput` are replaceable by `FormAppInput kind=...`.
- `src/families/member-metadata.ts` already marks many members by family.

### Problems

- `MoneyInput`, `QuantityInput`, `MaskedInput`, `OtpInput`, `ColorInput`, `DateRangeInput` are not part of `AppInputKind`.
- `registry.json` still recommends `search-input`, `async-select`, `form-app-input`, `form-input`, etc. together without primary/alias clarity.
- `src/components/inputs/index.ts` exports every preset equally.
- `src/components/form/public.ts` exports compatibility wrappers equally.
- `FormInput` and `FormAppInput` both exist, which creates naming uncertainty.

### Props to add or normalize

`AppInput` should become the single user-facing input surface:

- Add `kind="money"` using existing `MoneyInput` internals.
- Add `kind="quantity"` using existing `QuantityInput` internals.
- Add `kind="masked"` using existing `MaskedInput` internals.
- Add `kind="otp"` only if the component can fit the same input mental model; otherwise keep advanced.
- Add `kind="color"` only if native color input is accepted as a simple preset.
- Add `kind="date-range"` only if the value model is clearly `{ from?: string; to?: string }`.
- Add common props: `label`, `description`, `error`, `start`, `end`, `clearable`, `loading`, `status`, `size`, `tone`, `wrapperClassName`, `inputClassName`.
- Standardize callbacks:
  - string-like: `onValueChange(value: string)`
  - numeric: `onNumberChange(value: number | null, rawValue: string)`
  - range: `onValueChange(value: { from?: string; to?: string })`
  - phone: `onValueChange(maskedValue, rawValue)` or a documented object payload.

### Props to reduce/deprecate

- `MoneyInput` top-level docs name should be reduced to `Input kind="money"` docs.
- `QuantityInput` top-level docs name should be reduced to `Input kind="quantity"`.
- `SearchInput` top-level docs name should be reduced to `Input kind="search"`.
- `PasswordInput` top-level docs name should be reduced to `Input kind="password"`.
- `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput` should be compatibility aliases only.

### Done criteria

- New docs say: start with `Input`/`AppInput` and `FormInput`/`FormAppInput`.
- Old preset exports still work for compatibility, but registry/docs do not present them as primary.
- Family governance fails if a transitional alias appears in root recommended docs.

## P0 - Form family naming is split

### Problem

There are overlapping names:

- `FormInput`
- `FormAppInput`
- `FormSearchInput`
- `FormPasswordInput`
- `FormNumberInput`
- `FormPhoneInput`
- `FormDateInput`
- `FormDateRangeInput`

This is too much for public docs. It is useful internally, but not as the main user mental model.

### Fix

- Pick one canonical RHF field:
  - Recommended: `FormInput`
  - Alternative: keep `FormAppInput` only if `AppInput` remains public naming.
- All specialized wrappers become alias/migration helpers.
- `FormInput` should support `kind` for search/password/number/phone/date/money/quantity/masked.
- Form docs should show:
  - `FormFieldShell`
  - `FormInput`
  - `FormSelect`
  - `FormTextarea`
  - `FormSwitch`
  - Date picker wrappers only where calendar popover is needed.

### Done criteria

- Form docs top-level has 5-7 concepts, not 15 wrapper names.
- `FormBuilder` stops importing old wrappers as primary building blocks where possible.

## P0 - Registry recommended list is not a product API

### Problem

`registry.json` currently has:

- `recommended` with `search-input`, `async-select`, `form-app-input`, `form-input`, `metric-card`, etc.
- `recommendedByMode.foundation`, `sourceCopy`, `system`
- groups include both primary components and presets.

This is not enough for shadcn-like source install. It lacks:

- canonical vs alias vs advanced status
- per-item dependencies
- file targets
- related CSS variables
- peer/runtime dependency list per component
- heavy component marker
- source-copy target path
- family ownership

### Fix

Registry item model should include:

- `name`
- `title`
- `family`
- `status`
- `canonical`
- `aliases`
- `files`
- `dependencies`
- `devDependencies`
- `peerDependencies`
- `registryDependencies`
- `cssVars`
- `tailwindContentRequired`
- `sourceTarget`
- `docsPath`

### Done criteria

- `npx azamat-ui-kit add data-table` can install only data-table source and required internal files.
- `npx azamat-ui-kit add input` installs canonical input plus selected presets only when requested.
- Registry validation fails if a recommended item is transitional.

## P1 - Source and CLI vendor drift risk

### Problem

`git status` shows many modified/untracked files under:

- `packages/cli/vendor/src/components/...`

This means CLI source-copy package may not match `src/components/...`.

Risk:

- Published npm package works one way.
- CLI-installed source works another way.
- Bug fixed in `src` may not be fixed in `vendor`.
- Component docs may describe package mode but source mode installs old code.

### Fix

- Add sync script:
  - source: `src/components`, `src/hooks`, `src/lib`
  - target: `packages/cli/vendor/src`
- Add CI check that vendor copy is in sync.
- Avoid manually editing vendor files unless sync script owns it.
- Commit policy: component source change must update vendor or fail.

### Done criteria

- `npm run test:registry` or a new `test:vendor-sync` fails on drift.
- Dirty vendor files are intentional and traceable.

## P1 - Props documentation source-of-truth is missing

### Problem

The library exports many `Props` types, but there is no single docs schema for:

- prop name
- type
- required
- default
- description
- examples
- controlled/uncontrolled notes
- accessibility notes

Existing docs in public site rely on manual data, not package source.

### Fix

Add `src/families/props-metadata.ts` or generated metadata:

```ts
export const componentPropsMetadata = {
  Button: [
    { name: "variant", type: "...", default: "default", description: "..." },
  ],
}
```

Minimum components to document first:

- `Button`
- `Input`/`AppInput`
- `FormInput`
- `Select`
- `FormSelect`
- `DataTable`
- `DatePicker`
- `DateRangePicker`
- `Dialog`
- `Popover`
- `Card`/`InfoCard`

### Done criteria

- Public docs can import/read package metadata.
- New component cannot be marked stable without props metadata.

## P1 - Button visual API needs stricter state audit

### Good parts

- `Button` uses Base UI primitive.
- Has `variant`, `size`, `loading`, `loadingLabel`, `leftIcon`, `rightIcon`.
- Uses `buttonVariants`.

### Problems

- Variant classes are visually complex and use many gradients/color-mix values.
- Disabled uses opacity, which can make text too weak.
- `link` variant may not receive size/padding expectations consistently.
- Loading button replaces left icon and children label with loading label, but docs need to explain this.

### Props to add or review

- `fullWidth?: boolean`
- `iconOnly` or enforce aria-label for icon size through docs/tests.
- `loadingPlacement?: "start" | "end" | "overlay"` only if needed.
- Stronger `disabled` state classes instead of only opacity.

### Done criteria

- State matrix passes visual audit in light and dark.
- `Button` remains stable only if preview, docs and tests cover all variants/sizes.

## P1 - DataTable API is powerful but too broad

### Good parts

- Generic typed `DataTable<TData, TValue>`.
- Supports sorting, selection, pagination, density, row actions, bulk actions.
- Has mobile render escape hatch: `renderMobileCard`.
- Integrates TanStack Table explicitly.

### Problems

- `DataTableProps` is large and difficult for first use.
- `features` config duplicates direct props in some places.
- Search uses `SearchInput`, which should move under canonical input model.
- Manual pagination default logic can be misunderstood.
- Import/export helpers are advanced but registry may make them look primary.

### Props to add or clarify

- `mode?: "client" | "server"` to clarify sorting/pagination/filter ownership.
- `getRowHref?: (row) => string` or docs show row link composition.
- `columnsPreset` or helper examples for common columns.
- `emptyVariant`, `errorVariant` only if feedback states need consistent UI.
- `stateLabels` for table-level labels.

### Props to reduce

- Avoid adding more top-level props until docs split “basic”, “server”, “selection”, “actions”, “mobile”.
- Keep `TableExportMenu` and `TableImportButton` advanced/subpath only.

### Done criteria

- Basic DataTable example needs only `data`, `columns`.
- Server DataTable example is explicit.
- DataTable registry add installs only required files.

## P1 - Select family needs canonical surface

### Current components

- `Select`
- `SimpleSelect`
- `AsyncSelect`
- `AsyncMultiSelect`
- `Combobox`
- `FormSelect`
- `FormAsyncSelect`

### Good parts

- `AsyncSelect` has abort signal support.
- `AsyncSelectOption` has `disabledReason`.
- It supports `cacheOptions`, `cacheTtl`, `debounceMs`, `minSearchLength`, render states.

### Problems

- `SimpleSelect`, `AsyncSelect`, `AsyncMultiSelect`, `Combobox` are all presented as separate public choices.
- `FormAsyncSelect` should be alias for `FormSelect kind="async"`.
- `AsyncSelect` file is still large and should be split internally for maintainability.

### Fix

- Canonical public docs:
  - `Select`
  - `FormSelect`
- Presets inside detail:
  - simple
  - async
  - multi
  - combobox
- Split `async-select.tsx` into:
  - types
  - cache hook
  - option utils
  - single select view
  - multi select view

### Done criteria

- Public docs do not force user to choose among five separate select names.
- Async behavior remains tested after split.

## P1 - Card/display naming conflict

### Problem

`src/components/display/index.ts` exports:

```ts
SmartCard as InfoCard
SmartCardProps as InfoCardProps
```

But source still has `smart-card.tsx` and migration metadata marks `SmartCard` transitional.

Risk:

- Docs may talk about `InfoCard`, but stack traces/source names say `SmartCard`.
- Users may import `SmartCard` from older docs or root if exposed elsewhere.

### Fix

- Rename implementation file to `info-card.tsx` eventually.
- Keep `SmartCard` compatibility export only in a legacy subpath or transitional alias.
- Public docs and root exports should say `InfoCard`.

### Done criteria

- `InfoCard` is real implementation name.
- `SmartCard` is only migration alias with deprecation note.

## P1 - Calendar/date APIs need value model documentation

### Good parts

- `DateRangePicker` already defaults `numberOfMonths = 2`.
- `DateRangePicker` has `showFooter`, `closeOnSelect`, `formatValue`.

### Problems

- Date values are string keys; timezone policy must be very clear.
- `formatValue` default uses `Intl.DateTimeFormat("en-US")`, which can create locale mismatch in SSR/docs if server/client differ.
- Calendar props are broad and need docs.

### Props to add or review

- `locale?: string` or documented formatter requirement.
- `timeZone?: string` if formatting expands.
- `monthCount` alias should not be added if `numberOfMonths` already exists; keep one prop.
- `mobileNumberOfMonths?: number` only if responsive calendar needs it.

### Done criteria

- Docs say values are `YYYY-MM-DD`, not Date objects.
- SSR examples do not rely on client-specific locale output.

## P1 - Style/token contract is not packaged clearly enough

### Problem

Components use Tailwind token classes like:

- `bg-background`
- `text-foreground`
- `border-border`
- `ring-ring`
- `text-muted-foreground`

But consumer setup must provide CSS variables/theme tokens. If docs/setup misses this, UI appears broken.

### Fix

- Package should include a stable CSS entry:
  - e.g. `azamat-ui-kit/styles.css` or documented generated theme file.
- `package.json` exports should expose CSS if package mode expects import.
- CLI init should install CSS variables into consumer app.
- Docs must explain Tailwind v4 `@source` or equivalent scan setup for package classes.

### Done criteria

- Fresh Next and Vite test apps render styled Button/Input without manual guessing.
- Style setup is one command or one documented import.

## P1 - Heavy dependencies and bundle strategy

### Current dependencies

Runtime dependencies include:

- `@base-ui/react`
- `@tanstack/react-table`
- `cmdk`
- `lucide-react`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

Problem:

- `npm i azamat-ui-kit` installs table/command/icons dependencies even if user only needs Button.
- This may be acceptable for package mode, but source mode should allow lighter installs.

### Fix

- Keep peer/runtime dependencies honest.
- Source mode registry must install only needed dependencies.
- Heavy modules should be imported only from their component files.
- Avoid root-level imports that pull heavy components into simple use.

### Done criteria

- `import { Button } from "azamat-ui-kit"` does not execute table/command code.
- CLI source add for `button` does not install TanStack/cmdk.

## P2 - Component maturity labels are not strict enough

### Problem

`cli/registry-status.ts` says many components are `stable`, but visual/docs/tests may not be stable:

- display components
- layout components
- overlay wrappers
- new primitives such as `RadioGroup`, `HoverCard`, `RightClickMenu`

Stability should require:

- props metadata
- render test
- a11y smoke
- docs example
- registry install metadata
- visual preview

### Fix

- Promote with checklist, not confidence.
- Add `test:maturity` that validates stable components have:
  - props metadata
  - docs snippet
  - registry entry
  - render smoke

### Done criteria

- No component is `stable` only because it exists.

## P2 - New components are useful but need API polish

Components added/visible in source:

- `MetricCard`
- `ProgressCircle`
- `StatusDot`
- `UserCard`
- `SectionHeader`
- `Stack`
- `NavTabs`
- `AlertDialog`
- `Drawer`
- `HoverCard`
- `Kbd`
- `RadioGroup`
- `RightClickMenu`
- `ScrollBox`
- `FileDropzone`

Audit notes:

- Keep them, but do not all become top-level docs heroes.
- Group under canonical surfaces:
  - `Card`: `MetricCard`, `UserCard`
  - `Navigation`: `NavTabs`
  - `Overlay`: `AlertDialog`, `Drawer`
  - `Input/Form`: `RadioGroup`
  - `Upload`: `FileDropzone`
  - `Display`: `StatusDot`, `ProgressCircle`, `Kbd`
- Each needs props metadata and visual state examples before stable status.

## P2 - Accessibility coverage is not enough

Needed checks by area:

- Button: icon-only aria-label, loading aria-busy.
- Dialog/Modal/Drawer: title, description, focus return, escape close, close button label.
- Popover/Dropdown/RightClickMenu: keyboard navigation, disabled item semantics.
- Select/AsyncSelect: aria active descendant or primitive semantics, loading/empty announcements.
- Form fields: label/htmlFor, aria-invalid, aria-describedby.
- DataTable: sortable header aria-sort, selection checkbox labels, pagination labels.
- Upload: file input label, drag-drop keyboard fallback.

Fix:

- Expand `scripts/a11y-smoke.mjs`.
- Add render tests for keyboard removal in multi select/tag inputs.

## P2 - Tests need stronger behavioral coverage

Current scripts are good but incomplete:

- `test:types`
- `test:render`
- `test:a11y`
- `test:registry`
- `test:family-governance`
- `test:root-exports`
- `test:build-output`

Add:

- `test:vendor-sync`
- `test:props-metadata`
- `test:registry-install-fixtures`
- `test:style-fixtures-next`
- `test:style-fixtures-vite`
- `test:bundle-entry`

Critical component tests:

- `Button`: variants, disabled, loading.
- `AppInput`: every kind routes correctly.
- `FormInput`: RHF value mapping for text/number/phone/date.
- `AsyncSelect`: stale response guard, abort, disabled reason, create option, multi tag keyboard remove.
- `DataTable`: client pagination, server pagination, row selection, mobile render.
- `DateRangePicker`: two months, footer apply/clear, closeOnSelect.
- `FileUpload`: accept, multiple, max size, object URL cleanup.

## P2 - Documentation shipped inside package needs alignment

Existing MD files are useful but fragmented:

- `README.md`
- `PUBLIC_API_INVENTORY.md`
- `COMPONENT_MATURITY.md`
- `COMPONENT_FAMILY_ARCHITECTURE.md`
- `COMPONENT_FAMILY_MIGRATION.md`
- `LIBRARY_DISTRIBUTION_ARCHITECTURE.md`
- `SOURCE_COPY.md`
- `UNIVERSAL_INPUT.md`

Problem:

- Many docs explain the plan, but code and registry have drift.
- New contributor/user does not know which doc is source-of-truth.

Fix:

- Create one source-of-truth:
  - `README.md`: user quick start
  - `COMPONENT_MATURITY.md`: stability policy
  - `COMPONENT_FAMILY_ARCHITECTURE.md`: architecture
  - `SOURCE_COPY.md`: CLI source install
- Move old planning notes into `docs/internal/` or mark as historical.

## Priority component-by-component actions

### Keep and polish as primary

- `Button`: improve contrast/state docs/tests.
- `Input`/`AppInput`: make canonical; add missing kinds or document limitations.
- `FormInput`/`FormAppInput`: choose one public name; unify kind behavior.
- `Select`/`FormSelect`: make canonical; move async/multi as variants.
- `Card`/`InfoCard`: rename implementation away from `SmartCard`.
- `DataTable`: keep primary, split docs by use case.
- `DatePicker`/`DateRangePicker`: document date string model.
- `Dialog`/`Popover`/`DropdownMenu`: keep stable with a11y docs.
- `FileUpload`/`FileDropzone`: source mode useful; add validation docs.

### Keep as variant/preset, not top-level docs

- `SearchInput`
- `PasswordInput`
- `NumberInput`
- `MoneyInput`
- `QuantityInput`
- `MaskedInput`
- `PhoneInput`
- `DateInput`
- `DateRangeInput`
- `SimpleSelect`
- `AsyncSelect`
- `AsyncMultiSelect`
- `Combobox`
- `StatCard`
- `StatisticCard`
- `MetricCard`
- `UserCard`
- `FileCard`

### Keep as compatibility aliases only

- `FormSearchInput`
- `FormPasswordInput`
- `FormNumberInput`
- `FormPhoneInput`
- `FormDateInput`
- `FormAsyncSelect`
- `SmartCard`

### Keep advanced/subpath only

- `FormBuilder`
- `FormBuilderPresets`
- `ResourcePage`
- `ResourceDetailPage`
- `TableExportMenu`
- `TableImportButton`
- `Wizard`
- `CommandPalette`
- charts, unless docs and bundle strategy are finished.

## Recommended implementation order

1. Freeze public API policy: root vs subpath vs alias.
2. Fix registry metadata model with canonical/alias/dependency/files fields.
3. Add vendor sync check for CLI source-copy.
4. Choose canonical input/form naming and update docs metadata.
5. Add `kind="money"`, `kind="quantity"`, `kind="masked"` to `AppInput` or document why they remain advanced.
6. Move old form wrappers to compatibility docs only.
7. Rename/clean `InfoCard` implementation and keep `SmartCard` as alias.
8. Add props metadata for top 10 components.
9. Add tests for `Button`, `AppInput`, `FormInput`, `AsyncSelect`, `DataTable`, `DateRangePicker`.
10. Add package CSS/style setup export or CLI init guarantee.
11. Re-run release gate and publish only after source/package/docs match.

## Release gate before next npm publish

Required commands:

```bash
npm run lint
npm run test:types
npm run test:render
npm run test:a11y
npm run test:registry
npm run test:family-governance
npm run test:root-exports
npm run test:build-output
npm run build
npm pack --dry-run
```

New recommended gates:

```bash
npm run test:vendor-sync
npm run test:props-metadata
npm run test:registry-install-fixtures
```

## Final definition of done

`azamat-ui-kit` yaxshi library holatiga kelgan deb hisoblash uchun:

- Root exports intentional and small.
- Registry source install can add one component without unrelated heavy files.
- Input/Form/Select/Card/DataTable families have clear primary API.
- Aliases stay working but are not promoted as new-user API.
- Every stable component has props metadata, docs example, registry entry and test coverage.
- Package styles work in fresh Next and Vite apps with documented setup.
- CLI vendor source is synced with package source.
- Public site can generate docs from package metadata instead of manual duplicated lists.
