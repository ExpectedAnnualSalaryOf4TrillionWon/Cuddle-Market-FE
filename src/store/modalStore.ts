import { create } from 'zustand';

// 모달이 전달할 상태별 타입지정
type ModalState = {
  isOpen: boolean;
  message: string;
  confirm: (message: string) => Promise<boolean>;
  resolve: ((value: boolean) => void) | null;
  handleConfirm: (result: boolean) => void;
};
// 모달창 활성화 여부 : 불리언
// 모달창에 띄울 메세지 : 문자열
// 사용자가 입력할 반환 타입 : 불리언
// 모달창 닫힐 때 전달될 결과 타입 : 불리언
// 결과를 저장할 타입 : 불리언

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

export const modalConfirm = useModalStore(state => state.confirm);
