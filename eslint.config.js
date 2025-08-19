import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      // 'prettier',
      // TypeScript ESLint에서 지원하지 않는 방식이라며 OUTPUT에서 에러 발생.
    ],
    // reactHooks도 중복선언으로 인한 에러 발생으로 삭제
    // reactRefresh도 중복이라 삭제. extends와 plugin은 중복되면 안된다.
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // 여기도 중복이라 불필요하여 삭제.
      // rules 항목은 중복으로 에러가 발생하진 않으나 덮어씌워진다고 함.
      // 덮어씌움이 필요한 속성들은 유지.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
        // type export시 경고발생으로 불편할 수 있으나 실사용에는 괜찮다. type.ts 한 파일에 export할 type을 모아서 경고창이 한 파일에만 나오게끔 하면 덜 불편할 거라고 지피티가 추천함.
      ],
    },
  },
  prettier,
]);
