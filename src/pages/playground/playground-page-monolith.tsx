import * as React from "react"
import {
  BellIcon,
  CalendarDaysIcon,
  CommandIcon,
  FileTextIcon,
  Grid2X2Icon,
  LayersIcon,
  ListChecksIcon,
  MoonIcon,
  PanelLeftIcon,
  SettingsIcon,
  SparklesIcon,
  SunIcon,
  UploadCloudIcon,
  BookOpenIcon,
  LayoutDashboardIcon,
  Link2Icon,
  BlocksIcon,
} from "lucide-react"
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom"

import {
  AppHeader,
  AppShell,
  AppSidebar,
  Badge,
  Breadcrumbs,
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CommandPalette,
  EmptyState,
  LoadingState,
  PageContainer,
  PageHeader,
  SidebarNav,
  ToastProvider,
  useCommandPaletteShortcut,
  useToast,
} from "@/index"

import { CalendarSection } from "./playground-calendar"
import { DisplaySection } from "./playground-display"
import { LandingSection } from "./playground-landing"
import { TemplatesSection, TemplateShowcasePage, getTemplateBySlug, getTemplateRoute } from "./playground-templates"
import { FoundationSection } from "./playground-foundation"
import { FormsSection } from "./playground-forms"
import { InputsSection } from "./playground-inputs"
import { OverlaySection } from "./playground-overlay"
import { PatternsSection } from "./playground-patterns"
import { TableSection } from "./playground-table"
import { UploadSection } from "./playground-upload"
import { templateCatalog } from "./playground-data"

type ComponentPageDefinition = {
  id: string
  slug: string
  path: string
  title: string
  description: string
  icon: React.ReactNode
  element: React.ReactNode
}

type RouteMeta = {
  title: string
  description: string
}

function normalizePath(pathname: string) {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1)
  }

  return pathname
}

function getTemplateTitle(slug: string) {
  return getTemplateBySlug(slug)?.title
}

const componentPages: Omit<ComponentPageDefinition, "path" | "element">[] = [
  { id: "foundation", slug: "foundation", title: "Foundation", description: "Primitives, tokens, base controls", icon: <SparklesIcon className="size-4" /> },
  { id: "inputs", slug: "inputs", title: "Inputs", description: "Input, select, textarea and field behavior", icon: <SettingsIcon className="size-4" /> },
  { id: "forms", slug: "forms", title: "Forms", description: "Form patterns with validation and state", icon: <ListChecksIcon className="size-4" /> },
  { id: "display", slug: "display", title: "Display", description: "Metrics, info cards, activity and result states", icon: <FileTextIcon className="size-4" /> },
  { id: "patterns", slug: "patterns", title: "Patterns", description: "Resource pages, detail pages, builders and shells", icon: <BlocksIcon className="size-4" /> },
  { id: "table", slug: "table", title: "Data table", description: "Sorting, pagination, selection and actions", icon: <LayersIcon className="size-4" /> },
  { id: "upload", slug: "upload", title: "Upload", description: "Dropzones, file metadata, and progress patterns", icon: <UploadCloudIcon className="size-4" /> },
  { id: "calendar", slug: "calendar", title: "Calendar", description: "Calendar picker and schedule UI", icon: <CalendarDaysIcon className="size-4" /> },
  { id: "overlay", slug: "overlay", title: "Overlay", description: "Dialog, sheet, popover and action patterns", icon: <PanelLeftIcon className="size-4" /> },
]

