# Component Family Migration

Bu fayl eski parallel component entry'larni yangi family-first public modelga qanday o'tkazishni belgilaydi.

## 1. Status meanings

- `canonical`: asosiy tavsiya qilinadigan public nom
- `family-member`: family ichida ko'rsatiladi, lekin alohida mental model emas
- `transitional`: hozir ishlaydi, lekin docs'da family orqali tushuntiriladi
- `advanced`: alohida subpath yoki expert usage

## 2. Input migration

Canonical family:

- `InputFamily`

Migration:

- `Input` -> `canonical`
- `ClearableInput` -> `family-member`
- `SearchInput` -> `family-member`
- `PasswordInput` -> `family-member`
- `NumberInput` -> `family-member`
- `DateInput` -> `family-member`
- `DateRangeInput` -> `family-member`
- `MoneyInput` -> `family-member`
- `QuantityInput` -> `family-member`
- `MaskedInput` -> `family-member`
- `PhoneInput` -> `family-member`
- `OtpInput` -> `family-member`
- `ColorInput` -> `family-member`
- `TagInput` -> `advanced`
- `QuantityStepper` -> `advanced`

## 3. Select migration

Canonical family:

- `SelectFamily`

Migration:

- `Select` -> `canonical`
- `SimpleSelect` -> `family-member`
- `AsyncSelect` -> `family-member`
- `AsyncMultiSelect` -> `family-member`
- `Combobox` -> `family-member`
- `FormSelect` -> `family-member`
- `FormAsyncSelect` -> `family-member`

## 4. Card migration

Canonical family:

- `CardFamily`

Migration:

- `Card` -> `canonical`
- `InfoCard` -> `canonical composed member`
- `SmartCard` -> `transitional`
- `StatCard` -> `family-member`
- `StatisticCard` -> `family-member`
- `EntityCard` -> `family-member`
- `FileCard` -> `family-member`

## 5. Form migration

Canonical family:

- `FormFamily`

Migration:

- `FormFieldShell` -> `canonical member`
- `FormInput` -> `family-member`
- `FormTextarea` -> `family-member`
- `FormSelect` -> `family-member`
- `FormAsyncSelect` -> `family-member`
- `FormSwitch` -> `family-member`
- `FormSearchInput` -> `family-member`
- `FormPasswordInput` -> `family-member`
- `FormNumberInput` -> `family-member`
- `FormPhoneInput` -> `family-member`
- `FormDateInput` -> `family-member`
- `FormDateRangeInput` -> `family-member`
- `FormDatePicker` -> `family-member`
- `FormDateRangePicker` -> `family-member`
- `SmartFormShell` -> `transitional`
- `FormBuilder` -> `advanced`

## 6. DataTable migration

Canonical family:

- `DataTableFamily`

Migration:

- `DataTable` -> `canonical`
- `DataTableToolbar` -> `family-member`
- `DataTablePagination` -> `family-member`
- `DataTableColumnVisibilityMenu` -> `family-member`
- `DataTableSortableHeader` -> `family-member`
- `DataTableRowActions` -> `family-member`
- `DataTableBulkActions` -> `family-member`
- `DataTableViewPresets` -> `family-member`
- `createDataTableSelectColumn` -> `family-member helper`
- `createDataTableActionsColumn` -> `family-member helper`
- `TableExportMenu` -> `advanced`
- `TableImportButton` -> `advanced`

## 7. Docs rule

Public site endi:

- oldin family'ni ko'rsatadi
- keyin detail ichida members/presets/integrationsni ko'rsatadi
- transitional nomlarni primary card sifatida ko'rsatmaydi
