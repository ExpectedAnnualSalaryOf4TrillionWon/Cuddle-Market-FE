import { fetchRoomMessages, fetchRooms } from '@src/api/chatting'
import { useUserStore } from '@src/store/userStore'
import { useQuery } from '@tanstack/react-query'
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
  const { connect, disconnect, subscribeToRoom, isConnected, sendMessage, messages: realtimeMessages } = chatSocketStore()

  const { data: roomMessages } = useQuery({
    queryKey: ['messages', chatRoomId],
    queryFn: () => fetchRoomMessages(Number(chatRoomId)),
    enabled: !!user && !!chatRoomId,
  })

  const allMessages = [...(roomMessages ?? []), ...(realtimeMessages[Number(chatRoomId)] ?? [])]

  const { data: rooms } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => fetchRooms(),
    enabled: !!user,
  })

  const handleSelectRoom = (room: fetchChatRoom) => {
    subscribeToRoom(room.chatRoomId)
    setSelectedRoom(room)
    navigate(`/chat/${room.chatRoomId}`, { replace: true })
  }

  const handleSend = (message: string) => {
    if (selectedRoom) {
      sendMessage(selectedRoom.chatRoomId, message, 'TEXT')
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

  // export default function Chatting({ isOpen, setIsOpen }: ChatProps) {
  //   const [searchParams] = useSearchParams()
  //   const [currentView, setCurrentView] = useState<'list' | 'chat'>('list')
  //   const [selectedChatRoom, setSelectedChatRoom] = useState<Chat | null>(null)
  //   const { chatMessages, isLoading: isMessagesLoading } = useChatMessages(
  //     selectedChatRoom?.study_group_uuid
  //   )
  //   // const openChatRoom = (chatData: Chat) => {
  //   //   console.log(chatData)
  //   //   setSelectedChatRoom(chatData)
  //   //   setCurrentView('chat')
  //   // }
  //   const handleBack = () => {
  //     setCurrentView('list')
  //   }
  //   const toggleChat = () => {
  //     setIsOpen(!isOpen)
  //   }
  //   const sendMessage = (message: string) => {
  //     console.log(message)
  //   }
  //   // const getOnlineCount = () => {
  //   //   if (!selectedChatRoom) return 0
  //   //   const onlineCount = selectedChatRoom.participants.filter(
  //   //     (p) => p.status === 'online'
  //   //   )
  //   //   return onlineCount.length
  //   // }
  //   // const getOnlineCount = () => {
  //   //   if (!selectedChatRoom) return 0
  //   //   const onlineCount = selectedChatRoom.participants.filter(
  //   //     (p) => p.status === 'online'
  //   //   )
  //   //   return onlineCount.length
  //   // }
  //   // const renderListView = () => (
  //   //   <>
  //   //     <ChatListHeader unreadCount={3} onClose={toggleChat} />
  //   //     <ChatList openChatRoom={openChatRoom} />
  //   //   </>
  //   // )
  //   const renderChatView = () =>
  //     selectedChatRoom && (
  //       <div className="flex h-full flex-col">
  //         <ChatRoomHeader
  //           title={selectedChatRoom.title}
  //           onlineCount={getOnlineCount()}
  //           title={selectedChatRoom.study_group_name}
  //           // onlineCount={getOnlineCount()}
  //           onBack={handleBack}
  //           onClose={toggleChat}
  //           toggleChat={toggleChat}
  //         />
  //         <ParticipantsList participants={selectedChatRoom.participants} />
  //         <ParticipantsList participants={participants} />
  //         <div className="flex-1">
  //           <MessageList messages={selectedChatRoom.messages} />
  //           {isMessagesLoading ? (
  //             <div className="flex h-full items-center justify-center">
  //               <div>메시지를 불러오는 중...</div>
  //             </div>
  //           ) : (
  //             <MessageList messages={chatMessages} />
  //           )}
  //         </div>
  //         <MessageInput onSend={sendMessage} />
  //       </div>
  //     )
  //   useEffect(() => {
  //     const studyGroupUuid = searchParams.get('study_group_uuid')
  //     if (studyGroupUuid) {
  //       const targetChatRoom = chatList.find(
  //         (chat) => chat.study_group_uuid === studyGroupUuid
  //       )
  //       if (targetChatRoom) {
  //         setIsOpen(true) // 채팅창을 열어줌
  //         openChatRoom(targetChatRoom)
  //       }
  //     }
  //   }, [searchParams, setIsOpen])
  return (
    <div className="pb-4xl bg-white pt-0 md:pt-8">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        {<ChatRooms rooms={rooms ?? []} handleSelectRoom={handleSelectRoom} selectedRoomId={selectedRoom?.chatRoomId ?? null} />}
        <section className="flex flex-1 flex-col border border-gray-300">
          {selectedRoom && <ChatRoomInfo data={selectedRoom} />}

          <div className="bg-primary-50 max-h-[70vh] min-h-[70vh] p-3.5">
            <ChatLog roomMessages={allMessages} />
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
        </section>
      </div>
    </div>
  )
}
