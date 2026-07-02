import * as React from "react"

import { Badge, FileUpload, ImageUpload } from "@/index"

import type { FamilyDemoProps } from "../types"

import { uploadHelperTags } from "./data"

export function UploadFamilyShowcase({ setState }: FamilyDemoProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [images, setImages] = React.useState<File[]>([])

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {uploadHelperTags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <div>
              <p className="aui-text-strong text-sm font-medium">Upload family coverage</p>
              <p className="aui-text-muted mt-1 text-sm leading-6">
                File and image upload should expose real dropzone behavior, clear actions, remove actions, preview surfaces and controlled file counts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <p className="aui-text-strong text-sm font-medium">File upload</p>
          <p className="aui-text-muted mt-1 text-sm leading-6">Drop files, clear all, reject invalid types and keep remove actions inside the file item surface.</p>
          <div className="mt-4">
            <FileUpload
              files={files}
              onFilesChange={(nextFiles) => {
                setFiles(nextFiles)
                setState({ notes: `${nextFiles.length} file attachments are now staged.` })
              }}
              accept=".pdf,.docx,.png"
              maxFiles={4}
              maxSize={4 * 1024 * 1024}
              helperText="Accepts PDF, DOCX and PNG up to 4 MB."
            />
          </div>
        </div>

        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <p className="aui-text-strong text-sm font-medium">Image upload</p>
          <p className="aui-text-muted mt-1 text-sm leading-6">Image preview, removable files and count summary are exposed directly from the reusable component.</p>
          <div className="mt-4">
            <ImageUpload
              files={images}
              onFilesChange={(nextFiles) => {
                setImages(nextFiles)
                setState({ notes: `${nextFiles.length} preview images are now staged.` })
              }}
              maxFiles={3}
              helperText="Upload hero illustrations or block thumbnails."
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
          <p className="aui-text-muted text-sm">Attached files</p>
          <p className="aui-text-strong mt-2 text-lg font-semibold">{files.length}</p>
        </div>
        <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
          <p className="aui-text-muted text-sm">Attached images</p>
          <p className="aui-text-strong mt-2 text-lg font-semibold">{images.length}</p>
        </div>
        <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
          <p className="aui-text-muted text-sm">Interaction proof</p>
          <p className="aui-text-strong mt-2 text-lg font-semibold">Remove and clear are isolated</p>
          <p className="aui-text-subtle mt-2 text-sm">Nested upload actions no longer conflict with the parent dropzone click surface.</p>
        </div>
      </div>
    </div>
  )
}
