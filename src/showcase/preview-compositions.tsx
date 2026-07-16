import * as React from "react"

import { InfoCard } from "@/components/display/info-card"
import { FileUpload } from "@/components/upload/file-upload"

type PreviewStatCardProps = {
  title?: React.ReactNode
  value?: React.ReactNode
  description?: React.ReactNode
  trend?: { value: React.ReactNode; tone?: string }
  helperText?: React.ReactNode
  icon?: React.ReactNode
}

export function PreviewStatCard({ title, value, description, trend, helperText, icon }: PreviewStatCardProps) {
  return <InfoCard eyebrow={title} title={value} description={description} icon={icon} status={trend?.value} content={helperText} density="compact" />
}

type PreviewPropertyItem = { key: string; label: React.ReactNode; value: React.ReactNode; description?: React.ReactNode }

export function PreviewPropertyGrid({ items }: { items: PreviewPropertyItem[]; columns?: 1 | 2 | 3 | 4; bordered?: boolean }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.key} className="min-w-0 border p-3">
          <dt className="text-xs text-muted-foreground">{item.label}</dt>
          <dd className="mt-1 break-words text-sm font-medium">{item.value}</dd>
          {item.description ? <p className="mt-1 text-xs text-muted-foreground">{item.description}</p> : null}
        </div>
      ))}
    </dl>
  )
}

export function PreviewFileDropzone({ label, description, accept }: { label?: React.ReactNode; description?: React.ReactNode; accept?: string }) {
  return <FileUpload files={[]} onFilesChange={() => undefined} accept={accept} dropzoneLabel={label} dropzoneDescription={description} showFileList={false} />
}
