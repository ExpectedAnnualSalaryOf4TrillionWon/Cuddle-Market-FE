import { useUserStore } from '@store/userStore'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProduct, fetchMyBlockedData, fetchMyFavoriteData, fetchMyPageData, fetchMyProductData, fetchMyRequestData } from '@src/api/products'
import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { MapPin, Calendar, Settings } from 'lucide-react'
import { ProductMetaItem } from '@src/components/product/ProductMetaItem'
import { Tabs } from '@src/components/Tabs'
import { MY_PAGE_TABS, type MyPageTabId } from '@src/constants/constants'
import MyPagePanel from './MyPagePanel'
import ConfirmModal from '@src/components/modal/ConfirmModal'

const formatJoinDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
}

function MyPage() {
  const { user } = useUserStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const tabParam = searchParams.get('tab') as MyPageTabId | null
  const initialTab = tabParam && MY_PAGE_TABS.some((tab) => tab.id === tabParam) ? tabParam : 'tab-sales'
  const [activeMyPageTab, setActiveMyPageTab] = useState<MyPageTabId>(initialTab)

  // URL 파라미터 변경 시 (뒤로가기/앞으로가기) 탭 상태 동기화
  useEffect(() => {
    const currentTab = tabParam && MY_PAGE_TABS.some((tab) => tab.id === tabParam) ? tabParam : 'tab-sales'
    setActiveMyPageTab(currentTab)
  }, [tabParam])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number
    title: string
    price: number
    mainImageUrl: string
  } | null>(null)
  const activeTabCode = MY_PAGE_TABS.find((tab) => tab.id === activeMyPageTab)?.code ?? 'SELL'

  const {
    data: myData,
    isLoading: isLoadingMyData,
    error: errorMyData,
  } = useQuery({
    queryKey: ['mypage', user?.id],
    queryFn: () => fetchMyPageData(),
  })
  const {
    data: MyProductData,
    isLoading: isLoadingMyProductData,
    error: errorMyProductData,
  } = useQuery({
    queryKey: ['myProducts', user?.id],
    queryFn: () => fetchMyProductData(),
  })

  const {
    data: MyRequestData,
    isLoading: isLoadingMyRequestData,
    error: errorMyRequestData,
  } = useQuery({
    queryKey: ['myRequest', user?.id],
    queryFn: () => fetchMyRequestData(),
    enabled: activeMyPageTab === 'tab-purchases',
  })

  const {
    data: MyFavoriteData,
    isLoading: isLoadingMyFavoriteData,
    error: errorMyFavoritetData,
  } = useQuery({
    queryKey: ['myFavorite', user?.id],
    queryFn: () => fetchMyFavoriteData(),
    enabled: activeMyPageTab === 'tab-wishlist',
  })

  const {
    data: MyBlockedData,
    isLoading: isLoadingMyFBlockedData,
    error: errorMyFBlockedData,
  } = useQuery({
    queryKey: ['myBlocked', user?.id],
    queryFn: () => fetchMyBlockedData(),
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

  const handleDelete = (id: number | undefined) => {
    if (!id) return
    deleteProductMutate(id)
  }
  const withDraw = () => {
    console.log('회원탈퇴')
  }

  if (isLoadingMyData || isLoadingMyProductData || isLoadingMyRequestData || isLoadingMyFavoriteData || isLoadingMyFBlockedData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (errorMyData || errorMyProductData || errorMyRequestData || errorMyFavoritetData || errorMyFBlockedData) {
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
          <section className="border-border flex h-fit min-w-72 flex-col rounded-xl border p-5">
            <div className="text-text-primary sticky top-24 flex flex-col rounded-xl">
              <div className="flex flex-col gap-6 border-b border-gray-300 pb-8">
                <div className="flex flex-col items-center gap-3.5 pb-7">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#FACC15]">
                    {myData?.profileImageUrl ? (
                      <img src={myData.profileImageUrl ?? CuddleMarketLogo} alt={myData.nickname} className="h-full w-full object-cover" />
                    ) : (
                      <div className="heading-h4">{myData?.nickname.charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                  <h3 className="heading-h5 text-text-primary mb-sm">{myData?.nickname}</h3>
                  <p className="w-full text-sm font-semibold text-gray-500">
                    {myData?.introduction ? myData.introduction : '소개글을을 작성해주세요'}
                  </p>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-2.5">
                    <ProductMetaItem icon={MapPin} iconSize={17} label={`${myData?.addressSido} ${myData?.addressGugun}`} className="gap-2" />
                    <ProductMetaItem
                      icon={Calendar}
                      iconSize={17}
                      label={`가입일: ${myData?.createdAt ? formatJoinDate(myData.createdAt) : ''}`}
                      className="gap-2"
                    />
                  </div>
                  <Link
                    to="/profile-update"
                    className="bg-primary-200 text-bg flex items-center justify-center gap-2.5 rounded-lg px-3 py-2 transition-all"
                  >
                    <Settings size={19} />
                    <span>내 정보 수정</span>
                  </Link>
                </div>
              </div>

              {/* TODO: 회원탈퇴 기능 구현 필요 */}
              <button className="w-full cursor-pointer pt-8 text-left text-sm text-gray-500" type="button" onClick={withDraw}>
                회원탈퇴
              </button>
            </div>
          </section>

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
              myProductsData={MyProductData}
              myRequestData={MyRequestData}
              myFavoriteData={MyFavoriteData}
              myBlockedData={MyBlockedData}
              handleConfirmModal={handleConfirmModal}
            />
          </section>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        type="delete"
        heading="상품 삭제"
        description="정말로 이 상품을 삭제하시겠습니까?"
        product={selectedProduct}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default MyPage
