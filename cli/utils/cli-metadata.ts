export const LIBRARY_PACKAGE_NAME = "tembro"
export const CLI_PACKAGE_NAME = "tembro"
export const CLI_EXECUTABLE_NAME = "tembro"

export function getCliNpxCommand(args = "") {
  return `npx ${CLI_PACKAGE_NAME} ${args}`.trim()
}
