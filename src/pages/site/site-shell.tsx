import * as React from "react"
import type { ReactNode } from "react"
import { MoonIcon, SearchIcon, StarIcon, SunIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Badge, Button, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import type { NavItem, SidebarGroup } from "./site-data"

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-950/10">
        <div className="flex -rotate-12 gap-1">
          <span className="block h-5 w-1.5 rounded-full bg-white" />
          <span className="mt-1 block h-5 w-1.5 rounded-full bg-white/80" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-3xl font-semibold tracking-tight text-zinc-950">Azamat UI</span>
        <Badge variant="outline" className="rounded-full px-2.5 py-1 text-xs">
          v1.0.0
        </Badge>
      </div>
    </div>
  )
}

export function TopNav({ items }: { items: NavItem[] }) {
  const location = useLocation()
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("light")

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-2 py-1 lg:flex">
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
                  "rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors",
                  active && "bg-zinc-950 text-white",
                  !active && "hover:bg-zinc-100 hover:text-zinc-950"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/command" className="hidden items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-2 text-sm text-zinc-500 transition hover:bg-zinc-50 xl:flex">
            <SearchIcon className="size-4" />
            <span className="min-w-32">Search docs...</span>
            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs">⌘K</span>
          </Link>
          <Button variant="ghost" size="icon-sm" className={cn("rounded-2xl", themeMode === "light" && "bg-zinc-100")} onClick={() => setThemeMode("light")}>
            <SunIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className={cn("rounded-2xl", themeMode === "dark" && "bg-zinc-100")} onClick={() => setThemeMode("dark")}>
            <MoonIcon className="size-4" />
          </Button>
          <button
            type="button"
            onClick={() => window.open("https://github.com/search?q=azamat-ui", "_blank", "noopener,noreferrer")}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-2xl gap-2")}
          >
            <StarIcon className="size-4" />
            GitHub
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">4.2k</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export function Sidebar({ title, description, groups, promo }: { title: string; description: string; groups: SidebarGroup[]; promo?: ReactNode }) {
  const location = useLocation()

  return (
    <aside className="w-[260px] shrink-0 border-r border-zinc-200/80 bg-white/80">
      <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-auto px-4 pb-6 pt-5">
        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
          <p className="text-sm leading-6 text-zinc-600">{description}</p>
        </div>

        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">{group.title}</p>
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
                        "flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm text-zinc-600 transition-colors",
                        active && "bg-zinc-950 text-white shadow-lg shadow-zinc-950/10",
                        !active && "hover:bg-zinc-100 hover:text-zinc-950"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="size-4" />
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", active ? "bg-white/15 text-white" : "bg-zinc-100 text-zinc-500")}>
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
  return <div className={cn("rounded-[28px] border border-zinc-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]", className)}>{children}</div>
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">{children}</p>
}
