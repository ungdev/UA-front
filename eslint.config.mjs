import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import storybook from 'eslint-plugin-storybook';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  storybook.configs['flat/recommended'],
  prettierRecommended,

  {
    settings: {
      react: { version: 'detect' },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {},
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },

    rules: {
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
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
]);
