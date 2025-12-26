import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { COMMUNITY_SEARCH_TYPE, COMMUNITY_SORT_TYPE, COMMUNITY_TABS, type CommunityTabId } from '@src/constants/constants'
import { CommunityTabs } from './components/CommunityTabs'
import { SearchBar } from '@src/components/header/components/SearchBar'
import { SelectDropdown } from '@src/components/commons/select/SelectDropdown'
import { ROUTES } from '@src/constants/routes'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchFreeCommunity, fetchInfoCommunity, fetchQuestionCommunity } from '@src/api/community'
import { UserRound, Clock, MessageSquare, Eye, Dot, Plus } from 'lucide-react'
import { LoadMoreButton } from '@src/components/commons/button/LoadMoreButton'
import { getTimeAgo } from '@src/utils/getTimeAgo'
import { useUserStore } from '@src/store/userStore'
import { useMediaQuery } from '@src/hooks/useMediaQuery'
import { useScrollDirection } from '@src/hooks/useScrollDirection'
import { Button } from '@src/components/commons/button/Button'
import { cn } from '@src/utils/cn'

export default function CommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as CommunityTabId | null
  const initialTab = tabParam === 'tab-question' ? 'tab-question' : tabParam === 'tab-info' ? 'tab-info' : 'tab-free'
  const isMd = useMediaQuery('(min-width: 768px)')
  const { isCollapsed: isFilterCollapsed } = useScrollDirection()

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
  const currentKeyword = searchParams.get('communityKeyword') || ''
  const handleTabChange = (tabId: string) => {
    setActiveCommunityTypeTab(tabId as CommunityTabId)
    setSearchParams({ tab: tabId }, { replace: true })
    // 탭 이동 시 정렬 및 검색 조건 초기화
    setSelectedSort('최신순')
    setSelectedSearchType('제목')
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
    setSearchParams((prev) => {
      prev.set('searchType', searchTypeItem.id)
      prev.delete('communityKeyword')
      return prev
    })
    setSelectedSearchType(searchTypeItem.label)
  }

  // 자유게시판
  const {
    data: freeData,
    fetchNextPage: fetchNextFree,
    hasNextPage: hasNextFree,
    isFetchingNextPage: isFetchingNextFree,
  } = useInfiniteQuery({
    queryKey: ['community', 'free', searchType, currentKeyword, sortBy],
    queryFn: ({ pageParam }) => fetchFreeCommunity(pageParam, 10, searchType, currentKeyword, sortBy),
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
    queryKey: ['community', 'question', searchType, currentKeyword, sortBy],
    queryFn: ({ pageParam }) => fetchQuestionCommunity(pageParam, 10, searchType, currentKeyword, sortBy),
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
    queryKey: ['community', 'info', searchType, currentKeyword, sortBy],
    queryFn: ({ pageParam }) => fetchInfoCommunity(pageParam, 10, searchType, currentKeyword, sortBy),
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
  const { isLogin } = useUserStore()
  return (
    <>
      <SimpleHeader
        title={headerTitle}
        description={isMd ? headerDescription : undefined}
        layoutClassname="py-5 justify-between border-b border-gray-200 md:static sticky top-16 z-20"
      />
      <div className="relative min-h-screen bg-[#F3F4F6] pt-0 md:pt-5">
        <div className="pb-4xl mx-auto max-w-7xl px-0 md:px-4">
          <div className="flex w-full flex-col">
            {/* 모바일: 필터 영역 */}
            {!isMd && (
              <div className="sticky top-32 z-20 bg-white">
                {/* 접히는 필터 영역 */}
                <div
                  className={cn(
                    'transition-all duration-300 ease-out',
                    isFilterCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-[300px] overflow-visible'
                  )}
                >
                  <div className="flex items-center justify-between border-b border-gray-200 p-3.5">
                    <CommunityTabs tabs={COMMUNITY_TABS} activeTab={activeCommunityTypeTab} onTabChange={handleTabChange} ariaLabel="커뮤니티 타입" />
                  </div>

                  <div className="flex flex-row-reverse items-center justify-between gap-3 border-b border-gray-200 px-3.5 pt-4 pb-3.5">
                    <div className="h-11 w-24">
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
                    <SearchBar placeholder="게시글 검색" borderColor="border-gray-300" className="h-11 max-w-full" paramName="communityKeyword" />
                  </div>
                  <div className="flex gap-2 border-b border-gray-200 px-3.5 py-3.5">
                    {COMMUNITY_SORT_TYPE.map((sortType) => (
                      <Button
                        key={sortType.id}
                        type="button"
                        size="sm"
                        onClick={() => handleSortChange(sortType.label)}
                        className={cn(
                          'cursor-pointer rounded-full whitespace-nowrap',
                          selectedSort === sortType.label ? 'bg-primary-500 font-bold text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                      >
                        {sortType.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 데스크탑 */}
            {isMd && (
              <div className="mb-7 flex w-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <CommunityTabs tabs={COMMUNITY_TABS} activeTab={activeCommunityTypeTab} onTabChange={handleTabChange} ariaLabel="커뮤니티 타입" />
                  {isLogin() && (
                    <Link to={ROUTES.COMMUNITY_POST} type="button" className="bg-primary-300 rounded-lg px-3 py-2 text-white">
                      글쓰기
                    </Link>
                  )}
                </div>

                <div className="flex flex-row items-center justify-between gap-5">
                  <div className="h-auto w-36">
                    <SelectDropdown
                      value={selectSearchType}
                      onChange={handleSearchTypeChange}
                      options={COMMUNITY_SEARCH_TYPE.map((sort) => ({
                        value: sort.label,
                        label: sort.label,
                      }))}
                      buttonClassName="border border-gray-300 bg-primary-50 text-gray-900 text-base px-3 py-2 "
                    />
                  </div>
                  <SearchBar
                    placeholder="게시글 제목이나 내용, 작성자로 검색해보세요"
                    borderColor="border-gray-300"
                    className="h-11 max-w-full"
                    paramName="communityKeyword"
                  />
                  <div className="w-36">
                    <SelectDropdown
                      value={selectedSort}
                      onChange={handleSortChange}
                      options={COMMUNITY_SORT_TYPE.map((category) => ({
                        value: category.label,
                        label: category.label,
                      }))}
                      buttonClassName="border border-gray-300 bg-primary-50 text-gray-900 text-base px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            )}

            <ul className="mt-7 flex flex-col gap-2.5 px-3.5 md:mt-0 md:p-0">
              {communityPosts.map((post) =>
                isMd ? (
                  <li
                    key={post.id}
                    className="flex flex-col justify-center gap-2.5 rounded-lg border border-gray-400 bg-white px-3.5 pt-3.5 pb-5 shadow-xl"
                  >
                    <Link to={ROUTES.COMMUNITY_DETAIL_ID(post.id)}>
                      <p className="font-semibold">{post.title}</p>
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1 text-gray-500">
                          <UserRound size={16} className="text-gray-500" strokeWidth={2.3} />
                          <p>{post.authorNickname}</p>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock size={16} className="text-gray-500" strokeWidth={2.3} />
                          <p>{getTimeAgo(post.createdAt)}</p>
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
                    </Link>
                  </li>
                ) : (
                  <li
                    key={post.id}
                    className="flex flex-col justify-center gap-2.5 rounded-lg border border-gray-400 bg-white px-3.5 pt-3.5 pb-5 shadow-xl"
                  >
                    <Link to={ROUTES.COMMUNITY_DETAIL_ID(post.id)} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold">{post.title}</p>

                        <p className="line-clamp-1">{post.contentPreview}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2.5">
                        <div className="flex items-center text-gray-500">
                          <p>{post.authorNickname}</p>
                          <Dot size={12} />
                          <p>{getTimeAgo(post.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center gap-1 text-gray-500">
                            <MessageSquare size={16} className="text-gray-500" strokeWidth={2.3} />
                            <p>{post.commentCount}</p>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Eye size={16} className="text-gray-500" strokeWidth={2.3} />
                            <span>{post.viewCount}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              )}
            </ul>
            {hasNextPage &&
              (isMd ? (
                <LoadMoreButton onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} classname="border-0" />
              ) : (
                <div className="px-3.5">
                  <LoadMoreButton onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} classname="border-0" />
                </div>
              ))}
          </div>
        </div>
        {!isMd && isLogin() && (
          <Link to={ROUTES.COMMUNITY_POST} type="button" className="bg-primary-200 fixed right-4 bottom-4 rounded-full px-3 py-3 text-white">
            <Plus />
          </Link>
        )}
      </div>
    </>
  )
}
