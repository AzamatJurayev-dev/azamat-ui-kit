# Tembro Component Improvement Tasks

Bu fayl componentlarni qayta kuchaytirish uchun ochiq tasklar ro'yxati. Har bir bo'lim raqamlangan, har bir task coding orqali yopilishi kerak.

## 1. Umumiy Public Surface Tartibi

- [x] Public component ro'yxatini qayta tekshirish: faqat haqiqiy reusable componentlar public surface'da qolsin.
- [x] Helper yoki subcomponent bo'lgan narsalarni alohida component sifatida ko'rsatishni to'xtatish.
- [x] `registry.json`, `src/public-component-surface.ts`, showcase metadata va CLI vendor registry bir xil component ro'yxatini ishlatsin.
- [x] Har bir component source-copy usulida `src/components/<group>/<component>/index.tsx` yoki aniq folder strukturada install bo'lsin.
- [x] Har bir component uchun `demo.tsx` yoki showcase demo real componentni ko'rsatsin, placeholder demo qolmasin.
- [x] Har bir component docs sahifasida install command faqat o'sha componentga mos bo'lsin.
- [x] Har bir component API props jadvali real exported props bilan mos bo'lsin.
- [x] Keraksiz duplicate componentlar uchun migration alias va deprecation note yozilsin.

## 2. Button

- [x] Button rang kontrastini light/dark mode'da to'liq tekshirish.
- [x] Button hover, active, disabled, loading va focus-visible state'larini bir xil sifatda polish qilish.
- [x] Icon + text layout buzilmasligi uchun `leftIcon`, `rightIcon`, `iconOnly`, `loading` propslarini tartibga solish.
- [x] Size propslarini (`sm`, `md`, `lg`, `icon`) real design tokenlarga bog'lash.
- [x] `ButtonGroup` bilan ishlaganda radius va border collapse chiroyli birlashsin.
- [x] Showcase'da primary, secondary, outline, ghost, destructive, link, loading, icon-only real demo bo'lsin.

## 3. Input

- [x] Input asosiy component sifatida qoladi, `clearable`, `search`, `password`, `number`, `money`, `phone`, `date`, `time`, `color` kabi holatlar props/helper orqali boshqariladi.
- [x] `ClearableInput` alohida public component sifatida olib tashlanadi yoki deprecated alias qilinadi.
- [x] Clear icon ikki marta chiqmasligi uchun right slot priority qoidasi yoziladi.
- [x] Light mode'da input border, shadow va background oq fonda yo'qolib qolmasin.
- [x] Prefix, suffix, leftIcon, rightIcon, error, hint, loading, disabled, readonly propslari bir xil chrome ichida ishlasin.
- [x] `SearchInput`, `PasswordInput`, `NumberInput`, `MoneyInput`, `PhoneInput`, `DateInput`, `DateRangeInput`, `ColorInput`, `TimePicker` Input API bilan moslashtirilsin.
- [x] Masked input va numeric format logic kichik helperlarga ajratilsin.
- [x] Showcase'da har bir input mode uchun real demo bo'lsin.

## 4. Textarea

- [x] Textarea Input chrome bilan vizual jihatdan moslashtirilsin.
- [x] Auto-resize, maxLength counter, error, hint, disabled va readonly holatlar qo'shilsin.
- [x] Form wrapper ichida label, error, hint spacing Input bilan bir xil bo'lsin.
- [x] Showcase'da normal, error, counter, disabled, auto-resize demo bo'lsin.

## 5. Select

- [x] `Select` asosiy component sifatida qoladi, `SimpleSelect`, `AsyncSelect`, `Combobox`, `AsyncMultiSelect` alohida public nom sifatida kamaytiriladi.
- [x] `isMulti`, `async`, `searchable`, `clearable`, `creatable`, `loading`, `emptyMessage` propslari bitta Select API ichida tartiblanadi.
- [x] Async select stale request guard, abort controller va disabled reason bilan ishlasin.
- [x] Multi tag keyboard remove, backspace remove va screen reader label qo'shilsin.
- [x] Dropdown width, maxHeight, portal, z-index va mobile behavior tekshirilsin.
- [x] Demo ichida input turib qolgan yoki noto'g'ri component ko'rinadigan holatlar tozalanadi.
- [x] Showcase'da single, multi, async, combobox, grouped, disabled, loading, empty state demo bo'lsin.

