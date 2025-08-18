import { useModalStore } from '@store/modalStore';

const ConfirmModal = () => {
  const { isOpen, message, handleConfirm } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-[9999]">
      <div className="bg-dark p-2xl rounded-md">
        <p className="mb-4 text-heading5">{message}</p>
        <div className="flex justify-evenly">
          <button
            onClick={() => handleConfirm(true)}
            className="px-md py-xs bg-point text-text-primary rounded-md"
          >
            확인
          </button>
          <button
            onClick={() => handleConfirm(false)}
            className="px-md py-xs bg-point text-text-primary rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
