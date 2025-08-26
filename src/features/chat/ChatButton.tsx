import { useUserStore } from '@store/userStore';
import { useEffect, useRef, useState } from 'react';
import ChatModal from './ChatModal';

const ChatWidget: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const isLogged = useUserStore(state => state.isLogin);

  // isLoggedIn은 함수이므로 호출해서 사용
  const isLoggedIn = isLogged();
  console.log(isLoggedIn);

  // 버튼 클릭 시 항상 열기만 함
  const openChatModal = () => {
    if (!isLoggedIn) {
      alert('로그인 후 채팅을 사용할 수 있습니다.');
      //비로그인 시 채팅버튼이 나타나지 않아. 삭제해도 되기는함.
      return;
    }
    setIsChatOpen(true);
  };

  // ✅ 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  return (
    <>
      {isLoggedIn && ( // ✅ 로그인 상태일 때만 버튼 표시
        <div className="fixed bottom-5 right-2 z-50">
          <div className="relative flex items-end justify-end">
            <button
              onClick={openChatModal}
              className="bg-[#7BA5D6] text-white rounded-full px-2 py-2 shadow-md relative"
            >
              💬 채팅
            </button>

            {/* 꼬리 */}
            <div className="absolute -bottom-2 right-3 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#7BA5D6]"></div>
          </div>
        </div>
      )}

      {isChatOpen && (
        <div ref={chatRef}>
          <ChatModal onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </>
  );
};

export default ChatWidget;
