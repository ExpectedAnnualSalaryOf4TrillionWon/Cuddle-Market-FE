import type {
  NicknameCheckResponse,
  EmailCheckResponse,
  SignUpRequestData,
  SignUpResponse,
  LoginRequestData,
  LoginResponse,
} from '../types'
// import { apiFetch } from './apiFetch'
import axios from 'axios'
import { api } from './api'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const checkNickname = async (nickname: string): Promise<NicknameCheckResponse> => {
  const response = await axios.get(`${API_BASE_URL}/auth/nickname/check?nickname=${nickname}`)
  console.log(response)
  return response.data
}

export const checkEmail = async (email: string): Promise<EmailCheckResponse> => {
  const response = await axios.get(`${API_BASE_URL}/auth/email/check?email=${email}`)
  console.log(response)
  return response.data
}

export const sendEmailValidCode = async (email: string): Promise<EmailCheckResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/email/verification/send`, { email })
  console.log(response)
  console.log(response.data)

  return response.data
}

export const checkEmailValidCode = async (email: string, code: string): Promise<EmailCheckResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/email/verification/verify`, { email, verificationCode: code })
  console.log(response)
  console.log(response.data)
  return response.data
}

export const signup = async (requestData: SignUpRequestData): Promise<SignUpResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, requestData)
  console.log(response)
  console.log(response.data)
  return response.data
}

export const login = async (requestData: LoginRequestData): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, requestData, {
    withCredentials: true,
  })
  console.log(response)
  console.log(response.data)
  return response.data
}

export const logout = async (): Promise<void> => {
  const response = await api.post(`/auth/logout`)
  console.log(response)
  console.log(response.data)
  return response.data
}
