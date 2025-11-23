import type {
  CreateProductRequest,
  CreateProductResponse,
  FilterApiResponse,
  LikesResponse,
  MyPageData,
  ProductDetailItem,
  ProductResponse,
} from '../types'

import axios from 'axios'

import { apiFetch } from './apiFetch'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const fetchAllProducts = async (page: number = 0, size: number = 20, productType?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  if (productType) {
    params.append('productType', productType)
  }

  const response = await axios.get<ProductResponse>(`${API_BASE_URL}/products/search?${params.toString()}`)
  console.log(response)

  return {
    data: response.data,
    total: response.data.data.totalElements,
  }
}

export const fetchAllCategory = async (): Promise<FilterApiResponse> => {
  const data = await apiFetch(`${API_BASE_URL}/categories/all-get`)
  return data
}

// export const fetchAllProducts = async (): Promise<ProductsResponse> => {
//   const data = await apiFetch(`${API_BASE_URL}/products`);
//   return data;
// };

// 상품 상세 조회
export const fetchProductById = async (productId: string): Promise<ProductDetailItem> => {
  const data = await apiFetch(`${API_BASE_URL}/products/${productId}`)

  return data
}

// 판매자 프로필 조회
// export const fetchSellerById = async (sellerId: string): Promise<UserWithProducts> => {
//   const res = await fetch(`${API_BASE_URL}/user/${sellerId}`);
//   if (!res.ok) throw new Error('사용자를 찾을 수 없습니다.');
//   return res.json();
// };

// 내 상품과 찜상품 목록 조회
export const fetchMyPageData = async (): Promise<MyPageData> => {
  const response = await fetch(`${API_BASE_URL}/likes/`, {})
  if (!response.ok) {
    throw new Error('마이페이지 데이터를 불러오는데 실패했습니다.')
  }
  return response.json()
}

// 상품 등록
export const createProduct = async (productData: CreateProductRequest): Promise<CreateProductResponse> => {
  const formData = new FormData()

  // 텍스트 데이터 추가
  formData.append('title', productData.title)
  formData.append('description', productData.description)
  formData.append('price', productData.price.toString())
  formData.append('pet_type_code', productData.pet_type_code)
  formData.append('pet_type_detail_code', productData.pet_type_detail_code)
  formData.append('category_code', productData.category_code)
  formData.append('state_code', productData.state_code)
  formData.append('city_code', productData.city_code)

  const conditionMap: Record<string, string> = {
    NEW: 'MINT', // 또는 백엔드가 실제로 기대하는 값
    LIKE_NEW: 'EXCELLENT',
    USED: 'GOOD',
    NEEDS_REPAIR: 'FAIR',
  }
  formData.append('condition_status', conditionMap[productData.condition_status] || productData.condition_status)
  // 이미지 파일 추가
  // if (productData.images && productData.images.length > 0) {
  //   productData.images.forEach((image, index) => {
  //     formData.append(`images[${index}]`, image);
  //   });
  // }
  // 첫 번째 이미지는 메인
  if (productData.images && productData.images.length > 0) {
    // 첫 번째 이미지는 메인 (복수형으로 변경)
    formData.append('main_images', productData.images[0])

    // 나머지는 서브 이미지
    productData.images.slice(1).forEach((image) => {
      formData.append('sub_images', image)
    })
  }

  try {
    const data = await apiFetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      body: formData, // FormData 직접 전달
    })

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('상품 등록에 실패했습니다.')
  }
}

// 상품 수정
export const updateProduct = async (productId: string, productData: CreateProductRequest): Promise<CreateProductResponse> => {
  const formData = new FormData()

  // 텍스트 데이터 추가
  formData.append('title', productData.title)
  formData.append('description', productData.description)
  formData.append('price', productData.price.toString())
  formData.append('pet_type_code', productData.pet_type_code)
  formData.append('pet_type_detail_code', productData.pet_type_detail_code)
  formData.append('category_code', productData.category_code)
  formData.append('condition_status', productData.condition_status)
  formData.append('state_code', productData.state_code)
  formData.append('city_code', productData.city_code)

  // 이미지 파일 추가
  if (productData.images && productData.images.length > 0) {
    productData.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image)
    })
  }

  try {
    const data = await apiFetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PATCH',
      body: formData,
    })

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('상품 수정에 실패했습니다.')
  }
}

export const fetchMyLikes = async (): Promise<LikesResponse> => {
  const response = await fetch(`${API_BASE_URL}/likes`)
  if (!response.ok) {
    throw new Error('찜한 상품 데이터를 불러오는데 실패했습니다.')
  }
  return response.json()
}

export const addLike = async (productId: number): Promise<void> => {
  console.log('addLike 호출, productId:', productId)
  const res = await fetch(`${API_BASE_URL}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId }),
  })
  if (!res.ok) throw new Error('찜 추가 실패')
}

export const removeLike = async (productId: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/likes/${productId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('찜 취소 실패')
}
