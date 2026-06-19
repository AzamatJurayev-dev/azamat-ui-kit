export type PresetFile = {
  source: string
  target: string
}

export const presetFiles: Record<string, PresetFile[]> = {
  minimal: [
    { source: "src/lib/utils.ts", target: "{utils}" },
    { source: "src/components/ui/button.tsx", target: "{ui}/button.tsx" },
    { source: "src/components/ui/input.tsx", target: "{ui}/input.tsx" },
    { source: "src/components/ui/card.tsx", target: "{ui}/card.tsx" },
    { source: "src/components/ui/badge.tsx", target: "{ui}/badge.tsx" }
  ],
  dashboard: [
    { source: "src/lib/utils.ts", target: "{utils}" },
    { source: "src/components/ui/button.tsx", target: "{ui}/button.tsx" },
    { source: "src/components/ui/input.tsx", target: "{ui}/input.tsx" },
    { source: "src/components/ui/card.tsx", target: "{ui}/card.tsx" },
    { source: "src/components/ui/badge.tsx", target: "{ui}/badge.tsx" },
    { source: "src/components/ui/dropdown-menu.tsx", target: "{ui}/dropdown-menu.tsx" },
    { source: "src/components/ui/skeleton.tsx", target: "{ui}/skeleton.tsx" },
    { source: "src/components/ui/tabs.tsx", target: "{ui}/tabs.tsx" },
    { source: "src/components/feedback/page-state.tsx", target: "{components}/feedback/page-state.tsx" },
    { source: "src/components/display/property-grid.tsx", target: "{components}/display/property-grid.tsx" },
    { source: "src/components/display/smart-card.tsx", target: "{components}/display/smart-card.tsx" },
    { source: "src/components/display/entity-card.tsx", target: "{components}/display/entity-card.tsx" },
    { source: "src/components/patterns/action-system.tsx", target: "{components}/patterns/action-system.tsx" },
    { source: "src/components/patterns/status-system.tsx", target: "{components}/patterns/status-system.tsx" },
    { source: "src/components/patterns/filter-builder.tsx", target: "{components}/patterns/filter-builder.tsx" },
    { source: "src/components/patterns/data-view.tsx", target: "{components}/patterns/data-view.tsx" },
    { source: "src/components/patterns/entity-details.tsx", target: "{components}/patterns/entity-details.tsx" },
    { source: "src/components/patterns/resource-system.tsx", target: "{components}/patterns/resource-system.tsx" },
    { source: "src/components/patterns/crud-system.tsx", target: "{components}/patterns/crud-system.tsx" },
    { source: "src/components/form/form-actions.tsx", target: "{components}/form/form-actions.tsx" },
    { source: "src/components/form/form-section.tsx", target: "{components}/form/form-section.tsx" },
    { source: "src/components/form/smart-form-shell.tsx", target: "{components}/form/smart-form-shell.tsx" },
    { source: "src/components/layout/workspace-shell.tsx", target: "{components}/layout/workspace-shell.tsx" }
  ]
}
