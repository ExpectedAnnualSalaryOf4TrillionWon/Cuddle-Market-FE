import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
// import { PRODUCT_TYPE_TABS, type ProductTypeTabId } from '../../constants/constants'
import { Tabs } from '@src/components/Tabs'
// import { ProductPostForm } from './components/ProductPostForm'
// import { ProductRequestForm } from './components/ProductRequestForm'
import { fetchProductById } from '@src/api/products'
import type { ProductDetailItem } from '@src/types'
import { COMMUNITY_SEARCH_TYPE, COMMUNITY_SORT_TYPE, COMMUNITY_TABS, SORT_TYPE, type CommunityTabId } from '@src/constants/constants'
import { CommunityTabs } from './CommunityTabs'
import { Input } from '@src/components/commons/Input'
import { SearchBar } from '@src/components/header/components/SearchBar'
import { Button } from '@src/components/commons/button/Button'
import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import { ROUTES } from '@src/constants/routes'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver'
import { fetchFreeCommunity, fetchInfoCommunity, fetchQuestionCommunity } from '@src/api/community'
import { formatJoinDate } from '@src/utils/formatJoinDate'
import { UserRound, Clock, MessageSquare, Eye } from 'lucide-react'
import { LoadMoreButton } from '@src/components/commons/button/LoadMoreButton'

