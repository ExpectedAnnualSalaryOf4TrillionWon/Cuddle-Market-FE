import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Footer from '@src/components/footer/Footer'
import { deletePost, fetchComments, fetchCommunityId, postReply } from '@src/api/community'
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
import { useEffect, useState } from 'react'
import PostReportModal from '@src/components/modal/PostReportModal'
import { Button } from '@src/components/commons/button/Button'
import DeletePostConfirmModal from '@src/components/modal/DeletePostConfirmModal'
import { useUserStore } from '@src/store/userStore'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { ArrowLeft, EllipsisVertical } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
// import MainImage from './components/MainImage'
// import SubImages from './components/SubImages'
// import SellerProfileCard from './components/SellerProfileCard'
// import ProductBadges from './components/ProductBadges'
// import ProductSummary from './components/ProductSummary'
// import ProductDescription from './components/ProductDescription'
// import ProductActions from './components/ProductActions'
// import SellerOtherProducts from './components/SellerOtherProducts'
import { cn } from '@src/utils/cn'
import { Z_INDEX } from '@src/constants/ui'
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
  const user = useUserStore((state) => state.user)
  const isMd = useMediaQuery('(min-width: 768px)')
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false)
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
      queryClient.invalidateQueries({ queryKey: ['community', id, 'comments'] })
      reset()
    },
    onError: () => {
      alert('답글 등록에 실패했습니다.')
    },
  })

  const handlePostDelete = async (id: number) => {
    try {
      await deletePost(id)
      queryClient.invalidateQueries({ queryKey: ['community'] })
      navigate('/community')
    } catch (error) {
      console.error('게시글 삭제 실패:', error)
    }
  }
  const handleMoreToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen)
  }

  const handlePostEdit = (postId: number) => {
    navigate(`/community/${postId}/edit`)
  }
  const getHeaderContent = () => {
    switch (data?.boardType) {
      case 'FREE':
        return { title: '자유게시판', description: '일상 이야기를 마음껏 나눠보세요!', tabId: 'tab-free' }
      case 'QUESTION':
        return { title: '질문 있어요', description: '궁금한 점을 질문해보세요!', tabId: 'tab-question' }
      case 'INFO':
        return { title: '정보 공유', description: '유용한 정보를 공유해보세요!', tabId: 'tab-info' }
      default:
        return { title: '자유게시판', description: '일상 이야기를 마음껏 나눠보세요!', tabId: 'tab-free' }
    }
  }
  const { title: headerTitle } = getHeaderContent()

  const onSubmit = (data: ReplyRequestFormValues) => {
    replyMutation.mutate(data)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      {/* <SimpleHeader
        title={headerTitle}
        description={isMd ? headerDescription : undefined}
        to={`/community?tab=${tabId}`}
        showWriteButton={false}
        showBackButton
        layoutClassname="py-5 flex-row justify-between border-b border-gray-200"
      /> */}
      <div className={cn('bg-primary-200 sticky top-0 mx-auto flex w-full max-w-7xl justify-between px-3.5 py-4', Z_INDEX.HEADER)}>
        {!isMd && (
          <button type="button" onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-1 text-gray-600">
            <ArrowLeft size={23} className="text-white" />
          </button>
        )}
        <h2 className="heading-h4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-extrabold! text-white">{headerTitle}</h2>
      </div>
      <div className="min-h-screen bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-7xl">
          <div className="flex flex-col justify-center gap-3.5">
            {user?.id === data?.authorId && (
              <div className="flex items-center gap-2.5">
                <Button className="bg-primary-200 cursor-pointer text-white" size="sm" type="button" onClick={() => handlePostEdit(Number(id))}>
                  수정
                </Button>
                <Button className="cursor-pointer bg-gray-100" size="sm" type="button" onClick={() => setIsPostDeleteModalOpen?.(true)}>
                  삭제
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-3.5 rounded-lg border border-gray-400 bg-white px-6 py-5 shadow-xl">
              <div className="relative flex items-center justify-between">
                <Badge className="bg-primary-400 w-fit rounded-full text-white">{getBoardType(data.boardType ?? '')}</Badge>
                <IconButton className="" size="sm" onClick={handleMoreToggle}>
                  <EllipsisVertical size={16} className="text-gray-500" />
                </IconButton>
                {isMoreMenuOpen && (
                  <button
                    className="absolute top-7 right-0 cursor-pointer rounded border border-gray-200 bg-white px-3 py-1.5 text-sm whitespace-nowrap shadow-md hover:bg-gray-50"
                    type="button"
                    onClick={() => setIsReportModalOpen?.(true)}
                  >
                    신고하기
                  </button>
                )}
              </div>
              <div className="flex items-baseline justify-between md:items-center">
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
      <PostReportModal
        isOpen={isReportModalOpen}
        postId={Number(id)}
        authorNickname={data.authorNickname}
        postTitle={data.title}
        onCancel={() => setIsReportModalOpen(false)}
      />
      <DeletePostConfirmModal
        isOpen={isPostDeleteModalOpen}
        postId={Number(id)}
        onConfirm={handlePostDelete}
        onCancel={() => setIsPostDeleteModalOpen(false)}
      />
    </>
  )
}
