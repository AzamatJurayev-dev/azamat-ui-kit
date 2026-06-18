import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCheckIcon,
  CircleDashedIcon,
  ComponentIcon,
  PaletteIcon,
  Table2Icon,
  UploadCloudIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  StatusBadge,
  buttonVariants,
} from "@/index"
import { cn } from "@/lib/utils"

const docsGroups = [
  {
    title: "Overview",
    description: "Start here if you want the fastest route into the kit.",
    items: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
      { label: "Patterns", href: "/components/patterns" },
    ],
  },
  {
    title: "Foundation",
    description: "Tokens, core primitives, and the visual language.",
    items: [
      { label: "Foundation", href: "/components/foundation" },
      { label: "Display", href: "/components/display" },
      { label: "Overlay", href: "/components/overlay" },
    ],
  },
  {
    title: "Flows",
    description: "Interactive building blocks for real screens.",
    items: [
      { label: "Forms", href: "/components/forms" },
      { label: "Table", href: "/components/table" },
      { label: "Upload", href: "/components/upload" },
      { label: "Calendar", href: "/components/calendar" },
    ],
  },
]

const componentModules = [
  {
    title: "Foundation",
    description: "Tokens, buttons, cards, badges, status and core UI atoms.",
    icon: <PaletteIcon className="size-4" />,
    href: "/components/foundation",
    accent: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  },
  {
    title: "Inputs",
    description: "Text, masked, search, select, numeric and date primitives.",
    icon: <ComponentIcon className="size-4" />,
    href: "/components/inputs",
    accent: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
  {
    title: "Forms",
    description: "RHF-connected wrappers, presets, states and FormBuilder.",
    icon: <CheckCheckIcon className="size-4" />,
    href: "/components/forms",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
  {
    title: "Display",
    description: "Cards, chips, activity feed, state feedback and timeline.",
    icon: <CheckCheckIcon className="size-4" />,
    href: "/components/display",
    accent: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  },
  {
    title: "Patterns",
    description: "Resource pages, AppShell, shell-first layout systems.",
    icon: <ComponentIcon className="size-4" />,
    href: "/components/patterns",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    title: "Data table",
    description: "Rows, selection, actions, sorting, bulk and loading states.",
    icon: <Table2Icon className="size-4" />,
    href: "/components/table",
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  },
  {
    title: "Upload",
    description: "Drag/drop, image previews, rejected files and progress.",
    icon: <UploadCloudIcon className="size-4" />,
    href: "/components/upload",
    accent: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  },
  {
    title: "Calendar",
    description: "Picker and schedule-like calendar controls with modern UX.",
    icon: <CalendarDaysIcon className="size-4" />,
    href: "/components/calendar",
    accent: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300",
  },
  {
    title: "Overlay",
    description: "Dialog, sheet, popover, command and modal patterns.",
    icon: <CircleDashedIcon className="size-4" />,
    href: "/components/overlay",
    accent: "bg-orange-500/10 text-orange-600 dark:text-orange-300",
  },
]

const templateHighlights = [
  { title: "Growth Radar", route: "/templates/analytics", description: "Page-level charts, cards and actions." },
  { title: "CRM Pulse", route: "/templates/crm", description: "Module table, linked pages and commandable sections." },
  { title: "Finance Dock", route: "/templates/finance", description: "Stateful invoice and approval-like workflow pages." },
]

const designPillars = [
  "Dashboard-first structure instead of random isolated widgets",
  "Every component supports controlled and local state for real previews",
  "Public-facing pages are route-based: each page is easy to link/share",
  "Same component, same design language: CSS-first token model",
]

function LandingHero() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Azamat UI Kit</h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          A modern, route-first React component library showcase.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border bg-gradient-to-br from-muted/30 via-background to-muted/10 p-6 shadow-xl shadow-primary/5 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="space-y-6 lg:pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Azamat UI Kit
            </div>
            <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Dashboard UI system with shadcn-level polish.
            </h2>
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              Landing, component showcase, templates and mock data are route-driven and production-like.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/components" className={cn(buttonVariants({ size: "lg" }))}>
                Browse components
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
              <Link to="/templates" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                View templates
              </Link>
            </div>
          </div>

          <div className="rounded-[1.6rem] border bg-background p-4 shadow-2xl shadow-primary/5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Preview state</p>
                <p className="text-xs text-muted-foreground">Every module uses the same token family.</p>
              </div>
              <StatusBadge tone="success" dot>
                Live
              </StatusBadge>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-xs text-muted-foreground">Component families</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">11+</p>
                <p className="text-xs text-muted-foreground">Foundation, inputs, forms, display, table, upload, etc.</p>
              </div>
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-xs text-muted-foreground">Template routes</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">20+</p>
                <p className="text-xs text-muted-foreground">Landing + components + template deep links.</p>
              </div>
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-xs text-muted-foreground">Styling model</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">Token-first</p>
                <p className="text-xs text-muted-foreground">One visual language for all controls.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-background px-4 py-4 shadow-sm shadow-primary/5">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/landing"
            className="rounded-full border bg-muted/20 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/45 hover:bg-muted/30 hover:text-foreground"
          >
            Landing
          </Link>
          <Link
            to="/components"
            className="rounded-full border bg-muted/20 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/45 hover:bg-muted/30 hover:text-foreground"
          >
            Components
          </Link>
          <Link
            to="/templates"
            className="rounded-full border bg-muted/20 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/45 hover:bg-muted/30 hover:text-foreground"
          >
            Templates
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <CheckCheckIcon className="size-4 text-foreground" />
            Open in one click
          </span>
          <Link to="/components/overlay" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            <ComponentIcon className="mr-2 size-4" />
            Open overlay docs
          </Link>
        </div>
      </div>
    </section>
  )
}

