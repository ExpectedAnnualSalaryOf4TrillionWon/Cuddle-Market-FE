import ConfirmModal from '@src/components/modal/ConfirmModal'
import userDefaultImage from '@assets/images/userDefault.svg'
import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { useUserStore } from '@store/userStore'
import { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../api/apiFetch'
import { useQuery } from '@tanstack/react-query'
import { fetchMyBlockedData, fetchMyFavoriteData, fetchMyPageData, fetchMyProductData, fetchMyRequestData } from '@src/api/products'
import CuddleMarketLogo from '@assets/images/CuddleMarketLogoImage.png'
import { Clock, Heart, MapPin, Eye, Calendar, Settings } from 'lucide-react'
import { ProductMetaItem } from '@src/components/product/ProductMetaItem'
import { Tabs } from '@src/components/Tabs'
import { MY_PAGE_TABS, type MyPageTabId } from '@src/constants/constants'
import MyPagePanel from './MyPagePanel'

const formatJoinDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
}

function MyPage() {
  const { user } = useUserStore()
  // const [currentUser, setCurrentUser] = useState(storeUser)
  // const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [activeMyPageTab, setActiveMyPageTab] = useState<MyPageTabId>('tab-sales')
  const activeTabCode = MY_PAGE_TABS.find((tab) => tab.id === activeMyPageTab)?.code ?? 'SELL'

  const [counts, setCounts] = useState({ products: 0, wishlist: 0 })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalAction, setModalAction] = useState<'exit' | 'delete' | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<number | undefined>()
  const [subMessage, setSubMessage] = useState('')

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
    isLoading: isLoadingMyRequestData, // enabled가 false여도 이 값은 존재함
    error: errorMyRequestData,
  } = useQuery({
    queryKey: ['myRequest', user?.id],
    queryFn: () => fetchMyRequestData(),
    enabled: activeMyPageTab === 'tab-purchases', // 조건부 실행
  })

  const {
    data: MyFavoriteData,
    isLoading: isLoadingMyFavoriteData, // enabled가 false여도 이 값은 존재함
    error: errorMyFavoritetData,
  } = useQuery({
    queryKey: ['myFavorite', user?.id],
    queryFn: () => fetchMyFavoriteData(),
    enabled: activeMyPageTab === 'tab-wishlist', // 조건부 실행
  })
  const {
    data: MyBlockedData,
    isLoading: isLoadingMyFBlockedData, // enabled가 false여도 이 값은 존재함
    error: errorMyFBlockedData,
  } = useQuery({
    queryKey: ['myBlocked', user?.id],
    queryFn: () => fetchMyBlockedData(),
    enabled: activeMyPageTab === 'tab-blocked', // 조건부 실행
  })

  const handleExit = () => {
    setModalMessage('정말로 회원탈퇴 하시겠습니까?')
    setSubMessage('탈퇴후에는 복구할 수 없습니다')
    setModalAction('exit')
    setIsModalOpen(true)
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

              <button onClick={handleExit} className="w-full cursor-pointer pt-8 text-left text-sm text-gray-500" type="button">
                회원탈퇴
              </button>
            </div>
          </section>

          <section className="flex flex-1 flex-col gap-7">
            <Tabs
              tabs={MY_PAGE_TABS}
              activeTab={activeMyPageTab}
              onTabChange={(tabId) => setActiveMyPageTab(tabId as MyPageTabId)}
              ariaLabel="마이페이지 메뉴"
            />
            <MyPagePanel
              activeTabCode={activeTabCode}
              activeMyPageTab={activeMyPageTab}
              myProductsData={MyProductData}
              myRequestData={MyRequestData}
              myFavoriteData={MyFavoriteData}
              myBlockedData={MyBlockedData}
            />
          </section>
        </div>
      </div>
      {/* <ConfirmModal isOpen={isModalOpen} message={modalMessage} subMessage={subMessage} onConfirm={handleModalConfirm} onCancel={handleModalCancel} /> */}
    </>
  )
}

export default MyPage
