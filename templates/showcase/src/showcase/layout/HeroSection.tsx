import { PlusIcon, SettingsIcon } from "lucide-react"

import { CopyButton } from "@/components/actions/copy-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { moduleCount, registryGroups } from "@/showcase/data/registry"

const metrics = [
  { label: "Registry components", value: moduleCount, change: "visible below", description: "tembro add <name>" },
  { label: "Local source files", value: "152", change: "with hooks/lib", description: "installed by CLI" },
  { label: "Categories", value: registryGroups.length, change: "all shown", description: "actions to wizard" },
  { label: "Build", value: "Pass", change: "doctor pass", description: "tembro@6.1.1" },
]

export function HeroSection() {
  return (
    <section className="border-b bg-card">
      <div className="w-full px-6 py-8 lg:px-8 2xl:px-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge status="success" label="tembro init done" variant="soft" />
              <Badge status="info" label={`${moduleCount} registry components`} variant="soft" />
              <Badge status="warning" label="real local components" variant="soft" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">All Tembro Components Test Surface</h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Vite starter olib tashlandi. Bu ekran `tembro add showcase` orqali o‘rnatilgan aniq registry componentlardan qurildi.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button leftIcon={<PlusIcon className="size-4" />}>Create</Button>
            <Button variant="outline" leftIcon={<SettingsIcon className="size-4" />}>Settings</Button>
            <CopyButton value="npx tembro@6.1.1 list --json">Copy list command</CopyButton>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-5 text-2xl font-semibold tracking-tight">{metric.value}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <Badge tone="success" variant="soft">{metric.change}</Badge>
                  <span className="text-muted-foreground">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

