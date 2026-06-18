import { Navigate, useParams } from "react-router-dom"

import { getComponentPreview, previewBlockRegistry } from "./preview-registry"

function PreviewCanvas({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white text-zinc-950">{children}</div>
}

export function PreviewBlockRoutePage() {
  const params = useParams<{ slug: string }>()
  const item = params.slug ? previewBlockRegistry[params.slug] : null

  if (!item) return <Navigate to="/" replace />

  return (
    <PreviewCanvas>
      <item.Render />
    </PreviewCanvas>
  )
}

export function PreviewComponentRoutePage() {
  const params = useParams<{ slug: string }>()
  const item = params.slug ? getComponentPreview(params.slug) : null

  if (!item) return <Navigate to="/" replace />

  return (
    <PreviewCanvas>
      <item.Render />
    </PreviewCanvas>
  )
}
