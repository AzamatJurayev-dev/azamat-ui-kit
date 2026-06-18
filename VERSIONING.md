# Versioning Strategy

`azamat-ui-kit` follows semantic versioning.

## Patch release

Use `0.1.x` when:

- fixing bugs
- improving types without breaking consumers
- adjusting internal build or publish pipeline
- refining docs without changing public API

Example:

- `0.1.0` -> `0.1.1`

## Minor release

Use `0.x.0` when:

- adding new components or exports
- adding new CLI capabilities
- expanding registry coverage
- introducing new non-breaking props or variants

Examples:

- `0.1.0` -> `0.2.0`
- `0.2.0` -> `0.3.0`

## Breaking release

Before `1.0.0`, breaking changes should still increment the minor version and be documented clearly.

Use a breaking release when:

- removing exports
- renaming exports
- changing component behavior in a way that requires consumer code updates
- changing CLI config format incompatibly

Examples:

- `0.2.0` -> `0.3.0` if API breaks
- `1.0.0` onward: breaking changes move to major versions

## Current recommendation

After the library-only cleanup:

- use `0.1.2` for small fixes and polish
- use `0.2.0` for the next meaningful component or registry expansion
- use `1.0.0` only after API, docs, registry, and theming flows feel stable for external teams
