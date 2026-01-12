import { api } from '@src/api/api'
import { useUserStore } from '@src/store/userStore'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SocialCallback() {
  const navigate = useNavigate()
  const { handleLogin, setAccessToken, setRefreshToken } = useUserStore()

  const handleSocialAuth = useCallback(
    async (accessToken: string, refreshToken: string) => {
      console.log('[SocialCallback] 1. 기존 상태 클리어 후 토큰 저장 시작', new Date().toISOString())
      // 1. 기존 상태 클리어 후 새 토큰 저장 (회원탈퇴 후 재로그인 시 옛날 토큰 문제 방지)
      useUserStore.getState().clearAll()
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

      console.log('[SocialCallback] 2. /profile/me API 호출 시작', new Date().toISOString())
      // 2. 토큰으로 user 정보 조회 API 호출
      const userResponse = await api.get('/profile/me')
      console.log('[SocialCallback] 3. /profile/me API 응답 완료', new Date().toISOString())
      const user = userResponse.data.data

      handleLogin(user, accessToken, refreshToken)
      console.log('[SocialCallback] 4. handleLogin 완료', new Date().toISOString())

      // 3. localStorage에 persist가 완료될 때까지 대기
      await new Promise((resolve) => setTimeout(resolve, 100))

      // 4. 저장된 redirectUrl이 있으면 해당 페이지로, 없으면 홈으로 이동
      const redirectUrl = useUserStore.getState().redirectUrl
      console.log('[SocialCallback] 5. 페이지 이동:', redirectUrl || '/')
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

    // 디버깅: URL 파라미터 확인
    console.log('[SocialCallback] 현재 URL:', window.location.href)
    console.log('[SocialCallback] accessToken:', accessToken ? '있음' : '없음')
    console.log('[SocialCallback] refreshToken:', refreshToken ? '있음' : '없음')

    if (accessToken && refreshToken) {
      handleSocialAuth(accessToken, refreshToken)
    } else {
      console.log('[SocialCallback] 토큰이 없어서 /login으로 이동')
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
