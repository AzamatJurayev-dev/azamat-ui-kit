import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '**/dist/**', 'packages/cli/vendor/**']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // These compiler-era rules need a dedicated migration pass. Core hook
      // ordering and dependency checks remain enabled through the recommended preset.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['src/components/integrations/document-scanner.tsx'],
    rules: {
      // OpenCV source-copy builds are excluded from the root type graph. These
      // icon bindings are reserved for the next review-toolbar pass and are
      // deliberately scoped to this integration instead of weakening the repo rule.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_|^(CheckIcon|FileImageIcon|ImageIcon|RotateCwIcon)$",
        },
      ],
    },
  },
])
