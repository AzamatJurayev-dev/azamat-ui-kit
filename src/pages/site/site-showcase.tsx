import * as React from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const SiteBlocksPage = React.lazy(() => import("./components/site-blocks-page").then((module) => ({ default: module.SiteBlocksPage })))
const SiteGenericComponentDocsPage = React.lazy(() => import("./components/site-component-pages").then((module) => ({ default: module.SiteGenericComponentDocsPage })))
const SiteGenericComponentPlaygroundPage = React.lazy(() => import("./components/site-component-pages").then((module) => ({ default: module.SiteGenericComponentPlaygroundPage })))
const SiteComponentsOverviewPage = React.lazy(() => import("./components/site-components-overview-page").then((module) => ({ default: module.SiteComponentsOverviewPage })))
const SiteHomePage = React.lazy(() => import("./components/site-home-page").then((module) => ({ default: module.SiteHomePage })))
const SiteModuleExportPage = React.lazy(() => import("./components/site-module-export-page").then((module) => ({ default: module.SiteModuleExportPage })))
const SiteModuleFamilyPage = React.lazy(() => import("./components/site-module-family-page").then((module) => ({ default: module.SiteModuleFamilyPage })))
const SiteSearchPage = React.lazy(() => import("./components/site-search-page").then((module) => ({ default: module.SiteSearchPage })))
const SiteTemplateDetailPage = React.lazy(() => import("./components/site-template-detail-page").then((module) => ({ default: module.SiteTemplateDetailPage })))
const PreviewBlockRoutePage = React.lazy(() => import("../preview/preview-pages").then((module) => ({ default: module.PreviewBlockRoutePage })))
const PreviewComponentRoutePage = React.lazy(() => import("../preview/preview-pages").then((module) => ({ default: module.PreviewComponentRoutePage })))

export default function SiteShowcase() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background text-foreground" />}>
      <Routes>
        <Route path="/" element={<SiteHomePage />} />
        <Route path="/command" element={<SiteSearchPage />} />
        <Route path="/components" element={<SiteComponentsOverviewPage />} />
        <Route path="/components/:slug/:exportSlug" element={<SiteModuleExportPage />} />
        <Route path="/components/:slug" element={<SiteModuleFamilyPage />} />
        <Route path="/blocks" element={<SiteBlocksPage />} />
        <Route path="/templates/:slug" element={<SiteTemplateDetailPage />} />
        <Route path="/docs/components/:slug" element={<SiteGenericComponentDocsPage />} />
        <Route path="/playground/:slug" element={<SiteGenericComponentPlaygroundPage />} />
        <Route path="/preview/blocks/:slug" element={<PreviewBlockRoutePage />} />
        <Route path="/preview/components/:slug" element={<PreviewComponentRoutePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  )
}
