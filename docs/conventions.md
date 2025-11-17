# 컨벤션(Convention)

## 1. 브랜치 컨벤션

- 브랜치 네이밍은 전부 소문자
  `ex) feature/24--modal-ui`

| 종류     | 설명                                       | 예시                          |
| -------- | ------------------------------------------ | ----------------------------- |
| main     | 메인 브랜치                                | main                          |
| develop  | 배포 전 개발 브랜치                        | develop                       |
| feature  | 새로운 기능 개발                           | feature/32--login-ui          |
| hotfix   | 긴급 수정                                  | hotfix/101--critical-bug      |
| release  | 배포용 브랜치                              | release/v1.2.0                |
| fix      | 버그 수정 (이미 개발된 컴포넌트 기능 개선) | fix/45--button-click-bug      |
| refactor | 코드 구조/네이밍 변경 (기능 유지)          | refactor/51--file-cleanup     |
| chore    | 빌드, 환경, 설정, 정리 작업                | chore/12--update-dependencies |
| test     | 테스트 코드 작성/수정                      | test/22--login-unit-test      |
| docs     | 문서 작업만                                | docs/3--readme-update         |

---

## 2. 커밋 컨벤션

- 타입: 커밋 내용(#이슈번호)
  `ex) feat: 로그인 ui 작업(#32)`

| Type     | 설명                                            |
| -------- | ----------------------------------------------- |
| feat     | 새로운 기능 추가                                |
| fix      | 버그 수정                                       |
| refactor | 리팩토링 (동작 변경 없음, 구조 개선)            |
| design   | CSS 및 UI 디자인 변경                           |
| style    | 코드 포맷팅, 세미콜론 누락 등 기능 변경 없음    |
| test     | 테스트 코드 추가/수정/삭제                      |
| chore    | 기타 변경사항 (빌드 스크립트, 패키지 매니저 등) |
| init     | 프로젝트 초기 생성                              |
| rename   | 파일/폴더명 수정 또는 이동                      |
| remove   | 파일 삭제                                       |
| docs     | 문서 작성/수정                                  |

---

## 3. PR 컨벤션

- 타입: 이슈 내용
  `ex) feat: 로그인 ui 작업`

---

## 4. 코드 네이밍 컨벤션

| 타입            | 예시                                      |
| --------------- | ----------------------------------------- |
| 상수(Constant)  | SCREAMING_SNAKE_CASE (MAX_VALUE, API_URL) |
| Boolean 변수    | is접두사 사용 (isActive)                  |
| 일반 변수       | camelCase 사용 (userName, itemList)       |
| 배열            | 복수형 사용 (users, items)                |
| 객체            | 단수형 사용 (user, item)                  |
| 이벤트 핸들러   | handle 접두사 (handleSubmit)              |
| 비동기 함수     | fetch 접두사 (fetchData)                  |
| TypeScript 타입 | Interface/Type (interface User {})        |

- 폴더 네이밍: 전부 소문자

---

## 5. 파일 네이밍 컨벤션

| 파일 타입 | 네이밍                                               |
| --------- | ---------------------------------------------------- |
| conponent | PascalCase (UserCard.tsx, LoginForm.tsx)             |
| image     | kebab-case (logo-icon.png, user-avatar.jpg)          |
| util      | camelCase (fetchUser.ts, calculateSum.ts)            |
| style     | dot notation (tokens.colors.css, tokens.spacing.css) |
| type      | camelCase (user.ts, productType.ts)                  |
| constant  | kebab-case (ui-constants.ts, api-constants.ts)       |
