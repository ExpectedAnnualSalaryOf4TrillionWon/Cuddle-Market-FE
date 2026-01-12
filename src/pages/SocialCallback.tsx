import { api } from '@src/api/api'
import { useUserStore } from '@src/store/userStore'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SocialCallback() {
  const navigate = useNavigate()
  const { handleLogin, setAccessToken, setRefreshToken } = useUserStore()

  const handleSocialAuth = useCallback(
    async (accessToken: string, refreshToken: string) => {
      // 1. 기존 상태 클리어 후 새 토큰 저장 (회원탈퇴 후 재로그인 시 옛날 토큰 문제 방지)
      useUserStore.getState().clearAll()
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

      // 2. 토큰으로 user 정보 조회 API 호출
      const userResponse = await api.get('/profile/me')
      const user = userResponse.data.data

      handleLogin(user, accessToken, refreshToken)

      // 3. localStorage에 persist가 완료될 때까지 대기
      await new Promise((resolve) => setTimeout(resolve, 100))

      // 4. 저장된 redirectUrl이 있으면 해당 페이지로, 없으면 홈으로 이동
      const redirectUrl = useUserStore.getState().redirectUrl
      navigate(redirectUrl || '/')
      useUserStore.getState().setRedirectUrl(null)
    },
    [setAccessToken, setRefreshToken, handleLogin, navigate]
  )

  useEffect(() => {
    // URL에서 토큰 추출
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('accessToken')
    const refreshToken = params.get('refreshToken')

    if (accessToken && refreshToken) {
      handleSocialAuth(accessToken, refreshToken)
    } else {
      navigate('/login')
    }
  }, [handleSocialAuth, navigate])
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>로그인 처리 중...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  )
}
