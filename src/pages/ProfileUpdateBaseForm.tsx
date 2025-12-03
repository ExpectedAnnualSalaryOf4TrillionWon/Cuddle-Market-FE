import PlaceholderImage from '@assets/images/placeholder.png'
import { formatPrice } from '@src/utils/formatPrice'
import { PRODUCT_DELETE_ALERT_LIST } from '@src/constants/constants'
import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import { InputWithButton } from '@src/components/commons/InputWithButton'
import { AddressField } from '@src/components/commons/AddressField'
import type { Province } from '@src/constants/cities'
import { useForm, type Control, type UseFormRegisterReturn, type UseFormSetValue } from 'react-hook-form'
import { profileValidationRules } from '@src/utils/validation/authValidationRules'
import { Button } from '@src/components/commons/button/Button'
import { cn } from '@src/utils/cn'

export interface ProfileUpdateBaseFormValues {
  nickname: string
  profileImageUrl: string
  introduction: string
  addressSido: Province | ''
  addressGugun: string
}

export default function ProfileUpdateBaseForm() {
  const {
    control,
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    watch, // 특정 필드 값을 실시간으로 구독
    setValue,
    setError,
    clearErrors,
    reset,
    // formState: { errors, isValid }, // errors: Controller/register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<ProfileUpdateBaseFormValues>({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      profileImageUrl: '',
      introduction: '',
      addressSido: '',
      addressGugun: '',
    },
  })

  return (
    <form
      className="border-border flex w-full flex-col gap-6 rounded-xl border p-7"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-col gap-8">
        <legend className="sr-only">프로필 정보 수정 폼</legend>
        <div className="flex flex-col gap-2">
          <h2 className="heading-h3">기본 정보</h2>
          <p className="text-gray-500">프로필 이미지, 닉네임, 거주지를 수정할 수 있습니다</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-8">
            {/* 본인 인증 정보 */}
            <div className="flex flex-col gap-3.5">
              <h3 className="heading-h5">본인 인증 정보</h3>

              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-gray-600">이름</span>
                    <div className="bg-primary-50/50 rounded-lg p-3 font-medium text-gray-400">멍멍이 아빠</div>
                  </div>
                  <p className="text-sm font-bold text-gray-400">본인 인증 정보로 변경할 수 없습니다.</p>
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-gray-600">생년월일</span>
                    <div className="bg-primary-50/50 rounded-lg p-3 font-medium text-gray-400">2000. 10. 11</div>
                  </div>
                  <p className="text-sm font-bold text-gray-400">본인 인증 정보로 변경할 수 없습니다.</p>
                </div>
              </div>
            </div>

            {/* 계정 정보 */}
            <div className="flex flex-col gap-3.5">
              <h3 className="heading-h5">계정 정보</h3>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-gray-600">이메일</span>
                  <div className="bg-primary-50/50 rounded-lg p-3 font-medium text-gray-400">cuddleMarket@naver.com</div>
                </div>
                <p className="text-sm font-bold text-gray-400">이메일은 변경할 수 없습니다.</p>
              </div>
            </div>

            {/* 활동 정보 */}
            <div className="flex flex-col gap-3.5">
              <h3 className="heading-h5">활동 정보</h3>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col justify-center gap-2">
                  <RequiredLabel required={false}>닉네임</RequiredLabel>
                  <InputWithButton
                    id="update-nickname"
                    type="text"
                    placeholder="김개발"
                    registration={register('nickname', profileValidationRules.nickname)}
                    buttonText="중복체크"
                    size="text-base"
                    buttonSize="lg"
                  />
                </div>
                <p className="text-sm font-bold text-gray-400">이메일은 변경할 수 없습니다.</p>
              </div>
              <AddressField<ProfileUpdateBaseFormValues>
                control={control}
                setValue={setValue}
                primaryName="addressSido"
                secondaryName="addressGugun"
                required={false}
                layoutClass="gap-2"
              />
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2">
                  <RequiredLabel required={false}>자기소개</RequiredLabel>
                  <textarea
                    id="profile-introduction"
                    placeholder=""
                    className={cn(
                      'focus:border-primary-500 min-h-[14vh] w-full resize-none rounded-lg border border-gray-400 bg-white px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none'
                    )}
                    {...register('introduction', profileValidationRules.introduction)}
                  />
                </div>
                <p className="text-sm font-bold text-gray-400">이메일은 변경할 수 없습니다.</p>
              </div>
            </div>

            <p className="border-t border-gray-300 pt-2.5 text-sm text-gray-400">
              본인 인증 정보의 변경이 필요한 경우, 고객센터 1:1 문의를 통해 문의주세요.
            </p>
          </div>
          <Button size="md" className="bg-primary-300 w-full cursor-pointer text-white" type="submit">
            프로필 수정
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