## 6. Checkbox, Switch, RadioGroup

- [ ] Checkbox checked/unchecked/indeterminate state'lari real controlled va uncontrolled ishlasin.
- [ ] Checkbox hover/focus ring light/dark mode'da ko'rinsin.
- [ ] Switch size, label placement, loading va disabled state qo'shilsin.
- [ ] RadioGroup keyboard navigation va roving focus tekshirilsin.
- [ ] Form wrapperlar bilan error state bir xil ko'rinsin.
- [ ] Showcase'da single, group, form, disabled, error demo bo'lsin.

## 7. Badge va Tag

- [ ] `Badge`, `StatusBadge`, `Tag`, `DeltaBadge` kabi takrorlar bitta Badge/Tag API bilan tartiblansin.
- [ ] Badge variantlari status, tone, outline, soft, dot, removable sifatida props orqali boshqarilsin.
- [ ] Light mode'da oq badge va oq text muammolari tozalanadi.
- [ ] Removable tag icon alignment va keyboard remove ishlasin.
- [ ] Showcase'da status, count, dot, removable, tone variantlari bo'lsin.

## 8. Card

- [ ] `Card`, `InfoCard`, `SmartCard`, `TrendCard`, `ComparisonCard`, `UserCard`, `StatisticCard` takrorlari audit qilinsin.
- [ ] Asosiy `Card` header/content/footer/action/media slots bilan yetarli bo'lsa, duplicate cardlar helper yoki presetga o'tkazilsin.
- [ ] Nested card ichida card patternlari olib tashlansin.
- [ ] Card radius va shadow tokenlari umumiy theme bilan boshqarilsin.
- [ ] Showcase'da content card, media card, action card, compact card, selectable card demo bo'lsin.

## 9. Accordion va Collapse

- [ ] Accordion va Collapse farqi aniq belgilanadi: accordion grouped disclosure, collapse single controlled panel.
- [ ] Agar farq amalda yo'q bo'lsa, bittasi deprecated alias qilinadi.
- [ ] Accordion hover area chetlarida ochiq qoladigan visual bug fix qilinsin.
- [ ] Keyboard support, single/multiple mode va disabled item state tekshirilsin.
- [ ] Showcase'da FAQ, settings group, controlled open state demo bo'lsin.

## 10. Dialog, AlertDialog, ConfirmDialog, Drawer, Sheet

- [ ] Overlay componentlar bitta asosiy overlay primitive ustiga qurilsin.
- [ ] AlertDialog ishlamayotgan open/close va action flow tekshirilsin.
- [ ] Focus trap, escape close, outside click, scroll lock va aria label to'liq tekshirilsin.
- [ ] Drawer mobile gesture yoki responsive width bilan polish qilinsin.
- [ ] `ModalShell`, `SheetShell`, `DialogActions` public component sifatida kerakmi yoki helpermi, qayta aniqlansin.
- [ ] Showcase'da confirm, destructive, form dialog, drawer, sheet, nested close demo bo'lsin.

## 11. DropdownMenu, Popover, Tooltip, HoverCard, RightClickMenu

- [ ] Dropdown item hover, active, disabled, danger va icon alignment polish qilinsin.
- [ ] Popover positioning, collision padding va mobile behavior tekshirilsin.
- [ ] Tooltip delay, side, align va disabled trigger holatlari ishlasin.
- [ ] HoverCard haqiqiy Card bilan takror bo'lsa, overlay helper sifatida kamaytirilsin.
- [ ] RightClickMenu keyboard va pointer positioning bilan to'liq ishlasin.
- [ ] Showcase'da real menu, command menu, contextual menu, popover form va tooltip demo bo'lsin.

