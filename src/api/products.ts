import type { Product, SellerProfile } from '../types';
const API_BASE_URL = '/api';

export const fetchAllProducts = async (filters?: {
  pet_type_code?: string;
}): Promise<Product[]> => {
  const params = new URLSearchParams();
  // console.log(params); // 실행순서2️⃣ :URLSearchParams {size: 2}

  if (filters?.pet_type_code && filters.pet_type_code !== 'ALL') {
    params.append('pet_type_code', filters.pet_type_code);
  }

  const queryString = params.toString();
  const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;
  // console.log(url); // 실행순서3️⃣ /api/products

  // handler 실행
  const response = await fetch(url); // 실행순서4️⃣

  // const data = await response.json(); // body를 파싱
  // console.log('data:', data);
  /** 실행순서8️⃣ : 
  {
    current_page: 1,
    has_next: false,
    has_prev: false,
    products: (6) [{…}, {…}, {…}, {…}, {…}, {…}],
    total_count: 6,
    total_pages: 1
  } */

  if (!response.ok) {
    throw new Error('상품 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
};

// 상품 상세 조회
export const fetchProductById = async (productId: string): Promise<any> => {
  const url = `${API_BASE_URL}/detail/${productId}`;

  const response = await fetch(url);

  // const data = await response.json(); // body를 파싱
  // console.log('data:', data);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }

  return response.json();
};

// 판매자 프로필 조회
export const fetchSellerById = async (sellerId: string): Promise<SellerProfile> => {
  const res = await fetch(`/api/user/${sellerId}`);
  if (!res.ok) throw new Error('사용자를 찾을 수 없습니다.');
  return res.json();
};

export const fetchMyProfile = async (): Promise<SellerProfile> => {
  const res = await fetch('/api/me');
  if (!res.ok) throw new Error('마이페이지 조회 실패');
  return res.json();
};
