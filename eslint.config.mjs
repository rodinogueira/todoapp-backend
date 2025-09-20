import { js } from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default {
  ...js.configs.recommended,
  plugins: {
    prettier: prettierRecommended,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
  },
};
