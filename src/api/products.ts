import type { Product } from '../types';
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

// 상품 상세 조회 함수 추가
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

// 판매자의 다른 상품 조회 함수 추가
// export const fetchSellerProducts = async (userId: number): Promise<Product[]> => {
//   const url = `${API_BASE_URL}/users/${userId}/products`;

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error('판매자의 다른 상품을 불러오는데 실패했습니다.');
//   }

//   return response.json();
// };
