import { useState } from "react"
import { BellIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { resolveWorkbenchSelection } from "@/showcase/data/registry"
import { HeroSection } from "@/showcase/layout/HeroSection"
import { WorkbenchSidebar } from "@/showcase/layout/WorkbenchSidebar"
import { CalendarSection } from "@/showcase/sections/CalendarSection"
import { CategorySection } from "@/showcase/sections/CategorySection"
import { ComponentDetailSection } from "@/showcase/sections/ComponentDetailSection"
import { CoreUiSection } from "@/showcase/sections/CoreUiSection"
import { DataTableSection } from "@/showcase/sections/DataTableSection"
import { FormsSection } from "@/showcase/sections/FormsSection"
import { InventorySection } from "@/showcase/sections/InventorySection"
import { KanbanSection } from "@/showcase/sections/KanbanSection"
import { OverlaySection } from "@/showcase/sections/OverlaySection"
import { PatternsSection } from "@/showcase/sections/PatternsSection"
import { VerificationSection } from "@/showcase/sections/VerificationSection"
import { WizardSection } from "@/showcase/sections/WizardSection"
import { SectionTitle } from "@/showcase/shared/SectionTitle"

function OverviewContent() {
  return (
    <>
      <section>
        <SectionTitle
          title="Live Component Sections"
          description="Har bir katta category o‘z faylida: sidebar, kanban, data-table, calendar, overlay, wizard, UI controls va style variantlar."
        />
        <Tabs defaultValue="ui">
          <TabsList overflow="wrap">
            <TabsTrigger value="ui">UI</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="overlay">Overlay</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="wizard">Wizard</TabsTrigger>
          </TabsList>

          <TabsContent value="ui" className="mt-5">
            <CoreUiSection />
          </TabsContent>
          <TabsContent value="forms" className="mt-5">
            <FormsSection />
          </TabsContent>
          <TabsContent value="data" className="mt-5">
            <DataTableSection />
          </TabsContent>
          <TabsContent value="kanban" className="mt-5">
            <KanbanSection />
          </TabsContent>
          <TabsContent value="calendar" className="mt-5">
            <CalendarSection />
          </TabsContent>
          <TabsContent value="overlay" className="mt-5">
            <OverlaySection />
          </TabsContent>
          <TabsContent value="patterns" className="mt-5">
            <PatternsSection />
          </TabsContent>
          <TabsContent value="wizard" className="mt-5">
            <WizardSection />
          </TabsContent>
        </Tabs>
      </section>

      <InventorySection />
      <VerificationSection />
    </>
  )
}

function App() {
  const [selectedKey, setSelectedKey] = useState("overview")
  const selection = resolveWorkbenchSelection(selectedKey)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <WorkbenchSidebar selectedKey={selectedKey} onSelect={setSelectedKey} />

        <div className="min-w-0">
          <HeroSection />

          <div className="grid w-full gap-10 px-6 py-10 lg:px-8 2xl:px-10">
            {selection.type === "overview" ? <OverviewContent /> : null}
            {selection.type === "category" ? (
              <CategorySection group={selection.group} onSelect={setSelectedKey} />
            ) : null}
            {selection.type === "module" ? (
              <ComponentDetailSection group={selection.group} component={selection.component} />
            ) : null}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 hidden rounded-full border bg-card px-4 py-2 text-sm shadow-lg md:flex md:items-center md:gap-2">
        <BellIcon className="size-4 text-primary" />
        <span>Local Tembro workbench active</span>
      </div>
    </main>
  )
}

export default App