function ComponentsIndexPage({ sections }: { sections: ComponentPageDefinition[] }) {
  return (
    <section className="grid gap-8">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Components</Badge>
            <Badge variant="outline">{sections.length} sections</Badge>
            <Badge variant="outline">Route-first</Badge>
          </div>
          <div className="space-y-3">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Docs.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Every family has its own route, preview surface, and usage path. Start from the section index, inspect live
              examples, then copy the code you need.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/components/foundation" className={buttonVariants({ size: "sm" })}>
              Start with foundation
            </Link>
            <Link to="/components/patterns" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Browse patterns
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border bg-background/90 p-4 shadow-sm shadow-primary/5">
              <p className="text-xs text-muted-foreground">Families</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">9+</p>
              <p className="mt-1 text-xs text-muted-foreground">Every major control group has a route.</p>
            </div>
            <div className="rounded-2xl border bg-background/90 p-4 shadow-sm shadow-primary/5">
              <p className="text-xs text-muted-foreground">Routes</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">1:1</p>
              <p className="mt-1 text-xs text-muted-foreground">Docs pages map directly to component families.</p>
            </div>
            <div className="rounded-2xl border bg-background/90 p-4 shadow-sm shadow-primary/5">
              <p className="text-xs text-muted-foreground">Preview</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">Live</p>
              <p className="mt-1 text-xs text-muted-foreground">Mock data and controls demonstrate states.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border bg-background p-4 shadow-lg shadow-primary/5">
            <div className="flex items-center justify-between gap-3 border-b pb-3">
              <div>
                <p className="text-sm font-medium">Install</p>
                <p className="text-xs text-muted-foreground">Use code, not screenshots.</p>
              </div>
              <Badge variant="outline">npm</Badge>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border bg-muted/20 p-4 text-xs leading-6 text-muted-foreground">
{`npm install azamat-ui-kit

import { Button } from "@/index"`}
            </pre>
          </div>

          <div className="rounded-3xl border bg-muted/15 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Routes</p>
                <p className="text-xs text-muted-foreground">Direct routes.</p>
              </div>
              <Badge variant="outline">Docs</Badge>
            </div>
            <div className="grid gap-2">
              <Link to="/components/foundation" className="rounded-xl border bg-background px-3 py-2 text-sm transition-colors hover:border-primary/45 hover:bg-muted/30">
                Foundation controls
              </Link>
              <Link to="/components/forms" className="rounded-xl border bg-background px-3 py-2 text-sm transition-colors hover:border-primary/45 hover:bg-muted/30">
                Form states and builders
              </Link>
              <Link to="/templates" className="rounded-xl border bg-background px-3 py-2 text-sm transition-colors hover:border-primary/45 hover:bg-muted/30">
                Template showcase
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.id} className="group relative overflow-hidden transition-colors hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md hover:shadow-primary/5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border bg-muted text-muted-foreground">
                  {section.icon}
                </div>
                <Badge variant="outline" className="text-[11px]">
                  /components/{section.slug}
                </Badge>
              </div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-[11px]">
                  Route
                </Badge>
                <Badge variant="outline" className="text-[11px]">
                  Docs
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-2xl border bg-background/90 p-3">
                  <p className="text-xs text-muted-foreground">Route</p>
                  <p className="mt-1 truncate text-sm font-medium">{section.path}</p>
                </div>
                <div className="rounded-2xl border bg-background/90 p-3">
                  <p className="text-xs text-muted-foreground">Preview</p>
                  <p className="mt-1 text-sm font-medium">Live</p>
                </div>
                <div className="rounded-2xl border bg-background/90 p-3">
                  <p className="text-xs text-muted-foreground">State</p>
                  <p className="mt-1 text-sm font-medium">Mock</p>
                </div>
              </div>
              <div className="rounded-2xl border bg-muted/20 p-3 text-sm text-muted-foreground">
                Open the section to inspect controls, state, and examples in one route-driven screen.
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 border-t pt-4">
              <Link to={section.path} className={buttonVariants({ variant: "outline", size: "sm" }) + " flex-1 justify-center"}>
                Open section
              </Link>
              <Link to={section.path} className={buttonVariants({ size: "sm" })}>
                <Link2Icon className="size-3.5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ComponentSectionPage({ sections }: { sections: ComponentPageDefinition[] }) {
  const { sectionId } = useParams()
  const section = sections.find((item) => item.slug === sectionId)

  if (!section) {
    return <Navigate to="/components" replace />
  }

  return section.element
}

function TemplateSectionPage() {
  const { slug } = useParams()
  const { page } = useParams()
  return <TemplateShowcasePage slug={slug || ""} page={page} />
}

