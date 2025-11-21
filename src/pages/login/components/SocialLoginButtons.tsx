import { Button } from '@src/components/commons/button/Button'
import kakao from '@assets/images/kakao.svg'
import google from '@assets/images/google.svg'
// import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import { useUserStore } from '@src/store/userStore'
// const REDIRECT_URI: string = import.meta.env.VITE_KAKAO_REDIRECT_URI || `${window.location.origin}/oauth/kakao/callback`

export function SocialLoginButtons() {
  // const location = useLocation()
  // const setRedirectUrl = useUserStore((state) => state.setRedirectUrl)
  // const handleKakaoLogin = (): void => {
  //   console.log('카카오 로그인 시작')

  //   const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  //     REDIRECT_URI
  //   )}`

  //   console.log(kakaoAuthUrl)

  //   // 카카오 로그인 페이지로 이동
  //   window.location.href = kakaoAuthUrl.toString()
  // }
  // 로그인 페이지 접근 시 이전 페이지 저장
  // useEffect(() => {
  //   // state로 전달된 from이 있으면 사용, 없으면 document.referrer 사용
  //   const from = location.state?.from || document.referrer

  //   if (from) {
  //     // 로그인 관련 페이지가 아닌 경우만 저장
  //     const isAuthPage = from.includes('/signin') || from.includes('/signup') || from.includes('/oauth') || from.includes('/kakao')

  //     if (!isAuthPage) {
  //       // URL 객체로 파싱하여 pathname만 저장
  //       try {
  //         const url = new URL(from)
  //         // 같은 도메인인 경우만 저장
  //         if (url.origin === window.location.origin) {
  //           setRedirectUrl(url.pathname) // localStorage 대신 zustand 사용
  //           console.log(' 이전 페이지 저장:', url.pathname)
  //         }
  //       } catch {
  //         // from이 상대 경로인 경우
  //         if (from.startsWith('/')) {
  //           setRedirectUrl(from) // localStorage 대신 zustand 사용
  //           console.log('이전 페이지 저장:', from)
  //         }
  //       }
  //     }
  //   }
  // }, [location, setRedirectUrl])

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        iconSrc={kakao}
        size="md"
        className="w-full cursor-pointer bg-[#fee500]"
        // onClick={handleKakaoLogin}
      >
        카카오 간편 로그인
      </Button>
      <Button iconSrc={google} size="md" className="w-full cursor-pointer bg-[#F2F2F2]">
        구글 간편 로그인
      </Button>
    </div>
  )
}
