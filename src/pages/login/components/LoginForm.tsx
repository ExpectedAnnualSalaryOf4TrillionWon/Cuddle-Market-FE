import { Link } from 'react-router-dom'
import { Button } from '@src/components/commons/button/Button'
import { ROUTES } from '@src/constants/routes'
import { useForm } from 'react-hook-form'
import { InputField } from '@src/components/commons/InputField'

interface LoginFormValues {
  email: string
  password: string
}

export function LoginForm() {
  const {
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    formState: { errors }, // errors: register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<LoginFormValues>() // 폼에서 관리할 필드들의 타입(이름) 정의.

  const onSubmit = () => {
    console.log('제출')
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">로그인폼</legend>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <InputField
              type="email"
              placeholder="아이디 (example@cuddle.com)"
              backgroundColor="bg-primary-50"
              size="text-sm"
              error={errors.email}
              registration={register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '이메일 형식이 올바르지 않습니다',
                },
              })}
            />
            <InputField
              type="password"
              placeholder="비밀번호 (10~30자의 영문 대소문자, 숫자, 특수문자 포함)"
              backgroundColor="bg-primary-50"
              size="text-sm"
              error={errors.password}
              registration={register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 10,
                  message: '비밀번호는 최소 10자 이상이어야 합니다',
                },
                maxLength: {
                  value: 30,
                  message: '비밀번호는 최대 30자까지 가능합니다',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).+$/,
                  message: '영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다',
                },
              })}
            />
          </div>
          <Link to={ROUTES.FIND_PASSWORD} className="text-primary-300 text-sm font-medium">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <Button size="md" className="bg-primary-300 w-full text-white" type="submit">
          일반회원 로그인
        </Button>
      </fieldset>
    </form>
  )
}
