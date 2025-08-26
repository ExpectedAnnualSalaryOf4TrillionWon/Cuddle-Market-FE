/**
 * [A 컴포넌트] --setUser()--> [Zustand Store] <--자동동기화--> [localStorage]
                                  ↓
                            (자동 알림!)
                            ↓        ↓
                      [B 컴포넌트] [C 컴포넌트]                      
✅ 장점: 모든 컴포넌트 자동 업데이트!
 */

// 1️⃣ 필요한 기능들을 가져옵니다
// create: 스토어를 만드는 함수 (상태 저장소 생성기)
import { create } from 'zustand';

// persist: 새로고침해도 데이터 유지하는 기능
// createJSONStorage: localStorage와 연결하는 도구
import { createJSONStorage, persist } from 'zustand/middleware';

// User: 타입스크립트 타입 (자동완성, 오류 방지)
import type { User } from '../types/index';

// 다른 스토어와 연동하기 위해 가져옴
import { useAuthStore } from './authStore';

interface UserState {
  // ===== 상태(State) =====
  /** 이것들이 "전역 변수"가 됩니다*/
  /** 상태: 실제 저장되는 데이터 */

  // 현재 로그인한 사용자 정보
  // null = 로그인 안 함, User 객체 = 로그인 함
  user: User | null;

  // API 요청시 필요한 인증 토큰
  // "나는 홍길동입니다"를 증명하는 신분증 같은 것
  accessToken: string | null;

  // 로그인 후 돌아갈 URL 임시 저장
  // 예: 상품 페이지 → 로그인 → 다시 상품 페이지로
  redirectUrl: string | null;

  // ===== 액션(Actions) =====
  /** 상태를 변경하는 함수들 (setter 역할)*/

  // user 상태를 변경하는 함수
  setUser: (user: User | null) => void;

  // 토큰만 변경할 때
  setAccessToken: (token: string | null) => void;

  // URL만 변경할 때
  setRedirectUrl: (url: string | null) => void;

  // 프로필 수정
  updateUserProfile: (updates: Partial<User>) => void;

  // 로그인 처리 (여러 상태를 한번에 변경)
  handleLogin: (user: User, accessToken: string) => void;

  // 로그아웃
  clearAll: () => void;

  // 임시 토큰 제거
  clearRegistrationToken: () => void;

  // ===== 유틸리티 =====
  isLogin: () => boolean;
  // 프로필 완성 체크
  isProfileCompleted: () => boolean;
  // 닉네임 가져오기
  getUserNickname: () => string;
  //  ID 가져오기
  getUserId: () => number | null;
}

/** Store 생성 부분 */
export const useUserStore = create<UserState>()(
  // create: "전역 상태 저장소를 만들어줘!"
  // <UserState>: "이런 모양으로 만들어줘!" (타입스크립트)

  // persist: "새로고침해도 데이터 유지해줘!"
  persist(
    // set: 상태를 변경하는 마법의 함수
    // get: 현재 상태를 읽는 함수
    // => ({}): 실제 스토어 내용을 정의
    (set, get) => ({
      // ===== 초기 상태 =====
      /** 앱이 처음 시작될 때의 기본값들*/

      // 처음엔 로그인 안 한 상태
      user: null,

      // 토큰도 없음
      accessToken: null,

      // 돌아갈 URL도 없음
      redirectUrl: null,

      // ===== 액션 구현 =====

      // user만 변경
      setUser: user => set({ user }),
      // 풀어쓰면:
      // setUser: (user) => {
      //   set({ user: user })
      // }
      // set 함수가 실행되면:
      // 동작: 1. { user: userData }로 상태 변경
      //      2. user를 구독중인 모든 컴포넌트 리렌더링
      //      3. localStorage 자동 저장

      // 토큰만 변경
      setAccessToken: token => set({ accessToken: token }),
      // 실행: setAccessToken("abc123")
      // 동작: accessToken만 변경, token 구독 컴포넌트만 리렌더링

      // redirectUrl만 변경
      setRedirectUrl: url => set({ redirectUrl: url }),
      // localStorage에는 저장 안함 (partialize에서 제외)

      // 프로필 수정
      updateUserProfile: updates =>
        set(state => ({
          // 현재 상태를 받아옴
          //    있으면?        기존 유저 복사, 새 값 덮어쓰기
          //                                              없으면 null
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      // Partial<User>: User의 일부 속성만 전달 가능
      // 사용: updateUserProfile({ nickname: "새이름" })
      // 결과: user.nickname만 변경, 나머지는 유지

      // 사용: updateUserProfile({ nickname: "새이름" })
      // 결과: user.nickname만 변경, 나머지는 유지
      // 예시:
      // 현재: user = { name: "홍길동", age: 20 }
      // updateUserProfile({ age: 21 })
      // 결과: user = { name: "홍길동", age: 21 }

      // 여러 상태를 한번에 변경!
      handleLogin: (user, accessToken) => {
        // set({ user: user, accessToken: accessToken }) 의 축약형
        // userStore의 두 상태를 한번에 변경
        // 한번에 여러 상태 변경 (1회 리렌더링)
        set({ user, accessToken });

        // 다른 스토어의 함수도 실행!
        // getState(): 컴포넌트 밖에서 스토어 접근하는 방법
        // authStore의 isLoggedIn을 true로
        useAuthStore.getState().login();
      },
      // 실행 흐름:
      // 1. userStore의 user, accessToken 동시 변경
      // 2. authStore의 isLoggedIn 변경
      // 3. localStorage 자동 저장
      // 4. 관련 컴포넌트들 리렌더링

      // 모든 상태를 초기값으로 되돌림 (로그아웃)
      clearAll: () => {
        set({
          user: null,
          accessToken: null,
          redirectUrl: null,
        });
        useAuthStore.getState().logout();
        localStorage.removeItem('user-storage');
        // persist 데이터까지 초기화
      },
      clearRegistrationToken: () => {
        set({ redirectUrl: null });
        // redirectUrl만 초기화
        // 이름이 맞지 않음 (registrationToken이 없어서)
      },

      isLogin: () => {
        const { user, accessToken } = get();
        return Boolean(user && accessToken);
      },

      isProfileCompleted: () => {
        const user = get().user;
        // get(): 현재 상태를 읽어옴
        return user?.profile_completed ?? false;
        // user가 있으면 profile_completed 값, 없으면 false
        // ?. : 옵셔널 체이닝 (user가 null이어도 에러 안남)
        // ?? : null 병합 연산자 (앞이 null/undefined면 뒤 값 사용)
      },

      getUserNickname: () => {
        return get().user?.nickname || '';
        //nickname이 없으면 빈 문자열
      },

      getUserId: () => {
        return get().user?.id || null;
        //number | null 반환
      },
    }),

    // 스토어 정의 끝

    // Persist 설정 - localStorage 연동
    {
      /**
       *    name: 'user-storage',
       *    storage: createJSONStorage(() => localStorage),
       *├> "Zustand야, localStorage 써줘. 근데 네가 알아서 해!" */

      // localStorage의 key 이름
      // 실제로 localStorage['user-storage']에 저장됨
      // 개발자도구 > Application > localStorage에서 확인 가능
      name: 'user-storage',

      // 어디에 저장할지 지정 (localStorage 사용)
      storage: createJSONStorage(() => localStorage),

      // 전체 상태 중 일부만 저장하고 싶을 때
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        // redirectUrl은 저장 안 함 (임시값이라서)
      }),
      // 새로고침 후 user와 token은 복원, redirectUrl은 null
    },
  ),
);
