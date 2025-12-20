import type { Province } from '@src/constants/cities'

// ========== 공통 폼 타입 ==========
// 주소 필드를 포함하는 폼 타입 (AddressField 컴포넌트용)
export interface FormWithAddress {
  addressSido: Province | ''
  addressGugun: string
}

// ========== 유저 관련 타입 ==========
export interface User {
  id: number
  email?: string
  name: string
  nickname: string
  birthDate: string
  profile_completed?: boolean
  addressSido: string
  addressGugun: string
  profileImageUrl?: string
  introduction?: string
  createdAt?: string
}

// ========== 인증 관련 타입 ==========
export interface KakaoLoginRequest {
  code: string
}

export interface CreateUserRequest {
  nickname: string
  name: string
  birthday: string
  state_name: string
  city_name: string
}

export interface CreateUserResponse {
  nickname: string
  name: string
  birthday: string
  state_name: string
  city_name: string
}

export interface NicknameCheckResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: boolean // true: 사용 가능, false: 중복
}

export interface EmailCheckResponse {
  code: string
  message: string
  data: string
}

export interface EmailValidCodeResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: boolean // true: 사용 가능, false: 중복
}

export interface SignUpRequestData {
  email: string
  password: string
  name: string
  nickname: string
  birthDate: string
  addressSido: Province | ''
  addressGugun: string
}

export interface SignUpResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: {
    id: number
    email: string
    name: string
    nickname: string
    birthDate: string
    addressSido: string
    addressGugun: string
  }
}

export interface LoginRequestData {
  email: string
  password: string
}

export interface LoginResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: {
    accessToken: string
    refreshToken: string
    user: {
      id: number
      email: string
      name: string
      nickname: string
      birthDate: string
      addressSido: string
      addressGugun: string
    }
  }
}
export interface LogoutResponse {
  code: string
  message: string
  data: string
}

export interface ResettingPasswordResponse {
  code: string
  message: string
  data: string
}
export interface ResettingPasswordRequestData {
  email: string
  newPassword: string
  confirmPassword: string
}

export interface WithDrawRequestData {
  reason: string
  detailReason: string
}

// ========== 상품 관련 타입 ==========
export interface ProductResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: {
    page: number
    size: number
    total: number
    content: Product[]
    totalPages: 8
    hasNext: true
    hasPrevious: false
    totalElements: 150
    numberOfElements: 20
  }
}

export interface Product {
  id: number
  productType: string
  tradeStatus: string
  petType?: string
  petDetailType: string
  productStatus: string
  title: string
  price: number
  mainImageUrl: string
  createdAt: string
  favoriteCount: number
  isFavorite: boolean
  isDeliveryAvailable?: boolean
  preferredMeetingPlace?: string
  viewCount?: number
}

export interface ProductDetailItem extends Product {
  category: string
  description: string
  subImageUrls: string[]
  addressSido: string
  addressGugun: string
  viewCount: number
  sellerInfo: {
    sellerId: number
    sellerNickname: string
    sellerProfileImageUrl: string
  }
  sellerOtherProducts: Product[]
}

export interface ProductDetailItemResponse {
  code: string
  message: string
  data: ProductDetailItem
}

// ========== 상품 등록 요청 타입 ==========
export interface ProductPostRequestData {
  petType: string
  petDetailType: string
  category: string
  title: string
  description: string
  price: number
  productStatus: string
  mainImageUrl: string
  subImageUrls: string[]
  addressSido: string
  addressGugun: string
  isDeliveryAvailable: boolean
  preferredMeetingPlace: string
}

export interface ProductPostResponse {
  id: number
  sellerId: number
  productType: string
  petType: string
  petDetailType: string
  category: string
  title: string
  description: string
  price: number
  productStatus: string
  tradeStatus: string
  mainImageUrl: string
  subImageUrls: string[]
  addressSido: string
  addressGugun: string
  isDeliveryAvailable: boolean
  preferredMeetingPlace: string
  viewCount: number
  favoriteCount: number
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export interface RequestProductPostRequestData {
  petType: string
  petDetailType: string
  category: string
  title: string
  description: string
  desiredPrice: number
  mainImageUrl: string
  subImageUrls: string[]
  addressSido: string
  addressGugun: string
}

export interface ImageUploadResponse {
  code: { code: number; message: string }
  message: string
  data: {
    imageUrls: string[]
    mainImageUrl: string
    subImageUrls: string[]
  }
}

// ========== 마이페이지 관련 타입 ==========
export interface MyPageDataResponse {
  code: {
    code: 200
    message: string
  }
  message: string
  data: {
    id: number
    profileImageUrl: string
    nickname: string
    name: string
    introduction: string
    birthDate: string
    email: string
    addressSido: string
    addressGugun: string
    createdAt: string
  }
}

export interface MyPageProductResponse {
  code: { code: number; message: string }
  message: string
  data: {
    page: number
    size: number
    total: number
    content: Product[]
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
    totalElements: number
    numberOfElements: number
  }
}

export interface BlockedUser {
  blockedUserId: number
  nickname: string
  profileImageUrl: string
}

export interface MyBlockedUsersResponse {
  code: { code: number; message: string }
  message: string
  data: {
    blockedUsers: {
      page: number
      size: number
      total: number
      content: BlockedUser[]
      totalPages: number
      hasNext: boolean
      hasPrevious: boolean
      totalElements: number
      numberOfElements: number
    }
  }
}

// ========== 프로필 수정 요청 타입 ==========
export interface ProfileUpdateRequestData {
  nickname?: string
  addressSido?: string
  addressGugun?: string
  profileImageUrl?: string
  introduction?: string
}
export interface ProfileUpdateResponse {
  code: string
  message: string
  data: {
    id: number
    email: string
    name: string
    nickname: string
    birthDate: string
    addressSido: string
    addressGugun: string
  }
}
export interface ChangePasswordRequestData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
export interface ChangePasswordResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: string
}

