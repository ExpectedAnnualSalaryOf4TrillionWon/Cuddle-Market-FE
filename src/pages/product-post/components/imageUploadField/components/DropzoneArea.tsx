import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { UseFormSetValue, UseFormSetError, UseFormClearErrors } from 'react-hook-form'
import type { ProductPostFormValues } from '../../ProductPostForm'
import { uploadImage } from '@src/api/products'
import { MAX_FILES } from '@src/constants/constants'
import DropzoneGuide from './DropzoneGuide'
import SortableImageList from './SortableImageList'
// import DropzoneGuide from './DropzoneGuide'
// import SortableImageList from './SortableImageList'

const IMAGE_UPLOAD_ERRORS = {
  'file-too-large': '파일 크기는 5MB를 초과할 수 없습니다.',
  'file-invalid-type': '지원하지 않는 파일 형식입니다. (jpg, jpeg, png, webp만 가능)',
  'too-many-files': `최대 ${MAX_FILES}개의 파일만 업로드할 수 있습니다.`,
  'upload-failed': '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
} as const

interface DropzoneAreaProps {
  setValue: UseFormSetValue<ProductPostFormValues>
  setError: UseFormSetError<ProductPostFormValues>
  clearErrors: UseFormClearErrors<ProductPostFormValues>
  initialImages?: string[]
}

export default function DropzoneArea({ setValue, setError, clearErrors, initialImages }: DropzoneAreaProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: MAX_FILES,
    maxSize: 5 * 1024 * 1024,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      clearErrors('mainImageUrl')

      const totalCount = previewUrls.length + acceptedFiles.length
      if (totalCount > MAX_FILES) {
        setError('mainImageUrl', { type: 'manual', message: IMAGE_UPLOAD_ERRORS['too-many-files'] })
        return
      }

      if (rejectedFiles.length > 0) {
        const errorCode = rejectedFiles[0].errors[0].code as keyof typeof IMAGE_UPLOAD_ERRORS
        const message = IMAGE_UPLOAD_ERRORS[errorCode] || '파일 업로드에 실패했습니다.'
        setError('mainImageUrl', { type: 'manual', message })
        return
      }

      if (acceptedFiles.length === 0) {
        setError('mainImageUrl', { type: 'manual', message: '업로드할 파일을 선택해주세요.' })
        return
      }

      try {
        const uploadedUrl = await uploadImage(acceptedFiles)
        setValue('mainImageUrl', uploadedUrl.mainImageUrl)
        setValue('subImageUrls', uploadedUrl.subImageUrls)
        setPreviewUrls((prev) => [...prev, uploadedUrl.mainImageUrl, ...(uploadedUrl.subImageUrls || [])])
      } catch {
        setError('mainImageUrl', {
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
      setValue('mainImageUrl', '')
      setValue('subImageUrls', [])
    } else {
      setValue('mainImageUrl', updatedUrls[0])
      setValue('subImageUrls', updatedUrls.slice(1))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = previewUrls.indexOf(active.id as string)
      const newIndex = previewUrls.indexOf(over?.id as string)
      const newUrls = arrayMove(previewUrls, oldIndex, newIndex)

      setPreviewUrls(newUrls)
      setValue('mainImageUrl', newUrls[0])
      setValue('subImageUrls', newUrls.slice(1))
    }
  }
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setPreviewUrls(initialImages)
    }
  }, [initialImages])

  return (
    <div {...getRootProps()} className="cursor-pointer rounded-lg border border-dashed border-gray-400 px-6 py-10">
      <input {...getInputProps()} />
      {previewUrls.length === 0 ? (
        <DropzoneGuide />
      ) : (
        <SortableImageList previewUrls={previewUrls} onDragEnd={handleDragEnd} onRemoveImage={handleRemoveImage} />
      )}
    </div>
  )
}
