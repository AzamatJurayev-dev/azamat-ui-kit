# Azamat UI Kit Surface Audit And Fix Order

Bu fayl `azamat-ui-kit` ichidagi yangi kengaygan surface'larni qayta tartiblash uchun yozildi. Maqsad: library ichida primitive, composed surface, pattern, helper va internal qatlamlarni aniq ajratish.

## 1. Current Reality

`azamat-ui-kit` endi faqat kichik primitive kit emas.

Hozir ichida quyidagi qatlamlar parallel yashayapti:

- base UI primitives
- reusable composed components
- data table system
- advanced inputs and RHF wrappers
- overlay shells
- command palette
- charts
- upload
- calendar/date
- app shell/layout
- higher-level patterns
- experimental `smart-*` and `system-*` surfaces

Bu o'sish yaxshi, lekin public API governance hali shu o'sishga to'liq moslashmagan.

## 2. Main Problems Found

### A. Export contract drift

Misollar:

- test eski exportni kutadi, source esa boshqa namingga o'tgan
- helper type importlari source ichida yo'q
- root export va real component naming bir xil emas

Natija:

- `test:types` yiqiladi
- consumer qaysi nom stable ekanini tushunmaydi

### B. Wrapper contract drift

Misollar:

- wrapper `ReactNode` uzatadi, child component torroq `string` kutadi
- default prop value child component type contractiga mos emas

Natija:

- internal composition ishonchsiz bo'ladi
- public wrapperlar tez sinadi

### C. Surface explosion without ownership

Yangi surface'lar ko'paygan:

- `smart-card`
- `smart-form-shell`
- `data-view`
- `workspace-shell`
- `table-export-menu`
- `table-import-button`
- `resource-system`
- `status-system`
- `horizontal-bar-chart`
- `kpi`
- `progress-ring`

Lekin bularning:

- qaysi biri public
- qaysi biri preview
- qaysi biri internal
- qaysi naming bilan chiqishi

aniq yozilmagan yoki hamma joyda bir xil emas.

### D. Docs and tests lagging behind growth

`README`, smoke imports, maturity matrix va actual source bir xil tempda yurmayapti.

Natija:

- yangi capability bor
- lekin release confidence yo'q

## 3. Recommended Surface Model

`azamat-ui-kit` uchun quyidagi model tavsiya qilinadi.

### Layer 1. Base primitives

Bular package'ning eng ishonchli qatlami:

- `Button`
- `Input`
- `Textarea`
- `Checkbox`
- `Switch`
- `Badge`
- `Card`
- `Tabs`
- `Dialog`
- `Popover`
- `DropdownMenu`
- `Select`
- `Table`
- `Tooltip`
- `Spinner`
- `Skeleton`

Rule:

- public
- stable
- naming o'zgarmaydi

### Layer 2. Reusable composed surfaces

Bular primitive ustiga qurilgan, lekin hali ham generic:

- `SearchInput`
- `PasswordInput`
- `NumberInput`
- `PhoneInput`
- `MaskedInput`
- `MoneyInput`
- `QuantityInput`
- `AsyncSelect`
- `AsyncMultiSelect`
- `AppShell`
- `SidebarNav`
- `PageHeader`
- `Breadcrumbs`
- `MetricGrid`
- `InfoCard`
- `ActivityFeed`
- `EmptyState`
- `LoadingState`
- `Result`
- `ToastProvider`
- `CommandPalette`
- `DataTable`

Rule:

- public
- stable yoki preview
- docs/example/test bo'lishi kerak

### Layer 3. Integration wrappers

Bular app-level adoptionni tezlashtiradi:

- `FormInput`
- `FormSelect`
- `FormAsyncSelect`
- `FormTextarea`
- `FormSwitch`
- `FormDateInput`
- `FormDateRangeInput`
- `FormDatePicker`
- `FormDateRangePicker`

Rule:

- public
- preview yoki stable
- RHF contract juda aniq bo'lishi kerak

### Layer 4. Higher-level patterns

Bular katta surface:

- `FormBuilder`
- `ResourcePage`
- `ResourceDetailPage`
- `Wizard`

Rule:

- preview yoki experimental
- docs va examples bo'lmasa stable qilinmaydi

### Layer 5. Internal or search-only surfaces

Bular darrov root export bo'lib baqirib turmasligi mumkin:

- `smart-card`
- `smart-form-shell`
- `data-view`
- `workspace-shell`
- `resource-system`
- `status-system`
- `table-export-menu`
- `table-import-button`
- `horizontal-bar-chart`
- `kpi`
- `progress-ring`
- `input-group`
- low-level command primitives

Rule:

- internal yoki experimental
- public naming va ownership aniqlanmaguncha root exportga chiqmasligi kerak

## 4. Fix Order

### P0. Restore package correctness

Avval shular:

1. Broken type imports fix
   - `ButtonProps` mismatch
2. Wrapper prop contract fix
   - `ReactNode` vs `string`
   - invalid default values
3. Smoke import contract fix
   - `InfoCard` va boshqa naming mismatchlar
4. `npm run test:types` yashil holatga qaytishi

Bu bosqichdan oldin boshqa katta refactor boshlamaslik kerak.

### P1. Public API truth reset

1. `src/index.ts` ni real public API contract sifatida qayta audit qilish
2. `COMPONENT_MATURITY.md` ni source bilan sync qilish
3. `README` component listini current truth bilan sync qilish
4. root exportda qoladigan va chiqmaydigan surface'larni belgilash

### P2. Naming cleanup

Quyidagi savollarga javob berish kerak:

- `InfoCard`mi yoki `SmartCard`mi?
- `EntityCard`, `DataCard`, `UserCard`lar qaysi layerga kiradi?
- `SmartFormShell` public bo'ladimi yoki internal qoladimi?
- `DataView` public bo'ladimi yoki pattern helper bo'lib qoladimi?

Rule:

- bitta concept uchun bitta canonical public nom

### P3. Pattern boundary cleanup

1. `patterns` ichidagi surface'larni preview/experimental bo'yicha ajratish
2. `resource-system`, `status-system`, `data-view` kabi filelar root API'ga tegadimi yo'qmi aniqlash
3. `workspace-shell` kabi layout extensionlar `AppShell` bilan relationini yozish

### P4. Tests and release confidence

1. smoke import testni source truth bilan sync qilish
2. render tests priority bo'yicha
3. package tarball smoke
4. docs app consumer smoke

## 5. Immediate Fix Checklist

- [x] `ButtonProps` source mismatch fix
- [x] `InfoCard` naming/export mismatch qarori
- [x] `SmartCard` default prop/type mismatch fix
- [x] `SmartFormShell` -> `FormSection` prop contract fix
- [x] `DataView` -> `InlineState` title/description prop contract fix
- [x] `npm run test:types` yashil qilish

## 6. Decision Rules

Keyingi qarorlar uchun:

- Agar component generic va docs/test bilan ishonchli bo'lsa: `public`
- Agar generic, lekin API hali siljishi mumkin bo'lsa: `preview`
- Agar hali naming/ownership noaniq bo'lsa: `experimental`
- Agar faqat boshqa component ichida kerak bo'lsa: `internal`

## 7. Suggested Next Action

Eng to'g'ri keyingi amaliy qadam:

1. `test:types`ni yiqitayotgan joylarni tuzatish
2. `InfoCard`/`SmartCard` naming bo'yicha canonical qaror chiqarish
3. keyin root export audit qilish

Shundan keyingina katta cleanup yoki release haqida o'ylash kerak.
