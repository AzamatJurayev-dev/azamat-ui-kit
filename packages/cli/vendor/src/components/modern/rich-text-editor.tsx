import * as React from "react"

import { cn } from "@/lib/utils"

export type RichTextEditorProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  output?: "html" | "text"
  disabled?: boolean
}

function RichTextEditor({ value, onValueChange, placeholder = "Write something...", output = "html", disabled = false, className, ...props }: RichTextEditorProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (ref.current && value !== undefined && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value
    }
  }, [value])

  return (
    <div data-slot="rich-text-editor" data-disabled={disabled || undefined} className={cn("grid gap-2 rounded-lg border bg-background p-2", disabled && "opacity-60", className)} {...props}>
      <div className="flex flex-wrap gap-1 border-b pb-2">
        {[
          ["bold", "B"],
          ["italic", "I"],
          ["underline", "U"],
        ].map(([command, label]) => (
          <button key={command} type="button" disabled={disabled} className="rounded border px-2 py-1 text-xs font-medium disabled:opacity-50" onClick={() => document.execCommand(command)}>
            {label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable={!disabled}
        aria-disabled={disabled || undefined}
        data-placeholder={placeholder}
        className="min-h-32 rounded-md p-2 text-sm outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        onInput={(event) => onValueChange?.(output === "text" ? event.currentTarget.textContent ?? "" : event.currentTarget.innerHTML)}
      />
    </div>
  )
}

export { RichTextEditor }
