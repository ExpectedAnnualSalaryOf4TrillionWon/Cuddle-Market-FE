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
export const mockChatList: ChatItem[] = [
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
