import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { logger } from "../utils/logger";
import { detectPackageManager } from "../utils/detect-package-manager";
import { installPackages } from "../utils/install-packages";

const dependencies = [
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-react",
  "tw-animate-css",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-select",
  "@tanstack/react-table",
  "cmdk",
];

export async function initCommand() {
  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    logger.error("package.json topilmadi. Commandni React/Vite project ichida ishlating.");
    process.exit(1);
  }

  const response = await prompts([
    {
      type: "confirm",
      name: "installDeps",
      message: "Kerakli dependencylarni o‘rnataymi?",
      initial: true,
    },
    {
      type: "text",
      name: "componentsPath",
      message: "Componentlar qayerga yozilsin?",
      initial: "src/components/ui",
    },
    {
      type: "text",
      name: "utilsPath",
      message: "utils.ts qayerga yozilsin?",
      initial: "src/lib/utils.ts",
    },
  ]);

  const packageManager = detectPackageManager(cwd);

  logger.info(`Package manager: ${packageManager}`);

  if (response.installDeps) {
    await installPackages({
      cwd,
      packageManager,
      packages: dependencies,
    });
  }

  const config = {
    style: "default",
    componentsPath: response.componentsPath,
    utilsPath: response.utilsPath,
  };

  await fs.writeJson(path.join(cwd, "azamat-ui.json"), config, {
    spaces: 2,
  });

  const utilsFullPath = path.join(cwd, response.utilsPath);
  await fs.ensureDir(path.dirname(utilsFullPath));

  if (!fs.existsSync(utilsFullPath)) {
    await fs.writeFile(
      utilsFullPath,
      `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`
    );
  }

  logger.success("Azamat UI Kit init qilindi.");
  logger.info("Endi component qo‘shish mumkin:");
  logger.info("npx azamat-ui-kit add button input");
}