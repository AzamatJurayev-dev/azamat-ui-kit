import type { ComponentDemoMock } from "../types"

export const statisticMock: ComponentDemoMock = {
  code: `import { Statistic, StatisticCard, StatisticGrid } from "@/index"

export function Example() {
  return (
    <StatisticGrid columns={3}>
      <StatisticCard label="Revenue" value="$24.8k" change="+12.4%" trend="up" />
      <StatisticCard label="Errors" value="14" change="-3.1%" trend="down" />
      <StatisticCard label="Conversion" value="6.3%" description="vs last 30 days" />
    </StatisticGrid>
  )
}`,
  cliCommand: "npx tembro add statistic",
  highlights: [
    "Single statistic, statistic card and grid exports work together",
    "Trend badge, loading state and description support",
    "Useful for dashboard headers and KPI summaries",
  ],
  scenarios: [
    { title: "KPI row", description: "Summarize top metrics across a dashboard." },
    { title: "Module summary", description: "Give a feature area one compact numeric header." },
    { title: "Loading metric", description: "Reserve metric space while upstream data resolves." },
  ],
}
