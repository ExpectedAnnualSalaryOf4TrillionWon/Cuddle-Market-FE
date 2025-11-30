import ConfirmModal from '@src/components/modal/ConfirmModal'
import userDefaultImage from '@assets/images/userDefault.svg'
import MyList from '@src/pages/myList'
import { SimpleHeader } from '@src/components/header/SimpleHeader'
import { useUserStore } from '@store/userStore'
import { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api/apiFetch'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

const TABS = [
  { id: 'products', label: '내 상품' },
  { id: 'wishlist', label: '찜한 상품' },
] as const

type TabId = (typeof TABS)[number]['id']

// const formatJoinDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return `${date.getFullYear()}년 ${date.getMonth() + 1}월 가입`;
// };

function MyPage() {
  const { user: storeUser } = useUserStore()
  const [currentUser, setCurrentUser] = useState(storeUser)
  const [isLoading, setIsLoading] = useState(true)

  const [activeTab, setActiveTab] = useState<TabId>('products')
  const [counts, setCounts] = useState({ products: 0, wishlist: 0 })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalAction, setModalAction] = useState<'exit' | 'delete' | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<number | undefined>()
  const [subMessage, setSubMessage] = useState('')

  const handleExit = () => {
    setModalMessage('정말로 회원탈퇴 하시겠습니까?')
    setSubMessage('탈퇴후에는 복구할 수 없습니다')
    setModalAction('exit')
    setIsModalOpen(true)
  }

  const handleProductDelete = (itemId?: number) => {
    setModalMessage('정말로 삭제하시겠습니까?')
    setSubMessage('')
    setModalAction('delete')
    setDeleteItemId(itemId)
    setIsModalOpen(true)
  }

  const handleModalConfirm = () => {
    setIsModalOpen(false)

    if (modalAction === 'exit') {
      // TODO: 회원탈퇴 API 호출
      console.log('회원탈퇴 진행')
      // 예: await deleteAccount();
      // navigate('/');
    } else if (modalAction === 'delete') {
      // TODO: 상품삭제 API 호출
      console.log(`게시물 ${deleteItemId} 삭제 진행`)
      // 예: await deleteProduct(deleteItemId);
      // 삭제 후 목록 새로고침
      // loadUserInfo();
    }

    // 상태 초기화
    setModalAction(null)
    setDeleteItemId(undefined)
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
    setModalAction(null)
    setDeleteItemId(undefined)
  }

  const handleLikeDelete = async (productId?: number) => {
    if (!productId) return false

    try {
      await apiFetch(`${API_BASE_URL}/likes/`, {
        method: 'DELETE',
        body: JSON.stringify({ product_id: productId }),
      })

      console.log('찜하기 삭제 성공')
      return true
    } catch (error) {
      console.error('찜하기 삭제 실패:', error)
      return false
    }
  }

  const loadUserInfo = async () => {
    try {
      setIsLoading(true)
      const data = await apiFetch(`${API_BASE_URL}/users/mypage/`)

      console.log('API 응답:', data)

      const userData = data.user || data
      setCurrentUser(userData)
      useUserStore.getState().setUser(userData)
    } catch (error) {
      console.error('사용자 정보 로드 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadUserInfo()
  }, [])

  if (isLoading) return <div>로딩중...</div>
  if (!currentUser) return <div>사용자 정보를 불러올 수 없습니다.</div>
  return (
    <>
      {/* 헤더영역 => 컴포넌트화 */}
      <SimpleHeader title={'마이 페이지'} />

      <main className="tablet:flex-row gap-xl px-lg py-xl mx-auto flex max-w-[var(--container-max-width)] flex-col">
        {/* 좌측 내 정보 영역 / 너비,높이 고정값 부여가 차라리 나은듯 함 */}
        <aside className="tablet:w-[300px] tablet:h-[375px] gap-xl border-border p-xl flex flex-col rounded-xl border">
          <div className="gap-xl text-text-primary sticky top-24 flex flex-col rounded-xl">
            {/* 유저 이미지와 닉네임 */}
            <div className="flex flex-col items-center">
              <div className="mb-lg mx-auto h-24 w-24 overflow-hidden rounded-full">
                <img src={currentUser.profile_image || userDefaultImage} alt="유저이미지" className="block h-full w-full object-cover" />
              </div>
              <h3 className="heading4 text-text-primary mb-sm">{currentUser.nickname}</h3>
            </div>
            {/* 거주지와 가입일 */}
            <div className="gap-sm flex flex-col">
              {/* 거주지 주소 */}
              <div className="gap-sm flex items-center">
                <CiLocationOn />
                <span className="bodySmall text-text-primary">
                  {currentUser.addressSido} {currentUser.addressGugun}
                </span>
              </div>
              {/* 가입일 */}
              {/* <div className="flex items-center gap-sm">
                <CiCalendar />
                <span className="bodySmall text-text-primary">
                  가입일 : {currentUser.created_at ? formatJoinDate(currentUser.created_at) : ''}
                </span>
              </div> */}
            </div>
            <Link
              to="/profile-update"
              className="mt-lg gap-sm px-xl bg-primary hover:bg-primary/90 text-bg flex h-10 items-center justify-center rounded-md font-bold transition-all"
            >
              내 정보 수정
            </Link>
            {/* 회원탈퇴 버튼을 div에서 button으로 변경하고 핸들러 연결 */}
            <div className="cursor-pointer self-start text-xs text-red-500 hover:underline">
              <button onClick={handleExit}>회원탈퇴</button>
            </div>
          </div>
        </aside>

        {/* 우측 탭 및 컨텐츠 영역 */}
        <section className="gap-lg flex flex-1 flex-col">
          {/* 탭 목록*/}
          <div role="tablist" className="gap-sm px-sm bg-dark/25 grid grid-cols-2 rounded-3xl py-2.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-md py-xs w-full rounded-3xl ${
                  activeTab === tab.id ? 'bg-dark font-extrabold text-white' : 'hover:bg-light hover:shadow-sm'
                } text-md text-text-primary cursor-pointer text-center hover:shadow-sm`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="gap-lg border-border p-lg flex flex-col rounded-xl border"
          >
            {/* 탭 선택시 컨텐츠 헤더 */}
            {activeTab === 'products' ? (
              <div>
                <h4 className="flex items-center gap-2">내가 등록한 상품</h4>
                <p>총 {counts.products}개의 상품을 등록했습니다</p>
              </div>
            ) : (
              <div>
                <h4 className="flex items-center gap-2">내가 찜한 상품</h4>
                <p>관심있는 상품 {counts.wishlist}개</p>
              </div>
            )}

            {/* 컨텐츠 목록 */}
            <div className="gap-lg flex max-h-[50vh] flex-col overflow-y-auto">
              {/* MyList 컴포넌트에 삭제 핸들러 전달 */}
              <MyList activeTab={activeTab} onCountsUpdate={setCounts} onProductDelete={handleProductDelete} onLikeDelete={handleLikeDelete} />

              {/* 목록이 있을 때만 더보기 버튼 표시 */}
              {(activeTab === 'products' ? counts.products > 0 : counts.wishlist > 0) && (
                <button
                  onClick={() => alert('목록 5개씩 추가렌더링!')}
                  className="bg-dark py-sm w-full cursor-pointer rounded-lg text-white shadow-md hover:shadow-lg"
                >
                  더보기
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <ConfirmModal isOpen={isModalOpen} message={modalMessage} subMessage={subMessage} onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
    </>
  )
}

export default MyPage
