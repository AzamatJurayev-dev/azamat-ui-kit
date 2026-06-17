import { ArrowRightIcon, CheckCheckIcon, LayoutTemplateIcon, SparklesIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge, buttonVariants, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/index"
import { cn } from "@/lib/utils"
import { DemoSection } from "./playground-ui"

const featureList = [
  "Shadcn-likening ruhida component naming",
  "Landing + templates bo'limli to'liq portfolio uslubi",
  "Public ko'rinish uchun toza spacing va readable code preview",
  "Bitta AppShell ichida modullar bilan boshqariladigan sahifalar",
]

const metricCards = [
  { title: "Landing pages", value: "1 core", caption: "Ready CTA, badge, and hero variants" },
  { title: "Component sets", value: "7", caption: "Foundation, Inputs, Forms, Table, Upload, Calendar, Overlay" },
  { title: "Template blocks", value: "6", caption: "Route-level pages with reusable UI modules" },
]

export function LandingSection() {
  return (
    <DemoSection
      sectionIndex={0}
      id="landing"
      title="Azamat UI Kit - Production Showcase"
      description="Dizayn, komponent va dashboard template'larini bitta public katalogda ko'rsatish uchun tayyorlangan demo."
    >
      <div className="relative overflow-hidden rounded-xl border bg-card p-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_65%)]" />
        <div className="rounded-lg border bg-background/75 p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-4">
              <Badge variant="outline" className="gap-2">
                <SparklesIcon className="size-3.5" />
                Shadcn inspired UI kit
              </Badge>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Fast, polished components. Readable previews. Real template demos.
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sizning UI library'ingizdan tashqi ko'rinishda ham professional ko'rinish uchun landing page, component showcase va
                dashboard shablonlari bitta oqimli sahifada taqdim etiladi. Har bir bo'limda tez topiladigan linklar va aniq CTA mavjud.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {featureList.map((item) => (
                  <span key={item} className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px]">
                    <CheckCheckIcon className="size-3.5 text-emerald-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid min-w-[240px] gap-2">
              <Link to="/templates" className={cn(buttonVariants({ size: "default" }))}>
                <LayoutTemplateIcon className="mr-2 size-4" />
                Ko'rish: Templates
              </Link>
              <Link to="/components" className={cn(buttonVariants({ variant: "outline", size: "default" }))}>
                <ArrowRightIcon className="mr-2 size-4" />
                Komponentlar bo'limi
              </Link>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {metricCards.map((metric) => (
              <Card key={metric.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{metric.title}</CardTitle>
                  <CardDescription>{metric.caption}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold tracking-tight">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  )
}


