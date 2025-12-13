import { formatDate } from '@src/utils/formatDate'
import { cn } from '@src/utils/cn'
import type { Comment } from '@src/types'
import { EllipsisVertical } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
import { useState } from 'react'
import { useUserStore } from '@src/store/userStore'

interface CommentItemProps {
  comment: Comment
  isReply?: boolean
  hasChildren?: boolean
  childrenCount?: number
  onToggleReplies?: () => void
  isRepliesOpen?: boolean
  showBorder?: boolean
  onHandleReply?: () => void
  onDelete?: (commentId: number) => void
}

export function CommentItem({
  comment,
  isReply = false,
  hasChildren,
  childrenCount,
  onToggleReplies,
  isRepliesOpen,
  showBorder = true,
  onHandleReply,
  onDelete,
}: CommentItemProps) {
  const user = useUserStore((state) => state.user)
  const isMyComment = user?.id === Number(comment.authorId)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const handleMoreToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen)
  }

  const handleDelete = () => {
    onDelete?.(comment.id)
    setIsMoreMenuOpen(false)
  }

  return (
    <div className={cn('flex items-start gap-3.5', showBorder && 'border-t border-gray-300 pt-3.5', !isReply && !isRepliesOpen && 'pb-3.5')}>
      {/* 프로필 이미지 */}
      <div className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]`}>
        {comment.authorProfileImageUrl ? (
          <img src={comment.authorProfileImageUrl} alt={comment.authorNickname} className="h-full w-full object-cover" />
        ) : (
          <p>{comment.authorNickname.charAt(0).toUpperCase()}</p>
        )}
      </div>

      {/* 유저 정보 및 내용 */}
      <div className="flex flex-col justify-center gap-1">
        <div className="flex items-center gap-3.5">
          <p>{comment.authorNickname}</p>
          <p className="text-sm text-gray-400">{formatDate(comment.createdAt)}</p>
        </div>
        <p>{comment.content}</p>

        <div className="flex items-center gap-3.5">
          <button className="cursor-pointer text-sm text-blue-500" type="button" onClick={onHandleReply}>
            답글
          </button>
          {/* 답글 버튼 (대댓글이 아니고, hasChildren이 있을 때만) */}
          {!isReply && hasChildren && (
            <button className="cursor-pointer self-start text-sm text-blue-500 hover:underline" type="button" onClick={onToggleReplies}>
              {isRepliesOpen ? '답글 접기' : `답글 ${childrenCount}개`}
            </button>
          )}
        </div>
      </div>

      {isMyComment && (
        <div className="relative ml-auto">
          <IconButton className="" size="sm" onClick={handleMoreToggle}>
            <EllipsisVertical size={16} className="text-gray-500" />
          </IconButton>
          {isMoreMenuOpen && (
            <button
              className="absolute top-7 right-0 cursor-pointer rounded border border-gray-200 bg-white px-3 py-1.5 text-sm whitespace-nowrap shadow-md hover:bg-gray-50"
              type="button"
              onClick={() => handleDelete()}
            >
              삭제
            </button>
          )}
        </div>
      )}
    </div>
  )
}
