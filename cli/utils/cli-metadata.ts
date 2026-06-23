export const LIBRARY_PACKAGE_NAME = "azamat-ui-kit"
export const CLI_PACKAGE_NAME = "azamat-ui-kit-cli"
export const CLI_EXECUTABLE_NAME = "azamat-ui-kit"

export function getCliNpxCommand(args = "") {
  return `npx ${CLI_PACKAGE_NAME} ${args}`.trim()
}
