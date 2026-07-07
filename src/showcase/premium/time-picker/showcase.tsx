import * as React from "react"

import { DateTimePicker, TimePicker, TimeRangePicker } from "@/index"

export function TimePickerShowcase() {
  const [time, setTime] = React.useState("09:30")
  const [dateTime, setDateTime] = React.useState("2026-07-07T09:30")
  const [from, setFrom] = React.useState("08:00")
  const [to, setTo] = React.useState("18:00")

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <TimePicker label="Start time" value={time} onChange={(event) => setTime(event.target.value)} />
        <DateTimePicker label="Event datetime" value={dateTime} onChange={(event) => setDateTime(event.target.value)} />
      </div>
      <div className="space-y-2">
        <TimeRangePicker from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
        <p className="text-sm text-muted-foreground">Range: {from} → {to}</p>
      </div>
      <p className="text-sm text-muted-foreground">Time: {time}, Datetime: {dateTime}</p>
    </div>
  )
}