## 12. Tabs, SegmentedControl, Navigation

- [ ] Tabs active state barcha theme'da aniq ko'rinsin.
- [ ] Tabs overflow va mobile scroll behavior qo'shilsin.
- [ ] SegmentedControl icon/text, equal width va controlled value bilan polish qilinsin.
- [ ] `PageTabs`, `NavTabs`, `StepperTabs` takrorlari audit qilinib Tabs/Stepper API bilan bog'lansin.
- [ ] `AnchorNav` public surface'dan olib tashlanadi yoki docs-only helperga o'tkaziladi.
- [ ] Showcase'da horizontal, vertical, pills, compact, overflow demo bo'lsin.

## 13. DataTable

- [ ] DataTable barcha subcomponentlari alohida component sifatida ko'rsatilmasin, `data-table` install qilinganda birga kelsin.
- [ ] Toolbar, columns, filters, bulk actions, saved views, pagination va row actions bitta DataTable docs/demo ichida ko'rsatilsin.
- [ ] Filterlar ustma-ust chiqib ketmasligi uchun responsive toolbar layout qayta yozilsin.
- [ ] Column visibility popover button UI polish qilinsin.
- [ ] Large dataset demo uchun row count input yoki generated data helper qo'shilsin.
- [ ] Sorting, selection, pagination, empty, loading, error, export/import, saved filter state'lari test qilinsin.
- [ ] DataTable core headless logic va visual shell ajratilsin.
- [ ] Showcase'da admin content table, compact table, bulk action, server pagination, empty state demo bo'lsin.

## 14. Calendar, DatePicker, DateRangePicker

- [ ] Calendar range tanlash bugi fix qilinsin.
- [ ] DateRangePicker ikki oy ko'rsatish propsi (`months={2}` yoki `numberOfMonths`) bilan ishlasin.
- [ ] Keyboard navigation, disabled dates, min/max date, today marker, selected range hover state tekshirilsin.
- [ ] Calendar visual spacing va day cell radius theme token bilan moslashtirilsin.
- [ ] DateInput va DatePicker API bir-birini takrorlamasdan ishlasin.
- [ ] Showcase'da single date, range, two months, disabled dates, form integration demo bo'lsin.

## 15. Carousel

- [ ] Carousel swipe, mouse drag, keyboard, autoplay, loop, thumbnails va indicators qo'shilsin.
- [ ] Click qilganda preview/lightbox yoki active slide detail imkoniyati qo'shilsin.
- [ ] Slide height/aspect ratio stable bo'lsin, image/text layout shift qilmasin.
- [ ] Mobile touch UX va aria-live announcement tekshirilsin.
- [ ] Showcase'da media rail, hero carousel, cards carousel, thumbnail carousel demo bo'lsin.

## 16. Upload

- [ ] FileUpload va ImageUpload drag/drop, progress, error, retry, remove, preview state bilan boyitilsin.
- [ ] FileDropzone helper sifatida qoladimi yoki upload ichida slot bo'ladimi aniqlansin.
- [ ] Image crop/ratio validation va max file size message qo'shilsin.
- [ ] Keyboard accessible file trigger va aria label tekshirilsin.
- [ ] Showcase'da avatar upload, gallery upload, file list, error state demo bo'lsin.

## 17. Charts va Metrics

- [ ] Bar/Line/Donut/Sparkline/ProgressRing componentlari umumiy chart tokenlari bilan ishlasin.
- [ ] Empty, loading, no data, negative value, compact card states qo'shilsin.
- [ ] `MetricGrid`, `Statistic`, `TrendCard`, `Kpi` takrorlari audit qilinsin.
- [ ] Legend, tooltip, axis label, responsive container va color palette yaxshilansin.
- [ ] Showcase'da dashboard KPI, trend, category bar, donut, mini sparkline demo bo'lsin.

## 18. Sidebar, AppHeader, AppShell

