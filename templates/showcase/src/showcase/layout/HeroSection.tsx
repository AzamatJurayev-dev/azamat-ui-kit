import { PlusIcon, SettingsIcon } from "lucide-react"

import { CopyButton } from "@/components/actions/copy-button"
import { StatisticCard, StatisticGrid } from "@/components/display/statistic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { moduleCount, registryGroups } from "@/showcase/data/registry"

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
            <CopyButton value="npx tembro@4.2.1 list --json">Copy list command</CopyButton>
          </div>
        </div>

        <StatisticGrid columns={4} className="mt-8">
          <StatisticCard label="Registry components" value={moduleCount} change="visible below" trend="up" description="tembro add <name>" />
          <StatisticCard label="Local source files" value="152" change="with hooks/lib" trend="up" description="installed by CLI" />
          <StatisticCard label="Categories" value={registryGroups.length} change="all shown" trend="up" description="actions to wizard" />
          <StatisticCard label="Build" value="Pass" change="doctor pass" trend="up" description="tembro@4.2.1" />
        </StatisticGrid>
      </div>
    </section>
  )
}
