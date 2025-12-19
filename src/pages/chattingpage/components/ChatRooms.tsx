import type { fetchChatRoom } from '@src/types'
import { SellerAvatar } from '@src/components/commons/avatar/SellerAvatar'
import { ChatProductCard } from '@src/components/commons/card/ChatProductCard'

import { getTimeAgo } from '@src/utils/getTimeAgo'
import { cn } from '@src/utils/cn'
interface ChatRoomsProps {
  rooms: fetchChatRoom[]
  handleSelectRoom: (room: fetchChatRoom) => void
  selectedRoomId: number | null
}

export function ChatRooms({ rooms, handleSelectRoom, selectedRoomId }: ChatRoomsProps) {
  return (
    <section className="flex flex-col rounded-none border-t border-b border-l border-gray-300 md:max-w-96 md:min-w-96">
      <h2 className="border-b border-gray-300 p-5">채팅목록</h2>
      <div className="px-3 py-3">
        <ul className="flex flex-col gap-2">
          {rooms &&
            rooms.map((room) => (
              <li
                key={room.chatRoomId}
                className={cn(
                  'flex cursor-pointer items-start gap-2 rounded-lg p-3',
                  room.chatRoomId === selectedRoomId ? 'border border-gray-300 bg-[#E5E7EB]/50' : 'border border-transparent'
                )}
                onClick={() => handleSelectRoom(room)}
              >
                <SellerAvatar profileImageUrl={room?.opponentProfileImageUrl} nickname={room?.opponentNickname} />
                <div className="flex w-full flex-col gap-2">
                  <div className="flex w-full items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="leading-none">{room?.opponentNickname}</p>
                      <p className="text-sm">{room.lastMessage}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {room.lastMessageTime && (
                        <span className="text-sm leading-none font-medium text-gray-500">{getTimeAgo(room.lastMessageTime)}</span>
                      )}
                      {room.unreadCount >= 1 && (
                        <p className="bg-danger-500 flex size-5 items-center justify-center rounded-full text-white">{room.unreadCount}</p>
                      )}
                    </div>
                  </div>
                  <div className="border-primary-100 bg-primary-50 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-3">
                    <ChatProductCard
                      productImageUrl={room?.productImageUrl}
                      productTitle={room?.productTitle}
                      productPrice={room?.productPrice}
                      size="sm"
                      titleWidth="w-52"
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
