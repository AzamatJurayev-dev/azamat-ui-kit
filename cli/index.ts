import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";
import { listCommand } from "./commands/list";

const program = new Command();

program
  .name("azamat-ui-kit")
  .description("Azamat UI Kit CLI")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize Azamat UI Kit in your project")
  .action(initCommand);

program
  .command("list")
  .description("List available registry components")
  .action(listCommand);

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "components to add")
  .option("-o, --overwrite", "overwrite existing files")
  .option("--dry-run", "show files without writing")
  .option("--skip-install", "do not install package dependencies")
  .action(addCommand);

program.parse();
