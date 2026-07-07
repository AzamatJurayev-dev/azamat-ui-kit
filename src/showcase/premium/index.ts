import * as React from "react"

import type { ComponentDemoBundle } from "./types"

import { alertMock, AlertShowcase } from "./alert"
import { AlertDialogShowcase, alertDialogMock } from "./alert-dialog"
import { accordionMock, AccordionShowcase } from "./accordion"
import { activityFeedMock, ActivityFeedShowcase } from "./activity-feed"
import { ActionMenuShowcase, actionMenuMock } from "./action-menu"
import { appShellMock, AppShellShowcase } from "./app-shell"
import { appSidebarMock, AppSidebarShowcase } from "./app-sidebar"
import { asyncMultiSelectMock, AsyncMultiSelectShowcase } from "./async-multi-select"
import { asyncSelectMock, AsyncSelectShowcase } from "./async-select"
import { avatarMock, AvatarShowcase } from "./avatar"
import { badgeMock, BadgeShowcase } from "./badge"
import { breadcrumbsMock, BreadcrumbsShowcase } from "./breadcrumbs"
import { buttonMock, ButtonShowcase } from "./button"
import { ButtonGroupShowcase, buttonGroupMock } from "./button-group"
import { calendarMock, CalendarShowcase } from "./calendar"
import { cardMock, CardShowcase } from "./card"
import { checkboxMock, CheckboxShowcase } from "./checkbox"
import { ClearableInputShowcase, clearableInputMock } from "./clearable-input"
import { collapseMock, CollapseShowcase } from "./collapse"
import { comboboxMock, ComboboxShowcase } from "./combobox"
import { commandBarMock, CommandBarShowcase } from "./command-bar"
import { ConfirmDialogShowcase, confirmDialogMock } from "./confirm-dialog"
import { commandPaletteMock, CommandPaletteShowcase } from "./command-palette"
import { copyButtonMock, CopyButtonShowcase } from "./copy-button"
import { copyFieldMock, CopyFieldShowcase } from "./copy-field"
import { dataTableMock, DataTableShowcase } from "./data-table"
import {
  DataTablePartShowcase,
  dataTableActionsColumnMock,
  dataTablePaginationMock,
  dataTableRowActionsMock,
  dataTableSavedFiltersMock,
  dataTableSelectColumnMock,
  dataTableToolbarMock,
} from "./data-table-parts"
import { dateInputMock, DateInputShowcase } from "./date-input"
import { DatePickerShowcase, datePickerMock } from "./date-picker"
import { DateRangeInputShowcase, dateRangeInputMock } from "./date-range-input"
import { DateRangePickerShowcase, dateRangePickerMock } from "./date-range-picker"
import { DescriptionListShowcase, descriptionListMock } from "./description-list"
import { dialogMock, DialogShowcase } from "./dialog"
import { dropdownMenuMock, DropdownMenuShowcase } from "./dropdown-menu"
import { DrawerShowcase, drawerMock } from "./drawer"
import { emptyStateMock, EmptyStateShowcase } from "./empty-state"
import { FormBuilderShowcase, formBuilderMock } from "./form-builder"
import { FormWrapperShowcase, formAsyncSelectMock, formRHFWrapperMock, formSelectMock } from "./form-wrapper"
import { hoverCardMock, HoverCardShowcase } from "./hover-card"
import { infoCardMock, InfoCardShowcase } from "./info-card"
import { inputMock, InputShowcase } from "./input"
import { kbdMock, KbdShowcase } from "./kbd"
import { listMock, ListShowcase } from "./list"
import { loadingStateMock, LoadingStateShowcase } from "./loading-state"
import { maskedInputMock, MaskedInputShowcase } from "./masked-input"
import { metricGridMock, MetricGridShowcase } from "./metric-grid"
import { modalShellMock, ModalShellShowcase } from "./modal-shell"
import { moneyInputMock, MoneyInputShowcase } from "./money-input"
import { NotificationCenterShowcase, notificationCenterMock } from "./notification-center"
import { numberInputMock, NumberInputShowcase } from "./number-input"
import { OtpInputShowcase, otpInputMock } from "./otp-input"
import { pageContainerMock, PageContainerShowcase } from "./page-container"
import { pageHeaderMock, PageHeaderShowcase } from "./page-header"
import { PageTabsShowcase, pageTabsMock } from "./page-tabs"
import { phoneInputMock, PhoneInputShowcase } from "./phone-input"
import { pageStateMock, PageStateShowcase } from "./page-state"
import { paginationMock, PaginationShowcase } from "./pagination"
import { popoverMock, PopoverShowcase } from "./popover"
import { propertyGridMock, PropertyGridShowcase } from "./property-grid"
import { ProgressShowcase, progressMock } from "./progress"
import { quantityInputMock, QuantityInputShowcase } from "./quantity-input"
import { radioGroupMock, RadioGroupShowcase } from "./radio-group"
import { resultMock, ResultShowcase } from "./result"
import { rightClickMenuMock, RightClickMenuShowcase } from "./right-click-menu"
import { scrollBoxMock, ScrollBoxShowcase } from "./scroll-box"
import { savedFilterSelectMock, SavedFilterSelectShowcase } from "./saved-filter-select"
import { searchInputMock, SearchInputShowcase } from "./search-input"
import { segmentedControlMock, SegmentedControlShowcase } from "./segmented-control"
import { selectMock, SelectShowcase } from "./select"
import { sheetShellMock, SheetShellShowcase } from "./sheet-shell"
import { sidebarNavMock, SidebarNavShowcase } from "./sidebar-nav"
import { simpleSelectMock, SimpleSelectShowcase } from "./simple-select"
import { sliderMock, SliderShowcase } from "./slider"
import { skeletonMock, SkeletonShowcase } from "./skeleton"
import { spinnerMock, SpinnerShowcase } from "./spinner"
import { switchMock, SwitchShowcase } from "./switch"
import { TagInputShowcase, tagInputMock } from "./tag-input"
import { tagListMock, TagListShowcase } from "./tag-list"
import { tableMock, TableShowcase } from "./table"
import { tabsMock, TabsShowcase } from "./tabs"
import { textareaMock, TextareaShowcase } from "./textarea"
import { TimelineShowcase, timelineMock } from "./timeline"
import { toastMock, ToastShowcase } from "./toast"
import { tooltipMock, TooltipShowcase } from "./tooltip"
import { fileUploadMock, FileUploadShowcase } from "./file-upload"
import { imageUploadMock, ImageUploadShowcase } from "./image-upload"
import { passwordInputMock, PasswordInputShowcase } from "./password-input"
import { ratingMock, RatingShowcase } from "./rating"

