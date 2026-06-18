import type { ReactNode } from "react"
import { MoonIcon, SearchIcon, StarIcon, SunIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Badge, Button, buttonVariants } from "@/index"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import type { NavItem, SidebarGroup } from "./site-data"

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 dark:bg-white dark:text-zinc-950 dark:shadow-white/10">
        <div className="flex -rotate-12 gap-1">
          <span className="block h-5 w-1.5 rounded-full bg-white dark:bg-zinc-950" />
          <span className="mt-1 block h-5 w-1.5 rounded-full bg-white/80 dark:bg-zinc-950/80" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">Azamat UI</span>
        <Badge variant="outline" className="rounded-full px-2.5 py-1 text-xs">
          v1.0.0
        </Badge>
      </div>
    </div>
  )
}

export function TopNav({ items }: { items: NavItem[] }) {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/92 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/92">
      <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-2 py-1 lg:flex dark:border-white/10 dark:bg-white/5">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? location.pathname === "/"
                : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-300",
                  active && "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
                  !active && "hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/command" className="hidden items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-2 text-sm text-zinc-500 transition hover:bg-zinc-50 xl:flex dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10">
            <SearchIcon className="size-4" />
            <span className="min-w-32">Search docs...</span>
            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs dark:border-white/10 dark:bg-white/5">⌘K</span>
          </Link>
          <Button variant="ghost" size="icon-sm" className={cn("rounded-2xl dark:hover:bg-white/10", theme === "light" && "bg-zinc-100 dark:bg-transparent")} onClick={() => setTheme("light")}>
            <SunIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className={cn("rounded-2xl dark:hover:bg-white/10", theme === "dark" && "bg-zinc-100 dark:bg-white/10")} onClick={() => setTheme("dark")}>
            <MoonIcon className="size-4" />
          </Button>
          <button
            type="button"
            onClick={() => window.open("https://github.com/search?q=azamat-ui", "_blank", "noopener,noreferrer")}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-2xl gap-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10")}
          >
            <StarIcon className="size-4" />
            GitHub
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-white/10 dark:text-zinc-300">4.2k</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export function Sidebar({ title, description, groups, promo }: { title: string; description: string; groups: SidebarGroup[]; promo?: ReactNode }) {
  const location = useLocation()

  return (
    <aside className="w-[260px] shrink-0 border-r border-zinc-200/80 bg-white/80 dark:border-white/10 dark:bg-zinc-950/70">
      <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-auto px-4 pb-6 pt-5">
        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">{title}</h2>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>

        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active =
                    item.href === "/"
                      ? location.pathname === "/"
                      : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={`${group.title}-${item.label}`}
                      to={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm text-zinc-600 transition-colors dark:text-zinc-300",
                        active && "bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 dark:bg-white dark:text-zinc-950 dark:shadow-white/10",
                        !active && "hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-white/10 dark:hover:text-white"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="size-4" />
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", active ? "bg-white/15 text-white dark:bg-zinc-950/10 dark:text-zinc-950" : "bg-zinc-100 text-zinc-500 dark:bg-white/10 dark:text-zinc-300")}>
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {promo ? <div className="mt-6">{promo}</div> : null}
      </div>
    </aside>
  )
}

export function SurfaceCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[28px] border border-zinc-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]", className)}>{children}</div>
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">{children}</p>
}
