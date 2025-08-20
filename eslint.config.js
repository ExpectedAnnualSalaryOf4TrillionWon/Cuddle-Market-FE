import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // 0) .eslintignore 대체
  { ignores: ['dist/', 'build/', 'nodemodules/'] },

  // 1) JS 파일(설정 파일 포함)도 기본 파싱
  {
    files: ['/.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // 2) ESLint/TS 권장 설정s
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3) TS/TSX + React 규칙
  {
    files: ['**/.{ts,tsx}'], // <-- 기존의 '*/.{ts,tsx}' 는 매칭이 안 됨!
    languageOptions: {
      parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // React & Hooks 권장 규칙
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // React Refresh 권장 규칙 (있으면 적용)
      ...(reactRefresh.configs?.recommended?.rules ?? {}),

      // TS 프로젝트 기본 튜닝
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^', varsIgnorePattern: '^[A-Z]' },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },

  // 4) 항상 마지막: Prettier (충돌 규칙 끔)
  prettier,
);
