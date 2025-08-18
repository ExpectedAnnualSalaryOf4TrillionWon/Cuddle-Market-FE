// ========== 기본 유저 관련 타입 ==========
export interface User {
  id: number;
  nickname: string;
  profile_image: string;
  state: string;
  city: string;
  created_at: string;
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
  condition_status: '새 상품' | '거의 새것' | '사용감있음';
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
  condition_status: '새 상품' | '거의 새것' | '사용감있음';
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
