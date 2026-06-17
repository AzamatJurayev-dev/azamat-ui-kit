import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { SearchInput, type SearchInputProps } from "@/components/inputs/search-input"

export type FormSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SearchInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    onValueChange?: (value: string) => void
  }

function FormSearchInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required,
  className,
  fieldClassName,
  onValueChange,
  ...props
}: FormSearchInputProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldShell
          label={label}
          description={description}
          required={required}
          error={fieldState.error?.message}
          className={className}
        >
          <SearchInput
            name={field.name}
            ref={field.ref}
            value={field.value ?? ""}
            inputClassName={fieldClassName}
            aria-invalid={fieldState.invalid || undefined}
            onBlur={field.onBlur}
            onValueChange={(value) => {
              field.onChange(value)
              onValueChange?.(value)
            }}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormSearchInput }
