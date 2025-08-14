import { create } from 'zustand';

// 모달이 전달할 상태별 타입지정
type ModalState = {
  isOpen: boolean;
  message: string;
  resolve: ((value: boolean) => void) | null;
  confirm: (message: string) => Promise<boolean>;
  handleConfirm: (result: boolean) => void;
};
// 모달창 활성화 여부 : 불리언
// 모달창에 띄울 메세지 : 문자열
// 결과값 반환타입 : 불리언
//

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  message: '',
  resolve: null,

  confirm: (message: string) => {
    return new Promise<boolean>(resolve => {
      set({ isOpen: true, message, resolve });
    });
  },

  handleConfirm: (result: boolean) => {
    const { resolve } = get();
    if (resolve) {
      resolve(result);
      set({ isOpen: false, message: '', resolve: null });
    }
  },
}));
