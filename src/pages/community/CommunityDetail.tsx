import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deletePost, fetchComments, fetchCommunityId, postReply } from '@src/api/community'
import MdPreview from './components/markdown/MdPreview'
import { getBoardType } from '@src/utils/getBoardType'
import { Badge } from '@src/components/commons/badge/Badge'
import { formatDate } from '@src/utils/formatDate'
import { CommentList, type ReplyRequestFormValues } from './components/CommentList'
import { CommentForm } from './components/CommentForm'
import { ProfileAvatar } from '@src/components/commons/ProfileAvatar'
import { useForm } from 'react-hook-form'
import type { CommentPostRequestData } from '@src/types'
import { useEffect, useState } from 'react'
import PostReportModal from '@src/components/modal/PostReportModal'
import DeletePostConfirmModal from '@src/components/modal/DeletePostConfirmModal'
import { useUserStore } from '@src/store/userStore'
import { useLoginModalStore } from '@src/store/modalStore'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { ArrowLeft, EllipsisVertical } from 'lucide-react'
import { IconButton } from '@src/components/commons/button/IconButton'
import { cn } from '@src/utils/cn'
import { Z_INDEX } from '@src/constants/ui'
import { SimpleHeader } from '@src/components/header/SimpleHeader'
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
  const setRedirectUrl = useUserStore((state) => state.setRedirectUrl)
  const openLoginModal = useLoginModalStore((state) => state.openLoginModal)
  const location = useLocation()
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
  const { title: headerTitle, description: headerDescription } = getHeaderContent()
  const onSubmit = (data: ReplyRequestFormValues) => {
    if (!user) {
      setRedirectUrl(location.pathname + location.search)
      openLoginModal()
      return
    }
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
      {!isMd ? (
        <div className={cn('bg-primary-200 sticky top-0 mx-auto flex w-full max-w-7xl justify-between px-3.5 py-4', Z_INDEX.HEADER)}>
          <button type="button" onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-1 text-gray-600">
            <ArrowLeft size={23} className="text-white" />
          </button>
          <h2 className="heading-h4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-extrabold! text-white">{headerTitle}</h2>
        </div>
      ) : (
        <SimpleHeader
          title={headerTitle}
          description={isMd ? headerDescription : undefined}
          layoutClassname="py-5 flex-col justify-between border-b border-gray-200"
        />
      )}
      <div className="min-h-screen bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-7xl">
          <div className="flex flex-col justify-center gap-3.5">
            <div className="flex flex-col gap-3.5 rounded-lg border border-gray-400 bg-white px-6 py-5 shadow-xl">
              <div className="relative flex items-center justify-between">
                <Badge className="bg-primary-400 w-fit rounded-full text-white">{getBoardType(data.boardType ?? '')}</Badge>
                <IconButton className="" size="sm" onClick={handleMoreToggle}>
                  <EllipsisVertical size={16} className="text-gray-500" />
                </IconButton>
                {isMoreMenuOpen && (
                  <div className="absolute top-7 right-0 flex flex-col rounded border border-gray-200 bg-white shadow-md md:min-w-14">
                    {user?.id === data?.authorId ? (
                      <>
                        <button
                          className="cursor-pointer px-3 py-1.5 text-sm whitespace-nowrap hover:bg-gray-50"
                          type="button"
                          onClick={() => {
                            setIsMoreMenuOpen(false)
                            handlePostEdit(Number(id))
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="cursor-pointer px-3 py-1.5 text-sm whitespace-nowrap hover:bg-gray-50"
                          type="button"
                          onClick={() => {
                            setIsMoreMenuOpen(false)
                            setIsPostDeleteModalOpen(true)
                          }}
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      <button
                        className="cursor-pointer px-3 py-1.5 text-sm whitespace-nowrap hover:bg-gray-50"
                        type="button"
                        onClick={() => {
                          setIsMoreMenuOpen(false)
                          if (!user) {
                            openLoginModal()
                          } else {
                            setIsReportModalOpen(true)
                          }
                        }}
                      >
                        신고하기
                      </button>
                    )}
                  </div>
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
                onCancel={() => reset()}
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
