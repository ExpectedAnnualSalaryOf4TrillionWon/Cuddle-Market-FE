import type { NicknameCheckResponse, EmailCheckResponse } from '../types'
import { apiFetch } from './apiFetch'
import axios from 'axios'

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
  const response = await axios.post(`${API_BASE_URL}/auth/${email}/verification/send`)
  console.log(response)
  return response.data
}
