import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Footer from '@src/components/footer/Footer'
import { fetchComments, fetchCommunityId, postReply } from '@src/api/community'
import MdPreview from './components/markdown/MdPreview'
import { getBoardType } from '@src/utils/getBoardType'
import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { Badge } from '@src/components/commons/badge/Badge'
import { formatDate } from '@src/utils/formatDate'
import { CommentList, type ReplyRequestFormValues } from './components/CommentList'
import { CommentForm } from './components/CommentForm'
import { ProfileAvatar } from '@src/components/commons/ProfileAvatar'
import { useForm } from 'react-hook-form'
import type { CommentPostRequestData } from '@src/types'
import { useState } from 'react'
import PostReportModal from '@src/components/modal/PostReportModal'
// import MainImage from './components/MainImage'
// import SubImages from './components/SubImages'
// import SellerProfileCard from './components/SellerProfileCard'
// import ProductBadges from './components/ProductBadges'
// import ProductSummary from './components/ProductSummary'
// import ProductDescription from './components/ProductDescription'
// import ProductActions from './components/ProductActions'
// import SellerOtherProducts from './components/SellerOtherProducts'

export default function CommunityDetail() {
  const {
    handleSubmit, // form onSubmit에 들어가는 함수 : 제출 시 실행할 함수를 감싸주는 함수
    register, // onChange 등의 이벤트 객체 생성 : input에 "이 필드는 폼의 어떤 이름이다"라고 연결해주는 함수
    reset,
  } = useForm<ReplyRequestFormValues>({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  })
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const { data, error } = useQuery({
    queryKey: ['community', id],
    queryFn: () => fetchCommunityId(id!),
    enabled: !!id,
  })
  const { data: commentData } = useQuery({
    queryKey: ['community', id, 'comments'],
    queryFn: () => fetchComments(id!),
    enabled: !!id,
  })

  const replyMutation = useMutation({
    mutationFn: (requestData: CommentPostRequestData) => postReply(requestData, id!),
    onSuccess: () => {
      // 댓글 목록도 refetch (childrenCount 업데이트를 위해)
      queryClient.invalidateQueries({ queryKey: ['community', id, 'comments'] })
      // 폼 초기화 및 닫기
      reset()
    },
    onError: () => {
      alert('답글 등록에 실패했습니다.')
    },
  })

  const getHeaderContent = () => {
    switch (data?.boardType) {
      case 'FREE':
        return { title: '자유게시판', description: '일상 이야기를 마음껏 나눠보세요!' }
      case 'QUESTION':
        return { title: '질문 있어요', description: '궁금한 점을 질문해보세요!' }
      case 'INFO':
        return { title: '정보 공유', description: '유용한 정보를 공유해보세요!' }
      default:
        return { title: '자유게시판', description: '일상 이야기를 마음껏 나눠보세요!' }
    }
  }
  const { title: headerTitle, description: headerDescription } = getHeaderContent()

  const onSubmit = (data: ReplyRequestFormValues) => {
    replyMutation.mutate(data)
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SimpleHeader title={headerTitle} description={headerDescription} />
      <div className="min-h-screen bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-[var(--container-max-width)]">
          <div className="flex flex-col justify-center gap-3.5">
            <div className="flex flex-col gap-3.5 rounded-lg border border-gray-400 bg-white px-6 py-5 shadow-xl">
              <Badge className="bg-primary-400 w-fit rounded-full text-white">{getBoardType(data.boardType ?? '')}</Badge>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <ProfileAvatar imageUrl={data.authorProfileImageUrl} nickname={data.authorNickname} size="lg" />
                  {/* 유저 정보 */}
                  <div className="flex flex-col justify-center gap-0.5">
                    <p>{data.authorNickname}</p>
                    <p>{formatDate(data.createdAt)}</p>
                  </div>
                </div>
                <p>조회 {data.viewCount}</p>
              </div>
              <p className="border-b border-gray-300 pb-3.5 text-lg font-semibold">{data.title}</p>
              <MdPreview value={data.content} className="p-0" />
              <button
                className="flex w-fit cursor-pointer justify-end self-end rounded-full border border-gray-400 px-1.5 py-1 text-sm text-gray-500"
                type="button"
                onClick={() => setIsReportModalOpen?.(true)}
              >
                신고하기
              </button>
            </div>

            <div className="flex flex-col gap-3.5 rounded-lg border border-gray-400 bg-white px-6 py-5 shadow-xl">
              <div className="flex items-center gap-1">
                <span>댓글</span>
                <span>{data.commentCount}</span>
              </div>

              {commentData?.comments && <CommentList comments={commentData.comments} postId={id!} />}
              <CommentForm
                id="comment-input"
                placeholder="댓글을 입력하세요"
                legendText="댓글 작성폼"
                register={register}
                onSubmit={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <PostReportModal
        isOpen={isReportModalOpen}
        postId={Number(id)}
        authorNickname={data.authorNickname}
        postTitle={data.title}
        onCancel={() => setIsReportModalOpen(false)}
      />
    </>
  )
}
