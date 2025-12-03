import type {
  ImageUploadResponse,
  // FilterApiResponse,
  MyBlockedUsersResponse,
  MyPageDataResponse,
  MyPageProductResponse,
  ProductDetailItemResponse,
  ProductPostRequestData,
  ProductPostResponse,
  ProductResponse,
  RequestProductPostRequestData,
  WithDrawRequest,
  WithDrawResponse,
} from '../types'
import { api } from './api'

import type { TransactionStatus } from '@src/constants/constants'

export const withDraw = async (requestData: WithDrawRequest) => {
  await api.delete<WithDrawResponse>(`/auth/withdraw`, { data: requestData })
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
export const fetchMyProductData = async (page: number = 0) => {
  const response = await api.get<MyPageProductResponse>(`/profile/me/products?page=${page}&size=10`)
  return response.data.data
}

// 내가 등록한 판매요청 상품 조회
export const fetchMyRequestData = async (page: number = 0) => {
  const response = await api.get<MyPageProductResponse>(`/profile/me/purchase-requests?page=${page}&size=10`)
  return response.data.data
}

// 내가 찜한 상품 조회
export const fetchMyFavoriteData = async (page: number = 0) => {
  const response = await api.get<MyPageProductResponse>(`/profile/me/favorites?page=${page}&size=10`)
  return response.data.data
}

// 내가 차단한 유저 조회
export const fetchMyBlockedData = async (page: number = 0) => {
  const response = await api.get<MyBlockedUsersResponse>(`/profile/me/blocked-users?page=${page}&size=10`)
  return response.data.data.blockedUsers
}

// 상품 거래상태 변경
export const patchProductTradeStatus = async (id: number, requestData: TransactionStatus) => {
  const response = await api.patch<ProductPostResponse>(`/products/${id}/trade-status`, { tradeStatus: requestData })
  return response.data
}

export const deleteProduct = async (id: number) => {
  const response = await api.delete<ProductPostResponse>(`/products/${id}`)
  return response.data
}
