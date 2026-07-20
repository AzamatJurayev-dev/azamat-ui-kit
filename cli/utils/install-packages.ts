import { execa } from "execa";
import type { PackageManager } from "./detect-package-manager";

type InstallPackagesOptions = {
    cwd: string;
    packageManager: PackageManager;
    packages: string[];
    dev?: boolean;
};

const packageInstallSpecs: Record<string, string> = {
    "@base-ui/react": "@base-ui/react@^1.5.0",
    "@dnd-kit/helpers": "@dnd-kit/helpers@^0.5.0",
    "@dnd-kit/react": "@dnd-kit/react@^0.5.0",
    "@tanstack/react-table": "@tanstack/react-table@^8.21.3",
    "@tanstack/react-virtual": "@tanstack/react-virtual@^3.14.5",
    "@tiptap/core": "@tiptap/core@3.28.0",
    "@tiptap/extension-bubble-menu": "@tiptap/extension-bubble-menu@3.28.0",
    "@tiptap/extension-floating-menu": "@tiptap/extension-floating-menu@3.28.0",
    "@tiptap/extension-link": "@tiptap/extension-link@3.28.0",
    "@tiptap/extension-placeholder": "@tiptap/extension-placeholder@3.28.0",
    "@tiptap/extensions": "@tiptap/extensions@3.28.0",
    "@tiptap/pm": "@tiptap/pm@3.28.0",
    "@tiptap/react": "@tiptap/react@3.28.0",
    "@tiptap/starter-kit": "@tiptap/starter-kit@3.28.0",
    "@types/qrcode": "@types/qrcode@^1.5.6",
    "class-variance-authority": "class-variance-authority@^0.7.1",
    "clsx": "clsx@^2.1.1",
    "cmdk": "cmdk@^1.1.1",
    "lucide-react": "lucide-react@^1.17.0",
    "qrcode": "qrcode@^1.5.4",
    "react-easy-crop": "react-easy-crop@^6.2.2",
    "recharts": "recharts@^3.9.2",
    "tailwind-merge": "tailwind-merge@^3.6.0",
};

export async function installPackages({
    cwd,
    packageManager,
    packages,
    dev = false,
}: InstallPackagesOptions) {
    if (!packages.length) return;

    const installSpecs = packages.map((packageName) => packageInstallSpecs[packageName] ?? packageName);

    const commandMap: Record<PackageManager, string> = {
        npm: "npm",
        pnpm: "pnpm",
        yarn: "yarn",
        bun: "bun",
    };

    const argsMap: Record<PackageManager, string[]> = {
        npm: ["install", ...(dev ? ["-D"] : []), ...installSpecs],
        pnpm: ["add", ...(dev ? ["-D"] : []), ...installSpecs],
        yarn: ["add", ...(dev ? ["-D"] : []), ...installSpecs],
        bun: ["add", ...(dev ? ["-d"] : []), ...installSpecs],
    };

    try {
        await execa(commandMap[packageManager], argsMap[packageManager], {
            cwd,
            stdio: "inherit",
        });
    } catch (error) {
        if (packageManager !== "npm") throw error;

        await execa(commandMap[packageManager], ["install", "--force", ...(dev ? ["-D"] : []), ...installSpecs], {
            cwd,
            stdio: "inherit",
        });
    }
}
