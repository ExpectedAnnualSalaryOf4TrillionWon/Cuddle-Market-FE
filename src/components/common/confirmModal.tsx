// import { useModalStore } from '@store/modalStore';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  submessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  submessage,
  onConfirm,
  onCancel,
}) => {
  // const { isOpen, message, handleConfirm } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-[9999]">
      <div className="bg-dark p-2xl rounded-md">
        <p className="text-heading5">{message}</p>
        <p className="mb-4 text-bodySmall text-text-primary">{submessage}</p>
        <div className="flex justify-evenly">
          <button onClick={onConfirm} className="px-md py-xs bg-point text-text-primary rounded-md">
            확인
          </button>
          <button onClick={onCancel} className="px-md py-xs bg-point text-text-primary rounded-md">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