export { defaultComponentDemoState } from "./types"
export type { ComponentDemoBundle, ComponentDemoMock, ComponentDemoProps, ComponentDemoState } from "./types"

export const premiumShowcaseDemoRegistry: Record<string, ComponentDemoBundle> = {
  alert: { mock: alertMock, Showcase: AlertShowcase },
  "alert-dialog": { mock: alertDialogMock, Showcase: AlertDialogShowcase },
  accordion: { mock: accordionMock, Showcase: AccordionShowcase },
  "action-menu": { mock: actionMenuMock, Showcase: ActionMenuShowcase },
  button: { mock: buttonMock, Showcase: ButtonShowcase },
  "button-group": { mock: buttonGroupMock, Showcase: ButtonGroupShowcase },
  calendar: { mock: calendarMock, Showcase: CalendarShowcase },
  "command-bar": { mock: commandBarMock, Showcase: CommandBarShowcase },
  "command-palette": { mock: commandPaletteMock, Showcase: CommandPaletteShowcase },
  "clearable-input": { mock: clearableInputMock, Showcase: ClearableInputShowcase },
  input: { mock: inputMock, Showcase: InputShowcase },
  textarea: { mock: textareaMock, Showcase: TextareaShowcase },
  select: { mock: selectMock, Showcase: SelectShowcase },
  combobox: { mock: comboboxMock, Showcase: ComboboxShowcase },
  "radio-group": { mock: radioGroupMock, Showcase: RadioGroupShowcase },
  "simple-select": { mock: simpleSelectMock, Showcase: SimpleSelectShowcase },
  "async-select": { mock: asyncSelectMock, Showcase: AsyncSelectShowcase },
  "async-multi-select": { mock: asyncMultiSelectMock, Showcase: AsyncMultiSelectShowcase },
  avatar: { mock: avatarMock, Showcase: AvatarShowcase },
  "number-input": { mock: numberInputMock, Showcase: NumberInputShowcase },
  "money-input": { mock: moneyInputMock, Showcase: MoneyInputShowcase },
  "password-input": { mock: passwordInputMock, Showcase: PasswordInputShowcase },
  "date-input": { mock: dateInputMock, Showcase: DateInputShowcase },
  "date-range-input": { mock: dateRangeInputMock, Showcase: DateRangeInputShowcase },
  "date-picker": { mock: datePickerMock, Showcase: DatePickerShowcase },
  "date-range-picker": { mock: dateRangePickerMock, Showcase: DateRangePickerShowcase },
  "description-list": { mock: descriptionListMock, Showcase: DescriptionListShowcase },
  drawer: { mock: drawerMock, Showcase: DrawerShowcase },
  "otp-input": { mock: otpInputMock, Showcase: OtpInputShowcase },
  "quantity-input": { mock: quantityInputMock, Showcase: QuantityInputShowcase },
  rating: { mock: ratingMock, Showcase: RatingShowcase },
  "masked-input": { mock: maskedInputMock, Showcase: MaskedInputShowcase },
  "phone-input": { mock: phoneInputMock, Showcase: PhoneInputShowcase },
  "search-input": { mock: searchInputMock, Showcase: SearchInputShowcase },
  slider: { mock: sliderMock, Showcase: SliderShowcase },
  "tag-input": { mock: tagInputMock, Showcase: TagInputShowcase },
  "dropdown-menu": { mock: dropdownMenuMock, Showcase: DropdownMenuShowcase },
  "confirm-dialog": { mock: confirmDialogMock, Showcase: ConfirmDialogShowcase },
  checkbox: { mock: checkboxMock, Showcase: CheckboxShowcase },
  "copy-button": { mock: copyButtonMock, Showcase: CopyButtonShowcase },
  "copy-field": { mock: copyFieldMock, Showcase: CopyFieldShowcase },
  switch: { mock: switchMock, Showcase: SwitchShowcase },
  badge: { mock: badgeMock, Showcase: BadgeShowcase },
  card: { mock: cardMock, Showcase: CardShowcase },
  tabs: { mock: tabsMock, Showcase: TabsShowcase },
  collapse: { mock: collapseMock, Showcase: CollapseShowcase },
  kbd: { mock: kbdMock, Showcase: KbdShowcase },
  "modal-shell": { mock: modalShellMock, Showcase: ModalShellShowcase },
  "sheet-shell": { mock: sheetShellMock, Showcase: SheetShellShowcase },
  dialog: { mock: dialogMock, Showcase: DialogShowcase },
  popover: { mock: popoverMock, Showcase: PopoverShowcase },
  tooltip: { mock: tooltipMock, Showcase: TooltipShowcase },
  "hover-card": { mock: hoverCardMock, Showcase: HoverCardShowcase },
  "right-click-menu": { mock: rightClickMenuMock, Showcase: RightClickMenuShowcase },
  "data-table": { mock: dataTableMock, Showcase: DataTableShowcase },
  "data-table-pagination": { mock: dataTablePaginationMock, Showcase: (props) => React.createElement(DataTablePartShowcase, { ...props, slug: "data-table-pagination" }) },
  "data-table-toolbar": { mock: dataTableToolbarMock, Showcase: (props) => React.createElement(DataTablePartShowcase, { ...props, slug: "data-table-toolbar" }) },
  "data-table-row-actions": { mock: dataTableRowActionsMock, Showcase: (props) => React.createElement(DataTablePartShowcase, { ...props, slug: "data-table-row-actions" }) },
  "data-table-actions-column": { mock: dataTableActionsColumnMock, Showcase: (props) => React.createElement(DataTablePartShowcase, { ...props, slug: "data-table-actions-column" }) },
  "data-table-select-column": { mock: dataTableSelectColumnMock, Showcase: (props) => React.createElement(DataTablePartShowcase, { ...props, slug: "data-table-select-column" }) },
  "data-table-saved-filters": { mock: dataTableSavedFiltersMock, Showcase: (props) => React.createElement(DataTablePartShowcase, { ...props, slug: "data-table-saved-filters" }) },
  "saved-filter-select": { mock: savedFilterSelectMock, Showcase: SavedFilterSelectShowcase },
  "form-field": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-field-shell": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-input": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-select": { mock: formSelectMock, Showcase: FormWrapperShowcase },
  "form-async-select": { mock: formAsyncSelectMock, Showcase: FormWrapperShowcase },
  "form-textarea": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-switch": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-search-input": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-password-input": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-number-input": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-phone-input": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-date-input": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-date-range-input": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-date-picker": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-date-range-picker": { mock: formRHFWrapperMock, Showcase: FormWrapperShowcase },
  "form-builder": { mock: formBuilderMock, Showcase: FormBuilderShowcase },
  "segmented-control": { mock: segmentedControlMock, Showcase: SegmentedControlShowcase },
  skeleton: { mock: skeletonMock, Showcase: SkeletonShowcase },
  spinner: { mock: spinnerMock, Showcase: SpinnerShowcase },
  table: { mock: tableMock, Showcase: TableShowcase },
  sidebar: { mock: appSidebarMock, Showcase: AppSidebarShowcase },
  "app-sidebar": { mock: appSidebarMock, Showcase: AppSidebarShowcase },
  "app-shell": { mock: appShellMock, Showcase: AppShellShowcase },
  "sidebar-nav": { mock: sidebarNavMock, Showcase: SidebarNavShowcase },
  breadcrumbs: { mock: breadcrumbsMock, Showcase: BreadcrumbsShowcase },
  "page-header": { mock: pageHeaderMock, Showcase: PageHeaderShowcase },
  "page-container": { mock: pageContainerMock, Showcase: PageContainerShowcase },
  "page-state": { mock: pageStateMock, Showcase: PageStateShowcase },
  "page-tabs": { mock: pageTabsMock, Showcase: PageTabsShowcase },
  pagination: { mock: paginationMock, Showcase: PaginationShowcase },
  "metric-grid": { mock: metricGridMock, Showcase: MetricGridShowcase },
  "notification-center": { mock: notificationCenterMock, Showcase: NotificationCenterShowcase },
  "info-card": { mock: infoCardMock, Showcase: InfoCardShowcase },
  list: { mock: listMock, Showcase: ListShowcase },
  "property-grid": { mock: propertyGridMock, Showcase: PropertyGridShowcase },
  "activity-feed": { mock: activityFeedMock, Showcase: ActivityFeedShowcase },
  "empty-state": { mock: emptyStateMock, Showcase: EmptyStateShowcase },
  "loading-state": { mock: loadingStateMock, Showcase: LoadingStateShowcase },
  progress: { mock: progressMock, Showcase: ProgressShowcase },
  result: { mock: resultMock, Showcase: ResultShowcase },
  "file-upload": { mock: fileUploadMock, Showcase: FileUploadShowcase },
  "image-upload": { mock: imageUploadMock, Showcase: ImageUploadShowcase },
  "scroll-box": { mock: scrollBoxMock, Showcase: ScrollBoxShowcase },
  "tag-list": { mock: tagListMock, Showcase: TagListShowcase },
  timeline: { mock: timelineMock, Showcase: TimelineShowcase },
  toast: { mock: toastMock, Showcase: ToastShowcase },
}
