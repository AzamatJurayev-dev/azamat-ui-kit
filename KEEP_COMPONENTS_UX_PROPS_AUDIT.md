# Keep Components UX + Props Audit

Generated: 2026-06-30 11:40:18
Scope: `TASK.md` [KEEP] components only.
Status format: `[ ]` not audited yet, `[x]` audited + improved, `[! ]` flagged for merge/cleanup/possible deprecation.

## Foundation / UI primitives

- [ ] **button** — src\components\ui\button.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **input** — src\components\ui\input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [x] **textarea** — src\components\ui\textarea.tsx — props:yes — deprecated:no — props contract added: `TextareaProps`.
- [ ] **checkbox** — src\components\ui\checkbox.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **switch** — src\components\ui\switch.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **card** — src\components\ui\card.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **badge** — src\components\ui\badge.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [x] **tabs** — src\components\ui\tabs.tsx — props:yes — deprecated:no — props contracts added (`TabsRootProps`, `TabsListProps`, `TabsTriggerProps`, `TabsContentProps`).
- [x] **dialog** — src\components\ui\dialog.tsx — props:yes — deprecated:no — props contracts added for root/trigger/portal/content/footer/title/description.
- [x] **dropdown-menu** — src\components\ui\dropdown-menu.tsx — props:yes — deprecated:no — props contracts added for root/subcomponents.
- [x] **popover** — src\components\ui\popover.tsx — props:yes — deprecated:no — props contracts added for root/trigger/content/headers.
- [x] **select** — src\components\ui\select.tsx — props:yes — deprecated:no — props contracts added across root/group/value/trigger/content/item/label/scroll buttons.
- [ ] **table** — src\components\ui\table.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **collapse** — src\components\ui\collapse.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **skeleton** — src\components\ui\skeleton.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **divider** — src\components\ui\divider.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **segmented-control** — src\components\ui\segmented-control.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **spinner** — src\components\ui\spinner.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **tooltip** — src\components\ui\tooltip.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **kbd** — src\components\ui\kbd.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **radio-group** — src\components\ui\radio-group.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **scroll-box** — src\components\ui\scroll-box.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **right-click-menu** — src\components\ui\right-click-menu.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Inputs / field family

- [! ] **app-input** — src\components\inputs\app-input.tsx — props:yes — deprecated:yes — deprecated wrapper; merge/deprecate in canonical migration plan.
- [ ] **async-select** — src\components\inputs\async-select.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **simple-select** — src\components\inputs\simple-select.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **combobox** — src\components\inputs\combobox.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **color-input** — src\components\inputs\color-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **date-input** — src\components\inputs\date-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **date-range-input** — src\components\inputs\date-range-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **masked-input** — src\components\inputs\masked-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **money-input** — src\components\inputs\money-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **number-input** — src\components\inputs\number-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **otp-input** — src\components\inputs\otp-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **password-input** — src\components\inputs\password-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **phone-input** — src\components\inputs\phone-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **quantity-input** — src\components\inputs\quantity-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **quantity-stepper** — src\components\inputs\quantity-stepper.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **rating** — src\components\inputs\rating.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **search-input** — src\components\inputs\search-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **slider** — src\components\inputs\slider.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **tag-input** — src\components\inputs\tag-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Form wrappers

- [ ] **form-input** — src\components\form\form-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-field-shell** — src\components\form\form-field-shell.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-select** — src\components\form\form-select.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-textarea** — src\components\form\form-textarea.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-switch** — src\components\form\form-switch.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [! ] **form-search-input** — src\components\form\form-search-input.tsx — props:yes — deprecated:yes — deprecated wrapper; merge/deprecate in canonical migration plan.
- [! ] **form-password-input** — src\components\form\form-password-input.tsx — props:yes — deprecated:no — alias-style wrapper; merge candidate with canonical Input/FormInput + alias keep one major only.
- [! ] **form-number-input** — src\components\form\form-number-input.tsx — props:yes — deprecated:yes — deprecated wrapper; merge/deprecate in canonical migration plan.
- [! ] **form-phone-input** — src\components\form\form-phone-input.tsx — props:yes — deprecated:yes — deprecated wrapper; merge/deprecate in canonical migration plan.
- [! ] **form-app-input** — src\components\form\form-app-input.tsx — props:yes — deprecated:yes — deprecated wrapper; merge/deprecate in canonical migration plan.
- [! ] **form-date-input** — src\components\form\form-date-input.tsx — props:yes — deprecated:yes — deprecated wrapper; merge/deprecate in canonical migration plan.
- [ ] **form-date-picker** — src\components\form\form-date-picker.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-date-range-input** — src\components\form\form-date-range-input.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-date-range-picker** — src\components\form\form-date-range-picker.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-async-select** — src\components\form\form-async-select.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Layout & shell

- [ ] **app-shell** — src\components\layout\app-shell.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **app-header** — src\components\layout\app-header.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **app-sidebar** — src\components\layout\app-sidebar.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **breadcrumbs** — src\components\layout\breadcrumbs.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **page-header** — src\components\layout\page-header.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **page-container** — src\components\layout\page-container.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **sidebar-nav** — src\components\layout\sidebar-nav.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **section** — src\components\layout\section.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **section-header** — src\components\layout\section-header.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **stack** — src\components\layout\stack.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **stat-card** — src\components\layout\stat-card.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **sticky-footer-bar** — src\components\layout\sticky-footer-bar.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **workspace-shell** — src\components\layout\workspace-shell.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Navigation

