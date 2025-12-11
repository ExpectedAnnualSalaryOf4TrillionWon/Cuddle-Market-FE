import { formatDate } from '@src/utils/formatDate'
import type { Comment } from '@src/types'

interface CommentItemProps {
  comment: Comment
  isReply?: boolean
  hasChildren?: boolean
  childrenCount?: number
  onToggleReplies?: () => void
  isRepliesOpen?: boolean
}

export function CommentItem({ comment, isReply = false, hasChildren, childrenCount, onToggleReplies, isRepliesOpen }: CommentItemProps) {
  return (
    <div className={`flex items-start gap-3.5 ${isReply ? '' : 'border-b border-gray-300 pb-3.5'}`}>
      {/* 프로필 이미지 */}
      <div className={`flex items-center justify-center overflow-hidden rounded-full bg-[#FACC15] ${isReply ? 'h-6 w-6' : 'h-8 w-8'}`}>
        {comment.authorProfileImageUrl ? (
          <img src={comment.authorProfileImageUrl} alt={comment.authorNickname} className="h-full w-full object-cover" />
        ) : (
          <div className={isReply ? 'text-xs' : 'text-sm'}>{comment.authorNickname.charAt(0).toUpperCase()}</div>
        )}
      </div>

      {/* 유저 정보 및 내용 */}
      <div className="flex flex-col justify-center gap-1">
        <div className="flex items-center gap-3.5">
          <p className={isReply ? 'text-sm' : ''}>{comment.authorNickname}</p>
          <p className={`text-gray-400 ${isReply ? 'text-xs' : 'text-sm'}`}>{formatDate(comment.createdAt)}</p>
        </div>
        <p className={isReply ? 'text-sm' : ''}>{comment.content}</p>

        {/* 답글 버튼 (대댓글이 아니고, hasChildren이 있을 때만) */}
        {!isReply && hasChildren && (
          <button className="self-start text-sm text-blue-500 hover:underline" type="button" onClick={onToggleReplies}>
            {isRepliesOpen ? '답글 숨기기' : `답글 ${childrenCount}개`}
          </button>
        )}
      </div>
    </div>
  )
}
