import { useMemo, useState } from "react"
import { CalendarCheckIcon, CalendarRangeIcon, ClockIcon, ListTodoIcon } from "lucide-react"

import { Badge, Button, Calendar, Card, CardContent, CardDescription, CardHeader, CardTitle, ComponentPreview, DatePicker, DateRangePicker, StatusBadge } from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid, TokenPill } from "./playground-ui"

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
      eyebrow="Date controls"
      title="Calendar and pickers"
      description="Single/range calendar and picker controls with presets, constraints, derived analytics and interaction history."
      action={<StatusBadge tone={calendarError ? "danger" : calendarLoading ? "info" : "success"} dot>{calendarError ? "Error" : calendarLoading ? "Async" : "Ready"}</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Selected date</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl"><CalendarCheckIcon className="size-5 text-primary" />{calendarDate}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Single calendar state</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Range days</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl"><CalendarRangeIcon className="size-5 text-primary" />{totalRangeDays}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Derived from from/to keys</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Events</CardDescription>
            <CardTitle className="text-3xl">{rangeEvents.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">In selected range</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Constraints</CardDescription>
            <CardTitle className="text-2xl">{showConstraints ? "ON" : "OFF"}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Min/max + disabled dates</CardContent>
        </Card>
      </section>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="Date controls" description="Preset ranges and state toggles." badge={<Badge variant="outline">interactive</Badge>}>
          <div className="flex flex-wrap gap-2">
            <Button variant={calendarLoading ? "default" : "outline"} size="sm" onClick={() => setCalendarLoading((value) => !value)}>
              {calendarLoading ? "Stop async" : "Async mode"}
            </Button>
            <Button variant={calendarError ? "default" : "outline"} size="sm" onClick={() => { setCalendarError((value) => !value); addHistory(calendarError ? "Calendar error cleared." : "Calendar error simulated.") }}>
              {calendarError ? "Clear error" : "Simulate error"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setRangePreset("week")}>Week</Button>
            <Button variant="outline" size="sm" onClick={() => setRangePreset("month")}>Month</Button>
            <Button variant="outline" size="sm" onClick={() => setRangePreset("quarter")}>Quarter</Button>
            <Button variant={pickerLocked ? "default" : "outline"} size="sm" onClick={() => setPickerLocked((value) => !value)}>
              {pickerLocked ? "Unlock pickers" : "Lock pickers"}
            </Button>
            <Button variant={showConstraints ? "default" : "outline"} size="sm" onClick={() => setShowConstraints((value) => !value)}>
              Constraints
            </Button>
            <Button variant="outline" size="sm" onClick={clearDateState}>Clear</Button>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Date model" description="Values stay as YYYY-MM-DD strings." badge={<Badge variant="outline">API-free</Badge>}>
          <div className="flex flex-wrap gap-2">
            <TokenPill>value="2026-06-17"</TokenPill>
            <TokenPill>range=&#123;&#123; from, to &#125;&#125;</TokenPill>
            <TokenPill>onValueChange</TokenPill>
            <TokenPill>onRangeChange</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">The component does not parse API date payloads. Apps pass normalized values and own timezone decisions.</p>
        </PlaygroundCard>

        <PlaygroundCard title="Change feed" description="Recent interactions for manual QA." badge={<Badge variant="outline">history</Badge>}>
          <div className="space-y-2 text-xs">
            {history.slice(0, 6).map((item) => (
              <p key={item} className="truncate rounded border bg-muted/20 px-2 py-1 text-muted-foreground">
                <ClockIcon className="mr-1 inline size-3" />
                {item}
              </p>
            ))}
          </div>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Calendar suite"
        description="Inline single/range calendars, popover pickers, constraints and event diagnostics."
        dependencies={["Calendar", "DatePicker", "DateRangePicker"]}
        code={`<Calendar value={date} onValueChange={setDate} />
<Calendar mode="range" range={range} onRangeChange={setRange} />
<DateRangePicker value={range} onValueChange={setRange} />`}
      >
        <div className="grid w-full gap-4 xl:grid-cols-4">
          <PlaygroundCard title="Calendar single" description="Primary single date selection">
            <Calendar
              value={calendarDate}
              onValueChange={(value) => {
                setCalendarDate(value)
                addHistory(`Single date set to ${value}.`)
              }}
            />
            <p className="mt-2 text-xs text-muted-foreground">Selected: {calendarDate || "—"}</p>
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
            <p className="mt-2 text-xs text-muted-foreground">Days: {totalRangeDays} • Events: {rangeEvents.length}</p>
          </PlaygroundCard>

          <PlaygroundCard title="Pickers" description="Popover date inputs">
            <div className="grid gap-3">
              <DatePicker
                value={pickerDate}
                onValueChange={(value) => { setPickerDate(value); addHistory(`DatePicker changed to ${value}.`) }}
                disabled={pickerLocked}
              />
              <DateRangePicker
                value={pickerRange}
                onValueChange={(value) => {
                  const next = { from: value.from ?? "", to: value.to ?? "" }
                  setPickerRange(next)
                  addHistory(`Picker range changed to ${next.from || "—"} / ${next.to || "—"}.`)
                }}
                disabled={pickerLocked}
              />
              <p className="text-xs text-muted-foreground">{pickerRange.from && pickerRange.to ? `${pickerRange.from} → ${pickerRange.to}` : "Empty range"}</p>
            </div>
          </PlaygroundCard>

          <PlaygroundCard title="Constraints and events" description="Min/max + disabled date handling">
            <Calendar
              value={limitedRange.from}
              min={showConstraints ? "2026-06-01" : undefined}
              max={showConstraints ? "2026-06-30" : undefined}
              disabledDates={showConstraints ? ["2026-06-18", "2026-06-24"] : []}
              range={limitedRange}
              onRangeChange={(value) => setLimitedRange({ from: value.from ?? "", to: value.to ?? "" })}
            />
            <div className="mt-3 space-y-1 text-xs">
              <p className="text-muted-foreground">Window: {limitedRange.from || "—"} → {limitedRange.to || "—"}</p>
              {rangeEvents.length === 0 ? (
                <p className="text-muted-foreground">No mock events in selected range.</p>
              ) : (
                rangeEvents.map((event) => (
                  <p key={event.id} className="rounded border bg-muted/20 px-2 py-1">
                    <ListTodoIcon className="mr-1 inline size-3" />
                    {event.date}: {event.title}
                  </p>
                ))
              )}
            </div>
          </PlaygroundCard>
        </div>
      </ComponentPreview>

      <PlaygroundUsage
        title="Date usage"
        items={[
          "Use `Calendar` for inline date selection and `DatePicker` for popover form selection.",
          "Store date values as normalized strings so app-level timezone/API logic remains outside the UI kit.",
          "Use derived analytics like selected days and events in the app layer, then display them next to the picker.",
          "Use min/max and disabledDates for UX constraints, but still validate real date rules server-side.",
        ]}
        code={`const [range, setRange] = useState({ from: "", to: "" })

<Calendar mode="range" range={range} onRangeChange={setRange} />`}
      />
    </DemoSection>
  )
}
