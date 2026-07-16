# Tembro CLI workflows

Tembro is a source-copy UI kit. The CLI should make every change predictable before it touches a consumer project.

## Inspect the registry

```bash
npx tembro list
npx tembro list --category data-table
npx tembro list --status stable
npx tembro list --json
```

Use `--json` when another docs site, CI job, or migration script needs the registry as machine-readable data.

## Plan a component copy

```bash
npx tembro add data-table --plan
```

The plan prints JSON and does not write files. It includes:

- requested components
- resolved registry components
- package dependencies
- source files
- target files
- whether each target already exists
- operation: `add`, `overwrite`, `skip`, or `unresolved`

## Copy source files

```bash
npx tembro add data-table
npx tembro add data-table --dry-run
npx tembro add data-table --overwrite
npx tembro add data-table --skip-install
```

Use `--dry-run` for readable terminal output. Use `--plan` for scripts and CI.

## Check a consumer project

```bash
npx tembro doctor
npx tembro doctor --json
```

`doctor` checks:

- `package.json`
- `tembro.json`
- configured source paths
- TypeScript or Vite alias setup
- theme CSS tokens
- base dependencies
- copied component file sets
- registry dependencies for copied components
- package dependencies for copied components

If a required setup file is missing, `doctor` exits with code `1`. Warnings are printed for incomplete but recoverable setup.

## Recommended production flow

```bash
npx tembro init
npx tembro doctor
npx tembro list --category data-table
npx tembro add data-table --plan
npx tembro add data-table
npx tembro doctor
```

This keeps source-copy changes explicit, auditable, and easy to debug.
