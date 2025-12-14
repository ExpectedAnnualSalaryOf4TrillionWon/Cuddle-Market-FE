import { POST_REPORT_REASON, USER_REPORT_REASON } from '@src/constants/constants'
import ReportModalBase, { type ReportFormValues } from './ReportModalBase'
import { postReported } from '@src/api/community'

interface PostReportModalProps {
  isOpen: boolean
  postId: number
  authorNickname: string
  postTitle: string
  onCancel: () => void
}

export default function PostReportModal({ isOpen, postId, authorNickname, postTitle, onCancel }: PostReportModalProps) {
  const handleSubmit = async (data: ReportFormValues) => {
    try {
      await postReported(postId, data)
      console.log('게시글 신고:', { postId, ...data })
      onCancel()
    } catch (error) {
      console.error('게시글 신고 실패:', error)
    }
  }

  const description = (
    <div className="flex flex-col gap-1">
      <p className="flex items-center gap-2">
        <span className="w-10 font-semibold whitespace-nowrap">작성자</span>
        <span>{authorNickname}</span>
      </p>
      <p className="flex items-center gap-2">
        <span className="w-10 font-semibold whitespace-nowrap">제목</span>
        <span>{postTitle}</span>
      </p>
    </div>
  )

  return (
    <ReportModalBase
      isOpen={isOpen}
      heading="게시글 신고하기"
      description={description}
      reasons={POST_REPORT_REASON}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  )
}
