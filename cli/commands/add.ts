import path from "path";
import fs from "fs-extra";
import { logger } from "../utils/logger";
import { registry, type ComponentName } from "../registry";
import { detectPackageManager } from "../utils/detect-package-manager";
import { installPackages } from "../utils/install-packages";

type AzamatUiConfig = {
  style: string;
  componentsPath: string;
  utilsPath: string;
};

function isComponentName(value: string): value is ComponentName {
  return value in registry;
}

export async function addCommand(components: string[]) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "azamat-ui.json");

  if (!fs.existsSync(configPath)) {
    logger.error("azamat-ui.json topilmadi. Avval init qiling:");
    logger.info("npx azamat-ui-kit init");
    process.exit(1);
  }

  if (!components.length) {
    logger.error("Component nomini kiriting:");
    logger.info("npx azamat-ui-kit add button input");
    process.exit(1);
  }

  const config = await fs.readJson(configPath) as AzamatUiConfig;
  const packageManager = detectPackageManager(cwd);

  const dependenciesToInstall = new Set<string>();

  for (const componentName of components) {
    if (!isComponentName(componentName)) {
      logger.warn(`${componentName} registry ichida mavjud emas.`);
      continue;
    }

    const item = registry[componentName];

    item.dependencies?.forEach((dep) => dependenciesToInstall.add(dep));

    for (const file of item.files) {
      const targetPath = path.join(cwd, config.componentsPath, file.path);

      await fs.ensureDir(path.dirname(targetPath));

      if (fs.existsSync(targetPath)) {
        logger.warn(`${file.path} allaqachon mavjud. O‘tkazib yuborildi.`);
        continue;
      }

      await fs.writeFile(targetPath, file.content);
      logger.success(`${file.path} qo‘shildi.`);
    }
  }

  if (dependenciesToInstall.size > 0) {
    await installPackages({
      cwd,
      packageManager,
      packages: Array.from(dependenciesToInstall),
    });
  }

  logger.success("Componentlar muvaffaqiyatli qo‘shildi.");
}