import { Button } from '@src/components/commons/button/Button'
import kakao from '@assets/images/kakao.svg'
import google from '@assets/images/google.svg'
export function SocialLoginButtons() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Button iconSrc={kakao} size="md" className="w-full bg-[#fee500]">
        카카오 간편 로그인
      </Button>
      <Button iconSrc={google} size="md" className="w-full bg-[#F2F2F2]">
        구글 간편 로그인
      </Button>
    </div>
  )
}
