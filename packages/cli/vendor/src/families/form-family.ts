import {
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
} from "@/components/form"
import { FormBuilder } from "@/components/patterns/form-builder"

const FormFamily = {
  Field: FormFieldShell,
  Input: FormInput,
  Textarea: FormTextarea,
  Select: FormSelect,
  AsyncSelect: FormAsyncSelect,
  Switch: FormSwitch,
  Search: FormSearchInput,
  Password: FormPasswordInput,
  Number: FormNumberInput,
  Phone: FormPhoneInput,
  Date: FormDateInput,
  DateRange: FormDateRangeInput,
  DatePicker: FormDatePicker,
  DateRangePicker: FormDateRangePicker,
  Builder: FormBuilder,
} as const

export { FormFamily }
