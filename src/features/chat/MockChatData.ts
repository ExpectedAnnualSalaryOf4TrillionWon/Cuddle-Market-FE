export interface ProductInfo {
  image: string;
  title: string;
  price: string;
}

export interface ChatMessage {
  message: string;
  time: string;
  position: 'left' | 'right';
}

export interface ChatItem {
  roomId: string;
  userName: string;
  time: string;
  lastMessage: string;
  userAvatar: string;
  product: ProductInfo;
  messages: ChatMessage[];
}

export const mockChatList: ChatItem[] = [
  {
    roomId: '1',
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
    messages: [
      { message: '안녕하세요! 강아지 사료 구매하고 싶은데요', time: '오후 1:30', position: 'left' },
      { message: '안녕하세요! 관심 가져주셔서 감사합니다', time: '오후 1:32', position: 'right' },
      {
        message: '유통기한이나 상태 궁금한 점 있으시면 언제든 물어보세요',
        time: '오후 1:33',
        position: 'right',
      },
      { message: '직거래 가능한가요? 서울 강남쪽에서요', time: '오후 2:15', position: 'left' },
      { message: '네 가능합니다! 강남역 근처 어떠세요?', time: '오후 2:18', position: 'right' },
      {
        message: '좋아요! 그럼 내일 오후 3시에 강남역 2번 출구에서 만날까요?',
        time: '오후 2:28',
        position: 'left',
      },
      { message: '네, 내일 오후 3시에 만나요!', time: '오후 2:30', position: 'right' },
    ],
  },
  {
    roomId: '2',
    userName: '박영희',
    time: '오후 1:15',
    lastMessage: '사진 더 보여주실 수 있나요?',
    userAvatar:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face', // 새 이미지 URL
    product: {
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
      title: '고양이 화장실 자동청소기',
      price: '180,000원',
    },
    messages: [
      { message: '안녕하세요! 고양이 화장실 보고 문의드려요', time: '오후 1:05', position: 'left' },
      { message: '네 안녕하세요! 어떤 점이 궁금하신가요?', time: '오후 1:06', position: 'right' },
      { message: '혹시 제품 사진을 더 볼 수 있을까요?', time: '오후 1:10', position: 'left' },
      { message: '네, 잠시만요! 추가 사진 보내드릴게요.', time: '오후 1:12', position: 'right' },
      { message: '감사합니다. 상태 좋아 보이네요!', time: '오후 1:15', position: 'left' },
    ],
  },
  {
    roomId: '3',
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
    messages: [
      { message: '햄스터 케이지 아직 판매 중이신가요?', time: '오전 11:30', position: 'left' },
      { message: '네, 판매 중입니다!', time: '오전 11:31', position: 'right' },
      { message: '혹시 가격 조금 조정 가능할까요?', time: '오전 11:40', position: 'left' },
      { message: '얼마를 생각하고 계신가요?', time: '오전 11:42', position: 'right' },
      { message: '70,000원에 가능할까요?', time: '오전 11:45', position: 'left' },
    ],
  },
];