function ComponentShell({
  normalizedPath,
  sections,
  openCommand,
  onCommandOpen,
  onThemeChange,
  theme,
  children,
}: {
  normalizedPath: string
  sections: ComponentPageDefinition[]
  openCommand: boolean
  onCommandOpen: (value: boolean) => void
  onThemeChange: (theme: "light" | "dark") => void
  theme: "light" | "dark"
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const sectionItems = sections.map((section) => ({
    key: section.id,
    label: section.title,
    icon: section.icon,
    href: section.path,
    active: normalizedPath === section.path,
  }))

  const templateItems = templateCatalog.map((template) => ({
    key: template.id,
    label: template.title,
    href: getTemplateRoute(template.id),
    icon: <BookOpenIcon className="size-4" />,
    active: normalizedPath === getTemplateRoute(template.id) || normalizedPath.startsWith(`${getTemplateRoute(template.id)}/`),
  }))

  const docsNavItems = [
    { key: "landing", label: "Overview", href: "/landing", icon: <LayoutDashboardIcon className="size-4" />, active: normalizedPath === "/landing" },
    { key: "components", label: "Components", href: "/components", icon: <Grid2X2Icon className="size-4" />, active: normalizedPath.startsWith("/components") },
    { key: "templates", label: "Templates", href: "/templates", icon: <BookOpenIcon className="size-4" />, active: normalizedPath === "/templates" || normalizedPath.startsWith("/templates") },
  ]

  const componentNavItems = sectionItems

  const commandGroups = React.useMemo(
    () => [
      {
        id: "navigation",
        label: "Navigation",
        items: [
          {
            id: "landing",
            label: "Landing",
            icon: <LayoutDashboardIcon className="size-4" />,
            shortcut: "G H",
            onSelect: () => {
              navigate("/landing")
              onCommandOpen(false)
            },
          },
          {
            id: "components",
            label: "Components",
            icon: <Grid2X2Icon className="size-4" />,
            shortcut: "G C",
            onSelect: () => {
              navigate("/components")
              onCommandOpen(false)
            },
          },
          ...sections.map((section) => ({
            id: section.slug,
            label: section.title,
            description: section.description,
            icon: section.icon,
            keywords: [section.slug, section.title.toLowerCase(), section.description.toLowerCase()],
            onSelect: () => {
              navigate(section.path)
              onCommandOpen(false)
            },
          })),
          {
            id: "templates",
            label: "Templates",
            icon: <BookOpenIcon className="size-4" />,
            shortcut: "G D",
            onSelect: () => {
              navigate("/templates")
              onCommandOpen(false)
            },
          },
        ],
      },
      {
        id: "template-pages",
        label: "Templates",
        items: templateCatalog.map((template) => ({
          id: template.id,
          label: template.title,
          description: template.description,
          icon: <BookOpenIcon className="size-4" />,
          keywords: [template.category, template.focus, ...template.modules],
          onSelect: () => {
            navigate(getTemplateRoute(template.id))
            onCommandOpen(false)
          },
        })),
      },
      {
        id: "async-demo",
        label: "Async search demo",
        loadingLabel: "Loading mock commands...",
        emptyLabel: "No async command matched.",
        loadItems: async (search: string) => {
          await new Promise((resolve) => window.setTimeout(resolve, 220))
          const normalized = search.trim().toLowerCase()
          if (!normalized) return []

          return sections
            .filter((section) => [section.title, section.description, section.slug].join(" ").toLowerCase().includes(normalized))
            .map((section) => ({
              id: `async-${section.slug}`,
              label: `Open ${section.title}`,
              description: "Loaded from async command group",
              icon: section.icon,
              onSelect: () => {
                navigate(section.path)
                onCommandOpen(false)
              },
            }))
        },
      },
      {
        id: "actions",
        label: "Actions",
        items: [
          {
            id: "overlay",
            label: "Open overlay section",
            icon: <SparklesIcon className="size-4" />,
            shortcut: "G V",
            onSelect: () => {
              navigate("/components/overlay")
              onCommandOpen(false)
            },
          },
          {
            id: "toast",
            label: "Show success toast",
            icon: <BellIcon className="size-4" />,
            closeOnSelect: false,
            onSelect: async () => {
              await new Promise((resolve) => window.setTimeout(resolve, 250))
              addToast({
                tone: "success",
                title: "Command executed",
                description: "Modern route navigation triggered from command palette.",
              })
            },
          },
          {
            id: "command",
            label: "Open command palette",
            icon: <CommandIcon className="size-4" />,
            onSelect: () => {
              onCommandOpen(false)
              window.setTimeout(() => {
                onCommandOpen(true)
              }, 0)
            },
          },
        ],
      },
    ],
    [addToast, navigate, sections, onCommandOpen],
  )

  const breadcrumbItems = React.useMemo(() => {
    const base = [{ key: "home", label: "UI Kit", href: "/landing" }]

    if (normalizedPath === "/landing") return [...base, { key: "landing", label: "Overview" }]
    if (normalizedPath === "/components") return [...base, { key: "components", label: "Components" }]

    if (normalizedPath.startsWith("/components/")) {
      const slug = normalizedPath.replace("/components/", "")
      const section = sections.find((item) => item.slug === slug)
      return [...base, { key: "components", label: "Components", href: "/components" }, { key: slug, label: section?.title ?? "Component" }]
    }

    if (normalizedPath === "/templates") return [...base, { key: "templates", label: "Templates" }]

    if (normalizedPath.startsWith("/templates/")) {
      const [slug, page] = normalizedPath.replace("/templates/", "").split("/")
      return [
        ...base,
        { key: "templates", label: "Templates", href: "/templates" },
        { key: slug, label: getTemplateTitle(slug) || "Template" },
        ...(page ? [{ key: `template-page-${page}`, label: `Page: ${page.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}` }] : []),
      ]
    }

    return [...base, { key: "showcase", label: "Showcase" }]
  }, [sections, normalizedPath])

  const currentPageMeta = React.useMemo<RouteMeta>(() => {
    if (normalizedPath === "/landing") return { title: "Overview", description: "Documentation hub for the UI kit showcase." }
    if (normalizedPath === "/components") return { title: "Components", description: "Shadcn-style component sections with dedicated routes." }
    if (normalizedPath.startsWith("/components/")) {
      const slug = normalizedPath.replace("/components/", "")
      const section = sections.find((item) => item.slug === slug)
      return { title: section?.title || "Components", description: section?.description || "Component section demo." }
    }
    if (normalizedPath === "/templates") return { title: "Templates", description: "Template catalogue with route-driven cards." }
    if (normalizedPath.startsWith("/templates/")) {
      const [slug, page] = normalizedPath.replace("/templates/", "").split("/")
      const title = getTemplateTitle(slug) || "Template"
      if (page) return { title: `${title} • ${page}`, description: "Template sub-page detail (route-driven)." }
      return { title, description: "Template detail page (route-driven)." }
    }
    return { title: "Azamat UI Kit", description: "Shadcn-inspired playground." }
  }, [normalizedPath, sections])
  const isLanding = normalizedPath === "/landing"

  const sidebarNode = isLanding ? undefined : (
    <AppSidebar
      header={
        <div className="flex flex-col gap-2 px-1">
          <div className="flex items-center gap-2 px-2 font-semibold">
            <span className="size-2.5 rounded-full bg-primary/90" />
            Azamat UI
          </div>
          <p className="px-2 text-xs text-muted-foreground">Documentation hub, component families and templates</p>
        </div>
      }
      footer={
        <div className="space-y-2 px-2">
          <Button className="mt-1 w-full" variant="outline" size="sm" onClick={() => onCommandOpen(true)}>
            <CommandIcon className="mr-2 size-4" />
            Open command
          </Button>
          <p className="text-[11px] text-muted-foreground">Docs-first navigation with route-driven previews</p>
        </div>
      }
    >
      <div className="flex flex-col gap-4 px-2 py-2">
        <div className="flex flex-col gap-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Docs</p>
          <SidebarNav items={docsNavItems} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Component families</p>
          <SidebarNav items={componentNavItems} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Templates</p>
          <SidebarNav items={templateItems} itemClassName="text-xs" />
        </div>
      </div>
    </AppSidebar>
  )

  const headerNode = isLanding ? (
    <AppHeader
      left={
        <span className="font-semibold">Azamat UI Kit</span>
      }
      center={
        <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
          <span>UI Kit</span>
          <span>›</span>
          <span className="font-medium text-foreground">Landing</span>
        </div>
      }
      right={
        <>
          <Button variant="outline" size="sm" onClick={() => onCommandOpen(true)}>
            <CommandIcon data-icon="inline-start" className="size-4" />
            Command
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </Button>
        </>
      }
    />
  ) : (
    <AppHeader
      left={<span className="font-semibold">Azamat UI Kit</span>}
      center={<Breadcrumbs items={breadcrumbItems} />}
      right={
        <>
          <Button variant="outline" size="sm" onClick={() => onCommandOpen(true)}>
            <CommandIcon data-icon="inline-start" className="size-4" />
            Command
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </Button>
        </>
      }
    />
  )

  return (
    <AppShell sidebar={sidebarNode} header={headerNode} mainClassName={isLanding ? "p-0" : "p-4 lg:p-6"}>
      <CommandPalette
        open={openCommand}
        onOpenChange={onCommandOpen}
        groups={commandGroups}
        debounceMs={220}
        recent={{ enabled: true, label: "Recently used", limit: 5 }}
        renderEmpty={(search) => <EmptyState title="No commands" description={search ? `No command matched ${search}.` : "Start typing to search commands."} />}
        renderLoading={() => <LoadingState label="Loading commands" />}
      />

      <PageContainer size="xl" className="playground-shell playground-page">
        {!isLanding && (
          <PageHeader
            title={currentPageMeta.title}
            description={currentPageMeta.description}
            eyebrow={normalizedPath.startsWith("/templates") ? "Templates" : normalizedPath.startsWith("/components") ? "Components" : "Docs"}
            actions={
              <Button size="sm" variant="outline" onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}>
                Toggle theme
              </Button>
            }
          />
        )}
        {children}
      </PageContainer>
    </AppShell>
  )
}

