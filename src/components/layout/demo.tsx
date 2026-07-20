import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const layoutShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("sidebar-context", "SidebarProvider", "layout", "Shared desktop collapse and mobile drawer state for the workspace sidebar."),
  component("workspace-layout", "WorkspaceLayout", "layout", "Viewport-safe workspace shell with sidebar, header and independently scrolling main content."),
])