export default function CommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as CommunityTabId | null
  const initialTab = tabParam === 'tab-question' ? 'tab-question' : tabParam === 'tab-info' ? 'tab-info' : 'tab-free'

  const [activeCommunityTypeTab, setActiveCommunityTypeTab] = useState<CommunityTabId>(initialTab)
  const sortBy = searchParams.get('sortBy')
  const [selectedSort, setSelectedSort] = useState<string>(() => {
    const sortItem = COMMUNITY_SEARCH_TYPE.find((sort) => {
      return sort.id === sortBy
    })

    return sortItem?.label || '최신순'
  })
  const [selectSearchType, setSelectedSearchType] = useState<string>('제목')
  const searchType = COMMUNITY_SEARCH_TYPE.find((type) => type.label === selectSearchType)?.id || 'title'
  const keyword = searchParams.get('keyword') || ''
  const handleTabChange = (tabId: string) => {
    setActiveCommunityTypeTab(tabId as CommunityTabId)
    setSearchParams({ tab: tabId }, { replace: true })
  }

  const getHeaderContent = () => {
    switch (activeCommunityTypeTab) {
      case 'tab-free':
        return { title: '자유게시판', description: '일상 이야기를 마음껏 나눠보세요!' }
      case 'tab-question':
        return { title: '질문 있어요', description: '궁금한 점을 질문해보세요!' }
      case 'tab-info':
        return { title: '정보 공유', description: '유용한 정보를 공유해보세요!' }
      default:
        return { title: '자유게시판', description: '일상 이야기를 마음껏 나눠보세요!' }
    }
  }
  const handleSortChange = (value: string) => {
    const sortItem = COMMUNITY_SORT_TYPE.find((sort) => sort.label === value)

    if (!sortItem) return
    setSearchParams((prev) => {
      prev.set('sortBy', sortItem.id)
      return prev
    })
    setSelectedSort?.(sortItem.label)
  }

  const handleSearchTypeChange = (value: string) => {
    const searchTypeItem = COMMUNITY_SEARCH_TYPE.find((type) => type.label === value)
    if (!searchTypeItem) return
    setSelectedSearchType(searchTypeItem.label)
  }

  // 자유게시판
  const {
    data: freeData,
    fetchNextPage: fetchNextFree,
    hasNextPage: hasNextFree,
    isFetchingNextPage: isFetchingNextFree,
  } = useInfiniteQuery({
    queryKey: ['community', 'free', searchType, keyword, sortBy],
    queryFn: ({ pageParam }) => fetchFreeCommunity(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: activeCommunityTypeTab === 'tab-free',
  })

  // 질문 게시판
  const {
    data: questionData,
    fetchNextPage: fetchNextQuestion,
    hasNextPage: hasNextQuestion,
    isFetchingNextPage: isFetchingNextQuestion,
  } = useInfiniteQuery({
    queryKey: ['community', 'question', searchType, keyword, sortBy],
    queryFn: ({ pageParam }) => fetchQuestionCommunity(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: activeCommunityTypeTab === 'tab-question',
  })

  // 정보 공유 게시판
  const {
    data: infoData,
    fetchNextPage: fetchNextInfo,
    hasNextPage: hasNextInfo,
    isFetchingNextPage: isFetchingNextInfo,
  } = useInfiniteQuery({
    queryKey: ['community', 'info', searchType, keyword, sortBy],
    queryFn: ({ pageParam }) => fetchInfoCommunity(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: activeCommunityTypeTab === 'tab-info',
  })

  // 현재 탭에 맞는 데이터 선택
  const communityPosts = (() => {
    switch (activeCommunityTypeTab) {
      case 'tab-free':
        return freeData?.pages.flatMap((page) => page.content) ?? []
      case 'tab-question':
        return questionData?.pages.flatMap((page) => page.content) ?? []
      case 'tab-info':
        return infoData?.pages.flatMap((page) => page.content) ?? []
      default:
        return []
    }
  })()

  // 현재 탭에 맞는 페이지네이션 함수/상태
  const fetchNextPage =
    activeCommunityTypeTab === 'tab-free' ? fetchNextFree : activeCommunityTypeTab === 'tab-question' ? fetchNextQuestion : fetchNextInfo

  const hasNextPage = activeCommunityTypeTab === 'tab-free' ? hasNextFree : activeCommunityTypeTab === 'tab-question' ? hasNextQuestion : hasNextInfo

  const isFetchingNextPage =
    activeCommunityTypeTab === 'tab-free'
      ? isFetchingNextFree
      : activeCommunityTypeTab === 'tab-question'
        ? isFetchingNextQuestion
        : isFetchingNextInfo

  const { title: headerTitle, description: headerDescription } = getHeaderContent()
  return (
    <>
      <SimpleHeader title={headerTitle} description={headerDescription} />
      <div className="bg-[#F3F4F6] pt-5">
        <div className="px-lg pb-4xl mx-auto max-w-[var(--container-max-width)]">
          <div className="flex w-full flex-col gap-7">
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <CommunityTabs tabs={COMMUNITY_TABS} activeTab={activeCommunityTypeTab} onTabChange={handleTabChange} ariaLabel="커뮤니티 타입" />
                <Link to={ROUTES.COMMUNITY_POST} type="button" className="bg-primary-200 rounded-lg px-3 py-2 text-white">
                  글쓰기
                </Link>
              </div>

              <div className="flex items-center justify-between gap-5">
                <div className="w-36">
                  <SelectDropdown
                    value={selectSearchType}
                    onChange={handleSearchTypeChange}
                    options={COMMUNITY_SEARCH_TYPE.map((sort) => ({
                      value: sort.label,
                      label: sort.label,
                    }))}
                    buttonClassName="border border-gray-300 bg-primary-50 text-gray-900 text-base px-3 py-2"
                  />
                </div>
                <SearchBar placeholder="게시글 제목이나 내용, 작성자로 검색해보세요" borderColor="border-gray-300" className="max-w-full" />
                <div className="w-36">
                  <SelectDropdown
                    value={selectedSort}
                    onChange={handleSortChange}
                    options={COMMUNITY_SORT_TYPE.map((sort) => ({
                      value: sort.label,
                      label: sort.label,
                    }))}
                    buttonClassName="border border-gray-300 bg-primary-50 text-gray-900 text-base px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5">
              {communityPosts.map((post) => (
                <li
                  key={post.id}
                  className="flex flex-col justify-center gap-2.5 rounded-lg border border-gray-400 bg-white px-3.5 pt-3.5 pb-5 shadow-xl"
                >
                  <p className="font-semibold">{post.title}</p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1 text-gray-500">
                      <UserRound size={16} className="text-gray-500" strokeWidth={2.3} />
                      <p>{post.authorNickname}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock size={16} className="text-gray-500" strokeWidth={2.3} />
                      <p>{formatJoinDate(post.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MessageSquare size={16} className="text-gray-500" strokeWidth={2.3} />
                      <p>{post.commentCount}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Eye size={16} className="text-gray-500" strokeWidth={2.3} />
                      <span>조회</span>
                      <span>{post.viewCount}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {hasNextPage && <LoadMoreButton onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} classname="border-0" />}
          </div>
        </div>
      </div>
    </>
  )
}
