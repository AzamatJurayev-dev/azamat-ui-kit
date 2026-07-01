import * as React from "react"

import { cn } from "@/lib/utils"

export type CascaderOption = {
  label: React.ReactNode
  value: string
  children?: CascaderOption[]
}

export type CascaderProps = React.ComponentProps<"div"> & {
  options: CascaderOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}

function Cascader({ options, value = [], onValueChange, className, ...props }: CascaderProps) {
  const firstValue = value[0] ?? ""
  const secondOptions = options.find((item) => item.value === firstValue)?.children ?? []
  const secondValue = value[1] ?? ""
  const thirdOptions = secondOptions.find((item) => item.value === secondValue)?.children ?? []

  return (
    <div data-slot="cascader" className={cn("grid gap-2 sm:grid-cols-3", className)} {...props}>
      <select className="h-10 rounded-md border bg-background px-3 text-sm" value={firstValue} onChange={(event) => onValueChange?.([event.target.value])}>
        <option value="">Select</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <select className="h-10 rounded-md border bg-background px-3 text-sm" value={secondValue} disabled={!secondOptions.length} onChange={(event) => onValueChange?.([firstValue, event.target.value])}>
        <option value="">Select</option>
        {secondOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <select className="h-10 rounded-md border bg-background px-3 text-sm" value={value[2] ?? ""} disabled={!thirdOptions.length} onChange={(event) => onValueChange?.([firstValue, secondValue, event.target.value])}>
        <option value="">Select</option>
        {thirdOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  )
}

export { Cascader }
