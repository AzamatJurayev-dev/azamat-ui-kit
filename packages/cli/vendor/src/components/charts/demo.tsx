import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const chartsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("charts", "ChartFrame", "display", "Chart primitives for dashboard metrics, distribution and trend views.", "ChartFrame"),
])
