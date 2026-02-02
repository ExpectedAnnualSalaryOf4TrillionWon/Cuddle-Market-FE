# CUDDLE MARKET

## 프로젝트 소개

<div> 
<img  alt="Image" src="https://github.com/user-attachments/assets/6ea2172e-9a39-454d-8e13-461cc12dc075" /> </div>
<br/>

**"더 이상 반려동물 용품은 한 번 쓰고 버리는 물건이 아닙니다."**

아이처럼 빠르게 성장하는 우리 반려동물들. <br/>
금세 작아진 옷, 흥미를 잃은 장난감, 한두 번 쓴 캐리어... <br/>
집 한구석에 쌓여가는 용품들을 보며 아까운 마음이 드셨나요? <br/>

**CUDDLE MARKET**은 반려동물을 사랑하는 모든 가족들이 모여
따뜻한 마음을 나누는 동네 시장입니다.

반려동물이 사용했던 소중한 물건이 또 다른 새로운 기쁨이 되는 곳,
서로의 경험을 나누며 함께 성장하는 커뮤니티,

**CUDDLE MARKET에 오신 것을 환영합니다!**

<a href="https://cuddle-market-fe.vercel.app/">👉 cuddle market 바로가기</a>

## 주요 기능

### 상품 거래
- **무한 스크롤 상품 목록** - Intersection Observer API를 활용한 성능 최적화
- **다중 필터링** - 동물 종류, 카테고리, 가격대, 지역별 실시간 필터링
- **상품 CRUD** - 이미지 다중 업로드, 자동 압축, 드래그 앤 드롭 지원
- **찜하기** - Optimistic Update로 즉각적인 UI 반응

### 실시간 채팅
- **WebSocket 양방향 통신** - STOMP 프로토콜 기반 실시간 메시지
- **자동 재연결** - 네트워크 끊김 시 자동 복구
- **SSE 알림** - Server-Sent Events를 통한 실시간 알림

### 사용자
- **카카오 소셜 로그인** - OAuth 2.0 인증
- **자동 토큰 갱신** - 401 응답 시 토큰 자동 갱신 후 요청 재시도
- **프로필 관리** - 닉네임, 프로필 이미지, 지역 설정

---

## 기술 스택

### Core
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### State Management & Data Fetching
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=zustand&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

### Real-time Communication
![WebSocket](https://img.shields.io/badge/STOMP_WebSocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![SSE](https://img.shields.io/badge/Server_Sent_Events-FF6C37?style=for-the-badge)

### Styling & UI
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Form & Validation
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

### Development
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white)

---

## 프로젝트 구조

```
src/
├── api/                 # API 레이어 (도메인별 분리)
│   ├── api.ts           # Axios 인스턴스, 인터셉터
│   ├── auth.ts          # 인증 API
│   ├── products.ts      # 상품 API
│   └── chatting.ts      # 채팅 API
│
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── commons/         # Button, Input, Modal 등 19개 공통 컴포넌트
│   └── layout/          # Header, Footer, Navigation
│
├── hooks/               # 커스텀 훅 (7개)
│   ├── useIntersectionObserver.ts   # 무한 스크롤
│   ├── useScrollDirection.ts        # 스크롤 방향 감지
│   ├── useFavorite.ts               # 찜하기 (Optimistic Update)
│   └── useNotificationSSE.ts        # SSE 실시간 알림
│
├── store/               # Zustand 전역 상태 (5개 스토어)
│   ├── userStore.ts     # 사용자 인증 상태 (persist)
│   ├── chatSocketStore.ts # WebSocket 연결 상태
│   └── filterStore.ts   # 필터 상태
│
├── pages/               # 페이지 컴포넌트 (16개)
├── types/               # TypeScript 타입 정의
├── utils/               # 유틸리티 함수
└── constants/           # 상수 및 설정값
```

---

## 화면 미리보기

<table>
<thead>
<tr>
<th align="center">메인 화면</th>
<th align="center">소셜 로그인</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><img src="./public/assets/gif/메인화면.gif" alt="MainPage" width="400"></td>
<td align="center"><img src="./public/assets/gif/소셜 로그인.gif" alt="Login" width="400"></td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr>
<th align="center">필터링 & 무한스크롤</th>
<th align="center">상품 상세</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><img src="./public/assets/gif/필터링.gif" alt="Filtering" width="400"></td>
<td align="center"><img src="./public/assets/gif/상품 상세페이지.gif" alt="ProductDetail" width="400"></td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr>
<th align="center">상품 등록</th>
<th align="center">실시간 채팅</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><img src="./public/assets/gif/상품등록.gif" alt="ProductRegister" width="400"></td>
<td align="center"><img src="./public/assets/gif/채팅.gif" alt="Chatting" width="400"></td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr>
<th align="center">마이페이지</th>
<th align="center">찜하기</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><img src="./public/assets/gif/마이페이지.gif" alt="MyPage" width="400"></td>
<td align="center"><img src="./public/assets/gif/찜하기.gif" alt="Like" width="400"></td>
</tr>
</tbody>
</table>

