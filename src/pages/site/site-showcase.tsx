import { Navigate, Route, Routes } from "react-router-dom"

import { SiteBlocksPage } from "./components/site-blocks-page"
import { SiteGenericComponentDocsPage, SiteGenericComponentPlaygroundPage } from "./components/site-component-pages"
import { SiteComponentsOverviewPage } from "./components/site-components-overview-page"
import { SiteHomePage } from "./components/site-home-page"
import { SiteModuleExportPage } from "./components/site-module-export-page"
import { SiteModuleFamilyPage } from "./components/site-module-family-page"
import { SiteSearchPage } from "./components/site-search-page"
import { SiteTemplateDetailPage } from "./components/site-template-detail-page"
import { PreviewBlockRoutePage, PreviewComponentRoutePage } from "../preview/preview-pages"

export default function SiteShowcase() {
  return (
    <Routes>
      <Route path="/" element={<SiteHomePage />} />
      <Route path="/command" element={<SiteSearchPage />} />
      <Route path="/components" element={<SiteComponentsOverviewPage />} />
      <Route path="/components/families/:slug" element={<SiteModuleFamilyPage />} />
      <Route path="/components/families/:slug/:exportSlug" element={<SiteModuleExportPage />} />
      <Route path="/blocks" element={<SiteBlocksPage />} />
      <Route path="/templates/:slug" element={<SiteTemplateDetailPage />} />
      <Route path="/docs/components/:slug" element={<SiteGenericComponentDocsPage />} />
      <Route path="/playground/:slug" element={<SiteGenericComponentPlaygroundPage />} />
      <Route path="/preview/blocks/:slug" element={<PreviewBlockRoutePage />} />
      <Route path="/preview/components/:slug" element={<PreviewComponentRoutePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
