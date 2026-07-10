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
          "flex min-h-12 flex-wrap items-center gap-2 rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:color-mix(in_srgb,var(--aui-control-bg)_78%,white_22%)] px-3 py-2.5 shadow-sm transition focus-within:border-[color:var(--aui-brand-strong)] focus-within:ring-4 focus-within:ring-[color:color-mix(in_srgb,var(--aui-brand-strong)_14%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--aui-control-bg)_90%,black_10%)]",
          disabled && "opacity-60",
          readOnly && "bg-muted/30"
        )}
      >
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="h-8 gap-1 rounded-full border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg)] px-3 pr-1 text-[13px] font-medium shadow-sm"
          >
            {tag}
            {!readOnly && !disabled && (
              <button
                type="button"
                className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground transition hover:bg-[color:var(--aui-control-bg)] hover:text-foreground"
                onClick={(event) => {
                  stopInteractivePropagation(event)
                  removeTag(tag)
                }}
                onMouseDown={stopInteractivePropagation}
                onDoubleClick={stopInteractivePropagation}
              >
                <XIcon className="size-3" />
              </button>
            )}
          </Badge>
        ))}
        {!readOnly && (
          <Input
            value={inputValue}
            disabled={disabled || atLimit}
            placeholder={placeholder}
            className="h-8 min-w-32 flex-1 border-0 bg-transparent px-1 text-sm shadow-none placeholder:text-[color:var(--aui-text-muted)] focus-visible:ring-0"
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