export default function PlaygroundPage() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [commandOpen, setCommandOpen] = React.useState(false)
  const location = useLocation()

  useCommandPaletteShortcut(setCommandOpen)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const sectionDefinitions: ComponentPageDefinition[] = React.useMemo(
    () =>
      componentPages.map((section) => {
        const path = `/components/${section.slug}`
        return {
          ...section,
          path,
          element:
            section.slug === "foundation" ? <FoundationSection />
            : section.slug === "inputs" ? <InputsSection />
            : section.slug === "forms" ? <FormsSection />
            : section.slug === "display" ? <DisplaySection />
            : section.slug === "patterns" ? <PatternsSection />
            : section.slug === "table" ? <TableSection />
            : section.slug === "upload" ? <UploadSection />
            : section.slug === "calendar" ? <CalendarSection />
            : <OverlaySection onOpenCommand={() => setCommandOpen(true)} />,
        }
      }),
    []
  )

  const normalizedPath = React.useMemo(() => normalizePath(location.pathname), [location.pathname])

  return (
    <ToastProvider position="top-right">
      <ComponentShell normalizedPath={normalizedPath} sections={sectionDefinitions} openCommand={commandOpen} onCommandOpen={setCommandOpen} theme={theme} onThemeChange={setTheme}>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingSection onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))} />} />
          <Route path="/components" element={<ComponentsIndexPage sections={sectionDefinitions} />} />
          <Route path="/components/:sectionId" element={<ComponentSectionPage sections={sectionDefinitions} />} />
          <Route path="/templates" element={<TemplatesSection />} />
          <Route path="/templates/:slug/:page" element={<TemplateSectionPage />} />
          <Route path="/templates/:slug" element={<TemplateSectionPage />} />
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </ComponentShell>
    </ToastProvider>
  )
}





