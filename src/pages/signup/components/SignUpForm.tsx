import { Link } from 'react-router-dom'
import { Button } from '@src/components/commons/button/Button'
import { ROUTES } from '@src/constants/routes'
import { useForm } from 'react-hook-form'
import { InputField } from '@src/components/commons/InputField'

interface SignUpFormValues {
  email: string
  password: string
  text: string
}

export function SignUpForm() {
  const {
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 “이 필드는 폼의 어떤 이름이다”라고 연결해주는 함수
    watch, // register를 통해 받은 모든 값 확인
    formState: { errors }, // errors: register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<SignUpFormValues>() // 폼에서 관리할 필드들의 타입(이름) 정의.

  const onSubmit = (data: SignUpFormValues) => {
    console.log('제출')
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">회원가입폼</legend>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <InputField
              type="text"
              placeholder="이름을 입력해주세요"
              size="text-sm"
              border
              borderColor="border-gray-400"
              error={errors.text}
              registration={register('text', {
                required: '이름을 입력해주세요',
                maxLength: {
                  value: 10,
                  message: '비밀번호는 최대 10자까지 가능합니다',
                },
              })}
            />
            <div className="flex gap-4">
              <InputField
                type="text"
                placeholder="닉네임을 입력해주세요"
                size="text-sm"
                border
                borderColor="border-gray-400"
                error={errors.text}
                classname="flex-1"
                registration={register('text', {
                  required: '닉네임을 입력해주세요',
                  maxLength: {
                    value: 30,
                    message: '비밀번호는 최대 30자까지 가능합니다',
                  },
                })}
              />
              <Button size="md" className="bg-primary-50 text-primary-500" type="button">
                중복체크
              </Button>
            </div>
          </div>
        </div>
        <Button size="md" className="bg-primary-300 w-full text-white" type="submit">
          일반회원 로그인
        </Button>
      </fieldset>
    </form>
  )
}
