import { Button } from '@src/components/commons/button/Button'
import { AddressField } from '@src/pages/signup/components/AddressField'
import { useForm } from 'react-hook-form'
import { type Province } from '@src/constants/cities'
import { useState } from 'react'
import { NameField } from './NameField'
import { NicknameField } from './NicknameField'
import { EmailValidCode } from './EmailValidCode'
import { PasswordField } from './PasswordField'
import { BirthDateField } from './BirthDateField'
import { login, signup } from '@src/api/auth'
import type { SignUpRequestData } from '@src/types'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@src/store/userStore'

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
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    watch, // register를 통해 받은 모든 값 확인
    setValue,
    setError,
    clearErrors,
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

  const [isNicknameVerified, setIsNicknameVerified] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isEmailCodeVerified, setIsEmailCodeVerified] = useState(false)
  const navigate = useNavigate()

  const { handleLogin } = useUserStore()

  const onSubmit = async (data: SignUpFormValues) => {
    // 검증 완료 여부 확인
    let hasError = false

    if (!isNicknameVerified) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임 중복 확인을 완료해주세요.',
      })
      hasError = true
    }

    if (!isEmailVerified) {
      setError('email', {
        type: 'manual',
        message: '이메일 중복 확인을 완료해주세요.',
      })
      hasError = true
    }

    if (!isEmailCodeVerified) {
      setError('emailCode', {
        type: 'manual',
        message: '이메일 인증을 완료해주세요.',
      })
      hasError = true
    }

    if (hasError) {
      return
    }

    const requestData: SignUpRequestData = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      birthDate: data.birthDate,
      addressSido: data.addressSido,
      addressGugun: data.addressGugun,
    }

    try {
      const response = await signup(requestData)
      console.log('회원가입 성공:', response)
      const loginResponse = await login({
        email: data.email,
        password: data.password,
      })
      handleLogin(loginResponse.data.user, loginResponse.data.accessToken)

      navigate('/')
    } catch (error) {
      console.error('회원가입 실패:', error)
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-9">
        <legend className="sr-only">회원가입폼</legend>
        <div className="flex flex-col gap-6">
          <NameField register={register} errors={errors} />
          <NicknameField register={register} errors={errors} watch={watch} setIsNicknameVerified={setIsNicknameVerified} clearErrors={clearErrors} />
          <AddressField control={control} watch={watch} setValue={setValue} />
          <BirthDateField control={control} />
          <EmailValidCode
            register={register}
            errors={errors}
            watch={watch}
            setIsEmailVerified={setIsEmailVerified}
            setIsEmailCodeVerified={setIsEmailCodeVerified}
            clearErrors={clearErrors}
          />
          <PasswordField register={register} errors={errors} watch={watch} setError={setError} clearErrors={clearErrors} />
        </div>
        <Button size="md" className="bg-primary-300 w-full cursor-pointer text-white" type="submit">
          회원가입
        </Button>
      </fieldset>
    </form>
  )
}
