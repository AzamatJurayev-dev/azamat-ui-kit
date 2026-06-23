import {
  componentMemberMetadata,
  type ComponentMemberMetadata,
  type ComponentMemberMaturity,
} from "@/families/member-metadata"
import type { ComponentFamilyName } from "@/families/catalog"

const memberMetadataByComponent = new Map<string, ComponentMemberMetadata>(
  componentMemberMetadata.map((entry) => [entry.component, entry])
)

function getComponentMemberMetadata(component: string) {
  return memberMetadataByComponent.get(component)
}

function getFamilyMemberMetadata(family: ComponentFamilyName) {
  return componentMemberMetadata.filter((entry) => entry.family === family)
}

function listComponentsByMaturity(maturity: ComponentMemberMaturity) {
  return componentMemberMetadata.filter((entry) => entry.maturity === maturity)
}

export {
  getComponentMemberMetadata,
  getFamilyMemberMetadata,
  listComponentsByMaturity,
}
