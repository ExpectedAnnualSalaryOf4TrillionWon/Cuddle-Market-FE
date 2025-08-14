import { useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { CiCalendar, CiLocationOn, CiMail } from 'react-icons/ci';
import { GrView } from 'react-icons/gr';
import { IoBanOutline } from 'react-icons/io5';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'purchases'>('products');

  return (
    <div className="max-w-[var(--container-max-width)] mx-auto px-lg py-md tablet:py-xl">
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-xl">
        {/* 좌측: 사용자 카드 */}
        <div className="tablet:col-span-1">
          <div className="sticky top-24 flex flex-col gap-xl rounded-xl border border-border bg-bg text-text-primary">
            <div className="p-xl">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-lg rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                    alt="멍멍이아빠"
                    className="block w-full h-full object-cover"
                  />
                </div>
                <h2 className="heading4 text-text-primary mb-sm">멍멍이아빠</h2>
                <p className="bodySmall text-text-secondary mb-lg">
                  반려동물을 사랑하는 아빠입니다.
                </p>
              </div>

              <div className="flex flex-col gap-sm">
                <div className="flex items-center gap-sm">
                  <CiMail />
                  <span className="bodySmall text-text-primary">dogdad@example.com</span>
                </div>
                <div className="flex items-center gap-sm">
                  <CiLocationOn />
                  <span className="bodySmall text-text-primary">서울 강남구</span>
                </div>
                <div className="flex items-center gap-sm">
                  <CiCalendar />
                  <span className="bodySmall text-text-primary">2023년 3월 가입</span>
                </div>
              </div>

              <div className="mt-lg flex flex-col gap-sm">
                <button
                  className="
                    flex items-center justify-center gap-sm
                    h-10 rounded-md px-xl
                    bg-primary hover:bg-primary/90
                    text-bg text-sm font-medium
                    transition-all
                  "
                >
                  <BsChat />
                  <span>채팅하기</span>
                </button>

                <button
                  className="
                    flex items-center justify-center gap-sm
                    w-full h-10 rounded-md px-xl
                    border border-border
                    bg-bg
                    text-text-primary text-sm
                    transition-all
                  "
                >
                  <IoBanOutline />
                  <span>사용자 차단</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 우측: 탭 + 목록 */}
        <div className="tablet:col-span-2">
          <div className="flex flex-col gap-sm w-full">
            {/* 탭 리스트 */}
            <div
              role="tablist"
              aria-label="사용자 탭"
              className="grid grid-cols-2 gap-sm mb-lg px-sm py-sm rounded-3xl bg-dark/25"
            >
              <button
                type="button"
                role="tab"
                id="tab-products"
                aria-controls="panel-products"
                aria-selected={activeTab === 'products'}
                onClick={() => setActiveTab('products')}
                className={`
                  w-full px-md py-sm rounded-3xl
                  ${activeTab === 'products' ? 'bg-dark' : 'bg-transparent'}
                  bodySmall text-text-primary text-center
                  transition hover:bg-primary/10
                `}
              >
                멍멍이아빠 상품
              </button>

              <button
                type="button"
                role="tab"
                id="tab-purchases"
                aria-controls="panel-purchases"
                aria-selected={activeTab === 'purchases'}
                onClick={() => setActiveTab('purchases')}
                className={`
                  w-full px-md py-sm rounded-3xl
                  ${activeTab === 'purchases' ? 'bg-dark' : 'bg-transparent'}
                  bodySmall text-text-primary text-center
                  transition hover:bg-primary/10
                `}
              >
                구매내역
              </button>
            </div>

            {/* 탭 패널: 상품 */}
            <div
              role="tabpanel"
              id="panel-products"
              aria-labelledby="tab-products"
              className={`${activeTab !== 'products' ? 'hidden' : ''} flex-1 outline-none`}
            >
              <h3 className="heading5 text-text-primary mb-md">멍멍이아빠님 상품 (6개)</h3>

              <div>
                <div
                  className="
                    cursor-pointer
                    rounded-lg p-lg
                    border border-border
                    bg-bg
                    transition-shadow hover:shadow-sm
                  "
                >
                  <div className="flex items-center gap-lg">
                    <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-light">
                      <img
                        src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop"
                        alt="강아지 털 빗 전문가용"
                        className="block w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="space-y-1">
                        <h3 className="bodySmall text-text-primary truncate">
                          강아지 털 빗 전문가용
                        </h3>
                        <p className="heading5 text-text-primary font-bold">25,000원</p>

                        <div className="flex items-center gap-xs caption text-text-secondary">
                          <GrView />
                          <span>조회 123</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span
                        className="
                          inline-flex items-center justify-center gap-1
                          rounded-md px-3 py-1
                          border border-sale
                          bg-sale text-bg
                          text-xs font-medium whitespace-nowrap
                          transition-[color,box-shadow] overflow-hidden
                        "
                      >
                        판매중
                      </span>
                    </div>
                  </div>
                </div>
                {/* 필요 시 다른 상품 카드들 추가 */}
              </div>
            </div>

            {/* 탭 패널: 구매내역 (placeholder) */}
            <div
              role="tabpanel"
              id="panel-purchases"
              aria-labelledby="tab-purchases"
              className={`${activeTab !== 'purchases' ? 'hidden' : ''} flex-1 outline-none`}
            >
              {/* TODO: 구매내역 콘텐츠 */}
              <p className="bodySmall text-text-secondary">구매내역이 없습니다.</p>
            </div>
          </div>
        </div>
        {/* 우측 끝 */}
      </div>
    </div>
  );
};

export default UserPage;
