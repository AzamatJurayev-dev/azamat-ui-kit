# Azamat UI Kit Library Readiness Tasks

Bu repo npm package, reusable components, CLI registry, theme tokens va library tests uchun. Landing page, docs UI, template marketing va site navigation ishlari `azamat-ui` reposida qilinadi.

## Parallel Work Rules

- [ ] Har bir chat faqat bitta bo'limni oladi va shu bo'limdagi fayllarga tegadi.
- [ ] Component implementation tasklari registry/CLI tasklari bilan aralashtirilmaydi.
- [ ] Build/package tasklari `package.json`, `vite.config.ts`, `tsup.config.ts`, `dist` va release fayllariga owner bo'ladi.
- [ ] Docs/examples tasklari source component behaviorini o'zgartirmaydi.
- [ ] Har bir chat ish oxirida changed files va risklarni yozadi; commit/pushni supervisor qiladi.
- [ ] Supervisor `npm run test:run`, `npm run build`, `npm pack --dry-run` gate bilan yakunlaydi.

## A. Package Build And Runtime Owner

Scope: `package.json`, `vite.config.ts`, `tsup.config.ts`, `tsconfig*.json`, generated `dist`.

- [ ] Published ESM builddagi `require("react")` runtime xatosini root cause bilan tuzatish.
- [ ] `react`, `react-dom`, `react/jsx-runtime`, `react-hook-form` external bo'lib qolishini ESM va CJS buildda kafolatlash.
- [ ] Vite/Rolldown output o'rniga library uchun stable Rollup/tsup strategy tanlash yoki Vite configni runtime-safe qilish.
- [ ] `dist/index.js` browser/Next ESM importda `require` chaqirmasligini smoke test bilan tekshirish.
- [ ] `exports` mapni Next, Vite, Node CJS va TypeScript uchun aniq qilish.
- [ ] `types` generation package exportlari bilan 1:1 mos kelishini tekshirish.
- [ ] `prepack` buildni toza distdan boshlaydigan qilish.
- [ ] NPM publishdan oldin `npm pack --dry-run` chiqishini release gatega qo'shish.

## B. Theme And Token System Owner

Scope: `src/components/theme-provider.tsx`, CLI theme utils, theme CSS output.

- [ ] Library theme provider export qilinadimi yoki consumer app provider ishlatadimi, aniq qaror qilish.
- [ ] Agar provider qolsa, root classlarda `light`, `dark`, `system` strategiyasini docs app bilan moslashtirish.
- [ ] CLI `theme` command chiqaradigan CSS tokenlar `.light` va `.dark` classlarni to'liq bersin.
- [ ] Tokenlarda `background`, `foreground`, `card`, `popover`, `border`, `ring`, `muted`, `accent`, `destructive` holatlari component usagega yetarli bo'lsin.
- [ ] Hardcoded color classlarni componentlardan kamaytirish va token-based classlarga o'tkazish.
- [ ] Dark mode uchun all primitives va complex components visual audit qilish.
- [ ] Theme docs uchun minimal consumer setup example tayyorlash.

## C. Registry And CLI Owner

Scope: `cli/**`, `registry.json`, `cli/registry.ts`, `templates/**`, `scripts/validate-registry.mjs`.

- [ ] `registry.json` versioni package version bilan mos bo'lsin.
- [ ] `cli/registry.ts` va `registry.json` group/recommended ro'yxati 1:1 sync bo'lishi.
- [ ] `azamat-ui-kit add <component>` real consumer appga kerakli dependency va filesni to'liq ko'chirsin.
- [ ] Registry dependencies transitive order bilan yozilishini test qilish.
- [ ] `--dry-run`, `--overwrite`, `--skip-install` behaviorlari hujjatlashtirilsin va smoke qilinsin.
- [ ] `init` command Next/Vite app uchun alohida path defaults bera olsin.
- [ ] `theme` command mavjud CSSni buzmasdan token blockni upsert qilsin.
- [ ] CLI error matnlari Uzbek/English strategiyasiga moslashtirilsin.

