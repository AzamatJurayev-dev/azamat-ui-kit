import * as React from "react"

import { Button } from "@/components/ui/button"

export type FileUploadProps = Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> & {
  files?: File[]
  onFilesChange?: (files: File[]) => void
  buttonLabel?: React.ReactNode
}

function FileUpload({ files = [], onFilesChange, buttonLabel = "Choose files", disabled, ...props }: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onFilesChange?.(Array.from(event.target.files ?? []))
    event.target.value = ""
  }

  return (
    <div data-slot="file-upload" className="grid gap-2">
      <input ref={inputRef} type="file" className="sr-only" disabled={disabled} onChange={handleChange} {...props} />
      <Button type="button" variant="outline" disabled={disabled} onClick={() => inputRef.current?.click()}>
        {buttonLabel}
      </Button>
      {files.length > 0 && (
        <div className="grid gap-1 text-sm text-muted-foreground">
          {files.map((file, index) => <div key={file.name + index}>{file.name}</div>)}
        </div>
      )}
    </div>
  )
}

export { FileUpload }
