import * as React from "react"
import { ImageIcon, XIcon } from "lucide-react"

import {
  FileUpload,
  formatBytes,
  getFileKey,
  type FileUploadProps,
  type FileUploadRenderFileState,
} from "@/components/upload/file-upload"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ImageUploadProps = Omit<FileUploadProps, "accept" | "renderFile"> & {
  accept?: string
  preview?: boolean
  previewClassName?: string
  imageClassName?: string
  renderImageFile?: (state: FileUploadRenderFileState & { previewUrl?: string }) => React.ReactNode
}

function useImagePreviewUrls(files: File[], enabled = true) {
  const [urls, setUrls] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    if (!enabled) {
      setUrls({})
      return
    }

    const entries = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => [getFileKey(file), URL.createObjectURL(file)] as const)

    setUrls(Object.fromEntries(entries))

    return () => {
      entries.forEach(([, url]) => URL.revokeObjectURL(url))
    }
  }, [enabled, files])

  return urls
}

function defaultRenderImageFile({
  file,
  previewUrl,
  progress,
  remove,
  previewClassName,
  imageClassName,
}: FileUploadRenderFileState & {
  previewUrl?: string
  previewClassName?: string
  imageClassName?: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={cn(
          "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[min(var(--radius-xl),16px)] border border-border/75 bg-muted/45 text-muted-foreground shadow-[0_1px_0_rgba(255,255,255,0.05)]",
          previewClassName
        )}
      >
        {previewUrl ? (
          <img src={previewUrl} alt={file.name} className={cn("size-full object-cover", imageClassName)} />
        ) : (
          <ImageIcon className="size-5" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{file.name}</div>
        <div className="text-xs text-muted-foreground">{formatBytes(file.size)}</div>
        {typeof progress === "number" && (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/80">
            <div
              className="h-full rounded-full bg-primary shadow-[0_8px_18px_color-mix(in_oklch,var(--primary),transparent_82%)]"
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        )}
      </div>
      <Button type="button" variant="ghost" size="icon-xs" className="rounded-full" onClick={remove}>
        <XIcon />
        <span className="sr-only">Remove image</span>
      </Button>
    </div>
  )
}

function ImageUpload({
  accept = "image/*",
  buttonLabel = "Choose image",
  dropzoneLabel = "Drop images here or click to upload",
  preview = true,
  previewClassName,
  imageClassName,
  files = [],
  renderImageFile,
  ...props
}: ImageUploadProps) {
  const previewUrls = useImagePreviewUrls(files, preview)

  return (
    <FileUpload
      accept={accept}
      buttonLabel={buttonLabel}
      dropzoneLabel={dropzoneLabel}
      files={files}
      renderFile={(state) => {
        const previewUrl = previewUrls[getFileKey(state.file)]

        return renderImageFile?.({ ...state, previewUrl }) ??
          defaultRenderImageFile({ ...state, previewUrl, previewClassName, imageClassName })
      }}
      {...props}
    />
  )
}

export { ImageUpload, useImagePreviewUrls }
