"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type TagInputProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxTags?: number
  allowDuplicates?: boolean
  separators?: string[]
  normalizeTag?: (tag: string) => string
}

function TagInput({
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Add tag...",
  disabled = false,
  readOnly = false,
  maxTags,
  allowDuplicates = false,
  separators = [",", "Enter"],
  normalizeTag = (tag) => tag.trim(),
  className,
  ...props
}: TagInputProps) {
  const controlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [inputValue, setInputValue] = React.useState("")
  const tags = controlled ? value : internalValue
  const atLimit = maxTags !== undefined && tags.length >= maxTags

  const setTags = React.useCallback(
    (nextTags: string[]) => {
      if (!controlled) setInternalValue(nextTags)
      onValueChange?.(nextTags)
    },
    [controlled, onValueChange]
  )

  const addTag = React.useCallback(
    (rawTag: string) => {
      const tag = normalizeTag(rawTag)
      if (!tag) return
      if (maxTags !== undefined && tags.length >= maxTags) return
      if (!allowDuplicates && tags.includes(tag)) return
      setTags([...tags, tag])
      setInputValue("")
    },
    [allowDuplicates, maxTags, normalizeTag, setTags, tags]
  )

  const removeTag = React.useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove))
    },
    [setTags, tags]
  )

  return (
    <div data-slot="tag-input" className={cn("grid gap-2", className)} {...props}>
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-[3px] focus-within:ring-primary/20",
          disabled && "opacity-50 cursor-not-allowed",
          readOnly && "bg-muted/50"
        )}
      >
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex h-7 items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2.5 pr-1.5 text-xs font-medium hover:bg-muted/80 transition-colors"
          >
            <span className="leading-none">{tag}</span>
            {!readOnly && !disabled && (
              <button
                type="button"
                className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground/70 transition-colors hover:bg-muted-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Remove ${tag}`}
                onClick={(event) => {
                  stopInteractivePropagation(event)
                  removeTag(tag)
                }}
                onMouseDown={stopInteractivePropagation}
                onDoubleClick={stopInteractivePropagation}
              >
                <XIcon className="size-3" strokeWidth={2.25} />
              </button>
            )}
          </Badge>
        ))}
        {!readOnly && (
          <Input
            value={inputValue}
            disabled={disabled || atLimit}
            placeholder={placeholder}
            className="h-7 min-w-[100px] flex-1 border-0 bg-transparent px-1 p-0 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none"
            onChange={(event) => setInputValue(event.target.value)}
            onBlur={() => addTag(inputValue)}
            onKeyDown={(event) => {
              if (separators.includes(event.key)) {
                event.preventDefault()
                addTag(inputValue)
              }
              if (event.key === "Backspace" && !inputValue && tags.length) {
                removeTag(tags[tags.length - 1])
              }
            }}
          />
        )}
        {maxTags !== undefined && (
          <span className="ml-auto text-xs font-medium text-muted-foreground">
            {tags.length}/{maxTags}
          </span>
        )}
      </div>
    </div>
  )
}

export { TagInput }
