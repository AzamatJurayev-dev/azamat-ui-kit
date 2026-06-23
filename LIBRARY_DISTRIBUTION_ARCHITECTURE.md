# Library Distribution Architecture

Bu fayl `azamat-ui-kit` uchun final product modelni belgilaydi: package faqat foundation bo'ladi, katta surface'lar esa source-copy registry orqali consumer app `src` ichiga tushadi.

## 1. Product direction

Primary adoption model:

```bash
npm install -D azamat-ui-kit
npx azamat-ui-kit-cli init --template next
npx azamat-ui-kit-cli add button form-input data-table resource-page
```

Consumer app ichida yoziladigan fayllar:

```txt
src/components/ui/button.tsx
src/components/form/form-input.tsx
src/components/data-table/data-table.tsx
src/components/patterns/resource-page.tsx
src/lib/utils.ts
```

Primary rule:

- `npm install` hamma UI'ni runtime package sifatida ishlatish uchun emas
- `init` va `add` asosiy yo'l bo'ladi
- consumer copied source'ni o'zi edit qiladi
- package runtime import faqat optional/prototype/dev-support yo'li bo'ladi

## 2. Why this model

`npm i azamat-ui-kit` orqali hamma narsani compiled package qilib berish bir nechta muammo tug'diradi:

- katta bundle pressure
- user component ichini qulay edit qila olmaydi
- docs/catalog bilan runtime API bir-biriga qattiq bog'lanib qoladi
- katta pattern va templates primitive bilan aralashib ketadi
- shadcn kabi "own your source" tajribasi bo'lmaydi

Source-copy model foydasi:

- faqat kerakli fayl projectga tushadi
- consumer o'zi local refactor qila oladi
- katta componentlar public package contractiga bog'lanib qolmaydi
- breaking change xavfi kamayadi
- docs registry bilan bir source of truth ishlaydi

## 3. Distribution layers

### Layer A. Foundation package

Package root/subpath ichida qoladigan narsalar:

- design tokens va CLI
- `cn`, small helpers, low-level hooks
- base UI primitives
- minimal a11y-safe wrappers
- metadata/query helpers for docs tooling

Examples:

- `Button`
- `Input`
- `Textarea`
- `Checkbox`
- `Switch`
- `Dialog`
- `Popover`
- `DropdownMenu`
- `Badge`
- `Card`
- `Tabs`
- `Table`
- `Spinner`
- `Tooltip`
- `useDisclosure`
- `useDebounce`

Rule:

- bu qatlam kichik, stable, dependency-conscious bo'lishi kerak
- root exportlar asosan shu yerda to'xtashi kerak

### Layer B. Source-copy reusable components

Registry orqali project `src` ichiga tushadigan reusable, lekin edit talab qilishi mumkin bo'lgan componentlar:

- inputs
- form wrappers
- feedback surfaces
- layout shells
- filters
- display blocks
- upload/calendar/wizard
- data-table helpers

Examples:

- `SearchInput`
- `AsyncSelect`
- `FormInput`
- `FormSelect`
- `PageHeader`
- `FilterBar`
- `MetricGrid`
- `DatePicker`
- `FileUpload`
- `Wizard`

Rule:

- package ichida source of truth bo'ladi
- consumerga esa copy qilinadi
- runtime import support optional qoladi, lekin recommended emas

### Layer C. Source-copy systems, blocks, templates

Har doim source-copy bo'lishi kerak:

- `DataTable`
- `ResourcePage`
- `ResourceDetailPage`
- `FormBuilder`
- `AppShell`
- `CrudSystem`
- `ResourceSystem`
- dashboard kits
- blocklar
- template page'lar

Rule:

- bunlar package root public API markazida turmasligi kerak
- bunlar consumer app architecture'ga moslab edit qilinishi kerak

## 4. Family consolidation rule

Bir vazifa uchun ko'payib ketgan parallel componentlar package ichida bittaga yig'iladi.

Examples:

- `FormInput` + `kind="text" | "search" | "password" | "number" | "phone" | "date"`
- `FormSelect` + `kind="simple" | "async"`

Next targets:

- `Input` family uchun preset/helper model
- `Select` family uchun async/multi/combobox layering
- `Card` family uchun canonical composed contract
- `DataTable` family uchun helperlarni root surface'dan chiqarish

Rule:

- alohida nom ko'paytirish emas
- bitta canonical component + props + helpers + snippets

## 5. Import policy

### Recommended

Consumer copied source import qiladi:

```tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
import { DataTable } from "@/components/data-table/data-table"
```

### Allowed but secondary

Runtime package import:

```tsx
import { Button } from "azamat-ui-kit"
import { Dialog } from "azamat-ui-kit"
import { useDisclosure } from "azamat-ui-kit"
```

### Avoid as primary docs path

```tsx
import { DataTable, ResourcePage, FormBuilder } from "azamat-ui-kit"
```

Rule:

- primitive/foundation runtime import = okay
- large reusable and system surfaces = source-copy first

## 6. CLI target state

`init`:

- writes config
- writes theme tokens
- prepares folders
- optionally installs peer/runtime deps

`add`:

- copies exact source files
- copies dependencies recursively
- writes only missing files unless `--overwrite`
- installs only required npm deps

Future commands:

- `diff` to compare local copied file vs package source
- `doctor` to detect missing registry deps or stale files
- `upgrade <name>` to re-apply safe upstream changes

## 7. Public API target state

### Keep at root

- stable primitives
- tiny hooks
- tiny helpers
- docs metadata helpers

### Move to subpath/source-copy only

- large patterns
- business-ready screens
- advanced systems
- template scaffolds
- migration aliases

### Deprecate over time

- wrapper aliases replaced by `kind` APIs
- duplicate composed exports that only exist because of naming drift

## 8. Migration phases

### Phase 1. Docs and README correction

- make source-copy the recommended path
- keep package import examples only for foundation

### Phase 2. Registry classification

- mark each registry item as `foundation`, `source-copy`, or `system`
- split recommended list by adoption mode

### Phase 3. Root export reduction

- remove large system exports from root
- keep them available through registry/subpath only

### Phase 4. Family cleanup

- continue alias removal
- converge on canonical props-driven surfaces

### Phase 5. Upgrade tooling

- add `doctor`, `diff`, `upgrade`
- add fixture coverage for copied-source workflows

## 9. Immediate repo decisions

Current recommendation:

- keep publishing `azamat-ui-kit`
- treat it first as CLI + registry + foundation package
- stop treating the root package as the final home for every large component
- use docs to teach copied-source imports, not package-root imports, for complex surfaces

## 10. Success criteria

This architecture is successful when:

- user can build a product by copying only needed components
- most edited files live in the consumer app, not inside `node_modules`
- root package feels small and stable
- large surfaces are props-driven and locally editable
- docs clearly separate foundation vs copied-source vs systems