function DocsRail() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {docsGroups.map((group) => (
        <Card key={group.title} className="border-border/70 bg-background/90 shadow-sm shadow-primary/5 transition hover:border-primary/40 hover:shadow-md hover:shadow-primary/5">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <CardTitle className="text-lg">{group.title}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </div>
              <Badge variant="outline">{group.items.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            {group.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center justify-between rounded-lg border bg-muted/25 px-3 py-2 text-sm transition-colors hover:border-primary/45 hover:bg-muted/45"
              >
                <span>{item.label}</span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
          <CardFooter className="justify-between border-t pt-4">
            <span className="text-xs text-muted-foreground">Route-first docs</span>
            <Badge variant="outline">{group.items.length} links</Badge>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}

type LandingSectionProps = {
  onToggleTheme?: () => void
}

export function LandingSection({ onToggleTheme }: LandingSectionProps) {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">PLAYGROUND</p>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Landing</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Production-like showcase landing page.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onToggleTheme}>
            Toggle theme
          </Button>
        </div>
        <LandingHero />
      </section>

      <section id="landing-components" className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Component families</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Komponentlar alohida ko‘rinishda.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Har bir bo‘lim alohida route bilan: Foundation, Inputs, Forms, Display, Patterns, Table, Upload, Calendar, Overlay.
          </p>
        </div>

        <div className="rounded-3xl border bg-background p-4 shadow-sm shadow-primary/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Section index</p>
              <p className="text-xs text-muted-foreground">Open any family directly from the landing page.</p>
            </div>
            <Badge variant="outline">Route-based</Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {componentModules.map((module) => (
            <Card key={module.title} className="group transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md hover:shadow-primary/5">
              <CardHeader>
                <div className={cn("mb-3 inline-flex size-10 items-center justify-center rounded-xl border", module.accent)}>{module.icon}</div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={module.href} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full justify-between")}>
                  Open section
                  <ArrowRightIcon className="size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="landing-templates" className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Templates</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Route-driven template showcase.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Har bir template ichida kichik page bo‘limlari va bog‘liq modul previewlari bor.
          </p>
        </div>

        <div className="rounded-3xl border bg-background p-4 shadow-sm shadow-primary/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Public showcase</p>
              <p className="text-xs text-muted-foreground">Each card opens a route you can publish, share, and inspect.</p>
            </div>
            <Link to="/templates" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Browse all templates
              <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {templateHighlights.map((template) => (
            <Card key={template.route} className="relative overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter className="justify-between">
                <Badge variant="outline">{template.route.replace("/templates/", "")}</Badge>
                <Link to={template.route} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                  Open template
                  <ArrowRightIcon className="ml-2 size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="landing-docs" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Documentation</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Browse the kit like a docs home.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Start from one entry point, then move into sections and templates without losing the route context.
            </p>
          </div>
          <Link to="/components" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex")}>
            Open components
            <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </div>
        <DocsRail />
      </section>

      <section id="landing-principles" className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm shadow-primary/5">
          <CardHeader>
            <CardTitle>Design pillars</CardTitle>
            <CardDescription>Qoida va prinsipsiz UI bir xil hissiyot bera olmaydi.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {designPillars.map((pillar) => (
              <p key={pillar} className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
                {pillar}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-sm shadow-primary/5">
          <CardHeader>
            <CardTitle>Why route-first</CardTitle>
            <CardDescription>Demo uchun hamma narsa route bo‘ylab ajratilgan.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            <p>• Har bir bo‘lim `/components/...`, `/templates/...` orqali ochiladi.</p>
            <p>• `Link` bilan navigatsiya — external share/preview uchun to‘g‘ri.</p>
            <p>• Play/demo mock data orqali real holatga yaqin xatti-harakat ko‘rinadi.</p>
            <p>• Keyinchalik API layerni ulash juda oson.</p>
          </CardContent>
          <CardFooter>
            <Link to="/components" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-center")}>
              <ComponentIcon className="mr-2 size-4" />
              Go to components index
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}






