import * as React from "react"

import { cn } from "@/lib/utils"

export type FileDropzoneProps = Omit<React.ComponentProps<"input">, "type" | "onChange"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  value?: File[]
  onFilesChange?: (files: File[]) => void
  containerClassName?: string
}

function FileDropzone({ label = "Drop files here", description, value, onFilesChange, containerClassName, className, multiple = true, ...props }: FileDropzoneProps) {
  const inputId = React.useId()
  const files = value ?? []

  return (
    <label
      htmlFor={inputId}
      data-slot="file-dropzone"
      className={cn("flex cursor-pointer flex-col items-center justify-center rounded-[var(--radius-2xl)] border border-dashed border-border/80 bg-muted/35 p-6 text-center transition hover:border-ring/45 hover:bg-muted/55", containerClassName)}
    >
      <span className="font-medium text-foreground">{label}</span>
      {description ? <span className="mt-1 text-sm text-muted-foreground">{description}</span> : null}
      {files.length ? <span className="mt-3 text-xs text-muted-foreground">{files.length} file selected</span> : null}
      <input
        id={inputId}
        type="file"
        multiple={multiple}
        className={cn("sr-only", className)}
        onChange={(event) => onFilesChange?.(Array.from(event.currentTarget.files ?? []))}
        {...props}
      />
    </label>
  )
}

export { FileDropzone }
