import { Button } from '../commons/button/Button'
import ModalTitle from './ModalTitle'
import { RequiredLabel } from '../commons/RequiredLabel'
import { useForm } from 'react-hook-form'
import { ReportApiErrors } from '@src/pages/signup/validationRules'
import ImageUploadField from '@src/pages/product-post/components/imageUploadField/ImageUploadField'
import { useRef, type ReactNode } from 'react'
import { useOutsideClick } from '@src/hooks/useOutsideClick'
import { Z_INDEX } from '@src/constants/ui'
import { AnimatePresence } from 'framer-motion'
import InlineNotification from '../commons/InlineNotification'

export interface ReportFormValues {
  reasonCode: string
  detailReason?: string
  imageFiles?: string[]
}

export interface ReportReason {
  id: string
  label: string
}

interface ReportModalBaseProps {
  isOpen: boolean
  heading: string
  description: ReactNode
  reasons: ReportReason[]
  onCancel: () => void
  onSubmit: (data: ReportFormValues) => Promise<void>
  error?: React.ReactNode
  onClearError?: () => void
}

export default function ReportModalBase({ isOpen, heading, description, reasons, onCancel, onSubmit, error, onClearError }: ReportModalBaseProps) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ReportFormValues>({
    mode: 'onChange',
    defaultValues: {
      reasonCode: '서비스 불만족',
      detailReason: '',
      imageFiles: [],
    },
  })
  const modalRef = useRef<HTMLDivElement>(null)
  // 바깥 클릭 시 onCancel 호출
  useOutsideClick(isOpen, [modalRef], onCancel)

  const titleLength = watch('detailReason')?.length ?? 0

  // 디버깅용
  console.log('🔍 ReportModal - isValid:', isValid)
  console.log('🔍 ReportModal - errors:', errors)

  const handleCancel = () => {
    reset()
    onCancel()
  }

  const handleFormSubmit = async (data: ReportFormValues) => {
    await onSubmit(data)
    reset()
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-900/70 p-4 ${Z_INDEX.MODAL}`}>
      <div ref={modalRef} className="flex max-h-[90vh] w-11/12 flex-col gap-4 overflow-y-auto rounded-lg bg-white p-5 md:w-1/5 md:min-w-96">
        <ModalTitle heading={heading} description={description} />
        <AnimatePresence>
          {error && (
            <InlineNotification type="error" onClose={() => onClearError?.()}>
              {error}
            </InlineNotification>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-1">
              <RequiredLabel htmlFor="reportReason" labelClass="font-semibold">
                신고 사유
              </RequiredLabel>
              <div className="flex flex-col gap-1 rounded-lg border border-gray-300 px-3 py-2.5">
                {reasons.map((reason) => (
                  <div key={reason.id} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={`reportReason-${reason.id}`}
                      value={reason.id}
                      className="h-3 w-3 border-gray-500"
                      {...register('reasonCode', { required: true })}
                    />
                    <label htmlFor={`reportReason-${reason.id}`}>{reason.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <RequiredLabel htmlFor="reportReasonDetail" labelClass="font-semibold" required={false}>
                신고 상세 사유 (선택항목)
              </RequiredLabel>
              <div className="flex flex-col gap-0.5">
                <textarea
                  placeholder="신고 상세 사유를 입력해주세요."
                  className="bg-primary-50 focus:border-primary-500 min-h-32 w-full resize-none rounded-lg px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none md:min-h-20"
                  id="withdrawReasonDetail"
                  {...register('detailReason', {
                    maxLength: ReportApiErrors.detailReason.maxLength,
                  })}
                />
                <p className="text-sm font-semibold text-gray-400">{titleLength}/300자</p>
                {errors.detailReason && <p className="text-danger-500 text-xs font-semibold"> {errors.detailReason.message}</p>}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              <ImageUploadField
                setValue={setValue}
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
                mainImageField="imageFiles"
                heading="신고 이미지 첨부 (선택항목/최대 3장)"
                showSection={false}
                maxFiles={3}
                className="gap-1"
                headingClassName="text-gray-900 font-semibold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" onClick={handleCancel} size="sm" className="cursor-pointer rounded-lg border border-gray-300 bg-white">
              취소
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              size="sm"
              className="bg-danger-600 cursor-pointer rounded-lg text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              신고하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
