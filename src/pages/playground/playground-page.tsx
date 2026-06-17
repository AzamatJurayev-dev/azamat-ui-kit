import * as React from "react"
import {
  BellIcon,
  CalendarDaysIcon,
  CommandIcon,
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
  ArrowRightIcon,
  Link2Icon,
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
  PageContainer,
  PageHeader,
  SidebarNav,
  ToastProvider,
  useCommandPaletteShortcut,
  useToast,
} from "@/index"

import { CalendarSection } from "./playground-calendar"
import { LandingSection } from "./playground-landing"
import { TemplatesSection, TemplateShowcasePage, getTemplateBySlug, getTemplateRoute } from "./playground-templates"
import { FoundationSection } from "./playground-foundation"
import { FormsSection } from "./playground-forms"
import { InputsSection } from "./playground-inputs"
import { OverlaySection } from "./playground-overlay"
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
  { id: "table", slug: "table", title: "Data table", description: "Sorting, pagination, selection and actions", icon: <LayersIcon className="size-4" /> },
  { id: "upload", slug: "upload", title: "Upload", description: "Dropzones, file metadata, and progress patterns", icon: <UploadCloudIcon className="size-4" /> },
  { id: "calendar", slug: "calendar", title: "Calendar", description: "Calendar picker and schedule UI", icon: <CalendarDaysIcon className="size-4" /> },
  { id: "overlay", slug: "overlay", title: "Overlay", description: "Dialog, sheet, popover and action patterns", icon: <PanelLeftIcon className="size-4" /> },
]

