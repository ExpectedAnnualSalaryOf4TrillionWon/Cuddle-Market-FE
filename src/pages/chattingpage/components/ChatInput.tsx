import { useState } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState('')
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (inputMessage.length === 0) return
    // IME 조합 중일 때는 무시 (한글 입력 시 중복 전송 방지)
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend(inputMessage)
      setInputMessage('')
    }
  }

  return (
    <textarea
      name=""
      id=""
      rows={1}
      onChange={(e) => setInputMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      value={inputMessage}
      placeholder="채팅을 입력하세요."
      className="h-fit w-full resize-none rounded bg-[#E5E7EB]/50 p-2.5 focus:outline-none"
    />
  )
}
