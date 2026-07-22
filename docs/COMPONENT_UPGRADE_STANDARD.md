# Tembro Component Upgrade Standard

This document defines the quality bar for improving existing Tembro components without increasing the component count.

## Direction

The next development phase prioritizes depth over breadth:

- do not add a new component when an existing public surface can own the capability;
- preserve backwards compatibility where the current API is sound;
- remove shallow wrappers and expose the underlying engine safely;
- improve the matching Azamat UI demo and API documentation in the same change;
- require realistic loading, empty, error, disabled, readonly, mobile, and keyboard states;
- keep heavy integrations source-copy only so the core package remains small.

## Required upgrade dimensions

Every upgraded component should be reviewed across these dimensions.

### 1. API completeness

- controlled and uncontrolled state where both are meaningful;
- typed callbacks with useful payloads;
- forwarded ref or imperative handle when the underlying engine exposes important methods;
- composition slots instead of hard-coded product UI;
- className and style escape hatches on meaningful surfaces;
- labels and copy that can be localized;
- aliases only for migration, not duplicated public components.

### 2. State contract

- default state;
- loading state;
- empty state;
- error and retry state;
- disabled or readonly state;
- permission-denied state for browser APIs;
- reconnect or recovery state for networked engines;
- cleanup on unmount and source changes.

### 3. Accessibility

- semantic roles and labels;
- keyboard navigation and shortcuts;
- visible focus;
- screen-reader status announcements;
- sufficient touch targets;
- reduced-motion behavior;
- captions, descriptions, and alternative content where applicable.

### 4. Responsive behavior

- narrow mobile viewport;
- tablet and desktop density;
- container-driven sizing;
- no horizontal overflow unless the component explicitly requires it;
- fullscreen and embedded modes;
- adaptive control density.

### 5. Performance

- lazy loading for heavy engines;
- no unnecessary root dependencies;
- stable callbacks and subscriptions;
- resize observers cleaned up;
- media streams, sockets, workers, canvases, and engine instances destroyed;
- avoid rerendering high-frequency engine state through React unless needed.

### 6. Documentation and demo

The Azamat UI detail page must include:

- a realistic interactive mock;
- install command;
- useful code sample;
- accurate API rows;
- production capability notes;
- responsive behavior;
- at least one failure or recovery scenario;
- no generic fallback preview for a published component.

## Upgrade order

### Phase 1 — media and document engines

1. Media Player
2. PDF Viewer
3. Document Scanner
4. Barcode Scanner
5. Image Cropper
6. File Upload

### Phase 2 — data workspaces

1. Data Table and Data Grid
2. Spreadsheet
3. Code Editor
4. Terminal
5. File Manager
6. Virtual List

### Phase 3 — visual builders

1. Flow Editor
2. Whiteboard
3. Advanced Chart
4. Map
5. 3D Model Viewer
6. Kanban and DnD surfaces

### Phase 4 — forms and overlays

1. Select and Async Select
2. Date and Range Pickers
3. Rich Text Editor
4. Dialog, Drawer, Popover, and menus
5. Wizard and Stepper
6. Toast and state surfaces

## Media Player reference upgrade

The Media Player is the first reference implementation for this standard.

The upgraded contract includes:

- `VideoPlayer` and `AudioPlayer` remain the public components;
- `MediaPlayerInstance` ref is forwarded;
- multiple providers and quality sources are accepted through Vidstack `src`;
- captions, subtitles, chapters, descriptions, and metadata tracks are supported;
- timeline thumbnails are supported;
- default layouts remain available;
- a custom layout can replace or disable the default layout;
- layout translations, slots, icons, download, and color scheme remain accessible through `layoutProps`;
- overlay, before-layout, after-layout, and provider composition points are available;
- empty, loading, and playback-error states have defaults and can be replaced;
- video aspect ratio is configurable;
- source-copy distribution remains unchanged.

## PDF Viewer reference upgrade

The PDF Viewer is the second reference implementation and establishes the standard for document workspaces.

The upgraded contract includes:

- `PdfViewer` remains the only public component;
- `PdfViewerHandle` exposes navigation, zoom, fit, rotate, search, download, print, fullscreen, and document access;
- URL, byte-array, `ArrayBuffer`, and full PDF.js `DocumentInitParameters` sources are accepted;
- page, scale, rotation, view mode, fit mode, sidebar, search panel, and search query support controlled and uncontrolled usage;
- single-page and continuous document modes share one state contract;
- continuous pages and thumbnails render lazily through `IntersectionObserver`;
- full-document search extracts text content and returns page, index, matched text, and surrounding context;
- password callbacks support built-in and externally controlled credential flows;
- byte loading progress, metadata, outline, page rendering, print, download, search, and error callbacks are available;
- download and print work for URL and in-memory documents through `PDFDocumentProxy.getData()`;
- fit-width, fit-page, custom zoom, rotation, fullscreen, and keyboard shortcuts are included;
- toolbar, sidebar, overlay, labels, and empty/loading/password/error surfaces are replaceable;
- PDF.js loading tasks, render tasks, object URLs, print frames, observers, and document changes are cleaned up;
- source-copy distribution remains unchanged.

The matching Azamat UI preview must demonstrate:

- thumbnail navigation;
- single and continuous modes;
- page and zoom controls;
- fit modes and rotation;
- document search with match context;
- password success and incorrect-password recovery;
- loading progress;
- retryable document error;
- print, download, fullscreen, responsive toolbar, and keyboard help.

## Definition of done

A component upgrade is complete only when:

- library source is upgraded;
- registry metadata remains correct;
- consumer install command remains valid;
- Azamat UI API metadata is updated;
- interactive demo is upgraded;
- the canonical demo registry resolves the component without fallback;
- relevant build, lint, readiness, route, and Vercel checks pass;
- the PR explains compatibility and remaining limitations.
