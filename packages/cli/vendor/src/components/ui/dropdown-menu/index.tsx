import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

export type DropdownMenuRootProps = MenuPrimitive.Root.Props
export type DropdownMenuPortalProps = MenuPrimitive.Portal.Props
export type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props
export type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >
export type DropdownMenuGroupProps = MenuPrimitive.Group.Props
export type DropdownMenuLabelProps = React.ComponentProps<"div"> & { inset?: boolean }
export type DropdownMenuItemProps = MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
  closeOnSelect?: boolean
}
export type DropdownMenuSubmenuProps = MenuPrimitive.SubmenuRoot.Props
export type DropdownMenuSubmenuTriggerProps = MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}
export type DropdownMenuSubmenuContentProps = React.ComponentProps<typeof DropdownMenuContent>
export type DropdownMenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
  closeOnSelect?: boolean
}
export type DropdownMenuRadioGroupProps = MenuPrimitive.RadioGroup.Props
export type DropdownMenuRadioItemProps = MenuPrimitive.RadioItem.Props & {
  inset?: boolean
  closeOnSelect?: boolean
}
export type DropdownMenuSeparatorProps = MenuPrimitive.Separator.Props
export type DropdownMenuShortcutProps = React.ComponentProps<"span">
export type DropdownMenuItemDescriptionProps = React.ComponentProps<"span">

const menuItemClassName =
  "relative flex cursor-default items-center gap-2 rounded-[var(--radius-md)] border border-transparent px-3 py-2.5 text-sm text-popover-foreground outline-hidden select-none transition-[background-color,border-color,color,box-shadow] data-[highlighted]:border-[color:color-mix(in_oklch,var(--primary),transparent_72%)] data-[highlighted]:bg-[color:color-mix(in_oklch,var(--primary),transparent_92%)] data-[highlighted]:text-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:border-[color:color-mix(in_oklch,var(--destructive),transparent_70%)] data-[variant=destructive]:data-[highlighted]:bg-[color:color-mix(in_oklch,var(--destructive),transparent_90%)] data-[variant=destructive]:data-[highlighted]:text-destructive data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
  if (!("render" in props) && React.isValidElement(props.children)) {
    const { children, ...rest } = props
    return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" render={children} {...rest} />
  }

  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-56 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-[color:var(--aui-overlay-surface,var(--popover))] p-2 text-popover-foreground shadow-[var(--aui-popover-shadow,0_18px_42px_rgba(15,23,42,0.16))] duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/90 data-inset:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  closeOnSelect = true,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item data-inset:pl-8",
        menuItemClassName,
        className
      )}
      onSelect={(event) => {
        if (!closeOnSelect) {
          event.preventDefault()
        }
        onSelect?.(event)
      }}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: DropdownMenuSubmenuProps) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubmenuTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "group/dropdown-menu-item data-inset:pl-8",
        menuItemClassName,
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto text-muted-foreground group-data-[highlighted]/dropdown-menu-item:text-foreground" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: DropdownMenuSubmenuContentProps) {
  return (
      <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[128px] rounded-[var(--aui-card-radius,var(--radius-xl))] p-2 text-popover-foreground duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  closeOnSelect = true,
  onSelect,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "group/dropdown-menu-item pr-9 data-inset:pl-8 data-[checked]:bg-muted/70 data-[checked]:font-medium",
        menuItemClassName,
        className
      )}
      checked={checked}
      onSelect={(event) => {
        if (!closeOnSelect) {
          event.preventDefault()
        }
        onSelect?.(event)
      }}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  closeOnSelect = true,
  onSelect,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "group/dropdown-menu-item pr-9 data-inset:pl-8 data-[checked]:bg-muted/70 data-[checked]:font-medium",
        menuItemClassName,
        className
      )}
      onSelect={(event) => {
        if (!closeOnSelect) {
          event.preventDefault()
        }
        onSelect?.(event)
      }}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1.5 h-px bg-border/80", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto rounded bg-muted/70 px-1.5 py-0.5 text-[11px] font-medium tracking-[0.08em] text-muted-foreground group-data-[highlighted]/dropdown-menu-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItemDescription({
  className,
  ...props
}: DropdownMenuItemDescriptionProps) {
  return (
    <span
      data-slot="dropdown-menu-item-description"
      className={cn("block text-xs leading-5 text-muted-foreground group-data-[highlighted]/dropdown-menu-item:text-foreground/70", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuItemDescription,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
