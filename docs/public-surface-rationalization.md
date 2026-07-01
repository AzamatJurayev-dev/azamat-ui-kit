# Public Surface Rationalization

This document defines which exports should lead the public catalog and which exports should stay as variants, helpers, aliases, or advanced members.

## Feedback

Public core:

- Alert
- EmptyState
- LoadingState
- Progress
- ToastProvider

Secondary or variant-level:

- InlineState
- LoadingOverlay
- Spinner
- Skeleton
- useToast

Reason: the public mental model should be status, empty, loading, progress, and notification. Spinner and skeleton are loading variants, not first-level products.

## Charts and metrics

Public core:

- BarChart
- LineChart
- DonutChart
- MetricGrid

Secondary or variant-level:

- ChartFrame
- ChartLegend
- Sparkline
- MetricTrend
- Statistic
- StatisticGrid
- StatisticCard

Reason: chart frame and legend are chart internals. Statistic-style exports should be represented through metric surfaces instead of several near-duplicate public names.

## Actions

Public core:

- Button
- ActionMenu
- CopyButton

Secondary or variant-level:

- ButtonGroup
- CopyField
- QuickActionGrid

Reason: ButtonGroup is a button pattern, CopyField is a copy pattern, and QuickActionGrid is a layout/action pattern rather than a primary component.

## Navigation and layout

Public core:

- Sidebar
- PageContainer
- Tabs
- Pagination
- Breadcrumbs
- Wizard

Secondary or variant-level:

- Section
- AnchorNav
- Stepper
- StepperTabs
- SegmentedControl

Reason: these are structural helpers or variants around tabs, wizard, and page layout.

## Upload

Public core:

- FileUpload
- ImageUpload

Reason: both have enough product behavior to be public if ImageUpload supports preview, remove, validation, retry, or image-specific UX. If ImageUpload is only FileUpload with image accept, move it to FileUpload variant docs.

## Primitives

Public core:

- Checkbox
- RadioGroup
- Switch
- Table
- Accordion

Secondary or variant-level:

- Collapse
- Calendar
- Divider
- Kbd
- ScrollBox

Reason: primitives should support higher-level surfaces. They should not dominate the main component catalog.

## Rule

If a component can be recreated from a base component with one prop or a simple composition, it should not lead the public catalog. If it contains real state, accessibility, formatting, async behavior, preview, validation, or workflow logic, it can be a public surface.
