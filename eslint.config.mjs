import { defineConfig } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/react',
        'eslint:recommended',
        'next/core-web-vitals',
        'prettier',
        'plugin:storybook/recommended',
        'plugin:@typescript-eslint/recommended',
      ),
    ),

    plugins: {
      react: fixupPluginRules(react),
      prettier,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
      globals: {},
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },

    rules: {
      'prettier/prettier': ['error'],
      'no-console': 'off',
      'no-alert': 'error',
      'linebreak-style': ['warn', 'unix'],
      'react/require-default-props': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-unescaped-entities': 'off',
      'import/default': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-img-element': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    ignores: ['**/*.stories.tsx'],

    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },
]);
