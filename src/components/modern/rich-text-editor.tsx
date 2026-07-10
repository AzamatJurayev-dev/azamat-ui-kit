"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type RichTextEditorProps = React.ComponentProps<"div"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  output?: "text" | "html"
  placeholder?: string
}

function RichTextEditor({
  value,
  defaultValue,
  onValueChange,
  output: _output,
  placeholder = "Start typing...",
  className,
  children,
  ...props
}: RichTextEditorProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "")
  const isControlled = value !== undefined
  const currentValue = isControlled ? value ?? "" : uncontrolledValue

  return (
    <div
      {...props}
      data-slot="rich-text-editor"
      className={cn(
        "min-h-28 rounded-[var(--aui-control-radius,var(--radius-md))] border border-[color:var(--aui-control-border-strong,var(--border))] bg-[color:var(--aui-control-surface,var(--background))] px-3 py-2 text-sm leading-6 text-foreground shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04))] outline-none transition-[background-color,border-color,box-shadow] focus-within:border-[color:var(--ring)] focus-within:shadow-[0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_4px_var(--aui-focus-ring-soft,transparent)]",
        className
      )}
    >
      <textarea
        value={currentValue}
        placeholder={placeholder}
        aria-multiline="true"
        className={cn(
          "min-h-20 w-full resize-none border-0 bg-transparent p-0 outline-none placeholder:text-muted-foreground/65"
        )}
        onChange={(event) => {
          const nextValue = event.currentTarget.value
          if (!isControlled) {
            setUncontrolledValue(nextValue)
          }
          onValueChange?.(nextValue)
        }}
      />
      {children}
    </div>
  )
}

export { RichTextEditor }
