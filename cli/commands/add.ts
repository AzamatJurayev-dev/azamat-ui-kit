import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { logger } from "../utils/logger";
import { registry, registryNames, type ComponentName, type ComponentRegistryItem } from "../registry";
import { detectPackageManager } from "../utils/detect-package-manager";
import { installPackages } from "../utils/install-packages";
import { getCliNpxCommand } from "../utils/cli-metadata";
import { getPackageRootFromImportMeta } from "../utils/package-root";

type TembroConfig = {
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

function resolveCanonicalComponentName(componentName: ComponentName) {
  const visited = new Set<ComponentName>()
  let current = componentName

  while (registry[current].migrationAliasFor) {
    if (visited.has(current)) {
      throw new Error(`Registry migration alias cycle detected at ${current}`)
    }

    visited.add(current)
    current = registry[current].migrationAliasFor as ComponentName
  }

  return current
}

function getComponentsRoot(config: TembroConfig) {
  if (config.paths?.components) return config.paths.components;

  const legacyComponentsPath = config.componentsPath ?? "src/components/ui";
  return legacyComponentsPath.endsWith("/ui") || legacyComponentsPath.endsWith("\\ui")
    ? path.dirname(legacyComponentsPath)
    : legacyComponentsPath;
}

function resolveTargetPath(target: string, config: TembroConfig) {
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

function getLocalSourceTarget(sourcePath: string, config: TembroConfig) {
  const normalized = sourcePath.replaceAll("\\", "/");

  if (normalized === "src/lib/utils.ts") return config.utilsPath ?? "src/lib/utils.ts";
  if (normalized.startsWith("src/lib/")) {
    const libPath = config.paths?.lib ?? path.dirname(config.utilsPath ?? "src/lib/utils.ts");
    return path.join(libPath, normalized.replace("src/lib/", ""));
  }
  if (normalized.startsWith("src/hooks/")) {
    return path.join(config.paths?.hooks ?? "src/hooks", normalized.replace("src/hooks/", ""));
  }
  if (normalized.startsWith("src/components/ui/")) {
    const uiPath = config.paths?.ui ?? config.componentsPath ?? "src/components/ui";
    return path.join(uiPath, normalized.replace("src/components/ui/", ""));
  }
  if (normalized.startsWith("src/components/")) {
    const componentsRoot = getComponentsRoot(config);
    return path.join(componentsRoot, normalized.replace("src/components/", ""));
  }

  return undefined;
}

function resolveLocalImportSource(importPath: string, fromSource?: string) {
  if (importPath === "@/lib/utils") return "src/lib/utils.ts";
  if (importPath.startsWith("@/lib/")) return `src/lib/${importPath.replace("@/lib/", "")}`;
  if (importPath.startsWith("@/components/")) return `src/components/${importPath.replace("@/components/", "")}`;
  if (importPath.startsWith("@/hooks/")) return `src/hooks/${importPath.replace("@/hooks/", "")}`;
  if (fromSource && importPath.startsWith(".")) {
    return path.posix.normalize(path.posix.join(path.posix.dirname(fromSource), importPath));
  }
  return undefined;
}

function getImportCandidates(sourceWithoutExtension: string) {
  return [
    path.join(sourceWithoutExtension, "index.tsx").replaceAll("\\", "/"),
    path.join(sourceWithoutExtension, "index.ts").replaceAll("\\", "/"),
    `${sourceWithoutExtension}.tsx`,
    `${sourceWithoutExtension}.ts`,
  ];
}

function getLocalImports(content: string, fromSource: string) {
  const imports = new Set<string>();
  const importPattern =
    /(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;
  let match: RegExpExecArray | null;

  while ((match = importPattern.exec(content))) {
    const importPath = match[1] ?? match[2];
    const sourcePath = resolveLocalImportSource(importPath, fromSource);
    if (sourcePath) imports.add(sourcePath);
  }

  return [...imports];
}

const ignoredExternalPackages = new Set([
  "react",
  "react-dom",
  "node:path",
  "node:fs",
  "node:fs/promises",
]);

function getExternalImportPackages(content: string) {
  const packages = new Set<string>();
  const importPattern =
    /(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;
  let match: RegExpExecArray | null;

  while ((match = importPattern.exec(content))) {
    const importPath = match[1] ?? match[2];

    if (
      !importPath ||
      importPath.startsWith(".") ||
      importPath.startsWith("@/") ||
      ignoredExternalPackages.has(importPath)
    ) {
      continue;
    }

    if (importPath.startsWith("@")) {
      const [scope, name] = importPath.split("/");
      if (scope && name) packages.add(`${scope}/${name}`);
      continue;
    }

    packages.add(importPath.split("/")[0]);
  }

  return [...packages];
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
    .filter((name) => registry[name].category !== "lib" && !registry[name].migrationAliasFor)
    .sort()
    .join(", ");
}

export async function addCommand(components: string[], options: AddCommandOptions = {}) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "tembro.json");

  if (!fs.existsSync(configPath)) {
    logger.error("tembro.json topilmadi. Avval init qiling:");
    logger.info(getCliNpxCommand("init"));
    process.exit(1);
  }

  if (!components.length) {
    logger.error("Component nomini kiriting:");
    logger.info(getCliNpxCommand("add data-table async-select input"));
    logger.info(`Mavjud componentlar: ${formatAvailableComponents()}`);
    process.exit(1);
  }

  const validComponents: ComponentName[] = [];

  for (const componentName of components) {
    if (!isComponentName(componentName)) {
      logger.warn(`${componentName} registry ichida mavjud emas.`);
      continue;
    }

    const canonicalName = resolveCanonicalComponentName(componentName)
    if (canonicalName !== componentName) {
      logger.warn(`${componentName} deprecated. ${canonicalName} ishlatiladi.`)
    }

    if (!validComponents.includes(canonicalName)) {
      validComponents.push(canonicalName)
    }
  }

  if (!validComponents.length) {
    logger.error("Qo‘shish uchun valid component topilmadi.");
    process.exit(1);
  }

  const config = (await fs.readJson(configPath)) as TembroConfig;
  const packageRoot = getPackageRootFromImportMeta(import.meta.url);
  const packageManager = detectPackageManager(cwd);
  const items = collectRegistryItems(validComponents);
  const dependenciesToInstall = new Set<string>();
  const copiedSources = new Set<string>();
  let overwriteConflicts = options.overwrite === true ? true : undefined;
  let addedFiles = 0;
  let overwrittenFiles = 0;
  let skippedFiles = 0;

  async function shouldOverwriteConflict(relativeTarget: string) {
    if (overwriteConflicts !== undefined) return overwriteConflicts;

    const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY && !process.env.CI);
    if (!isInteractive) {
      overwriteConflicts = false;
      logger.warn(`Mavjud fayllar o‘zgartirilmadi. Majburiy yozish uchun --overwrite ishlating.`);
      return false;
    }

    const answer = await prompts({
      type: "confirm",
      name: "overwrite",
      message: `${relativeTarget} allaqachon mavjud. Barcha conflict fayllarni overwrite qilasizmi?`,
      initial: false,
    });

    overwriteConflicts = answer.overwrite === true;
    if (!overwriteConflicts) {
      logger.info("Mavjud fayllar saqlanadi; faqat yetishmayotgan fayllar qo‘shiladi.");
    }
    return overwriteConflicts;
  }

async function copySourceWithLocalImports(source: string, targetTemplate?: string) {
  const normalizedSource = source.replaceAll("\\", "/");
  if (copiedSources.has(normalizedSource)) return;

  const sourcePath = path.join(packageRoot, normalizedSource);
  if (!fs.existsSync(sourcePath)) {
    logger.warn(`${normalizedSource} topilmadi. O‘tkazib yuborildi.`);
    return;
  }

  const sourceStat = await fs.stat(sourcePath);

  if (sourceStat.isDirectory()) {
    copiedSources.add(normalizedSource);

    const entries = await fs.readdir(sourcePath, { withFileTypes: true });
    for (const entry of entries) {
      const childSource = path.posix.join(normalizedSource, entry.name);
      const childTarget = targetTemplate
        ? path.posix.join(targetTemplate.replaceAll("\\", "/"), entry.name)
        : undefined;

      await copySourceWithLocalImports(childSource, childTarget);
    }

    return;
  }

  copiedSources.add(normalizedSource);

  const resolvedTarget = targetTemplate
      ? resolveTargetPath(targetTemplate, config)
      : getLocalSourceTarget(normalizedSource, config);

    if (!resolvedTarget) return;

    const targetPath = path.join(cwd, resolvedTarget);

    const relativeTarget = path.relative(cwd, targetPath);
    const targetExists = fs.existsSync(targetPath);

    if (options.dryRun) {
      const operation = targetExists ? "conflict" : "add";
      logger.info(`[dry-run:${operation}] ${normalizedSource} -> ${relativeTarget}`);
    } else if (targetExists && !(await shouldOverwriteConflict(relativeTarget))) {
      skippedFiles += 1;
      logger.warn(`${relativeTarget} allaqachon mavjud. O‘tkazib yuborildi.`);
    } else {
      await fs.ensureDir(path.dirname(targetPath));
      const sourceContent = await fs.readFile(sourcePath, "utf8");
      await fs.writeFile(targetPath, applyAlias(sourceContent, config.alias));
      if (targetExists) {
        overwrittenFiles += 1;
        logger.success(`${relativeTarget} yangilandi.`);
      } else {
        addedFiles += 1;
        logger.success(`${relativeTarget} qo‘shildi.`);
      }
    }

    const sourceContent = await fs.readFile(sourcePath, "utf8");
    for (const externalPackage of getExternalImportPackages(sourceContent)) {
      dependenciesToInstall.add(externalPackage);
    }

    for (const importedSource of getLocalImports(sourceContent, normalizedSource)) {
      for (const candidate of getImportCandidates(importedSource)) {
        if (fs.existsSync(path.join(packageRoot, candidate))) {
          await copySourceWithLocalImports(candidate);
          break;
        }
      }
    }
  }

  for (const item of items) {
    item.dependencies?.forEach((dep) => dependenciesToInstall.add(dep));

    for (const file of item.files ?? []) {
      await copySourceWithLocalImports(file.source, file.target);
    }
  }

  const changedFiles = addedFiles + overwrittenFiles;

  if (!options.skipInstall && dependenciesToInstall.size > 0 && !options.dryRun && changedFiles > 0) {
    await installPackages({
      cwd,
      packageManager,
      packages: Array.from(dependenciesToInstall),
    });
  }

  if (options.dryRun) {
    logger.info("Dry run tugadi. Hech qanday fayl o‘zgartirilmadi.");
  } else if (changedFiles === 0) {
    logger.warn(`O‘zgarish yo‘q. ${skippedFiles} ta mavjud fayl saqlandi.`);
  } else {
    logger.success(
      `Tayyor: ${addedFiles} ta qo‘shildi, ${overwrittenFiles} ta yangilandi, ${skippedFiles} ta saqlandi.`
    );
  }
}
