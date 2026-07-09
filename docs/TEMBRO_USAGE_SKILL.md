# Tembro Usage Skill

Use this file as the working rulebook when adding Tembro to an app or editing an app that already uses it.

## Install Flow

- Always run `npx tembro init --template next --defaults` for Next.js apps.
- Always run `npx tembro init --template vite --defaults` for Vite apps.
- Do not hand-write the theme block unless the CLI fails. Fix the CLI instead.
- Do not use `--skip-install` unless the app intentionally manages dependencies offline.
- After init, verify `tembro.json`, the global CSS file, and path aliases.

## Component Flow

- Add source components with `npx tembro add <component>`.
- Prefer core component names: `button`, `input`, `select`, `data-table`, `charts`, `calendar`, `sidebar`, `alert-dialog`.
- Do not add helper-only aliases as public components. If a helper is needed, it must be installed through the parent component.
- Components copied into the app must live under the configured `components` root from `tembro.json`.
- If a component imports a package, the CLI must install that package automatically.

## Styling Rules

- Use the Tembro theme tokens in global CSS as the single source of truth.
- Control radius with `:root[data-radius="none|sm|md|lg|xl"]`.
- Do not hard-code new brand colors inside app pages when a token already exists.
- Prefer `--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--border`, `--ring`, and `--aui-*` tokens.
- If a component looks wrong in an app but correct in the test fixture, compare the global CSS and Tailwind source configuration first.

## UI Quality Bar

- Every public component needs a real interactive demo.
- Empty, loading, disabled, invalid, focus, hover, selected, and dark-mode states must be checked.
- Component pages must show the actual component, not a generic placeholder.
- Tables, charts, inputs, selects, overlays, and sidebars require browser QA before publishing.

## Release Rule

- Run `npm run release:quick` before a patch publish.
- Run `npm run release:gate` before a stable release.
- Publish only after CLI init/add has been tested in a clean app.
