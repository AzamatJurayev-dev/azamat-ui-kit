import { describe, expect, it } from "vitest"

import { componentFamilyCatalog } from "@/families/catalog"
import { componentDocsGroups } from "@/families/docs-groups"
import { componentMemberMetadata } from "@/families/member-metadata"
import { componentSnippetExamples } from "@/families/member-snippets"
import { componentFamilyMigrationMap } from "@/families/migration-map"
import {
  getDocsGroup,
  getDocsGroupDetail,
  getDocsGroupByComponent,
  getDocsGroupByFamily,
  getDocsNavigation,
  listDocsGroups,
} from "@/families/docs-queries"
import {
  getComponentDocsAdoption,
  listDocsAdoption,
} from "@/families/docs-adoption"
import {
  listDocsRouteAliases,
  resolveDocsRoute,
  resolveDocsRouteByComponent,
} from "@/families/docs-routing"
import {
  getComponentMemberMetadata,
  getFamilyMemberMetadata,
  listComponentsByMaturity,
} from "@/families/member-queries"
import {
  getComponentSnippets,
  getComponentSnippetsByVariant,
  getFamilySnippets,
  getPrimaryComponentSnippet,
  listSnippetVariants,
} from "@/families/member-snippet-queries"
import {
  getComponentFamilyEntries,
  getFamilyCatalogEntry,
  getFamilyMembers,
  listAdvancedComponents,
  listCanonicalComponents,
  listTransitionalComponents,
} from "@/families/queries"
import {
  getFamilyNavigation,
  getFamilyView,
  getMetadataSummary,
  listFamilyViews,
} from "@/families/views"