- [ ] **anchor-nav** — src\components\navigation\anchor-nav.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **nav-tabs** — src\components\navigation\nav-tabs.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **page-tabs** — src\components\navigation\page-tabs.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **pagination** — src\components\navigation\pagination.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **stepper-tabs** — src\components\navigation\stepper-tabs.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Overlay & dialogs

- [ ] **alert-dialog** — src\components\overlay\alert-dialog.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **confirm-dialog** — src\components\overlay\confirm-dialog.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **dialog-actions** — src\components\overlay\dialog-actions.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **drawer** — src\components\overlay\drawer.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **sheet-shell** — src\components\overlay\sheet-shell.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **modal-shell** — src\components\overlay\modal-shell.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **hover-card** — src\components\ui\hover-card.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Data table family

- [ ] **data-table** — src\components\data-table\data-table.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-table-pagination** — src\components\data-table\data-table-pagination.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-table-toolbar** — src\components\data-table\data-table-toolbar.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-table-column-visibility-menu** — src\components\data-table\data-table-column-visibility-menu.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-table-select-column** — src\components\data-table\data-table-select-column.tsx — props:no — deprecated:no — no explicit Props type detected -> add typed public props contract.
- [ ] **data-table-sortable-header** — src\components\data-table\data-table-sortable-header.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-table-row-actions** — src\components\data-table\data-table-row-actions.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-table-actions-column** — src\components\data-table\data-table-actions-column.tsx — props:no — deprecated:no — no explicit Props type detected -> add typed public props contract.
- [ ] **data-table-bulk-actions** — src\components\data-table\data-table-bulk-actions.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-table-view-presets** — src\components\data-table\data-table-view-presets.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **table-export-menu** — src\components\data-table\table-export-menu.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **table-import-button** — src\components\data-table\table-import-button.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Feedback & states

- [ ] **alert** — src\components\feedback\alert.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **empty-state** — src\components\feedback\empty-state.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **loading-state** — src\components\feedback\loading-state.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **page-state** — src\components\feedback\page-state.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [! ] **status-badge** — src\components\feedback\status-badge.tsx — props:yes — deprecated:yes — deprecated wrapper; merge/deprecate in canonical migration plan.
- [ ] **filter-chips** — src\components\filters\filter-chips.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **filter-bar** — src\components\filters\filter-bar.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **quick-action-grid** — src\components\actions\quick-action-grid.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Display / cards

- [ ] **activity-feed** — src\components\display\activity-feed.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **avatar** — src\components\display\avatar.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **description-list** — src\components\display\description-list.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **descriptions** — src\components\display\descriptions.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **property-grid** — src\components\display\property-grid.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **kanban** — src\components\display\kanban.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **code-block** — src\components\display\code-block.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **data-state** — src\components\display\data-state.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **entity-card** — src\components\display\entity-card.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **file-card** — src\components\display\file-card.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **list** — src\components\display\list.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **metric-card** — src\components\display\metric-card.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **metric-grid** — src\components\display\metric-grid.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **progress** — src\components\display\progress.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **progress-circle** — src\components\display\progress-circle.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **result** — src\components\display\result.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **statistic** — src\components\display\statistic.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **status-dot** — src\components\display\status-dot.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **status-legend** — src\components\display\status-legend.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **tag-list** — src\components\display\tag-list.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **timeline** — src\components\display\timeline.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **tree-view** — src\components\display\tree-view.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **user-card** — src\components\display\user-card.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **info-card** — MISSING — locate implementation and decide if remains public.

## Calendar / date

- [ ] **calendar** — src\components\calendar\calendar.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **date-picker** — src\components\calendar\date-picker.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **date-range-picker** — src\components\calendar\date-range-picker.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **date-utils** — src\components\calendar\date-utils.ts — props:no — deprecated:no — no explicit Props type detected -> add typed public props contract.

## Upload

- [ ] **file-upload** — src\components\upload\file-upload.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **image-upload** — src\components\upload\image-upload.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **file-dropzone** — src\components\upload\file-dropzone.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Notification / command

- [ ] **toast** — src\components\notifications\toast.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **command-palette** — src\components\command\command-palette.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Charts

- [ ] **charts** — src\components\charts\charts.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **kpi** — src\components\charts\kpi.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **progress-ring** — src\components\charts\progress-ring.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **horizontal-bar-chart** — src\components\charts\horizontal-bar-chart.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Wizard / patterns

- [ ] **stepper** — src\components\wizard\stepper.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **wizard** — src\components\wizard\wizard.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **resource-page** — src\components\patterns\resource-page.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **resource-detail-page** — src\components\patterns\resource-detail-page.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).
- [ ] **form-builder** — src\components\patterns\form-builder.tsx — props:yes — deprecated:no — props contract exists, need full UX+state audit (focus, disabled, loading, error, keyboard, a11y labels).

## Global mandatory tasks
- [ ] [P0] Light/dark, spacing rhythm, contrast and focus-ring parity for all `KEEP` components.
- [ ] [P0] Add/refresh props matrix for each component (required/optional/defaults/controlled state).
- [ ] [P0] Add one “real interactive demo” pattern for every `KEEP` component.
- [ ] [P1] Resolve merge/cleanup candidates: app-input, form-app-input/form-* wrappers, status-badge, info-card alias handling.
- [ ] [P1] Decide helper-tier visibility for `table-export-menu`, `table-import-button`, and `workspace-shell`.
