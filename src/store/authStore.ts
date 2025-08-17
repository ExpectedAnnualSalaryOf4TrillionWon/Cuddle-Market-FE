import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

// 로그인 여부에 따른 페이지 변화 상태를 반영하고 싶으면 해당 페이지에서
// const { isLoggedIn, login, logout } = useAuthStore();
// 호출하여 사용하면 됩니다.
