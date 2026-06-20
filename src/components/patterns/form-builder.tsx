import * as React from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { FormInput, type FormInputProps } from "@/components/form/form-input"
import { FormTextarea, type FormTextareaProps } from "@/components/form/form-textarea"
import { FormSelect, type FormSelectProps } from "@/components/form/form-select"
import { FormAsyncSelect, type FormAsyncSelectProps } from "@/components/form/form-async-select"
import { FormSwitch, type FormSwitchProps } from "@/components/form/form-switch"
import { FormNumberInput, type FormNumberInputProps } from "@/components/form/form-number-input"
import { FormPhoneInput, type FormPhoneInputProps } from "@/components/form/form-phone-input"
import { FormDateInput, type FormDateInputProps } from "@/components/form/form-date-input"
import {
  FormDateRangeInput,
  type FormDateRangeInputProps,
} from "@/components/form/form-date-range-input"
import { cn } from "@/lib/utils"

export type FormBuilderLayout = "grid" | "stack"
export type FormBuilderDensity = "compact" | "default" | "comfortable"

export type FormBuilderFieldRenderContext<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  disabled?: boolean
  readOnly?: boolean
}

type BaseFormBuilderField = {
  id: string
  hidden?: boolean
  className?: string
  colSpan?: 1 | 2 | 3 | 4 | "full"
}

export type FormBuilderCustomField<TFieldValues extends FieldValues> = BaseFormBuilderField & {
  type: "custom"
  render: (context: FormBuilderFieldRenderContext<TFieldValues>) => React.ReactNode
}

export type FormBuilderInputField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "input"
  props: Omit<FormInputProps<TFieldValues, TName>, "control">
}

export type FormBuilderTextareaField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "textarea"
  props: Omit<FormTextareaProps<TFieldValues, TName>, "control">
}

export type FormBuilderSelectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "select"
  props: Omit<FormSelectProps<TFieldValues, TName>, "control">
}

export type FormBuilderAsyncSelectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "async-select"
  props: Omit<FormAsyncSelectProps<TFieldValues, TName>, "control">
}

export type FormBuilderSwitchField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "switch"
  props: Omit<FormSwitchProps<TFieldValues, TName>, "control">
}

export type FormBuilderNumberField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "number"
  props: Omit<FormNumberInputProps<TFieldValues, TName>, "control">
}

export type FormBuilderPhoneField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "phone"
  props: Omit<FormPhoneInputProps<TFieldValues, TName>, "control">
}

export type FormBuilderDateField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "date"
  props: Omit<FormDateInputProps<TFieldValues, TName>, "control">
}

export type FormBuilderDateRangeField<
  TFieldValues extends FieldValues,
  TFromName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TToName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormBuilderField & {
  type: "date-range"
  props: Omit<FormDateRangeInputProps<TFieldValues, TFromName, TToName>, "control">
}

export type FormBuilderField<TFieldValues extends FieldValues> =
  | FormBuilderCustomField<TFieldValues>
  | FormBuilderInputField<TFieldValues>
  | FormBuilderTextareaField<TFieldValues>
  | FormBuilderSelectField<TFieldValues>
  | FormBuilderAsyncSelectField<TFieldValues>
  | FormBuilderSwitchField<TFieldValues>
  | FormBuilderNumberField<TFieldValues>
  | FormBuilderPhoneField<TFieldValues>
  | FormBuilderDateField<TFieldValues>
  | FormBuilderDateRangeField<TFieldValues>

export type FormBuilderSection<TFieldValues extends FieldValues> = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  hidden?: boolean
  className?: string
  fields: FormBuilderField<TFieldValues>[]
}

export type FormBuilderProps<TFieldValues extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "children"
> & {
  control: Control<TFieldValues>
  fields?: FormBuilderField<TFieldValues>[]
  sections?: FormBuilderSection<TFieldValues>[]
  layout?: FormBuilderLayout
  density?: FormBuilderDensity
  columns?: 1 | 2 | 3 | 4
  disabled?: boolean
  readOnly?: boolean
  footer?: React.ReactNode
  submitLabel?: React.ReactNode
  resetLabel?: React.ReactNode
  onResetClick?: () => void
  isSubmitting?: boolean
  sectionClassName?: string
  fieldClassName?: string
  footerClassName?: string
}

const densityClassName: Record<FormBuilderDensity, string> = {
  compact: "gap-3",
  default: "gap-4",
  comfortable: "gap-6",
}

const columnsClassName: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
}

const colSpanClassName: Record<NonNullable<BaseFormBuilderField["colSpan"]>, string> = {
  1: "col-span-1",
  2: "md:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
  full: "col-span-full",
}

