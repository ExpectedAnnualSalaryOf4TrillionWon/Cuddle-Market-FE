import type {
  ChangePasswordRequestData,
  ChangePasswordResponse,
  ProfileUpdateRequestData,
  ProfileUpdateResponse,
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
