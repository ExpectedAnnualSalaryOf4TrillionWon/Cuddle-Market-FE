import userDefaultImage from '@images/userDefault.svg';
import MyList from '@layout/myList';
import { useModalStore } from '@store/modalStore';
import React, { useEffect, useState } from 'react';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import type { User } from 'src/types';
import { fetchMyInfo } from '../api/products';
import { SimpleHeader } from '@layout/SimpleHeader';

const TABS = [
  { id: 'products', label: '내 상품' },
  { id: 'wishlist', label: '찜한 상품' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('products');
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [counts, setCounts] = useState({ products: 0, wishlist: 0 });

  // 확인 모달 설정 (22번째 줄 근처)
  const exitConfirm = useModalStore(state => state.confirm);
  const deleteConfirm = useModalStore(state => state.confirm);

  // 회원탈퇴 핸들러
  const handleExit = async (): Promise<void> => {
    const result = await exitConfirm('회원탈퇴 하시겠습니까?');
    if (result === true) {
      // TODO: 회원탈퇴 로직 구현
      console.log('회원탈퇴 진행');
      return;
    } else {
      return;
    }
  };

  // 상품삭제 핸들러 (MyList 컴포넌트에서 사용할 수 있도록 함수로 제공)
  const handleDelete = async (itemId?: number): Promise<void> => {
    const result = await deleteConfirm('삭제하시겠습니까?');
    if (result === true) {
      // TODO: 상품삭제 로직 구현
      console.log(`게시물 ${itemId} 삭제 진행`);
      return;
    } else {
      return;
    }
  };

  const formatJoinDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 가입`;
  };

  const loadUserInfo = async () => {
    try {
      const data = await fetchMyInfo();
      setUserInfo(data);
    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  if (loading || !userInfo) return <div>로딩중...</div>;

  return (
    <>
      {/* 헤더영역 => 컴포넌트화 */}
      <SimpleHeader title={'마이 페이지'} />

      <div className="max-w-[var(--container-max-width)] mx-auto">
        <main className="mx-auto flex flex-col tablet:flex-row gap-xl px-lg py-xl bg-bg max-w-[var(--container-max-width)]">
          {/* 좌측 내 정보 영역 / 너비,높이 고정값 부여가 차라리 나은듯 함 */}
          <aside className="mx-auto w-[300px] h-[375px] flex-shrink-0 flex flex-col gap-xl rounded-xl border border-border p-xl">
            {/* 유저 이미지와 닉네임 */}
            <div className="flex flex-col items-center">
              <img
                src={userDefaultImage}
                alt="유저이미지"
                className="w-auto h-15 tablet:h-22 mx-auto mb-sm"
              />
              <h3 className="heading5 tablet:text-heading4 text-text-primary ">
                {userInfo.nickname}
              </h3>
            </div>
            {/* 거주지 주소 */}
            <div className="flex items-center gap-sm">
              <CiLocationOn />
              {userInfo.state} {userInfo.city}
            </div>
            {/* 가입일 */}
            <div className="flex items-center gap-sm">
              <CiCalendar />
              {userInfo.created_at ? formatJoinDate(userInfo.created_at) : ''}
            </div>

            <Link
              to="/profile-update"
              className="
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
          </aside>

          {/* 우측 탭 및 컨텐츠 영역 */}
          <section className="flex-1 flex flex-col gap-[23px]">
            {/* 탭 리스트*/}
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
              className="flex flex-col gap-md border border-border p-xl rounded-xl"
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
              <div className="overflow-y-auto max-h-[40vh] flex flex-col gap-lg">
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
      </div>
    </>
  );
};

export default MyPage;
