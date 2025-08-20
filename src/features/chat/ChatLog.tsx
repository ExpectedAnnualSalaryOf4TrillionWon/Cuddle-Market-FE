interface ChatLogProps {
  message: string;
  time: string;
  position: 'left' | 'right';
}

export const ChatLog: React.FC<ChatLogProps> = ({ message, time, position }) => {
  const isRight = position === 'right';

  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          px-3 py-2 rounded-lg flex flex-col gap-1 max-w-[70%]
          ${isRight ? 'bg-primary text-white' : 'bg-bg border border-gray-200 text-black'}
        `}
      >
        <p className="text-sm break-words">{message}</p>
        <p className={`text-xs ${isRight ? 'text-gray-100' : 'text-gray-500'}`}>{time}</p>
      </div>
    </div>
  );
};
