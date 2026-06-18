import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  imageClassName?: string
  alt?: string
}

export function BrandLogo({ className, imageClassName, alt = "Azamat UI logo" }: BrandLogoProps) {
  return (
    <span className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm dark:border-white/10", className)}>
      <img src="/logo.png" alt={alt} className={cn("h-full w-full object-contain", imageClassName)} />
    </span>
  )
}
