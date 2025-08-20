// ========== 기본 유저 관련 타입 ==========
export interface User {
  id: number;
  name: string;
  nickname: string;
  birthday?: string;
  profile_image?: string;
  state: string;
  city: string;
  created_at?: string;
  profile_completed: boolean;
  last_login?: string;
}

export interface UserWithProducts extends User {
  seller_products: UserProduct[];
  total_products: number;
}

// ========== 상품 관련 타입 ==========
export interface ProductBase {
  id: number;
  title: string;
  description?: string;
  price: number;
  images: string;
  state_code?: string;
  city_code?: string;
  category_code?: string;
  pet_type_code?: string;
  pet_type_detail_code: string;
  transaction_status: '판매중' | '예약중' | '판매완료';
  condition_status: '새 상품' | '거의 새것' | '사용감 있음' | '수리 필요';
  view_count?: number;
  like_count: number;
  elapsed_time: string;
  is_liked?: boolean;
}
export type Product = ProductBase;

/** 상세용: 판매자/다른상품/서브이미지 포함 */
export interface ProductDetailItem extends ProductBase {
  seller_info: User;
  seller_products?: UserProduct[];
  sub_images?: string[];
}

export interface UserProduct {
  id: number;
  title: string;
  price: number;
  images: string;
  pet_type_detail_code: string;
  transaction_status: '판매중' | '예약중' | '판매완료';
  condition_status: '새 상품' | '거의 새것' | '사용감 있음' | '수리 필요';
  elapsed_time: string;
  like_count?: number;
  view_count?: number;
}

export interface State {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface PetType {
  id: number;
  name: string;
}

export interface PetTypeDetail {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

// ========== 인증 관련 타입 ==========

export interface KakaoLoginRequest {
  code: string;
  redirect_uri: string;
}

export interface KakaoLoginResponse {
  status: 'existing_user' | 'new_user';
  access_token?: string;
  refresh_token?: string;
  user?: User;
}

export interface SignupRequest {
  registration_token?: string; // 백엔드가 발급한 임시 토큰 (선택사항)
  nickname: string;
  state: string;
  city: string;
  birth_date?: string;
}

export interface SignupResponse {
  access_token?: string;
  refresh_token?: string;
  user?: User;
}

export interface MyPageData {
  my_product_list: Product[];
  liked_product_list: Product[];
}

export interface LikesResponse {
  product_ids: number[];
}

export interface UseLikeReturn {
  likedProductIds: number[];
  isProductLiked: (productId: number) => boolean;
  toggleLike: (productId: number) => Promise<void>;
  isLoading: boolean;
  totalLikedCount: number;
  refreshLikes: () => Promise<void>;
}

// ========== 상품 등록 요청 타입 ==========
export interface CreateProductRequest {
  pet_type_code: string; // 반려동물 카테고리 (포유류, 조류 등)
  pet_type_detail_code: string; // 반려동물 세부종 (강아지, 고양이 등)
  category_code: string; // 상품 카테고리 (food, toys 등)
  title: string; // 상품명
  description: string; // 상품 설명

  // 가격 및 상태
  price: number; // 판매 가격
  condition_status: string; // 상품 상태 (new, nearly, used 등)

  // 거래 정보
  state_code: string; // 시/도
  city_code: string; // 구/군

  // 이미지
  images?: File[]; // 상품 이미지 파일들

  // 판매 타입
  transaction_type?: 'sales' | 'purchases'; // 판매 or 판매요청
}

export interface CreateProductResponse {
  id: number;
  message: string;
  product?: Product;
}

export interface FormErrors {
  petType?: string;
  category?: string;
  productName?: string;
  description?: string;
  price?: string;
  condition?: string;
  location?: string;
  images?: string;
  general?: string;
  userName?: string;
  userNickName?: string;
  userBirth?: string;
}

export interface CreateUserRequest {
  nickname: string;
  name: string;
  birthday: string;
  state: string;
  city: string;
}

export interface CreateUserResponse {
  nickname: string;
  name: string;
  birthday: string;
  state: string;
  city: string;
}
