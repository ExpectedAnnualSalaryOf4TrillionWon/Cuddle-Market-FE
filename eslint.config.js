// import js from '@eslint/js';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// import { globalIgnores } from 'eslint/config';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';
// import prettier from 'eslint-config-prettier';

// export default tseslint.config([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//       // 'prettier',
//       // TypeScript ESLint에서 지원하지 않는 방식이라며 OUTPUT에서 에러 발생.
//     ],
//     plugins: ['react'], //ESlint 수정하며 새롭게 발생한 타입에러 해결.
//     // reactHooks,react-refresh는 중복선언으로 인한 에러 발생으로 삭제.
//     // extends와 plugins의 속성이 중복되면 에러를 발생시킨다.
//     settings: {
//       react: {
//         version: 'detect', // 🔍 React 자동 감지
//       },
//     },
//     languageOptions: {
//       ecmaVersion: 'latest',
//       globals: globals.browser,
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//         sourceType: 'module',
//       },
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       // 여기도 중복이라 불필요하여 삭제.
//       // rules 항목은 중복으로 에러가 발생하진 않으나 덮어씌워진다고 함.
//       // 덮어씌움이 필요한 속성들은 유지.
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//         // type export시 경고발생으로 불편할 수 있으나 실사용에는 괜찮다. type.ts 한 파일에 export할 type을 모아서 경고창이 한 파일에만 나오게끔 하면 덜 불편할 거라고 지피티가 추천함.
//       ],
//     },
//   },
//   prettier,
// ]);

// vscode 상에 터미널 옆 output 탭에서 eslint관련 오류가 발생하는 것을 확인하여 전체 주석처리하고 대규모 수정 진행함.

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import parser from '@typescript-eslint/parser';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      // 타입스크립트 ESLint 플랫 config에서는 속성들을 객체로 등록하는 게 맞다. 때문에 extends로 작성된 기존 코드를 주석처리 하고 parser은 import하여 입력함.
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react, // ✅ plugin도 객체로 등록
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ✅ eslint-plugin-react의 recommended 설정 수동 등록
      ...react.configs.recommended.rules,
      ...reactHooks.configs['recommended'].rules,
      ...reactRefresh.configs.vite.rules,

      'react/prop-types': 'off', // TS 프로젝트에서 PropTypes는 불필요해서 off
      'react/react-in-jsx-scope': 'off', //React 17+ 프로젝트에서 import React 필요 없으므로 off

      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // 'no-unused-vars' 룰 설정은 기본 eslint 룰과 충돌 우려가 있다.(덮어씌워짐)
      // 권장사항은 기본 eslint 룰을 끄는 'no-unused-vars': 'off', 입력 이후에
      // '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], 라는 식으로 ts에 맞게끔 쓰는 것이 권장된다고 지피티가 말함.
      // 다만, 덮어씌워지는 특성을 가진 rules 객체의 특성상 굳이? 라는 생각이 들어 주석으로만 남기고 패스함.

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  prettier,
]);
