import { useState } from 'react';
import ChatModal from './ChatModal';

const ChatWidget: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatModal = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <>
      <div className="fixed bottom-5 right-2 z-50">
        <div className="relative flex items-end justify-end">
          <button
            onClick={toggleChatModal}
            className="bg-[#7BA5D6] text-white rounded-full px-2 py-2 shadow-md relative"
          >
            💬 채팅
          </button>

          {/* 꼬리 */}
          <div className="absolute -bottom-2 right-3 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#7BA5D6]"></div>
        </div>
      </div>

      {isChatOpen && <ChatModal onClose={toggleChatModal} />}
    </>
  );
};

export default ChatWidget;
