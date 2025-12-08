import type {
  ChangePasswordRequestData,
  ChangePasswordResponse,
  ProfileUpdateRequestData,
  ProfileUpdateResponse,
  UserBlockedResponse,
  UserProductResponse,
  UserProfileResponse,
  UserReportedRequestData,
  UserReportedResponse,
  UserUnBlockedResponse,
  WithDrawRequest,
  WithDrawResponse,
} from '../types'
import { api } from './api'

export const withDraw = async (requestData: WithDrawRequest) => {
  await api.delete<WithDrawResponse>(`/auth/withdraw`, { data: requestData })
}

export const profileUpdate = async (requestData: ProfileUpdateRequestData) => {
  const response = await api.patch<ProfileUpdateResponse>(`/profile/me`, requestData)
  return response.data
}

export const changePassword = async (requestData: ChangePasswordRequestData) => {
  const response = await api.patch<ChangePasswordResponse>(`/auth/password/change`, requestData)
  return response.data
}

export const fetchUserData = async (id: number) => {
  const response = await api.get<UserProfileResponse>(`/profile/${id}`)
  return response.data.data
}

export const fetchUserProductData = async (id: string | number, page: number = 0) => {
  const response = await api.get<UserProductResponse>(`/profile/${id}/products?page=${page}&size=10`)
  return response.data.data
}

export const userBlocked = async (blockedUserId: number) => {
  const response = await api.post<UserBlockedResponse>(`/reports/blocks/users/${blockedUserId}`)
  return response.data.data
}
export const userUnBlocked = async (blockedUserId: number) => {
  await api.delete<UserUnBlockedResponse>(`/reports/blocks/users/${blockedUserId}`)
}

export const userReported = async (targetUserId: number, requestData: UserReportedRequestData) => {
  const response = await api.post<UserReportedResponse>(`/reports/users/${targetUserId}`, requestData)
  return response.data.data
}
