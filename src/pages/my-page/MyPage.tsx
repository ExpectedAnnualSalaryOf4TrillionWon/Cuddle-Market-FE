import { useUserStore } from '@store/userStore'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProduct, fetchMyBlockedData, fetchMyFavoriteData, fetchMyProductData, fetchMyRequestData } from '@src/api/products'
import { Tabs } from '@src/components/Tabs'
import { MY_PAGE_TABS, type MyPageTabId } from '@src/constants/constants'
import MyPagePanel from './components/MyPagePanel'
import DeleteConfirmModal from '@src/components/modal/DeleteConfirmModal'
import WithdrawModal, { type WithDrawFormValues } from '@src/components/modal/WithdrawModal'
import { withDraw } from '@src/api/profile'
import ProfileData from './components/ProfileData'

function MyPage() {
  const { user, clearAll } = useUserStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number
    title: string
    price: number
    mainImageUrl: string
  } | null>(null)
  const tabParam = searchParams.get('tab') as MyPageTabId | null
  const initialTab = tabParam && MY_PAGE_TABS.some((tab) => tab.id === tabParam) ? tabParam : 'tab-sales'
  const [activeMyPageTab, setActiveMyPageTab] = useState<MyPageTabId>(initialTab)
  const activeTabCode = MY_PAGE_TABS.find((tab) => tab.id === activeMyPageTab)?.code ?? 'SELL'

  const {
    data: myProductsData,
    fetchNextPage: fetchNextProducts,
    hasNextPage: hasNextProducts,
    isFetchingNextPage: isFetchingNextProducts,
    isLoading: isLoadingMyProductData,
    error: errorMyProductData,
  } = useInfiniteQuery({
    queryKey: ['myProducts', user?.id],
    queryFn: ({ pageParam }) => fetchMyProductData(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: !!user,
  })

  const {
    data: myRequestData,
    fetchNextPage: fetchNextRequests,
    hasNextPage: hasNextRequests,
    isFetchingNextPage: isFetchingNextRequests,
    isLoading: isLoadingMyRequestData,
    error: errorMyRequestData,
  } = useInfiniteQuery({
    queryKey: ['myRequest', user?.id],
    queryFn: ({ pageParam }) => fetchMyRequestData(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: activeMyPageTab === 'tab-purchases',
  })

  const {
    data: myFavoriteData,
    fetchNextPage: fetchNextFavorites,
    hasNextPage: hasNextFavorites,
    isFetchingNextPage: isFetchingNextFavorites,
    isLoading: isLoadingMyFavoriteData,
    error: errorMyFavoritetData,
  } = useInfiniteQuery({
    queryKey: ['myFavorite', user?.id],
    queryFn: ({ pageParam }) => fetchMyFavoriteData(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: activeMyPageTab === 'tab-wishlist',
  })

  const {
    data: myBlockedData,
    fetchNextPage: fetchNextBlocked,
    hasNextPage: hasNextBlocked,
    isFetchingNextPage: isFetchingNextBlocked,
    isLoading: isLoadingMyFBlockedData,
    error: errorMyFBlockedData,
  } = useInfiniteQuery({
    queryKey: ['myBlocked', user?.id],
    queryFn: ({ pageParam }) => fetchMyBlockedData(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    initialPageParam: 0,
    enabled: activeMyPageTab === 'tab-blocked',
  })

  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      // 삭제 성공 시 상품 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['myProducts'] })
      setIsModalOpen(false)
      setSelectedProduct(null)
    },
  })

  const handleTabChange = (tabId: string) => {
    setActiveMyPageTab(tabId as MyPageTabId)
    setSearchParams({ tab: tabId }, { replace: true })
  }

  const handleConfirmModal = (e: React.MouseEvent, id: number, title: string, price: number, mainImageUrl: string) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedProduct({ id, title, price, mainImageUrl })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    deleteProductMutate(id)
  }

  const handleWithdraw = async (data: WithDrawFormValues) => {
    // withDraw(data)
    // setIsWithdrawModalOpen(false)
    // navigate('/')

    try {
      await withDraw(data)
      clearAll() // 모든 사용자 상태 초기화 (user, accessToken, refreshToken, redirectUrl)
      // 로그인 페이지로 이동
      navigate('/')
    } catch (error) {
      console.error('회원탈퇴 실패:', error)
    }
  }

  useEffect(() => {
    const currentTab = tabParam && MY_PAGE_TABS.some((tab) => tab.id === tabParam) ? tabParam : 'tab-sales'
    setActiveMyPageTab(currentTab)
  }, [tabParam])

  if (isLoadingMyProductData || isLoadingMyRequestData || isLoadingMyFavoriteData || isLoadingMyFBlockedData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (errorMyProductData || errorMyRequestData || errorMyFavoritetData || errorMyFBlockedData) {
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
      <div className="bg-bg pb-4xl pt-8">
        <div className="px-lg mx-auto flex max-w-[var(--container-max-width)] gap-8">
          <ProfileData setIsWithdrawModalOpen={setIsWithdrawModalOpen} />
          <section className="flex flex-1 flex-col gap-7">
            <Tabs
              tabs={MY_PAGE_TABS}
              activeTab={activeMyPageTab}
              onTabChange={(tabId) => handleTabChange(tabId as MyPageTabId)}
              ariaLabel="마이페이지 메뉴"
            />
            <MyPagePanel
              activeTabCode={activeTabCode}
              activeMyPageTab={activeMyPageTab}
              myProductsData={myProductsData?.pages.flatMap((page) => page.content)}
              myProductsTotal={myProductsData?.pages[0]?.total}
              myRequestData={myRequestData?.pages.flatMap((page) => page.content)}
              myRequestTotal={myRequestData?.pages[0]?.total}
              myFavoriteData={myFavoriteData?.pages.flatMap((page) => page.content)}
              myFavoriteTotal={myFavoriteData?.pages[0]?.total}
              myBlockedData={myBlockedData?.pages.flatMap((page) => page.content)}
              myBlockedTotal={myBlockedData?.pages[0]?.total}
              fetchNextPage={
                activeMyPageTab === 'tab-sales'
                  ? fetchNextProducts
                  : activeMyPageTab === 'tab-purchases'
                    ? fetchNextRequests
                    : activeMyPageTab === 'tab-wishlist'
                      ? fetchNextFavorites
                      : fetchNextBlocked
              }
              hasNextPage={
                activeMyPageTab === 'tab-sales'
                  ? hasNextProducts
                  : activeMyPageTab === 'tab-purchases'
                    ? hasNextRequests
                    : activeMyPageTab === 'tab-wishlist'
                      ? hasNextFavorites
                      : hasNextBlocked
              }
              isFetchingNextPage={
                activeMyPageTab === 'tab-sales'
                  ? isFetchingNextProducts
                  : activeMyPageTab === 'tab-purchases'
                    ? isFetchingNextRequests
                    : activeMyPageTab === 'tab-wishlist'
                      ? isFetchingNextFavorites
                      : isFetchingNextBlocked
              }
              handleConfirmModal={handleConfirmModal}
            />
          </section>
        </div>
      </div>
      <DeleteConfirmModal isOpen={isModalOpen} product={selectedProduct} onConfirm={handleDelete} onCancel={() => setIsModalOpen(false)} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onConfirm={handleWithdraw} onCancel={() => setIsWithdrawModalOpen(false)} />
    </>
  )
}

export default MyPage