function renderFormBuilderField<TFieldValues extends FieldValues>(
  field: FormBuilderField<TFieldValues>,
  context: FormBuilderFieldRenderContext<TFieldValues>
) {
  switch (field.type) {
    case "custom":
      return field.render(context)
    case "input":
      return React.createElement(FormInput as React.ComponentType<any>, {
        control: context.control,
        disabled: context.disabled,
        readOnly: context.readOnly,
        ...(field.props as Omit<FormInputProps<TFieldValues, FieldPath<TFieldValues>>, "control">),
      })
    case "textarea":
      return <FormTextarea control={context.control} disabled={context.disabled} readOnly={context.readOnly} {...field.props} />
    case "select":
      return React.createElement(FormSelect as React.ComponentType<any>, {
        control: context.control,
        disabled: context.disabled,
        ...(field.props as Omit<FormSelectProps<TFieldValues, FieldPath<TFieldValues>>, "control">),
      })
    case "async-select":
      return <FormAsyncSelect control={context.control} disabled={context.disabled} {...field.props} />
    case "switch":
      return <FormSwitch control={context.control} disabled={context.disabled} {...field.props} />
    case "number":
      return <FormNumberInput control={context.control} disabled={context.disabled} readOnly={context.readOnly} {...field.props} />
    case "phone":
      return <FormPhoneInput control={context.control} disabled={context.disabled} readOnly={context.readOnly} {...field.props} />
    case "date":
      return <FormDateInput control={context.control} disabled={context.disabled} readOnly={context.readOnly} {...field.props} />
    case "date-range":
      return (
        <FormDateRangeInput
          control={context.control}
          fromInputProps={{ disabled: context.disabled, readOnly: context.readOnly }}
          toInputProps={{ disabled: context.disabled, readOnly: context.readOnly }}
          {...field.props}
        />
      )
    default:
      return null
  }
}

function normalizeSections<TFieldValues extends FieldValues>({
  fields,
  sections,
}: Pick<FormBuilderProps<TFieldValues>, "fields" | "sections">): FormBuilderSection<TFieldValues>[] {
  if (sections?.length) return sections
  return [{ id: "default", fields: fields ?? [] }]
}

function FormBuilder<TFieldValues extends FieldValues>({
  className,
  control,
  fields,
  sections,
  layout = "grid",
  density = "default",
  columns = 2,
  disabled,
  readOnly,
  footer,
  submitLabel,
  resetLabel,
  onResetClick,
  isSubmitting,
  sectionClassName,
  fieldClassName,
  footerClassName,
  ...props
}: FormBuilderProps<TFieldValues>) {
  const normalizedSections = normalizeSections({ fields, sections })
  const context = React.useMemo(
    () => ({ control, disabled, readOnly }),
    [control, disabled, readOnly]
  )

  return (
    <form data-slot="form-builder" className={cn("grid", densityClassName[density], className)} {...props}>
      {normalizedSections
        .filter((section) => !section.hidden)
        .map((section) => (
          <section
            key={section.id}
            data-slot="form-builder-section"
            className={cn("grid gap-4", section.className, sectionClassName)}
          >
            {(section.title || section.description || section.actions) && (
              <div
                data-slot="form-builder-section-header"
                className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  {section.title && <h2 className="text-base font-semibold leading-none tracking-tight">{section.title}</h2>}
                  {section.description && <p className="text-sm text-muted-foreground">{section.description}</p>}
                </div>
                {section.actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{section.actions}</div>}
              </div>
            )}

            <div
              data-slot="form-builder-fields"
              data-layout={layout}
              className={cn(
                "grid",
                densityClassName[density],
                layout === "grid" ? columnsClassName[columns] : "grid-cols-1"
              )}
            >
              {section.fields
                .filter((field) => !field.hidden)
                .map((field) => (
                  <div
                    key={field.id}
                    data-slot="form-builder-field"
                    className={cn(
                      field.colSpan && colSpanClassName[field.colSpan],
                      field.className,
                      fieldClassName
                    )}
                  >
                    {renderFormBuilderField(field, context)}
                  </div>
                ))}
            </div>
          </section>
        ))}

      {(footer || submitLabel || resetLabel) && (
        <div data-slot="form-builder-footer" className={cn("flex flex-wrap items-center justify-end gap-2", footerClassName)}>
          {footer ?? (
            <>
              {resetLabel && (
                <Button type="button" variant="outline" disabled={disabled || isSubmitting} onClick={onResetClick}>
                  {resetLabel}
                </Button>
              )}
              {submitLabel && (
                <Button type="submit" disabled={disabled || isSubmitting}>
                  {submitLabel}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </form>
  )
}

export { FormBuilder, renderFormBuilderField }
