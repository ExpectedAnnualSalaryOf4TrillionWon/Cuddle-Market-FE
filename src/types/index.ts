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

// ========== 유저 프로필 데이터 응답 타입 ==========\
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
export interface UserReportedRequestData {
  reasonCode: string
  detailReason?: string
  imageFiles?: string[]
}
export interface UserReportedResponse {
  code: string
  message: string
  data: {
    id: 1
    reporterId: 1
    targetType: string
    targetId: 123
    reasonCodes: string
    detailReason: string
    imageUrls: string[]
    status: string
    createdAt: string
  }
}

// ====================
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
