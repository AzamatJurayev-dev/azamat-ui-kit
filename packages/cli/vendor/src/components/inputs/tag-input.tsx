import * as React from "react"
import { XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
      <div className={cn("flex min-h-10 flex-wrap items-center gap-2 rounded-md border bg-background px-2 py-2", disabled && "opacity-60", readOnly && "bg-muted/30")}>
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
            {tag}
            {!readOnly && !disabled && (
              <button type="button" className="rounded-full p-0.5 hover:bg-muted" onClick={() => removeTag(tag)}>
                <XIcon className="size-3" />
              </button>
            )}
          </Badge>
        ))}
        {!readOnly && (
          <Input
            value={inputValue}
            disabled={disabled || (maxTags !== undefined && tags.length >= maxTags)}
            placeholder={placeholder}
            className="h-7 min-w-28 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
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
      </div>
    </div>
  )
}

export { TagInput }