---

## 개발 기간 및 기여도

### 개발 타임라인

| 기간 | 내용 |
|------|------|
| 2024.08 | 팀 프로젝트 초기 개발 (FE 4명, BE 3명) |
| 2024.10 - 2024.11 | 요구사항 재정의 (BE 2명과 협업, 약 3주) |
| 2024.11 - 2025.02 | **단독 리팩토링, QA 및 배포 (약 3개월)** |

### 기여 내용

팀 프로젝트로 시작했으나, 이후 **프론트엔드 전체를 단독으로 리팩토링하여 완성**했습니다.

- **아키텍처 재설계**: 컴포넌트 구조, 상태 관리 전략, API 레이어 설계
- **실시간 기능 구현**: WebSocket 채팅, SSE 알림 시스템
- **성능 최적화**: 무한 스크롤, 토큰 갱신 동기화, Optimistic Update
- **코드 품질 개선**: TypeScript 타입 커버리지 확대, 커스텀 훅 라이브러리화

---

## 문서

| 문서 | 링크 |
|------|------|
| 플로우 차트 | [Wiki](https://github.com/ExpectedAnnualSalaryOf4TrillionWon/Cuddle-Market-FE/wiki/Flow-Chart) |
| 와이어프레임 | [Wiki](https://github.com/ExpectedAnnualSalaryOf4TrillionWon/Cuddle-Market-FE/wiki/Wire-Frame) |
| 화면정의서 | [Wiki](https://github.com/ExpectedAnnualSalaryOf4TrillionWon/Cuddle-Market-FE/wiki/Prototype) |
| API 명세서 | [GitHub](https://github.com/jinioh88/cmarket_api/tree/main/documents/API%EB%AC%B8%EC%84%9C) |
| 요구사항 정의서 | [Notion](https://diagnostic-hollyhock-e9a.notion.site/2d926170466f80c1910eda9d007690bf?source=copy_link) |
| 트러블슈팅 | (작성 예정) |

<details>
<summary>API 엔드포인트 목록</summary>

| 기능 | 메서드 | 엔드포인트 | 인증 |
|------|--------|-----------|:----:|
| 소셜 로그인 | `POST` | `/api/v1/auth/social/kakao` | - |
| 로그아웃 | `POST` | `/api/v1/auth/logout` | ✅ |
| 마이페이지 조회 | `GET` | `/api/v1/users/mypage` | ✅ |
| 프로필 수정 | `PATCH` | `/api/v1/users/mypage/profile` | ✅ |
| 회원 탈퇴 | `DELETE` | `/api/v1/users/withdraw` | ✅ |
| 상품 목록 | `GET` | `/api/v1/products` | - |
| 상품 상세 | `GET` | `/api/v1/products/{id}` | - |
| 상품 등록 | `POST` | `/api/v1/products` | ✅ |
| 상품 수정 | `PATCH` | `/api/v1/products/{id}` | ✅ |
| 상품 삭제 | `DELETE` | `/api/v1/products/{id}` | ✅ |
| 거래 상태 변경 | `PATCH` | `/api/v1/products/{id}/status` | ✅ |
| 상품 검색 | `GET` | `/api/v1/products/search` | - |
| 찜 추가 | `POST` | `/api/v1/likes` | ✅ |
| 찜 삭제 | `DELETE` | `/api/v1/likes` | ✅ |
| 찜 목록 | `GET` | `/api/v1/likes` | ✅ |
| 채팅방 목록 | `GET` | `/api/v1/chatrooms` | ✅ |
| 채팅방 생성 | `POST` | `/api/v1/chatrooms` | ✅ |
| 채팅방 삭제 | `DELETE` | `/api/v1/chatrooms/{id}` | ✅ |
| 채팅 메시지 조회 | `GET` | `/api/v1/chatrooms/{id}/messages` | ✅ |
| 채팅 전송 | `POST` | `/api/v1/chatrooms/{id}/messages` | ✅ |
| 알림 조회 | `GET` | `/api/v1/notifications` | ✅ |
| 카테고리 조회 | `GET` | `/api/v1/categories` | - |

</details>

---

## 관련 링크

| | |
|---|---|
| 배포 URL | https://cuddle-market-fe.vercel.app |
