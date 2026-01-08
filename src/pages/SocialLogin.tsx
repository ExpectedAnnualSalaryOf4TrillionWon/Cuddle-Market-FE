import logo from '@assets/images/CuddleMarketLogoBase.png'
import kakao from '@assets/images/kakao.svg'
import { useUserStore } from '@store/userStore'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

//  React.FC : "Login은 React 함수형 컴포넌트야!" 라고 타입스크립트에게 알려주는 것
function Login() {
  const location = useLocation()
  const setRedirectUrl = useUserStore((state) => state.setRedirectUrl)
  const KAKAO_CLIENT_ID: string = import.meta.env.VITE_KAKAO_CLIENT_ID || ''
  const REDIRECT_URI: string = import.meta.env.VITE_KAKAO_REDIRECT_URI || `${window.location.origin}/oauth/kakao/callback`

  // 카카오 로그인 시작
  const handleKakaoLogin = (): void => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`

    // 카카오 로그인 페이지로 이동
    window.location.href = kakaoAuthUrl.toString()
  }
  // 로그인 페이지 접근 시 이전 페이지 저장
  useEffect(() => {
    // state로 전달된 from이 있으면 사용, 없으면 document.referrer 사용
    const from = location.state?.from || document.referrer

    if (from) {
      // 로그인 관련 페이지가 아닌 경우만 저장
      const isAuthPage = from.includes('/signin') || from.includes('/signup') || from.includes('/oauth') || from.includes('/kakao')

      if (!isAuthPage) {
        // URL 객체로 파싱하여 pathname만 저장
        try {
          const url = new URL(from)
          // 같은 도메인인 경우만 저장
          if (url.origin === window.location.origin) {
            setRedirectUrl(url.pathname) // localStorage 대신 zustand 사용
          }
        } catch {
          // from이 상대 경로인 경우
          if (from.startsWith('/')) {
            setRedirectUrl(from) // localStorage 대신 zustand 사용
          }
        }
      }
    }
  }, [location, setRedirectUrl])

  return (
    <div className="bg-primary flex h-[90vh] items-center justify-center px-5">
      <div className="bg-light/90 gap-md p-2xl flex h-[400px] min-h-[350px] w-full max-w-[500px] min-w-[250px] flex-col items-center justify-center rounded-xl shadow-xl">
        <div className="tablet:w-[15vw] flex h-auto w-[40vw] max-w-[300px] items-center justify-center">
          <img src={logo} alt="Cuddle Market 로고" className="mb-xl h-full w-full object-contain" />
        </div>

        <button
          type="submit"
          onClick={handleKakaoLogin}
          className="gap-sm text- flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#fee500] px-2 py-2 font-semibold shadow-lg"
        >
          <div className="w-lg">
            <img src={kakao} className="h-full w-full object-cover" />
          </div>
          <span className="text-lg">카카오톡으로 시작하기</span>
        </button>
      </div>
    </div>
  )
}

export default Login
