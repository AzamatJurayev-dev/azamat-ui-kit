# Tembro AI agent setup

`tembro init` now prepares project-level instructions and focused skills for coding agents.

## Generated structure

```text
AGENTS.md
.agents/
├── README.md
└── skills/
    ├── tembro-component-development/
    │   └── SKILL.md
    ├── design-system-governance/
    │   └── SKILL.md
    ├── accessibility-review/
    │   └── SKILL.md
    ├── testing-and-validation/
    │   └── SKILL.md
    ├── frontend-architecture/
    │   └── SKILL.md
    └── code-review-and-delivery/
        └── SKILL.md
```

The root `AGENTS.md` is intentionally short. It maps the repository, defines common rules, and routes the agent to focused playbooks. This follows the agent-first pattern where repository instructions are an index rather than a large encyclopedia.

## Init behavior

```bash
npx tembro init --defaults
```

The command initializes Tembro and then creates the AI agent files.

Existing `AGENTS.md` and skill files are preserved by default. Tembro does not destroy project-specific instructions during a repeated initialization.

Skip AI files:

```bash
npx tembro init --defaults --skip-agents
```

Replace existing generated files:

```bash
npx tembro init --defaults --overwrite-agents
```

## Existing projects

Generate the AI setup without re-running the full initialization:

```bash
npx tembro agents
```

Preview the write plan:

```bash
npx tembro agents --dry-run
```

Refresh every generated file:

```bash
npx tembro agents --overwrite
```

## Context-aware content

The generated instructions use:

- detected Vite or Next.js framework;
- Tembro alias;
- component root;
- UI primitive path;
- hooks path;
- utility path;
- global CSS path.

Values come from `tembro.json` when available and otherwise use framework defaults.

## Included skills

### Tembro component development

Reusable component API design, controlled state, composition, engine cleanup, source-copy distribution, demos, and documentation.

### Design-system governance

Semantic tokens, light/dark themes, variants, density, visual states, naming, and taxonomy.

### Accessibility review

Semantics, accessible names, keyboard behavior, focus, live regions, touch targets, errors, and reduced motion.

### Testing and validation

Focused tests, type checks, browser smoke tests, builds, responsive validation, and honest result reporting.

### Frontend architecture

React boundaries, client/server separation, lazy loading, state ownership, dependency impact, and lifecycle cleanup.

### Code review and delivery

Correctness-first review, API compatibility, scoped commits, generated assets, PR descriptions, limitations, and release readiness.

## Customization

The generated files belong to the consuming repository. Teams should edit them to add domain rules, commands, architecture links, ownership, and release procedures.
