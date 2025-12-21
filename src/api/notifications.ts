import type { NotificationsDataResponse, NotificationsPatchResponse, NotificationsUnReadCountResponse } from '@src/types/notifications'
import type {
  EmailCheckResponse,
  ResettingPasswordRequestData,
  ResettingPasswordResponse,
  UserBlockedResponse,
  UserProductResponse,
  ReportedRequestData,
  ReportedResponse,
  UserUnBlockedResponse,
} from '../types'
import { api } from './api'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// 알림 목록 조회
export const fetchNotifications = async (page: number = 0, size: number = 10) => {
  const response = await api.get<NotificationsDataResponse>(`/notifications?page=${page}&size=${size}`)
  return response.data.data
}

// 모든 알림 읽음 처리
export const patchNotifications = async () => {
  await api.patch<NotificationsPatchResponse>(`/profile/notifications/read-all`)
}

// 알림 읽음 처리
export const readNotification = async (notificationId: number) => {
  await api.patch<NotificationsPatchResponse>(`/notifications/${notificationId}/read`)
}

// 안 읽은 알림 조회
export const getUnreadCount = async () => {
  const response = await api.get<NotificationsUnReadCountResponse>(`/notifications/unread-count`)
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

export const userReported = async (targetUserId: number, requestData: ReportedRequestData) => {
  const response = await api.post<ReportedResponse>(`/reports/users/${targetUserId}`, requestData)
  return response.data.data
}

export const sendValidCode = async (email: string): Promise<EmailCheckResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/password/reset/send`, { email })
  console.log(response)
  console.log(response.data)

  return response.data
}

export const checkValidCode = async (email: string, code: string): Promise<EmailCheckResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/password/reset/verify`, { email, verificationCode: code })
  console.log(response)
  console.log(response.data)
  return response.data
}

export const reSettingPassword = async (requestData: ResettingPasswordRequestData) => {
  const response = await api.patch<ResettingPasswordResponse>(`/auth/password/reset`, requestData)
  return response.data
}
