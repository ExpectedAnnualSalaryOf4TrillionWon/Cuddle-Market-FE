import { create } from 'zustand'

// ===== 로그인 모달 상태 타입 =====
interface LoginModalState {
  // 모달 열림/닫힘 상태
  isLoginModalOpen: boolean

  // 모달 열기
  // 사용: openLoginModal()
  // 결과: isLoginModalOpen이 true로 변경되어 모달이 화면에 표시됨
  openLoginModal: () => void

  // 모달 닫기
  // 사용: closeLoginModal()
  // 결과: isLoginModalOpen이 false로 변경되어 모달이 화면에서 사라짐
  closeLoginModal: () => void
}

// ===== 로그인 모달 스토어 =====
// 미로그인 상태에서 로그인이 필요한 기능 사용 시 LoginModal을 띄우기 위한 전역 상태
// 어떤 페이지에서든 openLoginModal()을 호출하면 모달이 열림
export const useLoginModalStore = create<LoginModalState>((set) => ({
  // 초기 상태: 모달 닫힘
  isLoginModalOpen: false,

  // 모달 열기 액션
  openLoginModal: () => set({ isLoginModalOpen: true }),

  // 모달 닫기 액션
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}))
