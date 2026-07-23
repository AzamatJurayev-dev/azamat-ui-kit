# Component maturity policy

Tembro component statuslari marketing label emas. Har bir status aniq engineering contractni bildiradi.

## Stable

Stable component quyidagi talablarning barchasiga javob berishi kerak:

- public TypeScript API aniq va backward-compatible;
- controlled va uncontrolled holatlar kerak bo‘lgan joyda qo‘llab-quvvatlanadi;
- loading, empty, error va disabled holatlari mavjud;
- keyboard interaction va focus management tekshirilgan;
- light va dark theme tokenlari bilan ishlaydi;
- responsive layout buzilmaydi;
- registry source-copy pathlari va dependencylari to‘liq;
- docs sahifasi, real demo va install command mavjud;
- focused render yoki behavior testi mavjud;
- accessibility tekshiruvi mavjud;
- production build va consumer fixture’dan o‘tadi;
- known critical bug mavjud emas.

Stable API breaking change talab qilsa major release yoki migration alias kerak.

## Preview

Preview component real ishlashi mumkin, lekin quyidagilardan kamida bittasi hali to‘liq emas:

- browser yoki framework coverage;
- accessibility coverage;
- API stability;
- integration engine lifecycle;
- bundle strategy;
- docs yoki test depth.

Preview component docs sahifasida nima uchun Preview ekanini yozishi kerak.

## Experimental

Experimental component:

- production uchun tavsiya qilinmaydi;
- API va source path o‘zgarishi mumkin;
- registry orqali faqat explicit tanlov bilan o‘rnatiladi;
- release notes’da alohida ko‘rsatiladi.

## Internal

Internal item public component surface hisoblanmaydi. U showcase, build helper, fixture yoki migration support uchun ishlatiladi.

## Promotion checklist

Preview componentni Stable qilishdan oldin:

1. public API review;
2. source-copy registry audit;
3. dependency audit;
4. keyboard va screen-reader review;
5. dark/light va responsive review;
6. focused tests;
7. Vite consumer fixture;
8. Next.js App Router consumer fixture;
9. docs va demo review;
10. changelog entry.

## Demotion

Stable component critical regressionga ega bo‘lsa statusni yashirish o‘rniga:

- regressionni fix qilish;
- kerak bo‘lsa vaqtincha Previewga tushirish;
- changelogda sababni yozish;
- migration yoki compatibility note berish.