describe("family metadata", () => {
  it("keeps catalog family names unique", () => {
    const names = componentFamilyCatalog.map((entry) => entry.family)
    expect(new Set(names).size).toBe(names.length)
  })

  it("allows shared component names only when they intentionally belong to different families", () => {
    const groupedByComponent = new Map<string, typeof componentFamilyMigrationMap>()

    componentFamilyMigrationMap.forEach((entry) => {
      const existing = groupedByComponent.get(entry.component) ?? []
      existing.push(entry)
      groupedByComponent.set(entry.component, existing)
    })

    groupedByComponent.forEach((entries, component) => {
      const families = new Set(entries.map((entry) => entry.family))
      expect(families.size).toBe(entries.length)
      expect(entries.length).toBeGreaterThan(0)
      expect(component.length).toBeGreaterThan(0)
    })
  })

  it("ensures every catalog component has a migration entry in the same family", () => {
    componentFamilyCatalog.forEach((family) => {
      const names = [
        ...family.canonical,
        ...family.members,
        ...(family.transitional ?? []),
        ...(family.advanced ?? []),
      ]

      names.forEach((component) => {
        const migrationEntries = getComponentFamilyEntries(component)
        expect(migrationEntries.length, `${component} should exist in migration map`).toBeGreaterThan(0)
        expect(migrationEntries.some((entry) => entry.family === family.family)).toBe(true)
      })
    })
  })

  it("ensures every migration entry belongs to a catalog family", () => {
    componentFamilyMigrationMap.forEach((entry) => {
      const family = getFamilyCatalogEntry(entry.family)
      expect(family, `${entry.family} should exist in catalog`).toBeTruthy()
    })
  })

  it("keeps transitional and advanced lists aligned with migration statuses", () => {
    const catalogTransitional = componentFamilyCatalog.flatMap((entry) => entry.transitional ?? [])
    const catalogAdvanced = componentFamilyCatalog.flatMap((entry) => entry.advanced ?? [])

    expect(listTransitionalComponents().map((entry) => entry.component).sort()).toEqual(catalogTransitional.sort())
    expect(listAdvancedComponents().map((entry) => entry.component).sort()).toEqual(catalogAdvanced.sort())
  })

  it("returns family members through query helpers", () => {
    componentFamilyCatalog.forEach((family) => {
      const members = getFamilyMembers(family.family)
      expect(members.length).toBeGreaterThan(0)
      members.forEach((member) => {
        expect(member.family).toBe(family.family)
      })
    })
  })

  it("includes at least one canonical component per family", () => {
    const canonicalByFamily = new Map<string, number>()

    listCanonicalComponents().forEach((entry) => {
      canonicalByFamily.set(entry.family, (canonicalByFamily.get(entry.family) ?? 0) + 1)
    })

    componentFamilyCatalog.forEach((family) => {
      expect(canonicalByFamily.get(family.family) ?? 0).toBeGreaterThan(0)
    })
  })

  it("builds family views with aligned entry counts", () => {
    const familyViews = listFamilyViews()
    expect(familyViews.length).toBe(componentFamilyCatalog.length)

    familyViews.forEach((familyView) => {
      expect(familyView.canonicalEntries.length).toBe(familyView.canonical.length)
      expect(familyView.memberEntries.length).toBe(familyView.members.length)
      expect(familyView.transitionalEntries.length).toBe(familyView.transitional?.length ?? 0)
      expect(familyView.advancedEntries.length).toBe(familyView.advanced?.length ?? 0)
    })
  })

  it("builds navigation and summary helpers for docs consumption", () => {
    const navigation = getFamilyNavigation()
    const summary = getMetadataSummary()

    expect(navigation.length).toBe(componentFamilyCatalog.length)
    expect(summary.families).toBe(componentFamilyCatalog.length)
    expect(summary.canonical).toBeGreaterThan(0)
    expect(summary.transitional).toBeGreaterThan(0)
    expect(summary.advanced).toBeGreaterThan(0)
  })

  it("returns a detailed family view for every catalog family", () => {
    componentFamilyCatalog.forEach((family) => {
      const familyView = getFamilyView(family.family)
      expect(familyView?.family).toBe(family.family)
      expect(familyView?.label).toBe(family.label)
    })
  })

  it("keeps docs group names and slugs unique", () => {
    const groups = componentDocsGroups.map((entry) => entry.group)
    const slugs = componentDocsGroups.map((entry) => entry.slug)

    expect(new Set(groups).size).toBe(groups.length)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("assigns each docs-group component to exactly one public route", () => {
    const groupedByComponent = new Map<string, string[]>()

    componentDocsGroups.forEach((entry) => {
      entry.sections.forEach((section) => {
        section.components.forEach((component) => {
          const groups = groupedByComponent.get(component) ?? []
          groups.push(entry.group)
          groupedByComponent.set(component, groups)
        })
      })
    })

    groupedByComponent.forEach((groups, component) => {
      expect(groups, `${component} should belong to one docs group`).toHaveLength(1)
    })
  })

  it("maps every docs group back to an existing family", () => {
    componentDocsGroups.forEach((entry) => {
      expect(getFamilyCatalogEntry(entry.family)?.family).toBe(entry.family)
      expect(getDocsGroup(entry.group)?.slug).toBe(entry.slug)
      expect(getDocsGroupByFamily(entry.family)?.group).toBe(entry.group)
    })
  })

  it("resolves grouped components back to their primary docs route", () => {
    expect(getDocsGroupByComponent("SearchInput")?.primaryComponent).toBe("Input")
    expect(getDocsGroupByComponent("FormAsyncSelect")?.primaryComponent).toBe("Select")
    expect(getDocsGroupByComponent("SmartCard")?.primaryComponent).toBe("Card")
    expect(getDocsGroupByComponent("FormBuilder")?.primaryComponent).toBe("FormFieldShell")
    expect(getDocsGroupByComponent("TableExportMenu")?.primaryComponent).toBe("DataTable")
  })

  it("builds docs navigation for public-site routing", () => {
    const navigation = getDocsNavigation()

    expect(listDocsGroups()).toHaveLength(componentDocsGroups.length)
    expect(navigation).toHaveLength(componentDocsGroups.length)
    navigation.forEach((entry) => {
      expect(entry.sectionCount).toBeGreaterThan(0)
      expect(entry.componentCount).toBeGreaterThan(0)
      expect(entry.slug.length).toBeGreaterThan(0)
    })
  })

  it("keeps member metadata aligned with docs-group components", () => {
    const docsComponents = new Set(
      componentDocsGroups.flatMap((group) => group.sections.flatMap((section) => section.components))
    )

    docsComponents.forEach((component) => {
      expect(getComponentMemberMetadata(component)?.component).toBe(component)
    })
  })

  it("builds member metadata queries for family detail usage", () => {
    componentFamilyCatalog.forEach((family) => {
      const members = getFamilyMemberMetadata(family.family)
      expect(members.length).toBeGreaterThan(0)
      members.forEach((member) => {
        expect(member.family).toBe(family.family)
        expect(member.summary.length).toBeGreaterThan(0)
        expect(member.useWhen.length).toBeGreaterThan(0)
      })
    })

    expect(listComponentsByMaturity("canonical").length).toBeGreaterThan(0)
    expect(listComponentsByMaturity("advanced").length).toBeGreaterThan(0)
  })

  it("builds docs group detail items with component usage metadata", () => {
    const inputDetail = getDocsGroupDetail("Input")
    expect(inputDetail?.sections.length).toBeGreaterThan(0)

    inputDetail?.sections.forEach((section) => {
      section.items.forEach((item) => {
        expect(item.adoption?.component).toBe(item.component)
        expect(item.metadata?.component).toBe(item.component)
        expect(item.metadata?.summary.length ?? 0).toBeGreaterThan(0)
      })
    })
  })

  it("keeps member metadata component names unique", () => {
    const names = componentMemberMetadata.map((entry) => entry.component)
    expect(new Set(names).size).toBe(names.length)
  })

  it("keeps snippet component coverage aligned with public docs routes", () => {
    const docsComponents = new Set(
      componentDocsGroups.flatMap((group) => group.sections.flatMap((section) => section.components))
    )

    docsComponents.forEach((component) => {
      expect(getComponentSnippets(component).length, `${component} should have at least one snippet`).toBeGreaterThan(0)
    })
  })

  it("builds snippet queries by component and family", () => {
    expect(getPrimaryComponentSnippet("Input")?.component).toBe("Input")
    expect(getFamilySnippets("InputFamily").length).toBeGreaterThan(0)
    expect(getFamilySnippets("SelectFamily").length).toBeGreaterThan(0)
    expect(listSnippetVariants().length).toBeGreaterThan(0)

    componentSnippetExamples.forEach((snippet) => {
      expect(snippet.title.length).toBeGreaterThan(0)
      expect(snippet.description.length).toBeGreaterThan(0)
      expect(snippet.code.length).toBeGreaterThan(0)
      expect(snippet.variant.length).toBeGreaterThan(0)
    })
  })

  it("includes snippet payloads in docs group detail items", () => {
    const selectDetail = getDocsGroupDetail("Select")
    expect(selectDetail?.sections.length).toBeGreaterThan(0)

    selectDetail?.sections.forEach((section) => {
      section.items.forEach((item) => {
        expect(item.snippets.length).toBeGreaterThan(0)
        expect(item.snippetVariants.size).toBeGreaterThan(0)
      })
    })
  })

  it("groups component snippets into variant tabs", () => {
    const inputVariants = getComponentSnippetsByVariant("Input")
    const asyncVariants = getComponentSnippetsByVariant("AsyncSelect")
    const migrationVariants = getComponentSnippetsByVariant("SmartCard")

    expect(inputVariants.get("basic")?.length ?? 0).toBeGreaterThan(0)
    expect(inputVariants.get("cli")?.length ?? 0).toBeGreaterThan(0)
    expect(asyncVariants.get("async")?.length ?? 0).toBeGreaterThan(0)
    expect(migrationVariants.get("migration")?.length ?? 0).toBeGreaterThan(0)
  })

  it("resolves canonical docs routes from component names and aliases", () => {
    expect(resolveDocsRouteByComponent("SearchInput")?.slug).toBe("input")
    expect(resolveDocsRouteByComponent("SmartCard")?.slug).toBe("card")

    expect(resolveDocsRoute("SearchInput")?.slug).toBe("input")
    expect(resolveDocsRoute("search-input")?.slug).toBe("input")
    expect(resolveDocsRoute("smart-card")?.slug).toBe("card")
    expect(resolveDocsRoute("Form Field")?.slug).toBe("form-field")
    expect(resolveDocsRoute("data_table")?.slug).toBe("data-table")
  })

  it("builds unique alias groups for every docs route", () => {
    const aliasGroups = listDocsRouteAliases()
    expect(aliasGroups).toHaveLength(componentDocsGroups.length)

    aliasGroups.forEach((group) => {
      expect(group.aliases.length).toBeGreaterThan(0)
      expect(new Set(group.aliases).size).toBe(group.aliases.length)
    })
  })

  it("builds adoption badges and recommended order for docs detail screens", () => {
    const inputAdoption = getComponentDocsAdoption("Input")
    const searchAdoption = getComponentDocsAdoption("SearchInput")
    const advancedAdoption = getComponentDocsAdoption("TagInput")
    const migrationAdoption = getComponentDocsAdoption("SmartCard")
    const formInputAdoption = getComponentDocsAdoption("FormInput")
    const formSearchAliasAdoption = getComponentDocsAdoption("FormSearchInput")
    const formSelectAdoption = getComponentDocsAdoption("FormSelect")
    const formAsyncAliasAdoption = getComponentDocsAdoption("FormAsyncSelect")

    expect(inputAdoption?.badge.label).toBe("Start here")
    expect(inputAdoption?.badge.tone).toBe("stable")
    expect(searchAdoption?.badge.label).toBe("Expand")
    expect(advancedAdoption?.badge.tone).toBe("advanced")
    expect(migrationAdoption?.badge.tone).toBe("migration")
    expect(formInputAdoption?.badge.tone).toBe("stable")
    expect(formSearchAliasAdoption?.badge.tone).toBe("migration")
    expect(formSelectAdoption?.badge.tone).toBe("stable")
    expect(formAsyncAliasAdoption?.badge.tone).toBe("migration")
    expect((inputAdoption?.recommendedOrder ?? 9999)).toBeLessThan(
      searchAdoption?.recommendedOrder ?? 9999
    )
    expect((formInputAdoption?.recommendedOrder ?? 9999)).toBeLessThan(
      formSearchAliasAdoption?.recommendedOrder ?? 9999
    )
    expect((formSelectAdoption?.recommendedOrder ?? 9999)).toBeLessThan(
      formAsyncAliasAdoption?.recommendedOrder ?? 9999
    )
  })

  it("lists docs adoption in recommended order inside a group", () => {
    const inputAdoption = listDocsAdoption("Input")
    expect(inputAdoption.length).toBeGreaterThan(0)

    for (let index = 1; index < inputAdoption.length; index += 1) {
      expect(inputAdoption[index - 1].recommendedOrder).toBeLessThanOrEqual(
        inputAdoption[index].recommendedOrder
      )
    }
  })
})
