import * as React from "react"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FileUploadRejectReason = "max-files" | "max-size" | "type"

export type FileUploadRejectedFile = {
  file: File
  reason: FileUploadRejectReason
  message: string
}

export type FileUploadRenderFileState = {
  file: File
  index: number
  progress?: number
  remove: () => void
  removeLabel?: string
}

export type FileUploadRenderRejectedFileState = {
  rejectedFile: FileUploadRejectedFile
  index: number
}

type NativeFileInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "value"
  | "onChange"
  | "className"
  | "children"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
>

export type FileUploadProps = NativeFileInputProps & {
  files?: File[]
  onFilesChange?: (files: File[]) => void
  rejectedFiles?: FileUploadRejectedFile[]
  onRejectedFilesChange?: (files: FileUploadRejectedFile[]) => void
  onDragEnter?: React.DragEventHandler<HTMLDivElement>
  onDragLeave?: React.DragEventHandler<HTMLDivElement>
  onDragOver?: React.DragEventHandler<HTMLDivElement>
  onDrop?: React.DragEventHandler<HTMLDivElement>
  buttonLabel?: React.ReactNode
  dropzoneLabel?: React.ReactNode
  dropzoneDescription?: React.ReactNode
  dragActiveLabel?: React.ReactNode
  helperText?: React.ReactNode
  clearLabel?: React.ReactNode
  removeLabel?: string
  maxFiles?: number
  maxSize?: number
  appendFiles?: boolean
  showFileList?: boolean
  showClearButton?: boolean
  loading?: boolean
  progress?: number | Record<string, number>
  renderFile?: (state: FileUploadRenderFileState) => React.ReactNode
  renderRejectedFile?: (state: FileUploadRenderRejectedFileState) => React.ReactNode
  renderActions?: (state: { openFileDialog: () => void; clearFiles: () => void; files: File[] }) => React.ReactNode
  className?: string
  inputClassName?: string
  dropzoneClassName?: string
  fileListClassName?: string
  fileItemClassName?: string
  rejectedListClassName?: string
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B"

  const units = ["B", "KB", "MB", "GB"]
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** index

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`
}

function normalizeAccept(accept?: string) {
  return accept
    ?.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean) ?? []
}

function fileMatchesAccept(file: File, accept?: string) {
  const rules = normalizeAccept(accept)

  if (rules.length === 0) return true

  const fileName = file.name.toLowerCase()
  const fileType = file.type.toLowerCase()

  return rules.some((rule) => {
    if (rule.startsWith(".")) return fileName.endsWith(rule)
    if (rule.endsWith("/*")) return fileType.startsWith(rule.slice(0, -1))
    return fileType === rule
  })
}

function getFileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function getProgressForFile(progress: FileUploadProps["progress"], file: File) {
  if (typeof progress === "number") return progress
  return progress?.[getFileKey(file)] ?? progress?.[file.name]
}

function validateIncomingFiles({
  currentFiles,
  incomingFiles,
  accept,
  maxFiles,
  maxSize,
  appendFiles,
}: {
  currentFiles: File[]
  incomingFiles: File[]
  accept?: string
  maxFiles?: number
  maxSize?: number
  appendFiles: boolean
}) {
  const accepted: File[] = []
  const rejected: FileUploadRejectedFile[] = []
  const nextBase = appendFiles ? currentFiles : []
  const effectiveMaxFiles = maxFiles ?? (appendFiles ? undefined : incomingFiles.length)

  for (const file of incomingFiles) {
    if (effectiveMaxFiles !== undefined && nextBase.length + accepted.length >= effectiveMaxFiles) {
      rejected.push({
        file,
        reason: "max-files",
        message: `Maximum ${effectiveMaxFiles} file${effectiveMaxFiles === 1 ? "" : "s"} allowed.`,
      })
      continue
    }

    if (maxSize !== undefined && file.size > maxSize) {
      rejected.push({ file, reason: "max-size", message: `File is larger than ${formatBytes(maxSize)}.` })
      continue
    }

    if (!fileMatchesAccept(file, accept)) {
      rejected.push({
        file,
        reason: "type",
        message: accept ? `File type is not allowed. Expected: ${accept}.` : "File type is not allowed.",
      })
      continue
    }

    accepted.push(file)
  }

  return {
    accepted,
    rejected,
    nextFiles: appendFiles ? [...currentFiles, ...accepted] : accepted,
  }
}

function defaultRenderFile({ file, progress, remove, removeLabel = "Remove file" }: FileUploadRenderFileState) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <FileIcon className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{file.name}</div>
        <div className="text-xs text-muted-foreground">{formatBytes(file.size)}</div>
        {typeof progress === "number" && (
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
          </div>
        )}
      </div>
      <Button type="button" variant="ghost" size="icon-xs" onClick={remove}>
        <XIcon />
        <span className="sr-only">{removeLabel}</span>
      </Button>
    </div>
  )
}

function FileUpload({
  files = [],
  onFilesChange,
  rejectedFiles,
  onRejectedFilesChange,
  buttonLabel = "Choose files",
  dropzoneLabel = "Drop files here or click to upload",
  dropzoneDescription,
  dragActiveLabel = "Drop files to upload",
  helperText,
  clearLabel = "Clear all",
  removeLabel = "Remove file",
  maxFiles,
  maxSize,
  appendFiles = true,
  showFileList = true,
  showClearButton = true,
  loading = false,
  progress,
  renderFile,
  renderRejectedFile,
  renderActions,
  className,
  inputClassName,
  dropzoneClassName,
  fileListClassName,
  fileItemClassName,
  rejectedListClassName,
  accept,
  multiple,
  disabled,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  ...props
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dragDepthRef = React.useRef(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const [internalRejectedFiles, setInternalRejectedFiles] = React.useState<FileUploadRejectedFile[]>([])
  const resolvedRejectedFiles = rejectedFiles ?? internalRejectedFiles
  const isDisabled = disabled || loading
  const inputMultiple = multiple ?? maxFiles !== 1

  const setRejectedFiles = React.useCallback(
    (nextRejectedFiles: FileUploadRejectedFile[]) => {
      if (rejectedFiles === undefined) setInternalRejectedFiles(nextRejectedFiles)
      onRejectedFilesChange?.(nextRejectedFiles)
    },
    [onRejectedFilesChange, rejectedFiles]
  )

  const openFileDialog = React.useCallback(() => {
    if (!isDisabled) inputRef.current?.click()
  }, [isDisabled])

  const clearFiles = React.useCallback(() => {
    onFilesChange?.([])
    setRejectedFiles([])
  }, [onFilesChange, setRejectedFiles])

  const processFiles = React.useCallback(
    (incomingFiles: File[]) => {
      const result = validateIncomingFiles({ currentFiles: files, incomingFiles, accept, maxFiles, maxSize, appendFiles })
      onFilesChange?.(result.nextFiles)
      setRejectedFiles(result.rejected)
    },
    [accept, appendFiles, files, maxFiles, maxSize, onFilesChange, setRejectedFiles]
  )

  const removeFile = React.useCallback(
    (fileIndex: number) => {
      onFilesChange?.(files.filter((_, index) => index !== fileIndex))
    },
    [files, onFilesChange]
  )

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    processFiles(Array.from(event.target.files ?? []))
    event.target.value = ""
  }

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (event) => {
    onDragEnter?.(event)
    if (event.defaultPrevented || isDisabled) return
    event.preventDefault()
    dragDepthRef.current += 1
    setIsDragging(true)
  }

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (event) => {
    onDragLeave?.(event)
    if (event.defaultPrevented || isDisabled) return
    dragDepthRef.current = Math.max(dragDepthRef.current - 1, 0)
    if (dragDepthRef.current === 0) setIsDragging(false)
  }

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    onDragOver?.(event)
    if (event.defaultPrevented || isDisabled) return
    event.preventDefault()
  }

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    onDrop?.(event)
    if (event.defaultPrevented || isDisabled) return
    event.preventDefault()
    dragDepthRef.current = 0
    setIsDragging(false)
    processFiles(Array.from(event.dataTransfer.files ?? []))
  }

  return (
    <div data-slot="file-upload" className={cn("grid gap-3", className)}>
      <input
        ref={inputRef}
        type="file"
        className={cn("sr-only", inputClassName)}
        disabled={disabled || loading}
        accept={accept}
        multiple={inputMultiple}
        onChange={handleChange}
        {...props}
      />

      <div
        data-slot="file-upload-dropzone"
        data-dragging={isDragging || undefined}
        data-disabled={isDisabled || undefined}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        className={cn(
          "grid cursor-pointer gap-3 rounded-lg border border-dashed bg-card p-4 text-center outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring data-[dragging=true]:border-primary data-[dragging=true]:bg-primary/5 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60",
          dropzoneClassName
        )}
        onClick={openFileDialog}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openFileDialog()
          }
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <UploadCloudIcon className="size-5" />
        </div>
        <div className="grid gap-1">
          <div className="text-sm font-medium text-foreground">{isDragging ? dragActiveLabel : dropzoneLabel}</div>
          {dropzoneDescription && <div className="text-xs text-muted-foreground">{dropzoneDescription}</div>}
          {(accept || maxSize || maxFiles || helperText) && (
            <div className="text-xs text-muted-foreground">
              {helperText ?? [accept ? `Types: ${accept}` : null, maxSize ? `Max size: ${formatBytes(maxSize)}` : null, maxFiles ? `Max files: ${maxFiles}` : null].filter(Boolean).join(" • ")}
            </div>
          )}
        </div>

        {renderActions?.({ openFileDialog, clearFiles, files }) ?? (
          <div className="flex justify-center gap-2">
            <Button type="button" variant="outline" size="sm" disabled={isDisabled} onClick={(event) => { event.stopPropagation(); openFileDialog() }}>
              {buttonLabel}
            </Button>
            {showClearButton && files.length > 0 && (
              <Button type="button" variant="ghost" size="sm" disabled={isDisabled} onClick={(event) => { event.stopPropagation(); clearFiles() }}>
                {clearLabel}
              </Button>
            )}
          </div>
        )}
      </div>

      {showFileList && files.length > 0 && (
        <div data-slot="file-upload-list" className={cn("grid gap-2", fileListClassName)}>
          {files.map((file, index) => {
            const state = { file, index, progress: getProgressForFile(progress, file), remove: () => removeFile(index), removeLabel }

            return (
              <div key={`${file.name}-${file.lastModified}-${index}`} data-slot="file-upload-item" className={cn("rounded-lg border bg-card p-2", fileItemClassName)}>
                {renderFile?.(state) ?? defaultRenderFile(state)}
              </div>
            )
          })}
        </div>
      )}

      {resolvedRejectedFiles.length > 0 && (
        <div data-slot="file-upload-rejected-list" className={cn("grid gap-1", rejectedListClassName)}>
          {resolvedRejectedFiles.map((rejectedFile, index) => (
            <div key={`${rejectedFile.file.name}-${index}`} className="rounded-md bg-destructive/10 px-2 py-1.5 text-xs text-destructive">
              {renderRejectedFile?.({ rejectedFile, index }) ?? <span>{rejectedFile.file.name}: {rejectedFile.message}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { FileUpload, fileMatchesAccept, formatBytes, getFileKey }
