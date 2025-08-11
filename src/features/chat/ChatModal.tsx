type ChatModalProps = {
  onClose: () => void;
};

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white shadow-xl rounded-lg border p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✖
        </button>
      </div>
      <div className="text-sm text-gray-600">여기에 채팅 내용을 추가하세요.</div>
    </div>
  );
};

export default ChatModal;
