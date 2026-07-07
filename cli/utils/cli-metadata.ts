export const LIBRARY_PACKAGE_NAME = "@azamatjurayevdev/azix-ui"
export const CLI_PACKAGE_NAME = "@azamatjurayevdev/azix-ui"
export const CLI_EXECUTABLE_NAME = "azix"

export function getCliNpxCommand(args = "") {
  return `npx ${CLI_PACKAGE_NAME} ${args}`.trim()
}
