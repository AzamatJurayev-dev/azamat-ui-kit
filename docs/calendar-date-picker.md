# Calendar and DatePicker

This phase adds a real calendar layer on top of the existing native date inputs.

## Components

```txt
Calendar
DatePicker
DateRangePicker
FormDatePicker
FormDateRangePicker
```

## Single date picker

```tsx
<DatePicker
  value={date}
  onValueChange={setDate}
  placeholder="Select date"
  min="2026-01-01"
  max="2026-12-31"
/>
```

The value format is always ISO date key:

```txt
YYYY-MM-DD
```

## Date range picker

```tsx
<DateRangePicker
  value={{ from, to }}
  onValueChange={(range) => {
    setFrom(range.from ?? "")
    setTo(range.to ?? "")
  }}
/>
```

## React Hook Form

```tsx
<FormDatePicker
  control={form.control}
  name="birthDate"
  label="Birth date"
/>

<FormDateRangePicker
  control={form.control}
  fromName="dateFrom"
  toName="dateTo"
  label="Period"
/>
```

## Rules

- Calendar does not import date-fns/dayjs.
- Calendar stores values as `YYYY-MM-DD` strings.
- App decides formatting through `formatValue`.
- App decides validation rules and min/max dates.
- No API, router, auth, tenant, permission or business logic belongs here.
