// utils/apiFetch.ts
import { useUserStore } from '@store/userStore'
// import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// 리프레시 토큰으로 액세스토큰 재발급 요청
async function refreshAccessToken() {
  const res = await fetch(`${API_BASE_URL}/users/token-refresh/`, {
    method: 'POST',
    credentials: 'include', // 리프레시 토큰이 쿠키로 제공
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Failed to refresh token')
  }

  const data = await res.json()

  // zustand store에 새 토큰 저장
  useUserStore.getState().setAccessToken(data.access)

  return data.access
}

// 메인 fetch 함수
export async function apiFetch(url: string, options: RequestInit = {}) {
  try {
    // zustand store에서 토큰 가져오기
    const accessToken = useUserStore.getState().accessToken

    // Content-Type 자동 설정 방지 (FormData의 경우)
    const isFormData = options.body instanceof FormData
    const headers: Record<string, string> = {}

    // FormData가 아닌 경우에만 Content-Type 설정
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }

    // 토큰이 있으면 추가
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    let res = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    })

    // 401 에러 처리
    if (res.status === 401) {
      try {
        // 토큰 갱신 시도
        const newAccessToken = await refreshAccessToken()

        // 새 토큰으로 다시 요청
        headers['Authorization'] = `Bearer ${newAccessToken}`

        res = await fetch(url, {
          ...options,
          credentials: 'include',
          headers,
        })
      } catch (refreshError) {
        // 리프레시 토큰도 만료 → 로그아웃 처리
        useUserStore.getState().clearAll()
        window.location.href = '/signin'
        throw refreshError
      }
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP error: ${res.status}`)
    }

    return res.json()
  } catch (err) {
    console.error('API Fetch Error:', err)
    throw err
  }
}
