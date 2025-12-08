import { Button } from '../commons/button/Button'
import { USER_REPORT_REASON } from '@src/constants/constants'
import ModalTitle from './ModalTitle'
import { RequiredLabel } from '../commons/RequiredLabel'
import { useForm } from 'react-hook-form'
import { ReportApiErrors } from '@src/pages/signup/validationRules'
import { useNavigate } from 'react-router-dom'
import { userReported } from '@src/api/profile'

export interface ReportFormValues {
  reasonCode: string
  detailReason?: string
  imageFiles?: string[]
}

interface ReportModalProps {
  isOpen: boolean
  userNickname: string
  onCancel: () => void
  userId: number
}

export default function ReportModal({ isOpen, userNickname, onCancel, userId }: ReportModalProps) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ReportFormValues>({
    mode: 'onChange',
    defaultValues: {
      reasonCode: '서비스 불만족',
      detailReason: '',
      imageFiles: [],
    },
  })
  const navigate = useNavigate()
  const titleLength = watch('detailReason')?.length ?? 0
  const handleCancel = () => {
    reset()
    onCancel()
  }
  const onSubmit = async (requestData: ReportFormValues) => {
    try {
      await userReported(userId, { ...requestData })
      onCancel()
      navigate(-1)
    } catch (error) {
      console.error('회원신고 실패:', error)
    }
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/70">
      <div className="flex w-[16vw] flex-col gap-4 rounded-lg bg-white p-5">
        <ModalTitle heading="사용자 신고하기" description={`정말로 ${userNickname}를 신고하시겠습니까?`} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-1">
              <RequiredLabel htmlFor="reportReason" labelClass="font-semibold">
                신고 사유
              </RequiredLabel>
              <div className="flex flex-col gap-1 rounded-lg border border-gray-300 px-3 py-2.5">
                {USER_REPORT_REASON.map((reason: { id: string; label: string }) => (
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
                  className="bg-primary-50 focus:border-primary-500 w-full resize-none rounded-lg px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none"
                  id="withdrawReasonDetail"
                  {...register('detailReason', {
                    maxLength: ReportApiErrors.detailReason.maxLength,
                  })}
                />
                <p className="text-sm font-semibold text-gray-400">{titleLength}/300자</p>
                {errors.detailReason && <p className="text-danger-500 text-xs font-semibold"> {errors.detailReason.message}</p>}
              </div>
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
