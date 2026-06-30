import {
  AlertDialog,
  ConfirmDialog,
  DialogActions,
  Drawer,
  ModalShell,
  SheetShell,
} from "@/components/overlay"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Popover } from "@/components/ui/popover"
import { RightClickMenu } from "@/components/ui/right-click-menu"
import { Tooltip } from "@/components/ui/tooltip"
import { Dialog } from "@/components/ui/dialog"

const OverlayFamily = {
  Dialog,
  Popover,
  DropdownMenu,
  Tooltip,
  RightClickMenu,
  AlertDialog,
  ConfirmDialog,
  ModalShell,
  SheetShell,
  Drawer,
  DialogActions,
} as const

export { OverlayFamily }
