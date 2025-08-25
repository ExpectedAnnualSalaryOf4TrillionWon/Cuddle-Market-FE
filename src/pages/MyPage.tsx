import userDefaultImage from '@images/userDefault.svg';
import MyList from '@layout/myList';
import { SimpleHeader } from '@layout/SimpleHeader';
// import { useModalStore } from '@store/modalStore';
import ConfirmModal from '@common/confirmModal';
import { useUserStore } from '@store/userStore';
import React, { useState } from 'react';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';
// import { fetchMyInfo } from '../api/products';

const TABS = [
  { id: 'products', label: '내 상품' },
  { id: 'wishlist', label: '찜한 상품' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const MyPage: React.FC = () => {
  const user = useUserStore(state => state.user);
  console.log(user);

  const [activeTab, setActiveTab] = useState<TabId>('products');
  // const [loading, setLoading] = useState(true);
  // const [userInfo, setUserInfo] = useState<User | null>(null);
  const [counts, setCounts] = useState({ products: 0, wishlist: 0 });

  // 확인 모달 설정 (22번째 줄 근처)
  // const exitConfirm = useModalStore(state => state.confirm);
  // const deleteConfirm = useModalStore(state => state.confirm);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<'exit' | 'delete' | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<number | undefined>();

  // 회원탈퇴 핸들러
  const handleExit = () => {
    setModalMessage('정말로 회원탈퇴 하시겠습니까?\n탈퇴 후에는 복구할 수 없습니다.');
    setModalAction('exit');
    setIsModalOpen(true);
  };

  // 상품삭제 핸들러 (MyList 컴포넌트에서 사용할 수 있도록 함수로 제공)
  const handleDelete = (itemId?: number) => {
    setModalMessage('정말로 삭제하시겠습니까?');
    setModalAction('delete');
    setDeleteItemId(itemId);
    setIsModalOpen(true);
  };

  // const formatJoinDate = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   return `${date.getFullYear()}년 ${date.getMonth() + 1}월 가입`;
  // };

  const handleModalConfirm = () => {
    setIsModalOpen(false);

    if (modalAction === 'exit') {
      // TODO: 회원탈퇴 API 호출
      console.log('회원탈퇴 진행');
      // 예: await deleteAccount();
      // navigate('/');
    } else if (modalAction === 'delete') {
      // TODO: 상품삭제 API 호출
      console.log(`게시물 ${deleteItemId} 삭제 진행`);
      // 예: await deleteProduct(deleteItemId);
      // 삭제 후 목록 새로고침
      // loadUserInfo();
    }

    // 상태 초기화
    setModalAction(null);
    setDeleteItemId(undefined);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setDeleteItemId(undefined);
  };

  // const loadUserInfo = async () => {
  //   try {
  //     const data = await fetchMyInfo();
  //     setUserInfo(data);
  //   } catch (error) {
  //     console.error('사용자 정보 로드 실패:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   loadUserInfo();
  // }, []);

  if (!user) return <div>로딩중...</div>;

  return (
    <>
      {/* 헤더영역 => 컴포넌트화 */}
      <SimpleHeader title={'마이 페이지'} />

      <main className="max-w-[var(--container-max-width)] mx-auto flex flex-col tablet:flex-row gap-xl px-lg py-xl">
        {/* 좌측 내 정보 영역 / 너비,높이 고정값 부여가 차라리 나은듯 함 */}
        <aside className="w-[300px] h-[375px] flex flex-col gap-xl rounded-xl border border-border p-xl">
          <div className="sticky top-24 flex flex-col gap-xl rounded-xl text-text-primary">
            {/* 유저 이미지와 닉네임 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mx-auto mb-lg rounded-full overflow-hidden">
                <img
                  src={userDefaultImage}
                  alt="유저이미지"
                  className="block w-full h-full object-cover"
                />
              </div>
              <h3 className="heading4 text-text-primary mb-sm">{user.nickname}</h3>
            </div>
            {/* 거주지와 가입일 */}
            <div className="flex flex-col gap-sm">
              {/* 거주지 주소 */}
              <div className="flex items-center gap-sm">
                <CiLocationOn />
                <span className="bodySmall text-text-primary">
                  {user.state_name} {user.city_name}
                </span>
              </div>
              {/* 가입일 */}
              <div className="flex items-center gap-sm">
                <CiCalendar />
                <span className="bodySmall text-text-primary">
                  가입일 :{/* {userInfo.created_at ? formatJoinDate(userInfo.created_at) : ''} */}
                </span>
              </div>
            </div>
            <Link
              to="/profile-update"
              className="mt-lg
                    flex items-center justify-center gap-sm
                    h-10 rounded-md px-xl
                    bg-primary hover:bg-primary/90
                    text-bg text-sm font-medium
                    transition-all"
            >
              내 정보 수정
            </Link>
            {/* 회원탈퇴 버튼을 div에서 button으로 변경하고 핸들러 연결 */}
            <div className=" text-xs text-red-500 cursor-pointer hover:underline self-start">
              <button onClick={handleExit}>회원탈퇴</button>
            </div>
          </div>
        </aside>

        {/* 우측 탭 및 컨텐츠 영역 */}
        <section className="flex-1 flex flex-col gap-2xl">
          {/* 탭 목록*/}
          <div
            role="tablist"
            className="grid grid-cols-2 gap-sm px-sm py-2.5 rounded-3xl bg-dark/25"
          >
            {TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-md py-xs rounded-3xl ${
                  activeTab === tab.id ? 'border-dark' : 'border-transparent'
                } bodySmall text-text-primary text-center transition hover:bg-dark`}
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
            className="flex flex-col gap-xl border border-border p-xl rounded-xl"
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
            <div className="overflow-y-auto max-h-[50vh] flex flex-col gap-lg">
              {/* MyList 컴포넌트에 삭제 핸들러 전달 */}
              <MyList activeTab={activeTab} onCountsUpdate={setCounts} onDelete={handleDelete} />

              {/* 목록이 있을 때만 더보기 버튼 표시 */}
              {(activeTab === 'products' ? counts.products > 0 : counts.wishlist > 0) && (
                <button
                  onClick={() => alert('목록 5개씩 추가렌더링!')}
                  className="w-full bg-dark rounded-lg shadow-2xs py-sm"
                >
                  더보기
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <ConfirmModal
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default MyPage;
