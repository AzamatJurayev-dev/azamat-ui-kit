import "./integration-registry"

import { Command } from "commander"
import { initCommand } from "./commands/init"
import { addCommand } from "./commands/add"
import { agentsCommand } from "./commands/agents"
import { listCommand } from "./commands/list"
import { doctorCommand } from "./commands/doctor"
import { themeCommand } from "./commands/theme"
import { presetCommand } from "./commands/preset"
import { getCliCommandManifest } from "./command-manifest"

const program = new Command()

program
  .name("tembro")
  .description("Tembro source-copy CLI")
  .version("6.3.0")

function commandFromManifest(name: string) {
  const manifest = getCliCommandManifest(name)
  if (!manifest) throw new Error(`CLI command manifest missing: ${name}`)

  const command = program.command(name).description(manifest.description)
  if (manifest.argument) command.argument(manifest.argument.syntax, manifest.argument.description)
  for (const option of manifest.options) command.option(option.flags, option.description)
  return command
}

commandFromManifest("init").action(async (options) => {
  await initCommand(options)
  if (!options.skipAgents) {
    await agentsCommand({ overwrite: options.overwriteAgents })
  }
})

commandFromManifest("preset").action(presetCommand)
commandFromManifest("list").action(listCommand)
commandFromManifest("doctor").action(doctorCommand)
commandFromManifest("add").action(addCommand)
commandFromManifest("agents").action(agentsCommand)
commandFromManifest("showcase").action((options) => addCommand(["showcase"], options))
commandFromManifest("theme").action(themeCommand)

program.parse()