- [ ] `AppHeader` va `AppShell` alohida public component sifatida emas, Sidebar/AppLayout provider qismlari sifatida qayta ko'rilsin.
- [ ] Sidebar mobile'da avtomatik hamburger/drawer mode bilan ishlasin.
- [ ] Collapsed, expanded, active, nested, footer action va user menu state'lari polish qilinsin.
- [ ] Sidebar text overflow va icon alignment barcha ekranlarda tekshirilsin.
- [ ] App layout provider orqali content width, header height va sidebar width tokenlari boshqarilsin.
- [ ] Showcase'da dashboard sidebar, mobile drawer, collapsed rail demo bo'lsin.

## 19. Breadcrumbs, Pagination, CommandBar

- [ ] Breadcrumbs overflow, collapsed middle items, icon separator va current item aria support bilan boyitilsin.
- [ ] Pagination compact/mobile variant, page size, total count va disabled state bilan polish qilinsin.
- [ ] CommandBar UI/UX qayta ko'rilsin: search, groups, shortcuts, empty state, loading state.
- [ ] CommandPalette public component sifatida kerakmi yoki app-level patternmi, qayta qaror qilinsin.
- [ ] Showcase'da long breadcrumbs, compact pagination, command actions demo bo'lsin.

## 20. Feedback Components

- [ ] Alert tone, title, description, action, dismissible va icon propslari bilan kuchaytirilsin.
- [ ] LoadingState spinner/skeleton/progress variants bilan tartiblansin.
- [ ] PageState empty/error/not-found/success states real action bilan ishlasin.
- [ ] DataState display va feedback orasidagi takrorlar audit qilinsin.
- [ ] Toast provider stacking, action, promise state, position va duration bilan tekshirilsin.
- [ ] NotificationCenter read/unread, grouping, clear all va empty state bilan boyitilsin.

## 21. Display Components

- [ ] ActivityFeed item variants, time grouping, avatar/icon, compact mode va empty state bilan kuchaytirilsin.
- [ ] Avatar fallback, image error, group overflow va status dot polish qilinsin.
- [ ] CodeBlock copy feedback, language label, line numbers, wrap, highlight lines qo'shilsin.
- [ ] List/DataList/ListRow takrorlari audit qilinsin.
- [ ] PropertyGrid va DescriptionList o'xshashligi tartibga solinsin.
- [ ] Timeline horizontal/vertical, status, compact mode bilan boyitilsin.
- [ ] TreeView keyboard, checkbox, lazy loading, search highlight bilan kuchaytirilsin.
- [ ] Kanban drag/drop, column empty state, card actions va keyboard support bilan qayta ko'rilsin.

## 22. Forms

- [ ] FormFieldShell asosiy form chrome sifatida qoladi, barcha Form* wrapperlar shu API bilan moslashtiriladi.
- [ ] FormInput, FormSelect, FormTextarea, FormSwitch, FormAsyncSelect kerakli wrapper sifatida qoladimi yoki examplesga o'tadimi aniqlansin.
- [ ] Error, hint, required, description, disabled, loading va success state barcha fieldlarda bir xil bo'lsin.
- [ ] React Hook Form yoki native form integration demosini qo'shish.
- [ ] Deprecated form compat fayllari public exportdan olib tashlanadi yoki aniq migration yoziladi.

## 23. Modern Components

- [ ] CalendarScheduler UI/UX qayta polish qilinsin: day/week/month, event creation, drag/resize, empty state.
- [ ] DualListPicker keyboard, search, disabled items, transfer all, max selected state bilan ishlasin.
- [ ] Menubar desktop keyboard navigation bilan tekshirilsin.
- [ ] NavigationMenu responsive/mobile behavior bilan polish qilinsin.
- [ ] ResizablePanel min/max, persistence va nested panel bilan test qilinsin.
- [ ] RichTextEditor toolbar, markdown/html output, placeholder, disabled state bilan tartiblansin.
- [ ] Tour positioning, step progress, skip/finish callbacks va focus management tekshirilsin.
- [ ] QRCode real scan-certified encoder bilan almashtirilsin yoki docs'da visual-only fallback deb aniq belgilanadi.

