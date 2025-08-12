import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '@images/CuddleMarketLogo.png';

type UserInfo = {
  nickname: string;
  email: string;
  location: string;
  createdAt: string;
};

const TABS = [
  { id: 'products', label: '내 상품' },
  { id: 'transactions', label: '거래내역' },
  { id: 'wishlist', label: '찜한 상품' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>('products');

  const userInfo: UserInfo = {
    nickname: '유저닉네임',
    email: 'user@example.com',
    location: '서울',
    createdAt: '2023-01-01',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <div>내 상품 </div>;
      case 'transactions':
        return <div>거래내역</div>;
      case 'wishlist':
        return <div>찜한 상품</div>;
    }
  };

  return (
    <div>
      <div className="sticky top-0 p-md bg-primary">
        <Link to="/">
          <img src={logoImage} alt="커들마켓" className="w-auto h-22 object-contain" />
        </Link>
      </div>

      <div className="flex flex-col max-w-[var(--container-max-width)] px-xs py-md items-center justify-between  border-border ">
        {/* 본문 */}
        <main className="flex flex-1 px-xs py-md space-x-sm">
          {/* 좌측 내 정보 영역 */}
          <aside className="w-76 flex flex-col justify-between border border-border rounded-md p-6 shadow-xs bg-secondary">
            <div>
              <h2 className="text-heading4 font-bold mb-4">내 정보</h2>
              <div className="grid grid-cols-[100px_1fr] gap-y-sm text-text-primary">
                <div className="text-heading5 font-semibold">닉네임</div>
                <div>{userInfo.nickname}</div>

                <div className="text-heading5 font-semibold">이메일</div>
                <div>{userInfo.email}</div>

                <div className="text-heading5 font-semibold">거주지</div>
                <div>{userInfo.location}</div>

                <div className="text-heading5 font-semibold">계정생성일</div>
                <div>{userInfo.createdAt}</div>
              </div>
              <button
                onClick={() => alert('수정 페이지로 이동')}
                className="mt-lg w-full  bg-primary hover:bg-dark text-point py-sm rounded-sm transition"
              >
                내 정보 수정
              </button>
            </div>
            <div className="mt-6 text-xs text-red-500 cursor-pointer hover:underline self-start">
              회원탈퇴
            </div>
          </aside>

          {/* 우측 탭 및 컨텐츠 영역 */}
          <section className="flex-1 flex flex-col">
            {/* 탭 */}
            <nav className="flex border-b border-gray-300 mb-4">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 -mb-px font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* 탭 컨텐츠 */}
            <div className="flex-1 border border-gray-200 rounded-md p-4 shadow-sm">
              {renderContent()}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyPage;
{
  /* <>
      <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md bg-secondary flex items-center justify-between gap-lg border-border">
        <div className=" bg-point"></div>
      </div>
    </> */
}
