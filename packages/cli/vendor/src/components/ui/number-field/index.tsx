"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type NumberFieldProps = NumberFieldPrimitive.Root.Props
export type NumberFieldGroupProps = NumberFieldPrimitive.Group.Props
export type NumberFieldInputProps = NumberFieldPrimitive.Input.Props
export type NumberFieldIncrementProps = NumberFieldPrimitive.Increment.Props
export type NumberFieldDecrementProps = NumberFieldPrimitive.Decrement.Props
export type NumberFieldScrubAreaProps = NumberFieldPrimitive.ScrubArea.Props
export type NumberFieldScrubAreaCursorProps = NumberFieldPrimitive.ScrubAreaCursor.Props

function NumberField({ className, ...props }: NumberFieldProps) {
  return <NumberFieldPrimitive.Root data-slot="number-field" className={cn("grid gap-2", className)} {...props} />
}

function NumberFieldGroup({ className, ...props }: NumberFieldGroupProps) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cn(
        "flex min-h-10 w-full overflow-hidden rounded-[var(--radius-md)] border border-input bg-background text-foreground shadow-xs transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/35 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldInput({ className, ...props }: NumberFieldInputProps) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn("min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function NumberFieldIncrement({ className, children, ...props }: NumberFieldIncrementProps) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      className={cn("flex h-5 w-8 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40", className)}
      {...props}
    >
      {children ?? <ChevronUpIcon aria-hidden="true" className="size-3.5" />}
    </NumberFieldPrimitive.Increment>
  )
}

function NumberFieldDecrement({ className, children, ...props }: NumberFieldDecrementProps) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      className={cn("flex h-5 w-8 items-center justify-center border-l border-t border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40", className)}
      {...props}
    >
      {children ?? <ChevronDownIcon aria-hidden="true" className="size-3.5" />}
    </NumberFieldPrimitive.Decrement>
  )
}

function NumberFieldStepper({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="number-field-stepper" className={cn("grid shrink-0 grid-rows-2", className)} {...props} />
}

function NumberFieldScrubArea({ className, ...props }: NumberFieldScrubAreaProps) {
  return <NumberFieldPrimitive.ScrubArea data-slot="number-field-scrub-area" className={cn("cursor-ew-resize select-none", className)} {...props} />
}

function NumberFieldScrubAreaCursor({ className, ...props }: NumberFieldScrubAreaCursorProps) {
  return <NumberFieldPrimitive.ScrubAreaCursor data-slot="number-field-scrub-area-cursor" className={cn("fixed z-50 rounded bg-foreground px-2 py-1 text-xs text-background shadow-lg", className)} {...props} />
}

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
  NumberFieldStepper,
}
