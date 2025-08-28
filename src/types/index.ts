// ========== 유저 관련 타입 ==========
export interface User {
  id: number;
  provider?: string;
  email?: string;
  name: string;
  nickname: string;
  profile_image?: string;
  birthday: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  profile_completed: boolean;
  last_login: string;
  created_at: string;

  state_name?: string; // 시/도
  city_name?: string;
  seller_products?: Product[];
  seller_images?: string;
}

// ========== 인증 관련 타입 ==========
export interface KakaoLoginRequest {
  code: string;
}

export interface CreateUserRequest {
  nickname: string;
  name: string;
  birthday: string;
  state_name: string;
  city_name: string;
}

export interface CreateUserResponse {
  nickname: string;
  name: string;
  birthday: string;
  state_name: string;
  city_name: string;
}

// ========== 필터링 관련 타입 ==========
export interface FilterApiResponse {
  categories: CategoryData[];
  petTypes: PetTypeData[];
}

export interface CategoryData {
  code: string;
  name: string;
}
export interface PetTypeData {
  code: string;
  name: string;
  details: PetTypeDetail[];
}
export interface PetTypeDetail {
  code: string;
  name: string;
}
export interface LocationData {
  code: string;
  name: string;
  cities: CityData[];
}
export interface CityData {
  code: string;
  name: string;
}

export interface FilterState {
  selectedPetType: string | null;
  selectedPetDetails: string[];
  selectedCategories: string[];
  selectedConditions: string[];
  selectedPriceRanges: string[];
  selectedLocation: {
    state: string | null;
    city: string | null;
  };
}

// ========== 찜하기 관련 타입 ==========
export interface LikeApiResponse {
  message: string;
  product_id: number;
  is_liked: boolean;
}

//!!!!!!!!!!!!!!!!!!!!
// export interface UserWithProducts extends User {
//   state: string;
//   city: string;
//   created_at: string;
//   seller_products: UserProduct[];
//   total_products: number;
// }

// ========== 상품 관련 타입 ==========
export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  state_code?: string;
  city_code?: string;
  category_code?: string;
  thumbnail: string;
  pet_type_code: string;
  pet_type_detail_code: string;
  condition_status: 'MINT' | 'EXCELLENT' | 'GOOD' | 'FAIR';
  transaction_status: 'SELLING' | 'RESERVED' | 'SOLD';
  like_count: number;
  view_count?: number;
  elapsed_time: string;
  is_liked?: boolean;
}

export interface ProductsResponse {
  product_list: Product[];
}
// export type Product = ProductBase;

/** 상세용: 판매자/다른상품/서브이미지 포함 */
export interface ProductDetailItem extends Product {
  seller_info: User;
  images?: string[];
  seller_products?: Product[];
}

// export interface UserProduct {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
//   pet_type_code: string;
//   pet_type_detail_code: string;
//   transaction_status: '판매중' | '예약중' | '판매완료';
//   condition_status: '새 상품' | '거의 새것' | '사용감 있음' | '수리 필요';
//   elapsed_time: string;
//   like_count?: number;
//   view_count?: number;
//   is_liked?: boolean;
// }

export interface State {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
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
  title: string; // 상품명
  category_code: string; // 상품 카테고리 (food, toys 등)
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
