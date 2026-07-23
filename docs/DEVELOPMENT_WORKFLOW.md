# Development workflow

Tembro ishlari kichik, bitta maqsadli va yangi `master`dan ochilgan pull requestlar orqali bajariladi.

## Asosiy qoida

Har bir pull request faqat bitta scopega ega bo‘ladi.

Ruxsat etilgan scope misollari:

- `docs`: documentation, route va content;
- `cli`: command, manifest va generatorlar;
- `tests`: fixture, smoke va release gate;
- `components`: bitta component yoki bitta yaqin component oilasi;
- `registry`: registry metadata va validation;
- `release`: version, changelog va publish automation.

Quyidagilar bitta PRga aralashtirilmaydi:

- docs redesign va CLI refactor;
- yangi component va release automation;
- registry migration va ko‘p component upgrade;
- fixture infrastructure va unrelated UI o‘zgarishlari.

## Branch yaratish

Har bir yangi ish oldidan:

1. `master`dagi oxirgi holat tekshiriladi;
2. eski feature branch qayta ishlatilmaydi;
3. yangi branch to‘g‘ridan-to‘g‘ri yangi `master`dan yaratiladi.

Branch naming:

```text
agent/docs-installation-guide
agent/cli-doctor-agents
agent/test-next-consumer-fixture
agent/component-data-table-a11y
agent/release-version-automation
```

## PR hajmi

Ideal PR:

- 1 ta aniq maqsad;
- 1–8 ta mantiqan bog‘liq fayl;
- mustaqil tekshiriladigan natija;
- boshqa ochiq PRga majburiy dependency yo‘q.

Katta ish bir nechta PRga bo‘linadi:

1. contract yoki metadata;
2. implementation;
3. tests;
4. docs;
5. release integration.

## Sync va conflict qoidasi

PR ochishdan oldin branch yangi `master`dan yaratiladi.

Agar PR ochiq turganda `master` shu fayllarda o‘zgarsa:

- eski diffni ko‘r-ko‘rona merge qilmaslik;
- current master contentini qayta o‘qish;
- kerak bo‘lsa yangi branch yaratish;
- allaqachon masterga tushgan dublikat PRni yopish.

Conflictni faqat texnik ravishda yechish yetarli emas. Yakuniy fayl ikkala o‘zgarish contractini saqlashi kerak.

## Required validation

### Docs PR

- route build;
- route smoke marker;
- broken navigation yo‘qligi;
- Vercel preview success.

### CLI PR

- CLI build;
- command `--help`;
- Vite va Next fixture;
- idempotency;
- overwrite safety;
- package dry run.

### Component PR

- TypeScript build;
- focused render/behavior test;
- accessibility check;
- registry source-copy validation;
- dark/light va responsive review;
- consumer fixture.

### Release PR

- version sync;
- full release gate;
- package contents audit;
- changelog;
- npm pack dry run.

## Release phases

### Phase 1 — CLI hardening

- init/add/doctor/agents contract;
- command manifest;
- Vite va Next fixtures;
- idempotency va overwrite safety.

### Phase 2 — Documentation

- installation;
- CLI reference;
- integrations capability matrix;
- roadmap;
- troubleshooting.

### Phase 3 — Stable component audit

- API consistency;
- accessibility;
- registry dependencies;
- responsive va theme coverage;
- maturity status review.

### Phase 4 — Advanced integrations

- PDF Viewer;
- Barcode Scanner;
- Document Scanner;
- Spreadsheet;
- Media Player;
- real browser smoke routes.

### Phase 5 — Release candidate

- full release gate;
- fixture builds;
- changelog freeze;
- known issues list;
- migration notes.

### Phase 6 — v1.0

- version sync;
- npm publish;
- GitHub release;
- docs production verification.

## Merge tartibi

Bir nechta PR tayyor bo‘lsa:

1. contract/metadata;
2. implementation;
3. tests;
4. docs;
5. release integration.

Har bir merge’dan keyin keyingi PR yangi masterga nisbatan qayta tekshiriladi.

## Done definition

Ish faqat kod yozilganda emas, quyidagilar bajarilganda tugagan hisoblanadi:

- scope to‘liq;
- required validation o‘tgan;
- conflict yo‘q;
- docs yoki migration note kerak bo‘lsa mavjud;
- PR boshqa unrelated o‘zgarishni o‘z ichiga olmaydi.
