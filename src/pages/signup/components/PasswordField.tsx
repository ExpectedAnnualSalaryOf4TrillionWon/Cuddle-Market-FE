import { InputField } from '@src/components/commons/InputField'
import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import type { SignUpFormValues } from './SignUpForm'
import { type UseFormRegister, type FieldErrors, type UseFormWatch } from 'react-hook-form'
import { authValidationRules } from '@src/utils/validation/authValidationRules'
import { signupValidationRules } from '../validationRules'

interface PasswordFieldProps {
  register: UseFormRegister<SignUpFormValues>
  errors: FieldErrors<SignUpFormValues>
  watch: UseFormWatch<SignUpFormValues>
}

export function PasswordField({ register, errors, watch }: PasswordFieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <RequiredLabel htmlFor="signup-password">비밀번호</RequiredLabel>
      <div className="flex flex-col gap-4">
        <InputField
          id="signup-password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          size="text-sm"
          border
          borderColor="border-gray-400"
          error={errors.password}
          registration={register('password', authValidationRules.password)}
        />
        <InputField
          id="signup-password-confirm"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          size="text-sm"
          border
          borderColor="border-gray-400"
          error={errors.passwordConfirm}
          registration={register('passwordConfirm', signupValidationRules.passwordConfirm(watch('password')))}
        />
      </div>
    </div>
  )
}
