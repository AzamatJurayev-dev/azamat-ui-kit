# Source copy model

Primary model:

```bash
npm install -D azamat-ui-kit
npx azamat-ui-kit-cli init --template dashboard
npx azamat-ui-kit-cli add data-view
```

The CLI copies component source into the app:

```txt
src/components/ui/button.tsx
src/components/patterns/data-view.tsx
src/lib/utils.ts
```

Consumer apps should normally import copied files:

```ts
import { Button } from "@/components/ui/button"
import { DataView } from "@/components/patterns/data-view"
```

Optional runtime imports can exist for prototypes or tiny stable primitives:

```ts
import { Button } from "azamat-ui-kit/ui/button"
import { DataView } from "azamat-ui-kit/patterns/data-view"
```

Core rules:

- copy source through `init` and `add`, not during `npm install`
- keep root runtime primitives small
- make system components props-driven
- support render props and `classNames` objects
- keep business-specific UI as recipes
- preserve per-component modules in the build
- expose subpath exports for optional runtime imports
- do not make `npm install azamat-ui-kit` the primary adoption story for large systems

Distribution model summary:

- foundation package: primitives, tiny hooks, utils
- source-copy reusable components: inputs, forms, layout, feedback, display, upload, calendar
- source-copy systems: data-table, resource pages, builders, dashboard shells, templates

See also: `LIBRARY_DISTRIBUTION_ARCHITECTURE.md`

Main system components:

```txt
ActionSystem
StatusSystem
FilterBuilder
DataView
EntityDetails
ResourceSystem
CrudSystem
SmartFormShell
WorkspaceShell
EntityCard
```
