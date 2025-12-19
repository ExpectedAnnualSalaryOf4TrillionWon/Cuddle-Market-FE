import { Button } from '@src/components/commons/button/Button'
import { ROUTES } from '@src/constants/routes'
import type { ChatRoom, fetchChatRoom } from '@src/types'
import { Link } from 'react-router-dom'
import { SellerAvatar } from '@src/components/commons/avatar/SellerAvatar'
import { ChatProductCard } from '@src/components/commons/card/ChatProductCard'
import { outChatRoom } from '@src/api/chatting'
import { chatSocketStore } from '@src/store/chatSocketStore'
interface ChatRoomInfoProps {
  data: fetchChatRoom
}

export function ChatRoomInfo({ data }: ChatRoomInfoProps) {
  const { unsubscribeFromRoom } = chatSocketStore()
  const handleOutChatRoom = async () => {
    try {
      await outChatRoom(data.chatRoomId)
      unsubscribeFromRoom(data.chatRoomId)
      // 성공 시 채팅 목록 페이지로 이동 또는 UI 업데이트
    } catch (error) {
      console.error('채팅방 나가기 실패:', error)
      // 사용자에게 에러 알림 (toast 등)
    }
  }
  return (
    <div className="flex flex-col gap-2.5 p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SellerAvatar profileImageUrl={data?.opponentProfileImageUrl} nickname={data?.opponentNickname} />
          <p>{data?.opponentNickname}</p>
        </div>
        <Button size={'md'} className="cursor-pointer bg-gray-50 hover:bg-gray-100" onClick={handleOutChatRoom}>
          채팅방 나가기
        </Button>
      </div>
      <Link
        to={ROUTES.DETAIL_ID(Number(data?.productId))}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-2.5 py-3 hover:bg-gray-50"
      >
        <ChatProductCard productImageUrl={data?.productImageUrl} productTitle={data?.productTitle} productPrice={data?.productPrice} size="md" />
      </Link>
    </div>
  )
}
