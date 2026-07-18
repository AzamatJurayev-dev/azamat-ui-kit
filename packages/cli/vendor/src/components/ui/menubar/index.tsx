"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type MenubarProps = MenubarPrimitive.Props
export type MenubarMenuProps = MenuPrimitive.Root.Props
export type MenubarTriggerProps = MenuPrimitive.Trigger.Props
export type MenubarContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">
export type MenubarItemProps = MenuPrimitive.Item.Props & { inset?: boolean; variant?: "default" | "destructive" }
export type MenubarCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & { inset?: boolean }
export type MenubarRadioGroupProps = MenuPrimitive.RadioGroup.Props
export type MenubarRadioItemProps = MenuPrimitive.RadioItem.Props & { inset?: boolean }
export type MenubarSubProps = MenuPrimitive.SubmenuRoot.Props
export type MenubarSubTriggerProps = MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }
export type MenubarSeparatorProps = MenuPrimitive.Separator.Props
export type MenubarLabelProps = React.ComponentProps<"div"> & { inset?: boolean }
export type MenubarShortcutProps = React.ComponentProps<"span">

const itemClassName =
  "relative flex min-h-8 cursor-default select-none items-center gap-2 rounded-[var(--radius-md)] px-2.5 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus-visible:bg-destructive/10 data-[variant=destructive]:hover:bg-destructive/10"

function Menubar({ className, ...props }: MenubarProps) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn("flex h-10 items-center gap-1 rounded-[var(--radius-lg)] border border-border bg-card p-1 text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: MenubarMenuProps) {
  return <MenuPrimitive.Root data-slot="menubar-menu" {...props} />
}

function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn("inline-flex h-8 items-center justify-center rounded-[var(--radius-md)] px-3 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50", className)}
      {...props}
    />
  )
}

function MenubarContent({ className, align = "start", alignOffset = 0, side = "bottom", sideOffset = 6, ...props }: MenubarContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className="isolate z-50 outline-none">
        <MenuPrimitive.Popup
          data-slot="menubar-content"
          className={cn("z-50 min-w-48 origin-(--transform-origin) overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function MenubarItem({ className, inset, variant = "default", ...props }: MenubarItemProps) {
  return <MenuPrimitive.Item data-slot="menubar-item" data-inset={inset || undefined} data-variant={variant} className={cn(itemClassName, className)} {...props} />
}

function MenubarCheckboxItem({ className, children, checked, inset, ...props }: MenubarCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="menubar-checkbox-item" data-inset={inset || undefined} className={cn(itemClassName, "pl-8", className)} checked={checked} {...props}>
      <span className="absolute left-2 inline-flex size-4 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator><CheckIcon className="size-4" /></MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenubarRadioGroup({ ...props }: MenubarRadioGroupProps) {
  return <MenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({ className, children, inset, ...props }: MenubarRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem data-slot="menubar-radio-item" data-inset={inset || undefined} className={cn(itemClassName, "pl-8", className)} {...props}>
      <span className="absolute left-2 inline-flex size-4 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator><CheckIcon className="size-4" /></MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function MenubarSub({ ...props }: MenubarSubProps) {
  return <MenuPrimitive.SubmenuRoot data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({ className, children, inset, ...props }: MenubarSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger data-slot="menubar-sub-trigger" data-inset={inset || undefined} className={cn(itemClassName, className)} {...props}>
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function MenubarSubContent(props: MenubarContentProps) {
  return <MenubarContent data-slot="menubar-sub-content" side="right" align="start" alignOffset={-4} sideOffset={0} {...props} />
}

function MenubarSeparator({ className, ...props }: MenubarSeparatorProps) {
  return <MenuPrimitive.Separator data-slot="menubar-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

function MenubarLabel({ className, inset, ...props }: MenubarLabelProps) {
  return <div data-slot="menubar-label" data-inset={inset || undefined} className={cn("px-2.5 py-1.5 text-xs font-semibold text-muted-foreground data-[inset=true]:pl-8", className)} {...props} />
}

function MenubarShortcut({ className, ...props }: MenubarShortcutProps) {
  return <span data-slot="menubar-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
