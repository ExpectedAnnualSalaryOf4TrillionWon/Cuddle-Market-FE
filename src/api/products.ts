import type {
  CreateProductRequest,
  CreateProductResponse,
  LikesResponse,
  MyPageData,
  Product,
  ProductDetailItem,
  User,
  UserWithProducts,
} from '../types';
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
export const fetchProductById = async (productId: string): Promise<ProductDetailItem> => {
  const url = `${API_BASE_URL}/products/${productId}`;

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
export const fetchSellerById = async (sellerId: string): Promise<UserWithProducts> => {
  const res = await fetch(`${API_BASE_URL}/user/${sellerId}`);
  if (!res.ok) throw new Error('사용자를 찾을 수 없습니다.');
  return res.json();
};

// 내 프로필 조회 : 이건 전역상태의 값에서 추출해와야 합니다.
export const fetchMyInfo = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/mypage`);
  if (!response.ok) {
    throw new Error('내 정보를 불러오는데 실패했습니다.');
  }
  return response.json();
};

// 내 상품과 찜상품 목록 조회 : api 주소가 위의 프로필 조회 api 주소로 변경되어야 합니다.
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
  // FormData 생성 (파일 업로드를 위해)
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
    // FormData를 사용할 때는 Content-Type을 설정하지 않음 (자동 설정됨)
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

export const fetchMyLikes = async (): Promise<LikesResponse> => {
  const response = await fetch(`${API_BASE_URL}/likes`);
  if (!response.ok) {
    throw new Error('마이페이지 데이터를 불러오는데 실패했습니다.');
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
