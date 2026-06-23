import { FormAsyncSelect, FormSelect } from "@/components/form"
import { AsyncMultiSelect, AsyncSelect, Combobox, SimpleSelect } from "@/components/inputs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectFamily = {
  Root: Select,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Group: SelectGroup,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  Simple: SimpleSelect,
  Async: AsyncSelect,
  AsyncMulti: AsyncMultiSelect,
  Combobox,
  Form: {
    Select: FormSelect,
    Async: FormAsyncSelect,
  },
} as const

export { SelectFamily }
