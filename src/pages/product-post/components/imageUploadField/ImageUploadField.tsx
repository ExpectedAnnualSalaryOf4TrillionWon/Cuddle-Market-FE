import type { ProductPostFormValues } from '../ProductPostForm'
import { type FieldErrors, type UseFormClearErrors, type UseFormSetValue, type UseFormSetError } from 'react-hook-form'
import DropzoneArea from './components/DropzoneArea'
import FormSectionHeader from '../FormSectionHeader'

interface ImageUploadFieldProps {
  setValue: UseFormSetValue<ProductPostFormValues>
  errors: FieldErrors<ProductPostFormValues>
  setError: UseFormSetError<ProductPostFormValues>
  clearErrors: UseFormClearErrors<ProductPostFormValues>
}

export default function ImageUploadField({ setValue, errors, setError, clearErrors }: ImageUploadFieldProps) {
  return (
    <section className="flex flex-col gap-6 rounded-xl border border-gray-100 bg-white px-6 py-5">
      <div className="flex flex-col gap-5">
        <FormSectionHeader
          heading="상품 이미지 (선택항목)"
          description="상품 이미지를 업로드 해주세요. 첫번째 이미지가 대표 이미지가 됩니다. (최대 5장) "
        />
        <DropzoneArea setValue={setValue} setError={setError} clearErrors={clearErrors} />
        {errors.mainImageUrl && <p className="text-danger-500 text-sm font-semibold">{errors.mainImageUrl.message}</p>}
      </div>
    </section>
  )
}