function ComponentsIndexPage({ sections }: { sections: ComponentPageDefinition[] }) {
  return (
        <section className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Components dashboard</CardTitle>
              <CardDescription>
                Barcha section'lar uchun alohida page route'lari mavjud: `Foundation`, `Inputs`, `Forms`, `Data table`, `Upload`, `Calendar`, `Overlay`.
              </CardDescription>
            </div>
              <Badge>7 bo‘limdan 1</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Har bir bo‘limni tez topish uchun sidebar link, command palette va template link bo‘ylab bir xil design token
            tizimida yurish mumkin.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.id} className="group relative overflow-hidden transition-colors hover:border-primary/60">
            <CardHeader>
              <CardTitle className="flex items-start justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span className="text-muted-foreground">{section.icon}</span>
                  {section.title}
                </span>
                <ArrowRightIcon className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5" />
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardFooter className="!pt-0">
              <Link to={section.path} className={buttonVariants({ variant: "outline", size: "sm" }) + " w-full justify-center"}>
                <Link2Icon className="mr-2 size-3.5" />
                Open section
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

  const sectionNavItems = [
    { key: "landing", label: "Landing", href: "/landing", icon: <LayoutDashboardIcon className="size-4" />, active: normalizedPath === "/landing" },
    { key: "components", label: "Components", href: "/components", icon: <Grid2X2Icon className="size-4" />, active: normalizedPath.startsWith("/components") },
    ...sectionItems,
    { key: "templates", label: "Templates", href: "/templates", icon: <BookOpenIcon className="size-4" />, active: normalizedPath === "/templates" || normalizedPath.startsWith("/templates") },
  ]

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
            icon: section.icon,
            shortcut: "",
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
          icon: <BookOpenIcon className="size-4" />,
          onSelect: () => {
            navigate(getTemplateRoute(template.id))
            onCommandOpen(false)
          },
        })),
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
            onSelect: () => {
              addToast({
                tone: "success",
                title: "Command executed",
                description: "Modern route navigation triggered from command palette.",
              })
              onCommandOpen(false)
            },
          },
          {
            id: "command",
            label: "Open command palette",
            icon: <CommandIcon className="size-4" />,
            onSelect: () => {
              onCommandOpen(false)
              setTimeout(() => {
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

    if (normalizedPath === "/landing") {
      return [...base, { key: "landing", label: "Landing" }]
    }

    if (normalizedPath === "/components") {
      return [...base, { key: "components", label: "Components" }]
    }

    if (normalizedPath.startsWith("/components/")) {
      const slug = normalizedPath.replace("/components/", "")
      const section = sections.find((item) => item.slug === slug)
      return [...base, { key: "components", label: "Components", href: "/components" }, { key: slug, label: section?.title ?? "Component" }]
    }

    if (normalizedPath === "/templates") {
      return [...base, { key: "templates", label: "Templates" }]
    }

    if (normalizedPath.startsWith("/templates/")) {
      const [slug, page] = normalizedPath.replace("/templates/", "").split("/")

      return [
        ...base,
        { key: "templates", label: "Templates", href: "/templates" },
        { key: slug, label: getTemplateTitle(slug) || "Template" },
        ...(page
          ? [
              {
                key: `template-page-${page}`,
                label: `Page: ${page.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}`,
              },
            ]
          : []),
      ]
    }

    return [...base, { key: "showcase", label: "Showcase" }]
  }, [sections, normalizedPath])

  const currentPageMeta = React.useMemo<RouteMeta>(() => {
    if (normalizedPath === "/landing") return { title: "Landing", description: "Production-like showcase landing page." }
    if (normalizedPath === "/components") return { title: "Components", description: "Shadcn-style component sections with dedicated routes." }
    if (normalizedPath.startsWith("/components/")) {
      const slug = normalizedPath.replace("/components/", "")
      const section = sections.find((item) => item.slug === slug)
      return {
        title: section?.title || "Components",
        description: section?.description || "Component section demo.",
      }
    }
    if (normalizedPath === "/templates") return { title: "Templates", description: "Template catalogue with route-driven cards." }
    if (normalizedPath.startsWith("/templates/")) {
      const [slug, page] = normalizedPath.replace("/templates/", "").split("/")
      const title = getTemplateTitle(slug) || "Template"
      if (page) {
        return { title: `${title} • ${page}`, description: "Template sub-page detail (route-driven)." }
      }

      return { title, description: "Template detail page (route-driven)." }
    }

    return { title: "Azamat UI Kit", description: "Shadcn-inspired playground." }
  }, [normalizedPath, sections])

  return (
    <AppShell
      sidebar={
        <AppSidebar
          header={
            <div className="flex flex-col gap-2 px-1">
              <div className="flex items-center gap-2 px-2 font-semibold">
                <span className="size-2.5 rounded-full bg-primary/90" />
                Azamat UI
              </div>
              <p className="px-2 text-xs text-muted-foreground">Route-first component library showcase</p>
            </div>
          }
          footer={
            <div className="space-y-2 px-2">
              <Button className="mt-1 w-full" variant="outline" size="sm" onClick={() => onCommandOpen(true)}>
                <CommandIcon className="mr-2 size-4" />
                Open command
              </Button>
              <p className="text-[11px] text-muted-foreground">Shadcn-like landing + templates + dashboard blocks</p>
            </div>
          }
        >
          <div className="px-2 py-2">
            <SidebarNav items={sectionNavItems} />
            <p className="mt-3 mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Templates</p>
            <SidebarNav items={templateItems} itemClassName="text-xs" />
          </div>
        </AppSidebar>
      }
      header={
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
      }
      mainClassName="p-4 lg:p-6"
    >
      <CommandPalette open={openCommand} onOpenChange={onCommandOpen} groups={commandGroups} />

      <PageContainer size="xl" className="playground-shell playground-page">
        <PageHeader
          title={currentPageMeta.title}
          description={currentPageMeta.description}
          eyebrow="Playground"
          actions={
            <Button size="sm" variant="outline" onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}>
              Toggle theme
            </Button>
          }
        />
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
            section.slug === "foundation" ? (
              <FoundationSection />
            ) : section.slug === "inputs" ? (
              <InputsSection />
            ) : section.slug === "forms" ? (
              <FormsSection />
            ) : section.slug === "table" ? (
              <TableSection />
            ) : section.slug === "upload" ? (
              <UploadSection />
            ) : section.slug === "calendar" ? (
              <CalendarSection />
            ) : (
              <OverlaySection onOpenCommand={() => setCommandOpen(true)} />
            ),
        }
      }),
    []
  )

  const normalizedPath = React.useMemo(() => normalizePath(location.pathname), [location.pathname])

  return (
    <ToastProvider position="top-right">
      <ComponentShell
        normalizedPath={normalizedPath}
        sections={sectionDefinitions}
        openCommand={commandOpen}
        onCommandOpen={setCommandOpen}
        theme={theme}
        onThemeChange={setTheme}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingSection />} />
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
