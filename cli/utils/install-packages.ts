import { execa } from "execa";
import type { PackageManager } from "./detect-package-manager";

type InstallPackagesOptions = {
    cwd: string;
    packageManager: PackageManager;
    packages: string[];
    dev?: boolean;
};

export async function installPackages({
    cwd,
    packageManager,
    packages,
    dev = false,
}: InstallPackagesOptions) {
    if (!packages.length) return;

    const commandMap: Record<PackageManager, string> = {
        npm: "npm",
        pnpm: "pnpm",
        yarn: "yarn",
        bun: "bun",
    };

    const argsMap: Record<PackageManager, string[]> = {
        npm: ["install", ...(dev ? ["-D"] : []), ...packages],
        pnpm: ["add", ...(dev ? ["-D"] : []), ...packages],
        yarn: ["add", ...(dev ? ["-D"] : []), ...packages],
        bun: ["add", ...(dev ? ["-d"] : []), ...packages],
    };

    await execa(commandMap[packageManager], argsMap[packageManager], {
        cwd,
        stdio: "inherit",
    });
}