## D. Component API Audit Owner

Scope: `src/components/ui/**`, one primitive family per chat.

- [ ] Public component maturity rubric yozish: API, accessibility, keyboard, dark mode, responsive, tests, docs, examples.
- [ ] Har bir public exportga status berish: `stable`, `preview`, `experimental`, `internal`.
- [ ] `src/index.ts`dagi exportlarni audit qilish: tayyor bo'lmagan exports public bo'lib ketmaganmi.
- [ ] Har bir component uchun `displayName` kerakmi tekshirish.
- [ ] Har bir component uchun `data-slot` naming convention tekshirish.
- [ ] Har bir component uchun `className` merge tartibi tekshirish.
- [ ] Har bir component uchun `ref` forwarding tekshirish.
- [ ] Har bir component uchun controlled/uncontrolled props conflict tekshirish.
- [ ] Har bir component uchun disabled/readOnly/loading state semantics tekshirish.
- [ ] Har bir component uchun focus-visible styling tekshirish.
- [ ] Har bir component uchun keyboard support tekshirish.
- [ ] Har bir component uchun aria label/title/description requirements tekshirish.
- [ ] Har bir component uchun dark mode token usage tekshirish.
- [ ] Har bir component uchun responsive behavior tekshirish.
- [ ] Har bir component uchun SSR safety tekshirish: `window`, `document`, localStorage guards.
- [ ] Har bir component uchun tree-shaking risk tekshirish.
- [ ] `Button`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Badge`, `Card`, `Tabs` APIlarini stable deb belgilashdan oldin props audit qilish.
- [ ] Base UI wrappers (`Dialog`, `Popover`, `Select`, `DropdownMenu`) controlled/uncontrolled behaviorini tekshirish.
- [ ] `ref`, `className`, `disabled`, `aria-*`, `data-slot` support har bir primitive uchun consistent bo'lsin.
- [ ] `buttonVariants`, `badgeVariants` kabi variant helpers public API sifatida document qilinsin yoki internal qilinsin.
- [ ] Primitive components dark mode va focus-visible state bilan ishlasin.
- [ ] Breaking API bo'lsa `CHANGELOG.md` va release notesda belgilanadi.

## D1. Primitive Component Perfection Owner

Scope: `src/components/ui/button.tsx`, `input.tsx`, `textarea.tsx`, `checkbox.tsx`, `switch.tsx`, `badge.tsx`, `card.tsx`, `tabs.tsx`.

- [ ] Button: variantsni kamaytirish yoki aniq semantic qilish: default, secondary, outline, ghost, destructive, link.
- [ ] Button: sizesni consistent qilish: icon, icon-sm, sm, md/default, lg.
- [ ] Button: loading state API qo'shish yoki docsda pattern berish.
- [ ] Button: icon-left/icon-right pattern uchun ergonomic API kerakmi hal qilish.
- [ ] Button: `asChild` yoki render prop support real ishlashini tekshirish.
- [ ] Button: disabled + loading click prevention.
- [ ] Button: focus-visible ring token-based bo'lsin.
- [ ] Input: error/invalid state uchun `aria-invalid` styling.
- [ ] Input: disabled/readOnly styles ajratilsin.
- [ ] Input: prefix/suffix uchun `InputGroup` public API tayyor bo'lsin yoki internal qilinsin.
- [ ] Textarea: resize behavior, min-height, invalid, disabled styles.
- [ ] Checkbox: indeterminate state API.
- [ ] Checkbox: label composition example uchun props yetarlimi.
- [ ] Switch: label/description bilan settings row pattern.
- [ ] Badge: tone/variant taxonomy qayta ko'rib chiqish.
- [ ] Badge: status colors token-based bo'lsin.
- [ ] Card: header/title/description/content/footer spacing scale.
- [ ] Card: nested card anti-pattern docsga chiqarish.
- [ ] Tabs: keyboard navigation Base UI yoki native pattern bilan to'g'ri ishlasin.
- [ ] Tabs: responsive overflow variant kerakmi aniqlash.

## D2. Base UI Wrapper Perfection Owner

Scope: `dialog.tsx`, `popover.tsx`, `dropdown-menu.tsx`, `select.tsx`, `command.tsx`.

- [ ] Dialog: title/description accessibility majburiyati aniq bo'lsin.
- [ ] Dialog: controlled open/onOpenChange behavior.
- [ ] Dialog: scrollable content and max-height.
- [ ] Dialog: footer/actions composition.
- [ ] Dialog: close button aria label.
- [ ] Popover: placement/side/align props support.
- [ ] Popover: keyboard close, focus return.
- [ ] DropdownMenu: disabled items, destructive item, shortcut slot.
- [ ] DropdownMenu: checkbox/radio item checked state.
- [ ] DropdownMenu: submenu support real ishlashini tekshirish.
- [ ] Select: controlled value, defaultValue, placeholder.
- [ ] Select: disabled option, group, label, separator.
- [ ] Select: long item overflow and mobile behavior.
- [ ] Command: command input, empty, group, item, shortcut composition public kerakmi aniqlash.

## E. Complex Components Owner

Scope: `src/components/actions`, `layout`, `filters`, `display`, `navigation`, `overlay`, `feedback`.

- [ ] Har bir complex component uchun “generic UI” va “business logic” chegarasini tekshirish.
- [ ] Project-specific copy, fake data, hardcoded route, hardcoded business naming qolmaganini tekshirish.
- [ ] Actions family uchun async action/loading/error pattern.
- [ ] Actions family uchun destructive confirmation pattern.
- [ ] Layout family uchun responsive breakpoint tokens.
- [ ] Layout family uchun custom link renderer support.
- [ ] Layout family uchun fixed/sticky header behavior.
- [ ] Filters family uchun clear all, active count, disabled filters.
- [ ] Filters family uchun mobile collapsed filter panel.
- [ ] Feedback family uchun empty/loading/error/success taxonomy.
- [ ] Display family uchun metrics, timeline, activity feed empty/loading states.
- [ ] Overlay wrappers uchun async submit/confirm API.
- [ ] Navigation components uchun route-agnostic API.
- [ ] Navigation components uchun keyboard and aria current.
- [ ] `AppShell`, `AppHeader`, `AppSidebar`, `PageHeader`, `PageContainer` layout components responsive va router-agnostic bo'lsin.
- [ ] `ActionMenu`, `QuickActionGrid`, `CopyButton` keyboard/a11y va loading/error state bilan tekshirilsin.
- [ ] `FilterBar`, `FilterChips` controlled state va empty state bilan ishlasin.
- [ ] `StatusBadge`, `StatusLegend`, `DataState`, `EmptyState`, `LoadingState`, `Result` naming va tone modelini bir xil qilish.
- [ ] `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions` APIlari Base UI primitive API bilan conflict qilmasin.
- [ ] `Pagination`, `PageTabs`, `StepperTabs` edge cases: 0 page, 1 page, disabled, keyboard.

## F. Forms And Inputs Owner

Scope: `src/components/inputs/**`, `src/components/form/**`, `src/components/calendar/**`.

- [ ] Inputs family uchun value model jadvali yozish: raw value, formatted value, parsed value.
- [ ] Inputs family uchun `onValueChange` callback signatures consistent qilish.
- [ ] Inputs family uchun `name`, `id`, `aria-describedby`, `aria-invalid` support.
- [ ] Inputs family uchun clear button keyboard/aria.
- [ ] Async inputs uchun request race cancellation yoki stale response guard.
- [ ] Async inputs uchun loading text, empty text, error text props.
- [ ] Async inputs uchun option disabled reason.
- [ ] Multi select uchun selected chip keyboard remove support.
- [ ] Form wrappers uchun `FieldPath<T>` genericsga o'tish.
- [ ] Form wrappers uchun error message source: RHF fieldState vs prop.
- [ ] Form wrappers uchun description/help text id linking.
- [ ] Form wrappers uchun required indicator optional qilish.
- [ ] Calendar uchun locale/week start strategy.
- [ ] Calendar uchun keyboard navigation: arrows, home/end, page up/down.
- [ ] Calendar uchun disabled date reason.
- [ ] Date range uchun invalid range prevention.
- [ ] Upload components uchun object URL cleanup.
- [ ] Upload components uchun file validation errors.
- [ ] Upload components uchun drag/drop keyboard fallback.
- [ ] `AsyncSelect`, `AsyncMultiSelect`, `Combobox`, `SimpleSelect` APIlarini bir-biriga yaqinlashtirish.
- [ ] Date components timezone/string format strategy aniq bo'lsin.
- [ ] Masked, phone, money, number, quantity inputs controlled/uncontrolled behavior bilan tekshirilsin.
- [ ] React Hook Form wrappers `Control<FieldValues>` generics bilan type-safe bo'lsin.
- [ ] Form wrappers error, description, required, disabled, readOnly holatlarini consistent ko'rsatsin.
- [ ] Calendar/date picker keyboard navigation va aria labels audit qilinsin.
- [ ] File/image upload disabled, accept, max files, progress va preview revoke behaviorlari tekshirilsin.

## G. Data Table And Patterns Owner

Scope: `src/components/data-table/**`, `src/components/patterns/**`.

- [ ] DataTable API surface haddan tashqari katta emasligini audit qilish.
- [ ] DataTable subcomponents public/private chegarasini aniqlash.
- [ ] DataTable toolbar generic bo'lishi, project-specific filter naming bo'lmasin.
- [ ] DataTable pagination page index model: 0-based yoki 1-based aniq bo'lsin.
- [ ] DataTable sorting server/client mode ajratilsin.
- [ ] DataTable filtering server/client mode ajratilsin.
- [ ] DataTable row selection controlled state support.
- [ ] DataTable bulk actions disabled selected rowsni hisobga olsin.
- [ ] DataTable columns visibility persistence optional bo'lsin.
- [ ] DataTable row actions menu keyboard/a11y.
- [ ] DataTable loading skeleton.
- [ ] DataTable empty state.
- [ ] DataTable error state.
- [ ] DataTable horizontal scroll mobile.
- [ ] DataTable dense/comfortable density.
- [ ] ResourcePage API complexligini kamaytirish.
- [ ] ResourceDetailPage sections API type-safe qilish.
- [ ] FormBuilder schema juda generic bo'lib ketmaganini audit qilish.
- [ ] FormBuilder custom field API docs/test bilan yopish.
- [ ] `DataTable` ichidagi `as any` type workaroundni olib tashlash yoki izolyatsiya qilish.
- [ ] Search/filter/sort/pagination controlled va uncontrolled mode aniq ajratilsin.
- [ ] Row selection, disabled rows, bulk actions va row actions behaviorlari test qilinsin.
- [ ] `DataTableViewPresets` local/session storage strategy document qilinsin.
- [ ] `ResourcePage`, `ResourceDetailPage`, `ResourcePageSection` generic business shell bo'lib qolishini tekshirish.
- [ ] `FormBuilder` field presets va custom render type-safety yaxshilansin.
- [ ] Patterns project-specific naming/contentdan tozalansin.

## H. Tests And Quality Owner

Scope: `tests/**`, `scripts/**`, test config files.

- [ ] Component maturity matrixni test coverage bilan bog'lash.
- [ ] Har bir stable primitive uchun render test.
- [ ] Har bir stable primitive uchun keyboard smoke test.
- [ ] Har bir stable primitive uchun aria smoke test.
- [ ] Har bir stable complex component uchun minimal render test.
- [ ] Har bir hook uchun behavior test.
- [ ] Theme provider uchun light/dark/system test.
- [ ] CLI registry add uchun temp directory test.
- [ ] CLI theme upsert uchun idempotency test.
- [ ] Build output test: ESM file ichida dynamic `require("react")` yo'qligi.
- [ ] Build output test: CJS file Node require bilan ishlashi.
- [ ] Type test: public exports TypeScript consumerda import qilinishi.
- [ ] Type test: React Hook Form wrappers generic usage.
- [ ] Accessibility smoke real renderga asoslangan bo'lsin.
- [ ] Bundle size snapshot yoki pack size limit qo'shish.
- [ ] `test:types` import smoke faqat source emas, built package importini ham tekshirsin.
- [ ] `test:a11y` string pattern smoke o'rniga kamida render-based checks qo'shilsin.
- [ ] Registry validation parseri regexga kamroq bog'liq bo'lishi uchun structured export yoki AST strategy tanlash.
- [ ] Component smoke testlar har bir public exportni render/import qilsin.
- [ ] Browser/Next consumer fixture qo'shish: `azamat-ui-kit` ESM importi runtime xato bermasligini tekshiradi.
- [ ] CLI testlari temp projectda `init`, `theme`, `add`, `list` commandlarini yuritsin.
- [ ] Release gate: `npm run lint`, `npm run test:run`, `npm run build`, `npm pack --dry-run`.

## I. Documentation And Examples Owner

Scope: `README.md`, `CHANGELOG.md`, `RELEASE.md`, `VERSIONING.md`, release notes.

- [ ] Component maturity matrix README yoki docs handoffda ko'rsatilsin.
- [ ] Public exports list avtomatik yoki qo'lda aniq ro'yxatga olinsin.
- [ ] “Use package import” va “Use CLI add” ikki yo'l sifatida tushuntirilsin.
- [ ] Styling ownership: global CSS consumer appda ekanini aniq yozish.
- [ ] Dark mode setup alohida bo'lim bo'lsin.
- [ ] Next.js example to'liq yozilsin.
- [ ] Vite example to'liq yozilsin.
- [ ] React Hook Form example to'liq yozilsin.
- [ ] TanStack Table example to'liq yozilsin.
- [ ] Toast provider example to'liq yozilsin.
- [ ] Command palette example to'liq yozilsin.
- [ ] AsyncSelect example to'liq yozilsin.
- [ ] DataTable server-side example to'liq yozilsin.
- [ ] Release notesda breaking changes, fixes, docs, tests bo'limlari bo'lsin.
- [ ] README install flow product-ready qilib qayta yozilsin: install, theme, import, first component.
- [ ] Har bir component family uchun minimal example va advanced example qo'shish.
- [ ] Router integration, form integration, table integration, theme integration bo'limlarini aniq qilish.
- [ ] CLI registry usage alohida hujjatlashtirilsin.
- [ ] Versioning va release flow npm publish real jarayoniga moslashtirilsin.
- [ ] Known limitations bo'limida ESM/CJS, CSS ownership va peer deps ochiq yozilsin.
- [ ] Changelog package version bilan mos va user-facing bo'lsin.

## J. Release And NPM Owner

Scope: release files, package metadata, GitHub/NPM handoff.

- [ ] Package metadata: homepage, repository, bugs, keywords, license, files ro'yxati tekshirilsin.
- [ ] `dist` package ichiga kerakli CLI files, declarations va registry assets kirishini tekshirish.
- [ ] `azamat-ui-kit@0.1.2` yoki keyingi patch release uchun changelog yozish.
- [ ] Publishdan oldin 2FA/token jarayoni dokument qilinsin.
- [ ] NPM package install qilingan consumer app bilan manual smoke qilinsin.
- [ ] Release tag va GitHub release notes tayyorlansin.
- [ ] Docs app `azamat-ui` package versionni yangilashi uchun handoff yozilsin.

## Supervisor Checklist

- [ ] Build/runtime tasklari birinchi navbatda tugatiladi, chunki docs app hozir workaroundga bog'langan.
- [ ] Component API o'zgarishlari docs app tasklaridan oldin yoki ular bilan aniq koordinatsiyada qilinadi.
- [ ] Har bir component family owneri public export, registry entry, docs example va smoke testni birga tugatadi.
- [ ] Har bir katta bo'limdan keyin package version va changelog kerakmi yo'qmi belgilanadi.
- [ ] Final release oldidan fresh install consumer smoke qilinadi.
