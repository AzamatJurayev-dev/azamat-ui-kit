import {
  ArrowRightIcon,
  BoxesIcon,
  CheckCheckIcon,
  Code2Icon,
  ComponentIcon,
  Layers3Icon,
  LayoutDashboardIcon,
  LayoutTemplateIcon,
  PaletteIcon,
  SparklesIcon,
  Table2Icon,
  WandSparklesIcon,
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
  StatusBadge,
  buttonVariants,
} from "@/index"
import { cn } from "@/lib/utils"
import { DemoSection, TokenPill } from "./playground-ui"

const featureList = [
  "CSS-first visual system",
  "Reusable props, not duplicate names",
  "Dashboard-ready component patterns",
  "Mock playground for manual QA",
]

const metricCards = [
  { title: "Component families", value: "12+", caption: "Foundation, forms, table, upload, calendar, overlay and more" },
  { title: "Showcase routes", value: "20+", caption: "Landing, component sections and reusable page templates" },
  { title: "Styling model", value: "CSS tokens", caption: "Branding is controlled with variables and stable data-slot selectors" },
]

const systemCards = [
  {
    title: "Foundation",
    description: "Buttons, badges, cards, status tones and token-driven primitives.",
    icon: <ComponentIcon className="size-4" />,
    href: "/components/foundation",
  },
  {
    title: "Data entry",
    description: "Search, password, phone, async select, form wrappers and date inputs.",
    icon: <WandSparklesIcon className="size-4" />,
    href: "/components/inputs",
  },
  {
    title: "Data display",
    description: "DataTable, actions, selection, status, density, skeleton and table tooling.",
    icon: <Table2Icon className="size-4" />,
    href: "/components/table",
  },
  {
    title: "Application blocks",
    description: "Upload, calendar, overlay, command palette, wizard and template pages.",
    icon: <LayoutDashboardIcon className="size-4" />,
    href: "/templates",
  },
]

const principles = [
  "One component, many states through props",
  "No product, tenant, auth or API coupling inside the UI kit",
  "Every major prop should be visible in npm run dev",
  "Visual differences belong to CSS variables and data-slot selectors",
]

function HeroPreviewCard() {
  return (
    <Card className="relative overflow-hidden border-primary/15 bg-background/80 shadow-2xl shadow-primary/10 backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <SparklesIcon className="size-4 text-primary" />
              Component quality dashboard
            </CardTitle>
            <CardDescription>Reusable UI coverage overview</CardDescription>
          </div>
          <StatusBadge tone="success" dot>Ready</StatusBadge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {metricCards.map((metric) => (
            <div key={metric.title} className="rounded-lg border bg-card/80 p-3">
              <div className="text-xs text-muted-foreground">{metric.title}</div>
              <div className="mt-1 text-xl font-semibold tracking-tight">{metric.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border bg-muted/35 p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>CSS token preview</span>
            <Badge variant="outline">data-slot</Badge>
          </div>
          <div className="grid gap-2">
            <div className="h-2 rounded-full bg-primary/80" />
            <div className="h-2 w-9/12 rounded-full bg-muted-foreground/30" />
            <div className="h-2 w-7/12 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <span className="text-xs text-muted-foreground">Built for dashboards</span>
        <Link to="/components" className={cn(buttonVariants({ size: "sm" }))}>
          Browse UI
        </Link>
      </CardFooter>
    </Card>
  )
}

export function LandingSection() {
  return (
    <div className="grid gap-8">
      <DemoSection
        sectionIndex={0}
        id="landing"
        title="Azamat UI Kit"
        description="A CSS-first, reusable React component system for dashboard products."
      >
        <div className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-2xl shadow-primary/5 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklch,var(--primary),transparent_82%),_transparent_34rem)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-2 bg-background/70">
                  <SparklesIcon className="size-3.5" />
                  Shadcn-inspired, dashboard-first
                </Badge>
                <Badge variant="secondary" className="gap-2">
                  <PaletteIcon className="size-3.5" />
                  CSS token controlled
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Build polished admin systems without repeating UI work.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Landing, component showcase, templates and manual QA pages now work as a real product site. Components stay reusable: behavior through props, visual polish through CSS tokens.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/components" className={cn(buttonVariants({ size: "lg" }), "group")}> 
                  Explore components
                  <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link to="/templates" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  <LayoutTemplateIcon className="mr-2 size-4" />
                  View templates
                </Link>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {featureList.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-full border bg-background/60 px-3 py-2 text-sm text-muted-foreground">
                    <CheckCheckIcon className="size-4 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <HeroPreviewCard />
          </div>
        </div>
      </DemoSection>

      <section className="grid gap-4 md:grid-cols-3">
        {metricCards.map((metric) => (
          <Card key={metric.title} className="group transition-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{metric.caption}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {systemCards.map((item) => (
          <Card key={item.title} className="group relative overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/45">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl border bg-muted text-muted-foreground group-hover:text-primary">
                {item.icon}
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to={item.href} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full justify-between")}> 
                Open section
                <ArrowRightIcon className="size-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Architecture principles</CardTitle>
            <CardDescription>Reusable first. Business logic stays in the app.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {principles.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border bg-muted/25 p-3 text-sm">
                <CheckCheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>CSS-first customization</CardTitle>
                <CardDescription>Change theme without touching component source.</CardDescription>
              </div>
              <Badge variant="outline">global CSS</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 rounded-xl border bg-muted/30 p-4 font-mono text-xs">
              <TokenPill>--aui-control-radius</TokenPill>
              <TokenPill>--aui-card-shadow</TokenPill>
              <TokenPill>--aui-table-header-bg</TokenPill>
              <TokenPill>data-slot="card"</TokenPill>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-muted-foreground">Component visuals are themeable.</span>
            <Link to="/components/foundation" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              <Code2Icon className="mr-2 size-4" />
              Tokens
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section className="rounded-3xl border bg-primary p-6 text-primary-foreground md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-sm opacity-80">
              <BoxesIcon className="size-4" />
              Ready for Kassa, LMS, Restaurant, Owner panel and future dashboards
            </div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Next step: build once, reuse everywhere.</h2>
            <p className="text-sm leading-6 opacity-80">
              The UI kit is now moving from simple wrappers to application-level reusable patterns while keeping one strong component per use case.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/components/table" className={cn(buttonVariants({ variant: "secondary" }))}>
              <Table2Icon className="mr-2 size-4" />
              DataTable
            </Link>
            <Link
              to="/components/forms"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              )}
            >
              <Layers3Icon className="mr-2 size-4" />
              Forms
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
