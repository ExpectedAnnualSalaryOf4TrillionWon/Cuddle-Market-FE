import type { ChatMessage } from 'src/types/ChatType';

export function ChatLog({ message, time, position }: ChatMessage) {
  const isRight = position === 'right';

  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'} my-1`}>
      <div
        className={`
          px-3 py-2 rounded-lg flex flex-col gap-1 min-w-[120px] max-w-[70%]
          ${isRight ? 'bg-primary text-white' : 'bg-bg border border-gray-200 text-black'}
        `}
      >
        {/* 메세지 영역 */}
        <p className="text-sm break-words">{message}</p>

        {/* 시간은 항상 오른쪽 아래에 정렬 */}
        <div className="flex justify-end">
          <p className={`text-xs ${isRight ? 'text-gray-100' : 'text-gray-500'}`}>{time}</p>
        </div>
      </div>
    </div>
  );
}
