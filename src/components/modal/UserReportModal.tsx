import { userReported } from '@src/api/profile'
import { USER_REPORT_REASON } from '@src/constants/constants'
import ReportModalBase, { type ReportFormValues } from './ReportModalBase'
import { useQueryClient } from '@tanstack/react-query'

interface UserReportModalProps {
  isOpen: boolean
  userNickname: string
  userId: number
  onCancel: () => void
}

export default function UserReportModal({ isOpen, userNickname, userId, onCancel }: UserReportModalProps) {
  const queryClient = useQueryClient()

  const handleSubmit = async (data: ReportFormValues) => {
    try {
      await userReported(userId, { ...data })
      queryClient.invalidateQueries({ queryKey: ['userPage'] })
      onCancel()
    } catch (error) {
      console.error('회원신고 실패:', error)
    }
  }

  return (
    <ReportModalBase
      isOpen={isOpen}
      heading="사용자 신고하기"
      description={`정말로 ${userNickname}를 신고하시겠습니까?`}
      reasons={USER_REPORT_REASON}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  )
}
