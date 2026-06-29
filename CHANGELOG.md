# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

## 0.3.11 - 2026-06-29

### Changed

- refined `Button` defaults so installed package buttons have calmer radius, clearer focus rings, and better dark-mode contrast
- improved disabled and loading button states so they stay readable without looking like broken outline controls
- reduced heavy hover shadows on primary and destructive actions for cleaner dashboard usage

## 0.3.10 - 2026-06-26

### Changed

- refined the published primitive layer for `Button`, `Input`, `Select`, `Checkbox`, `Switch`, `Tabs`, and `Card` so default surfaces feel flatter, calmer, and more product-ready
- cleaned up shared input chrome, decorator spacing, and clear action affordances so installed field components ship with a stronger default UI

## 0.3.9 - 2026-06-26

### Changed

- refined `Badge` defaults so status labels look calmer, flatter, and more product-ready out of the box
- simplified the Badge docs surface to remove heavy card-in-card composition around a small primitive

## 0.3.8 - 2026-06-26

### Changed

- polished the published input field chrome, decorator spacing, and clear action treatment
- reduced nested-card noise in the docs input showcase and cleaned up the live field composition
- moved detail-page side rails to wider breakpoints so preview content no longer collides with related panels

## 0.3.7 - 2026-06-26

### Fixed

- restored the full root export contract so published package consumers receive patterns, families, and complete public component barrels from `azamat-ui-kit`

## 0.3.6 - 2026-06-26

### Changed

- refined the base input, decorator, and clear action visuals for a cleaner published default field surface
- softened tabs, cards, dialogs, popovers, and dropdown menus so overlay-heavy docs routes match the newer surface system

### Added

- added `Button` loading, loading label, left icon, right icon, and `md`/`xl` size API coverage
- added `Card` variants, tones, density, interactive, selected, and disabled state APIs
- added `Badge` tone, size, dot, left icon, and right icon APIs for status-heavy dashboard UI
- added `ClearableInput` Escape-to-clear and focus-after-clear behavior
- added `SearchInput` loading, result count, shortcut, and debounced value callback support
- added `InputDecorator` density, tone, leading/trailing class hooks, and pointer-event control
- added `NumberInput` prefix/suffix support through the shared input decorator
- added `DateInput` optional leading calendar icon support
- added `PhoneInput` icon and country-code display options
- added `PasswordInput` Caps Lock warning and autocomplete defaults
- added `SimpleSelect` clearable, searchable, loading, empty-state, keyword, and custom option rendering APIs
- added reusable form field splitting utilities for future direct form wrapper refactors
- added `PageHeader` variants, tones, sizes, leading content, footer, and class hooks
- added `StatCard` loading skeleton, helper text, value prefix/suffix, trend label, and badge-backed trend rendering
- added `DataTableToolbar` variants, density, and heading/action class hooks
- added `AppInput` / `UniversalInput` as the single public input wrapper for text, clearable, search, number, phone, and date input kinds
- added `FormAppInput` as the single React Hook Form wrapper for the same input kinds
- added real component primitives: `RadioGroup`, `Kbd`, `HoverCard`, `StatusDot`, `SectionHeader`, `AlertDialog`, and `Drawer`
- added `UserCard`, `NavTabs`, and `FileDropzone` for dashboard identity, navigation, and upload flows
- added `ScrollBox`, `RightClickMenu`, `ProgressCircle`, and `MetricCard` as additional real reusable UI components

### Changed

- moved `NumberInput`, `DateInput`, `MaskedInput`, and `PhoneInput` onto the shared `InputDecorator` surface for more consistent visual behavior
- improved the route-level dashboard foundation by aligning `PageHeader`, `StatCard`, and `DataTableToolbar` with the newer surface/tone APIs
- registered `app-input` and `form-app-input` so CLI/source-copy discovery can prefer the universal input wrappers
- hardened `AppInput` and `FormAppInput` typing so specialized props are routed more safely by kind
- routed `FormSearchInput`, `FormNumberInput`, `FormPhoneInput`, and `FormDateInput` through `FormAppInput` as compatibility wrapper migrations
- exported `StatusDot`, `UserCard`, `ProgressCircle`, `SectionHeader`, `NavTabs`, `FileDropzone`, `ScrollBox`, and `RightClickMenu` from their public surfaces
- re-routed compatibility wrappers back onto the canonical `FormInput` surface so docs and implementation stay aligned
- clarified README and universal-input docs to teach `Input` / `FormInput` first while keeping aliases for migration

### Docs

- aligned the component maturity matrix with the current `Button` public API
- documented the universal input API in `UNIVERSAL_INPUT.md`
- added a render-time public API snapshot test for documented root exports

## 0.2.3 - 2026-06-23

### Added

- new `Stack`, `Inline`, and `Grid` layout helpers for common vertical, horizontal, and grid composition

### Changed

- aligned package, CLI, and registry versions for the next public release
