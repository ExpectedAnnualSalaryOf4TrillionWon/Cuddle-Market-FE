import { Button } from '@src/components/commons/button/Button'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import type { CommunityPostRequestData } from '@src/types'
import { cn } from '@src/utils/cn'
import { RequiredLabel } from '@src/components/commons/RequiredLabel'
import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import { COMMUNITY_TABS } from '@src/constants/constants'
import { TitleField } from '@src/components/commons/TitleField'
import { commonTitleValidationRules, communityContentValidationRules } from '../../signup/validationRules'
import Markdown from './markdown/Markdown'
import { ArrowLeft } from 'lucide-react'
import { fetchCommunityId, patchPost, postCommunity } from '@src/api/community'
import { useEffect } from 'react'
import { useMediaQuery } from '@src/hooks/useMediaQuery'

const DRAFT_STORAGE_KEY = 'community-post-draft'

export interface CommunityPostFormValues {
  boardType: string
  title: string
  content: string
  imageUrls?: string[]
}

// sessionStorage에서 임시 저장된 데이터 불러오기
const getSavedDraft = (): CommunityPostFormValues => {
  const saved = sessionStorage.getItem(DRAFT_STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return { boardType: 'FREE', title: '', content: '', imageUrls: [] }
    }
  }
  return { boardType: 'FREE', title: '', content: '', imageUrls: [] }
}

// 임시 저장 데이터 삭제
const clearDraft = () => {
  sessionStorage.removeItem(DRAFT_STORAGE_KEY)
}

export default function CommunityPostForm() {
  const navigate = useNavigate()
  const isMd = useMediaQuery('(min-width: 768px)')
  const { id } = useParams()
  const isEditMode = !!id

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CommunityPostFormValues>({
    mode: 'onChange',
    defaultValues: isEditMode ? { boardType: 'FREE', title: '', content: '', imageUrls: [] } : getSavedDraft(),
  })

  const formValues = watch()

  const handleCancel = () => {
    clearDraft()
    navigate('/community')
  }

  const onSubmit = async (data: CommunityPostFormValues) => {
    const requestData: CommunityPostRequestData = {
      boardType: data.boardType,
      title: data.title,
      content: data.content,
      imageUrls: data.imageUrls ?? [],
    }

    try {
      if (isEditMode) {
        await patchPost(Number(id), requestData)
        navigate(`/community/${id}`)
      } else {
        const response = await postCommunity(requestData)
        clearDraft()
        navigate(`/community/${response.id}`)
      }
    } catch {
      alert(isEditMode ? '게시글 수정에 실패했습니다.' : '게시글 등록에 실패했습니다.')
    }
  }

  useEffect(() => {
    const loadPost = async () => {
      if (isEditMode && id) {
        try {
          const data = await fetchCommunityId(id)
          reset({
            boardType: data.boardType,
            title: data.title,
            content: data.content,
            imageUrls: data.imageUrls ?? [],
          })
        } catch (error) {
          console.error('게시글 로드 실패:', error)
        }
      }
    }
    loadPost()
  }, [id, isEditMode, reset])

  // 새 글 작성 시 폼 데이터 변경마다 sessionStorage에 자동 저장
  useEffect(() => {
    if (!isEditMode) {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formValues))
    }
  }, [formValues, isEditMode])

  return (
    <>
      {/* <SimpleHeader title="커뮤니티 글쓰기" description="일상 이야기를 마음껏 나눠보세요!" /> */}
      <div className={cn('bg-primary-200 relative mx-auto flex max-w-7xl justify-between px-3.5 py-4')}>
        {!isMd && (
          <button type="button" onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-1 text-gray-600">
            <ArrowLeft size={23} className="text-white" />
          </button>
        )}
        <h2 className="heading-h4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-extrabold! text-white">커뮤니티</h2>
      </div>
      <div className="min-h-screen bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-7xl">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="flex flex-col gap-5">
              <legend className="sr-only">커뮤니티 등록폼</legend>

              <div className="flex flex-col gap-6 rounded-lg border border-gray-400 bg-white px-3.5 py-5 shadow-xl md:px-6">
                <Controller
                  name="boardType"
                  control={control}
                  rules={{ required: '카테고리를 선택해주세요' }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <RequiredLabel labelClass="heading-h5">카테고리</RequiredLabel>
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
              <div className="rounded-lg border border-gray-400 bg-white px-3.5 py-5 shadow-xl md:px-6">
                <Controller
                  name="content"
                  control={control}
                  rules={communityContentValidationRules}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <RequiredLabel labelClass="heading-h5">내용</RequiredLabel>
                      <Markdown value={field.value} onChange={field.onChange} placeholder="내용을 입력하세요" height={320} />
                      <div className="flex flex-col gap-1">
                        {fieldState.error && <p className="pt-1.5 text-xs font-semibold text-red-500">{fieldState.error.message}</p>}
                        <p className="text-sm text-gray-500">{field.value?.length ?? 0}/1000자</p>
                      </div>
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
                  {isEditMode ? '수정' : '등록'}
                </Button>
                <Button size="md" className="w-[20%] cursor-pointer bg-gray-100 text-gray-900" type="button" onClick={handleCancel}>
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
