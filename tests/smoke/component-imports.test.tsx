import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  ActionMenu,
  ActivityFeed,
  AsyncSelect,
  Badge,
  Button,
  Calendar,
  ChatComposer,
  ChatMessage,
  Checkbox,
  CommandPalette,
  DataState,
  DataTable,
  DatePicker,
  FileUpload,
  InfoCard,
  Input,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldStepper,
  Pagination,
  Rating,
  RangeSlider,
  Slider,
  StateView,
  ToastProvider,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  Wizard,
} from "../../src"

type Product = {
  id: string
  name: string
  status: "active" | "inactive"
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
]

const products: Product[] = [
  { id: "1", name: "Keyboard", status: "active" },
]

const noop = () => undefined

export const smokeElements = [
  <Button key="button">Save</Button>,
  <Input key="input" aria-label="Name" />,
  <Checkbox key="checkbox" aria-label="Accept" />,
  <Input key="search" kind="search" value="" onValueChange={noop} />,
  <Pagination key="pagination" page={1} pageCount={3} onPageChange={noop} />,
  <Badge key="status" tone="success" dot>Active</Badge>,
  <DataState key="empty" status="empty" title="No data" />,
  <StateView key="loading" status="loading" title="Loading" />,
  <InfoCard key="info-card" title="Info">Content</InfoCard>,
  <ActivityFeed key="activity-feed" items={[{ id: "1", title: "Created", time: "now" }]} />,
  <ChatMessage key="chat-message" outgoing status="read">Ready</ChatMessage>,
  <ChatComposer key="chat-composer" onSend={noop} />,
  <ActionMenu key="action-menu" actions={[{ key: "edit", label: "Edit", onSelect: noop }]} />,
  <DataTable key="table" columns={columns} data={products} getRowId={(row: Product) => row.id} />,
  <AsyncSelect key="async-select" loadOptions={async () => []} />,
  <Calendar key="calendar" value="2026-01-01" onValueChange={noop} />,
  <DatePicker key="date-picker" value="2026-01-01" onValueChange={noop} />,
  <FileUpload key="file-upload" files={[]} onFilesChange={noop} />,
  <Slider key="slider" value={40} onValueChange={noop} />,
  <RangeSlider key="range-slider" value={[20, 80]} onValueChange={noop} />,
  <Rating key="rating" value={4} onValueChange={noop} />,
  <NumberField key="number-field" defaultValue={3}>
    <NumberFieldGroup>
      <NumberFieldInput aria-label="Quantity" />
      <NumberFieldStepper>
        <NumberFieldIncrement />
        <NumberFieldDecrement />
      </NumberFieldStepper>
    </NumberFieldGroup>
  </NumberField>,
  <ToggleGroup key="toggle-group" defaultValue={["day"]}>
    <ToggleGroupItem value="day">Day</ToggleGroupItem>
    <ToggleGroupItem value="week">Week</ToggleGroupItem>
  </ToggleGroup>,
  <Toolbar key="toolbar">
    <ToolbarGroup>
      <ToolbarButton>Bold</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton>Italic</ToolbarButton>
    </ToolbarGroup>
  </Toolbar>,
  <Wizard key="wizard" steps={[{ id: "one", title: "One" }]} currentStep="one" />,
  <CommandPalette key="command" open={false} onOpenChange={noop} groups={[]} />,
  <ToastProvider key="toast-provider"><div>App</div></ToastProvider>,
  <HoverCard key="hover-card"><HoverCardTrigger>Azamat</HoverCardTrigger><HoverCardContent>Workspace owner</HoverCardContent></HoverCard>,
  <Menubar key="menubar"><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New</MenubarItem></MenubarContent></MenubarMenu></Menubar>,
  <NavigationMenu key="navigation-menu">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent><NavigationMenuLink href="/docs">Docs</NavigationMenuLink></NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuPositioner><NavigationMenuViewport /></NavigationMenuPositioner>
  </NavigationMenu>,
]

export function SmokeComponent() {
  return <>{smokeElements}</>
}
