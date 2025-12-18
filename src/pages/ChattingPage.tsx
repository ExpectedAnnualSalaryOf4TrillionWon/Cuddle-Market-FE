// // import type { Chat } from '@src/types/chat'
// // import { useState } from 'react'
// import { useEffect, useState } from 'react'
import PlaceholderImage from '@assets/images/placeholder.png'
import { fetchRoomMessages } from '@src/api/chatting'
import { useUserStore } from '@src/store/userStore'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import type { CreateChatRoomResponse } from '@src/types'
import { Send } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
// // import ChatList from './ChatList'

// // import ChatListHeader from './chat-header/ChatListHeader'
// // import ChatRoomHeader from './chat-header/ChatRoomHeader'
// // import MessageInput from './MessageInput'
// // import MessageList from './MessageList'
// // import ParticipantsList from './ParticipantsList'
// // import { useChatMessages } from '@src/hooks/useChatting'
// // import { participants } from '@src/mock/participants'
// import { useSearchParams } from 'react-router-dom'
// // import { chatList } from '@src/mock/chatListData'

export default function ChattingPage() {
  const { user } = useUserStore()
  const { id: chatRoomId } = useParams()
  const location = useLocation()

  // state에서 채팅방 정보 가져오기
  const chatRoomData = (location.state as { chatRoom: CreateChatRoomResponse['data'] } | null)?.chatRoom

  const { data: roomMessages } = useQuery({
    queryKey: ['messages', chatRoomId],
    queryFn: () => fetchRoomMessages(Number(chatRoomId)),
    enabled: !!user && !!chatRoomId,
  })

  console.log(chatRoomData)
  console.log(roomMessages)

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
      <div className="mx-auto flex max-w-7xl flex-col gap-0 md:flex-row md:gap-8">
        <section className="flex flex-col rounded-none border-b border-gray-200 px-5 py-0 pt-5 md:max-w-72 md:min-w-72 md:rounded-xl md:border md:py-5">
          <h2>채팅목록</h2>
          <div>
            <ul>
              <li className="rounded-lg border border-gray-200">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
                  {/* {data?.profileImageUrl ? (
                    <img src={data.profileImageUrl} alt={data.nickname} className="h-full w-full object-cover" />
                  ) : (
                    <div className="heading-h4">{data?.nickname.charAt(0).toUpperCase()}</div>
                  )} */}
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="flex flex-1 flex-col gap-3.5 md:gap-7">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
                {chatRoomData?.sellerProfileImageUrl ? (
                  <img src={chatRoomData.sellerProfileImageUrl} alt={chatRoomData.sellerNickname} className="h-full w-full object-cover" />
                ) : (
                  <div className="">{chatRoomData?.sellerNickname.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <p>{chatRoomData?.sellerNickname}</p>
            </div>
            <div className="bg-primary-100 flex items-start gap-2 rounded-lg px-2.5 py-3">
              <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg md:static">
                <img
                  src={chatRoomData?.productImageUrl || PlaceholderImage}
                  alt={chatRoomData?.productTitle}
                  className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-primary-700 font-bold">{chatRoomData?.productTitle}</p>
                <p className="text-primary-700 font-bold">{chatRoomData?.productPrice}</p>
              </div>
            </div>
          </div>
          <div className="bg-primary-50 min-h-[70vh]">안녕하세요</div>
          <div className="flex items-center">
            <textarea name="" id="" placeholder="채팅을 입력하세요." className="w-full resize-none rounded-lg bg-[#E5E7EB]/50 p-2.5" />
            <IconButton size="lg" className="bg-primary-100">
              <Send size={24} className="text-white" />
            </IconButton>
          </div>
        </section>
      </div>
    </div>
    //     <div className="fixed right-6 bottom-24 z-40 h-96 w-80 rounded-lg border border-gray-200 bg-white shadow-2xl">
    //       {currentView === 'list' ? renderListView() : renderChatView()}
    //     </div>
  )
}
