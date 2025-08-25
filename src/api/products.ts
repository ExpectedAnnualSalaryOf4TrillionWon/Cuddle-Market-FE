import type {
  CreateProductRequest,
  CreateProductResponse,
  FilterApiResponse,
  LikesResponse,
  MyPageData,
  Product,
  ProductDetailItem,
  UserWithProducts,
} from '../types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const fetchAllCategory = async (): Promise<FilterApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/categories/all-get`);
  if (!response.ok) {
    throw new Error('상품 목록을 불러오는데 실패했습니다.');
  }
  return response.json();
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('상품 목록을 불러오는데 실패했습니다.');
  }
  return response.json();
};

// 상품 상세 조회
export const fetchProductById = async (productId: string): Promise<ProductDetailItem> => {
  const url = `${API_BASE_URL}/products/${productId}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }

  return response.json();
};

// 판매자 프로필 조회
export const fetchSellerById = async (sellerId: string): Promise<UserWithProducts> => {
  const res = await fetch(`${API_BASE_URL}/user/${sellerId}`);
  if (!res.ok) throw new Error('사용자를 찾을 수 없습니다.');
  return res.json();
};

// 내 상품과 찜상품 목록 조회
export const fetchMyPageData = async (): Promise<MyPageData> => {
  const response = await fetch(`${API_BASE_URL}/users/mypage`);
  if (!response.ok) {
    throw new Error('마이페이지 데이터를 불러오는데 실패했습니다.');
  }
  return response.json();
};

// 상품 등록
export const createProduct = async (
  productData: CreateProductRequest,
): Promise<CreateProductResponse> => {
  const formData = new FormData();

  // 텍스트 데이터 추가
  formData.append('title', productData.title);
  formData.append('description', productData.description);
  formData.append('price', productData.price.toString());
  formData.append('pet_type_code', productData.pet_type_code);
  formData.append('pet_type_detail_code', productData.pet_type_detail_code);
  formData.append('category_code', productData.category_code);
  formData.append('condition_status', productData.condition_status);
  formData.append('state_code', productData.state_code);
  formData.append('city_code', productData.city_code);

  // 이미지 파일 추가
  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  }

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 400) {
      const error = await response.json();
      throw new Error(error.error || '입력 정보를 확인해주세요.');
    }
    throw new Error('상품 등록에 실패했습니다.');
  }

  return response.json();
};

// 상품 수정
export const updateProduct = async (
  productId: string,
  productData: CreateProductRequest,
): Promise<CreateProductResponse> => {
  const formData = new FormData();

  // 텍스트 데이터 추가
  formData.append('title', productData.title);
  formData.append('description', productData.description);
  formData.append('price', productData.price.toString());
  formData.append('pet_type_code', productData.pet_type_code);
  formData.append('pet_type_detail_code', productData.pet_type_detail_code);
  formData.append('category_code', productData.category_code);
  formData.append('condition_status', productData.condition_status);
  formData.append('state_code', productData.state_code);
  formData.append('city_code', productData.city_code);

  // 이미지 파일 추가
  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  }

  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    if (response.status === 400) {
      const error = await response.json();
      throw new Error(error.error || '입력 정보를 확인해주세요.');
    }
    throw new Error('상품 수정에 실패했습니다.');
  }

  return response.json();
};

export const fetchMyLikes = async (): Promise<LikesResponse> => {
  const response = await fetch(`${API_BASE_URL}/likes`);
  if (!response.ok) {
    throw new Error('찜한 상품 데이터를 불러오는데 실패했습니다.');
  }
  return response.json();
};

export const addLike = async (productId: number): Promise<void> => {
  console.log('addLike 호출, productId:', productId);
  const res = await fetch(`${API_BASE_URL}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error('찜 추가 실패');
};

export const removeLike = async (productId: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/likes/${productId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('찜 취소 실패');
};
