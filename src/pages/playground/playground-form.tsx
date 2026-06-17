import * as React from "react"
import { useForm } from "react-hook-form"

import {
  Button,
  FormAsyncSelect,
  FormDateInput,
  FormDatePicker,
  FormDateRangeInput,
  FormDateRangePicker,
  FormFieldShell,
  FormInput,
  FormNumberInput,
  FormPasswordInput,
  FormPhoneInput,
  FormSearchInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  Input,
} from "@/index"
import type { ProductFormValues } from "./playground-data"
import { customerOptions } from "./playground-data"

export function PlaygroundForm() {
  const defaultValues: ProductFormValues = {
    search: "",
    name: "Premium Coffee",
    password: "secret123",
    phone: "998901234567",
    price: 42000,
    status: "active",
    customerId: "1",
    active: true,
    notes: "This form shows vertical, horizontal and inline field layouts.",
    availableFrom: "2026-06-17",
    dateFrom: "2026-06-01",
    dateTo: "2026-06-30",
    pickerDate: "2026-06-17",
    pickerRangeFrom: "2026-06-01",
    pickerRangeTo: "2026-06-30",
  }

  const form = useForm<ProductFormValues>({
    defaultValues,
    mode: "onChange",
  })
  const { handleSubmit, reset, setError, clearErrors, formState, control } = form
  const { isSubmitting, isDirty, isValid, isSubmitSuccessful } = formState
  const [isLocked, setIsLocked] = React.useState(false)
  const [isReadOnlyMode, setIsReadOnlyMode] = React.useState(false)
  const [manualError, setManualError] = React.useState(false)
  const [submitCount, setSubmitCount] = React.useState(0)
  const [asyncLookupError, setAsyncLookupError] = React.useState(false)
  const [mockLatency, setMockLatency] = React.useState(650)

  const fieldShellProps = {
    disabled: isLocked,
    readOnly: isReadOnlyMode,
  }

  const wait = React.useCallback((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)), [])

  const loadCustomerOptions = React.useCallback(
    async (query: string) => {
      await wait(mockLatency)

      if (asyncLookupError) {
        throw new Error("Network failure in mock lookup")
      }

      const normalized = query.trim().toLowerCase()

      return customerOptions.filter((item) => item.label.toLowerCase().includes(normalized))
    },
    [asyncLookupError, mockLatency, wait],
  )

  const loadSelectedCustomer = React.useCallback(
    async (value: string) => {
      await wait(150)

      return customerOptions.find((item) => item.value === value)
    },
    [wait],
  )

  React.useEffect(() => {
    if (manualError) {
      setError("name", { type: "manual", message: "Manual validation demo error: reserved product name." })
    } else {
      clearErrors("name")
    }
  }, [manualError, setError, clearErrors])

  const onSubmit = React.useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSubmitCount((value) => value + 1)
  }, [])

  return (
    <div className="grid gap-5">
      <div className="rounded-lg border bg-muted/40 p-3">
        <div className="grid gap-2 md:grid-cols-3">
          <Button
            type="button"
            variant={isLocked ? "secondary" : "outline"}
            onClick={() => setIsLocked((value) => !value)}
            size="sm"
          >
            {isLocked ? "Unlock form" : "Lock all fields"}
          </Button>
          <Button
            type="button"
            variant={isReadOnlyMode ? "secondary" : "outline"}
            onClick={() => setIsReadOnlyMode((value) => !value)}
            size="sm"
          >
            {isReadOnlyMode ? "Disable readOnly" : "Read-only mode"}
          </Button>
          <Button
            type="button"
            variant={manualError ? "secondary" : "outline"}
            onClick={() => setManualError((value) => !value)}
            size="sm"
          >
            {manualError ? "Clear manual error" : "Show manual error"}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => reset(defaultValues)}>
            Reset to defaults
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => reset({ ...defaultValues, name: "Starter Blend", status: "draft" })}
          >
            Prefill sample
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLocked}
          >
            {isSubmitting ? "Saving..." : "Run submit"}
          </Button>
          <Button
            type="button"
            variant={asyncLookupError ? "secondary" : "outline"}
            size="sm"
            onClick={() => setAsyncLookupError((value) => !value)}
          >
            {asyncLookupError ? "Async lookup OK" : "Async lookup error"}
          </Button>
          <Button
            type="button"
            variant={mockLatency === 250 ? "default" : "outline"}
            size="sm"
            onClick={() => setMockLatency(250)}
          >
            Latency 250ms
          </Button>
          <Button
            type="button"
            variant={mockLatency === 650 ? "default" : "outline"}
            size="sm"
            onClick={() => setMockLatency(650)}
          >
            Latency 650ms
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Dirty: {String(isDirty)} • Valid: {String(isValid)} • Submitting: {String(isSubmitting)} • Submitted:{` `}
          {String(isSubmitSuccessful)} • Last submits: {submitCount}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FormSearchInput
          control={control}
          name="search"
          label="Search"
          description="Search wrapper with clear action."
          {...fieldShellProps}
        />
        <FormInput
          control={control}
          name="name"
          label="Name"
          required
          description="Required field with custom marker."
          requiredIndicator={<span className="ml-1 text-primary">*</span>}
          {...fieldShellProps}
        />
        <FormPasswordInput control={control} name="password" label="Password" {...fieldShellProps} />
        <FormPhoneInput control={control} name="phone" label="Phone" valueMode="raw" {...fieldShellProps} />
        <FormNumberInput control={control} name="price" label="Price" min={0} {...fieldShellProps} />
        <FormDateInput control={control} name="availableFrom" label="Native date" {...fieldShellProps} />
      </div>

      <FormTextarea
        control={control}
        name="notes"
        label="Notes"
        layout="horizontal"
        description="Horizontal field layout with bottom description."
        descriptionPosition="bottom"
        {...fieldShellProps}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <FormSelect
          control={control}
          name="status"
          label="Status"
          layout="horizontal"
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Draft", value: "draft" },
          ]}
          {...fieldShellProps}
        />
        <FormAsyncSelect
          control={control}
          name="customerId"
          label="Customer"
          minSearchLength={1}
          defaultOptions={customerOptions}
          loadOptions={loadCustomerOptions}
          loadSelectedOption={loadSelectedCustomer}
          onCreateOption={async (value) => ({
            value: `mock-${value.toLowerCase().replace(/\s+/g, "-")}`,
            label: value,
            description: "Created in mock mode",
          })}
          labels={{
            placeholder: "Async lookup customer",
            loading: "Loading customers from mock service...",
            error: asyncLookupError ? "Lookup failed (mock error)" : "Could not load customers",
            minSearchLength: (count) => `Type at least ${count} chars`,
            empty: "No matches",
          }}
          {...fieldShellProps}
        />
      </div>

      <FormDateRangeInput
        control={control}
        fromName="dateFrom"
        toName="dateTo"
        label="Native period"
        {...fieldShellProps}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <FormDatePicker control={control} name="pickerDate" label="Calendar picker" {...fieldShellProps} />
        <FormDateRangePicker
          control={control}
          fromName="pickerRangeFrom"
          toName="pickerRangeTo"
          label="Calendar range"
          {...fieldShellProps}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FormSwitch
          control={control}
          name="active"
          label="Active product"
          description="Default label placement."
          {...fieldShellProps}
        />
        <FormSwitch
          control={control}
          name="active"
          label="Inline switch"
          labelPlacement="start"
          layout="inline"
          description="The same field with inline layout."
          {...fieldShellProps}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <FormFieldShell label="Read only" description="Visual read-only state." readOnly>
          <Input value="Read-only value" readOnly />
        </FormFieldShell>
        <FormFieldShell label="Disabled" description="Visual disabled state." disabled>
          <Input value="Disabled value" disabled />
        </FormFieldShell>
        <FormFieldShell label="Error" error="This field has an error." required>
          <Input aria-invalid />
        </FormFieldShell>
      </div>
    </div>
  )
}
