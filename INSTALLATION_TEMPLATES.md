# Installation Templates

Bu fayl docs handoff uchun tayyor reference: `azamat-ui` docs ichida Next.js va Vite install sahifalari shu asosda yozilishi kerak.

## 1. Recommended model

Primary setup:

```bash
npm install -D azamat-ui-kit
npx azamat-ui-kit init --template next
npx azamat-ui-kit add button form-input
```

Yoki Vite uchun:

```bash
npm install -D azamat-ui-kit
npx azamat-ui-kit init --template vite
npx azamat-ui-kit add button form-input
```

## 2. Next.js guide

### Install

```bash
npm install -D azamat-ui-kit
```

### Initialize

```bash
npx azamat-ui-kit init --template next
```

`init` quyidagilarni tayyorlaydi:

- `azamat-ui.json`
- `lib/utils.ts`
- `app/globals.css` ichida light/dark theme tokenlar
- base runtime dependencylar
- agar Tailwind paketlari yo'q bo'lsa: `tailwindcss`, `@tailwindcss/postcss`

### Add first component

```bash
npx azamat-ui-kit add button
npx azamat-ui-kit add form-input
```

### Import

```tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
```

### Verify

- `app/globals.css` mavjud bo'lishi kerak
- Next project Tailwind CSS bilan build bo'lishi kerak
- copied source importlari package-root importdan ustun bo'lishi kerak

## 3. Vite guide

### Install

```bash
npm install -D azamat-ui-kit
```

### Initialize

```bash
npx azamat-ui-kit init --template vite
```

`init` quyidagilarni tayyorlaydi:

- `azamat-ui.json`
- `src/lib/utils.ts`
- `src/index.css` ichida light/dark theme tokenlar
- base runtime dependencylar
- agar Tailwind paketlari yo'q bo'lsa: `tailwindcss`, `@tailwindcss/vite`

### Add first component

```bash
npx azamat-ui-kit add button
npx azamat-ui-kit add form-input
```

### Import

```tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
```

### Verify

- `src/index.css` global entry sifatida ulanib turgan bo'lishi kerak
- Vite alias `@` ishlashi kerak
- copied source importlari package-root importdan ustun bo'lishi kerak

## 4. Docs route recommendation

`azamat-ui` docs ichida quyidagi route'lar bo'lishi kerak:

- `/docs/installation`
- `/docs/installation/next`
- `/docs/installation/vite`

Har bir route ichida:

- create project
- install package
- run init
- add first component
- verify Tailwind/theme
- troubleshooting
