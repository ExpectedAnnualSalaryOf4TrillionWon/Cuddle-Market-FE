// // import type { Chat } from '@src/types/chat'
// // import { useState } from 'react'
// import { useEffect, useState } from 'react'

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

// interface ChatProps {
//   toggleChat: () => void
//   isOpen: boolean
//   setIsOpen: (isOpen: boolean) => void
// }
// export default function Chatting({ toggleChat }: ChatProps) {
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

//   return (
//     <div className="fixed right-6 bottom-24 z-40 h-96 w-80 rounded-lg border border-gray-200 bg-white shadow-2xl">
//       {currentView === 'list' ? renderListView() : renderChatView()}
//     </div>
//   )
// }