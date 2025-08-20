import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { RiMore2Line } from 'react-icons/ri';
import { ChatLog } from './ChatLog';
import { ChatList } from './ChatList';
import { mockChatList } from './MockChatList';
import { ChatOpponentInfo } from './ChatOpponentInfo';

type ChatModalProps = {
  onClose: () => void;
};

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const [message, setMessage] = useState<string>('');
  const selectedChat = mockChatList[0];

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div
      className="
    fixed bottom-5 right-3
    w-[auto] max-w-[768px]
    h-[80vh] max-h-[667px]
    bg-white shadow-xl rounded-lg border z-50
    flex opacity-85 justify-end
  "
    >
      <div className="flex h-full">
        {/* 좌측 채팅 목록 */}
        <ChatList onClose={onClose} />

        {/* 우측 대화창 */}
        <div className="flex-1 flex flex-col max-w-[375px]">
          {/* 상대 프로필 */}
          <div className="border-b border-border w-full p-xs flex justify-between">
            <ChatOpponentInfo
              profileimageurl={selectedChat.userAvatar}
              imagealt={selectedChat.userName}
              username={selectedChat.userName}
            />
            <button
              className="p-1 rounded hover:text-text-primary"
              onClick={() => {
                alert('드롭다운메뉴로 신고하기/차단하기 버튼 구현예정');
              }}
            >
              <RiMore2Line />
            </button>
          </div>

          {/* 상품 카드 */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop"
                alt="강아지 사료 10kg 새상품"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm">강아지 사료 10kg 새상품</h4>
                <p className="text-sm font-bold">45,000원</p>
              </div>
              <button
                className="text-sm border border-border h-8 rounded-md px-3"
                onClick={() => {
                  alert('해당 상품 상세페이지 이동 버튼 구현예정');
                }}
              >
                상품보기
              </button>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
            <ChatLog
              message="안녕하세요! 강아지 사료 구매하고 싶은데요"
              time="오후 1:30"
              position="left"
            />
            <ChatLog
              message="안녕하세요! 관심 가져주셔서 감사합니다"
              time="오후 1:32"
              position="right"
            />
            <ChatLog
              message="유통기한이나 상태 궁금한 점 있으시면 언제든 물어보세요"
              time="오후 1:33"
              position="right"
            />
            <ChatLog
              message="직거래 가능한가요? 서울 강남쪽에서요"
              time="오후 2:15"
              position="left"
            />
            <ChatLog
              message="네 가능합니다! 강남역 근처 어떠세요?"
              time="오후 2:18"
              position="right"
            />
            <ChatLog
              message="좋아요! 그럼 내일 오후 3시에 강남역 2번 출구에서 만날까요?"
              time="오후 2:28"
              position="left"
            />
            <ChatLog message="네, 내일 오후 3시에 만나요!" time="오후 2:30" position="right" />
          </div>

          {/* 입력창 */}
          <div className="bg-bg border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <input
                className="flex-1 h-9 rounded-md border px-3 py-1 border-gray-300 text-sm"
                placeholder="메시지를 입력하세요..."
                value={message}
                onChange={handleChangeMessage}
              />
              <button className="flex items-center justify-center rounded-md bg-primary h-9 px-3">
                <FaRegPaperPlane color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
