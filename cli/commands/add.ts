import path from "path";
import fs from "fs-extra";
import { logger } from "../utils/logger";
import { registry, registryNames, type ComponentName, type ComponentRegistryItem } from "../registry";
import { detectPackageManager } from "../utils/detect-package-manager";
import { installPackages } from "../utils/install-packages";
import { getCliNpxCommand } from "../utils/cli-metadata";
import { getPackageRootFromImportMeta } from "../utils/package-root";

type AzamatUiConfig = {
  style?: string;
  alias?: string;
  componentsPath?: string;
  utilsPath?: string;
  paths?: {
    components?: string;
    ui?: string;
    hooks?: string;
    lib?: string;
  };
};

type AddCommandOptions = {
  overwrite?: boolean;
  dryRun?: boolean;
  skipInstall?: boolean;
};

function isComponentName(value: string): value is ComponentName {
  return value in registry;
}

function getComponentsRoot(config: AzamatUiConfig) {
  if (config.paths?.components) return config.paths.components;

  const legacyComponentsPath = config.componentsPath ?? "src/components/ui";
  return legacyComponentsPath.endsWith("/ui") || legacyComponentsPath.endsWith("\\ui")
    ? path.dirname(legacyComponentsPath)
    : legacyComponentsPath;
}

function resolveTargetPath(target: string, config: AzamatUiConfig) {
  const componentsRoot = getComponentsRoot(config);
  const uiPath = config.paths?.ui ?? config.componentsPath ?? path.join(componentsRoot, "ui");
  const hooksPath = config.paths?.hooks ?? "src/hooks";
  const libPath = config.paths?.lib ?? path.dirname(config.utilsPath ?? "src/lib/utils.ts");
  const utilsPath = config.utilsPath ?? path.join(libPath, "utils.ts");

  return target
    .replaceAll("{components}", componentsRoot)
    .replaceAll("{ui}", uiPath)
    .replaceAll("{hooks}", hooksPath)
    .replaceAll("{lib}", libPath)
    .replaceAll("{utils}", utilsPath);
}

function applyAlias(content: string, alias = "@") {
  if (alias === "@") return content;
  return content.replaceAll("@/", `${alias}/`);
}

function collectRegistryItems(componentNames: ComponentName[]) {
  const collected: ComponentRegistryItem[] = [];
  const seen = new Set<ComponentName>();

  function visit(componentName: ComponentName) {
    if (seen.has(componentName)) return;

    const item = registry[componentName];
    item.registryDependencies?.forEach(visit);

    seen.add(componentName);
    collected.push(item);
  }

  componentNames.forEach(visit);
  return collected;
}

function formatAvailableComponents() {
  return registryNames
    .filter((name) => registry[name].category !== "lib")
    .sort()
    .join(", ");
}

export async function addCommand(components: string[], options: AddCommandOptions = {}) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "azamat-ui.json");

  if (!fs.existsSync(configPath)) {
    logger.error("azamat-ui.json topilmadi. Avval init qiling:");
    logger.info(getCliNpxCommand("init"));
    process.exit(1);
  }

  if (!components.length) {
    logger.error("Component nomini kiriting:");
    logger.info(getCliNpxCommand("add data-table async-select form-input"));
    logger.info(`Mavjud componentlar: ${formatAvailableComponents()}`);
    process.exit(1);
  }

  const validComponents: ComponentName[] = [];

  for (const componentName of components) {
    if (!isComponentName(componentName)) {
      logger.warn(`${componentName} registry ichida mavjud emas.`);
      continue;
    }

    validComponents.push(componentName);
  }

  if (!validComponents.length) {
    logger.error("Qo‘shish uchun valid component topilmadi.");
    process.exit(1);
  }

  const config = (await fs.readJson(configPath)) as AzamatUiConfig;
  const packageRoot = getPackageRootFromImportMeta(import.meta.url);
  const packageManager = detectPackageManager(cwd);
  const items = collectRegistryItems(validComponents);
  const dependenciesToInstall = new Set<string>();

  for (const item of items) {
    item.dependencies?.forEach((dep) => dependenciesToInstall.add(dep));

    for (const file of item.files ?? []) {
      const sourcePath = path.join(packageRoot, file.source);
      const targetPath = path.join(cwd, resolveTargetPath(file.target, config));

      if (!fs.existsSync(sourcePath)) {
        logger.warn(`${file.source} topilmadi. O‘tkazib yuborildi.`);
        continue;
      }

      if (options.dryRun) {
        logger.info(`[dry-run] ${file.source} -> ${path.relative(cwd, targetPath)}`);
        continue;
      }

      await fs.ensureDir(path.dirname(targetPath));

      if (fs.existsSync(targetPath) && !options.overwrite) {
        logger.warn(`${path.relative(cwd, targetPath)} allaqachon mavjud. O‘tkazib yuborildi.`);
        continue;
      }

      const sourceContent = await fs.readFile(sourcePath, "utf8");
      await fs.writeFile(targetPath, applyAlias(sourceContent, config.alias));
      logger.success(`${path.relative(cwd, targetPath)} qo‘shildi.`);
    }
  }

  if (!options.skipInstall && dependenciesToInstall.size > 0 && !options.dryRun) {
    await installPackages({
      cwd,
      packageManager,
      packages: Array.from(dependenciesToInstall),
    });
  }

  logger.success("Componentlar muvaffaqiyatli qo‘shildi.");
}
