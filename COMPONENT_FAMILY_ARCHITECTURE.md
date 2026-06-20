# Component Family Architecture

Bu fayl `azamat-ui-kit` uchun keyingi professional public API modelini belgilaydi. Asosiy maqsad: bir xil vazifa uchun ko'payib ketgan alohida entry'larni tartibga keltirish, canonical family nomlarini belgilash va public docs/site'ni shu tizimga mos qilish.

## 1. Core Principle

- bitta vazifa = bitta canonical family
- alohida componentlar family ichidagi variant, preset yoki integration layer bo'ladi
- docs/catalog foydalanuvchiga family-first ko'rinadi
- package transition davrida eski alohida exportlarni ham saqlab turadi

## 2. Canonical Families

### Input family

Canonical name:

- `Input`

Family scope:

- primitive text input
- clearable input
- search input
- password input
- number input
- date input
- date range input
- money input
- quantity input
- masked input
- phone input
- otp input
- color input
- tag input
- slider/range slider
- quantity stepper

Rule:

- yangi docs/catalog'da alohida 12 ta input ko'rsatish o'rniga `Input` family ko'rsatiladi
- detail ichida variant/presetlar ko'rsatiladi

### Select family

Canonical name:

- `Select`

Family scope:

- base primitive select
- simple select
- async select
- async multi select
- combobox
- form select
- form async select

Rule:

- `SimpleSelect`, `AsyncSelect`, `Combobox` parallel bosh komponent sifatida emas
- `Select` family capability'lari sifatida tushuntiriladi

### Card family

Canonical name:

- `Card`

Family scope:

- base primitive card
- `InfoCard`
- `StatCard`
- `StatisticCard`
- `EntityCard`
- `FileCard`

Rule:

- `InfoCard` canonical composed card surface
- `SmartCard` implementation nomi bo'lib qoladi, docs-facing public nom emas

### Form family

Canonical name:

- `Form`

Family scope:

- field shell
- wrappers
- builder
- section/actions

Rule:

- wrapper componentlar alohida "boshqa olam" bo'lib ko'rinmasligi kerak
- ular input/select/date family bilan bog'liq integration layer sifatida ko'rsatiladi

### DataTable family

Canonical name:

- `DataTable`

Family scope:

- table shell
- toolbar
- pagination
- visibility menu
- row actions
- bulk actions
- presets
- import/export extensions

Rule:

- `DataTable` atrofidagi helperlar alohida primary componentlar kabi ko'rinmasligi kerak
- ular bitta family ichidagi adoption tooling sifatida ko'rsatiladi

### Data table family

Canonical name:

- `DataTable`

Family scope:

- table shell
- toolbar
- pagination
- visibility
- selection
- row actions
- bulk actions
- presets

Rule:

- helper filelar borku deb hammasi alohida primary component bo'lib chiqmasligi kerak

## 3. Public Site Rule

Public site quyidagi mental model bilan quriladi:

- `Input`
- `Select`
- `Card`
- `Table`
- `Form`
- `Feedback`
- `Overlay`
- `Navigation`
- `Upload`
- `Charts`
- `Patterns`

Component list sahifasida:

- alohida mayda variantlar emas
- canonical family kartalari ko'rsatiladi

Detail sahifada:

- variants
- presets
- integrations
- examples
- accessibility
- API

## 4. Coding Strategy

### Phase 1. Non-breaking family entry layer

Bu phase hozir boshlanadi:

- `InputFamily`
- `SelectFamily`
- `CardFamily`
- `FormFamily`
- `DataTableFamily`

qo'shiladi.

Bu additive layer bo'ladi:

- eski importlar ishlashda davom etadi
- yangi docs/public site family entrylardan foydalana oladi

### Phase 2. Canonical naming

- `InfoCard` docs-facing canonical bo'ladi
- `SmartCard` transitional/internal bo'ladi
- `patterns` va `charts` uchun minimal public barrel ishlatiladi

### Phase 3. Prop consolidation

Keyin haqiqiy API consolidation boshlanadi:

- bir xil behavior'larga ega componentlar umumiy prop contracts bilan boyitiladi
- preset wrapperlar prop orqali soddalashtiriladi

### Phase 4. Deprecation

- eski parallel entrylar `deprecated` sifatida belgilanadi
- public docs faqat canonical family'ni ko'rsatadi

## 5. Immediate Migration Map

### Input family

- `Input` -> root primitive
- `ClearableInput` -> `Input` family capability
- `SearchInput` -> `Input` search preset
- `PasswordInput` -> `Input` password preset
- `PhoneInput` -> `Input` phone preset
- `MoneyInput` -> `Input` money preset
- `QuantityInput` -> `Input` quantity preset

### Select family

- `Select` -> primitive
- `SimpleSelect` -> default reusable preset
- `AsyncSelect` -> async preset
- `AsyncMultiSelect` -> async multi preset
- `Combobox` -> search-first preset

### Card family

- `Card` -> primitive
- `InfoCard` -> canonical composed card
- `StatCard` -> metric preset
- `StatisticCard` -> statistic preset
- `EntityCard` -> entity preset
- `FileCard` -> file preset

### Form family

- `FormFieldShell` -> field shell
- `FormInput` -> input integration preset
- `FormSelect` -> select integration preset
- `FormAsyncSelect` -> async-select integration preset
- `FormBuilder` -> schema-like builder layer
- `SmartFormShell` -> transitional shell preset

### DataTable family

- `DataTable` -> table shell
- `DataTableToolbar` -> toolbar preset
- `DataTablePagination` -> pagination preset
- `DataTableBulkActions` -> selection action preset
- `DataTableViewPresets` -> saved views preset
- `TableExportMenu` -> advanced extension
- `TableImportButton` -> advanced extension

## 6. Success Criteria

- root API tushunarli bo'ladi
- docs family-first bo'ladi
- public site adashtirmaydi
- bir xil vazifa uchun bir nechta component nomi kamayadi
- migration sindirmasdan bo'ladi
