const DATE_KEY_REGEXP = /^\d{4}-\d{2}-\d{2}$/

export type DateKey = string
export type WeekStartsOn = 0 | 1
export type CalendarDateInput = Date | string | null | undefined
export type CalendarLocale = string | string[]
export type CalendarMonth = Date

function padDatePart(value: number): string {
  return String(value).padStart(2, "0")
}

function toDateKey(date: Date): DateKey {
  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`
}

function parseDateKey(value?: string | null): Date | null {
  if (!value || !DATE_KEY_REGEXP.test(value)) return null

  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }

  return date
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function isSameMonth(left: Date, right: Date): boolean {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth()
}

function isBeforeDate(left: DateKey, right?: DateKey | null): boolean {
  return Boolean(right && left < right)
}

function isAfterDate(left: DateKey, right?: DateKey | null): boolean {
  return Boolean(right && left > right)
}

function isWithinRange(
  date: DateKey,
  from?: DateKey | null,
  to?: DateKey | null
): boolean {
  if (!from || !to) return false
  return date >= from && date <= to
}

function getMonthLabel(date: Date, locale: CalendarLocale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(date)
}

function getWeekdayLabels(
  locale: CalendarLocale = "en-US",
  weekStartsOn: WeekStartsOn = 1
): string[] {
  const baseDate = new Date(2024, 0, weekStartsOn === 1 ? 1 : 7)

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + index)
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date)
  })
}

function getMonthDays(month: Date, weekStartsOn: WeekStartsOn = 1): CalendarMonth[] {
  const start = startOfMonth(month)
  const dayOfWeek = start.getDay()
  const offset = weekStartsOn === 1 ? (dayOfWeek + 6) % 7 : dayOfWeek
  const firstVisibleDay = new Date(start)
  firstVisibleDay.setDate(start.getDate() - offset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstVisibleDay)
    date.setDate(firstVisibleDay.getDate() + index)
    return date
  })
}

export {
  addMonths,
  getMonthDays,
  getMonthLabel,
  getWeekdayLabels,
  isAfterDate,
  isBeforeDate,
  isSameMonth,
  isWithinRange,
  parseDateKey,
  startOfMonth,
  toDateKey,
}
