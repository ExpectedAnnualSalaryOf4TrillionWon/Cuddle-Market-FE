import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchReplies } from '@src/api/community'
import type { Comment } from '@src/types'
import { CommentItem } from './CommentItem'

interface CommentListProps {
  comments: Comment[]
  postId: string
}

export function CommentList({ comments, postId }: CommentListProps) {
  const [openRepliesCommentId, setOpenRepliesCommentId] = useState<number | null>(null)

  const { data: repliesData } = useQuery({
    queryKey: ['community', postId, 'replies', openRepliesCommentId],
    queryFn: () => fetchReplies(String(openRepliesCommentId)),
    enabled: !!openRepliesCommentId,
  })

  const handleToggleReplies = (commentId: number) => {
    setOpenRepliesCommentId(openRepliesCommentId === commentId ? null : commentId)
  }

  return (
    <ul className="flex flex-col gap-3.5">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem
            comment={comment}
            hasChildren={comment.hasChildren}
            childrenCount={comment.childrenCount}
            onToggleReplies={() => handleToggleReplies(comment.id)}
            isRepliesOpen={openRepliesCommentId === comment.id}
          />

          {/* 대댓글 목록 */}
          {openRepliesCommentId === comment.id && repliesData?.comments && (
            <ul className="flex flex-col gap-2 pl-4">
              {repliesData.comments.map((reply) => (
                <li key={reply.id}>
                  <CommentItem comment={reply} isReply />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
