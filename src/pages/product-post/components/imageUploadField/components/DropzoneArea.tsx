import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { FieldValues, Path, UseFormSetValue, UseFormSetError, UseFormClearErrors } from 'react-hook-form'
import { uploadImage } from '@src/api/products'
import { MAX_FILES } from '@src/constants/constants'
import DropzoneGuide from './DropzoneGuide'
import SortableImageList from './SortableImageList'

const IMAGE_UPLOAD_ERRORS = {
  'file-too-large': '파일 크기는 5MB를 초과할 수 없습니다.',
  'file-invalid-type': '지원하지 않는 파일 형식입니다. (jpg, jpeg, png, webp만 가능)',
  'upload-failed': '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
} as const

const getTooManyFilesError = (max: number) => `최대 ${max}개의 파일만 업로드할 수 있습니다.`

interface DropzoneAreaProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>
  setError: UseFormSetError<T>
  clearErrors: UseFormClearErrors<T>
  mainImageField: Path<T>
  subImagesField?: Path<T>
  initialImages?: string[]
  maxFiles?: number
}

export default function DropzoneArea<T extends FieldValues>({
  setValue,
  setError,
  clearErrors,
  mainImageField,
  subImagesField,
  initialImages,
  maxFiles = MAX_FILES,
}: DropzoneAreaProps<T>) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    // maxFiles 옵션 제거 - 직접 검증으로 대체 (react-dropzone의 maxFiles는 누적 카운트 문제 발생)
    maxSize: 5 * 1024 * 1024,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      console.log('🔍 onDrop 시작')
      console.log('🔍 acceptedFiles:', acceptedFiles.length, '개')
      console.log('🔍 rejectedFiles:', rejectedFiles.length, '개')
      console.log('🔍 현재 previewUrls:', previewUrls.length, '개')

      clearErrors(mainImageField)
      console.log('🔍 clearErrors 호출됨')

      const totalCount = previewUrls.length + acceptedFiles.length
      console.log('🔍 totalCount:', totalCount, 'maxFiles:', maxFiles)

      if (totalCount > maxFiles) {
        console.log('🔍 maxFiles 초과 - 에러 설정')
        setError(mainImageField, { type: 'manual', message: getTooManyFilesError(maxFiles) })
        return
      }

      if (rejectedFiles.length > 0) {
        const errorCode = rejectedFiles[0].errors[0].code as keyof typeof IMAGE_UPLOAD_ERRORS
        const message = IMAGE_UPLOAD_ERRORS[errorCode] || '파일 업로드에 실패했습니다.'
        setError(mainImageField, { type: 'manual', message })
        return
      }

      if (acceptedFiles.length === 0) {
        setError(mainImageField, { type: 'manual', message: '업로드할 파일을 선택해주세요.' })
        return
      }

      try {
        const uploadedUrl = await uploadImage(acceptedFiles)
        // 새로 업로드된 URL들
        const newUrls = [uploadedUrl.mainImageUrl, ...(uploadedUrl.subImageUrls || [])]
        // 기존 URL들과 합침
        const allUrls = [...previewUrls, ...newUrls]

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(mainImageField, allUrls as any, { shouldValidate: true })
        if (subImagesField) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue(subImagesField, allUrls.slice(1) as any)
        }
        setPreviewUrls(allUrls)
        console.log('🔍 업로드 성공 - setValue with shouldValidate 호출됨')
      } catch {
        setError(mainImageField, {
          type: 'manual',
          message: IMAGE_UPLOAD_ERRORS['upload-failed'],
        })
      }
    },
  })

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedUrls = previewUrls.filter((_, index) => index !== indexToRemove)
    setPreviewUrls(updatedUrls)

    if (updatedUrls.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(mainImageField, '' as any)
      if (subImagesField) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(subImagesField, [] as any)
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(mainImageField, updatedUrls[0] as any)
      if (subImagesField) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(subImagesField, updatedUrls.slice(1) as any)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = previewUrls.indexOf(active.id as string)
      const newIndex = previewUrls.indexOf(over?.id as string)
      const newUrls = arrayMove(previewUrls, oldIndex, newIndex)

      setPreviewUrls(newUrls)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(mainImageField, newUrls[0] as any)
      if (subImagesField) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(subImagesField, newUrls.slice(1) as any)
      }
    }
  }
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setPreviewUrls(initialImages)
    }
  }, [initialImages])

  return (
    <div {...getRootProps()} className="cursor-pointer rounded-lg border border-dashed border-gray-400 px-4 py-4 md:px-6 md:py-10">
      <input {...getInputProps()} />
      {previewUrls.length === 0 ? (
        <DropzoneGuide maxFiles={maxFiles} />
      ) : (
        <SortableImageList previewUrls={previewUrls} onDragEnd={handleDragEnd} onRemoveImage={handleRemoveImage} />
      )}
    </div>
  )
}
