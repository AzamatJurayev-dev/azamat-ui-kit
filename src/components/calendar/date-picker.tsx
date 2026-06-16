import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Calendar, type CalendarProps } from "@/components/calendar/calendar"
import { cn } from "@/lib/utils"

export type DatePickerProps = CalendarProps & {
  icon?: React.ReactNode
  wrapperClassName?: string
}

function DatePicker({ icon, wrapperClassName, className, ...props }: DatePickerProps) {
  return (
    <div data-slot="date-picker" className={cn("relative w-full", wrapperClassName)}>
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
        {icon ?? <CalendarIcon />}
      </span>
      <Calendar className={cn("pl-8", className)} {...props} />
    </div>
  )
}

export { DatePicker }
