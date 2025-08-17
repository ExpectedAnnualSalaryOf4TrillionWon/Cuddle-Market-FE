import logoImage from '@images/CuddleMarketLogo.png';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { RiMore2Line } from 'react-icons/ri';
export interface ProductInfo {
  image: string;
  title: string;
  price: string;
}

export interface ChatItem {
  id: number;
  userName: string;
  time: string;
  lastMessage: string;
  userAvatar: string;
  product: ProductInfo;
}

const mockChatList: ChatItem[] = [
  {
    id: 1,
    userName: '김철수',
    time: '오후 2:30',
    lastMessage: '네, 내일 오후 3시에 만나요!',
    userAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    product: {
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop',
      title: '강아지 사료 10kg 새상품',
      price: '45,000원',
    },
  },
  {
    id: 2,
    userName: '박영희',
    time: '오후 1:15',
    lastMessage: '사진 더 보여주실 수 있나요?',
    userAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    product: {
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
      title: '고양이 화장실 자동청소기',
      price: '180,000원',
    },
  },
  {
    id: 3,
    userName: '이민수',
    time: '오전 11:45',
    lastMessage: '가격 조정 가능한가요?',
    userAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    product: {
      image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop',
      title: '햄스터 케이지 세트',
      price: '85,000원',
    },
  },
];
const ChatPage = () => {
  const [message, setMessage] = useState<string>('');

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {/* 헤더 영역 */}
      <header className="flex items-center justify-between gap-lg sticky top-0 z-1 bg-primary">
        <div className="w-full max-w-[var(--container-max-width)] mx-auto px-lg py-md flex items-center gap-lg">
          {/* 로고 */}
          <div>
            <img src={logoImage} alt="커들마켓" className="w-auto h-16 object-contain" />
          </div>
          {/* 페이지 타이틀 */}
          <h2 className="text-xl font-bold">채팅</h2>
        </div>
      </header>
      <div className="max-w-[var(--container-max-width)] h-[calc(100vh-80px)] flex mx-auto px-lg py-xl">
        <div className="w-1/3 border-r border-gray-200 bg-bg">
          <h2 className="heading3 p-4 border-b border-gray-200">채팅 목록</h2>

          <div className="p-2 flex flex-col gap-sm">
            {mockChatList.map((chat: ChatItem) => (
              <div className="flex gap-md p-4 rounded-lg cursor-pointer bg-primary/40 border border-primary/20">
                <div className="flex overflow-hidden rounded-full w-16 h-16">
                  <img src={chat.userAvatar} alt={`${chat.userName} 프로필`} />
                </div>
                <div className="flex-1 flex flex-col gap-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">{chat.userName}</p>
                    <span className="text-sm font-bold text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-600">{chat.lastMessage}</p>
                  <div className="flex items-center gap-md p-2 bg-gray-50 rounded text-xs">
                    <div className="w-10 h-10 rounded overflow-hidden">
                      <img
                        src={chat.product.image}
                        alt={chat.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{chat.product.title}</p>
                      <p className="text-sm font-bold">{chat.product.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 p-4 flex flex-col gap-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="overflow-hidden rounded-full w-10 h-10">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&amp;h=100&amp;fit=crop&amp;crop=face" />
                </div>
                <p className="font-medium">김철수</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center justify-center gap-2 rounded-md">
                  <RiMore2Line />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-xl border border-border">
              <div data-slot="card-content" className="[&amp;:last-child]:pb-6 p-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&amp;h=300&amp;fit=crop"
                    alt="강아지 사료 10kg 새상품"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm">강아지 사료 10kg 새상품</h4>
                    <p className="text-sm font-bold">45,000원</p>
                  </div>
                  <button className="flex items-center justify-center text-sm  border border-border h-8 rounded-md px-3">
                    상품보기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-sm">
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-bg border border-gray-200 flex flex-col gap-xs">
                <p className="text-sm">안녕하세요! 강아지 사료 구매하고 싶은데요</p>
                <p className="text-xs text-gray-500">오후 1:30</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4 py-2 rounded-lg bg-primary text-bg flex flex-col gap-xs">
                <p className="text-sm">안녕하세요! 관심 가져주셔서 감사합니다</p>
                <p className="text-xs">오후 1:32</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4 py-2 rounded-lg bg-primary text-bg flex flex-col gap-xs">
                <p className="text-sm">유통기한이나 상태 궁금한 점 있으시면 언제든 물어보세요</p>
                <p className="text-xs">오후 1:33</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-bg border border-gray-200 flex flex-col gap-xs">
                <p className="text-sm">직거래 가능한가요? 서울 강남쪽에서요</p>
                <p className="text-xs text-gray-500">오후 2:15</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4 py-2 rounded-lg bg-primary text-bg flex flex-col gap-xs">
                <p className="text-sm">네 가능합니다! 강남역 근처 어떠세요?</p>
                <p className="text-xs">오후 2:18</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-bg border border-gray-200 flex flex-col gap-xs">
                <p className="text-sm">
                  좋아요! 그럼 내일 오후 3시에 강남역 2번 출구에서 만날까요?
                </p>
                <p className="text-xs text-gray-500">오후 2:28</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4 py-2 rounded-lg bg-primary text-bg flex flex-col gap-xs">
                <p className="text-sm">네, 내일 오후 3시에 만나요!</p>
                <p className="text-xs">오후 2:30</p>
              </div>
            </div>
          </div>
          <div className="bg-bg border-t border-gray-200 p-4">
            <div className="flex gap-lg">
              <div className="flex-1">
                <input
                  className="flex h-9 w-full 
                  rounded-md border px-3 py-1 
                  resize-none border-gray-300"
                  placeholder="메시지를 입력하세요..."
                  value={message}
                  onChange={handleChangeMessage}
                />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-md bg-primary h-9 px-4 py-2">
                <FaRegPaperPlane color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
