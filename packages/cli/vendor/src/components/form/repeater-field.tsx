import * as React from "react"
import { PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type RepeaterFieldProps<T> = Omit<React.ComponentProps<"div">, "value" | "onChange"> & {
  value: T[]
  onValueChange: (value: T[]) => void
  renderItem: (item: T, index: number, helpers: { remove: () => void; update: (item: T) => void }) => React.ReactNode
  createItem: () => T
  addLabel?: React.ReactNode
  max?: number
  min?: number
  disabled?: boolean
}

function RepeaterField<T>({
  value,
  onValueChange,
  renderItem,
  createItem,
  addLabel = "Add item",
  max = Infinity,
  min = 0,
  disabled = false,
  className,
  ...props
}: RepeaterFieldProps<T>) {
  const handleAdd = () => {
    if (value.length < max) {
      onValueChange([...value, createItem()])
    }
  }

  const handleRemove = (indexToRemove: number) => {
    if (value.length > min) {
      onValueChange(value.filter((_, index) => index !== indexToRemove))
    }
  }

  const handleUpdate = (indexToUpdate: number, newItem: T) => {
    const newItems = [...value]
    newItems[indexToUpdate] = newItem
    onValueChange(newItems)
  }

  const canAdd = value.length < max && !disabled
  const canRemove = value.length > min && !disabled

  return (
    <div data-slot="repeater-field" className={cn("flex flex-col gap-4", className)} {...props}>
      {value.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            {renderItem(item, index, {
              remove: () => handleRemove(index),
              update: (newItem: T) => handleUpdate(index, newItem),
            })}
          </div>
          {canRemove && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => handleRemove(index)}
              aria-label="Remove item"
            >
              <Trash2Icon className="size-4" />
            </Button>
          )}
        </div>
      ))}
      {canAdd && (
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdd}
            className="w-full sm:w-auto"
          >
            <PlusIcon className="mr-2 size-4" />
            {addLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export { RepeaterField }
