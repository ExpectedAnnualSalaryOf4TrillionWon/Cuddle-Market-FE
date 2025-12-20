import { fetchRoomMessages, fetchRooms } from '@src/api/chatting'
import { useUserStore } from '@src/store/userStore'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import type { fetchChatRoom } from '@src/types'
import { Send, Paperclip } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
import { ChatRooms } from '@src/pages/chatting-page/components/ChatRooms'
import { ChatRoomInfo } from '@src/pages/chatting-page/components/ChatRoomInfo'
import { useEffect, useState } from 'react'
import { chatSocketStore } from '@src/store/chatSocketStore'
import { ChatLog } from '@src/pages/chatting-page/components/ChatLog'
import ChatInput from './components/ChatInput'

export default function ChattingPage() {
  const [selectedRoom, setSelectedRoom] = useState<fetchChatRoom | null>(null)
  const navigate = useNavigate()
  const { user, accessToken } = useUserStore()
  const { id: chatRoomId } = useParams()
  const { connect, disconnect, subscribeToRoom, isConnected, sendMessage, messages: realtimeMessages, clearUnreadCount } = chatSocketStore()

  const {
    data: roomMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['messages', chatRoomId],
    queryFn: ({ pageParam }) => fetchRoomMessages(Number(chatRoomId), pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
    initialPageParam: 0,
    enabled: !!user && !!chatRoomId,
  })

  const httpMessages = roomMessages?.pages.flatMap((page) => page.data.messages) ?? []
  const allMessages = [...httpMessages, ...(realtimeMessages[Number(chatRoomId)] ?? [])]

  const { data: rooms } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => fetchRooms(),
    enabled: !!user,
  })

  const handleSelectRoom = (room: fetchChatRoom) => {
    subscribeToRoom(room.chatRoomId)
    clearUnreadCount(room.chatRoomId)
    setSelectedRoom(room)
    navigate(`/chat/${room.chatRoomId}`, { replace: true })
  }

  const handleSend = (message: string) => {
    if (selectedRoom) {
      sendMessage(selectedRoom.chatRoomId, message, 'TEXT')
    }
  }
  const handleLeaveRoom = (leftRoomId: number) => {
    // 나간 방을 제외한 나머지 채팅방들
    const remainingRooms = rooms?.filter((room) => room.chatRoomId !== leftRoomId) ?? []

    if (remainingRooms.length > 0) {
      // 가장 최근 메시지가 있는 채팅방 선택 (lastMessageTime 기준 정렬)
      const nextRoom = remainingRooms.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())[0]

      subscribeToRoom(nextRoom.chatRoomId)
      setSelectedRoom(nextRoom)
      navigate(`/chat/${nextRoom.chatRoomId}`, { replace: true })
    } else {
      // 채팅방이 없으면 초기화
      setSelectedRoom(null)
    }
  }

  const WS_URL = 'http://192.168.45.25:8080/ws-stomp'

  useEffect(() => {
    if (accessToken) {
      connect(WS_URL, accessToken)
    }
  }, [connect, disconnect, accessToken])

  // 연결 완료 후 구독 (중복 구독은 subscribeToRoom 내부에서 방지)
  useEffect(() => {
    if (isConnected && chatRoomId) {
      subscribeToRoom(Number(chatRoomId))
    }
  }, [isConnected, chatRoomId, subscribeToRoom])

  useEffect(() => {
    if (rooms && chatRoomId && !selectedRoom) {
      const room = rooms.find((r) => r.chatRoomId === Number(chatRoomId))
      if (room) {
        setSelectedRoom(room)
      }
    }
  }, [rooms, chatRoomId, selectedRoom])

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
    }
  }, [])

  return (
    <div className="pb-4xl bg-white pt-0 md:pt-8">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        {<ChatRooms rooms={rooms ?? []} handleSelectRoom={handleSelectRoom} selectedRoomId={selectedRoom?.chatRoomId ?? null} />}
        <section className="flex flex-1 flex-col border border-gray-300">
          {selectedRoom ? (
            <>
              <ChatRoomInfo data={selectedRoom} onLeaveRoom={handleLeaveRoom} />
              <div className="bg-primary-50 max-h-[70vh] min-h-[70vh] p-3.5">
                <ChatLog
                  roomMessages={allMessages}
                  onLoadPrevious={() => fetchNextPage()}
                  hasMorePrevious={hasNextPage}
                  isLoadingPrevious={isFetchingNextPage}
                />
              </div>
              <div className="flex items-center gap-2.5 p-3.5">
                <IconButton size="sm" className="p-0">
                  <Paperclip size={20} />
                </IconButton>
                <ChatInput onSend={handleSend} />
                <IconButton size="lg" className="bg-primary-100 aspect-square h-full">
                  <Send className="text-white" />
                </IconButton>
              </div>
            </>
          ) : (
            <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-gray-500">
              <p className="text-lg">채팅을 시작해보세요</p>
              <p className="text-sm">상품 페이지에서 판매자에게 채팅을 보낼 수 있습니다</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
