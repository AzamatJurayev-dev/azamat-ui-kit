import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { logger } from "../utils/logger";
import { detectPackageManager } from "../utils/detect-package-manager";
import { installPackages } from "../utils/install-packages";
import { AZAMAT_UI_THEME_MARKER, azamatUiThemeCss } from "../templates/theme-css";

const baseDependencies = [
  "@base-ui/react",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-react",
  "tw-animate-css",
];

type InitResponse = {
  installDeps: boolean;
  alias: string;
  componentsPath: string;
  uiPath: string;
  hooksPath: string;
  utilsPath: string;
  globalCssPath: string;
  writeThemeCss: boolean;
};

async function ensureThemeCss(cssPath: string) {
  await fs.ensureDir(path.dirname(cssPath));

  const currentCss = fs.existsSync(cssPath) ? await fs.readFile(cssPath, "utf8") : "";

  if (currentCss.includes(AZAMAT_UI_THEME_MARKER)) {
    logger.warn("Azamat UI Kit theme CSS allaqachon mavjud. O‘tkazib yuborildi.");
    return;
  }

  const nextCss = currentCss.trim().length > 0
    ? `${currentCss.trimEnd()}\n${azamatUiThemeCss}\n`
    : `${azamatUiThemeCss.trimStart()}\n`;

  await fs.writeFile(cssPath, nextCss);
  logger.success(`${cssPath} ichiga Azamat UI Kit theme CSS qo‘shildi.`);
}

export async function initCommand() {
  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    logger.error("package.json topilmadi. Commandni React/Vite project ichida ishlating.");
    process.exit(1);
  }

  const response = (await prompts([
    {
      type: "confirm",
      name: "installDeps",
      message: "Asosiy dependencylarni o‘rnataymi?",
      initial: true,
    },
    {
      type: "text",
      name: "alias",
      message: "Path alias qanday?",
      initial: "@",
    },
    {
      type: "text",
      name: "componentsPath",
      message: "Component root qayerda?",
      initial: "src/components",
    },
    {
      type: "text",
      name: "uiPath",
      message: "UI primitives qayerga yozilsin?",
      initial: "src/components/ui",
    },
    {
      type: "text",
      name: "hooksPath",
      message: "Hooks qayerga yozilsin?",
      initial: "src/hooks",
    },
    {
      type: "text",
      name: "utilsPath",
      message: "utils.ts qayerga yozilsin?",
      initial: "src/lib/utils.ts",
    },
    {
      type: "text",
      name: "globalCssPath",
      message: "Theme tokenlar qaysi global CSS faylga yozilsin?",
      initial: "src/index.css",
    },
    {
      type: "confirm",
      name: "writeThemeCss",
      message: "Dark/light theme tokenlarni global CSS faylga yozaymi?",
      initial: true,
    },
  ])) as InitResponse;

  const packageManager = detectPackageManager(cwd);

  logger.info(`Package manager: ${packageManager}`);

  if (response.installDeps) {
    await installPackages({
      cwd,
      packageManager,
      packages: baseDependencies,
    });
  }

  const config = {
    style: "default",
    alias: response.alias || "@",
    componentsPath: response.uiPath,
    utilsPath: response.utilsPath,
    globalCssPath: response.globalCssPath,
    paths: {
      components: response.componentsPath,
      ui: response.uiPath,
      hooks: response.hooksPath,
      lib: path.dirname(response.utilsPath),
    },
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

  if (response.writeThemeCss && response.globalCssPath) {
    await ensureThemeCss(path.join(cwd, response.globalCssPath));
  }

  logger.success("Azamat UI Kit init qilindi.");
  logger.info("Componentlarni ko‘rish:");
  logger.info("npx azamat-ui-kit list");
  logger.info("Component qo‘shish:");
  logger.info("npx azamat-ui-kit add button input data-table");
}
