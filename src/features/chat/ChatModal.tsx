// import type { ChangeEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { RiMore2Line } from 'react-icons/ri';
import { ChatLog } from './ChatLog';
import { ChatList } from './ChatList';
import { mockChatList } from './MockChatData';
import { ChatOpponentInfo } from './ChatOpponentInfo';
import { useChatSocketStore } from '@store/ChatSocketStore';

const ChatModal = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { connect, disconnect, sendMessage, currentRoomId } = useChatSocketStore();
  // const [message, setMessage] = useState<string>('');
  const selectedChat = mockChatList.find(chat => chat.roomId === currentRoomId) ?? {
    roomId: 'default',
    userName: '',
    userAvatar: '',
    product: { title: '', price: '', image: '' },
    lastMessage: '',
    time: '',
    messages: [],
  };
  // const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
  //   setMessage(e.target.value);
  // };
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/chat';
  useEffect(() => {
    connect(WS_URL);
    return () => disconnect(); // 모달 닫힐 때 연결 종료
  }, [connect, disconnect]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const handleSend = () => {
    if (input.trim() && currentRoomId) {
      sendMessage(currentRoomId, input);
      setInput('');
    }
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
        <div className="flex-1 flex flex-col w-[375px]">
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
                src={selectedChat.product.image || 'https://via.placeholder.com/64'}
                alt={selectedChat.product.title || '상품 이미지'}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm">{selectedChat.product.title || '상품 제목 없음'}</h4>
                <p className="text-sm font-bold">{selectedChat.product.price || ''}</p>
              </div>
              <button
                className="text-sm border border-border h-8 rounded-md px-3"
                onClick={() => {
                  alert(`${selectedChat.product.title} 상세페이지 이동 구현 예정`);
                }}
              >
                상품보기
              </button>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
            {selectedChat?.messages.map((msg, idx) => (
              <ChatLog key={idx} message={msg.message} time={msg.time} position={msg.position} />
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* 입력창 */}
          <div className="bg-bg border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <input
                className="flex-1 h-9 rounded-md border px-3 py-1 border-gray-300 text-sm"
                placeholder="메시지를 입력하세요..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button
                className="flex items-center justify-center rounded-md bg-primary h-9 px-3"
                onClick={handleSend}
              >
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
