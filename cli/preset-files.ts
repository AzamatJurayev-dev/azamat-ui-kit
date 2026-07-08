export type PresetFile = {
  source: string
  target: string
}

export const presetFiles: Record<string, PresetFile[]> = {
  minimal: [
    { source: "src/lib/utils.ts", target: "{utils}" },
    { source: "src/components/ui/button", target: "{ui}/button" },
    { source: "src/components/ui/input", target: "{ui}/input" },
    { source: "src/components/ui/card", target: "{ui}/card" },
    { source: "src/components/ui/badge", target: "{ui}/badge" }
  ],
  dashboard: [
    { source: "src/lib/utils.ts", target: "{utils}" },
    { source: "src/components/ui/button", target: "{ui}/button" },
    { source: "src/components/ui/input", target: "{ui}/input" },
    { source: "src/components/ui/card", target: "{ui}/card" },
    { source: "src/components/ui/badge", target: "{ui}/badge" },
    { source: "src/components/ui/dropdown-menu.tsx", target: "{ui}/dropdown-menu.tsx" },
    { source: "src/components/ui/skeleton.tsx", target: "{ui}/skeleton.tsx" },
    { source: "src/components/ui/tabs.tsx", target: "{ui}/tabs.tsx" },
    { source: "src/components/feedback/page-state.tsx", target: "{components}/feedback/page-state.tsx" },
    { source: "src/components/filters/filter-bar.tsx", target: "{components}/filters/filter-bar.tsx" },
    { source: "src/components/display/property-grid.tsx", target: "{components}/display/property-grid.tsx" },
    { source: "src/components/display/smart-card.tsx", target: "{components}/display/smart-card.tsx" },
    { source: "src/components/data-table/data-table.tsx", target: "{components}/data-table/data-table.tsx" }
  ]
}
