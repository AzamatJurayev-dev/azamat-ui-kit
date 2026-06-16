# Calendar, upload, wizard and CI

This phase adds generic helpers that are useful in dashboards and onboarding flows.

## Calendar and date pickers

```tsx
<DatePicker value={date} onValueChange={setDate} />

<DateRangePicker
  value={{ from, to }}
  onValueChange={(range) => {
    setFrom(range.from)
    setTo(range.to)
  }}
/>
```

The current calendar layer uses native date input behavior for reliability. A popover calendar can be added later as a separate advanced date-picker phase.

## File and image upload

```tsx
<FileUpload files={files} onFilesChange={setFiles} />
<ImageUpload files={images} onFilesChange={setImages} />
```

Rules:

- upload components only manage selected `File[]`
- API upload/S3/R2 behavior stays in the consuming app
- preview and server persistence should be app-specific unless generalized later

## Wizard and stepper

```tsx
<Wizard
  steps={[
    { id: "info", title: "Info" },
    { id: "details", title: "Details" },
    { id: "confirm", title: "Confirm" },
  ]}
  currentStep={step}
  onStepChange={setStep}
  onNext={goNext}
  onPrevious={goBack}
  onFinish={submit}
>
  {content}
</Wizard>
```

Rules:

- wizard controls visual flow only
- validation and submission stay in the app
- steps are generic and do not know business state

## CI

GitHub Actions now runs:

```bash
npm ci
npm run build
```

on `master`, `main`, and pull requests.
