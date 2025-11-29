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
  profile_image?: string
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
  petDetailType: string
  productStatus: string
  title: string
  price: number
  mainImageUrl: string
  createdAt: string
  favoriteCount: number
  isFavorite: boolean
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

// ========== 찜하기 관련 타입 ==========
// export interface FavoriteResponse {
//   message: string
//   product_id: number
//   is_liked: boolean
// }

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

export interface MyPageData {
  my_product_list: Product[]
  liked_product_list: Product[]
}

export interface LikesResponse {
  product_ids: number[]
}

export interface UseLikeReturn {
  likedProductIds: number[]
  isProductLiked: (productId: number) => boolean
  toggleLike: (productId: number) => Promise<void>
  isLoading: boolean
  totalLikedCount: number
  refreshLikes: () => Promise<void>
}

// ========== 상품 등록 요청 타입 ==========
export interface CreateProductRequest {
  pet_type_code: string // 반려동물 카테고리 (포유류, 조류 등)
  pet_type_detail_code: string // 반려동물 세부종 (강아지, 고양이 등)
  title: string // 상품명
  category_code: string // 상품 카테고리 (food, toys 등)
  description: string // 상품 설명

  // 가격 및 상태
  price: number // 판매 가격
  condition_status: string // 상품 상태 (new, nearly, used 등)

  // 거래 정보
  state_code: string // 시/도
  city_code: string // 구/군

  // 이미지
  images?: File[] // 상품 이미지 파일들

  // 판매 타입
  transaction_type?: 'sales' | 'purchases' // 판매 or 판매요청
}

export interface CreateProductResponse {
  id: number
  message: string
  product?: Product
}

export interface FormErrors {
  petType?: string
  category?: string
  productName?: string
  description?: string
  price?: string
  condition?: string
  location?: string
  images?: string
  general?: string
  userName?: string
  userNickName?: string
  userBirth?: string
}
