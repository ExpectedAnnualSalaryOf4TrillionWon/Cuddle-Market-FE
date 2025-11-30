import type {
  CreateProductRequest,
  CreateProductResponse,
  ImageUploadResponse,
  // FilterApiResponse,
  LikesResponse,
  MyBlockedUsersResponse,
  MyPageDataResponse,
  MyPageProductResponse,
  ProductDetailItemResponse,
  ProductPostRequestData,
  ProductResponse,
  RequestProductPostRequestData,
} from '../types'
import { apiFetch } from './apiFetch'
import { api } from './api'

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// 상품 목록 조회
export const fetchAllProducts = async (
  page: number = 0,
  size: number = 20,
  productType?: string,
  selectedProductStatus?: string | null,
  minPrice?: number | null,
  maxPrice?: number | null,
  addressSido?: string | null,
  addressGugun?: string | null,
  selectedCategory?: string | null,
  petType?: string | null,
  selectedDetailPet?: string | null,
  keyword?: string | null,
  sortBy?: string | null,
  sortOrder?: string | null
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  if (keyword) {
    params.append('keyword', keyword)
  }
  if (petType) {
    params.append('petType', petType)
  }
  if (selectedDetailPet) {
    params.append('petDetailType', selectedDetailPet)
  }
  if (productType) {
    params.append('productType', productType)
  }

  if (selectedProductStatus) {
    params.append('productStatuses', selectedProductStatus)
  }

  if (minPrice !== null && minPrice !== undefined) {
    params.append('minPrice', minPrice.toString())
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    params.append('maxPrice', maxPrice.toString())
  }

  if (addressSido) {
    params.append('addressSido', addressSido)
  }

  if (addressGugun) {
    params.append('addressGugun', addressGugun)
  }
  if (selectedCategory) {
    params.append('categories', selectedCategory)
  }
  if (sortBy) {
    params.append('sortBy', sortBy)
  }
  if (sortOrder) {
    params.append('sortOrder', sortOrder)
  }

  const response = await axios.get<ProductResponse>(`${API_BASE_URL}/products/search?${params.toString()}`)

  return {
    data: response.data,
    total: response.data.data.totalElements,
  }
}

// 상품 상세 조회
// api를 사용하면 자동으로:
// 1. Authorization 헤더에 access token 추가
// 2. 401 에러 시 토큰 갱신 후 재요청
export const fetchProductById = async (productId: string) => {
  const response = await api.get<ProductDetailItemResponse>(`/products/${productId}`)
  return response.data.data
}

// 찜 추가
export const addFavorite = async (productId: number): Promise<void> => {
  await api.post(`/products/${productId}/favorite`)
}

// 판매 상품 등록
export const postProduct = async (requestData: ProductPostRequestData): Promise<void> => {
  await api.post(`/products`, requestData)
}

// 판매요청 상품 등록
export const requestPostProduct = async (requestData: RequestProductPostRequestData): Promise<void> => {
  await api.post(`/products/requests`, requestData)
}

// 이미지 업로드
export const uploadImage = async (files: File[]): Promise<ImageUploadResponse['data']> => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })
  // FormData를 전달하면 axios가 자동으로 Content-Type: multipart/form-data를 설정함
  const response = await api.post<ImageUploadResponse>('/images', formData)
  return response.data.data
}

// 마이페이지 조회
export const fetchMyPageData = async () => {
  const response = await api.get<MyPageDataResponse>(`/profile/me`)
  return response.data.data
}

// 내가 등록한 판매상품 조회
export const fetchMyProductData = async () => {
  const response = await api.get<MyPageProductResponse>(`/profile/me/products?&size=10`)
  return response.data.data
}

// 내가 등록한 판매요청 상품 조회
export const fetchMyRequestData = async () => {
  const response = await api.get<MyPageProductResponse>(`/profile/me/purchase-requests?&size=10`)
  return response.data.data
}

// 내가 찜한 상품 조회
export const fetchMyFavoriteData = async () => {
  const response = await api.get<MyPageProductResponse>(`/profile/me/favorites?&size=10`)
  return response.data.data
}

export const fetchMyBlockedData = async () => {
  const response = await api.get<MyBlockedUsersResponse>(`/profile/me/blocked-users?&size=10`)
  return response.data.data.blockedUsers
}

// export const fetchAllCategory = async (): Promise<FilterApiResponse> => {
//   const data = await apiFetch(`${API_BASE_URL}/categories/all-get`)
//   return data
// }

// 판매자 프로필 조회
// export const fetchSellerById = async (sellerId: string): Promise<UserWithProducts> => {
//   const res = await fetch(`${API_BASE_URL}/user/${sellerId}`);
//   if (!res.ok) throw new Error('사용자를 찾을 수 없습니다.');
//   return res.json();
// };

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
