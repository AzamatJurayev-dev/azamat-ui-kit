import { useMemo, useState } from "react"
import { Button, Calendar, DatePicker, DateRangePicker } from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage } from "./playground-ui"

type CalendarEvent = {
  id: string
  date: string
  title: string
}

const mockEvents: CalendarEvent[] = [
  { id: "e1", date: "2026-06-01", title: "Project kickoff" },
  { id: "e2", date: "2026-06-07", title: "Sprint planning" },
  { id: "e3", date: "2026-06-13", title: "Client sync" },
  { id: "e4", date: "2026-06-20", title: "Design review" },
  { id: "e5", date: "2026-06-28", title: "Release window" },
]

export function CalendarSection() {
  const [calendarDate, setCalendarDate] = useState("2026-06-17")
  const [calendarRange, setCalendarRange] = useState({ from: "", to: "" })
  const [pickerDate, setPickerDate] = useState("2026-06-17")
  const [pickerRange, setPickerRange] = useState({ from: "2026-06-01", to: "2026-06-30" })
  const [limitedRange, setLimitedRange] = useState({ from: "2026-06-10", to: "2026-06-14" })
  const [pickerLocked, setPickerLocked] = useState(false)
  const [calendarLoading, setCalendarLoading] = useState(false)
  const [calendarError, setCalendarError] = useState(false)
  const [showConstraints, setShowConstraints] = useState(true)
  const [history, setHistory] = useState<string[]>([
    "2026-06-17: Calendar loaded with default ranges.",
    "2026-06-01: 5 mock events available.",
  ])

  const addHistory = (message: string) => {
    setHistory((value) => [`${new Date().toLocaleTimeString("en-GB")} • ${message}`, ...value.slice(0, 6)])
  }

  const totalRangeDays = useMemo(() => {
    const hasFrom = calendarRange.from.trim().length > 0
    const hasTo = calendarRange.to.trim().length > 0

    if (!hasFrom || !hasTo) return 0

    const fromDate = new Date(calendarRange.from)
    const toDate = new Date(calendarRange.to)

    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) return 0

    const diff = toDate.getTime() - fromDate.getTime()

    return Math.max(1, Math.ceil(diff / 86400000) + 1)
  }, [calendarRange])

  const rangeEvents = useMemo(
    () =>
      mockEvents.filter((event) => {
        if (!calendarRange.from || !calendarRange.to) return false
        return event.date >= calendarRange.from && event.date <= calendarRange.to
      }),
    [calendarRange],
  )

  const setRangePreset = (preset: "week" | "month" | "quarter") => {
    if (calendarLoading) return

    if (preset === "week") {
      setCalendarRange({ from: "2026-06-17", to: "2026-06-23" })
      addHistory("Range preset applied: Last 7 days window.")
    }

    if (preset === "month") {
      setCalendarRange({ from: "2026-06-01", to: "2026-06-30" })
      addHistory("Range preset applied: Full June window.")
    }

    if (preset === "quarter") {
      setCalendarRange({ from: "2026-05-01", to: "2026-06-30" })
      addHistory("Range preset applied: Quarter sample.")
    }
  }

  const clearDateState = () => {
    setCalendarDate("2026-06-17")
    setCalendarRange({ from: "", to: "" })
    setPickerDate("2026-06-17")
    setPickerRange({ from: "", to: "" })
    addHistory("Date state reset.")
  }

  return (
    <DemoSection
      sectionIndex={7}
      id="calendar"
      title="Calendar and pickers"
      description="Single/range calendar and picker controls with mock analytics, presets and validation."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCalendarLoading((value) => !value)}
        >
          {calendarLoading ? "Stop async mode" : "Simulate async mode"}
        </Button>
        <Button
          variant={calendarError ? "secondary" : "outline"}
          size="sm"
          onClick={() => {
            setCalendarError((value) => !value)
            addHistory(calendarError ? "Calendar error cleared." : "Calendar error simulated.")
          }}
        >
          {calendarError ? "Clear error" : "Simulate error"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setRangePreset("week")}>
          Preset: Week
        </Button>
        <Button variant="outline" size="sm" onClick={() => setRangePreset("month")}>
          Preset: Month
        </Button>
        <Button variant="outline" size="sm" onClick={() => setRangePreset("quarter")}>
          Preset: Quarter
        </Button>
        <Button variant={pickerLocked ? "secondary" : "outline"} size="sm" onClick={() => setPickerLocked((value) => !value)}>
          {pickerLocked ? "Enable pickers" : "Lock pickers"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowConstraints((value) => !value)}>
          Constraints: {showConstraints ? "ON" : "OFF"}
        </Button>
        <Button variant="outline" size="sm" onClick={clearDateState}>
          Clear selections
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <PlaygroundCard title="Calendar single" description="Primary single date selection">
          <Calendar
            value={calendarDate}
            onValueChange={(value) => {
              setCalendarDate(value)
              addHistory(`Single date set to ${value}.`)
            }}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Status: {calendarLoading ? "loading" : calendarError ? "error" : "ready"} • Selected: {calendarDate || "—"}
          </p>
        </PlaygroundCard>

        <PlaygroundCard title="Calendar range" description="Range selection + event count">
          <Calendar
            mode="range"
            range={calendarRange}
            onRangeChange={(value) => {
              setCalendarRange({ from: value.from ?? "", to: value.to ?? "" })
              addHistory(`Range changed to ${value.from || "—"} / ${value.to || "—"}.`)
            }}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Days: {totalRangeDays} • In-window events: {rangeEvents.length}
          </p>
        </PlaygroundCard>

        <PlaygroundCard title="DatePicker" description="Popover date input">
          <DatePicker
            value={pickerDate}
            onValueChange={(value) => {
              setPickerDate(value)
              addHistory(`DatePicker changed to ${value}.`)
            }}
            disabled={pickerLocked}
          />
          <p className="mt-2 text-xs text-muted-foreground">ISO date: {pickerDate}</p>
        </PlaygroundCard>

        <PlaygroundCard title="DateRangePicker" description="Pair selector and validation">
          <DateRangePicker
            value={pickerRange}
            onValueChange={(value) => {
              const next = { from: value.from ?? "", to: value.to ?? "" }
              setPickerRange(next)
              addHistory(`Picker range changed to ${next.from || "—"} / ${next.to || "—"}.`)
            }}
            disabled={pickerLocked}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {pickerRange.from && pickerRange.to ? `${pickerRange.from} → ${pickerRange.to}` : "Empty range"}
          </p>
        </PlaygroundCard>

        <PlaygroundCard title="Calendar constraints" description="Min/max + disabled date handling">
          <p className="text-xs text-muted-foreground">Min/max + disabled dates in action mode.</p>
          <Calendar
            value={limitedRange.from}
            min={showConstraints ? "2026-06-01" : undefined}
            max={showConstraints ? "2026-06-30" : undefined}
            disabledDates={showConstraints ? ["2026-06-18", "2026-06-24"] : []}
            range={limitedRange}
            onRangeChange={(value) => setLimitedRange({ from: value.from ?? "", to: value.to ?? "" })}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Window: {limitedRange.from || "—"} → {limitedRange.to || "—"}
          </p>
        </PlaygroundCard>

        <PlaygroundCard title="Calendar diagnostics" description="Mock event list and timeline">
          <div className="space-y-2 text-xs">
            <p className="text-muted-foreground">{calendarError ? "Error mode is on" : "Live events in selected period"}</p>
            {rangeEvents.length === 0 ? (
              <p className="text-muted-foreground">No mock events in selected range.</p>
            ) : (
              rangeEvents.map((event) => (
                <p key={event.id} className="rounded border border-border/70 bg-muted/30 px-2 py-1">
                  {event.date}: {event.title}
                </p>
              ))
            )}
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Calendar change feed" description="Recent interaction history">
          <div className="space-y-2 text-xs">
            {history.slice(0, 8).map((item) => (
              <p key={item} className="truncate rounded border border-border/70 bg-muted/20 px-2 py-1 text-muted-foreground">
                {item}
              </p>
            ))}
          </div>
        </PlaygroundCard>
      </div>

      <PlaygroundUsage
        title="Date usage"
        items={[
          "Use `Calendar` for inline date selection and `DatePicker` for form popover selection.",
          "Use one source of truth for `from` and `to` ranges and compute derived analytics (days/events).",
          "Expose loading/error toggles to mimic API boundaries for production-ready date tooling.",
        ]}
        code={`const [range, setRange] = useState({ from: \"\", to: \"\" })\n<Calendar mode=\"range\" range={range} onRangeChange={setRange} />`}
      />
    </DemoSection>
  )
}