// ========== 회원탈퇴 요청 타입 ==========
export interface WithDrawRequest {
  reason: string
  detailReason: string
}
export interface WithDrawResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: string
}

// ========== 유저 프로필 데이터 응답 타입 ==========
export interface UserProfileResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: {
    id: number
    profileImageUrl: string
    addressSido: string
    addressGugun: string
    nickname: string
    createdAt: string
    introduction: string
    isBlocked: boolean
    isReported: boolean
  }
}

export interface UserProductResponse {
  code: string
  message: string
  data: {
    page: number
    size: number
    total: number
    content: Product[]
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
    totalElements: number
    numberOfElements: number
  }
}

export interface UserBlockedResponse {
  code: string
  message: string
  data: {
    blockerId: 1
    blockedUserId: 123
    blockedNickname: string
    blockedProfileImageUrl: string
    createdAt: string
  }
}
export interface UserUnBlockedResponse {
  code: string
  message: string
  data: null
}
export interface ReportedRequestData {
  reasonCode: string
  detailReason?: string
  imageFiles?: string[]
}
export interface ReportedResponse {
  code: string
  message: string
  data: {
    id: 1
    reporterId: 1
    targetType: string
    targetId: 123
    reasonCodes: string[]
    detailReason: string
    imageUrls: string[]
    status: string
    createdAt: string
  }
}

// ========== 커뮤니티 응답 타입 ==========

export interface CommunityResponse {
  code: {
    code: number
    message: string
  }
  message: string
  data: {
    page: number
    size: number
    total: number
    content: CommunityItem[]
    hasNext: boolean
    hasPrevious: boolean
    totalElements: number
    numberOfElements: number
  }
}

export interface CommunityItem {
  id: number
  title: string
  contentPreview?: string
  authorNickname: string
  boardType?: string
  searchType: string
  viewCount?: number
  commentCount: number
  createdAt: string
  updatedAt: string
  isModified: boolean
}

// ========== 커뮤니티 등록 요청 타입 ==========
export interface CommunityPostRequestData {
  boardType: string
  title: string
  content: string
  imageUrls: string[]
}

export interface CommunityDetailItemResponse {
  code: string
  message: string
  data: CommunityDetailItem
}

export interface CommunityDetailItem extends CommunityItem {
  authorId: number
  authorProfileImageUrl: string
  content: string
  imageUrls: string[]
}

export interface CommentResponse {
  code: string
  message: string
  data: {
    comments: Comment[]
  }
}

export interface Comment {
  id: number
  authorId: string
  authorNickname: string
  authorProfileImageUrl: string
  content: string
  createdAt: string
  depth: number
  parentId: number
  hasChildren: boolean
  childrenCount: number
}

export interface CommentPostRequestData {
  content: string
  parentId?: number
}

export interface CommentPostResponse {
  code: string
  message: string
  data: {
    id: number
    postId: number
    authorId: number
    authorNickname: string
    authorProfileImageUrl: string
    parentId: number
    content: string
    depth: number
    createdAt: string
    updatedAt: string
  }
}

export interface DeleteResponse {
  code: string
  message: string
  data: null
}

export interface CreateChatRequestData {
  productId: number
}
export interface ChatRoom {
  chatRoomId: number
  productId: number
  productTitle: string
  productPrice: number
  productImageUrl: string
  createdAt: string
  sellerNickname: string
  sellerProfileImageUrl: null
}

export interface CreateChatRoomResponse {
  code: string
  message: string
  data: ChatRoom
}

export interface ChatRoomMessagesResponse {
  code: string
  message: string
  data: {
    messages: Message[]
  }
  currentPage: number
  totalPages: number
  totalElements: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface Message {
  messageId: number
  senderId: number
  senderNickname: string
  messageType: string
  content: string
  imageUrl: null
  isBlocked: boolean
  blockReason: null
  createdAt: string
  isMine: boolean
}

export interface ChatRoomsResponse {
  code: string
  message: string
  data: { chatRooms: fetchChatRoom[] }
}

export interface fetchChatRoom {
  chatRoomId: number
  productId: number
  productTitle: string
  productPrice: number
  productImageUrl: string
  opponentId: number
  opponentNickname: string
  opponentProfileImageUrl: string
  lastMessage: string
  lastMessageTime: string
  hasUnread: boolean
  unreadCount: number
}

export interface ChatRoomUpdateResponse {
  chatRoomId: number
  productId: number
  productTitle: string
  productPrice: number
  productImageUrl: string
  opponentId: number
  opponentNickname: string
  opponentProfileImageUrl: string
  lastMessage: string
  lastMessageTime: string
  hasUnread: boolean
  unreadCount: number
}
// export interface ProductDetailItemResponse {
//   code: string
//   message: string
//   data: ProductDetailItem
// }
// ====================
// ====================
// ====================

export interface State {
  id: number
  name: string
}

export interface City {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
}
