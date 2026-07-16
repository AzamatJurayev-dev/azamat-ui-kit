type SectionTitleProps = {
  title: string
  description: string
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  )
}
