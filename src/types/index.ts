export interface User {
  id: number;
  seller_image: string;
  nickname: string;
  state: string;
  city: string;
  created_at?: string;
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

export interface SellerProfile extends User {
  seller_products: UserProduct[];
  created_at: string;
  total_products: number;
}

export interface State {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: number;
  state_id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PetType {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PetTypeDetail {
  id: number;
  pet_type_id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  is_main: boolean;
  uploaded_by_id: number;
  uploaded_at: string;
}

export interface ProductLike {
  user_id: number;
  product_id: number;
  created_at: string;
}

// 상품 관련 타입들
export interface Product {
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

  // 조인된 데이터 (API 응답에서 포함될 수 있는 것들)
  seller_info?: User;
  seller_products?: UserProduct[];
}
