import * as React from "react"
import { UploadIcon } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"

export type TableImportButtonProps = Omit<ButtonProps, "onChange"> & {
  accept?: string
  multiple?: boolean
  label?: React.ReactNode
  inputName?: string
  onFilesSelect?: (files: File[]) => void
  onFileSelect?: (file: File) => void
}

function TableImportButton({ accept = ".csv,.xlsx,.xls", multiple = false, label = "Import", inputName, onFilesSelect, onFileSelect, disabled, children, ...props }: TableImportButtonProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={() => inputRef.current?.click()} {...props}>
        <UploadIcon data-icon="inline-start" />
        {children ?? label}
      </Button>
      <input
        ref={inputRef}
        name={inputName}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? [])
          onFilesSelect?.(files)
          if (files[0]) onFileSelect?.(files[0])
          event.currentTarget.value = ""
        }}
      />
    </>
  )
}

export { TableImportButton }
