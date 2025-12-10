import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { User } from '../types/index'

interface UserState {
  // ===== 상태 =====
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  redirectUrl: string | null

  // ===== 액션 =====
  setUser: (user: User | null) => void
  setAccessToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  setRedirectUrl: (url: string | null) => void
  updateUserProfile: (updates: Partial<User>) => void
  handleLogin: (user: User, accessToken: string, refreshToken: string) => void
  clearAll: () => void

  // ===== 계산된 값 (getter) =====
  isLogin: () => boolean
  getUserId: () => number | null
}

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

      // 리프레시 토큰 (토큰 갱신용)
      refreshToken: null,

      // ===== 액션 구현 =====

      // user만 변경
      setUser: (user) => set({ user }),
      // 풀어쓰면:
      // setUser: (user) => {
      //   set({ user: user })
      // }
      // set 함수가 실행되면:
      // 동작: 1. { user: userData }로 상태 변경
      //      2. user를 구독중인 모든 컴포넌트 리렌더링
      //      3. localStorage 자동 저장

      // 토큰만 변경
      setAccessToken: (token) => set({ accessToken: token }),
      // 실행: setAccessToken("abc123")
      // 동작: accessToken만 변경, token 구독 컴포넌트만 리렌더링

      // 리프레시 토큰만 변경
      setRefreshToken: (token) => set({ refreshToken: token }),
      // 토큰 갱신 시 사용

      // redirectUrl만 변경
      setRedirectUrl: (url) => set({ redirectUrl: url }),
      // localStorage에는 저장 안함 (partialize에서 제외)

      // 프로필 수정
      updateUserProfile: (updates) =>
        set((state) => ({
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

      // 로그인 처리 - 여러 상태를 한번에 변경!
      handleLogin: (user, accessToken, refreshToken) => {
        // set({ user: user, accessToken: accessToken, refreshToken: refreshToken }) 의 축약형
        // 한번에 여러 상태 변경 (1회 리렌더링)
        set({ user, accessToken, refreshToken })
      },
      // 실행 흐름:
      // 1. user, accessToken, refreshToken 동시 변경
      // 2. localStorage 자동 저장
      // 3. 관련 컴포넌트들 리렌더링

      // 모든 상태를 초기값으로 되돌림 (로그아웃)
      clearAll: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          redirectUrl: null,
        })
      },

      // ===== 계산된 값 (getter) =====

      // 로그인 여부 확인
      isLogin: () => {
        const { user, accessToken } = get()
        return Boolean(user && accessToken)
        // user와 accessToken이 모두 있으면 true
      },

      // 유저 ID 조회
      getUserId: () => {
        return get().user?.id || null
        // number | null 반환
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
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        // redirectUrl은 저장 안 함 (임시값이라서)
      }),
      // 새로고침 후 user와 token은 복원, redirectUrl은 null
    }
  )
)
