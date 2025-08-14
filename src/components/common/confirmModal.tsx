import { useModalStore } from '@store/modalStore';

const ConfirmModal = () => {
  const { isOpen, message, handleConfirm } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-[9999]">
      <div className="bg-secondary p-2xl rounded-md w-[15vW] min-w-[150px] max-w-p[300px]">
        <p className="mb-4 text-heading5">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={() => handleConfirm(true)}
            className="px-md py-xs bg-dark text-text-secondary rounded-md"
          >
            확인
          </button>
          <button
            onClick={() => handleConfirm(false)}
            className="px-md py-xs bg-dark text-text-secondary rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
