import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import { InputWithButton } from '@src/components/commons/InputWithButton'
import type { SignUpFormValues } from './SignUpForm'
import { type UseFormRegister, type FieldErrors, type UseFormWatch, type UseFormClearErrors } from 'react-hook-form'
import { signupValidationRules } from '../validationRules'
import { checkNickname } from '@src/api/auth'
import { useState } from 'react'

interface NicknameFieldProps {
  watch: UseFormWatch<SignUpFormValues>
  register: UseFormRegister<SignUpFormValues>
  errors: FieldErrors<SignUpFormValues>
  setIsNicknameVerified: (verified: boolean) => void
  clearErrors: UseFormClearErrors<SignUpFormValues>
}

export function NicknameField({ register, errors, watch, setIsNicknameVerified, clearErrors }: NicknameFieldProps) {
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'success' | 'error'
    message: string
  }>({ status: 'idle', message: '' })

  const nickname = watch('nickname')

  const handleNicknameCheck = async () => {
    try {
      const response = await checkNickname(nickname)

      if (response.data) {
        // 사용 가능 (data: true)
        setCheckResult({
          status: 'success',
          message: response.message, // "사용 가능한 닉네임입니다."
        })
        setIsNicknameVerified(true)
        clearErrors('nickname')
      } else {
        // 중복 (data: false)
        setCheckResult({
          status: 'error',
          message: response.message, // "이미 사용 중인 닉네임입니다."
        })
        setIsNicknameVerified(false)
      }
    } catch {
      setCheckResult({
        status: 'error',
        message: '닉네임 확인 중 오류가 발생했습니다.',
      })
      setIsNicknameVerified(false)
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <RequiredLabel htmlFor="signup-nickname">닉네임</RequiredLabel>
      <InputWithButton
        id="signup-nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
        error={errors.nickname}
        checkResult={checkResult}
        registration={register('nickname', signupValidationRules.nickname)}
        buttonText="중복체크"
        onButtonClick={handleNicknameCheck}
      />
    </div>
  )
}
