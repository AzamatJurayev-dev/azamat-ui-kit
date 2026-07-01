import * as React from "react"

import { cn } from "@/lib/utils"

export type RichTextEditorProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

function RichTextEditor({ value, onValueChange, placeholder = "Write something...", className, ...props }: RichTextEditorProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (ref.current && value !== undefined && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value
    }
  }, [value])

  return (
    <div data-slot="rich-text-editor" className={cn("grid gap-2 rounded-lg border bg-background p-2", className)} {...props}>
      <div className="flex flex-wrap gap-1 border-b pb-2">
        {[
          ["bold", "B"],
          ["italic", "I"],
          ["underline", "U"],
        ].map(([command, label]) => (
          <button key={command} type="button" className="rounded border px-2 py-1 text-xs font-medium" onClick={() => document.execCommand(command)}>
            {label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        data-placeholder={placeholder}
        className="min-h-32 rounded-md p-2 text-sm outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        onInput={(event) => onValueChange?.(event.currentTarget.innerHTML)}
      />
    </div>
  )
}

export { RichTextEditor }
