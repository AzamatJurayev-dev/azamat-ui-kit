import { useState } from "react"

import { Calendar } from "@/components/calendar/calendar"
import { DatePicker } from "@/components/calendar/date-picker"
import { Pagination } from "@/components/navigation/pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CalendarSection() {
  const [date, setDate] = useState("2026-07-15")
  const [page, setPage] = useState(2)

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[1fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Single/range capable calendar module.</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar value={date} onValueChange={setDate} showTodayShortcut showClearShortcut showSelectionSummary />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>DatePicker and pagination</CardTitle>
          <CardDescription>Popover date picker plus navigation pagination.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <DatePicker value={date} onValueChange={setDate} />
          <Pagination page={page} pageCount={9} onPageChange={setPage} showSummary totalCount={90} pageSize={10} />
        </CardContent>
      </Card>
    </div>
  )
}
