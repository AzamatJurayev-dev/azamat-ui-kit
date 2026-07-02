import * as React from "react"

import { cn } from "@/lib/utils"

export type MentionOption = {
  label: React.ReactNode
  value: string
  searchText?: string
  insertValue?: string
}

export type MentionInputProps = Omit<React.ComponentProps<"textarea">, "value" | "defaultValue"> & {
  value?: string
  defaultValue?: string
  options?: MentionOption[]
  onMentionSelect?: (value: string) => void
  onValueChange?: (value: string) => void
  trigger?: string
  maxSuggestions?: number
}

function getTriggerMatch(value: string, selectionStart: number, trigger: string) {
  const prefix = value.slice(0, selectionStart)
  const triggerIndex = prefix.lastIndexOf(trigger)

  if (triggerIndex < 0) return null

  const previousCharacter = prefix[triggerIndex - 1]
  if (previousCharacter && /\S/.test(previousCharacter)) return null

  const query = prefix.slice(triggerIndex + trigger.length)
  if (/\s/.test(query)) return null

  return { triggerIndex, query }
}

function MentionInput({
  value,
  defaultValue = "",
  options = [],
  onMentionSelect,
  onValueChange,
  className,
  trigger = "@",
  maxSuggestions = 6,
  onChange,
  onKeyDown,
  ...props
}: MentionInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [selectionStart, setSelectionStart] = React.useState(0)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const currentValue = value ?? internalValue
  const triggerMatch = getTriggerMatch(currentValue, selectionStart, trigger)
  const filteredOptions = React.useMemo(() => {
    if (!triggerMatch) return []
    const normalizedQuery = triggerMatch.query.trim().toLowerCase()

    return options
      .filter((option) => {
        if (!normalizedQuery) return true
        const rawLabel = typeof option.label === "string" ? option.label : option.value
        const haystack = `${option.value} ${option.searchText ?? ""} ${rawLabel}`.toLowerCase()
        return haystack.includes(normalizedQuery)
      })
      .slice(0, maxSuggestions)
  }, [maxSuggestions, options, triggerMatch])
  const showSuggestions = filteredOptions.length > 0 && triggerMatch !== null

  React.useEffect(() => {
    if (!showSuggestions) setActiveIndex(0)
  }, [showSuggestions])

  function updateValue(nextValue: string, event?: React.ChangeEvent<HTMLTextAreaElement>) {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
    if (event) onChange?.(event)
  }

  function insertMention(option: MentionOption) {
    if (!triggerMatch) return

    const mentionValue = option.insertValue ?? option.value
    const nextValue = `${currentValue.slice(0, triggerMatch.triggerIndex)}${trigger}${mentionValue} ${currentValue.slice(selectionStart)}`
    const nextCursor = triggerMatch.triggerIndex + trigger.length + mentionValue.length + 1

    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
    onMentionSelect?.(option.value)

    requestAnimationFrame(() => {
      textareaRef.current?.focus()
      textareaRef.current?.setSelectionRange(nextCursor, nextCursor)
      setSelectionStart(nextCursor)
    })
  }

  return (
    <div data-slot="mention-input" className="grid gap-2">
      <textarea
        ref={textareaRef}
        value={currentValue}
        className={cn("min-h-24 rounded-md border bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
        onChange={(event) => {
          updateValue(event.target.value, event)
          setSelectionStart(event.target.selectionStart ?? event.target.value.length)
        }}
        onClick={(event) => setSelectionStart(event.currentTarget.selectionStart ?? 0)}
        onKeyUp={(event) => setSelectionStart(event.currentTarget.selectionStart ?? 0)}
        onKeyDown={(event) => {
          if (showSuggestions) {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setActiveIndex((current) => (current + 1) % filteredOptions.length)
              return
            }
            if (event.key === "ArrowUp") {
              event.preventDefault()
              setActiveIndex((current) => (current - 1 + filteredOptions.length) % filteredOptions.length)
              return
            }
            if (event.key === "Enter" || event.key === "Tab") {
              event.preventDefault()
              insertMention(filteredOptions[activeIndex] ?? filteredOptions[0])
              return
            }
            if (event.key === "Escape") {
              event.preventDefault()
              setSelectionStart(currentValue.length)
              return
            }
          }

          onKeyDown?.(event)
        }}
        {...props}
      />
      {showSuggestions ? (
        <div className="grid gap-1 rounded-xl border bg-card p-2 shadow-sm">
          {filteredOptions.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                index === activeIndex && "bg-muted"
              )}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => insertMention(option)}
            >
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">{trigger}{option.insertValue ?? option.value}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { MentionInput }
