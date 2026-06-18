import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/index"

import type { ComponentDemoProps } from "../types"

import { tabsDemoPanels } from "./data"

export function TabsShowcase({ state, setState }: ComponentDemoProps) {
  return (
    <Tabs value={state.activeTab} onValueChange={(value) => setState({ activeTab: value as ComponentDemoProps["state"]["activeTab"] })}>
      <TabsList>
        {tabsDemoPanels.map((panel) => (
          <TabsTrigger key={panel.value} value={panel.value}>{panel.label}</TabsTrigger>
        ))}
      </TabsList>
      {tabsDemoPanels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value} className="rounded-2xl border border-zinc-200 p-4">{panel.content}</TabsContent>
      ))}
    </Tabs>
  )
}
