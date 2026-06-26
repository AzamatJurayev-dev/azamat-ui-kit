# Azamat UI Audit Status

Date: 2026-06-26

Sources:

- `C:\Users\user\Downloads\azamat-ui-marketing-roadmap.md`
- `C:\Users\user\Downloads\azamat-ui-audit.md`

This file is the active audit status. A task is checked only when the current code and verification pass support it. Partly finished work stays open.

## Completed In Current Batch

- [x] `azamat-ui` Blocks page no longer exposes unfinished block catalog cards, filters or stats.
- [x] `azamat-ui` Templates page no longer exposes unfinished template catalog cards, metrics or demo content.
- [x] `/blocks/[slug]` now shows a clear not-public-yet fallback instead of unfinished block detail content.
- [x] `/templates/[slug]` now shows a clear not-public-yet fallback instead of unfinished template detail content.
- [x] Component preview frame no longer renders the old explanatory preview text such as `Interactive surface` or `Keep the preview focused`.
- [x] Component preview frame no longer uses the extra `.aui-preview-shell` wrapper layer.
- [x] Component preview examples remove one inner card wrapper around the actual package showcase.
- [x] Next.js dev indicator is disabled in local `azamat-ui` QA so it does not cover mobile content while reviewing.
- [x] Global command palette is more compact and no longer pins unfinished Templates as a primary action.
- [x] Search route copy now focuses on docs and production-ready components instead of blocks/templates.
- [x] Search results and command palette hide unfinished Blocks/Templates detail entries.
- [x] `components/[slug]` route now shows API props for the component surface instead of requiring users to switch to docs route.
- [x] Component detail code area no longer exposes a `CLI` tab for every component.
- [x] `azamat-ui` passed `npm run typecheck`.
- [x] `azamat-ui` passed `npm run lint`.
- [x] `azamat-ui` passed `npm run smoke:routes`.
- [x] `azamat-ui` passed `npm run check:links`.
- [x] `azamat-ui` passed `npm run build`.
- [x] Browser QA verified `/blocks`, `/templates`, `/components/button`, `/docs/components/button` and mobile `/templates` without console errors.

## Product And Docs Remaining

- [ ] Audit every public route visually after deployment: home, docs, installation, components, component detail, docs component detail, blocks, templates, changelog, search and command palette.
- [ ] Make component detail pages show API props closer to the first useful screen in the `components` route, not only under `docs/components`.
- [ ] Standardize every component detail page order as `preview`, `basic usage`, `controlled usage`, `states`, `API props`, `related components`.
- [ ] Expand missing API prop coverage for every public component, especially inputs, data-table, overlays, layout and form wrappers.
- [ ] Replace weak generic component copy with concrete usage guidance for every component.
- [ ] Keep install docs focused on package install first and CLI/source-copy as optional.
- [ ] Verify Vite, Next.js and plain React installation docs against fresh local apps.
- [ ] Add troubleshooting entries for Tailwind content scanning, missing styles, package transpilation, dark mode and peer dependency mismatches.
- [ ] Make changelog release history clearly separate published releases from draft/planned entries.
- [ ] Remove or rewrite stale playground routes if they are not part of the public product story.

## Visual Quality Remaining

- [ ] Reduce oversized hero typography on dense docs and catalog pages where it still feels like marketing instead of documentation.
- [ ] Remove remaining nested card patterns in docs pages: `SurfaceCard` inside framed panels, `.aui-panel` inside `.aui-panel`, and preview wrappers inside preview wrappers.
- [ ] Review all `aui-bento`, `SurfaceCard`, `.aui-panel`, `.aui-preview-stage` usage and keep cards only for repeated items, modals or genuinely framed tools.
- [ ] Rebalance dark theme contrast for buttons, pills, badges, tabs and preview surfaces.
- [ ] Rebalance light theme contrast for header, search, navigation pills, controls and code blocks.
- [ ] Verify no component preview falls back to browser-default button/input styling.
- [ ] Verify component demos use package components from `azamat-ui-kit`, not local substitute HTML controls where a package component exists.
- [ ] Tighten spacing rhythm across docs, components, component detail and installation pages.
- [ ] Check mobile layout for text clipping, horizontal overflow, overlapping buttons and scroll traps on every public route.

## Blocks And Templates Remaining

- [ ] Keep blocks and templates public pages in empty-state mode until real production-ready surfaces exist.
- [ ] Remove or hide old block/template preview routes if they can still be reached from search, command palette or static route smoke.
- [ ] Remove unfinished block/template data from public search results and command palette results.
- [ ] When blocks return, add only verified pricing, marketing and application surfaces with real source targets and responsive QA.
- [ ] When templates return, add only route-level templates with real modules, install path, API notes and responsive QA.

## Landing And Trust Remaining

- [ ] Rework landing first fold so users immediately understand what the package is, who it is for and how to start.
- [ ] Add real package verification proof from release gates, fixture tests and docs-app consumption.
- [ ] Add npm/version/license/download proof where data is stable and accurate.
- [ ] Avoid fake social proof until real public usage exists.
- [ ] Replace mock-heavy landing sections with product evidence from working components and tested examples.

## GitHub And Package Presentation Remaining

- [ ] Re-check `azamat-ui-kit` README against current package version, install flow, Tailwind setup and source-copy story.
- [ ] Re-check `azamat-ui` README against current public-site positioning and remove stale claims.
- [ ] Confirm package keywords, description, repository links and npm README are aligned with the public docs.
- [ ] Add or update `CONTRIBUTING.md` only if contribution flow is ready to support outside users.

## Marketing Roadmap Remaining

- [ ] Prepare first technical article or case study after component docs are strong enough to link publicly.
- [ ] Prepare launch copy only after public site, docs and package QA are stable.
- [ ] Create a readiness checklist for Product Hunt, Reddit, Hacker News and build-in-public posts.
- [ ] Build an outreach list only after the library has credible examples and docs.

## Verification Commands

Use these before marking more items complete:

```bash
cd C:\Users\user\OneDrive\Desktop\azamat-ui
npm run typecheck
npm run lint
npm run smoke:routes
npm run check:links
npm run build
```

```bash
cd C:\Users\user\OneDrive\Desktop\azamat-ui-kit
npm run lint
npm run test:run
npm run build
```
