# Universal Input API

`AppInput` is a compatibility wrapper around the canonical `Input` API. It keeps older app code working while the package teaches `Input` and `FormInput` as the main public mental model.

## Recommended usage

```tsx
import { AppInput } from "azix"

<AppInput kind="text" placeholder="Name" />
<AppInput kind="clearable" placeholder="Filter by product" />
<AppInput kind="search" loading resultCount={24} shortcut="⌘K" />
<AppInput kind="password" showCapsLockWarning />
<AppInput kind="number" prefix="$" suffix="UZS" />
<AppInput kind="phone" countryCode="+998" showCountryCode />
<AppInput kind="date" showIcon />
```

`UniversalInput` is an alias for `AppInput`.

## Internal routing

`AppInput` stays thin. It routes by `kind` and delegates behavior to specialized components:

| kind | implementation |
| --- | --- |
| `text` | `InputDecorator` |
| `clearable` | `ClearableInput` |
| `search` | `SearchInput` |
| `password` | `PasswordInput` |
| `number` | `NumberInput` |
| `phone` | `PhoneInput` |
| `date` | `DateInput` |

This keeps the external API easy while keeping the implementation maintainable.

## Shared visual props

The shared input surface supports the common decorator props:

```tsx
<AppInput
  kind="text"
  tone="danger"
  density="compact"
  leading={icon}
  trailing={action}
  wrapperClassName="..."
  inputClassName="..."
/>
```

## Form usage

`FormAppInput` is the compatibility React Hook Form wrapper for the same input kinds. New docs should teach `FormInput` first:

```tsx
import { FormInput } from "azix"

<FormInput control={control} name="firstName" kind="text" label="Name" />
<FormInput control={control} name="search" kind="search" label="Search" />
<FormInput control={control} name="password" kind="password" label="Password" />
<FormInput control={control} name="amount" kind="number" label="Amount" />
<FormInput control={control} name="phone" kind="phone" label="Phone" valueMode="raw" />
<FormInput control={control} name="birthDate" kind="date" label="Birth date" />
```

## Migration direction

Use `Input` and `FormInput` for new application work. Existing specialized components remain available when direct low-level control is better.

Long term:

- `FormInput` should become a compatibility wrapper.
- `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, and `FormDateInput` stay available as migration wrappers.
- Public docs should prefer `Input` / `FormInput` as the first path.
