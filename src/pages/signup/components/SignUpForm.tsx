import { Button } from '@src/components/commons/button/Button'
import { useForm } from 'react-hook-form'
import { type Province } from '@src/constants/cities'
import { useEffect } from 'react'
import { NameField } from './NameField'
import { NicknameField } from './NicknameField'
import { AddressField } from './AddressField'
import { EmailValidCode } from './EmailValidCode'
import { PasswordField } from './PasswordField'
import { BirthDateField } from './BirthDateField'

export interface SignUpFormValues {
  email: string
  emailCode: string
  password: string
  passwordConfirm: string
  name: string
  nickname: string
  birthDate: string
  addressSido: Province | ''
  addressGugun: string
}

export function SignUpForm() {
  const {
    control,
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 “이 필드는 폼의 어떤 이름이다”라고 연결해주는 함수
    watch, // register를 통해 받은 모든 값 확인
    setValue,
    formState: { errors }, // errors: register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      emailCode: '',
      password: '',
      passwordConfirm: '',
      name: '',
      nickname: '',
      birthDate: '',
      addressSido: '',
      addressGugun: '',
    },
  }) // 폼에서 관리할 필드들의 타입(이름) 정의.

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(e)
    console.log('제출')
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(() => onSubmit)}>
      <fieldset className="flex flex-col gap-9">
        <legend className="sr-only">회원가입폼</legend>
        <div className="flex flex-col gap-6">
          <NameField register={register} errors={errors} />
          <NicknameField register={register} errors={errors} watch={watch} />
          <AddressField control={control} watch={watch} setValue={setValue} />
          <BirthDateField control={control} />
          <EmailValidCode register={register} errors={errors} watch={watch} />
          <PasswordField register={register} errors={errors} watch={watch} />
        </div>
        <Button size="md" className="bg-primary-300 w-full cursor-pointer text-white" type="submit">
          일반회원 로그인
        </Button>
      </fieldset>
    </form>
  )
}
