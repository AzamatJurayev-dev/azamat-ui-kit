import { Command } from "commander"
import { initCommand } from "./commands/init"
import { addCommand } from "./commands/add"
import { listCommand } from "./commands/list"
import { themeCommand } from "./commands/theme"
import { presetCommand } from "./commands/preset"

const program = new Command()

program
  .name("azix")
  .description("Azamat UI Kit source-copy CLI")
  .version("0.3.24")

program
  .command("init")
  .description("Initialize local Azamat UI source files in your project")
  .option("--template <template>", "Project defaults: vite or next", "vite")
  .option("--skip-install", "Do not install base dependencies")
  .option("-y, --defaults", "Use template defaults without interactive prompts")
  .action(initCommand)

program
  .command("preset")
  .description("Add a source-copy preset to your project")
  .argument("<name>", "preset name: minimal or dashboard")
  .option("-o, --overwrite", "overwrite existing files")
  .option("--dry-run", "show files without writing")
  .option("--skip-install", "do not install package dependencies")
  .action(presetCommand)

program
  .command("list")
  .description("List available registry components")
  .action(listCommand)

program
  .command("add")
  .description("Copy component source files into your project")
  .argument("[components...]", "components to add")
  .option("-o, --overwrite", "overwrite existing files")
  .option("--dry-run", "show files without writing")
  .option("--skip-install", "do not install package dependencies")
  .action(addCommand)

program
  .command("theme")
  .description("Write or update Azamat UI theme CSS in your global CSS file")
  .argument("[cssPath]", "global CSS path, default from azamat-ui.json or src/index.css")
  .action(themeCommand)

program.parse()

