import { fetchRoomMessages, fetchRooms } from '@src/api/chatting'
import { useUserStore } from '@src/store/userStore'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import type { fetchChatRoom } from '@src/types'
import { Send, Paperclip } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
import { ChatRooms } from '@src/pages/chatting-page/components/ChatRooms'
import { ChatRoomInfo } from '@src/pages/chatting-page/components/ChatRoomInfo'
import { useEffect, useRef, useState } from 'react'
import { chatSocketStore } from '@src/store/chatSocketStore'
import { ChatLog } from '@src/pages/chatting-page/components/ChatLog'
import ChatInput from './components/ChatInput'
import { uploadImage } from '@src/api/products'
import { cn } from '@src/utils/cn'
// const WS_URL = 'http://192.168.45.25:8080/ws-stomp'
const VITE_WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws-stomp'
export default function ChattingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<fetchChatRoom | null>(null)
  const navigate = useNavigate()
  const { user, accessToken } = useUserStore()
  const { id: chatRoomId } = useParams()
  const { connect, disconnect, subscribeToRoom, isConnected, sendMessage, messages: realtimeMessages, clearUnreadCount } = chatSocketStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    setIsChatOpen(true)
    navigate(`/chat/${room.chatRoomId}`)
  }

  const handleSend = (message: string) => {
    if (selectedRoom) {
      sendMessage(selectedRoom.chatRoomId, message, 'TEXT')
    }
  }
  const handleImageSend = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0 || !selectedRoom) return

    try {
      // 1. 이미지 업로드 API 호출
      const uploadResult = await uploadImage(Array.from(files))
      const imageUrl = uploadResult.mainImageUrl

      // 2. 업로드된 URL로 이미지 메시지 전송
      // content는 null, imageUrl에 업로드된 URL 전달
      sendMessage(selectedRoom.chatRoomId, '', 'IMAGE', imageUrl)
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
    }
    e.target.value = ''
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
      setIsChatOpen(false)
    }
  }
  const handleBack = () => {
    setIsChatOpen(false)
  }
  useEffect(() => {
    if (accessToken) {
      connect(VITE_WS_URL, accessToken)
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
  // chatRoomId가 없으면 (뒤로가기 등으로 /chat으로 이동 시) 선택 초기화
  useEffect(() => {
    if (!chatRoomId) {
      setIsChatOpen(false)
      setSelectedRoom(null)
    }
  }, [chatRoomId])

  return (
    <div className="md:pb-4xl h-[calc(100dvh-112px)] bg-white pt-0 md:h-auto md:pt-8">
      <div className="mx-auto flex h-full max-w-7xl flex-col md:h-auto md:flex-row">
        <div className={cn('md:block', isChatOpen ? 'hidden' : 'block')}>
          <ChatRooms rooms={rooms ?? []} handleSelectRoom={handleSelectRoom} selectedRoomId={selectedRoom?.chatRoomId ?? null} />
        </div>
        <section className={cn('flex flex-1 flex-col border border-gray-300', 'md:block', isChatOpen ? 'block' : 'hidden')}>
          {selectedRoom ? (
            <>
              <ChatRoomInfo data={selectedRoom} onLeaveRoom={handleLeaveRoom} onBack={handleBack} />
              <div className="bg-primary-50 h-screen flex-1 p-3.5 md:h-[70vh]">
                <ChatLog
                  roomMessages={allMessages}
                  onLoadPrevious={() => fetchNextPage()}
                  hasMorePrevious={hasNextPage}
                  isLoadingPrevious={isFetchingNextPage}
                />
              </div>
              <div className="fixed right-0 bottom-0 left-0 z-25 flex items-center gap-2.5 bg-white p-3.5 md:static">
                <input type="file" id="chat-file-input" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSend} />
                <label htmlFor="chat-file-input" className="cursor-pointer rounded p-1">
                  <Paperclip size={20} />
                </label>
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
