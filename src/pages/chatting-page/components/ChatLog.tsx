import type { Message } from '@src/types'
import { cn } from '@src/utils/cn'
import { useUserStore } from '@src/store/userStore'
import { useEffect, useRef } from 'react'
import PlaceholderImage from '@assets/images/placeholder.png'

interface ChatLogProps {
  roomMessages: Message[]
  onLoadPrevious?: () => void
  hasMorePrevious?: boolean
  isLoadingPrevious?: boolean
}

// isMine 계산: HTTP API 응답은 isMine 포함, STOMP는 senderId로 비교
const getIsMine = (message: Message, userId?: number): boolean => {
  // 서버에서 isMine을 보내준 경우 (HTTP API)
  if (typeof message.isMine === 'boolean') {
    return message.isMine
  }
  // STOMP 실시간 메시지는 senderId로 비교
  return message.senderId === userId
}
const chatFormatTime = (dateString: string): string => {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const period = hours < 12 ? '오전' : '오후'
  const hour12 = hours % 12 || 12 // 0시는 12시로 표시

  return `${period} ${hour12}:${minutes}`
}

const chatFormatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = days[date.getDay()]
  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`
}

const groupMessagesByDate = (messages: Message[]) => {
  const groups: Record<string, Message[]> = {}

  messages.forEach((message) => {
    const dateKey = new Date(message.createdAt).toDateString()
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(message)
  })

  return groups
}

export function ChatLog({ roomMessages, onLoadPrevious, hasMorePrevious, isLoadingPrevious }: ChatLogProps) {
  const { user } = useUserStore()
  const groupedMessages = groupMessagesByDate(roomMessages)
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleScroll = () => {
    if (scrollRef.current) {
      // 스크롤이 맨 위에 도달하면 이전 메시지 로드
      if (scrollRef.current.scrollTop === 0 && hasMorePrevious && !isLoadingPrevious) {
        onLoadPrevious?.()
      }
    }
  }

  // 메시지가 추가될 때 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [roomMessages])

  return (
    <div ref={scrollRef} onScroll={handleScroll} className="scrollbar-hide flex h-full flex-col gap-4 overflow-y-auto">
      {Object.entries(groupedMessages).map(([dateKey, messages]) => (
        <div key={dateKey} className="flex flex-col gap-2">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#8d99a3] px-3 py-2 text-sm font-semibold text-[#f0f9ff]">{chatFormatDate(messages[0].createdAt)}</span>
          </div>
          <ul>
            {messages.map((message) => {
              const isMine = getIsMine(message, user?.id)
              return message.messageType === 'SYSTEM' ? (
                <li className="bg-primary-100 m-6 mx-auto w-fit rounded-full px-3 py-1 text-center">{message.content}</li>
              ) : message.isBlocked ? (
                <li className="ml-auto flex w-fit max-w-64 min-w-60 flex-col rounded-full px-3 py-1">
                  <span className="rounded-t-lg rounded-bl-lg bg-gray-900 px-3 py-2 text-white">{message.content}</span>
                  <span className="text-sm">개인정보 포함으로 상대방에게 전송되지 않았습니다.</span>
                </li>
              ) : (
                <li
                  key={message.messageId}
                  className={cn('flex max-w-64 min-w-60 flex-col gap-1 rounded-lg px-3 py-2', isMine ? 'ml-auto' : 'mr-auto')}
                >
                  {!isMine && <p className="text-sm text-gray-600">{message.senderNickname}</p>}
                  {message.messageType === 'IMAGE' ? (
                    <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-lg md:static">
                      <img
                        src={message.imageUrl || PlaceholderImage}
                        alt={message.senderNickname}
                        onError={(e) => {
                          e.currentTarget.src = PlaceholderImage
                        }}
                        className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <span
                      className={cn(
                        'rounded-t-lg px-3 py-2 whitespace-pre-wrap',
                        isMine ? 'rounded-bl-lg bg-gray-900 text-white' : 'rounded-br-lg border border-gray-300 bg-white'
                      )}
                    >
                      {message.content}
                    </span>
                  )}
                  <span className={cn('text-xs text-gray-500', isMine ? 'text-right' : 'text-left')}>{chatFormatTime(message.createdAt)}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
