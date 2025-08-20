interface ChatOpponentInfoProps {
  profileimageurl: string;
  imagealt: string;
  username: string;
}

export const ChatOpponentInfo: React.FC<ChatOpponentInfoProps> = ({
  profileimageurl,
  imagealt,
  username,
}) => {
  return (
    <div>
      {/* 상대방의 사진과 이름만 전달 */}
      <div className="flex p-xs items-center gap-md ">
        <img src={profileimageurl} alt={`${imagealt} 프로필`} className="w-15 h-15  rounded-full" />
        <p className="text-md font-bold">{username}</p>
      </div>
    </div>
  );
};
