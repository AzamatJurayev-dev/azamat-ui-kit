export function CodePreview({
  code,
  language = "tsx",
}: {
  code?: string
  language?: string
}) {
  if (!code) {
    return (
      <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white px-6 py-16 text-center text-sm text-zinc-500">
        Code preview is not available for this example yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-950 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.8)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">{language}</span>
      </div>
      <pre className="overflow-x-auto px-6 py-5 text-sm leading-8 text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
