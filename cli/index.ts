import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";

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
    .command("add")
    .description("Add components to your project")
    .argument("[components...]", "components to add")
    .action(addCommand);

program.parse();