import { Command } from "commander"
import { initCommand } from "./commands/init"
import { addCommand } from "./commands/add"
import { listCommand } from "./commands/list"
import { themeCommand } from "./commands/theme"

const program = new Command()

program
  .name("azamat-ui-kit")
  .description("Azamat UI Kit CLI")
  .version("0.1.1")

program
  .command("init")
  .description("Initialize Azamat UI Kit in your project")
  .option("--template <template>", "Project defaults: vite or next", "vite")
  .option("--skip-install", "Do not install base dependencies")
  .action(initCommand)

program
  .command("list")
  .description("List available registry components")
  .action(listCommand)

program
  .command("add")
  .description("Add components to your project")
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
