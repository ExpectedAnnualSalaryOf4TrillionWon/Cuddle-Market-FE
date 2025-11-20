import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import { InputWithButton } from '@src/components/commons/InputWithButton'
import type { SignUpFormValues } from './SignUpForm'
import { type UseFormRegister, type FieldErrors, type UseFormWatch } from 'react-hook-form'
import { authValidationRules } from '@src/utils/validation/authValidationRules'
import { checkEmail, sendEmailValidCode } from '@src/api/auth'
import { useState } from 'react'

interface EmailValidCodeProps {
  watch: UseFormWatch<SignUpFormValues>
  register: UseFormRegister<SignUpFormValues>
  errors: FieldErrors<SignUpFormValues>
}

export function EmailValidCode({ register, errors, watch }: EmailValidCodeProps) {
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'success' | 'error'
    message: string
  }>({ status: 'idle', message: '' })

  const email = watch('email')

  const handleEmailCheck = async () => {
    try {
      const response = await checkEmail(email)

      if (response.data) {
        // 사용 가능 (data: true)
        setCheckResult({
          status: 'success',
          message: response.message, // "사용 가능한 이메일입니다."
        })
      } else {
        // 중복 (data: false)
        setCheckResult({
          status: 'error',
          message: response.message, // "이미 사용 중인 이메일입니다."
        })
      }
    } catch {
      setCheckResult({
        status: 'error',
        message: '이메일 확인 중 오류가 발생했습니다.',
      })
    }
  }

  const handleSendVaildCode = async () => {
    try {
      await sendEmailValidCode(email)
      setCheckResult({
        status: 'success',
        message: '인증 번호를 발송했습니다.',
      })
    } catch {
      setCheckResult({
        status: 'error',
        message: '인증코드 오류. 인증코드를 다시 받아주세요.',
      })
    }
  }
  return (
    <div className="flex flex-col gap-2.5">
      <RequiredLabel htmlFor="signup-email">이메일</RequiredLabel>
      <div className="flex flex-col gap-4">
        <InputWithButton
          id="signup-email"
          type="email"
          placeholder="example@gmail.com"
          error={errors.email}
          checkResult={checkResult}
          registration={register('email', authValidationRules.email)}
          buttonText={checkResult.status === 'success' ? '인증코드 전송' : '중복체크'}
          onButtonClick={checkResult.status === 'success' ? handleSendVaildCode : handleEmailCheck}
        />
        <InputWithButton
          id="signup-email-code"
          type="text"
          placeholder="전송된 코드를 입력해주세요"
          error={errors.emailCode}
          registration={register('emailCode', authValidationRules.emailCode)}
          buttonText="인증코드 확인"
          buttonClassName="cursor-pointer bg-gray-100 font-semibold text-gray-900"
        />
      </div>
    </div>
  )
}
