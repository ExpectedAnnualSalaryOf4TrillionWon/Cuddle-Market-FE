import type { RegisterOptions } from 'react-hook-form'
import type { SignUpFormValues } from './components/SignUpForm'

/**
 * 회원가입 폼 전용 validation 규칙
 */
export const signupValidationRules = {
  name: {
    required: '이름을 입력해주세요',
    minLength: {
      value: 2,
      message: '이름은 2~ 10자 이상이어야 합니다.',
    },
    maxLength: {
      value: 10,
      message: '이름은 2~ 10자 이상이어야 합니다.',
    },
  } satisfies RegisterOptions<SignUpFormValues, 'name'>,

  nickname: {
    required: '닉네임을 입력해주세요',
    minLength: {
      value: 2,
      message: '닉네임은 2~ 10자 이상이어야 합니다.',
    },
    maxLength: {
      value: 10,
      message: '닉네임은 2~ 10자 이상이어야 합니다.',
    },
  } satisfies RegisterOptions<SignUpFormValues, 'nickname'>,

  passwordConfirm: (password: string) =>
    ({
      required: '비밀번호 확인을 입력해주세요',
      validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
    }) satisfies RegisterOptions<SignUpFormValues, 'passwordConfirm'>,

  addressSido: {
    required: '지역을 선택해주세요',
  } satisfies RegisterOptions<SignUpFormValues, 'addressSido'>,

  addressGugun: {
    required: '지역을 선택해주세요',
  } satisfies RegisterOptions<SignUpFormValues, 'addressGugun'>,
} as const
