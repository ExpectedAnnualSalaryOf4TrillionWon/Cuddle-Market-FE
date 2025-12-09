import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import { InputWithButton } from '@src/components/commons/InputWithButton'
import { AddressField } from '@src/components/commons/AddressField'
import type { Province } from '@src/constants/cities'
import { useForm } from 'react-hook-form'
import { profileValidationRules } from '@src/utils/validation/authValidationRules'
import { Button } from '@src/components/commons/button/Button'
import { cn } from '@src/utils/cn'
import type { MyPageData } from '@src/components/profile/ProfileData'
import { formatBirthDate } from '@src/utils/formatBirthDate'
import { checkNickname } from '@src/api/auth'
import { useState, useEffect } from 'react'
import { profileUpdate } from '@src/api/profile'
import { useUserStore } from '@src/store/userStore'
import { useDropzone } from 'react-dropzone'
import { uploadImage } from '@src/api/products'
import { useQueryClient } from '@tanstack/react-query'

export interface ProfileUpdateBaseFormValues {
  nickname: string
  profileImageUrl: string
  introduction: string
  addressSido: Province | ''
  addressGugun: string
}
const IMAGE_UPLOAD_ERRORS = {
  'file-too-large': '파일 크기는 5MB를 초과할 수 없습니다.',
  'file-invalid-type': '지원하지 않는 파일 형식입니다. (jpg, jpeg, png, webp만 가능)',
  'too-many-files': `최대 1개의 파일만 업로드할 수 있습니다.`,
  'upload-failed': '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
} as const

interface ProfileUpdateBaseFormProps {
  myData?: MyPageData
}
export default function ProfileUpdateBaseForm({ myData }: ProfileUpdateBaseFormProps) {
  const {
    control,
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    watch, // 특정 필드 값을 실시간으로 구독
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }, // errors: Controller/register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
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

  const titleLength = watch('introduction')?.length ?? 0
  const queryClient = useQueryClient()
  const [, setIsNicknameVerified] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>(myData?.profileImageUrl || '')
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'success' | 'error'
    message: string
  }>({ status: 'idle', message: '' })

  const nickname = watch('nickname')
  const { user, updateUserProfile } = useUserStore()

  const handleNicknameCheck = async () => {
    try {
      const response = await checkNickname(nickname)

      if (response.data) {
        setCheckResult({
          status: 'success',
          message: response.message, // "사용 가능한 닉네임입니다."
        })
        setIsNicknameVerified(true)
        clearErrors('nickname')
      } else {
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      clearErrors('profileImageUrl')

      if (rejectedFiles.length > 0) {
        const errorCode = rejectedFiles[0].errors[0].code as keyof typeof IMAGE_UPLOAD_ERRORS
        const message = IMAGE_UPLOAD_ERRORS[errorCode] || '파일 업로드에 실패했습니다.'
        setError('profileImageUrl', { type: 'manual', message })
        return
      }

      if (acceptedFiles.length === 0) {
        setError('profileImageUrl', { type: 'manual', message: '업로드할 파일을 선택해주세요.' })
        return
      }

      try {
        const uploadedUrl = await uploadImage(acceptedFiles)
        setValue('profileImageUrl', uploadedUrl.mainImageUrl)
        setPreviewUrl(uploadedUrl.mainImageUrl)
      } catch {
        setError('profileImageUrl', {
          type: 'manual',
          message: IMAGE_UPLOAD_ERRORS['upload-failed'],
        })
      }
    },
  })
  const onSubmit = async (data: ProfileUpdateBaseFormValues) => {
    try {
      const response = await profileUpdate(data)
      if (response.code === 'SUCCESS') {
        updateUserProfile(data)
        setCheckResult({ status: 'idle', message: '' })
        await queryClient.refetchQueries({ queryKey: ['mypage', user?.id] })
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error)
    }
  }
  useEffect(() => {
    if (myData) {
      setPreviewUrl(myData.profileImageUrl || '')
      reset({
        nickname: myData.nickname || '',
        profileImageUrl: myData.profileImageUrl || '',
        introduction: myData.introduction || '',
        addressSido: (myData.addressSido as Province) || '',
        addressGugun: myData.addressGugun || '',
      })
    }
  }, [myData, reset])

  return (
    <form className="border-border flex w-full flex-col gap-6 rounded-xl border p-7" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-8">
        <legend className="sr-only">프로필 정보 수정 폼</legend>
        <div className="flex flex-col gap-2">
          <h2 className="heading-h3">기본 정보</h2>
          <p className="text-gray-500">프로필 이미지, 닉네임, 거주지를 수정할 수 있습니다</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-10">
            {/* 프로필 이미지 */}
            <div className="flex flex-col items-center gap-2.5">
              <div
                {...getRootProps()}
                className="flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#FACC15]"
              >
                <input {...getInputProps()} />
                {previewUrl ? (
                  <img src={previewUrl ?? ''} alt={myData?.nickname} className="h-full w-full object-cover" />
                ) : (
                  <div className="heading-h1 font-normal!">{myData?.nickname.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <p className="text-sm">프로필 사진을 변경하려면 카메라 아이콘을 클릭하세요</p>
            </div>

            {/* 정보 영역 */}
            <div className="flex flex-col gap-8">
              {/* 본인 인증 정보 */}
              <div className="flex flex-col gap-3.5">
                <h3 className="heading-h5">본인 인증 정보</h3>

                <div className="flex items-center justify-between gap-6">
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-gray-600">이름</span>
                      <div className="bg-primary-50/50 rounded-lg p-3 font-medium text-gray-400">{myData?.nickname}</div>
                    </div>
                    <p className="text-sm font-bold text-gray-400">본인 인증 정보로 변경할 수 없습니다.</p>
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-gray-600">생년월일</span>
                      <div className="bg-primary-50/50 rounded-lg p-3 font-medium text-gray-400">{formatBirthDate(myData?.birthDate)}</div>
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
                    <div className="bg-primary-50/50 rounded-lg p-3 font-medium text-gray-400">{myData?.email}</div>
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
                      placeholder="cuddle market"
                      registration={register('nickname', profileValidationRules.nickname)}
                      buttonText="중복체크"
                      size="text-base"
                      buttonSize="lg"
                      buttonClassName="bg-primary-200 text-white cursor-pointer font-semibold py-[13px]"
                      checkResult={checkResult}
                      onButtonClick={handleNicknameCheck}
                    />
                  </div>
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
                      placeholder="소개글을 작성해주세요"
                      className={cn(
                        'focus:border-primary-500 min-h-[7vh] w-full resize-none rounded-lg border border-gray-400 bg-white px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none'
                      )}
                      {...register('introduction', profileValidationRules.introduction)}
                    />
                    <p className="text-sm font-semibold text-gray-400">{titleLength}/1000자</p>
                    {errors.introduction && <p className="text-danger-500 text-xs font-semibold"> {errors.introduction.message}</p>}
                  </div>
                </div>
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
