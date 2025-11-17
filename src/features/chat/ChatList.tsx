import { mockChatList } from './MockChatData';
import type { ChatItem } from 'src/types/ChatType';
import { useEffect } from 'react';
import { useChatSocketStore } from '@store/ChatSocketStore';

export function ChatList({ onClose }: { onClose: () => void }) {
  const { joinRoom } = useChatSocketStore();

  // 예: 첫 채팅방 입장
  useEffect(() => {
    if (mockChatList.length > 0) {
      joinRoom(mockChatList[0].roomId);
    }
  }, [joinRoom]);

  return (
    <div className="max-w-[375px] border-r border-border bg-bg flex flex-col gap-xs">
      {/* 리스트 헤더 */}
      <div className="flex items-center border-b border-primary gap-md p-2">
        <button onClick={onClose} className="text-primary hover:text-dark">
          ✖
        </button>
        <h2 className="justify-center heading5 font-bold">채팅 목록</h2>
      </div>

      {/* 채팅방 변경 버튼 (예시) */}
      {/* <div className="flex gap-2 p-2 border-b">
        <button onClick={() => joinRoom('room1')}>채팅방 1</button>
        <button onClick={() => joinRoom('room2')}>채팅방 2</button>
      </div> */}

      {/* 채팅 목록 */}
      <div className="flex flex-col gap-xs">
        {mockChatList.map((chat: ChatItem) => (
          <div
            key={chat.roomId}
            className="flex flex-col p-xs rounded-md cursor-pointer bg-secondary/30 border border-dark hover:bg-gray-50"
          >
            <button onClick={() => joinRoom(chat.roomId)}>
              {/* 상대방 프로필 */}
              <div className="flex p-xs items-center gap-md ">
                <img
                  src={chat.userAvatar}
                  alt={`${chat.userName} 프로필`}
                  className="w-15 h-15  rounded-full"
                />
                <p className="text-md font-bold">{chat.userName}</p>
                <div className="flex flex-col w-auto flex-1 items-start">
                  <p className="text-sm truncate">{chat.product.title}</p>
                  <p className="text-sm text-text-secondary">{chat.product.price}</p>
                </div>
                <img
                  src={chat.product.image}
                  alt={chat.product.title}
                  className="w-15 h-15 object-cover"
                />
              </div>
              <div className="flex flex-1 p-xs justify-evenly">
                <p className="text-sm font-bold">최근 메세지:</p>
                <p className="text-sm text-center flex-1">{chat.lastMessage}</p>
                <p className="text-xs">{chat.time}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
