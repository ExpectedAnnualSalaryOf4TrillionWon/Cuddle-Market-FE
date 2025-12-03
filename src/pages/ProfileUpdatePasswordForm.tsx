import { PASSWORD_UPDATE_ALERT_LIST } from '@src/constants/constants'
import { useForm } from 'react-hook-form'
import { profileValidationRules } from '@src/utils/validation/authValidationRules'
import { Button } from '@src/components/commons/button/Button'
import { CircleAlert } from 'lucide-react'
import { InputField } from '@src/components/commons/InputField'
import AlertBox from '@src/components/modal/AlertBox'

export interface ProfileUpdatePasswordFormValues {
  password: string
  passwordConfirm: string
}

export default function ProfileUpdatePasswordForm() {
  const {
    // handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    watch, // 특정 필드 값을 실시간으로 구독
    // setValue,
    // setError,
    // clearErrors,
    // reset,
    // formState: { errors, isValid }, // errors: Controller/register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<ProfileUpdatePasswordFormValues>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  return (
    <form
      className="border-border flex w-full flex-col gap-6 rounded-xl border p-7"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-col gap-8">
        <legend className="sr-only">비밀번호 변경 폼</legend>
        <div className="flex flex-col gap-2">
          <h2 className="heading-h3">비밀번호 변경</h2>
          <p className="text-gray-500">보안을 위해 주기적으로 비밀번호를 변경해주세요</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-600">새 비밀번호</span>
                <InputField
                  type="password"
                  placeholder="새 비밀번호를 입력하세요"
                  border
                  borderColor="border-gray-400"
                  registration={register('password', profileValidationRules.password)}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-600">새 비밀번호 확인</span>
                <InputField
                  type="password"
                  placeholder="새 비밀번호를 입력하세요"
                  border
                  borderColor="border-gray-400"
                  registration={register('passwordConfirm', profileValidationRules.passwordConfirm(watch('password')))}
                />
              </div>
            </div>
            <AlertBox
              alertList={PASSWORD_UPDATE_ALERT_LIST}
              iconColor="text-blue-800"
              bgColor="bg-blue-100/30"
              borderColor="border-blue-100"
              title="안전한 비밀번호 만들기"
              titleColor="text-[#155DFC]"
              icon={CircleAlert}
              listColor="text-[#155DFC]"
            />
          </div>
          <Button size="md" className="bg-primary-300 w-full cursor-pointer text-white" type="submit">
            비밀번호 변경
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
