# Universal Input API

`AppInput` is the public wrapper for application inputs. It gives app code one input API while keeping specialized input behavior in separate components.

## Recommended usage

```tsx
import { AppInput } from "azamat-ui-kit"

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

`FormAppInput` is the React Hook Form wrapper for the same input kinds:

```tsx
import { FormAppInput } from "azamat-ui-kit"

<FormAppInput control={control} name="firstName" kind="text" label="Name" />
<FormAppInput control={control} name="search" kind="search" label="Search" />
<FormAppInput control={control} name="password" kind="password" label="Password" />
<FormAppInput control={control} name="amount" kind="number" label="Amount" />
<FormAppInput control={control} name="phone" kind="phone" label="Phone" phoneValueMode="raw" />
<FormAppInput control={control} name="birthDate" kind="date" label="Birth date" />
```

## Migration direction

Use `AppInput` and `FormAppInput` for new application work. Existing specialized components remain available when direct low-level control is better.

Long term:

- `FormInput` should become a compatibility wrapper.
- `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, and `FormDateInput` should delegate to `FormAppInput`.
- Public docs should prefer `AppInput` / `FormAppInput` as the first path.
