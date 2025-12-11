import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Footer from '@src/components/footer/Footer'
import { fetchComments, fetchCommunityId } from '@src/api/community'
import MdPreview from './components/markdown/MdPreview'
import { getBoardType } from '@src/utils/getBoardType'
import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { Badge } from '@src/components/commons/badge/Badge'
import { formatDate } from '@src/utils/formatDate'
import { CommentList } from './components/CommentList'
// import MainImage from './components/MainImage'
// import SubImages from './components/SubImages'
// import SellerProfileCard from './components/SellerProfileCard'
// import ProductBadges from './components/ProductBadges'
// import ProductSummary from './components/ProductSummary'
// import ProductDescription from './components/ProductDescription'
// import ProductActions from './components/ProductActions'
// import SellerOtherProducts from './components/SellerOtherProducts'

export default function CommunityDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useQuery({
    queryKey: ['community', id],
    queryFn: () => fetchCommunityId(id!),
    enabled: !!id,
  })
  const { data: commentData } = useQuery({
    queryKey: ['community', id, 'comments'],
    queryFn: () => fetchComments(id!),
    enabled: !!id,
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
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
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
                  {/* 프로필 이미지 */}
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
                    {data?.authorProfileImageUrl ? (
                      <img src={data.authorProfileImageUrl} alt={data.authorNickname} className="h-full w-full object-cover" />
                    ) : (
                      <div className="heading-h4">{data?.authorNickname.charAt(0).toUpperCase()}</div>
                    )}
                  </div>
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
              <textarea name="" id="" placeholder="댓글을 입력하세요" className="bg-primary-50 min-h-"></textarea>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
