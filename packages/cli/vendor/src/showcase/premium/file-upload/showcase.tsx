import * as React from "react"

import { Badge, FileUpload } from "@/index"

export function FileUploadShowcase() {
  const [files, setFiles] = React.useState<File[]>([])
  const [status, setStatus] = React.useState<Record<string, "idle" | "uploading" | "success" | "error">>({})

  React.useEffect(() => {
    setStatus((current) => {
      const next = { ...current }
      files.forEach((file, index) => {
        const key = `${file.name}-${file.size}-${file.lastModified}`
        next[key] ??= index === 0 ? "uploading" : index === 1 ? "error" : "success"
      })
      return next
    })
  }, [files])

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Dropzone</Badge>
          <Badge variant="outline">Rejected files</Badge>
          <Badge variant="outline">Clearable</Badge>
        </div>
        <p className="mt-3 text-sm font-medium aui-text-strong">FileUpload is the production file surface</p>
        <p className="mt-2 text-sm leading-6 aui-text-muted">
          Use it when you need one reusable dropzone with helper copy, rejected states, file list and nested remove actions.
        </p>
      </div>

      <FileUpload
        files={files}
        onFilesChange={setFiles}
        status={status}
        accept=".pdf,.docx,.png"
        maxFiles={4}
        maxSize={4 * 1024 * 1024}
        dropzoneLabel="Upload release assets"
        dropzoneDescription="Drag files here or choose from your device."
        helperText="Supports PDF, DOCX and PNG up to 4 MB."
        onRetryFile={(file) => {
          const key = `${file.name}-${file.size}-${file.lastModified}`
          setStatus((current) => ({ ...current, [key]: "uploading" }))
          window.setTimeout(() => {
            setStatus((current) => ({ ...current, [key]: "success" }))
          }, 900)
        }}
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Attached files</p>
          <p className="mt-2 aui-text-muted">{files.length}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Interaction model</p>
          <p className="mt-2 aui-text-muted">Uploading, success and retry-ready error rows all stay isolated from the parent dropzone click.</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Use case</p>
          <p className="mt-2 aui-text-muted">Contracts, invoices, release assets and admin attachments.</p>
        </div>
      </div>
    </div>
  )
}
