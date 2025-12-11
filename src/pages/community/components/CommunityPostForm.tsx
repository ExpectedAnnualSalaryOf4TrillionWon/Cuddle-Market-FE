import { Button } from '@src/components/commons/button/Button'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { CommunityPostRequestData } from '@src/types'
import { cn } from '@src/utils/cn'
import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import { COMMUNITY_TABS } from '@src/constants/constants'
import { TitleField } from '@src/components/commons/TitleField'
import { commonTitleValidationRules } from '../../signup/validationRules'
import Markdown from './markdown/Markdown'
import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { postCommunity } from '@src/api/community'
export interface CommunityPostFormValues {
  boardType: string
  title: string
  content: string
  imageUrls?: string[]
}

export function CommunityPostForm() {
  const {
    control,
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    watch, // 특정 필드 값을 실시간으로 구독
    formState: { errors, isValid }, // errors: Controller/register의 에러 메세지 자동 출력 : 각 필드의 에러 상태
  } = useForm<CommunityPostFormValues>({
    mode: 'onChange',
    defaultValues: {
      boardType: 'FREE',
      title: '',
      content: '',
      imageUrls: [],
    },
  }) // 폼에서 관리할 필드들의 타입(이름) 정의.
  const navigate = useNavigate()

  const onSubmit = async (data: CommunityPostFormValues) => {
    const requestData: CommunityPostRequestData = {
      boardType: data.boardType,
      title: data.title,
      content: data.content,
      imageUrls: data.imageUrls ?? [],
    }

    try {
      await postCommunity(requestData)
      navigate(`/community`)
    } catch {
      alert('상품 등록에 실패했습니다.')
    }
  }

  return (
    <>
      <SimpleHeader title="커뮤니티 글쓰기" description="일상 이야기를 마음껏 나눠보세요!" />
      <div className="min-h-screen bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-[var(--container-max-width)]">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="flex flex-col gap-5">
              <legend className="sr-only">커뮤니티 등록폼</legend>

              <div className="flex flex-col gap-6 rounded-lg border border-gray-400 bg-white px-6 py-5 shadow-xl">
                <Controller
                  name="boardType"
                  control={control}
                  rules={{ required: '카테고리를 선택해주세요' }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <RequiredLabel htmlFor="category" labelClass="heading-h5">
                        카테고리
                      </RequiredLabel>
                      <SelectDropdown
                        value={field.value || ''}
                        onChange={field.onChange}
                        options={COMMUNITY_TABS.map((category) => ({
                          value: category.code,
                          label: category.label,
                        }))}
                        placeholder="자유게시판"
                        optionClassName="text-base"
                        buttonClassName="border-gray-400 bg-white border text-gray-900 px-3 py-3 border text-base"
                      />
                      {fieldState.error && <p className="text-xs font-semibold text-red-500">{fieldState.error.message}</p>}
                    </div>
                  )}
                />
                <TitleField<CommunityPostFormValues>
                  register={register}
                  errors={errors}
                  fieldName="title"
                  rules={commonTitleValidationRules}
                  label="제목"
                  titleLength={watch('title')?.length ?? 0}
                  maxLength={50}
                  id="community-title"
                  placeholder="제목을 입력해주세요"
                  size="text-base"
                  counterClassName="text-sm text-gray-500"
                />
              </div>
              <div className="rounded-lg border border-gray-400 bg-white px-6 py-5 shadow-xl">
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: '내용을 입력하세요' }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <RequiredLabel htmlFor="category" labelClass="heading-h5">
                        내용
                      </RequiredLabel>
                      <Markdown value={field.value} onChange={field.onChange} placeholder="내용을 입력하세요" height={320} />
                      <p className="text-sm text-gray-500">{field.value?.length ?? 0}/1000자</p>
                      {fieldState.error && <p className="text-xs font-semibold text-red-500">{fieldState.error.message}</p>}
                    </div>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="md"
                  className={cn('w-[80%] flex-1 cursor-pointer text-white', !isValid ? 'bg-gray-300' : 'bg-primary-200')}
                  type="submit"
                >
                  등록
                </Button>
                <Button size="md" className="w-[20%] cursor-pointer bg-gray-100 text-gray-900" type="button">
                  취소
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}
