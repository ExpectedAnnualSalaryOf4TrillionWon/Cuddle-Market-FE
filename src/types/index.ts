export interface User {
  id: number;
  email: string;
  provider?: string;
  provider_id?: string;
  nickname: string;
  name?: string;
  profile_image?: string;
  birthday?: string;
  state_id?: number;
  city_id?: number;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
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
  state_code: string;
  city_code: string;
  category_code: string;
  pet_type_code: string;
  pet_type_detail_code: string;
  title: string;
  description?: string;
  price: number;
  transaction_status: 'SELLING' | 'RESERVED' | 'SOLD';
  condition_status: 'MINT' | 'EXCELLENT' | 'GOOD' | 'FAIR';
  view_count: number;
  created_at: string;
  updated_at: string;

  // 조인된 데이터 (API 응답에서 포함될 수 있는 것들)
  user?: User;
  images?: string;
  is_liked?: boolean;
  state_name?: string;
  city_name?: string;
  category_name?: string;
  pet_type_name?: string;
  pet_type_detail_name?: string;
}

export interface ProductListResponse {
  products: Product[];
  total_count: number;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
