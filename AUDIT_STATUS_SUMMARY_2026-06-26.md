# Azamat UI Open Audit Tasks

Date: 2026-06-26

Sources:

- `C:\Users\user\Downloads\azamat-ui-marketing-roadmap.md`
- `C:\Users\user\Downloads\azamat-ui-audit.md`

Bu faylda faqat ochiq qolgan ishlar qoldirilgan.

Qoidalar:

- Faqat `[x]` ochiq tasklar yoziladi
- Qisman qilingan ishlar ham ochiq task sifatida qoladi
- Yopilgan yoki yetarli darajada bajarilgan ishlar bu faylga kiritilmaydi

## Product And Docs

- [x] `azamat-ui` public site uchun to'liq visual audit qilish: header, components, blocks, templates, detail, preview va docs route'lar alohida tekshirilsin
- [x] Header rangini page backgrounddan alohida, yopishtirilgan stripe kabi ko'rinmaydigan qilib token tizimiga moslash
- [x] Header sticky holatda scroll paytida rang, border va backdrop to'g'ri ishlashini tekshirish
- [x] Header scroll paytida layout yoki visual state buzilmasligini desktop va mobile viewportlarda audit qilish
- [x] Header theme button, search, npm link va nav pill ranglarini bitta visual languagega keltirish
- [x] Public site background gradientini kamaytirish yoki umumiy page tokeniga birlashtirish: header va body orasida keskin rang uzilishi bo'lmasin
- [x] Public site scroll behaviorini tekshirish: body, sidebar, preview iframe va nested scroll joylari bir-biriga xalaqit bermasligi kerak
- [x] Floating scroll/dev overlay yoki keraksiz browser-like controls public UI ichida ko'rinib qolmasligini tekshirish
- [x] `azamat-ui` public trust signal tizimini kuchaytirish: foydalanuvchi paket ishonchli sinovdan o'tganini birinchi qarashda tushunishi kerak
- [x] `azamat-ui` landing yoki docs ichida `azamat-ui-kit` real fixture / real consumer verification natijasini ko'rsatish
- [x] Component detail sahifalarida live preview ni tashqi real sandbox yoki iframe darajasiga olib chiqish
- [x] Component detail sahifalaridagi `Desktop / Tablet / Mobile` device switcherni olib tashlash yoki faqat haqiqiy foyda beradigan joylarda qoldirish
- [x] Component detail sahifalarida preview wrapper qatlamlarini kamaytirish: card ichida card ichida card ko'rinishi bo'lmasin
- [x] Component previewlarda `Interactive surface`, `Keep the preview focused...` kabi keraksiz explanatory textlarni kamaytirish
- [x] Component playground/code bo'limlarida `HTML` tabni olib tashlash: component docs uchun kerakli surface `TSX`, `Install`, `API props` bilan cheklansin
- [x] Component detail sahifalarida `CLI` va library install ma'lumotlari haddan tashqari ko'p takrorlanmasin
- [x] Component detail sahifalarida API props ma'lumotlarini ko'proq va aniqroq qilish: user component qanday prop olishini birinchi ekranga yaqinroq ko'rsin
- [x] Component detail sahifasida har component uchun `basic usage`, `controlled usage`, `disabled/error/loading`, `API props` tartibini standart qilish
- [x] Button, Input, DataTable, Dialog va boshqa top componentlar uchun docs sifatini bir xil chuqurlikka olib chiqish
- [x] Button, Input, Badge va boshqa primitive previewlar nega vizual jihatdan yomon ko'rinayotganini aniqlash: muammo `azamat-ui-kit` component stylingdami yoki `azamat-ui` preview wrapperidami
- [x] `azamat-ui-kit` Button variantlari va docs previewdagi Button ko'rinishi bir xil chiqishini tekshirish
- [x] `azamat-ui-kit` Input styling va docs previewdagi Input ko'rinishi bir xil chiqishini tekshirish
- [x] `azamat-ui-kit` Badge styling va docs previewdagi Badge ko'rinishi bir xil chiqishini tekshirish
- [x] Component previewlarda border, radius, spacing, text scale, disabled state va contrast professional darajaga keltirilsin
- [x] Component previewlar oddiy HTML default input/button ko'rinishiga tushib qolmasligini tekshirish
- [x] Har component uchun `when to use / when not to use` guidance ni bir xil va to'liq darajaga olib chiqish
- [x] Changelog versiyalarini to'g'ri tartiblash: sana, semver va draft/public ajratilishi chalkash bo'lmasligi kerak
- [x] Draft release yozuvlarini published release tarixidan alohida boshqarish yoki user-facing sahifadan chiqarish
- [x] Installation docs ichidagi `verify` bo'limini amaliy tekshiruv qadamlari bilan kuchaytirish
- [x] Troubleshooting bo'limini kengaytirish: ko'proq real xato holatlari va yechimlari bilan
- [x] Vite installation flow ni Next.js darajasidagi to'liq docs chuqurligiga olib chiqish
- [x] Related components bo'limida har related item uchun `nega bog'liq` izohini qo'shish
- [x] Template badge/status ma'nolarini foydalanuvchi uchun aniq qilish yoki keraksiz bo'lsa olib tashlash

## Landing And Conversion

- [x] Landing hero ichiga haqiqiy ishlaydigan live dashboard/template demo embed qilish
- [x] Landing sahifaga real `Built with Azamat UI` yoki social proof bo'limi qo'shish
- [x] Social proof ichida real ichki yoki public loyihalarni aniq nom va foydalanish qatlamlari bilan ko'rsatish
- [x] Landing hero ichiga npm/download/license kabi foydali badge yoki trust signal joylashtirish
- [x] GitHub stars yoki shunga teng public proof signalini landing yoki public trust blokiga qo'shish
- [x] Landing headline/tagline ni yanada conversion-friendly holatga olib chiqish
- [x] CTA tugmalarini conversion maqsadiga moslab qayta yozish: install/demo yo'nalishi aniqroq bo'lishi kerak
- [x] Landing first fold ichida foydalanuvchi uchun `nima`, `kim uchun`, `qanday boshlaydi` signallarini yanada kuchaytirish
- [x] Landing sahifadagi mock ko'rinishlar o'rniga ko'proq real product evidence qo'shish

## Blocks And Templates

- [x] Blocks bo'limini hozircha to'liq bo'sh holatga o'tkazish: tayyor bo'lmagan barcha block card, preview va detail contentlarni public surfacedan olib tashlash
- [x] Templates bo'limini hozircha to'liq bo'sh holatga o'tkazish: tayyor bo'lmagan barcha template card, preview va detail contentlarni public surfacedan olib tashlash
- [x] Blocks sahifasida vaqtinchalik empty state ko'rsatish: `Coming soon` yoki shunga teng aniq, sodda holat bo'lsin
- [x] Templates sahifasida vaqtinchalik empty state ko'rsatish: tayyor bo'lmagan template'lar userga real mahsulotdek ko'rinmasin
- [x] Block detail route'larini vaqtincha yopish yoki empty/fallback holatga o'tkazish
- [x] Template detail route'larini vaqtincha yopish yoki empty/fallback holatga o'tkazish
- [x] Block preview iframe va nested scroll muammolarini bartaraf qilish: ichki scroll tashqi page scroll bilan urushmasin
- [x] Block previewlarda matn oq rangda yo'qolib ketishi, overlaid hero, crop va contrast muammolarini audit qilish
- [x] Block detail sahifalaridagi card ichida card ichida card kompozitsiyalarini olib tashlash
- [x] Block sidebar, detail hero, preview va copy target bloklaridagi keraksiz layout qatlamlarini soddalashtirish
- [x] Templates sahifasidagi metric cards, status badge va demo contentni public-ready bo'lmaguncha olib tashlash
- [x] Blocks va Templates bo'limlaridagi search/filter/stat cardlar hozircha olib tashlansin yoki minimal empty statega tushirilsin
- [x] `Blocks` katalogidagi bo'sh `Pricing` kategoriyasini real block bilan to'ldirish yoki filterdan olib tashlash
- [x] `Blocks` katalogidagi bo'sh `Marketing` kategoriyasini real block bilan to'ldirish yoki filterdan olib tashlash
- [x] `Blocks` uchun kamida bitta kuchli pricing surface qo'shish
- [x] `Blocks` uchun kamida bitta marketing/product-story surface qo'shish
- [x] `Blocks` sahifasida filterlar va mavjud kontent o'rtasida to'liq moslik bo'lishini audit qilish
- [x] `Templates` va `Blocks` public status semanticsini aniq product tilida tushuntirish

## GitHub And Package Presentation

- [x] `azamat-ui-kit` README ni marketing roadmapdagi darajaga olib chiqish: hero visual, quick install, component coverage, docs links, npm links
- [x] `azamat-ui` README ni stale badge va eski CI yo'nalishlaridan tozalab hozirgi product positioning bilan moslashtirish
- [x] `azamat-ui-kit` npm-facing README first fold qismini yanada kuchaytirish
- [x] `azamat-ui-kit` `package.json` keywords ni discoverability nuqtai nazaridan yanada kuchaytirish
- [x] GitHub repo description va topics ni marketing roadmapga moslab optimallashtirish
- [x] `CONTRIBUTING.md` qo'shish
- [x] Community contribution onboarding uchun minimal contributor flow yozish
- [x] Good first issue / contribution hygiene tizimini yo'lga qo'yish

## Marketing Roadmap

- [x] Birinchi texnik maqolani yozish va publish qilish: reusable DataTable yoki shunga teng kuchli case-study
- [x] Docs yoki repo ichida maqola/linkable content strategy uchun tayyor public materiallar yaratish
- [x] X/Twitter uchun build-in-public va component showcase cadence tayyorlash
- [x] Reddit/Hacker News launch uchun copy va proof materiallarini tayyorlash
- [x] Product Hunt launch uchun kerak bo'ladigan public-ready asset va proof ro'yxatini tayyorlash
- [x] Public social proof bo'lmaguncha launch qilinmaydigan readiness checklist tuzish
- [x] Weekly build-in-public update tizimini yo'lga qo'yish
- [x] Awesome list va external resource outreach uchun tayyor submission ro'yxatini tuzish

## Quality And Trust

- [x] `azamat-ui` component catalog sahifasidagi ortiqcha bo'shliqlarni kamaytirish: start section, all names section va guruhlar orasidagi vertikal ritmni tartibga keltirish
- [x] Component catalog list faqat nomlar bilan bo'lsa ham professional scan layoutga ega bo'lishi kerak: haddan tashqari keng bo'sh grid bo'lmasin
- [x] Component catalogda `Start here` va `All component names` bo'limlari bir-birini takrorlamasligi kerak
- [x] Component catalog itemlari oddiy link list, compact table yoki sidebar-style index sifatida qayta ko'rib chiqilsin
- [x] Component catalog guruh nomlari va surface sonlari user uchun kerakmi yoki yo'qmi qayta baholansin
- [x] Componentlar bo'limida yuqori hero juda katta va bo'sh ko'rinmasligi uchun layout qayta audit qilinsin
- [x] Public site bo'ylab card radius va card shadow haddan tashqari kattaligi audit qilinsin
- [x] Public site bo'ylab `aui-bento`, `SurfaceCard`, `aui-panel`, `aui-preview-shell`, `aui-preview-stage` qatlamlari qayerda takroriy nesting berayotganini xaritalash
- [x] Public site uchun `no nested cards` qoidasini docs UI componentlariga tatbiq qilish
- [x] Preview stage gradient va decorative backgrounds componentning o'z UI sifatini yopib qo'ymasligi kerak
- [x] Public site typography scale qayta audit qilinsin: compact panel ichida hero-size text ishlatilmasin
- [x] Public site spacing scale qayta audit qilinsin: section gap, card gap, page padding va detail page spacing bir xil bo'lsin
- [x] `azamat-ui-kit` componentlarining real package stylingi alohida test appda tekshirilsin
- [x] `azamat-ui` docs preview stylingi package component stylingini buzmayotgani tekshirilsin
- [x] Component UI sifati package tarafida yomon bo'lsa `azamat-ui-kit`da tuzatish, docs wrapper tarafida yomon bo'lsa `azamat-ui`da tuzatish reja qilinsin
- [x] Public site bo'ylab trust signal modelini yagona tizimga keltirish: npm, release quality, demo proof, usage proof
- [x] `azamat-ui` va `azamat-ui-kit` o'rtasidagi public messaging bir xil bo'lishini audit qilish
- [x] Public docs, npm page va repo README orasidagi install story bir xil bo'lishini qat'iy tekshirish
- [x] Foydalanuvchi birinchi 30 soniyada `ishlatishga arziydimi?` degan savolga javob topadigan product proof qatlamini kuchaytirish

## Notes For Next Additions

- [x] Keyin yuboriladigan yangi tasklarni ham shu faylga shu formatda qo'shish
