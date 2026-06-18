# Component Maturity Matrix

This file is the source of truth for public API readiness in `azamat-ui-kit`. A component can be exported from `src/index.ts` only when its status is explicit.

## Status model

| Status | Meaning | Publish rule |
| --- | --- | --- |
| `stable` | API is safe for app use and covered by type/import smoke checks. | Export from package root and registry. |
| `preview` | Useful and reusable, but API may still change. | Export is allowed with docs caveat. |
| `experimental` | API is being explored. | Prefer registry-only or internal use until audited. |
| `internal` | Helper used by other components. | Do not document as a primary component. |

## Maturity rubric

Every public component family is reviewed against these gates:

1. API shape: prop names, controlled/uncontrolled behavior, default values, and escape hatches are clear.
2. Accessibility: semantic role, aria labels, title/description rules, disabled/read-only behavior, keyboard behavior, and focus return are documented.
3. Styling: `className` merges last, `data-slot` is present, focus-visible ring uses tokens, and dark mode uses CSS variables.
4. Runtime safety: no browser globals during SSR unless guarded, no project-specific routing/API imports, and no fake business copy.
5. Tests/docs: import smoke, render smoke where available, README or handoff example, and registry dependency coverage.

## Public export status

### Stable primitives

| Component | Status | Notes |
| --- | --- | --- |
| `Button` | `stable` | Semantic variants: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`. Loading is handled with disabled state or app-level composition until a dedicated API is added. |
| `Input` | `stable` | Supports invalid/disabled/read-only styling through native attributes and token classes. Prefix/suffix stays in input wrappers. |
| `Textarea` | `stable` | Uses token-based border/ring and native resize behavior. |
| `Checkbox` | `stable` | Indeterminate usage should stay controlled by the consumer. |
| `Switch` | `stable` | Label/description composition belongs in form or settings-row wrappers. |
| `Badge` | `stable` | Tone taxonomy should stay token-based and avoid hardcoded project statuses. |
| `Card` | `stable` | Header/content/footer spacing is the package baseline. Nested cards should be avoided in app docs. |
| `Tabs` | `stable` | Keep keyboard behavior aligned with the underlying primitive/native pattern. |

### Stable Base UI wrappers

| Component | Status | Notes |
| --- | --- | --- |
| `Dialog` | `stable` | Title/description are required by convention for accessible content. Close buttons need an aria label. |
| `Popover` | `stable` | Placement props should be passed through to the primitive wrapper. |
| `DropdownMenu` | `stable` | Disabled, destructive and shortcut slots are generic UI concerns. |
| `Select` | `stable` | Controlled/default value, placeholder, disabled options, group/label/separator remain generic. |
| `CommandPalette` | `preview` | Public API is useful, but composition and shortcut behavior should stay documented. |

### Stable complex families

| Family | Status | Boundary |
| --- | --- | --- |
| `actions` | `stable` | Async/loading/destructive behavior must be passed as props; no app API calls. |
| `layout` | `stable` | Router-agnostic with `renderLink` or regular anchors. |
| `filters` | `stable` | Controlled filter state belongs to the consumer. |
| `feedback` | `stable` | Empty/loading/error/success copy is caller-owned. |
| `display` | `stable` | Metrics/timeline/activity data is caller-owned. |
| `overlay` | `stable` | Submit/confirm async logic is caller-owned. |
| `navigation` | `stable` | Pagination is 1-based at the public edge and can be adapted by consumers. |

### Forms and inputs

| Family | Status | Value model |
| --- | --- | --- |
| `inputs` | `preview` | Prefer `value` as raw string/number and `onValueChange` or typed callbacks for parsed values. |
| `form` | `preview` | React Hook Form wrappers should stay type-safe with `Control<FieldValues>` and field-state errors. |
| `calendar` | `preview` | Locale, week start, timezone and date string strategy must be owned by the consumer until stabilized. |
| `upload` | `preview` | Consumers own validation copy; package owns disabled, accept, progress, preview and cleanup behavior. |

### Data and patterns

| Component | Status | Contract |
| --- | --- | --- |
| `DataTable` | `preview` | Generic TanStack Table shell. Server/client sorting, filtering and pagination must be explicit in props. |
| `DataTableViewPresets` | `preview` | Persistence is optional and should use caller-provided local/session storage keys. |
| `ResourcePage` | `preview` | Generic business shell only; no project copy, routes or API assumptions. |
| `ResourceDetailPage` | `preview` | Sections should remain type-safe and caller-owned. |
| `FormBuilder` | `experimental` | Useful for internal speed, but custom render and field presets need additional type tests before stable. |

## Public helper rule

Variant helpers such as `buttonVariants` and `badgeVariants` may stay public when they are documented as styling helpers. If a helper is only used internally, move it out of `src/index.ts` before the next major/minor release.

## Component audit checklist

Use this before promoting any component to `stable`:

- `displayName` where React DevTools value is not obvious.
- `data-slot` naming matches the package convention.
- `className` is merged after defaults through `cn(...)`.
- `ref` forwarding or ref pass-through is intentional.
- Controlled/uncontrolled props do not conflict.
- Disabled, read-only and loading semantics are clear.
- Focus-visible styling uses `ring` tokens.
- Keyboard behavior is native or documented.
- Required aria labels, titles and descriptions are documented.
- Dark mode relies on theme tokens.
- Responsive overflow behavior is defined.
- SSR guards exist for `window`, `document`, `localStorage` and object URLs.
- Tree-shaking is protected by side-effect-free component modules.
