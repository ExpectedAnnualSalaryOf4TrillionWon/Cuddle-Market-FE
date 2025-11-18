import { ROUTES } from '@src/constants/routes'
import { Link } from 'react-router-dom'
import kakao from '@assets/images/kakao.svg'
import google from '@assets/images/google.svg'
import { Input } from '@src/components/commons/Input'
import { Button } from '@src/components/commons/button/Button'

function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F3F4F6]">
      <div className="flex min-w-[400px] flex-col items-center gap-10 rounded-[20px] bg-white px-5 py-10">
        {/* 타이틀 섹션 */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="heading-h2">로그인</h2>
          <div className="flex items-center gap-2">
            <span className="">아직 계정이 없으신가요?</span>
            <Link to={ROUTES.SIGNUP} className="text-primary-600">
              회원가입하기
            </Link>
          </div>
        </div>
        {/* 소셜 로그인 버튼 */}
        <div className="flex w-full flex-col gap-2">
          <button className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#fee500] px-8 py-2">
            <div className="h-auto w-4">
              <img src={kakao} className="h-full w-full object-cover" />
            </div>
            <span className="">카카오 간편 로그인</span>
          </button>
          <button className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#F2F2F2] px-8 py-2">
            <div className="h-auto w-4">
              <img src={google} className="h-full w-full object-cover" />
            </div>
            <span className="">구글 간편 로그인</span>
          </button>
        </div>
        {/* 로그인 폼 */}
        <form action="" className="w-full">
          <fieldset className="flex flex-col gap-3">
            <legend className="sr-only">로그인폼</legend>
            <div className="flex flex-col gap-2">
              <Input type="email" placeholder="아이디 (example@cuddle.com)" backgroundColor="bg-primary-50" size="text-sm" />
              <Input
                type="password"
                placeholder="비밀번호 (10~30자의 영문 대소문자, 숫자, 특수문자 포함)"
                backgroundColor="bg-primary-50"
                size="text-sm"
              />
            </div>
            <Link to={ROUTES.FIND_PASSWORD} className="text-primary-300 text-sm font-medium">
              비밀번호를 잊으셨나요?
            </Link>
            <Button size="md" className="bg-primary-300 w-full text-white">
              일반회원 로그인
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Login
