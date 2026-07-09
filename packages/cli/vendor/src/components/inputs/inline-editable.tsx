"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type InlineEditableProps = Omit<React.ComponentProps<"div">, "value" | "onChange"> & {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  inputClassName?: string
  displayClassName?: string
}

function InlineEditable({
  value,
  onValueChange,
  placeholder = "Click to edit",
  disabled,
  className,
  inputClassName,
  displayClassName,
  ...props
}: InlineEditableProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editValue, setEditValue] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setEditValue(value)
  }, [value])

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleCommit = () => {
    if (!disabled) {
      onValueChange(editValue)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleCommit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div data-slot="inline-editable-input-mode" className={cn("flex items-center gap-1", className)} {...props}>
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleCommit}
          disabled={disabled}
          placeholder={placeholder}
          className={cn("h-8 text-sm", inputClassName)}
        />
      </div>
    )
  }

  return (
    <div
      data-slot="inline-editable"
      className={cn(
        "group flex items-center gap-1.5 rounded-md border border-transparent px-1.5 py-1 -ml-1.5 transition-colors",
        !disabled && "cursor-pointer hover:bg-muted/50",
        className
      )}
      onClick={() => {
        if (!disabled) {
          setIsEditing(true)
        }
      }}
      tabIndex={disabled ? undefined : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          setIsEditing(true)
        }
      }}
      {...props}
    >
      <span
        className={cn(
          "truncate text-sm",
          !value && "text-muted-foreground italic",
          disabled && "opacity-50",
          displayClassName
        )}
      >
        {value || placeholder}
      </span>
    </div>
  )
}

export { InlineEditable }
