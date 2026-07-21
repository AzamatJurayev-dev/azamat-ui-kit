import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
  return (
    <Card density="compact">
      <CardContent className="grid gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title ? <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p> : null}
            <div className="mt-1 flex items-center gap-2">
              {icon ? <span className="text-muted-foreground">{icon}</span> : null}
              {value ? <p className="text-2xl font-semibold tracking-tight">{value}</p> : null}
            </div>
          </div>
          {trend?.value ? <Badge tone={trend.tone === "success" ? "success" : "neutral"}>{trend.value}</Badge> : null}
        </div>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        {helperText ? <div className="text-sm text-muted-foreground">{helperText}</div> : null}
      </CardContent>
    </Card>
  )
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
