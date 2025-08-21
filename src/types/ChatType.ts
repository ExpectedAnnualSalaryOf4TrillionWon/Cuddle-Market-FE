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