## 24. Keraksiz yoki Qayta Ko'riladigan Componentlar

- [ ] `clearable-input` olib tashlanadi yoki Input `clearable` propsiga migration qilinadi.
- [ ] `color-input` Input type/helper sifatida qayta ko'riladi.
- [ ] `copy-field` CopyButton variant/helper sifatida qayta ko'riladi.
- [ ] `comparison-card` Card variant/helper sifatida qayta ko'riladi.
- [ ] `hover-card` Card emas, overlay helper sifatida qayta nomlanadi yoki publicdan olinadi.
- [ ] `command-palette` app-level pattern sifatida public componentdan olib tashlanishi ko'rib chiqiladi.
- [ ] `app-header`, `app-shell`, `page-header`, `page-container` layout kit ichida qoladimi yoki docs patternmi, qayta baholanadi.
- [ ] DataTable subcomponents public component ro'yxatidan chiqariladi.
- [ ] Form wrapperlarning public soni kamaytiriladi.

## 25. Theming va Tokens

- [ ] Radiuslar haddan tashqari yumaloq bo'lib ketgan joylar token orqali kamaytiriladi.
- [ ] Light/dark mode uchun background, border, input, ring, muted, primary tokenlari qayta ko'riladi.
- [ ] Componentlar CSS variable orqali themable bo'lsin, hardcoded ranglar kamaytirilsin.
- [ ] Init command index.css ichiga kerakli theme tokenlarini yozsin.
- [ ] Vite, Next, Remix kabi setup docs real ishlaydigan holatda yozilsin.
- [ ] Public demos token o'zgarganda componentlar buzilmasligini ko'rsatsin.

## 26. CLI, Registry, Release Gate

- [ ] `npx tembro init` hamma kerakli CSS token va aliaslarni avtomatik yozishini test qilish.
- [ ] `npx tembro add <component>` har bir componentni folder qilib to'g'ri yozishini test qilish.
- [ ] `add data-table` data-table subfiles va helperlarini auto qo'shsin.
- [ ] `add input` input helperlarini kerakli hajmda qo'shsin.
- [ ] Registry validation tezlashtirilsin, release gate ortiqcha og'ir testlardan tozalansin.
- [ ] Publish oldidan minimal gate: typecheck, registry validation, CLI smoke, build.
- [ ] CLI vendor source real src bilan sync bo'lishi uchun script yoki check qo'shilsin.

## 27. Showcase va Azix UI Docs

- [ ] Har bir public component azix-ui public docs sahifasida ko'rinsin.
- [ ] Component list faqat nomlardan iborat, alphabet tartibda va search bilan bo'lsin.
- [ ] Detail sahifada component nomi, install command, live demo, props/API, examples tartibida bo'lsin.
- [ ] Component detail sidebar shadcn kabi scrollable list bo'lsin.
- [ ] Har bir component demo real componentga mos bo'lsin, boshqa component chiqib qolmasin.
- [ ] `Component-specific demo is not written yet` placeholder to'liq yo'qotilsin.
- [ ] Blocks/templates bo'limi tayyor bo'lmasa bo'sh yoki yashirilgan bo'lsin.

## 28. QA va Regression

- [ ] Har bir component uchun visual smoke page yoki demo snapshot ro'yxati tuzilsin.
- [ ] Light/dark mode har bir core componentda qo'lda tekshirilsin.
- [ ] Mobile viewportda sidebar, dialog, select, data-table, carousel, calendar tekshirilsin.
- [ ] Keyboard navigation core interactive componentlarda tekshirilsin.
- [ ] Source-copy install qilingan test appda har bir recommended component import va render bo'lsin.
- [ ] Build chiqishi oldidan `npm run build`, `npm run test:types`, `npm run test:registry` toza o'tsin.
