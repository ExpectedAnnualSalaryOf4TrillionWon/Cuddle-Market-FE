import { TitleSection } from '../login/components/TitleSection'
import { ROUTES } from '@src/constants/routes'
import { SignUpForm } from './components/SignUpForm'

function Signup() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-baseline bg-white py-10 md:justify-center md:bg-[#F3F4F6]">
      <div className="flex min-w-full flex-col items-center gap-9 rounded-[20px] bg-white px-5 md:min-w-[530px] md:py-10">
        <TitleSection title="회원가입" desc="이미 계정이 있으신가요?" link="로그인하기" linkPath={ROUTES.LOGIN} />
        <SignUpForm />
      </div>
    </div>
  )
}

export default Signup
