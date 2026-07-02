import * as React from "react"

import { Badge, ImageUpload } from "@/index"

export function ImageUploadShowcase() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Preview</Badge>
          <Badge variant="outline">Image-first</Badge>
          <Badge variant="outline">Removable</Badge>
        </div>
        <p className="mt-3 text-sm font-medium aui-text-strong">ImageUpload is the preview-friendly media variant</p>
        <p className="mt-2 text-sm leading-6 aui-text-muted">
          Use it for thumbnails, gallery assets, hero illustrations and template screenshots where visual confirmation matters immediately.
        </p>
      </div>

      <ImageUpload
        files={files}
        onFilesChange={setFiles}
        maxFiles={3}
        helperText="Upload hero illustrations or block thumbnails."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Attached images</p>
          <p className="mt-2 aui-text-muted">{files.length}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Interaction model</p>
          <p className="mt-2 aui-text-muted">Remove action stays separate from the parent dropzone surface.</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          <p className="font-medium aui-text-strong">Use case</p>
          <p className="mt-2 aui-text-muted">Marketing blocks, screenshots, previews and content thumbnails.</p>
        </div>
      </div>
    </div>
  )
}
